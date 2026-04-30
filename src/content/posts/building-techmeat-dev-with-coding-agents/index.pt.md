---
title: "Como construí este blog com agentes de coding"
description: "A história do lançamento de techmeat.dev: de uma ideia espontânea e um conjunto de skills até Astro, Cloudflare Pages, brainstorming e a primeira versão do blog."
pubDate: 2026-04-28
tags: [ai-coding, astro, bun]
ogImage: "/posters/og/posts/building-techmeat-dev-with-coding-agents.png"
locale: pt
prFileId: 68a501c759956d4e79f4bdd7d956000008e89028f4ac4b26fa4c3ffc6d270937
---

Eu já tive um blog. Tráfego razoável, tema claro, experiência pessoal de verdade: eu escrevia sobre frontend e sobre as coisas que eu mesmo passava na mão. Depois, por motivos não muito importantes, parei de mantê-lo e, de quebra, perdi o domínio.

Por muito tempo me pareceu que a história tinha simplesmente acabado. Mas hoje deu vontade de escrever de novo, já não sobre frontend como profissão, e sim sobre como eu faço projetos reais com agentes de coding. Sem abstrações sobre o futuro do desenvolvimento — através de processos concretos, erros e decisões.

Foi assim que apareceu o [techmeat.dev](https://techmeat.dev/).

## Por que comecei isso

A ideia foi espontânea. Eu tinha tokens não usados acumulados, algumas hipóteses que queria testar, e decidi montar um projeto pequeno mas real: um blog onde o próprio processo de construção vira o primeiro material.

Meu workflow normal com agentes é bem mais elaborado: várias etapas de planejamento, review e checkpoints. Aqui simplifiquei de propósito. Queria ver até onde dá para ir se você fixa a direção rápido, prepara o contexto e passa para o agente a maior parte do trabalho inicial.

Não é um processo de referência, é uma versão experimental. Sobre a abordagem mais rigorosa eu provavelmente vou escrever em separado.

## Preparação: skills, contexto e regras do projeto

Primeiro instalei as skills necessárias. Para um projeto desses isso pesa mais do que parece: «monta um blog» é um enunciado fraco demais. O agente precisa de regras claras: que tecnologias usar, onde guardar o conteúdo, como pensar SEO, como tratar o design, o que não fazer sem necessidade. O conjunto inicial está fixado no arquivo de trabalho [INIT.md](https://github.com/itechmeat/techmeat-dev/blob/master/docs/INIT.md).

Depois inicializei o `CLAUDE.md`, o arquivo com o contexto base do projeto. O rascunho estava em russo, mas para o contexto de trabalho eu o traduzi imediatamente para inglês, para que servisse igualmente em todas as locales e em ferramentas diferentes.

```text
This project is empty for now, but I am going to build my blog here. The project will be based on Astro, and posts will be stored as Markdown files. Each article will go through a multi-stage SEO and GEO preparation workflow using the skills available in the project and the geo-optimizer-skill CLI: https://github.com/Auriti-Labs/geo-optimizer-skill, which is already installed.

The blog will be about building projects with AI coding.

The domain has already been chosen and purchased: techmeat.dev.

The project will be hosted on Cloudflare Pages.

The primary language of the blog will be English, but there will also be translations into other languages, at least 10 popular ones. Translation pages must point to the English version of the same article with canonical links.

The project design must be created using the impeccable skill.

All project documentation must be written in English. Draft documentation may be an exception.
```

Em seguida copiei o `CLAUDE.md` para `AGENTS.md`. Não quero amarrar o projeto a um agente específico: se amanhã eu continuar o desenvolvimento em outra ferramenta, as regras base ficam ao lado do código.

## Primeira execução: só fundação

Não pedi para o agente já fazer páginas ou design. No início eu precisava de uma fundação técnica correta: um projeto Astro pronto para Cloudflare Pages, com estrutura limpa e sem iniciativa demais.

O prompt foi propositalmente estreito:

```text
Let's start developing our blog project. First, use the Astro skills and set up the initial project, preparing it for hosting on Cloudflare Pages. There is no need to build pages or do any additional work right now. Only set up the project.
```

Quanto mais estreito o primeiro pedido, menor a chance de o agente começar a «melhorar» o projeto onde ainda não há decisão tomada. Isso poupa muito nervo: eu precisava de um ponto de partida confiável, não de um mockup bonito.

## Brainstorming em vez de design prematuro

Depois liguei o Superpowers e iniciei um brainstorming, pedindo expressamente para não falar de design. Nessa fase, o que precisava ser decidido era de que o blog é feito como produto, não como ele se parece.

O prompt foi assim:

```text
Let's brainstorm in Russian about what my blog should consist of. Here's how I currently see it:

- All pages should share a unified design, but we are not discussing the design itself yet, only common blocks and similar structural elements. The header should include the techmeat.dev name and a language switcher. To clarify, the brainstorming result should describe what the blog should have, not how it should look.
- The home page should show previews of the 10 latest posts with links to the full posts. Maybe it should include something else too; suggest options.
- There should be an About page: something like a CV, but in a more blog-like form.
- There should be a Contacts page with links to my social profiles and GitHub.
- Maybe some other pages are needed; suggest options.
- This should be a very simple blog, mostly informational. I expect to publish materials often.
```

O brainstorming levou cerca de uma hora. Para um projeto tão pequeno parece muito, mas o tempo se pagou: sem ele eu não teria saído com um plano coerente e uma spec de arquitetura. O agente ajudou a quebrar o blog em páginas, blocos comuns, modelo de idiomas e estrutura de conteúdo.

No final apareceram dois artefatos internos: o [plano](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/plans/2026-04-27-blog-v1.md) da primeira versão e a [especificação de arquitetura](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/specs/2026-04-27-blog-architecture-design.md).

## Desenvolvimento autônomo, review e fixes

Depois do brainstorming, só restava concordar com a direção e deixar o agente trabalhar. A maior parte da estrutura base apareceu de forma autônoma: rotas, conteúdo Markdown, locales, componentes, RSS, tags, infraestrutura para traduções.

Não foi totalmente sem intervenção manual. Adicionei alguns prompts corretivos: precisei o conjunto de idiomas, pedi para corrigir pequenos bugs e ajustar detalhes que o agente deixou escapar na primeira passada.

Depois pedi ao GPT-5.5 para revisar o código e aplicar os fixes na hora. Quase não me meti no processo: o agente achou várias melhorias úteis, aplicou-as e rodou as checagens. Sinceramente, esta versão eu vibe-codei quase inteira, coisa que normalmente tento evitar. Aqui dava: o projeto é pequeno, o custo de erro é baixo, e o sentido era justamente testar os limites dessa abordagem.

Aqui dá para ver bem como eu enxergo AI coding em geral. O agente não é um botão mágico de «me faça um produto», é um executor muito rápido que precisa de molduras, contexto e review periódico. Com molduras boas, ele tira um volume enorme de trabalho bruto. Com molduras vagas, ele produz incerteza com a mesma rapidez.

## Por que adiei o design

Não incluí o design na primeira fase de propósito. Para a parte visual eu tenho um processo separado, e queria passar por ele em separado, sem misturar arquitetura, conteúdo e interface numa só tarefa.

Por isso a primeira versão do blog parece um esqueleto técnico: rotas, localização, posts, tags e infraestrutura de publicação já estão lá, e o sistema visual não está, e isso é normal. Às vezes é mais útil ter primeiro um projeto que funciona e depois pensar com calma em como ele se parece e como passa.

## O que quero testar com este blog

techmeat.dev é um laboratório de trabalho, não um simples depósito de notas. Me interessa como o desenvolvimento muda quando há um agente de coding ao seu lado o tempo todo: onde ele acelera o trabalho, onde cria riscos ocultos, e onde ajuda a enxergar uma solução à qual sozinho eu chegaria muito mais tarde.

Três coisas em particular me prendem.

**Processo.** Não «o agente escreveu o código», mas o que houve antes e depois: quais prompts funcionaram, quais restrições tive de impor, quais decisões é melhor deixar com o humano.

**Qualidade.** AI-assisted development vira facilmente um fluxo de patches se você não mantiver plano e review. Quero mostrar tanto os resultados que deram certo quanto os pontos em que o agente errou ou em que minha formulação não foi precisa o suficiente.

**Repetibilidade.** Se a abordagem não pode ser repetida no próximo projeto, isso não é um processo, é um truque pontual. Por isso vou registrar não só o código final, mas também os esquemas de trabalho: como a tarefa foi posta, que arquivos apareceram, que ferramentas participaram, como foram tomadas as decisões.

## E o que vem depois

A próxima etapa é design. A continuação deste post será exatamente sobre isso: como eu o fiz, que decisões tomei, o que saiu no fim. Embora como ele vai realmente parecer, eu mesmo ainda não sei.

Por enquanto, para a história, fica registrado como o blog parece hoje:

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/eo8KNkGzBBM?si=KVKJ1hHw26kDkmtZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Design com Impeccable

Se você assistiu ao clipe acima, já viu como o blog era antes e como ficou depois.

Deixei o design para uma fase separada de propósito: não queria misturar com arquitetura e conteúdo numa só tarefa. Colegas me recomendaram o sistema de skills [Impeccable](https://impeccable.style/) — ele ajuda o agente a construir um visual mais bem pensado, em vez da estética padrão de IA.

Saiu simples e ao mesmo tempo nem tanto. Simples — porque tudo coube em um prompt e duas ou três rodadas de perguntas com o Claude Code. Nem tanto — porque o prompt tinha que ser escrito com cuidado, e as perguntas do Claude Code não eram lá tão fáceis.

Prompt inicial:

```text
The blog is already running on the base setup with starter content, but it was deliberately built without design — I wanted to handle that as a separate phase.

You have the impeccable skill, but I'm not great at using it yet. Let's learn it together from the docs at https://impeccable.style/docs/impeccable.

What I want for the blog: a simple, elegant design with minimal decorative imagery (ideally none at all). Content first, but the site should feel pleasant — design must not get in the way of consuming content. At the same time the visual character should reflect my own attitude toward design.

I have no references; let's build it from scratch.
The blog already has a light/dark theme toggle — we can keep it or drop it.
We have many locales, including Asian scripts and Arabic, so RTL matters.
Mobile-first is also important.
You'll find more details in /docs.
You can ask me questions, but don't drown me in them — only the essentials.
```

O Claude Code atualizou o design bem rápido. Depois de alguns prompts de ajuste o resultado me convenceu.

## Pôsteres com Pencil

Em seguida — pôsteres, para os links do blog ficarem bonitos quando compartilhados em redes sociais. Plugiei o [Pencil](https://www.pencil.dev/) (o MCP deles é excelente) e pedi ao Claude Code para construir um [sistema de pôsteres](https://github.com/itechmeat/techmeat-dev/blob/master/design/posters.pen) e exportá-lo para o projeto. Alguns ajustes manuais foram necessários, mas no geral — rápido e limpo.

Prompt para essa parte:

```text
I'm adding a `design/` folder to the project for design artifacts. Let's start with post posters.

Posters will live in Pencil — you have the MCP for that.

Build a poster system for every page of the blog; the layouts should be templated. Post posters should be kept separate so adding a new poster per post is easy.

Posters need two sizes — landscape and portrait — to cover both social-network variants.

Make a poster for the first post, fully on-spec and at the correct dimensions. The first poster will become the template, with small per-post variations.

Export every poster, place them correctly inside the project, and wire each one up to the matching page.

The home-page poster should also serve as the default poster for any page that doesn't have its own yet.
```

## Comentários, Lighthouse e hospedagem

Não plugiei um sistema de comentários — por enquanto não vejo necessidade. Se quiser comentar um post, há um link para a PR logo abaixo; pode deixar comentários direto lá.

No finalzinho pedi ao agente para passar Lighthouse no site e ajustar as métricas. Os números terminaram em 100%.

Para a hospedagem, desde o início queria a opção mais barata em dinheiro e tempo — Cloudflare Pages. Zero dólares por tudo, mais analytics embutido. O domínio, aliás, também comprei no Cloudflare — saiu mais barato que nos registrars de costume.

## O que vem a seguir

E assim fecha o primeiro ciclo: o blog funciona, está traduzido, tem design, pôsteres OG e métricas das quais não dá vergonha. O próximo passo é automatizar a escrita de posts. Tenho uma ideia de como fazer isso de jeito "moderno" — escreverei sobre ela em um post à parte.
