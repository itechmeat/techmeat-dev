---
title: "Comment j'ai construit le premier workflow Dark Factory"
description: "Hermes sur un VPS, un graphe kanban de 13 tâches, des revues entre étapes sur différents profils, un mini-brainstorm avec un humain via Telegram, et un déploiement bare-HTML à la fin. Le premier stack Dark Factory opérationnel — il a survécu à plusieurs passages de débogage et traverse maintenant toutes les étapes sans dispatching manuel."
pubDate: 2026-05-17
locale: fr
tags: [dark-factory, hermes, kanban, workflow, claude-code, codex]
ogImage: "/posters/og/posts/how-i-built-the-first-dark-fabric-workflow.png"
---

Dans [le post précédent](/fr/posts/how-i-built-open-second-brain/), j'ai parlé d'OpenSecondBrain — la couche de mémoire qu'utilisent les agents IA. La mémoire n'est que la moitié de l'histoire. L'autre moitié, c'est le processus lui-même : qui fait quoi, qui relit qui, ce qui compte comme « fini », et comment tout cela se déclenche par une seule phrase dans le chat.

Aujourd'hui j'ai lancé la première version qui fonctionne : le workflow `new-project`. J'apporte une idée dans Telegram, et en sortie j'obtiens un projet entièrement déployé avec documents, design, plan et une vraie page publique.

## À quoi ça ressemble de l'extérieur

J'apporte une idée. Par exemple : « j'ai besoin d'une landing d'une page pour mon petit studio ».

Ensuite je réponds à de courtes séries de questions ciblées. D'abord, le brainstorm lui-même : qui est le public, quoi mettre en avant, quel stack je préfère, quelle ambiance. Puis, au fil de chaque étape, encore quelques sessions courtes de 4–5 questions : tout ce qui manque à l'auteur du document en cours pour ne pas avoir à inventer.

Le reste, c'est la fabrique qui le fait. Pendant ce temps je peux m'occuper de mes propres affaires.

## Un kanban avec des cartes vivantes

Le plus visible dans tout ça, c'est le tableau kanban. Quand je dis « oui » au plan final, l'orchestrateur y crée 13 cartes en une seule passe, une par étape de travail. Ensuite tout se passe sous mes yeux.

Les cartes bougent toutes seules. La première s'allume, prend le marqueur `running`, et je sais qu'un des sous-agents l'a prise. Quelques minutes plus tard la carte glisse vers `done` et la suivante s'allume. Entre chaque étape productrice il y a toujours une carte de revue, et c'est un autre sous-agent qui doit la prendre : celui qui a écrit le document ne se relit jamais lui-même.

Parfois la revue échoue. Alors la carte de revue passe en `blocked`, à côté apparaît une nouvelle fix-task pour le même auteur, et tout le downstream attend bien sagement. Une fois que l'auteur a corrigé et clos la fix-task, la revue se réveille et relit l'artefact. Ça peut passer. Ça peut repartir en correction. Maximum deux tours, ensuite ça escalade vers moi.

Au final je regarde le tableau presque comme un suivi de colis : maintenant on assemble, maintenant on emballe, maintenant on expédie. Sauf que ce n'est pas un coursier — c'est plusieurs sous-agents qui travaillent en parallèle sur différentes parties de mon projet.

## Ce qui sort à la fin

À la fin du processus j'ai :

- un `about.md` structuré qui capture l'essence de l'idée ;
- `specs.md` avec les exigences fonctionnelles et non fonctionnelles ;
- `architecture.md` avec le contour technique ;
- `plan.md` avec une feuille de route par phases jusqu'au MVP ;
- `DESIGN.md` avec l'identité visuelle, les tokens, la typographie et les écrans clés ;
- un dépôt GitHub dédié au projet contenant tous ces fichiers ;
- une page publique déployée sur le sous-domaine `<slug>.techmeat.dev`, qui sert pour l'instant le HTML le plus simple possible reflétant `about.md`. C'est la promesse que le projet existe et est accessible.

L'implémentation de la feature elle-même est le boulot d'un autre workflow, le suivant. L'objectif de celui-ci, le premier, est d'amener une idée à l'état « tout est décrit, tout est validé, le projet a sa propre adresse ». À partir de là on peut embaucher la fabrique pour le développement réel.

## Ce qui a été difficile

J'ai fait plusieurs passes de debug. À chaque fois c'était un nouveau bug rigolo : un sous-agent essayait de ranger son propre répertoire de travail et tuait sa propre session shell ; ou il se mettait à implémenter la feature en plein milieu d'une étape, alors que l'implémentation n'entre pas dans ce workflow et appartient au suivant. Entre les passes je patchais le skill et relançais. Dans son état actuel, le cycle tourne proprement du début à la fin.

## Au passage, la mémoire a grandi aussi

Dans le post précédent je promettais qu'[OpenSecondBrain](https://github.com/itechmeat/open-second-brain) était l'autre moitié de l'histoire. Depuis, cette moitié a pas mal mûri, et pour la fabrique elle-même ça compte.

Le changement principal, c'est qu'OpenSecondBrain a maintenant une couche de « mémoire d'observation ». Avant j'y écrivais à la main, comme dans un journal. Maintenant les sous-agents captent mes préférences au vol (genre « les commits s'écrivent à l'impératif » ou « pas d'abréviations internes sans contexte »), déposent les notes dans une boîte de réception, et une fois par jour un agent Hermes lance `dream` — une passe en arrière-plan qui promeut les observations récurrentes en règles. Ces règles se chargent automatiquement au début de chaque session suivante, et je n'ai plus à me répéter vingt fois.

En plus : recherche plein texte sur toute la base de connaissances OpenSecondBrain, backup et rollback avant chaque passe `dream`, une couche séparée qui enregistre chaque opération payante (ce qui a été payé, pourquoi, à quoi c'est rattaché), et une protection imposée par la machine contre le fait qu'un agent écrase accidentellement les règles d'un autre. Tout ça, c'est ce qui rend la fabrique possible : quand un sous-agent écrit `DESIGN.md`, il voit déjà mes préférences accumulées sur la typographie et l'interface. Je les ai lâchées une fois dans le chat, OpenSecondBrain les a épinglées, et maintenant elles voyagent dans chaque nouveau projet sans rappel.

## La suite

`new-project` n'est que le bootstrap. Le suivant sera `new-feature` — un workflow qui prend un projet existant avec ses documents et pousse la feature suivante jusqu'en production. Et un troisième, `bugfix` : triage, repro, fix, vérification, ship. Ensemble, ces trois playbooks sont ma version de Dark Factory pour une seule personne : j'apporte une idée ou un rapport de bug, et il en sort une feature qui marche.

La fabrique complète est encore devant. Mais le premier morceau est monté et tourne stablement.

Publier tout ça en opensource, c'est encore trop tôt : à ce stade c'est plus de la recherche qu'un produit fini. Dès que le processus complet de construction de projets tournera de manière fiable, j'ouvrirai tout. Suivez-moi sur [X](https://x.com/techmeat).
