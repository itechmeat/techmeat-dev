---
title: "Como construí o OpenSecondBrain"
description: "A história do open-second-brain: como o Hermes num VPS, Obsidian, MCP, CLI e vários runtimes de agentes formaram uma pequena memória baseada em arquivos para agentes de IA."
pubDate: 2026-05-09
locale: pt
tags: [second-brain, dark-factory, hermes, openclaw, claude-code, codex]
ogImage: "/posters/og/posts/building-techmeat-dev-with-coding-agents.png"
prFileId: 5eb3f4f34e5b72b4dc58b865f9490558e4bf35eaf4637e64266b3b2c02b657c7
---

Já venho usando ativamente diversas ferramentas de IA há bastante tempo, mas em algum momento ficou claro: eu não estava apenas usando-as — eu havia me "envolvido" quase completamente com agentes e tudo relacionado à IA.

Há vários meses, agentes escrevem código seguindo meus fluxos de trabalho: planejamento, implementação, revisão, correções, verificação repetida. Funciona, mas o processo tem uma cauda manual estranha. Mesmo quando um agente escreve o código, ainda preciso mover tarefas entre estágios, transferir contexto, lembrar as regras, executar verificações e garantir que o próximo executor entenda o que já aconteceu.

O trabalho repetitivo se tornou excessivo. Por isso, o próximo passo natural não foi mais uma funcionalidade, mas sim automatizar o próprio fluxo de trabalho.

Foi assim que surgiu o [OpenSecondBrain](https://github.com/itechmeat/open-second-brain) — uma tentativa de dar aos agentes uma memória adequada sobre o que fazemos, por que fazemos e quais decisões já foram tomadas.

## Dos fluxos de trabalho manuais à Dark Factory

No [primeiro post](/pt/posts/building-techmeat-dev-with-coding-agents/), escrevi sobre como lancei este blog com agentes de codificação. Lá o fluxo de trabalho foi deliberadamente simples: definir o contexto, construir um projeto Astro, passar pelo design, adicionar posts, verificar o resultado.

Mas meu processo habitual é mais complexo. Tem papéis, revisões intermediárias, agentes separados para diferentes tipos de tarefas e controle de qualidade em cada etapa. Quando há muitas tarefas desse tipo, a pessoa se torna um despachante: move o contexto para cá, pede àquele que verifique isto, entrega ao próximo agente a saída do anterior, não esquece de registrar a decisão.

Eu queria chegar a um modelo mais rígido que cada vez mais soa como Dark Factory: uma ideia de funcionalidade entra, uma funcionalidade sai — implementada, testada e publicada. Não "um agente escreveu um pedaço de código", mas uma fábrica que sabe decompor o trabalho em etapas e conduzi-lo pelo processo.

Ainda estamos longe de uma Dark Factory completa. Mas o primeiro passo prático já existe: o Hermes, rodando num VPS, com agentes para diferentes tarefas, skills, uma interface de Telegram e roteamento barato de modelos através do OmniRoute.

E quase imediatamente, o segundo componente obrigatório dessa fábrica se revelou: os agentes precisam de memória.

## Por que um agente precisa de um Second Brain

Se um agente trabalha numa única sessão, basta colocar o contexto no prompt. Se um agente trabalha num projeto durante semanas, isso não é suficiente.

Ele precisa saber:

- quais regras já foram adotadas no projeto;
- quais decisões foram discutidas e por que exatamente essas foram escolhidas;
- quais fatos surgiram durante as investigações;
- quais artefatos já foram criados;
- quais agentes participaram do trabalho;
- onde fica a base de conhecimento humana e onde fica a zona de serviço dos agentes.

E o mais importante — isso não deve depender apenas da "memória do modelo". Eu preciso de um sistema de conhecimento simples, verificável e baseado em arquivos que eu possa abrir manualmente, ler no Obsidian, sincronizar, fazer commit parcialmente ou não fazer commit de jeito nenhum.

Por isso o open-second-brain desde o início não se tornou "mais um chatbot com memória", mas sim uma pequena infraestrutura em torno de um vault Markdown.

## Por que Obsidian e Markdown

A escolha de um vault compatível com Obsidian foi quase óbvia.

Primeiro, são arquivos Markdown comuns. Sem magia, sem banco de dados proprietário, sem dependência de um serviço específico. Se um agente escreveu algo, posso abrir o arquivo e ver o resultado.

Segundo, o Obsidian já resolve bem a parte humana do Second Brain: notas, wikilinks, Daily Notes, navegação manual, grafo, busca. Não fazia sentido criar minha própria interface de conhecimento quando existe uma ferramenta familiar.

Terceiro, os agentes não precisam de todo o Obsidian. Eles precisam de operações determinísticas: criar uma estrutura de serviço, adicionar um evento ao log diário, construir um índice de páginas, verificar a saúde do vault, exportar a configuração sem segredos. Tudo isso pode ser feito via CLI e MCP, sem forçar o modelo a "pensar" sobre operações de arquivo onde é melhor executar um comando preciso.

Atualmente, o open-second-brain cria uma área de agentes `AI Wiki/` no vault, mantém logs diários em `Daily/*.md`, pode atualizar um índice Markdown, verificar a configuração e não toca nas notas humanas acima da seção de serviço `## Raw events`.

## Dei um repositório vazio — o agente escolheu a arquitetura

O mais interessante: eu não me sentei para projetar tudo isso como uma API de biblioteca clássica. Dei ao agente links para implementações populares, um repositório vazio e uma tarefa: criar um plugin universal, principalmente para o Hermes, mas de forma que outros agentes também pudessem adotá-lo.

O primeiro commit foi puramente documental: um README e bootstrap do projeto no dia 6 de maio. Depois o agente rapidamente construiu uma base de CLI, o comando `o2b`, init/doctor, primitivas de vault e um índice. No mesmo dia surgiu um servidor MCP — uma camada importante, pois através do MCP diferentes runtimes podem obter as mesmas ferramentas sem análise manual da linha de comando.

As primeiras versões foram muito pragmáticas: fazer com que o Hermes pudesse instalar o plugin, inicializar um vault, verificar o estado e escrever eventos. Não uma arquitetura perfeita no papel, mas uma memória mínima funcional para um agente real.

Depois o projeto começou a evoluir sob a pressão das integrações.

## Do Hermes a um plugin universal

O Hermes continuou sendo o runtime principal. Foi para ele que o projeto foi concebido: instalar um plugin, apontar para um vault, dar ferramentas ao agente e fazê-lo escrever eventos importantes no Second Brain.

Mas logo ficou claro que se prender apenas ao Hermes estava errado. Eu já tinha agentes e ambientes diferentes: Claude Code, Codex, OpenClaw. Se o Second Brain deveria ser uma memória compartilhada, não podia viver em apenas um cliente.

Assim surgiram no projeto adaptadores e manifestos para vários runtimes:

- Hermes como cenário principal de instalação;
- Claude Code através de um manifesto de marketplace e MCP;
- Codex através de seu próprio manifesto de marketplace e MCP;
- OpenClaw primeiro através de um adaptador JS, depois através de uma entrada de plugin nativo completa;
- um contrato MCP genérico para runtimes que aparecerão futuramente.

Essa é uma decisão arquitetônica importante: deve haver um único núcleo, mas podem existir múltiplos pontos de entrada. Os agentes não precisam discutir onde está a verdade. A verdade está no vault e no conjunto compartilhado de operações.

## O que tivemos que consertar pelo caminho

O open-second-brain evoluiu muito rapidamente: do dia 6 ao 9 de maio, o projeto passou de um README para a versão `0.7.0`. E quase todas as versões não foram "cosméticas", mas reações a problemas reais de integração.

Por exemplo, o OpenClaw primeiro obteve compatibilidade nativa de plugins, mas o runtime se revelou mais rigoroso do que o esperado. Foi preciso adicionar `name` dentro dos objetos tool, tornar `register()` síncrono e depois reescrever o plugin do OpenClaw para JavaScript puro sem `child_process`, porque o scanner de segurança bloqueava subprocessos.

O próximo grande tema foi a identidade. Se no diário está escrito apenas `@agent`, esse log é quase inútil. Por isso, na versão `0.6.0`, surgiu um fluxo de trabalho com nomes de agentes: `o2b init --agent-name`, registro em `AI Wiki/identity/agents.md` e verificação de que as entradas Daily recebem um `@agent-name` adequado em vez de um placeholder.

Depois vieram suporte a fuso horário, proteção contra escrita no vault errado, manifestos de marketplace para Claude e Codex, auto-instruções para MCP, normalização de argumentos vazios, verificação do fluxo de instalação e registro multi-agente. Nada disso soa como uma funcionalidade heroica de produto, mas são exatamente esses detalhes que distinguem um brinquedo de uma ferramenta que se pode deixar rodando num servidor.

## Versão 0.7.0: Um núcleo em TypeScript e Bun

A maior mudança aconteceu na `0.7.0`: o projeto migrou para um núcleo unificado em TypeScript sobre Bun.

Antes disso, o repositório tinha lógica paralela: uma implementação em Python para CLI/MCP, uma parte em JavaScript para OpenClaw, um shim do Hermes. Esse tipo de esquema começa a derivar rapidamente. Corrigiu um bug num lugar — sem garantia de ter corrigido em outro. Adicionou suporte a fuso horário no Python — melhor não esquecer de repetir no JS.

Na `0.7.0`, o agente eliminou a duplicação: Hermes, Claude Code, Codex e OpenClaw agora consomem módulos compartilhados de `src/core/`. O CLI vive em `src/cli/`, MCP em `src/mcp/`, e a entrada do OpenClaw é compilada de TypeScript para um bundle JS via `bun build`.

Junto surgiu uma suíte de testes adequada: `bun:test` com 176 casos, testes do shim Python, um teste concorrente de append-event com 12 processos, verificações de frescor do bundle e de sincronização de versões nos manifestos.

É exatamente nesse momento que se vê a vantagem de um fluxo de trabalho com agentes. É desagradável para um humano migrar manualmente o mesmo código entre runtimes e reescrever testes. Para um agente — não tem problema, desde que se dê um objetivo claro, restrições e verificação do resultado.

## Como funciona num VPS

Toda essa história roda num VPS comum por cerca de 8 dólares por mês. Lá também vive o Hermes, lá ocorre o desenvolvimento, lá são gerenciadas as assinaturas de IA e o roteamento de modelos através do OmniRoute.

Para mim, essa é uma parte importante do experimento. Não quero que fluxos de trabalho assistidos por IA exijam uma infraestrutura cara e separada. Preciso de um servidor, um navegador, Telegram como interface do agente, repositórios git por perto e acesso barato a modelos.

O resultado é um cenário bastante estranho mas funcional: posso escrever para o agente no Telegram pelo celular, ele vai analisar a tarefa no VPS, ir ao repositório, usar as skills necessárias, criar um artefato, executar verificações e escrever um evento importante no Second Brain.

Isso ainda não é Dark Factory. Mas também não é apenas "conversar com um modelo".

## O que saiu

No momento deste rascunho, o open-second-brain é uma camada de memória pequena mas já útil para o desenvolvimento baseado em agentes.

Ele pode:

- inicializar um vault compatível com Obsidian para trabalho de agentes;
- criar `AI Wiki/` e páginas de serviço;
- escrever eventos diários em Markdown;
- armazenar identidades de agentes;
- considerar o fuso horário do usuário, não apenas o horário do servidor;
- verificar a saúde do vault, da configuração e dos manifestos de runtime;
- exportar a configuração com valores sensíveis redigidos;
- funcionar via CLI, MCP e adaptadores de runtime;
- suportar Hermes, Claude Code, Codex e OpenClaw a partir de um único repositório.

O mais valioso nem é a lista de comandos. O que é valioso é que os agentes agora têm um protocolo de memória compartilhado: quando algo durável acontece — código, uma correção, uma mudança de configuração, conteúdo, um achado de pesquisa, uma decisão de design — precisa ser registrado de forma que o eu-do-futuro e o agente-do-futuro possam encontrar depois.

## O que vem a seguir

O objetivo mais próximo é levar a combinação Hermes + open-second-brain a um estado onde o agente não apenas escreva eventos, mas realmente use a memória acumulada durante o planejamento e a revisão.

Além disso, quero:

- conectar melhor os logs Daily com as páginas wiki;
- adicionar uma busca mais útil e resumos do histórico do projeto;
- escrever um post separado sobre como exatamente o Hermes funciona no VPS e como a comunicação via Telegram está configurada;
- transformar os fluxos de trabalho atuais numa Dark Factory mais autônoma;
- testar se diferentes agentes podem compartilhar um único vault sem dor e sem quebrar o contexto uns dos outros.

A principal conclusão até agora é simples: os agentes não precisam apenas de um modelo nem apenas de acesso a um repositório. Eles precisam de um ambiente onde decisões, fatos e eventos se tornem uma parte durável do processo.

[open-second-brain](https://github.com/itechmeat/open-second-brain) é meu primeiro passo funcional nessa direção.

## Como este post foi escrito

Desculpe, mas este post também foi escrito pelo mesmo agente Hermes. Apenas este parágrafo e meu [post no Facebook](https://www.facebook.com/reel/1355271143340726/) foram escritos à mão. Simplesmente pedi ao agente que clonasse meu blog como um projeto normal, olhasse o histórico de commits e usasse o post do Facebook como base. E claro, reli e corrigi o texto antes de publicar. E não me digam que isso não tem alma — eu coloco minha alma no agente.
