---
title: "Open Second Brain ist stabil, und Dark Factory hat die nächste Schicht bekommen"
description: "Open Second Brain hat eine stabile Version erreicht, Hermes kann es als native Memory nutzen, und Hermes Workflows verwandelt meine manuellen Playbooks in autonome Arbeitsgraphen."
pubDate: 2026-06-16
locale: de
tags: [open-second-brain, dark-factory, hermes, workflows, agents, memory]
ogImage: "/posters/og/posts/open-second-brain-stable-and-hermes-workflows.png"
prFileId: 196b5eefe1f8576a9b6259d300f5f7a229e8c5a4da2c526bb7c66d37f26f33be
---

Ich tauche weiter in das Hermes-Agent-Ökosystem ein. Im Mai sah das noch wie eine Reihe verbundener Experimente aus - Memory, Kanban, Telegram, Subagents, Reviews zwischen Stufen. Jetzt beginnt daraus ein zusammenhängendes System zu werden.

Mein Ziel ist gleich geblieben: meine kleine **Dark Factory** bauen. Nicht „ein Agent, der beim Coden hilft“, sondern eine Fabrik, in der eine Idee durch einen klaren Prozess läuft: Analyse, Planung, Implementierung, Review, Tests, Deployment und das Schreiben von Entscheidungen ins Memory. Vollständige Autonomie liegt noch vor mir, aber ein Teil dieses Ziels funktioniert bereits. Vieles, was früher manuelles Dispatching brauchte, läuft jetzt wirklich selbst.

In den letzten Wochen sind vor allem zwei Schichten gewachsen: [Open Second Brain](https://github.com/itechmeat/open-second-brain) als Memory und [Hermes Workflows](https://github.com/itechmeat/hermes-workflows) als zukünftiger Orchestrator.

## Open Second Brain ist kein Experiment mehr

Open Second Brain hat jetzt eine stabile Version. Für mich ist das eine wichtige psychologische Grenze: Das Projekt fühlt sich nicht mehr wie „lass uns schnell eine Idee testen“ an, sondern wie ein Werkzeug, das ich täglich benutzen kann.

Die öffentlichen Contracts wackeln weniger. Hermes kann O2B als nativen Memory Provider einbinden, nicht als Hack an der Seite. Ein Hermes auf dem Laptop, ein zweiter auf dem VPS, Claude Code, Codex und andere Runtimes können in denselben Markdown-Vault schauen, ohne angesammelte Regeln, Präferenzen und Entscheidungsspuren zu verlieren.

Warum das wichtig ist, habe ich schon im Post über [die Entwicklung von OpenSecondBrain](/de/posts/how-i-built-open-second-brain/) beschrieben. Kurz gesagt: Agentic Development stößt sehr schnell auf ein Memory-Problem. Nicht „was stand in der letzten Antwort des Modells“, sondern was wir vor einer Woche entschieden haben, welche Regeln ich schon fünfmal wiederholt habe, welche Artefakte existieren, wo der Projektkontext liegt und welche Schlussfolgerungen die nächste Kompaktierung überleben müssen.

O2B löst das sehr bodenständig: ein Obsidian-kompatibler Vault, Plain Markdown, `Brain/`, deterministische CLI/MCP-Tools, `dream`-Passes, staged Memory-Anwendung, Rollback, Suche, Daily Notes, Preferences und Pinned Context. Kein verstecktes SaaS-Gehirn, dem ich zusätzlich vertrauen muss. Die Dateien liegen bei mir.

## Sterne und die eigentliche Motivation

Das Plugin gewinnt langsam an Aufmerksamkeit. Zum Zeitpunkt des Schreibens hat das Repository [71 Sterne](https://github.com/itechmeat/open-second-brain), von Tausenden noch weit entfernt.

Aber mein Ziel ist nicht, Sterne zu sammeln. Nett wäre es natürlich. Sterne helfen anderen zu sehen, dass das Projekt lebt, und geben dem Repository etwas Sichtbarkeit. Wenn O2B für dich nützlich oder interessant ist, hilft ein Stern.

Die Hauptmotivation ist anders: Ich bin selbst der wichtigste Nutzer dieses Plugins. Es löst zuerst meine eigenen Probleme. Ich baue eine Hermes-Umgebung, in der Agents meine Präferenzen merken, Events schreiben, erklären, woher Schlussfolgerungen kommen, und Kontext zwischen Sessions tragen müssen. Wenn das für diesen Fall gut funktioniert, hat sich das Tool schon gelohnt.

Der Rest ist ein nützlicher Nebeneffekt.

## Ein unabhängiger Memory-Test

Das interessanteste Signal kam nicht aus dem README oder meiner Selbstwerbung, sondern von einem unabhängigen Entwickler, der Memory-Plugins auf einer frischen Hermes-Installation verglich. Er gab dem Agent mehrere Optionen - reddit obsidian layout, OpenSecondBrain, Honcho und OpenViking - und Hermes wählte O2B als bevorzugtes Memory.

Der Kommentar liest sich fast wie Werbung, obwohl ich ihn nicht bestellt habe:

> So i gave my fresh install on a $1 vps the choice of a reddit obsidian layout, opensecondbrain, honcho and openviking and it chose opensecondbrain as its preferred memory.. nemotron3 ultra free said the quality is outstanding and 80% of what honcho provides. Just local and free. Only thing missing is the neuromancer inference.

Für mich ist nicht die Zeile über „80% of Honcho“ entscheidend. Solche Vergleiche sind immer ungefähr: andere Ziele, andere Architekturen, andere Produktreife.

Wichtiger ist: Eine externe Person hat es in einer sauberen Umgebung installiert, dem Agent die Wahl gegeben, und O2B war klar und nützlich genug, um ohne meinen Einfluss gewählt zu werden. Für ein Projekt, das als internes Memory für mein Hermes begann, ist das ein guter Meilenstein.

## Wo Dark Factory jetzt steht

Wenn ich Dark Factory als Ganzes betrachte, sind bereits Teile automatisiert, die früher die langweiligste Handarbeit waren.

Ich kann Hermes in Telegram eine Projektidee geben. Er stellt Rückfragen, zerlegt die Arbeit in Stufen, erstellt Dokumente, bewegt Karten durch Kanban, gibt Reviews an ein anderes Profil, fixt Kommentare, deployt das Ergebnis und schreibt wichtige Events ins Memory. Genau diesen Zyklus habe ich im Post über den [ersten Dark-Factory-Workflow](/de/posts/how-i-built-the-first-dark-fabric-workflow/) und später bei [Startit](/de/posts/dark-factory-and-open-second-brain-at-startit/) gezeigt.

Hier ist ein weiteres Video aus derselben Experimentreihe.

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/J09BbfMpMAw" title="Dark Factory, Open Second Brain und Hermes Workflows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Das ist noch nicht „Knopf drücken und für immer vergessen“. Ich lese Ergebnisse, justiere den Prozess, stoppe manchmal einen Run und schicke manchmal eine Aufgabe zurück. Aber der entscheidende Wechsel ist passiert: Ich bin immer seltener der permanente Dispatcher zwischen Agents. Häufiger ist meine Rolle, die Absicht zu formulieren, ein paar Entscheidungen zu treffen und das Ergebnis zu prüfen.

Für eine einzelne Person spart das spürbar Aufmerksamkeit.

## Die neue Schicht: Hermes Workflows

Das nächste große Stück ist aktiv in Entwicklung: [Hermes Workflows](https://github.com/itechmeat/hermes-workflows). Das Projekt ist noch jung, aber genau es soll die Spielregeln ändern.

Davor waren meine Workflows eher gut beschriebene Playbooks auf Hermes: Kanban, cron, Profile, Rollen, manuelle Konventionen und etwas Glue. Das funktionierte bereits, aber ein Teil des Prozesses lebte noch in meinem Kopf und in Anweisungen.

`hermes-workflows` macht einen anderen Schritt: Der Workflow wird ein Graph.

Im Graphen gibt es Nodes:

- `agent_task` - eine Aufgabe für ein bestimmtes Hermes-Profil;
- `script` - ein deterministischer Shell-Schritt, wenn kein Modell nötig ist;
- `condition` - ein Branch anhand des vorherigen Ergebnisses;
- `human_review` - ein expliziter Punkt, an dem ein Mensch gebraucht wird;
- `finish` - Abschluss mit Ergebnislieferung.

Wichtig ist: Das ist keine separate Engine, die Hermes ersetzen will. Ein Workflow kompiliert in native Hermes-Primitiven: Kanban, Cron, Profiles, delivery router, skills. Das System bleibt über dieselben Oberflächen lesbar, die ich ohnehin nutze.

Für Dark Factory ist das entscheidend. Wenn der Prozess als Graph beschrieben ist, kann man ihn validieren, exportieren, wiederverwenden, planen, Live-Telemetry pro Node ansehen, pending approvals sehen, retry ausführen und nach einem Fehler den Trace analysieren. Es ist nicht mehr „dem Agent wurde gesagt, er soll die Anleitung befolgen“, sondern ein ausführbarer Contract.

## Warum das die Fabrik näher an Autonomie bringt

Die größte Schwäche von Dark Factory ist nicht, dass Agents schlechten Code schreiben. Sie machen Fehler, klar, aber Reviews, Tests und Constraints fangen das ab. Die größte Schwäche ist Prozesssteuerung.

Wenn der Prozess in einem langen Prompt lebt, ist er fragil. Ein Agent kann eine Stufe überspringen, Rollen vermischen, vergessen, dass Implementierung von einem anderen Profil reviewed werden muss, oder Downstream-Arbeit starten, bevor Upstream geprüft ist.

Ein Graph löst das technischer. Jeder Node hat Input, Output, Status und Übergangsregeln. Wenn Review fehlschlägt, wacht Downstream nicht auf. Wenn ein Script-Schritt fällt, tut der Agent nicht so, als wäre alles ok. Wenn ein Mensch gebraucht wird, stoppt der Workflow bei `human_review`, statt zu raten.

Hier werden O2B und Hermes Workflows zu einem System:

- workflows führen den Prozess;
- Hermes führt Aufgaben mit nativen Mechanismen aus;
- Open Second Brain speichert Kontext, Präferenzen, Entscheidungen und Run-Traces;
- der Mensch bleibt dort im Loop, wo es wirklich wichtig ist.

Das sieht schon eher nach Fabrik aus als nach einer Sammlung loser AI-Tricks.

## Was als Nächstes kommt

Das nächste Ziel ist, `hermes-workflows` so weit zu bringen, dass ich eine echte Demo zeigen kann: nicht nur einen schönen Graphen im Dashboard, sondern einen Run, der mehrere Agent-Stufen, Review, Branching, Memory Writes und Ergebnislieferung durchläuft.

Wenn das stabil läuft, kommt Dark Factory viel näher an die Form, für die ich das alles begonnen habe. Idee rein. Prozessgraph. Mehrere Agents in verschiedenen Rollen. Memory, das Sessions überlebt. Der Mensch nicht als Dispatcher, sondern als Besitzer der Absicht und der finalen Entscheidung.

Das Interessanteste: Dark Factory hat bereits begonnen, sich selbst aufzubauen. Jede Nacht macht sie einen Research Pass: sucht neue Ideen zur Verbesserung von Open Second Brain, vergleicht Ansätze, extrahiert nützliche Patterns und erstellt Aufgaben auf dem Hermes-Kanban. Danach nimmt sie periodisch einen passenden Scope in die Implementierung, bringt ihn bis zum PR und macht daraus nach meinem Approve ein Release.

Beispiele sieht man in den [GitHub Releases von Open Second Brain](https://github.com/itechmeat/open-second-brain/releases). Ab `v1.12.0` wurden die Releases vollständig von Hermes umgesetzt, ohne meine Beteiligung am Code. Ich musste nur den erzeugten PR lesen und approven.

Das klingt noch etwas groß, aber vor ein paar Monaten war Open Second Brain nur ein leeres Repository. Jetzt ist es ein stabiles Plugin, das Hermes als Memory wählen kann.

Mal sehen, wie weit sich diese Fabrik treiben lässt.
