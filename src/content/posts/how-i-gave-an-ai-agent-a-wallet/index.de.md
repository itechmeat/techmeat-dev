---
title: "Wie ich meinem KI-Agenten ein Wallet gegeben habe und warum er sofort ein Gedächtnis dazu brauchte"
description: "open-second-brain 0.8.0 und Pay Memory: Wie ich den Agenten externe APIs über pay.sh bezahlen ließ und warum der entscheidende Teil nicht die Zahlung selbst war, sondern eine klare Aufzeichnung jedes ausgegebenen Cents."
pubDate: 2026-05-10
locale: de
tags: [pay-memory, agent-payments, pay-sh, solana, second-brain]
ogImage: "/posters/og/posts/how-i-gave-an-ai-agent-a-wallet.png"
prFileId: a9d0e98258be2e19482c28ee047e2fff2ae006e2fc2b1a5d92bcade1ffd26fed
---

Vor ein paar Tagen habe ich [open-second-brain](/de/posts/how-i-built-open-second-brain/) veröffentlicht - eine dateibasierte Gedächtnisschicht für KI-Agenten. Seitdem hat mich eine Idee nicht losgelassen. Wenn ein Agent auf einem VPS läuft, nach seinem eigenen Zeitplan, über Telegram - wird er früher oder später Geld ausgeben müssen. Einen API-Call kaufen. Eine Illustration generieren. Eine kostenpflichtige Suche anstoßen.

Die Bezahlung selbst ist ein längst gelöstes Problem. [pay.sh](https://pay.sh) verpackt einen gewöhnlichen HTTP-Call in einen kostenpflichtigen über USDC-Micropayments auf Solana. Der Agent ruft curl über `pay` auf, das Wallet signiert die Transaktion, die andere Seite liefert eine Antwort. Fertig.

Aber „fertig" ist nur die halbe Geschichte.

## Chaos mit Wallet

Stellen Sie sich vor: Der Agent arbeitet an einer Aufgabe, trifft unterwegs eine Handvoll Entscheidungen, zwei davon sind kostenpflichtige Calls. Eine Stunde später öffnen Sie das Terminal und der Scrollback ist längst nach oben weggerauscht. Irgendwo da oben gab es `pay`-Aufrufe, irgendwo kamen tx-Signaturen an, irgendwo flogen JSON-Antworten zurück.

Warum hat der Agent das gemacht? Auf welcher Grundlage? Wie viel wollte er ausgeben? Wie viel wurde tatsächlich abgebucht? Wo ist das Ergebnis?

Wenn man dem Agenten irgendetwas Autonomes anvertrauen will, taugt „lies den Scrollback" nicht. Ein Terminal-Log ist nicht strukturiert, nicht mit der Aufgabe verknüpft, nicht indexierbar, überlebt keinen Neustart und lässt sich in Obsidian nicht als normales Artefakt öffnen.

Ich habe ziemlich schnell verstanden, dass die Aufgabe nicht „dem Agenten das Bezahlen beibringen" lautet - sondern „dafür sorgen, dass jede Zahlung eine sinnvolle Spur hinterlässt".

![Ein KI-Agent hält ein digitales Wallet, während eine Spur von Micropayments in verknüpfte Markdown-Belegkarten fließt](./image.png)

Diese Illustration wurde genau auf die Art generiert, die der Beitrag selbst beschreibt: über `pay.sh`, mit dem x402-Gateway `paysponge/fal` und dem Endpoint `fal-ai/fast-sdxl`. Die Generierung kostete **0,01 USDC** aus dem Mainnet-Wallet `64FaukkZDUdFTufXF49H1CrHjDfsmBFqfrUjsAS8XrgP`; die öffentliche Solana-Transaktion ist [`5ZYnkabzLvHqEgXNJfKopiRwbGkriHJ2bps2NnkX7HzqQAyTZYjcyJVCTvZwMquyMviv2juyAdbP9P2depHrJxQW`](https://solscan.io/tx/5ZYnkabzLvHqEgXNJfKopiRwbGkriHJ2bps2NnkX7HzqQAyTZYjcyJVCTvZwMquyMviv2juyAdbP9P2depHrJxQW). Die Request-ID war `019e135a-357b-71f3-8b9d-305e728b05fb`, und das generierte Asset wurde lokal als `image.png` gespeichert.

Und genau hier passte open-second-brain perfekt.

## Pay Memory

In Version 0.8.0 hat OSB eine neue Schicht bekommen - **Pay Memory**. Kurz gesagt: Gedächtnis fürs Geld.

Nach jeder bezahlten Aktion erscheint im Vault eine schlichte Markdown-Datei mit folgenden Feldern:

- **warum** der Agent zu zahlen entschieden hat;
- **welcher Service** aufgerufen wurde;
- **welche spending policy** galt und was sie entschieden hat (`allowed` / `approval_required` / `denied` / `not_checked`);
- **erwartete Kosten** und **tatsächlich abgebuchter Betrag**;
- **payment proof** - die konkrete Solana-Signatur, die man in Solscan öffnen und prüfen kann;
- **das Ergebnis** - ein Link zu einer separaten Asset-Note mit dem Output;
- **wer approved hat**, falls die Policy es verlangt.

Es ist keine SQLite-Tabelle und kein Dashboard. Es ist schlichtes Markdown im selben Ordner, in dem der Agent sein Daily-Log schreibt. Man kann es mit den Augen öffnen, kommentieren, in Git committen, später per grep finden oder als Beweis vorzeigen.

OSB wird hier nicht zum Zahlungssystem - es hält kein Wallet, signiert keine Transaktionen, macht kein Enforcement. Es tut, was es gut kann: Es führt ein ehrliches, menschenlesbares Gedächtnis. pay.sh gibt dem Agenten Zugang zu bezahlten Ressourcen; Pay Memory gibt dem Menschen die Möglichkeit, eine Woche später den Vault zu öffnen und in Ruhe zu verstehen, was passiert ist.

Übrigens, [so sieht ein echter Receipt aus](/files/fal-generate-a-no-text-fast-sdxl-illustration-for-the-techmeat-d.md) - der für ebendie Illustration ganz oben in diesem Post. Reines Markdown direkt aus dem Vault, ohne jegliche Bearbeitung. Frontmatter mit allen oben aufgezählten Feldern, darunter ein in menschlicher Sprache geschriebener Text zum „Warum", dazu, was die Policy zurückgegeben hat, und wie viel tatsächlich abgebucht wurde.

Im Second Brain liegt er unter diesem Pfad:

```
AI Wiki/
└── payments/
    └── 2026-05-10/
        └── fal-generate-a-no-text-fast-sdxl-illustration-for-the-techmeat-d.md
```

Keine Magie: Datum → Ordner, Slug → Dateiname. Bequem für grep, git diff und die übliche Navigation in Obsidian.

## Ein Prinzip, das sich als wichtiger als alles andere erwies

Beim Review der Draft-Implementierung blieb mein Auge sofort an einem Detail hängen: Der Receipt schrieb immer „Allowed by the configured spending policy" - selbst wenn im Vault gar keine Policy existierte.

Klingt nach einer Kleinigkeit. Tatsächlich tötet es den ganzen Sinn.

Pay Memory ist eine Audit-Schicht. Eine Audit-Schicht ist genau so viel wert, wie sie ehrlich ist. In dem Moment, in dem der Receipt beginnt, eine schöne Geschichte statt der wahren zu erzählen, fällt alles auseinander. Die Regel wurde also einfach: lieber `not_checked` schreiben, als mit Überzeugung fälschlich `allowed` zu loggen. Wenn die Policy nicht geprüft wurde - schreib das hin. Wenn die Policy `denied` zurückgegeben hat, ein Mensch den Call aber per Hand durchgewunken hat - schreib auch das hin.

Die Versuchung des „schönen Narrativs" ist der Hauptfeind eines Audit-Systems. Und das ist wohl die wichtigste Lehre des Tages - eine, die ich in andere Teile des Projekts mitnehmen will.

## Eine echte Zahlung in Produktion

Am Ende des Tages musste das Ganze nicht an Sandbox-Fixtures, sondern an echtem Geld geprüft werden. Ich habe zehn Cent USDC auf ein frisches Solana-Wallet geschickt und den Agenten gebeten, über Google Places drei Cafés in Belgrad zu finden.

Eine Sekunde später kamen drei reale Orte zurück - Artist Specialty Coffee, Dusha, DRIP. Tx finalisiert auf Mainnet, $0,001 USDC, Saldo ging von 0,10 auf 0,099. Signatur in Solscan, anklickbar.

Und dann lief die ganze Pay-Memory-Kette an: ein Receipt mit der echten Signatur im Vault, eine separate Asset-Note mit den drei Cafés, ein täglicher Zahlungsbericht und ein kurzer Eintrag in Daily mit Links auf beide Dateien. Ich kann den Vault in Obsidian öffnen, auf den Proof klicken, die tatsächliche Zahlung im Explorer sehen - und gleich daneben eine klare, menschliche Geschichte, warum der Agent das getan hat.

## Wozu das alles

Ich versuche nicht, mir Enterprise-Compliance zu basteln oder Blockchain-for-everything. Die Architektur selbst ist peinlich einfach - ein Haufen Markdown-Dateien in den richtigen Ordnern.

Aber die Idee dahinter zählt.

Wenn ein Agent immer autonomer arbeitet, muss sein Gedächtnis nicht nur textuelle Aktionen abdecken, sondern auch Aktionen mit Konsequenzen: einen externen Service aufrufen, Geld ausgeben, ein Asset erzeugen, eine Approval anfordern. Die Zahlung ist nur das anschaulichste Beispiel, weil dort die Vertrauensfrage sofort auftaucht. Dieselben Prinzipien übertragen sich leicht aufs Veröffentlichen eines Beitrags, das Versenden einer E-Mail, ein Deploy, das Bestellen einer Generierung, eine On-Chain-Operation.

Kurzfassung:

> pay.sh gibt dem Agenten Zugang zu bezahlten Ressourcen.
> Pay Memory gibt dem Menschen die Möglichkeit, eine Woche später zu verstehen, wofür der Agent diesen Zugang genutzt hat.

Wenn der Agent einfach nur Geld ausgibt - ist das ein Risiko. Wenn der Agent Geld ausgibt und eine ehrliche, verknüpfte, menschenlesbare Spur hinterlässt - ist das schon ein Workflow, dem man langsam beginnen kann zu vertrauen.

Pay Memory ist Teil von [open-second-brain 0.8.0](https://github.com/itechmeat/open-second-brain/releases/tag/v0.8.0).
