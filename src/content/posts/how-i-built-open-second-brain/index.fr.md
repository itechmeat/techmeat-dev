---
title: "Comment j'ai construit OpenSecondBrain"
description: "L'histoire d'open-second-brain : comment Hermes sur un VPS, Obsidian, MCP, CLI et plusieurs runtimes d'agents se sont réunis en une petite mémoire basée sur des fichiers pour les agents IA."
pubDate: 2026-05-09
locale: fr
tags: [second-brain, dark-fabric, hermes, openclaw, claude-code, codex]
ogImage: "/posters/og/posts/building-techmeat-dev-with-coding-agents.png"
prFileId: dd85b0ca6ecbdd8fb291706ef1aa5df08d22a37c95e2deb8433f72a178b70631
---

J'utilise activement divers outils d'IA depuis longtemps, mais à un moment donné, une évidence s'est imposée : je ne faisais pas que les utiliser — je m'étais presque entièrement « emballé » d'agents et de tout ce qui touche à l'IA.

Depuis plusieurs mois, des agents écrivent du code selon mes flux de travail : planification, implémentation, revue, corrections, vérification itérative. Ça fonctionne, mais le processus garde une étrange traîne manuelle. Même quand un agent écrit le code, je dois toujours déplacer les tâches entre les étapes, transférer le contexte, rappeler les règles, lancer les vérifications et m'assurer que le prochain exécutant comprenne ce qui s'est déjà passé.

Le travail répétitif devenait trop important. Donc la prochaine étape naturelle n'était pas une fonctionnalité de plus, mais l'automatisation du flux de travail lui-même.

C'est ainsi qu'est né [OpenSecondBrain](https://github.com/itechmeat/open-second-brain) — une tentative de donner aux agents une véritable mémoire sur ce que nous faisons, pourquoi nous le faisons et quelles décisions ont déjà été prises.

## Des flux de travail manuels à Dark Fabric

Dans [le premier article](/fr/posts/building-techmeat-dev-with-coding-agents/), j'ai raconté comment j'avais lancé ce blog avec des agents de codage. Là, le flux de travail était délibérément simple : définir le contexte, construire un projet Astro, passer par le design, ajouter des articles, vérifier le résultat.

Mais mon processus habituel est plus complexe. Il y a des rôles, des revues intermédiaires, des agents séparés pour différents types de tâches et un contrôle qualité à chaque étape. Quand les tâches se multiplient, l'humain se transforme en dispatcheur : déplace le contexte ici, demande à celui-ci de vérifier cela, donne au prochain agent le résultat du précédent, n'oublie pas d'enregistrer la décision.

Je voulais aboutir à un modèle plus rigide qui ressemble de plus en plus à ce qu'on appelle Dark Fabric : une idée de fonctionnalité entre, une fonctionnalité sort — implémentée, testée et déployée. Pas « un agent a écrit un bout de code », mais une usine qui sait décomposer le travail en étapes et le faire passer par tout le processus.

On est encore loin d'une Dark Fabric complète. Mais le premier pas pratique existe déjà : Hermes, qui tourne sur un VPS, avec des agents pour différentes tâches, des compétences, une interface Telegram et un routage économique des modèles via OmniRoute.

Et presque immédiatement, le deuxième composant obligatoire de cette usine est apparu : les agents ont besoin de mémoire.

## Pourquoi un agent a besoin d'un Second Brain

Si un agent travaille sur une seule session, on peut simplement glisser le contexte dans le prompt. Si un agent travaille sur un projet pendant des semaines, ce n'est plus suffisant.

Il a besoin de savoir :

- quelles règles ont déjà été adoptées dans le projet ;
- quelles décisions ont été discutées et pourquoi celles-là précisément ont été retenues ;
- quels faits sont apparus au cours des investigations ;
- quels artefacts ont déjà été créés ;
- quels agents ont participé au travail ;
- où se trouve la base de connaissances humaine et où se trouve la zone utilitaire des agents.

Et surtout — ça ne doit pas dépendre uniquement de la « mémoire du modèle ». Il me faut un système de connaissances simple, vérifiable, basé sur des fichiers, que je puisse ouvrir à la main, lire dans Obsidian, synchroniser, committer partiellement ou ne pas committer du tout.

C'est pourquoi open-second-brain, dès le départ, n'est pas devenu « un énième chatbot avec mémoire », mais une petite infrastructure autour d'un vault Markdown.

## Pourquoi Obsidian et Markdown

Le choix d'un vault compatible Obsidian était presque évident.

D'abord, ce sont de simples fichiers Markdown. Pas de magie, pas de base de données propriétaire, pas de dépendance envers un service spécifique. Si un agent écrit quelque chose, je peux ouvrir le fichier et voir le résultat.

Ensuite, Obsidian gère déjà très bien la partie humaine du Second Brain : notes, wikilinks, Daily Notes, navigation manuelle, graphe, recherche. Il n'y avait aucun intérêt à construire ma propre interface de connaissances alors qu'un outil familier existe.

Enfin, les agents n'ont pas besoin de tout Obsidian. Ils ont besoin d'opérations déterministes : créer une structure utilitaire, ajouter un événement au journal quotidien, construire un index de pages, vérifier la santé du vault, exporter la configuration sans secrets. Tout ça peut se faire via CLI et MCP, sans forcer le modèle à « réfléchir » sur des opérations de fichiers là où il vaut mieux exécuter une commande précise.

Actuellement, open-second-brain crée une zone agent `AI Wiki/` dans le vault, tient des journaux quotidiens dans `Daily/*.md`, peut mettre à jour un index Markdown, vérifier la configuration et ne touche pas aux notes humaines au-dessus de la section utilitaire `## Raw events`.

## J'ai donné un dépôt vide — l'agent a choisi l'architecture

Le plus intéressant : je ne me suis pas assis pour concevoir tout ça comme une API de bibliothèque classique. J'ai donné à l'agent des liens vers des implémentations populaires, un dépôt vide et une mission : créer un plugin universel, d'abord pour Hermes, mais de façon à ce que d'autres agents puissent aussi l'adopter.

Le premier commit était purement documentaire : un README et l'amorçage du projet le 6 mai. Ensuite, l'agent a rapidement construit une base CLI, la commande `o2b`, init/doctor, les primitives de vault et un index. Ce même jour, un serveur MCP est apparu — une couche importante, car via MCP, différents runtimes peuvent obtenir les mêmes outils sans analyse manuelle de la ligne de commande.

Les premières versions étaient très pragmatiques : faire en sorte qu'Hermes puisse installer le plugin, monter un vault, vérifier le statut et écrire des événements. Pas une architecture parfaite sur le papier, mais une mémoire minimale fonctionnelle pour un agent réel.

Ensuite, le projet a commencé à évoluer sous la pression des intégrations.

## D'Hermes à un plugin universel

Hermes est resté le runtime principal. C'était pour lui que le projet avait été conçu : installer un plugin, pointer vers un vault, donner des outils à l'agent et le faire écrire les événements importants dans le Second Brain.

Mais il est vite apparu que se lier uniquement à Hermes était une erreur. J'avais déjà différents agents et différents environnements : Claude Code, Codex, OpenClaw. Si le Second Brain devait être une mémoire partagée, il ne pouvait pas vivre dans un seul client.

C'est ainsi que sont apparus dans le projet des adaptateurs et des manifestes pour plusieurs runtimes :

- Hermes comme scénario d'installation principal ;
- Claude Code via un manifeste de marketplace et MCP ;
- Codex via son propre manifeste de marketplace et MCP ;
- OpenClaw d'abord via un adaptateur JS, puis via une entrée de plugin natif complète ;
- un contrat MCP générique pour les runtimes qui apparaîtront plus tard.

C'est une décision architecturale importante : il ne doit y avoir qu'un seul noyau, mais il peut y avoir plusieurs points d'entrée. Les agents n'ont pas besoin de se disputer pour savoir où se trouve la vérité. La vérité est dans le vault et dans l'ensemble partagé d'opérations.

## Ce qu'il a fallu réparer en chemin

open-second-brain a évolué très rapidement : du 6 au 9 mai, le projet est passé d'un README à la version `0.7.0`. Et presque chaque version n'était pas de la « cosmétique », mais une réaction à un réel problème d'intégration.

Par exemple, OpenClaw a d'abord obtenu la compatibilité native de plugins, mais le runtime s'est révélé plus strict que prévu. Il a fallu ajouter `name` dans les objets tool, rendre `register()` synchrone, puis réécrire le plugin OpenClaw en JavaScript pur sans `child_process`, car le scanner de sécurité bloquait les sous-processus.

Le sujet suivant majeur a été l'identité. Si le journal dit juste `@agent`, un tel log est presque inutile. C'est pourquoi dans `0.6.0`, un flux de travail avec les noms d'agents est apparu : `o2b init --agent-name`, enregistrement dans `AI Wiki/identity/agents.md` et vérification que les entrées Daily reçoivent un vrai `@agent-name` au lieu d'un placeholder.

Ensuite sont arrivés la gestion des fuseaux horaires, la protection contre l'écriture dans le mauvais vault, les manifestes de marketplace pour Claude et Codex, les auto-instructions pour MCP, la normalisation des arguments vides, la vérification du flux d'installation et le registre multi-agents. Rien de tout ça ne ressemble à une fonctionnalité produit héroïque, mais ce sont précisément ces détails qui distinguent un jouet d'un outil qu'on peut laisser tourner sur un serveur.

## Version 0.7.0 : un seul noyau en TypeScript et Bun

Le changement le plus important est survenu dans `0.7.0` : le projet a migré vers un noyau unifié en TypeScript sur Bun.

Avant ça, le dépôt avait une logique parallèle : une implémentation Python pour CLI/MCP, une partie JavaScript pour OpenClaw, un shim Hermes. Ce genre de schéma dérive vite. Correction d'un bug à un endroit — pas garanti que ce soit corrigé ailleurs. Ajout du support des fuseaux horaires en Python — mieux vaut ne pas oublier de le répéter en JS.

Dans `0.7.0`, l'agent a supprimé la duplication : Hermes, Claude Code, Codex et OpenClaw consomment désormais des modules partagés depuis `src/core/`. Le CLI vit dans `src/cli/`, MCP dans `src/mcp/`, et l'entrée OpenClaw est compilée de TypeScript vers un bundle JS via `bun build`.

Au passage, une suite de tests correcte est apparue : `bun:test` avec 176 cas, des tests du shim Python, un test concurrent d'append-event avec 12 processus, des vérifications de fraîcheur du bundle et de synchronisation des versions dans les manifestes.

C'est exactement le moment où l'avantage d'un flux de travail avec agents se voit. Il est désagréable pour un humain de migrer manuellement le même code entre les runtimes et de réécrire les tests. Pour un agent — c'est tout à fait acceptable, tant qu'on lui donne un objectif clair, des contraintes et une vérification du résultat.

## Comment ça tourne sur un VPS

Toute cette histoire tourne sur un VPS ordinaire à environ 8 dollars par mois. Hermes y vit aussi, le développement s'y fait, les abonnements IA y sont gérés et le routage des modèles passe par OmniRoute.

Pour moi, c'est une partie importante de l'expérience. Je ne veux pas que les flux de travail assistés par IA nécessitent une infrastructure onéreuse et séparée. J'ai besoin d'un serveur, d'un navigateur, de Telegram comme interface agent, de dépôts git à proximité et d'un accès économique aux modèles.

Le résultat est un tableau plutôt étrange mais fonctionnel : je peux écrire à l'agent sur Telegram depuis mon téléphone, il analysera la tâche sur le VPS, ira dans le dépôt, utilisera les compétences nécessaires, créera un artefact, lancera les vérifications et écrira un événement important dans le Second Brain.

Ce n'est pas encore Dark Fabric. Mais ce n'est pas non plus juste « discuter avec un modèle ».

## Ce qui en est ressorti

Au moment de ce brouillon, open-second-brain est une couche de mémoire petite mais déjà utile pour le développement basé sur les agents.

Il sait :

- initialiser un vault compatible Obsidian pour le travail des agents ;
- créer `AI Wiki/` et des pages utilitaires ;
- écrire des événements quotidiens en Markdown ;
- stocker les identités des agents ;
- prendre en compte le fuseau horaire de l'utilisateur, pas seulement l'heure du serveur ;
- vérifier la santé du vault, de la configuration et des manifestes de runtime ;
- exporter la configuration en masquant les valeurs sensibles ;
- fonctionner via CLI, MCP et des adaptateurs de runtime ;
- prendre en charge Hermes, Claude Code, Codex et OpenClaw depuis un seul dépôt.

Le plus précieux n'est même pas la liste des commandes. Ce qui est précieux, c'est que les agents disposent désormais d'un protocole de mémoire partagé : quand quelque chose de durable se produit — du code, un correctif, un changement de config, du contenu, une conclusion de recherche, une décision de design — il faut l'enregistrer pour que le moi-du-futur et l'agent-du-futur puissent le retrouver plus tard.

## La suite

L'objectif le plus proche est d'amener la combinaison Hermes + open-second-brain à un état où l'agent ne se contente pas d'écrire des événements, mais utilise réellement la mémoire accumulée lors de la planification et de la revue.

Au-delà, je veux :

- mieux connecter les journaux Daily avec les pages wiki ;
- ajouter une recherche plus utile et des résumés de l'historique du projet ;
- écrire un article séparé sur la façon dont Hermes fonctionne exactement sur le VPS et comment la communication via Telegram est configurée ;
- transformer les flux de travail actuels en une Dark Fabric plus autonome ;
- vérifier si différents agents peuvent partager un seul vault sans douleur et sans casser le contexte mutuel.

La conclusion principale pour l'instant est simple : les agents n'ont pas besoin seulement d'un modèle ni seulement d'un accès à un dépôt. Ils ont besoin d'un environnement où les décisions, les faits et les événements deviennent une partie durable du processus.

[open-second-brain](https://github.com/itechmeat/open-second-brain) est mon premier pas fonctionnel dans cette direction.

## Comment cet article a été écrit

Désolé, mais cet article a également été écrit par le même agent Hermes. Seul ce paragraphe et mon [post Facebook](https://www.facebook.com/reel/1355271143340726/) ont été écrits à la main. J'ai simplement demandé à l'agent de cloner mon blog comme un projet normal, d'examiner l'historique des commits et de prendre le post Facebook comme base. Et bien sûr, j'ai relu et corrigé le texte avant la publication. Et ne me dites pas que ça n'a pas d'âme — je mets mon âme dans l'agent.
