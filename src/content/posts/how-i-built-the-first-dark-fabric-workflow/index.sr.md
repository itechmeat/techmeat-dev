---
title: "Kako sam napravio prvi Dark Factory workflow"
description: "Hermes na VPS-u, kanban graf od 13 zadataka, revije između faza na različitim profilima, mini-brainstorm sa čovekom preko Telegrama i bare-HTML deploy na kraju. Prvi radni Dark Factory stack — preživeo je nekoliko debug prolaza i sada prolazi kroz sve faze bez ručnog disponovanja."
pubDate: 2026-05-17
locale: sr
tags: [dark-factory, hermes, kanban, workflow, claude-code, codex]
ogImage: "/posters/og/posts/how-i-built-the-first-dark-fabric-workflow.png"
---

U [prethodnom postu](/sr/posts/how-i-built-open-second-brain/) pisao sam o OpenSecondBrain — sloju memorije koji koriste AI agenti. Memorija je samo polovina priče. Druga polovina je sam proces: ko šta radi, ko koga proverava, šta se računa kao „gotovo", i kako sve to kreće jednom rečenicom u četu.

Danas sam pokrenuo prvu radnu verziju: workflow `new-project`. Donesem ideju u Telegram, a na izlazu dobijam razvijen projekat sa dokumentima, dizajnom, planom i stvarnom javnom stranicom.

## Kako to izgleda spolja

Donosim ideju. Na primer: „treba mi jednostrana landing stranica za moj mali studio".

Onda odgovaram na kratke runde ciljanih pitanja. Prvo, sam brainstorm: ko je publika, šta treba istaći, koji stack više volim, kakav osećaj treba da ima. Zatim, kroz svaku fazu, još par kratkih sesija od po 4–5 pitanja: sve što autoru tekućeg dokumenta nedostaje da ne bi izmišljao.

Sve ostalo radi fabrika. U međuvremenu mogu da se bavim svojim poslom.

## Kanban sa živim karticama

Najvidljiviji deo svega ovoga je kanban tabla. Kada kažem „da" na finalni plan, orkestrator u jednom prolazu kreira 13 kartica na njoj, po jednu za svaku fazu rada. Odatle se sve dešava pred mojim očima.

Kartice se kreću same. Prva se upali, dobije oznaku `running`, i znam da ju je neki od subagenata preuzeo. Nekoliko minuta kasnije kartica klizne u `done`, i sledeća se upali. Između svake proizvodne faze uvek stoji kartica za reviju, i mora je preuzeti drugi subagent: onaj ko je pisao dokument nikada ne pregleda svoj rad.

Ponekad revija ne prođe. Tada kartica revije ide u `blocked`, pored se pojavljuje nova fix-zadatak za istog autora, i ceo downstream čeka. Kada autor popravi i zatvori fix-zadatak, revija se budi i ponovo čita artefakt. Može da prođe. Može da ga vrati. Maksimalno dva kruga, pa eskalira na mene.

Na kraju gledam u tablu skoro kao u praćenje pošiljke: sad sklapaju, sad pakuju, sad šalju. Samo što to nije kurir — to je nekoliko subagenata koji istovremeno rade na različitim delovima mog projekta.

## Šta izlazi na kraju

Na kraju procesa imam:

- strukturisan `about.md` koji hvata suštinu ideje;
- `specs.md` sa funkcionalnim i nefunkcionalnim zahtevima;
- `architecture.md` sa tehničkim okvirom;
- `plan.md` sa faznim roadmapom do MVP-a;
- `DESIGN.md` sa vizuelnim identitetom, tokenima, tipografijom i ključnim ekranima;
- sopstveni GitHub repozitorijum projekta sa svim ovim fajlovima;
- deployovanu javnu stranicu na poddomenu `<slug>.techmeat.dev`, koja za sada servira najjednostavniji mogući HTML koji ogleda `about.md`. To je obećanje da projekat postoji i da je dostupan.

Implementacija same funkcionalnosti je posao drugog workflowa, sledećeg. Cilj ovog prvog je da ideju dovede u stanje „sve opisano, sve usaglašeno, projekat ima svoju adresu". Posle toga već može da se unajmi fabrika za pravi razvoj.

## Šta je bilo teško

Radio sam nekoliko debug prolaza. Svaki put bi izleteo neki svoj smešni bug: subagent bi pokušao da pospremi sopstveni radni direktorijum i ubio svoju shell sesiju; ili bi krenuo da implementira funkcionalnost usred faze, iako implementacija ne spada u ovaj workflow i posao je sledećeg. Između prolaza sam patchovao skill i restartovao. U trenutnom stanju ciklus ide čisto od početka do kraja.

## Usput je porasla i memorija

U prošlom postu sam obećao da je [OpenSecondBrain](https://github.com/itechmeat/open-second-brain) druga polovina priče. Od tada je ta polovina prilično sazrela, i za samu fabriku to je važno.

Glavna promena: OpenSecondBrain sada ima sloj „observacione memorije". Ranije sam u njega pisao ručno, kao u dnevnik. Sada subagenti uzgred hvataju moje preference (stvari poput „komitovi se pišu u imperativu" ili „ne koristi interne skraćenice bez konteksta"), spuštaju beleške u inbox, a jednom dnevno Hermes agent pokreće `dream` — pozadinski prolaz koji ponavljana zapažanja unapređuje u pravila. Ta pravila se automatski učitavaju na početku svake sledeće sesije, i više ne moram da se ponavljam dvadeset puta.

Uz to: pretraga celog teksta po celoj bazi znanja OpenSecondBrain-a, backup i rollback pre svakog `dream` prolaza, poseban sloj koji beleži svaku plaćenu operaciju (šta je plaćeno, zašto, na šta je vezano) i mašinski nametnuta zaštita od toga da jedan agent slučajno pregazi pravila drugog. Sve ovo je ono što fabriku čini mogućom: kada subagent piše `DESIGN.md`, on već vidi moje nakupljene preference o tipografiji i interfejsu. Jednom sam ih ispustio u čet, OpenSecondBrain ih je zakačio, i sada putuju u svaki novi projekat bez podsetnika.

## Šta sledi

`new-project` je samo bootstrap. Sledeći će biti `new-feature` — workflow koji uzima postojeći projekat sa njegovim dokumentima i izbacuje sledeću funkcionalnost u produkciju. I treći, `bugfix`: trijaž, repro, fix, verifikacija, ship. Zajedno, ova tri playbooka su moja verzija Dark Factory za jednu osobu: donosim ideju ili bug-report, a izlazi funkcionalnost koja radi.

Do pune fabrike put je još pred nama. Ali prvi deo je sklopljen i ide stabilno.

Objaviti sve ovo kao opensource je još uvek prerano: u ovoj fazi to je više istraživanje nego gotov proizvod. Čim ceo proces izgradnje projekata bude radio pouzdano, sve ću otvoriti. Pratite me na [X](https://x.com/techmeat).
