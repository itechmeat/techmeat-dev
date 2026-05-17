---
title: "Wie ich den ersten dark-factory-Workflow gebaut habe"
description: "Hermes auf einem VPS, ein Kanban-Graph aus 13 Aufgaben, Reviews zwischen den Phasen auf unterschiedlichen Profilen, ein Mini-Brainstorming mit einem Menschen über Telegram und ein bare-HTML-Deploy am Ende. Der erste funktionierende dark-factory-Stack — überstand mehrere Debug-Durchläufe und läuft jetzt durch alle Phasen ohne manuelle Steuerung."
pubDate: 2026-05-17
locale: de
tags: [dark-factory, hermes, kanban, workflow, claude-code, codex]
ogImage: "/posters/og/posts/how-i-built-the-first-dark-fabric-workflow.png"
prFileId: e0734ef343a1076446ad001adc8a5c66c5fb5e1049f9795006529159f66f1f49
---

Im [vorigen Beitrag](/de/posts/how-i-built-open-second-brain/) habe ich über OpenSecondBrain geschrieben — die Speicherebene, auf die KI-Agenten zurückgreifen. Speicher ist nur die halbe Geschichte. Die andere Hälfte ist der Prozess selbst: wer was macht, wer wen prüft, was als „fertig" gilt, und wie das Ganze mit einem einzigen Satz im Chat anläuft.

Heute habe ich die erste funktionierende Version gestartet: den `new-project`-Workflow. Ich bringe eine Idee in Telegram ein, und am Ende habe ich ein komplett aufgestelltes Projekt mit Dokumenten, Design, Plan und einer echten öffentlichen Seite.

## Wie es von außen aussieht

Ich bringe eine Idee. Zum Beispiel: „Ich brauche eine One-Pager-Landingpage für mein kleines Studio."

Danach beantworte ich kurze Runden gezielter Fragen. Zuerst der Brainstorm selbst: wer ist die Zielgruppe, was soll betont werden, welchen Stack bevorzuge ich, wie soll es sich anfühlen. Dann, entlang jeder Phase, noch ein paar kurze Sitzungen mit 4–5 Fragen: alles, was dem Autor des aktuellen Dokuments fehlt, damit er sich nichts ausdenken muss.

Alles andere macht die Fabrik. In der Zwischenzeit kann ich mich um meine eigenen Sachen kümmern.

## Ein Kanban mit lebenden Karten

Das Sichtbarste an alldem ist das Kanban-Board. Wenn ich zum finalen Plan „ja" sage, erstellt der Orchestrator 13 Karten in einem Durchlauf, eine pro Arbeitsphase. Von da an passiert alles vor meinen Augen.

Die Karten bewegen sich von selbst. Die erste leuchtet auf, bekommt das `running`-Flag, und ich weiß, dass einer der Subagenten sie übernommen hat. Ein paar Minuten später rutscht die Karte auf `done`, und die nächste leuchtet auf. Zwischen jeder produzierenden Phase steht immer eine Review-Karte, und die muss ein anderer Subagent übernehmen: wer das Dokument geschrieben hat, prüft sich nie selbst.

Manchmal scheitert das Review. Dann geht die Review-Karte auf `blocked`, daneben taucht eine neue Fix-Task für denselben Autor auf, und der gesamte Downstream wartet brav. Sobald der Autor korrigiert und die Fix-Task schließt, wacht das Review auf und liest das Artefakt erneut. Es kann durchgehen. Es kann zurückgehen. Maximal zwei Runden, dann eskaliert es zu mir.

Am Ende schaue ich auf das Board fast wie auf einen Paket-Tracker: jetzt wird montiert, jetzt verpackt, jetzt versendet. Nur ist es kein Kurier — es sind mehrere Subagenten, die gleichzeitig an verschiedenen Teilen meines Projekts arbeiten.

## Was am Ende rauskommt

Am Ende des Prozesses habe ich:

- ein strukturiertes `about.md`, das den Kern der Idee festhält;
- `specs.md` mit funktionalen und nicht-funktionalen Anforderungen;
- `architecture.md` mit dem technischen Umriss;
- `plan.md` mit einer phasenweisen Roadmap bis zum MVP;
- `DESIGN.md` mit Visual Identity, Tokens, Typografie und Schlüsselbildschirmen;
- ein eigenes GitHub-Repository für das Projekt mit all diesen Dateien;
- eine deployte öffentliche Seite auf der Subdomain `<slug>.techmeat.dev`, auf der vorerst das einfachstmögliche HTML steht, das `about.md` spiegelt. Das ist das Versprechen, dass das Projekt existiert und erreichbar ist.

Die Implementierung des eigentlichen Features ist Aufgabe eines anderen Workflows, des nächsten. Das Ziel dieses ersten ist es, eine Idee in den Zustand „alles beschrieben, alles abgestimmt, das Projekt hat seine eigene Adresse" zu bringen. Danach kann man die Fabrik schon für die eigentliche Entwicklung anheuern.

## Was schwer war

Ich habe mehrere Debug-Durchläufe gemacht. Jedes Mal kam ein eigener lustiger Bug zum Vorschein: ein Subagent versuchte, sein eigenes Arbeitsverzeichnis aufzuräumen und brachte seine eigene Shell-Session um; oder er fing mitten in einer Phase mit der Feature-Implementierung an, obwohl Implementierung gar nicht zu diesem Workflow gehört und Sache des nächsten ist. Zwischen den Durchläufen habe ich das Skill gepatcht und neu gestartet. Im aktuellen Stand läuft der Zyklus sauber von Anfang bis Ende.

## Unterwegs ist auch der Speicher gewachsen

Im letzten Beitrag habe ich versprochen, dass [OpenSecondBrain](https://github.com/itechmeat/open-second-brain) die andere Hälfte der Geschichte ist. Seitdem ist diese Hälfte deutlich gereift, und für die Fabrik selbst ist das wichtig.

Die wichtigste Änderung: OpenSecondBrain hat jetzt eine „Beobachtungs-Memory"-Ebene. Früher habe ich dort manuell hineingeschrieben, wie in ein Tagebuch. Jetzt schnappen die Subagenten meine Präferenzen im Vorbeigehen auf (Dinge wie „Commits werden im Imperativ geschrieben" oder „keine internen Abkürzungen ohne Erklärung"), legen die Notizen in einen Eingang, und einmal am Tag startet ein Hermes-Agent `dream` — ein Hintergrunddurchlauf, der wiederkehrende Beobachtungen zu Regeln befördert. Diese Regeln laden sich automatisch zu Beginn jeder nächsten Session, und ich muss mich nicht mehr zwanzig Mal wiederholen.

Dazu: Volltextsuche über die gesamte OpenSecondBrain-Wissensbasis, Backup und Rollback vor jedem `dream`-Durchlauf, eine separate Ebene, die jede bezahlte Operation erfasst (was bezahlt wurde, wofür, wozu es gehört), und maschinell durchgesetzter Schutz davor, dass ein Agent versehentlich die Regeln eines anderen überschreibt. All das macht die Fabrik erst möglich: wenn ein Subagent `DESIGN.md` schreibt, sieht er bereits meine gesammelten Präferenzen zu Typografie und Interface. Ich habe sie einmal im Chat fallen lassen, OpenSecondBrain hat sie festgehalten, und jetzt reisen sie mit in jedes neue Projekt, ohne Erinnerungen.

## Wie es weitergeht

`new-project` ist nur der Bootstrap. Als Nächstes kommt `new-feature` — ein Workflow, der ein bestehendes Projekt mit seinen Dokumenten übernimmt und das nächste Feature bis in die Produktion bringt. Und ein dritter, `bugfix`: Triage, Repro, Fix, Verifikation, Ship. Zusammen sind diese drei Playbooks meine Version von Dark Factory für eine einzelne Person: ich bringe eine Idee oder einen Bugreport, und heraus kommt ein funktionierendes Feature.

Bis zur vollständigen Fabrik ist es noch ein Stück. Aber das erste Stück steht und läuft stabil.

Das Ganze als Open Source zu veröffentlichen, ist noch zu früh: in dieser Phase ist das eher Forschung als ein fertiges Produkt. Sobald der gesamte Projektbau-Prozess zuverlässig läuft, öffne ich alles. Folgt mir auf [X](https://x.com/techmeat).
