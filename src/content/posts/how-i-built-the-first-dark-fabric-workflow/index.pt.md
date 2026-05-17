---
title: "Como construí o primeiro workflow do Dark Factory"
description: "Hermes num VPS, um grafo kanban de 13 tarefas, revisões entre etapas em perfis diferentes, um mini-brainstorm com um humano via Telegram e um deploy bare-HTML no final. O primeiro stack Dark Factory funcional — sobreviveu a várias execuções de depuração e agora atravessa todas as etapas sem despacho manual."
pubDate: 2026-05-17
locale: pt
tags: [dark-factory, hermes, kanban, workflow, claude-code, codex]
ogImage: "/posters/og/posts/how-i-built-the-first-dark-fabric-workflow.png"
prFileId: 11f5f56ccbf479327505369985e02a46653fe19aafd435ddea82030afedcb23c
---

No [post anterior](/pt/posts/how-i-built-open-second-brain/) escrevi sobre o OpenSecondBrain — a camada de memória que os agentes de IA utilizam. A memória é apenas metade da história. A outra metade é o próprio processo: quem faz o quê, quem revê quem, o que conta como "feito" e como tudo arranca com uma única frase no chat.

Hoje lancei a primeira versão funcional: o workflow `new-project`. Levo uma ideia ao Telegram e, no final, obtenho um projeto totalmente montado com documentos, design, plano e uma página pública real.

## Como se vê de fora

Levo uma ideia. Por exemplo: "preciso de uma landing de uma página para o meu pequeno estúdio".

Depois respondo a rondas curtas de perguntas focadas. Primeiro, o brainstorm em si: quem é o público, o que se quer destacar, que stack prefiro, como se deve sentir. Depois, ao longo de cada etapa, mais algumas sessões curtas de 4–5 perguntas: tudo o que falta ao autor do documento atual para não ter de inventar.

Tudo o resto é a fábrica que faz. Entretanto posso tratar das minhas próprias coisas.

## Um kanban com cartões vivos

A parte mais visível de tudo isto é o quadro kanban. Quando digo "sim" ao plano final, o orquestrador cria nele 13 cartões numa única passagem, um por cada etapa de trabalho. A partir daí, tudo acontece à minha frente.

Os cartões movem-se sozinhos. O primeiro acende, recebe a marca `running`, e sei que um dos subagentes o assumiu. Uns minutos depois o cartão passa para `done` e o seguinte acende. Entre cada etapa produtora há sempre um cartão de revisão, e tem de ser outro subagente a assumi-lo: quem escreveu o documento nunca revê o próprio trabalho.

Às vezes a revisão falha. Aí o cartão de revisão passa para `blocked`, ao lado aparece uma nova fix-task para o mesmo autor, e todo o downstream fica à espera. Quando o autor corrige e fecha a fix-task, a revisão acorda e relê o artefacto. Pode passar. Pode mandar de volta. Máximo dois rounds, depois escala para mim.

No fim olho para o quadro quase como para um rastreamento de encomenda: agora estão a montar, agora a embalar, agora a enviar. Só que não é um estafeta — são vários subagentes a trabalhar em simultâneo em diferentes partes do meu projeto.

## O que sai no final

No fim do processo tenho:

- um `about.md` estruturado a capturar a essência da ideia;
- `specs.md` com requisitos funcionais e não funcionais;
- `architecture.md` com o contorno técnico;
- `plan.md` com um roadmap por fases até ao MVP;
- `DESIGN.md` com identidade visual, tokens, tipografia e ecrãs-chave;
- um repositório GitHub próprio do projeto com todos estes ficheiros;
- uma página pública implantada no subdomínio `<slug>.techmeat.dev`, a servir por enquanto o HTML mais simples possível que reflete o `about.md`. É a promessa de que o projeto existe e está acessível.

Implementar a própria funcionalidade é trabalho de outro workflow, o próximo. O objetivo deste primeiro é levar uma ideia ao estado "tudo descrito, tudo acordado, o projeto tem o seu próprio endereço". A partir daí já se pode contratar a fábrica para o desenvolvimento real.

## O que foi difícil

Fiz várias passagens de debug. De cada vez aparecia o seu próprio bug engraçado: um subagente tentava arrumar o seu próprio diretório de trabalho e matava a própria sessão de shell; ou começava a implementar a funcionalidade a meio de uma etapa, embora a implementação não entre neste workflow e seja trabalho do seguinte. Entre passagens corrigia o skill e reiniciava. No estado atual o ciclo corre limpo do início ao fim.

## Pelo caminho, a memória também cresceu

No post anterior prometi que o [OpenSecondBrain](https://github.com/itechmeat/open-second-brain) era a outra metade da história. Desde então essa metade amadureceu bastante, e para a própria fábrica isso importa.

A mudança principal é que o OpenSecondBrain passou a ter uma camada de "memória observacional". Antes escrevia nele à mão, como num diário. Agora os subagentes captam as minhas preferências à medida que trabalham (coisas como "os commits escrevem-se no imperativo" ou "não usar abreviaturas internas sem contexto"), deixam as notas numa caixa de entrada, e uma vez por dia um agente Hermes corre `dream` — uma passagem em segundo plano que promove observações recorrentes a regras. Essas regras carregam-se automaticamente no início de cada sessão seguinte, e deixo de me repetir vinte vezes.

Além disso: pesquisa de texto integral em toda a base de conhecimento do OpenSecondBrain, backup e rollback antes de cada passagem `dream`, uma camada separada que regista cada operação paga (o que foi pago, porquê, a que está associado) e proteção imposta pela máquina contra um agente sobrescrever acidentalmente as regras de outro. Tudo isto é o que torna a fábrica possível: quando um subagente escreve `DESIGN.md`, já vê as minhas preferências acumuladas sobre tipografia e interface. Deixei-as cair no chat uma vez, o OpenSecondBrain fixou-as, e agora viajam com cada novo projeto sem lembretes.

## O que vem a seguir

`new-project` é apenas o bootstrap. A seguir vem `new-feature` — um workflow que pega num projeto existente com os seus documentos e leva a próxima funcionalidade até à produção. E um terceiro, `bugfix`: triagem, repro, fix, verificação, ship. Juntos, estes três playbooks são a minha versão de Dark Factory para uma pessoa: levo uma ideia ou um relatório de bug, e sai uma funcionalidade a funcionar.

Até à fábrica completa o caminho ainda está pela frente. Mas o primeiro pedaço está montado e corre estável.

Publicar tudo isto como opensource é ainda demasiado cedo: nesta fase é mais investigação do que um produto acabado. Assim que o processo completo de construção de projetos corra de forma fiável, abro tudo. Sigam-me no [X](https://x.com/techmeat).
