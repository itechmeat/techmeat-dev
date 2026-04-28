---
title: "Wie ich diesen Blog mit Coding-Agents gebaut habe"
description: "Die Geschichte des Starts von techmeat.dev: von einer spontanen Idee und einem Set an Skills bis zu Astro, Cloudflare Pages, Brainstorming und der ersten Version des Blogs."
pubDate: 2026-04-28
tags: [ai-coding, astro, bun]
ogImage: "/posters/og/posts/building-techmeat-dev-with-coding-agents.png"
locale: de
---

Ich hatte schon mal einen Blog. Ordentlicher Traffic, klares Thema, echte persönliche Erfahrung: Ich schrieb über Frontend und über die Dinge, die ich selbst durchgemacht habe. Dann habe ich ihn aus nicht besonders wichtigen Gründen nicht mehr gepflegt und dabei nebenbei die Domain verloren.

Lange Zeit kam es mir vor, als wäre die Geschichte einfach zu Ende. Aber heute hatte ich wieder Lust zu schreiben, nicht mehr über Frontend als Beruf, sondern darüber, wie ich echte Projekte mit Coding-Agents baue. Ohne Abstraktionen über die Zukunft der Entwicklung, durch konkrete Prozesse, Fehler und Entscheidungen.

So entstand [techmeat.dev](https://techmeat.dev/).

## Warum ich überhaupt angefangen habe

Die Idee war spontan. Ungenutzte Tokens haben sich angesammelt, ich hatte ein paar Hypothesen, die ich prüfen wollte, und ich beschloss, ein kleines, aber echtes Projekt zusammenzustellen: einen Blog, in dem der Bauprozess selbst zum ersten Material wird.

Mein üblicher Workflow mit Agents ist deutlich aufwendiger: mehrere Stufen Planung, Review und Checkpoints. Hier habe ich ihn bewusst vereinfacht. Ich wollte sehen, wie weit man kommt, wenn man die Richtung schnell vorgibt, den Kontext vorbereitet und dem Agent den Großteil der Startarbeit überlässt.

Das ist kein Referenzprozess, sondern eine experimentelle Version. Über den strengeren Ansatz schreibe ich vermutlich separat.

## Vorbereitung: Skills, Kontext und Projektregeln

Zuerst habe ich die nötigen Skills installiert. Für so ein Projekt zählt das mehr, als es scheint: „Bau mir einen Blog" ist eine zu schwache Aufgabenstellung. Der Agent braucht klare Regeln: welche Technologien er nutzen soll, wo der Content liegt, wie er über SEO denken soll, wie er Design angeht, was er ohne Notwendigkeit nicht tun soll. Das Startset ist in der Arbeitsdatei [INIT.md](https://github.com/itechmeat/techmeat-dev/blob/master/docs/INIT.md) festgehalten.

Danach habe ich `CLAUDE.md` initialisiert — die Datei mit dem Basiskontext des Projekts. Der Entwurf war auf Russisch, aber für den Arbeitskontext habe ich ihn sofort ins Englische übersetzt, damit er in allen Locales und in verschiedenen Tools gleich gut funktioniert.

```text
This project is empty for now, but I am going to build my blog here. The project will be based on Astro, and posts will be stored as Markdown files. Each article will go through a multi-stage SEO and GEO preparation workflow using the skills available in the project and the geo-optimizer-skill CLI: https://github.com/Auriti-Labs/geo-optimizer-skill, which is already installed.

The blog will be about building projects with AI coding.

The domain has already been chosen and purchased: techmeat.dev.

The project will be hosted on Cloudflare Pages.

The primary language of the blog will be English, but there will also be translations into other languages, at least 10 popular ones. Translation pages must point to the English version of the same article with canonical links.

The project design must be created using the impeccable skill.

All project documentation must be written in English. Draft documentation may be an exception.
```

Anschließend habe ich `CLAUDE.md` als `AGENTS.md` kopiert. Ich möchte das Projekt nicht an einen bestimmten Agent binden: wenn ich die Entwicklung morgen in einem anderen Tool fortsetze, bleiben die Grundregeln neben dem Code.

## Erster Start: nur das Fundament

Ich habe den Agent nicht gleich Seiten oder Design machen lassen. Am Anfang brauchte ich ein korrektes technisches Fundament: ein Astro-Projekt, vorbereitet für Cloudflare Pages, mit klarer Struktur und ohne überflüssige Eigeninitiative.

Der Prompt war absichtlich eng:

```text
Let's start developing our blog project. First, use the Astro skills and set up the initial project, preparing it for hosting on Cloudflare Pages. There is no need to build pages or do any additional work right now. Only set up the project.
```

Je enger die erste Anfrage, desto kleiner die Chance, dass der Agent das Projekt dort „verbessert", wo noch keine Entscheidung getroffen wurde. Das spart eine Menge Nerven: Ich brauchte einen verlässlichen Startpunkt, kein hübsches Mockup.

## Brainstorming statt vorschnellem Design

Dann habe ich Superpowers angeschaltet und ein Brainstorming gestartet — und ausdrücklich darum gebeten, kein Design zu diskutieren. In dieser Phase musste entschieden werden, woraus der Blog als Produkt besteht, nicht wie er aussieht.

Der Prompt sah so aus:

```text
Let's brainstorm in Russian about what my blog should consist of. Here's how I currently see it:

- All pages should share a unified design, but we are not discussing the design itself yet, only common blocks and similar structural elements. The header should include the techmeat.dev name and a language switcher. To clarify, the brainstorming result should describe what the blog should have, not how it should look.
- The home page should show previews of the 10 latest posts with links to the full posts. Maybe it should include something else too; suggest options.
- There should be an About page: something like a CV, but in a more blog-like form.
- There should be a Contacts page with links to my social profiles and GitHub.
- Maybe some other pages are needed; suggest options.
- This should be a very simple blog, mostly informational. I expect to publish materials often.
```

Das Brainstorming dauerte etwa eine Stunde. Für ein so kleines Projekt klingt das nach viel, aber die Zeit hat sich gelohnt: ohne sie hätte ich keinen tragfähigen Plan und keine Architekturspezifikation bekommen. Der Agent half, den Blog in Seiten, gemeinsame Blöcke, Sprachmodell und Content-Struktur zu zerlegen.

Heraus kamen zwei interne Artefakte: der [Plan](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/plans/2026-04-27-blog-v1.md) der ersten Version und die [Architektur-Spezifikation](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/specs/2026-04-27-blog-architecture-design.md).

## Autonome Entwicklung, Review und Fixes

Nach dem Brainstorming musste ich nur der Richtung zustimmen und den Agent arbeiten lassen. Der Großteil der Grundstruktur entstand autonom: Routen, Markdown-Content, Locales, Komponenten, RSS, Tags, Infrastruktur für Übersetzungen.

Ganz ohne manuelles Eingreifen ging es nicht. Ich habe ein paar korrigierende Prompts hinzugefügt: das Set an Sprachen präzisiert, kleine Bugs bereinigen lassen und Details nachgezogen, die der Agent im ersten Durchgang übersehen hatte.

Danach bat ich GPT-5.5, das Code-Review zu machen und die Fixes direkt anzuwenden. In den Prozess habe ich mich kaum eingeschaltet: der Agent fand mehrere nützliche Verbesserungen, wendete sie an und ließ die Checks laufen. Ehrlich gesagt habe ich diese Version fast vollständig vibe-codet, was ich sonst zu vermeiden versuche. Hier war es vertretbar: das Projekt ist klein, der Fehlerpreis niedrig, und der Sinn war gerade, die Grenzen dieses Ansatzes zu testen.

Hier sieht man gut, wie ich AI Coding generell verstehe. Der Agent ist kein magischer „Bau-mir-ein-Produkt"-Knopf, sondern ein sehr schneller Ausführer, der Rahmen, Kontext und regelmäßiges Review braucht. Mit guten Rahmen nimmt er einen großen Teil der Grundarbeit ab. Mit unscharfen Rahmen produziert er genauso schnell Unsicherheit.

## Warum ich Design verschoben habe

Ich habe Design bewusst nicht in die erste Phase gepackt. Für die visuelle Seite habe ich einen separaten Prozess, und ich wollte ihn extra durchlaufen, ohne Architektur, Content und Interface in eine einzige Aufgabe zu mischen.

Deshalb wirkt die erste Version des Blogs wie ein technisches Skelett: Routen, Lokalisierung, Posts, Tags und die Veröffentlichungs-Infrastruktur stehen, das Visual-System nicht, und das ist okay. Manchmal ist es nützlicher, zuerst ein laufendes Projekt zu haben und sich dann in Ruhe darum zu kümmern, wie es aussieht und sich anfühlt.

## Was ich mit diesem Blog testen möchte

techmeat.dev ist ein Arbeitslabor, kein bloßes Notiz-Lager. Mich interessiert, wie sich Entwicklung verändert, wenn ständig ein Coding-Agent neben dir sitzt: wo er die Arbeit beschleunigt, wo er versteckte Risiken erzeugt, und wo er hilft, eine Lösung zu sehen, auf die ich allein erst viel später gekommen wäre.

Drei Dinge interessieren mich besonders.

**Prozess.** Nicht „der Agent hat den Code geschrieben", sondern was davor und danach war: welche Prompts funktioniert haben, welche Constraints ich setzen musste, welche Entscheidungen besser beim Menschen bleiben.

**Qualität.** AI-assisted Development verwandelt sich schnell in einen Strom von Fixes, wenn man Plan und Review nicht hält. Ich will sowohl die gelungenen Ergebnisse zeigen als auch die Stellen, an denen sich der Agent geirrt hat oder meine Aufgabenstellung nicht präzise genug war.

**Wiederholbarkeit.** Wenn sich der Ansatz im nächsten Projekt nicht wiederholen lässt, ist es kein Prozess, sondern ein einmaliger Trick. Deshalb halte ich nicht nur den fertigen Code fest, sondern auch die Arbeitsschemata: wie die Aufgabe gestellt wurde, welche Dateien entstanden, welche Tools beteiligt waren, wie Entscheidungen getroffen wurden.

## Was als Nächstes kommt

Die nächste Etappe ist Design. Die Fortsetzung dieses Posts wird genau darüber gehen: wie ich es gemacht habe, welche Entscheidungen ich getroffen habe, was am Ende herausgekommen ist. Auch wenn ich noch nicht selbst weiß, wie es konkret aussehen wird.

Vorerst, für die Geschichte, halten wir fest, wie der Blog heute aussieht:

<!-- TODO: Embed YouTube video showcasing the first version of the blog. -->
