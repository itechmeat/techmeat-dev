---
title: "Wie ich OpenSecondBrain entwickelt habe"
description: "Die Geschichte von open-second-brain: wie Hermes auf einem VPS, Obsidian, MCP, CLI und mehrere Agent-Runtimes zu einem kleinen dateibasierten Gedächtnis für KI-Agenten wurden."
pubDate: 2026-05-09
locale: de
tags: [second-brain, dark-fabric, hermes, openclaw, claude-code, codex]
ogImage: "/posters/og/posts/building-techmeat-dev-with-coding-agents.png"
prFileId: fbd326e7b2da5fe0dd3c4857b437c7cabaf4f63a972a174a7ab7a48bf78ca69d
---

Ich nutze seit Langem verschiedene KI-Tools intensiv, aber irgendwann wurde klar: Ich nutze sie nicht nur — ich habe mich fast vollständig mit Agenten und allem, was mit KI zu tun hat, „umhüllt".

Seit mehreren Monaten schreiben Agenten Code nach meinen Workflows: Planung, Implementierung, Review, Fehlerbehebungen, erneute Prüfung. Das funktioniert, aber der Prozess hat einen seltsamen manuellen Rest. Selbst wenn ein Agent den Code schreibt, muss ich weiterhin Aufgaben zwischen den Phasen verschieben, Kontext übertragen, an Regeln erinnern, Prüfungen ausführen und sicherstellen, dass der nächste Ausführende versteht, was bereits passiert ist.

Es gab zu viel wiederkehrende Arbeit. Also war der nächste logische Schritt nicht ein weiteres Feature, sondern die Automatisierung des Workflows selbst.

So entstand [OpenSecondBrain](https://github.com/itechmeat/open-second-brain) — der Versuch, Agenten ein ordentliches Gedächtnis darüber zu geben, was wir tun, warum wir es tun und welche Entscheidungen bereits getroffen wurden.

## Von manuellen Workflows zu Dark Fabric

Im [ersten Beitrag](/de/posts/building-techmeat-dev-with-coding-agents/) habe ich beschrieben, wie ich diesen Blog mit Coding-Agenten gestartet habe. Dort war der Workflow bewusst einfach: Kontext setzen, ein Astro-Projekt aufbauen, das Design durchlaufen, Beiträge hinzufügen, das Ergebnis prüfen.

Aber mein üblicher Prozess ist komplexer. Er hat Rollen, Zwischenreviews, separate Agenten für verschiedene Aufgabentypen und Qualitätskontrolle an jedem Schritt. Wenn es viele solcher Aufgaben gibt, wird der Mensch zum Dispatcher: verschieb den Kontext hierhin, bitte denjenigen das zu prüfen, gib dem nächsten Agenten die Ausgabe des vorherigen, vergiss nicht, die Entscheidung festzuhalten.

Ich wollte zu einem rigideren Modell kommen, das zunehmend wie Dark Fabric klingt: Eine Feature-Idee geht rein, ein Feature kommt raus — implementiert, getestet und deployed. Nicht „ein Agent hat ein Stück Code geschrieben", sondern eine Fabrik, die Arbeit in Phasen zerlegen und durch den Prozess führen kann.

Wir sind noch weit von einer vollständigen Dark Fabric entfernt. Aber der erste praktische Schritt existiert bereits: Hermes, laufend auf einem VPS, mit Agenten für verschiedene Aufgaben, Skills, einer Telegram-Schnittstelle und günstigem Modell-Routing über OmniRoute.

Und fast sofort zeigte sich die zweite zwingende Komponente dieser Fabrik: Agenten brauchen ein Gedächtnis.

## Warum ein Agent ein Second Brain braucht

Wenn ein Agent in einer einzigen Session arbeitet, kann man den Kontext einfach in den Prompt packen. Wenn ein Agent wochenlang an einem Projekt arbeitet, reicht das nicht.

Er muss wissen:

- welche Regeln im Projekt bereits gelten;
- welche Entscheidungen besprochen wurden und warum genau diese gewählt wurden;
- welche Fakten bei Untersuchungen zutage getreten sind;
- welche Artefakte bereits erstellt wurden;
- welche Agenten an der Arbeit beteiligt waren;
- wo die menschliche Wissensbasis liegt und wo der dienstliche Bereich der Agenten ist.

Und das Wichtigste — das darf nicht allein vom „Modellgedächtnis" abhängen. Ich brauche ein einfaches, überprüfbares, dateibasiertes Wissenssystem, das ich von Hand öffnen, in Obsidian lesen, synchronisieren, teilweise committen oder gar nicht committen kann.

Deshalb wurde open-second-brain von Anfang an nicht zu „noch einem Chatbot mit Gedächtnis", sondern zu einer kleinen Infrastruktur rund um ein Markdown-Vault.

## Warum Obsidian und Markdown

Die Wahl eines Obsidian-kompatiblen Vaults war fast offensichtlich.

Erstens: Es handelt sich um ganz normale Markdown-Dateien. Keine Magie, keine proprietäre Datenbank, keine Abhängigkeit von einem bestimmten Dienst. Wenn ein Agent etwas schreibt, kann ich die Datei öffnen und das Ergebnis sehen.

Zweitens löst Obsidian den menschlichen Teil eines Second Brain bereits gut: Notizen, Wikilinks, Daily Notes, manuelle Navigation, Graph, Suche. Es machte keinen Sinn, eine eigene Wissensschnittstelle zu bauen, wenn es ein vertrautes Werkzeug gibt.

Drittens brauchen Agenten nicht ganz Obsidian. Sie brauchen deterministische Operationen: eine Dienststruktur erstellen, ein Ereignis zum Tageslog hinzufügen, einen Seitenindex aufbauen, die Vault-Gesundheit prüfen, die Konfiguration ohne Secrets exportieren. All das lässt sich über CLI und MCP erledigen, ohne das Modell zum „Nachdenken" über Dateioperationen zu zwingen, wo eine präzise Befehlsausführung besser ist.

Derzeit erstellt open-second-brain einen Agentenbereich `AI Wiki/` im Vault, führt Tageslogs in `Daily/*.md`, kann einen Markdown-Index aktualisieren, die Konfiguration prüfen und berührt keine menschlichen Notizen oberhalb des Dienstabschnitts `## Raw events`.

## Ich gab ein leeres Repository — der Agent wählte die Architektur

Das Spannendste: Ich habe mich nicht hingesetzt und das alles als klassische Bibliotheks-API entworfen. Ich gab dem Agenten Links zu beliebten Implementierungen, ein leeres Repository und eine Aufgabe: ein universelles Plugin bauen, in erster Linie für Hermes, aber so, dass auch andere Agenten es übernehmen können.

Der erste Commit war rein dokumentarisch: ein README und Projekt-Bootstrap am 6. Mai. Dann baute der Agent schnell ein CLI-Fundament auf, den Befehl `o2b`, init/doctor, Vault-Primitive und einen Index. Am selben Tag erschien ein MCP-Server — eine wichtige Schicht, denn über MCP können verschiedene Runtimes dieselben Tools erhalten, ohne manuelles Kommandozeilen-Parsing.

Die ersten Versionen waren sehr pragmatisch: Hermes soll das Plugin installieren, einen Vault hochfahren, den Status prüfen und Ereignisse schreiben können. Keine perfekte Architektur auf dem Papier, sondern ein funktionierendes minimales Gedächtnis für einen echten Agenten.

Dann begann das Projekt unter dem Druck der Integrationen zu wachsen.

## Von Hermes zu einem universellen Plugin

Hermes blieb der primäre Runtime. Dafür war das Projekt konzipiert: Plugin installieren, auf einen Vault verweisen, dem Agenten Tools geben und ihn wichtige Ereignisse ins Second Brain schreiben lassen.

Aber schnell wurde klar, dass die ausschließliche Bindung an Hermes falsch war. Ich hatte bereits verschiedene Agenten und verschiedene Umgebungen: Claude Code, Codex, OpenClaw. Wenn das Second Brain ein gemeinsames Gedächtnis sein soll, kann es nicht nur in einem Client leben.

So entstanden Adapter und Manifeste für mehrere Runtimes im Projekt:

- Hermes als Hauptszenario;
- Claude Code über ein Marketplace-Manifest und MCP;
- Codex über ein eigenes Marketplace-Manifest und MCP;
- OpenClaw zuerst über einen JS-Adapter, dann über einen vollständigen nativen Plugin-Entry;
- ein generischer MCP-Vertrag für Runtimes, die künftig erscheinen.

Das ist eine wichtige Architekturentscheidung: Es soll einen Kern geben, aber mehrere Einstiegspunkte. Agenten müssen nicht darüber streiten, wo die Wahrheit liegt. Die Wahrheit liegt im Vault und im gemeinsamen Satz von Operationen.

## Was auf dem Weg repariert werden musste

open-second-brain entwickelte sich sehr schnell: vom 6. bis 9. Mai ging das Projekt von einem README zur Version `0.7.0`. Und fast jede Version war keine „Kosmetik", sondern eine Reaktion auf ein reales Integrationsproblem.

Zum Beispiel erhielt OpenClaw zunächst native Plugin-Kompatibilität, aber der Runtime war strenger als erwartet. `name` musste in die Tool-Objekte eingefügt, `register()` synchron gemacht und dann das OpenClaw-Plugin auf reines JavaScript ohne `child_process` umgeschrieben werden, da der Security-Scanner Subprozesse blockierte.

Das nächste große Thema war die Identität. Wenn im Tagebuch nur `@agent` steht, ist ein solcher Log fast nutzlos. Also erschien in `0.6.0` ein Workflow mit Agentennamen: `o2b init --agent-name`, Registrierung in `AI Wiki/identity/agents.md` und Prüfung, dass Daily-Einträge einen echten `@agent-name` statt eines Platzhalters erhalten.

Dann kamen Zeitzonen-Unterstützung, Schutz vor Schreiben in den falschen Vault, Marketplace-Manifeste für Claude und Codex, Auto-Anweisungen für MCP, Normalisierung leerer Argumente, Überprüfung des Installationsflusses und ein Multi-Agent-Registry. Nichts davon klingt nach einer heroischen Produktfunktion, aber genau diese Details unterscheiden ein Spielzeug von einem Werkzeug, das man auf einem Server laufen lassen kann.

## Version 0.7.0: Ein Kern in TypeScript und Bun

Die größte Änderung geschah in `0.7.0`: Das Projekt migrierte zu einem einheitlichen TypeScript-Kern auf Bun.

Zuvor gab es im Repository parallele Logik: eine Python-Implementierung für CLI/MCP, einen JavaScript-Teil für OpenClaw, einen Hermes-Shim. So ein Schema driftet schnell. Fehler an einer Stelle korrigiert — keine Garantie, dass er auch an der anderen Stelle behoben ist. Zeitzonen-Support in Python hinzugefügt — besser nicht vergessen, es in JS zu wiederholen.

In `0.7.0` entfernte der Agent die Duplizierung: Hermes, Claude Code, Codex und OpenClaw nutzen nun gemeinsame Module aus `src/core/`. Das CLI lebt in `src/cli/`, MCP in `src/mcp/`, und der OpenClaw-Entry wird von TypeScript zu einem JS-Bundle über `bun build` kompiliert.

Zusätzlich erschien eine ordentliche Testsuite: `bun:test` mit 176 Fällen, Python-Shim-Tests, ein nebenläufiger Append-Event-Test mit 12 Prozessen, Bundle-Frische-Checks und Versionssynchronisationsprüfungen in den Manifesten.

Genau hier zeigt sich der Vorteil eines agentenbasierten Workflows. Es ist für einen Menschen unangenehm, denselben Code manuell zwischen Runtimes zu migrieren und Tests umzuschreiben. Für einen Agenten — völlig in Ordnung, solange man ein klares Ziel, Einschränkungen und Ergebniskontrolle vorgibt.

## Wie es auf einem VPS läuft

Die ganze Geschichte läuft auf einem gewöhnlichen VPS für etwa 8 Dollar im Monat. Dort läuft auch Hermes, dort findet die Entwicklung statt, dort werden KI-Abos verwaltet und das Modell-Routing läuft über OmniRoute.

Für mich ist das ein wichtiger Teil des Experiments. Ich möchte nicht, dass KI-gestützte Workflows eine separate teure Infrastruktur erfordern. Ich brauche einen Server, einen Browser, Telegram als Agenten-Schnittstelle, Git-Repositories in der Nähe und günstigen Zugang zu Modellen.

Das Ergebnis ist ein ziemlich seltsames, aber funktionierendes Bild: Ich kann dem Agenten vom Handy aus auf Telegram schreiben, er analysiert die Aufgabe auf dem VPS, geht ins Repository, nutzt die nötigen Skills, erstellt ein Artefakt, führt Prüfungen durch und schreibt ein wichtiges Ereignis ins Second Brain.

Das ist noch keine Dark Fabric. Aber es ist auch nicht einfach nur „mit einem Modell chatten".

## Was dabei herausgekommen ist

Zum Zeitpunkt dieses Entwurfs ist open-second-brain eine kleine, aber bereits nützliche Gedächtnisschicht für agentenbasierte Entwicklung.

Es kann:

- ein Obsidian-kompatibles Vault für Agentenarbeit initialisieren;
- `AI Wiki/` und Dienstseiten erstellen;
- tägliche Ereignisse in Markdown schreiben;
- Agenten-Identitäten speichern;
- die Zeitzone des Benutzers berücksichtigen, nicht nur die Serverzeit;
- die Gesundheit des Vaults, der Konfiguration und der Runtime-Manifeste prüfen;
- die Konfiguration mit geschwärzten sensiblen Werten exportieren;
- über CLI, MCP und Runtime-Adapter funktionieren;
- Hermes, Claude Code, Codex und OpenClaw aus einem einzigen Repository unterstützen.

Das Wertvollste ist nicht einmal die Befehlsliste. Wertvoll ist, dass die Agenten nun ein gemeinsames Gedächtnisprotokoll haben: Wenn etwas Beständiges passiert — Code, ein Fix, eine Konfigurationsänderung, Content, ein Forschungsergebnis, eine Designentscheidung — muss es so aufgezeichnet werden, dass das Ich-der-Zukunft und der Agent-der-Zukunft es später finden können.

## Was als Nächstes kommt

Das nächste Ziel ist, die Kombination aus Hermes + open-second-brain in einen Zustand zu bringen, in dem der Agent nicht nur Ereignisse schreibt, sondern das angesammelte Gedächtnis bei Planung und Review tatsächlich nutzt.

Darüber hinaus möchte ich:

- Daily-Logs besser mit Wiki-Seiten verknüpfen;
- eine nützlichere Suche und Zusammenfassungen der Projektgeschichte hinzufügen;
- einen separaten Beitrag darüber schreiben, wie genau Hermes auf dem VPS funktioniert und wie die Kommunikation über Telegram eingerichtet ist;
- die aktuellen Workflows in eine autonomere Dark Fabric umwandeln;
- prüfen, ob verschiedene Agenten schmerzfrei ein gemeinsames Vault teilen können, ohne sich gegenseitig den Kontext zu zerstören.

Die wichtigste Erkenntnis bisher ist einfach: Agenten brauchen nicht nur ein Modell und nicht nur Zugang zu einem Repository. Sie brauchen eine Umgebung, in der Entscheidungen, Fakten und Ereignisse zu einem beständigen Teil des Prozesses werden.

[open-second-brain](https://github.com/itechmeat/open-second-brain) ist mein erster funktionierender Schritt in diese Richtung.

## Wie dieser Beitrag entstand

Entschuldigung, aber dieser Beitrag wurde ebenfalls vom selben Hermes-Agenten geschrieben. Nur dieser Absatz und mein [Facebook-Post](https://www.facebook.com/reel/1355271143340726/) wurden von Hand verfasst. Ich habe den Agenten einfach gebeten, meinen Blog als reguläres Projekt zu klonen, die Commit-Historie anzusehen und den Facebook-Post als Grundlage zu nehmen. Und natürlich habe ich den Text vor der Veröffentlichung noch einmal gelesen und korrigiert. Und sagt mir nicht, da sei keine Seele drin — ich stecke meine Seele in den Agenten.
