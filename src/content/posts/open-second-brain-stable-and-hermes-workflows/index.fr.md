---
title: "Open Second Brain est stable, et Dark Factory a reçu sa couche suivante"
description: "Open Second Brain a atteint une version stable, Hermes peut l'utiliser comme mémoire native, et Hermes Workflows transforme mes playbooks manuels en graphes de travail autonomes."
pubDate: 2026-06-16
locale: fr
tags: [open-second-brain, dark-factory, hermes, workflows, agents, memory]
ogImage: "/posters/og/posts/open-second-brain-stable-and-hermes-workflows.png"
---

Je continue à m'enfoncer dans l'écosystème Hermes Agent. En mai, cela ressemblait encore à une série d'expériences liées - mémoire, Kanban, Telegram, sous-agents, revues entre étapes -, mais maintenant l'ensemble commence à devenir un système cohérent.

Mon objectif reste le même : construire ma petite **Dark Factory**. Pas « un agent qui aide à écrire du code », mais une fabrique où une idée passe par un processus clair : analyse, planification, implémentation, revue, tests, déploiement et écriture des décisions en mémoire. L'autonomie complète est encore devant moi, mais une partie fonctionne déjà. Beaucoup de coordination manuelle avance maintenant toute seule.

Deux couches ont surtout grandi ces dernières semaines : [Open Second Brain](https://github.com/itechmeat/open-second-brain) comme mémoire et [Hermes Workflows](https://github.com/itechmeat/hermes-workflows) comme futur orchestrateur.

## Open Second Brain n'est plus une expérience

Open Second Brain a maintenant une version stable. Pour moi c'est une frontière psychologique importante : le projet ne ressemble plus à « testons vite une idée » et commence à se comporter comme un outil utilisable tous les jours.

Les contrats publics sont moins tremblants. Hermes peut connecter O2B comme memory provider natif, et non comme un bricolage sur le côté. Un Hermes sur mon laptop, un autre sur le VPS, Claude Code, Codex et d'autres runtimes peuvent lire le même vault Markdown sans perdre les règles accumulées, les préférences et les traces de décisions.

J'ai déjà expliqué pourquoi c'est important dans le billet sur [la construction d'OpenSecondBrain](/fr/posts/how-i-built-open-second-brain/). En bref : le développement agentique rencontre très vite un problème de mémoire. Pas « ce qu'il y avait dans la dernière réponse du modèle », mais ce que nous avons décidé il y a une semaine, quelles règles j'ai répétées cinq fois, quels artefacts existent déjà, où vit le contexte du projet et quelles conclusions ne doivent pas disparaître à la prochaine compaction.

O2B résout cela de façon très terre à terre : un vault compatible Obsidian, du Markdown simple, `Brain/`, des outils CLI/MCP déterministes, des passages `dream`, l'application progressive des changements de mémoire, rollback, recherche, notes quotidiennes, preferences et pinned context. Pas de cerveau SaaS caché à qui faire confiance. Les fichiers sont chez moi.

## Les étoiles et la vraie motivation

Le plugin gagne peu à peu en popularité. Au moment où j'écris, le dépôt a [71 étoiles](https://github.com/itechmeat/open-second-brain), encore loin des milliers.

Mais mon objectif n'est pas de « collecter des étoiles ». Ce serait agréable, bien sûr. Les étoiles aident les autres à voir que le projet vit et donnent un peu plus de visibilité au dépôt. Si O2B vous est utile ou simplement intéressant, une étoile aide.

La motivation principale est ailleurs : je suis moi-même l'utilisateur principal de ce plugin. Il résout d'abord mes propres problèmes. Je construis un environnement Hermes où les agents doivent mémoriser mes préférences, écrire des événements, expliquer d'où viennent les conclusions et transporter le contexte entre sessions. Si l'outil marche bien pour ce scénario, il a déjà rempli son rôle.

Le reste est un effet secondaire utile.

## Un test indépendant de mémoire

Le signal le plus intéressant n'est pas venu du README ni de mon autopromotion, mais d'un développeur indépendant qui comparait des plugins de mémoire sur une installation fraîche de Hermes. Il a donné à l'agent le choix entre plusieurs options - reddit obsidian layout, OpenSecondBrain, Honcho et OpenViking - et Hermes a choisi O2B comme mémoire préférée.

Le commentaire ressemble presque à une publicité, même si je ne l'ai pas demandé :

> So i gave my fresh install on a $1 vps the choice of a reddit obsidian layout, opensecondbrain, honcho and openviking and it chose opensecondbrain as its preferred memory.. nemotron3 ultra free said the quality is outstanding and 80% of what honcho provides. Just local and free. Only thing missing is the neuromancer inference.

La phrase sur les « 80% de Honcho » n'est pas le plus important pour moi. Ce genre de comparaison reste toujours approximatif : objectifs différents, architectures différentes, maturité différente.

Ce qui compte, c'est qu'une personne extérieure l'a installé dans un environnement propre, a donné le choix à l'agent, et O2B a été assez clair et utile pour être choisi sans mon intervention. Pour un projet né comme mémoire interne de mon Hermes, c'est une bonne étape.

## Où en est Dark Factory

Si je regarde Dark Factory dans son ensemble, j'ai déjà automatisé des morceaux qui étaient auparavant le travail manuel le plus ennuyeux.

Je peux donner une idée de projet à Hermes dans Telegram. Il pose des questions de clarification, découpe le travail en étapes, crée des documents, déplace les cartes sur le Kanban, confie la revue à un autre profil, corrige les remarques, déploie le résultat et écrit les événements importants en mémoire. C'est le même cycle que j'ai montré dans le billet sur le [premier workflow de Dark Factory](/fr/posts/how-i-built-the-first-dark-fabric-workflow/) puis à [Startit](/fr/posts/dark-factory-and-open-second-brain-at-startit/).

Voici une autre vidéo de cette même série d'expériences.

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/J09BbfMpMAw" title="Dark Factory, Open Second Brain et Hermes Workflows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Ce n'est toujours pas « appuyer sur un bouton et oublier pour toujours ». Je lis les résultats, j'ajuste le processus, j'arrête parfois un run, je renvoie parfois une tâche en arrière. Mais le changement clé est déjà là : je cesse d'être le répartiteur permanent entre les agents. De plus en plus, mon rôle consiste à formuler l'intention, prendre quelques décisions et vérifier le résultat.

Pour une personne seule, c'est déjà une vraie économie d'attention.

## La nouvelle couche : Hermes Workflows

Le prochain gros morceau est en développement actif : [Hermes Workflows](https://github.com/itechmeat/hermes-workflows). Le projet est encore jeune, mais c'est lui qui doit changer les règles du jeu.

Avant lui, mes workflows ressemblaient plutôt à des playbooks bien décrits au-dessus de Hermes : Kanban, cron, profils, rôles, conventions manuelles et un peu de colle. Cela marchait déjà, mais une partie du processus vivait encore dans ma tête et dans des instructions.

`hermes-workflows` fait un pas différent : le workflow devient un graphe.

Dans ce graphe, il y a des nœuds :

- `agent_task` - une tâche pour un profil Hermes précis ;
- `script` - une étape shell déterministe quand le modèle n'est pas nécessaire ;
- `condition` - une branche selon le résultat précédent ;
- `human_review` - un point explicite où un humain est requis ;
- `finish` - la fin avec livraison du résultat.

Le point important : ce n'est pas un moteur séparé qui essaie de remplacer Hermes. Le workflow se compile en primitives natives de Hermes : Kanban, Cron, Profiles, delivery router, skills. Le système reste lisible via les mêmes surfaces que j'utilise déjà.

Pour Dark Factory, c'est essentiel. Quand le processus est décrit comme un graphe, on peut le valider, l'exporter, le réutiliser, le lancer selon un calendrier, observer la live telemetry par nœud, voir les approvals en attente, relancer et analyser la trace après une panne. Ce n'est plus « on a dit à l'agent de suivre l'instruction », mais un contrat exécutable.

## Pourquoi cela rapproche la fabrique de l'autonomie

La principale faiblesse de Dark Factory n'est pas que les agents écrivent mal du code. Ils se trompent, bien sûr, mais les revues, les tests et les contraintes gèrent cela. La vraie faiblesse est le pilotage du processus.

Si le processus vit dans un long prompt, il est fragile. L'agent peut sauter une étape, mélanger les rôles, oublier que l'implémentation doit être revue par un autre profil ou commencer du travail downstream avant que l'upstream ait passé la revue.

Un graphe résout cela de façon plus ingénierie. Chaque nœud a une entrée, une sortie, un statut et des règles de transition. Si la revue échoue, le downstream ne se réveille pas. Si une étape script échoue, l'agent ne fait pas semblant que tout va bien. Si un humain est nécessaire, le workflow s'arrête sur `human_review` au lieu de deviner.

C'est ici que O2B et Hermes Workflows deviennent un seul système :

- workflows pilotent le processus ;
- Hermes exécute les tâches avec ses mécanismes natifs ;
- Open Second Brain stocke le contexte, les préférences, les décisions et les traces des runs ;
- l'humain reste dans la boucle là où c'est vraiment important.

Cela ressemble déjà plus à une fabrique qu'à un ensemble de tours AI séparés.

## La suite

Le prochain objectif est d'amener `hermes-workflows` au point où je pourrai montrer une vraie démo : pas seulement un joli graphe dans un dashboard, mais un run qui passe par plusieurs étapes agentiques, revue, branches, écriture en mémoire et livraison du résultat.

Quand cela sera stable, Dark Factory sera beaucoup plus proche de la forme pour laquelle j'ai commencé tout ça. Une idée en entrée. Un graphe de processus. Plusieurs agents avec des rôles différents. Une mémoire qui survit aux sessions. L'humain non comme répartiteur, mais comme propriétaire de l'intention et de la décision finale.

Le plus intéressant : Dark Factory a déjà commencé à se construire elle-même. Chaque nuit, elle lance un research pass : elle cherche de nouvelles idées pour améliorer Open Second Brain, compare les approches, extrait des patterns utiles et crée des tâches sur le Kanban de Hermes. Puis elle prend périodiquement un scope adapté en implémentation, l'amène jusqu'à une PR et, après mon approve, le transforme en release.

On peut voir des exemples dans les [GitHub Releases d'Open Second Brain](https://github.com/itechmeat/open-second-brain/releases). À partir de `v1.12.0`, les releases ont été implémentées entièrement par Hermes, sans ma participation au code. Je devais seulement lire la PR générée et l'approuver.

Cela sonne encore un peu grand, mais il y a quelques mois Open Second Brain n'était qu'un dépôt vide. Maintenant c'est un plugin stable que Hermes peut choisir comme mémoire.

On verra jusqu'où cette fabrique peut aller.
