---
title: "Kako sam dao AI agentu novčanik i zašto mu je odmah zatrebala memorija"
description: "open-second-brain 0.8.0 i Pay Memory: kako sam pustio agenta da plaća eksterne API-je preko pay.sh i zašto se ključnim ispostavilo ne samo plaćanje, već jasan zapis o svakom potrošenom centu."
pubDate: 2026-05-10
locale: sr
tags: [pay-memory, agent-payments, pay-sh, solana, second-brain]
ogImage: "/posters/og/posts/how-i-gave-an-ai-agent-a-wallet.png"
prFileId: 5590a56021ea449a6d53fcaf6921cdc7bafeb68559a4c6b3e69e8792f61e3792
---

Pre nekoliko dana izbacio sam [open-second-brain](/sr/posts/how-i-built-open-second-brain/) - fajl-baziran sloj memorije za AI agente. Od tada mi se po glavi vrtela jedna ideja. Ako agent radi na VPS-u, po sopstvenom rasporedu, kroz Telegram - pre ili kasnije će morati da troši novac. Da kupi API poziv. Da generiše ilustraciju. Da pokrene plaćenu pretragu.

Samo plaćanje je odavno rešen problem. [pay.sh](https://pay.sh) ume da obični HTTP poziv pretvori u plaćeni preko mikroplaćanja u USDC na Solani. Agent pokreće curl kroz `pay`, novčanik potpisuje transakciju, sa druge strane stigne odgovor. Gotovo.

Ali "gotovo" je samo polovina priče.

## Haos sa novčanikom

Zamislite: agent radi na zadatku, usput donosi pregršt odluka, dve od njih su plaćeni pozivi. Sat kasnije otvorite terminal i scrollback je već odleteo van ekrana. Negde tamo gore bilo je `pay` poziva, negde su stigli tx potpisi, negde su se vraćali JSON odgovori.

Zašto je agent to uradio? Po kom osnovu? Koliko je očekivao da potroši? Koliko je zaista skinuto? Gde je rezultat?

Ako želite da agentu poverite bilo šta autonomno, "pročitaj scrollback" ne valja. Terminal log nije strukturiran, nije povezan sa zadatkom, nije indeksabilan, ne preživljava restart i ne može se otvoriti u Obsidianu kao normalan artefakt.

Vrlo brzo sam shvatio da zadatak ne glasi "naučiti agenta da plaća" - već "obezbediti da svako plaćanje za sobom ostavi smislen trag".

![AI agent drži digitalni novčanik dok trag mikroplaćanja teče u međusobno povezane Markdown kartice-priznanice](./image.png)

Ova ilustracija je generisana tačno na način koji opisuje sam tekst: kroz `pay.sh`, koristeći x402 gateway `paysponge/fal` i endpoint `fal-ai/fast-sdxl`. Generisanje je koštalo **0.01 USDC** sa mainnet novčanika `64FaukkZDUdFTufXF49H1CrHjDfsmBFqfrUjsAS8XrgP`; javna Solana transakcija je [`5ZYnkabzLvHqEgXNJfKopiRwbGkriHJ2bps2NnkX7HzqQAyTZYjcyJVCTvZwMquyMviv2juyAdbP9P2depHrJxQW`](https://solscan.io/tx/5ZYnkabzLvHqEgXNJfKopiRwbGkriHJ2bps2NnkX7HzqQAyTZYjcyJVCTvZwMquyMviv2juyAdbP9P2depHrJxQW). Request id je bio `019e135a-357b-71f3-8b9d-305e728b05fb`, a generisani asset je lokalno sačuvan kao `image.png`.

I tu je open-second-brain idealno legao.

## Pay Memory

U verziji 0.8.0 OSB je dobio novi sloj - **Pay Memory**. Ukratko: memorija za novac.

Posle svake plaćene akcije u vaultu se pojavi običan Markdown fajl sa ovim poljima:

- **zašto** je agent odlučio da plati;
- **koji servis** je pozvan;
- **koja spending policy** je važila i šta je odlučila (`allowed` / `approval_required` / `denied` / `not_checked`);
- **očekivana cena** i **stvarno skinut iznos**;
- **payment proof** - konkretan Solana potpis koji možete otvoriti u Solscanu i proveriti;
- **rezultat** - link ka zasebnoj asset note sa izlazom;
- **ko je approvao**, ako policy to traži.

Nije SQLite tabela i nije dashboard. To je čist Markdown koji leži u istom folderu gde agent piše svoj daily log. Možete ga otvoriti očima, prokomentarisati, ukomitati u Git, kasnije pronaći grep-om ili pokazati kao dokaz.

OSB ovde ne postaje sistem za plaćanje - ne drži novčanik, ne potpisuje transakcije, ne radi enforcement. Radi ono što ume: vodi iskrenu, ljudski čitljivu memoriju. pay.sh daje agentu pristup plaćenim resursima; Pay Memory daje čoveku mogućnost da nedelju dana kasnije otvori vault i mirno razume šta se dogodilo.

Usput, [evo tačno kako izgleda pravi receipt](/files/fal-generate-a-no-text-fast-sdxl-illustration-for-the-techmeat-d.md) - onaj za istu onu ilustraciju na početku posta. Sirov Markdown pravo iz vaulta, bez ikakve obrade. Frontmatter sa svim gore navedenim poljima, a ispod njega ljudski tekst o "zašto", "šta je policy vratila" i "koliko je stvarno skinuto".

Unutar Second Braina živi na ovoj putanji:

```
AI Wiki/
└── payments/
    └── 2026-05-10/
        └── fal-generate-a-no-text-fast-sdxl-illustration-for-the-techmeat-d.md
```

Bez magije: datum → folder, slug → ime fajla. Zgodno za grep, git diff i običnu navigaciju u Obsidianu.

## Jedan princip koji se ispostavio važnijim od ostalih

Kad sam pregledao draft implementaciju, oko mi je odmah zapelo o jedan detalj: receipt je uvek pisao "Allowed by the configured spending policy" - čak i kad u vaultu nije postojala nikakva policy.

Zvuči kao sitnica. U stvari, ubija celu poentu.

Pay Memory je audit sloj. Audit sloj vredi tačno onoliko koliko je iskren. U trenutku kad receipt počne da priča lepu priču umesto prave, sve se ruši. Pravilo se ispostavilo kao jednostavno: bolje upisati `not_checked` nego sa sigurnošću logovati `allowed` lažno. Ako policy nije proverena - tako i napiši. Ako je policy vratila `denied` ali je čovek ručno propustio poziv - i to napiši.

Iskušenje "lepog narativa" je glavni neprijatelj audit sistema. I to je verovatno najvažnija lekcija dana - koju nameravam da prenesem i u druge delove projekta.

## Pravo plaćanje u produkciji

Krajem dana sve ovo je trebalo proveriti ne na sandbox fixtures, već na stvarnom novcu. Poslao sam deset centi USDC na svež Solana novčanik i zamolio agenta da preko Google Places nađe tri kafića u Beogradu.

Sekundu kasnije stigla su tri stvarna mesta - Artist Specialty Coffee, Dusha, DRIP. Tx finalizovan na mainnetu, $0.001 USDC, balans je sa 0.10 otišao na 0.099. Potpis u Solscanu, kliktabilan.

I tu se pokrenuo ceo Pay Memory lanac: receipt sa stvarnim potpisom u vaultu, zasebna asset note sa tri kafića, dnevni izveštaj o plaćanjima i kratak zapis u Daily sa linkovima ka oba fajla. Mogu da otvorim vault u Obsidianu, kliknem na proof, vidim stvarno plaćanje u explorer-u i tik pored - jasnu, ljudski napisanu priču o tome zašto je agent to uradio.

## Čemu sve ovo

Ne pokušavam da napravim sebi enterprise compliance ili blockchain-for-everything. Sama arhitektura je sramotno jednostavna - skup Markdown fajlova u pravim folderima.

Ali ideja iza toga je važna.

Ako agent radi sve autonomnije, njegova memorija mora da pokrije ne samo tekstualne akcije već i akcije sa posledicama: poziv eksternog servisa, potrošen novac, kreiran asset, traženi approval. Plaćanje je samo najslikovitiji primer, jer se pitanje poverenja tu odmah postavlja. Isti principi se lako prenose i na objavljivanje posta, slanje email-a, deploy, naručivanje generacije, on-chain operaciju.

Kratka verzija:

> pay.sh daje agentu pristup plaćenim resursima.
> Pay Memory daje čoveku mogućnost da nedelju dana kasnije razume zašto je agent taj pristup iskoristio.

Ako agent samo troši novac - to je rizik. Ako agent troši novac i ostavlja iskren, povezan, ljudski čitljiv trag - to je već workflow kome polako možete početi da verujete.

Pay Memory je izašao u sklopu [open-second-brain 0.8.0](https://github.com/itechmeat/open-second-brain/releases/tag/v0.8.0).
