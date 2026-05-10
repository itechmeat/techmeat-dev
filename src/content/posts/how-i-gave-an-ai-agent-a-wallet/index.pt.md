---
title: "Como dei uma carteira ao meu agente de IA e por que ele logo precisou de memória"
description: "open-second-brain 0.8.0 e Pay Memory: como deixei o agente pagar APIs externas via pay.sh e por que a parte central não foi o pagamento em si, mas um registro claro de cada centavo gasto."
pubDate: 2026-05-10
locale: pt
tags: [pay-memory, agent-payments, pay-sh, solana, second-brain]
ogImage: "/posters/og/posts/how-i-gave-an-ai-agent-a-wallet.png"
prFileId: 8fe0310497700cbe1ec5b3f1c7196a4b4b9335eaa08ff4f892d88eadcc6196ed
---

Há alguns dias publiquei o [open-second-brain](/pt/posts/how-i-built-open-second-brain/) - uma camada de memória baseada em arquivos para agentes de IA. Desde então, uma ideia ficou martelando na minha cabeça. Se o agente roda num VPS, no próprio cronograma, via Telegram - cedo ou tarde ele vai precisar gastar dinheiro. Comprar uma chamada de API. Gerar uma ilustração. Disparar uma busca paga.

O pagamento em si é um problema já resolvido. O [pay.sh](https://pay.sh) embrulha uma chamada HTTP comum em uma paga via micropagamentos em USDC sobre a Solana. O agente roda curl através do `pay`, a carteira assina a transação, o outro lado devolve uma resposta. Pronto.

Mas "pronto" é só metade da história.

## Caos com carteira

Imagine: o agente está trabalhando numa tarefa, toma um punhado de decisões pelo caminho, duas delas são chamadas pagas. Uma hora depois você abre o terminal e o scrollback já voou para fora da tela. Em algum lugar lá em cima houve invocações de `pay`, em algum lugar chegaram assinaturas de tx, em algum lugar voltaram respostas em JSON.

Por que o agente fez isso? Com base em quê? Quanto ele esperava gastar? Quanto realmente foi debitado? Onde está o resultado?

Se você quer confiar ao agente qualquer coisa autônoma, "lê o scrollback" não serve. Um log de terminal não é estruturado, não está ligado à tarefa, não é indexável, não sobrevive a um restart e você não consegue abri-lo no Obsidian como um artefato normal.

Percebi bem rápido que a tarefa não era "ensinar o agente a pagar" - era "garantir que cada pagamento deixe para trás um rastro que faça sentido".

![Um agente de IA segurando uma carteira digital enquanto uma trilha de micropagamentos flui para cartões-recibo de Markdown interligados](./image.png)

Esta ilustração foi gerada exatamente do jeito que o post descreve: através do `pay.sh`, usando o gateway x402 `paysponge/fal` e o endpoint `fal-ai/fast-sdxl`. A geração custou **0.01 USDC** a partir da carteira mainnet `64FaukkZDUdFTufXF49H1CrHjDfsmBFqfrUjsAS8XrgP`; a transação pública na Solana é [`5ZYnkabzLvHqEgXNJfKopiRwbGkriHJ2bps2NnkX7HzqQAyTZYjcyJVCTvZwMquyMviv2juyAdbP9P2depHrJxQW`](https://solscan.io/tx/5ZYnkabzLvHqEgXNJfKopiRwbGkriHJ2bps2NnkX7HzqQAyTZYjcyJVCTvZwMquyMviv2juyAdbP9P2depHrJxQW). O request id foi `019e135a-357b-71f3-8b9d-305e728b05fb` e o asset gerado foi salvo localmente como `image.png`.

E foi aí que o open-second-brain encaixou direitinho.

## Pay Memory

Na versão 0.8.0, o OSB ganhou uma nova camada - **Pay Memory**. Resumindo: memória para o dinheiro.

Depois de cada ação paga, aparece no vault um arquivo Markdown simples com estes campos:

- **por que** o agente decidiu pagar;
- **qual serviço** foi chamado;
- **qual spending policy** estava em vigor e o que ela decidiu (`allowed` / `approval_required` / `denied` / `not_checked`);
- **custo esperado** e **valor efetivamente debitado**;
- **payment proof** - a assinatura específica da Solana que você pode abrir no Solscan e verificar;
- **o resultado** - um link para uma asset note separada com a saída;
- **quem aprovou**, se a policy exigia.

Não é uma tabela SQLite e não é um dashboard. É Markdown puro morando na mesma pasta onde o agente escreve o daily log. Dá para abrir com os olhos, comentar, commitar no Git, depois encontrar com grep ou mostrar como prova.

O OSB não vira aqui um sistema de pagamentos - não guarda carteira, não assina transações, não faz enforcement. Ele faz o que sabe fazer: mantém uma memória honesta e legível por humanos. O pay.sh dá ao agente acesso a recursos pagos; o Pay Memory dá ao humano a chance de abrir o vault uma semana depois e entender com calma o que aconteceu.

A propósito, [é assim que se parece um receipt de verdade](/files/fal-generate-a-no-text-fast-sdxl-illustration-for-the-techmeat-d.md) - o daquela mesma ilustração no início do post. Markdown cru direto do vault, sem nenhum processamento. Frontmatter com todos os campos listados acima e, abaixo, um texto em linguagem humana sobre o "por quê", o que a policy retornou e quanto realmente foi debitado.

Dentro do Second Brain ele mora neste caminho:

```
AI Wiki/
└── payments/
    └── 2026-05-10/
        └── fal-generate-a-no-text-fast-sdxl-illustration-for-the-techmeat-d.md
```

Sem mágica: data → pasta, slug → nome de arquivo. Confortável para grep, git diff e a navegação habitual no Obsidian.

## Um princípio que acabou importando mais que os outros

Quando revisei a implementação rascunho, meu olho fisgou na hora um detalhe: o receipt sempre escrevia "Allowed by the configured spending policy" - mesmo quando no vault não existia policy nenhuma.

Parece coisa pequena. Na verdade, mata o sentido inteiro.

Pay Memory é uma camada de audit. Uma camada de audit vale exatamente na medida em que é honesta. No momento em que o receipt começa a contar uma história bonita em vez da real, tudo desmorona. Então a regra ficou simples: melhor escrever `not_checked` do que logar `allowed` falsamente com confiança. Se a policy não foi verificada - fala isso. Se a policy retornou `denied` mas um humano deixou a chamada passar na mão - fala isso também.

A tentação do "narrativinha bonita" é o principal inimigo de um sistema de audit. E essa é, provavelmente, a lição mais importante do dia - que pretendo carregar para outras partes do projeto.

## Um pagamento real em produção

No fim do dia, tudo isso precisava ser conferido não em fixtures de sandbox, mas em dinheiro de verdade. Mandei dez centavos de USDC para uma carteira Solana recém-criada e pedi ao agente para encontrar três cafés em Belgrado via Google Places.

Um segundo depois voltaram três lugares reais - Artist Specialty Coffee, Dusha, DRIP. Tx finalizada na mainnet, $0.001 USDC, o saldo foi de 0.10 para 0.099. Assinatura no Solscan, clicável.

E aí toda a cadeia do Pay Memory entrou em ação: um receipt com a assinatura real no vault, uma asset note separada com os três cafés, um relatório diário de pagamentos e uma entrada curta no Daily com links para os dois arquivos. Eu consigo abrir o vault no Obsidian, clicar na prova, ver o pagamento real no explorer e bem do lado - uma história clara, em linguagem humana, do por que o agente fez aquilo.

## Para que tudo isso

Não estou tentando montar enterprise compliance para mim mesmo ou blockchain-for-everything. A arquitetura em si é constrangedoramente simples - um conjunto de arquivos Markdown nas pastas certas.

Mas a ideia por trás importa.

Se o agente trabalha cada vez mais autonomamente, a memória dele precisa cobrir não só ações textuais, mas também ações com consequências: chamar um serviço externo, gastar dinheiro, criar um asset, pedir uma approval. Pagamento é só o exemplo mais vívido, porque a questão da confiança aparece de cara. Os mesmos princípios se transferem fácil para publicar um post, mandar um email, fazer deploy, encomendar uma geração, uma operação on-chain.

Versão curta:

> pay.sh dá ao agente acesso a recursos pagos.
> Pay Memory dá ao humano a capacidade de entender, uma semana depois, por que o agente usou esse acesso.

Se o agente só gasta dinheiro - isso é risco. Se o agente gasta dinheiro e deixa um rastro honesto, ligado, legível por humanos - isso já é um workflow no qual aos poucos dá para começar a confiar.

O Pay Memory saiu como parte do [open-second-brain 0.8.0](https://github.com/itechmeat/open-second-brain/releases/tag/v0.8.0).
