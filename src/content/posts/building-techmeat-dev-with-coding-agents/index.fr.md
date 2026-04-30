---
title: "Comment j'ai construit ce blog avec des agents de coding"
description: "L'histoire du lancement de techmeat.dev : d'une idée spontanée et d'un set de skills à Astro, Cloudflare Pages, le brainstorming et la première version du blog."
pubDate: 2026-04-28
tags: [ai-coding, astro, bun]
ogImage: "/posters/og/posts/building-techmeat-dev-with-coding-agents.png"
locale: fr
prFileId: b6bbbc7a58e0b30808e2e961dec07370723d248a48debeebac33d665dcecfe39
---

J'ai eu un blog autrefois. Trafic correct, sujet clair, vraie expérience personnelle : j'écrivais sur le frontend et sur les choses que je traversais moi-même. Puis, pour des raisons pas si importantes, j'ai arrêté de le maintenir et, dans la foulée, j'ai perdu le domaine.

Pendant longtemps j'ai cru que cette histoire était simplement terminée. Mais aujourd'hui j'avais à nouveau envie d'écrire, plus sur le frontend en tant que métier, mais sur la façon dont je construis de vrais projets avec des agents de coding. Sans abstractions sur le futur du développement : des processus concrets, des erreurs et des décisions.

C'est comme ça qu'est apparu [techmeat.dev](https://techmeat.dev/).

## Pourquoi je m'y suis mis

L'idée a été spontanée. Des tokens inutilisés s'accumulaient, j'avais quelques hypothèses à tester, et j'ai décidé de monter un petit projet mais bien réel : un blog dont le processus de construction devient le premier contenu.

Mon workflow habituel avec les agents est bien plus élaboré : plusieurs étapes de planification, de revue et de points de contrôle. Ici je l'ai volontairement simplifié. Je voulais voir jusqu'où on peut aller en fixant la direction rapidement, en préparant le contexte et en laissant l'agent faire l'essentiel du travail de démarrage.

Ce n'est pas un processus de référence, c'est une version expérimentale. Je parlerai sans doute à part de l'approche plus stricte.

## Préparation : skills, contexte et règles du projet

J'ai d'abord installé les skills nécessaires. Pour un projet comme celui-ci ça compte plus qu'on ne croit : « fais-moi un blog » est une formulation trop faible. L'agent a besoin de règles claires : quelles technologies utiliser, où stocker le contenu, comment penser le SEO, comment aborder le design, ce qu'il ne faut pas faire sans nécessité. Le set de départ est consigné dans le fichier de travail [INIT.md](https://github.com/itechmeat/techmeat-dev/blob/master/docs/INIT.md).

Ensuite j'ai initialisé `CLAUDE.md`, le fichier qui porte le contexte de base du projet. Le brouillon était en russe, mais pour le contexte de travail je l'ai tout de suite traduit en anglais, pour qu'il serve de la même manière dans toutes les locales et avec différents outils.

```text
This project is empty for now, but I am going to build my blog here. The project will be based on Astro, and posts will be stored as Markdown files. Each article will go through a multi-stage SEO and GEO preparation workflow using the skills available in the project and the geo-optimizer-skill CLI: https://github.com/Auriti-Labs/geo-optimizer-skill, which is already installed.

The blog will be about building projects with AI coding.

The domain has already been chosen and purchased: techmeat.dev.

The project will be hosted on Cloudflare Pages.

The primary language of the blog will be English, but there will also be translations into other languages, at least 10 popular ones. Translation pages must point to the English version of the same article with canonical links.

The project design must be created using the impeccable skill.

All project documentation must be written in English. Draft documentation may be an exception.
```

Ensuite j'ai copié `CLAUDE.md` vers `AGENTS.md`. Je ne veux pas attacher le projet à un agent en particulier : si demain je continue dans un autre outil, les règles de base resteront à côté du code.

## Premier démarrage : seulement les fondations

Je n'ai pas demandé à l'agent de commencer par les pages ou le design. Au départ il me fallait des fondations techniques correctes : un projet Astro prêt pour Cloudflare Pages, avec une structure propre et sans initiative de trop.

Le prompt était volontairement étroit :

```text
Let's start developing our blog project. First, use the Astro skills and set up the initial project, preparing it for hosting on Cloudflare Pages. There is no need to build pages or do any additional work right now. Only set up the project.
```

Plus la première demande est étroite, moins l'agent a de chances de partir « améliorer » le projet là où aucune décision n'a encore été prise. Ça épargne beaucoup de nerfs : il me fallait un point de départ fiable, pas une jolie maquette.

## Brainstorming au lieu d'un design prématuré

Ensuite j'ai activé Superpowers et lancé un brainstorming, en demandant explicitement de ne pas parler de design. À cette étape il fallait décider de quoi le blog est constitué en tant que produit, pas à quoi il ressemble.

Le prompt était le suivant :

```text
Let's brainstorm in Russian about what my blog should consist of. Here's how I currently see it:

- All pages should share a unified design, but we are not discussing the design itself yet, only common blocks and similar structural elements. The header should include the techmeat.dev name and a language switcher. To clarify, the brainstorming result should describe what the blog should have, not how it should look.
- The home page should show previews of the 10 latest posts with links to the full posts. Maybe it should include something else too; suggest options.
- There should be an About page: something like a CV, but in a more blog-like form.
- There should be a Contacts page with links to my social profiles and GitHub.
- Maybe some other pages are needed; suggest options.
- This should be a very simple blog, mostly informational. I expect to publish materials often.
```

Le brainstorming a pris environ une heure. Pour un projet aussi petit ça paraît beaucoup, mais le temps a été amorti : sans lui, je n'aurais pas eu de plan cohérent ni de spec d'architecture. L'agent a aidé à découper le blog en pages, blocs communs, modèle linguistique et structure de contenu.

Au final, deux artefacts internes sont sortis : le [plan](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/plans/2026-04-27-blog-v1.md) de la première version et la [spécification d'architecture](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/specs/2026-04-27-blog-architecture-design.md).

## Développement autonome, revue et corrections

Après le brainstorming, il ne me restait qu'à valider la direction et laisser l'agent travailler. L'essentiel de la structure de base est apparu de manière autonome : routes, contenu Markdown, locales, composants, RSS, tags, infrastructure pour les traductions.

Ce n'est pas passé entièrement sans intervention manuelle. J'ai ajouté quelques prompts correctifs : j'ai précisé le set de langues, je lui ai demandé de corriger de petits bugs et de resserrer des détails que l'agent avait laissés filer au premier passage.

Ensuite j'ai demandé à GPT-5.5 de faire la revue du code et d'appliquer les corrections dans la foulée. Je suis à peine intervenu : l'agent a trouvé plusieurs améliorations utiles, les a appliquées et a relancé les vérifications. Honnêtement, j'ai à peu près vibe-codé toute cette version, ce que j'évite habituellement. Ici c'était acceptable : le projet est petit, le coût d'erreur est faible, et le but était précisément de tester les limites de cette approche.

C'est là qu'on voit bien comment je perçois l'AI coding en général. L'agent n'est pas un bouton magique « fais-moi un produit », c'est un exécutant très rapide qui a besoin de cadres, de contexte et d'une revue régulière. Avec de bons cadres, il enlève un énorme volume de travail brut. Avec des cadres flous, il produit de l'incertitude tout aussi vite.

## Pourquoi j'ai reporté le design

Je n'ai pas inclus le design dans la première phase, et c'est volontaire. J'ai un processus à part pour la partie visuelle, et je voulais le passer séparément, sans mélanger architecture, contenu et interface dans une seule tâche.

C'est pour ça que la première version du blog ressemble à un squelette technique : routes, localisation, posts, tags et infrastructure de publication sont déjà là, le système visuel ne l'est pas, et c'est très bien comme ça. Parfois c'est plus utile d'avoir d'abord un projet qui fonctionne, puis de réfléchir tranquillement à son apparence et son ressenti.

## Ce que je veux tester avec ce blog

techmeat.dev est un laboratoire de travail, pas juste un entrepôt de notes. Ce qui m'intéresse, c'est comment le développement change quand un agent de coding est constamment à côté de toi : où il accélère le travail, où il crée des risques cachés, et où il aide à voir une solution à laquelle on n'arriverait que beaucoup plus tard tout seul.

Trois choses en particulier retiennent mon attention.

**Processus.** Pas « l'agent a écrit le code », mais ce qu'il y a eu avant et après : quels prompts ont fonctionné, quelles contraintes il a fallu poser, quelles décisions valent mieux laisser à l'humain.

**Qualité.** L'AI-assisted development se transforme vite en flot de patches si on ne tient pas le plan et la revue. Je veux montrer aussi bien les bons résultats que les endroits où l'agent s'est trompé ou ma formulation n'était pas assez précise.

**Reproductibilité.** Si l'approche ne peut pas être répétée sur le projet suivant, ce n'est pas un processus, c'est un coup de chance. Donc je vais consigner non seulement le code final, mais aussi les schémas de travail : comment la tâche a été posée, quels fichiers sont apparus, quels outils sont entrés en jeu, comment les décisions ont été prises.

## Et ensuite

L'étape suivante, c'est le design. La suite de ce post portera précisément là-dessus : comment je l'ai fait, quelles décisions j'ai prises, ce qui en est sorti. Bien que, à quoi il va ressembler exactement, je ne le sais pas encore moi-même.

En attendant, pour l'histoire, gardons une trace de ce à quoi ressemble le blog aujourd'hui :

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/eo8KNkGzBBM?si=KVKJ1hHw26kDkmtZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Design avec Impeccable

Si vous avez regardé la vidéo ci-dessus, vous avez déjà vu à quoi ressemblait le blog avant, et à quoi il a fini par ressembler après.

J'ai délibérément gardé le design comme une phase à part — pour ne pas le mélanger avec l'architecture et le contenu dans une seule tâche. Des collègues m'ont recommandé le système de skills [Impeccable](https://impeccable.style/) — il aide l'agent à construire un visuel plus réfléchi, à la place de l'esthétique IA par défaut.

Le résultat a été à la fois simple et pas simple. Simple — parce que tout est tenu dans un prompt et deux ou trois rounds de questions avec Claude Code. Pas simple — parce que le prompt, il a fallu l'écrire avec soin, et les questions de Claude Code n'étaient vraiment pas évidentes.

Prompt initial :

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

Claude Code a rafraîchi le design assez vite. Après quelques prompts de précision, le résultat me satisfaisait.

## Posters avec Pencil

Ensuite — les posters, pour que les liens vers le blog s'affichent bien sur les réseaux sociaux. J'ai branché [Pencil](https://www.pencil.dev/) (leur MCP est excellent) et demandé à Claude Code de construire un [système de posters](https://github.com/itechmeat/techmeat-dev/blob/master/design/posters.pen) et de l'exporter dans le projet. Quelques retouches manuelles ont été nécessaires, mais dans l'ensemble — rapide et propre.

Prompt pour cette partie :

```text
I'm adding a `design/` folder to the project for design artifacts. Let's start with post posters.

Posters will live in Pencil — you have the MCP for that.

Build a poster system for every page of the blog; the layouts should be templated. Post posters should be kept separate so adding a new poster per post is easy.

Posters need two sizes — landscape and portrait — to cover both social-network variants.

Make a poster for the first post, fully on-spec and at the correct dimensions. The first poster will become the template, with small per-post variations.

Export every poster, place them correctly inside the project, and wire each one up to the matching page.

The home-page poster should also serve as the default poster for any page that doesn't have its own yet.
```

## Commentaires, Lighthouse et hébergement

Je n'ai pas branché de système de commentaires — pour l'instant je n'en vois pas le besoin. Si vous voulez discuter d'un post, il y a un lien vers la PR en dessous ; vous pouvez laisser un commentaire directement là-bas.

Tout à la fin, j'ai demandé à l'agent de passer Lighthouse sur le site et de resserrer les chiffres. Ils ont fini par atterrir à 100 %.

Pour l'hébergement, je voulais dès le départ l'option la moins chère possible, en argent et en temps — Cloudflare Pages. Zéro dollar pour tout, plus l'analytics intégrée. Le domaine, d'ailleurs, je l'ai aussi acheté chez Cloudflare — il s'est avéré moins cher que chez les registrars habituels.

## La suite

Et c'est ce qui clôt le premier cycle : le blog tourne, il est traduit, il a un design, des posters OG et des métriques dont je n'ai pas honte. La prochaine étape, c'est automatiser l'écriture des posts. J'ai une idée pour le faire « à la moderne » — j'en parlerai dans un post à part.
