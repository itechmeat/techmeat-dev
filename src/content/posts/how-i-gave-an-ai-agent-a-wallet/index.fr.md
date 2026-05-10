---
title: "Comment j'ai donné un portefeuille à mon agent IA et pourquoi il lui a tout de suite fallu une mémoire"
description: "open-second-brain 0.8.0 et Pay Memory : comment j'ai laissé l'agent payer des API externes via pay.sh et pourquoi l'élément clé n'a pas été le paiement lui-même, mais une trace claire de chaque centime dépensé."
pubDate: 2026-05-10
locale: fr
tags: [pay-memory, agent-payments, pay-sh, solana, second-brain]
ogImage: "/posters/og/posts/how-i-gave-an-ai-agent-a-wallet.png"
prFileId: 39a14fdd64ca131a6fc96bdb82bee239443e6a34205b8f28a72b9dfbc74438c5
---

Il y a quelques jours j'ai sorti [open-second-brain](/fr/posts/how-i-built-open-second-brain/) - une couche de mémoire fichier pour les agents IA. Depuis, une idée me trottait dans la tête. Si un agent tourne sur un VPS, selon son propre planning, via Telegram - tôt ou tard il va devoir dépenser de l'argent. Acheter un appel d'API. Générer une illustration. Déclencher une recherche payante.

Le paiement en lui-même est un problème déjà résolu. [pay.sh](https://pay.sh) transforme un appel HTTP ordinaire en appel payant via des micropaiements en USDC sur Solana. L'agent exécute curl à travers `pay`, le portefeuille signe la transaction, l'autre côté renvoie une réponse. Fini.

Mais « fini » n'est que la moitié de l'histoire.

## Chaos avec un portefeuille

Imaginez : l'agent travaille sur une tâche, prend une poignée de décisions au passage, dont deux sont des appels payants. Une heure plus tard vous ouvrez le terminal et le scrollback a déjà filé hors de l'écran. Quelque part là-haut il y a eu des invocations de `pay`, quelque part des signatures de tx sont arrivées, quelque part des réponses JSON sont revenues.

Pourquoi l'agent a-t-il fait ça ? Sur quelle base ? Combien comptait-il dépenser ? Combien a réellement été débité ? Où est le résultat ?

Si vous voulez faire confiance à l'agent pour quoi que ce soit d'autonome, « lis le scrollback » ne suffit pas. Un log de terminal n'est pas structuré, n'est pas lié à la tâche, n'est pas indexable, ne survit pas à un redémarrage, et on ne peut pas l'ouvrir dans Obsidian comme un artefact normal.

J'ai assez vite compris que la tâche n'était pas « apprendre à l'agent à payer » - c'était « faire en sorte que chaque paiement laisse derrière lui une trace qui ait du sens ».

![Un agent IA tenant un portefeuille numérique tandis qu'une traînée de micropaiements coule dans des cartes-reçus Markdown reliées entre elles](./image.png)

Cette illustration a été générée exactement de la manière que décrit le post : via `pay.sh`, en utilisant la passerelle x402 `paysponge/fal` et l'endpoint `fal-ai/fast-sdxl`. La génération a coûté **0.01 USDC** depuis le portefeuille mainnet `64FaukkZDUdFTufXF49H1CrHjDfsmBFqfrUjsAS8XrgP` ; la transaction Solana publique est [`5ZYnkabzLvHqEgXNJfKopiRwbGkriHJ2bps2NnkX7HzqQAyTZYjcyJVCTvZwMquyMviv2juyAdbP9P2depHrJxQW`](https://solscan.io/tx/5ZYnkabzLvHqEgXNJfKopiRwbGkriHJ2bps2NnkX7HzqQAyTZYjcyJVCTvZwMquyMviv2juyAdbP9P2depHrJxQW). Le request id était `019e135a-357b-71f3-8b9d-305e728b05fb`, et l'asset généré a été sauvegardé localement sous `image.png`.

Et c'est là qu'open-second-brain s'est parfaitement glissé.

## Pay Memory

Dans la version 0.8.0, OSB a reçu une nouvelle couche - **Pay Memory**. En bref : de la mémoire pour l'argent.

Après chaque action payante, un fichier Markdown ordinaire apparaît dans le vault, avec ces champs :

- **pourquoi** l'agent a décidé de payer ;
- **quel service** a été appelé ;
- **quelle spending policy** s'appliquait et ce qu'elle a décidé (`allowed` / `approval_required` / `denied` / `not_checked`) ;
- **coût attendu** et **montant réellement débité** ;
- **payment proof** - la signature Solana précise que vous pouvez ouvrir dans Solscan et vérifier ;
- **le résultat** - un lien vers une asset note séparée avec la sortie ;
- **qui a approuvé**, si la policy l'exigeait.

Ce n'est pas une table SQLite et ce n'est pas un dashboard. C'est du Markdown ordinaire posé dans le même dossier où l'agent écrit son daily log. Vous pouvez l'ouvrir des yeux, le commenter, le committer dans Git, le retrouver plus tard avec grep, ou le montrer comme preuve.

OSB ne devient pas ici un système de paiement - il ne détient pas de portefeuille, ne signe pas de transactions, ne fait pas d'enforcement. Il fait ce qu'il sait faire : il tient une mémoire honnête et lisible par un humain. pay.sh donne à l'agent l'accès à des ressources payantes ; Pay Memory donne à l'humain la possibilité d'ouvrir le vault une semaine plus tard et de comprendre calmement ce qui s'est passé.

Au passage, [voilà à quoi ressemble un vrai receipt](/files/fal-generate-a-no-text-fast-sdxl-illustration-for-the-techmeat-d.md) - celui de l'illustration tout en haut de ce post. Du Markdown brut, directement sorti du vault, sans aucun traitement. Frontmatter avec tous les champs listés plus haut et, en dessous, un texte en langage humain sur le « pourquoi », ce que la policy a renvoyé et combien a été effectivement débité.

À l'intérieur du Second Brain, il vit à ce chemin :

```
AI Wiki/
└── payments/
    └── 2026-05-10/
        └── fal-generate-a-no-text-fast-sdxl-illustration-for-the-techmeat-d.md
```

Pas de magie : date → dossier, slug → nom de fichier. Pratique pour grep, git diff et la navigation usuelle dans Obsidian.

## Un principe qui s'est avéré plus important que le reste

Quand j'ai relu l'implémentation brouillon, mon œil a tout de suite accroché un détail : le receipt écrivait toujours « Allowed by the configured spending policy » - même quand aucune policy n'existait dans le vault.

Ça a l'air d'un détail. En réalité, ça tue tout le propos.

Pay Memory est une couche d'audit. Une couche d'audit vaut exactement autant qu'elle est honnête. Au moment où le receipt commence à raconter une belle histoire à la place de la vraie, tout s'effondre. La règle s'est donc avérée simple : mieux vaut écrire `not_checked` que logger avec assurance `allowed` à tort. Si la policy n'a pas été vérifiée - dis-le. Si la policy a renvoyé `denied` mais qu'un humain a fait passer l'appel à la main - dis-le aussi.

La tentation d'un « beau récit » est le principal ennemi d'un système d'audit. Et c'est probablement la leçon la plus importante de la journée - une que je compte porter dans d'autres parties du projet.

## Un vrai paiement en production

En fin de journée, tout ça il fallait le vérifier non pas sur des fixtures sandbox, mais sur du vrai argent. J'ai envoyé dix centimes d'USDC sur un portefeuille Solana tout neuf et demandé à l'agent de trouver trois cafés à Belgrade via Google Places.

Une seconde plus tard, trois lieux réels sont revenus - Artist Specialty Coffee, Dusha, DRIP. Tx finalisée sur mainnet, $0.001 USDC, le solde est passé de 0.10 à 0.099. Signature dans Solscan, cliquable.

Et alors toute la chaîne Pay Memory s'est enclenchée : un receipt avec la vraie signature dans le vault, une asset note séparée avec les trois cafés, un rapport de paiements quotidien, et une courte entrée dans Daily avec des liens vers les deux fichiers. Je peux ouvrir le vault dans Obsidian, cliquer sur la preuve, voir le vrai paiement dans l'explorateur, et juste à côté - une histoire claire, en langage humain, du pourquoi l'agent l'a fait.

## À quoi bon tout ça

Je n'essaie pas de me bâtir de l'enterprise compliance ni du blockchain-for-everything. L'architecture en elle-même est d'une simplicité gênante - un ensemble de fichiers Markdown dans les bons dossiers.

Mais l'idée derrière compte.

Si un agent travaille de plus en plus en autonomie, sa mémoire doit couvrir non seulement les actions textuelles, mais aussi les actions à conséquences : appeler un service externe, dépenser de l'argent, créer un asset, demander une approval. Le paiement n'est que l'exemple le plus parlant, parce que la question de la confiance s'y pose tout de suite. Les mêmes principes se transposent facilement à publier un post, envoyer un email, faire un deploy, commander une génération, une opération on-chain.

Version courte :

> pay.sh donne à l'agent l'accès à des ressources payantes.
> Pay Memory donne à l'humain la possibilité de comprendre, une semaine plus tard, pourquoi l'agent s'en est servi.

Si l'agent ne fait que dépenser de l'argent - c'est un risque. Si l'agent dépense de l'argent et laisse une trace honnête, reliée et lisible par un humain - c'est déjà un workflow auquel on peut, peu à peu, commencer à faire confiance.

Pay Memory est sortie dans [open-second-brain 0.8.0](https://github.com/itechmeat/open-second-brain/releases/tag/v0.8.0).
