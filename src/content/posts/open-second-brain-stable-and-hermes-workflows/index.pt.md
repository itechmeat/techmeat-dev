---
title: "Open Second Brain ficou estável, e a Dark Factory ganhou a próxima camada"
description: "Open Second Brain chegou a uma versão estável, Hermes agora pode usá-lo como memória nativa, e Hermes Workflows transforma meus playbooks manuais em grafos autônomos de trabalho."
pubDate: 2026-06-16
locale: pt
tags: [open-second-brain, dark-factory, hermes, workflows, agents, memory]
ogImage: "/posters/og/posts/open-second-brain-stable-and-hermes-workflows.png"
---

Continuo mergulhando no ecossistema do Hermes Agent. Em maio isso ainda parecia uma série de experimentos conectados - memória, Kanban, Telegram, subagentes, revisões entre etapas -, mas agora as peças começam a virar um sistema mais inteiro.

O objetivo continua o mesmo: construir minha pequena **Dark Factory**. Não “um agente que ajuda a escrever código”, mas uma fábrica em que uma ideia passa por um processo claro: análise, planejamento, implementação, revisão, testes, deploy e registro das decisões na memória. A autonomia completa ainda está no caminho, mas parte desse objetivo já foi alcançada. Muito do despacho manual que eu fazia agora realmente anda sozinho.

Nas últimas semanas, duas camadas cresceram mais: [Open Second Brain](https://github.com/itechmeat/open-second-brain) como memória e [Hermes Workflows](https://github.com/itechmeat/hermes-workflows) como futuro orquestrador.

## Open Second Brain deixou de ser experimento

Open Second Brain ganhou uma versão estável. Para mim isso é uma fronteira psicológica importante: o projeto deixou de parecer “vamos testar uma ideia rápido” e começou a se comportar como uma ferramenta de uso diário.

Os contratos públicos ficaram menos instáveis. Hermes pode conectar O2B como memory provider nativo, não como um remendo lateral. Um Hermes no notebook, outro na VPS, Claude Code, Codex e outros runtimes podem olhar para o mesmo vault Markdown sem perder regras acumuladas, preferências e rastros de decisões.

Já expliquei por que isso importa no post sobre [como construí o OpenSecondBrain](/pt/posts/how-i-built-open-second-brain/). Em resumo: desenvolvimento com agentes encontra rapidamente um problema de memória. Não “o que estava na última resposta do modelo”, mas o que decidimos na semana passada, quais regras eu já repeti cinco vezes, quais artefatos existem, onde está o contexto do projeto e quais conclusões não podem sumir na próxima compactação.

O2B resolve isso de forma bem concreta: vault compatível com Obsidian, Markdown puro, `Brain/`, ferramentas CLI/MCP determinísticas, passagens `dream`, aplicação staged de mudanças de memória, rollback, busca, notas diárias, preferences e pinned context. Nenhum cérebro SaaS escondido que precise de confiança extra. Os arquivos ficam comigo.

## Estrelas e a motivação real

O plugin está ganhando popularidade aos poucos. No momento em que escrevo, o repositório tem [71 estrelas](https://github.com/itechmeat/open-second-brain), ainda longe de milhares.

Mas meu objetivo não é “coletar estrelas”. Seria agradável, claro. Estrelas ajudam outras pessoas a perceber que o projeto está vivo e dão um pouco mais de visibilidade ao repositório. Se O2B é útil ou interessante para você, uma estrela ajuda.

A motivação principal é outra: eu sou o usuário principal desse plugin. Ele resolve primeiro os meus problemas. Estou montando um ambiente Hermes em que agentes precisam lembrar minhas preferências, escrever eventos, explicar de onde vieram conclusões e carregar contexto entre sessões. Se a ferramenta funciona bem nesse cenário, ela já se pagou.

O resto é um efeito colateral útil.

## Um teste independente de memória

O sinal mais interessante não veio do README nem da minha autopromoção, mas de um desenvolvedor independente comparando plugins de memória numa instalação limpa do Hermes. Ele deu ao agente uma escolha entre reddit obsidian layout, OpenSecondBrain, Honcho e OpenViking - e o Hermes escolheu O2B como memória preferida.

O comentário parece quase propaganda, embora eu não tenha pedido:

> So i gave my fresh install on a $1 vps the choice of a reddit obsidian layout, opensecondbrain, honcho and openviking and it chose opensecondbrain as its preferred memory.. nemotron3 ultra free said the quality is outstanding and 80% of what honcho provides. Just local and free. Only thing missing is the neuromancer inference.

Para mim, a parte importante não é “80% do Honcho”. Comparações assim são sempre aproximadas: objetivos diferentes, arquiteturas diferentes, maturidades diferentes.

O importante é que alguém de fora instalou isso num ambiente limpo, deu escolha ao agente, e O2B foi claro e útil o suficiente para ser escolhido sem minha mão na balança. Para um projeto que começou como memória interna do meu Hermes, é um bom marco.

## Onde a Dark Factory está agora

Olhando para a Dark Factory como um todo, já automatizei partes que antes eram o trabalho manual mais chato.

Posso mandar uma ideia de projeto para o Hermes no Telegram. Ele faz perguntas de esclarecimento, divide o trabalho em etapas, cria documentos, move cartões no Kanban, passa a revisão para outro perfil, corrige comentários, faz deploy do resultado e escreve eventos importantes na memória. É o mesmo ciclo que mostrei no post sobre o [primeiro workflow da Dark Factory](/pt/posts/how-i-built-the-first-dark-fabric-workflow/) e depois no [Startit](/pt/posts/dark-factory-and-open-second-brain-at-startit/).

Abaixo está mais um vídeo dessa mesma linha de experimentos.

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/J09BbfMpMAw" title="Dark Factory, Open Second Brain e Hermes Workflows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Isso ainda não é “apertar um botão e esquecer para sempre”. Eu leio resultados, ajusto o processo, às vezes paro um run, às vezes devolvo uma tarefa. Mas a virada principal já aconteceu: deixo de ser o despachante permanente entre agentes. Cada vez mais meu papel é formular a intenção, tomar algumas decisões e verificar o resultado.

Para uma pessoa só, isso economiza atenção de verdade.

## A nova camada: Hermes Workflows

A próxima peça grande está em desenvolvimento ativo: [Hermes Workflows](https://github.com/itechmeat/hermes-workflows). O projeto ainda é jovem, mas é ele que deve mudar as regras do jogo.

Antes dele, meus workflows pareciam mais playbooks bem descritos sobre Hermes: Kanban, cron, perfis, papéis, acordos manuais e um pouco de cola. Isso já funcionava, mas parte do processo ainda vivia na minha cabeça e nas instruções.

`hermes-workflows` dá outro passo: o workflow vira um grafo.

Dentro do grafo existem nós:

- `agent_task` - uma tarefa para um perfil específico do Hermes;
- `script` - um passo shell determinístico quando não é preciso modelo;
- `condition` - uma ramificação pelo resultado anterior;
- `human_review` - um ponto explícito em que uma pessoa é necessária;
- `finish` - conclusão com entrega do resultado.

A parte importante: isso não é um motor separado tentando substituir o Hermes. O workflow compila para primitivas nativas do Hermes: Kanban, Cron, Profiles, delivery router, skills. O sistema continua legível pelas mesmas superfícies que eu já uso.

Para a Dark Factory isso é fundamental. Quando o processo é descrito como grafo, dá para validar, exportar, reutilizar, agendar, observar live telemetry por nó, ver approvals pendentes, fazer retry e analisar trace depois de falhas. Já não é “o agente recebeu uma instrução”, mas um contrato executável.

## Por que isso aproxima a fábrica da autonomia

A principal fraqueza da Dark Factory não é que os agentes escrevam código ruim. Eles erram, claro, mas revisão, testes e restrições lidam com isso. A principal fraqueza é o controle do processo.

Se o processo vive num prompt longo, ele é frágil. O agente pode pular uma etapa, misturar papéis, esquecer que implementação precisa de revisão por outro perfil ou começar trabalho downstream antes de o upstream passar pela revisão.

Um grafo resolve isso de forma mais engenheira. Cada nó tem entrada, saída, status e regras de transição. Se a revisão falha, downstream não acorda. Se um script falha, o agente não finge que está tudo bem. Se precisa de uma pessoa, o workflow para em `human_review` em vez de adivinhar.

É aqui que O2B e Hermes Workflows viram um sistema:

- workflows conduzem o processo;
- Hermes executa tarefas com mecanismos nativos;
- Open Second Brain guarda contexto, preferências, decisões e rastros dos runs;
- a pessoa fica no loop onde isso realmente importa.

Isso já se parece mais com uma fábrica do que com um conjunto de truques soltos de AI.

## O que vem depois

A meta mais próxima é levar `hermes-workflows` ao ponto em que eu consiga mostrar uma demo completa: não só um grafo bonito no dashboard, mas um run que passa por várias etapas de agentes, revisão, ramificações, escrita na memória e entrega do resultado.

Quando isso funcionar de forma estável, a Dark Factory ficará muito mais próxima do formato pelo qual comecei tudo isso. Ideia na entrada. Grafo de processo. Vários agentes em papéis diferentes. Memória que sobrevive a sessões. A pessoa não como despachante, mas como dona da intenção e da decisão final.

O mais interessante: a Dark Factory já começou a se construir sozinha. Todas as noites ela faz um research pass: procura novas ideias para melhorar o Open Second Brain, compara abordagens, extrai padrões úteis e cria tarefas no Kanban do Hermes. Depois, periodicamente, pega um scope adequado para implementação, leva até um PR e, depois do meu approve, transforma em release.

Exemplos desses releases estão em [GitHub Releases do Open Second Brain](https://github.com/itechmeat/open-second-brain/releases). A partir da `v1.12.0`, os releases foram implementados totalmente pelo Hermes sem minha participação no código. Eu só precisei ler o PR criado e aprovar.

Ainda soa um pouco grande, mas há alguns meses Open Second Brain era apenas um repositório vazio. Agora é um plugin estável que o Hermes pode escolher como memória.

Vamos ver até onde consigo levar essa fábrica.
