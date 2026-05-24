---
title: "Dark Factory i Open Second Brain: autonomni razvoj i memorija na kojoj počiva"
description: "Kratko izlaganje o moja dva projekta — Dark Factory i Open Second Brain. Pred prezentaciju sam zamolio orkestratora da od nule sklopi radnu chat-aplikaciju — i u trenutku kada sam počeo da govorim, na živom URL-u već se otvarao deployovan sajt. Unutra — kako su oba projekta uređena i zašto se memorija pokazala kao obavezan uslov, a ne korisno dopuna."
pubDate: 2026-05-24
locale: sr
tags: [dark-factory, open-second-brain, startit, demo, hermes, agents]
draft: true
---

![Ja na bini u startit-u sa projektorom iza leđa](./hero.jpg)

Pre neki dan sam svratio u [startit](https://startit.rs/) sa kratkim izlaganjem — da ispričam čime se bavim poslednji mesec. Publika u sali je bila profilna — bilderi koji sami grade AI agente, tako da nije bilo potrebe objašnjavati šta je context window i zašto agentu ponekad nije dovoljna jedna model. Moglo se odmah preći na suštinu.

A suština je sada u dva povezana projekta: **Dark Factory** — autonomni razvoj, i **[Open Second Brain](https://github.com/itechmeat/open-second-brain)** — memorija na kojoj ta autonomija počiva.

## Šta sam pokazivao

Slajdova je bilo malo. Logika je jednostavna:

- Ne gradim CoPilot, nego **Dark Factory** — proizvodnju u kojoj agenti sami vode projekat od ideje do release-a. Ja donesem ideju, dalje tim subagenata radi brainstorm, dokumente, dizajn, plan, repozitorijum, deploy. Ja se u međuvremenu bavim svojim poslom i uključujem se samo na reviju.
- Vrlo brzo pri takvoj postavci se udari u **problem memorije**. Scrollback terminala nije memorija. Preneti kontekst između sesija nije moguće. Reasoning — zašto je agent doneo konkretnu odluku — odlazi u logove i gubi se.
- Zato je pored fabrike trebalo izrasti **Open Second Brain** — fajl sloj memorije za agente. Plain Markdown u Obsidian-kompatibilnom vault-u: bilo koji agent čita, bilo koji piše, sve je vidljivo čoveku kao obične tekstualne beleške.
- Dalje se već može graditi nešto zanimljivo. Na primer, sloj _observacione memorije_: subagenti uzgred tokom rada hvataju moje preference, spuštaju ih u inbox, noću zaseban prolaz (`dream`) ponavljana zapažanja pretvara u pravila, i ta pravila se automatski učitavaju na početku svake sledeće sesije. Prestajem da ponavljam isto po dvadeset puta.

## Demonstracija: projekat koji su agenti sklopili za pola sata

Pred prezentaciju sam u Telegram orkestratoru dobacio jednu rečenicu — otprilike „napravi parodijski chat u kome AI na bilo koju repliku korisnika odgovara da je apsolutno u krivu". I otišao da se spremim za izlaganje.

Jedan prompt, kratak brainstorm — orkestrator postavi nekoliko preciznih pitanja i fiksira plan, — dalje pipeline ide autonomno. U chat počinju da padaju izveštaji o dešavanjima: koja je faza pokrenuta, koji subagent ju je preuzeo, šta je vratila revija. Više ne moram da se mešam tokom rada.

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/g2m4E5tSpEo" title="Dark Factory: projekat za pola sata u Telegramu" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Pod haubom tokom tih pola sata:

- product-tech-lead je razložio ideju na brainstorm i specifikaciju;
- arhitekta je izabrao stack i opisao konturu;
- dizajner je sklopio vizuelni identitet i ključne ekrane;
- paralelno su kreirani GitHub repozitorijum, systemd jedinice na VPS-u, Caddy ruta i poseban poddomen;
- fullstack inženjer je realizovao front i back, QA je propustio testove, devops je doveo do zelenog deploya.

Sve ovo ide kroz isti konvejer kanban table sa revijama između faza, koji sam detaljno [razložio u prethodnom postu](/sr/posts/how-i-built-the-first-dark-fabric-workflow/): 13 kartica, maksimalno dva kruga po reviji, različiti subagenti na producing i review fazama.

Do trenutka izlaska na binu, na adresi **[you-absolutely-wrong.techmeat.dev](https://you-absolutely-wrong.techmeat.dev/)** već se otvarao deployovan sajt. Chat u kome asistent sa apsolutnom sigurnošću objašnjava da nisi u pravu, šta god da napišeš. Unutra React + Vite na frontu, Hono na Node.js na backu, SQLite za sesije, DeepSeek-v4 kroz OpenCode kao model. Pun projekat, ne landing.

<figure style="max-width: 479px; margin-inline: auto;">

![Screenshot you-absolutely-wrong.techmeat.dev u akciji](./demo.png)

</figure>

## Šta dalje

Trenutno fabrika ima dva workflow-a — `new-project` (onaj koji sam detaljno razložio u [prethodnom postu](/sr/posts/how-i-built-the-first-dark-fabric-workflow/)) i `new-feature`, koji uzima već postojeći projekat sa njegovim dokumentima i doteruje sledeću funkcionalnost do production-a. Sledeći na redu su `validate-idea` za proveru hipoteza i `bugfix`: trijaž, repro, fix, verifikacija, ship.

Kada ova četiri ciklusa počnu stabilno da idu od početka do kraja, sve ću otvoriti kao opensource. Open Second Brain je već [otvoren](https://github.com/itechmeat/open-second-brain) i razvija se javno.

Hvala ekipi iz startit-a na prostoru i na pitanjima posle izlaganja — deo njih je otišao pravo u moj backlog. Ako vam je zanimljivo da pratite kako se fabrika dalje sklapa, vodim istoriju na [X-u](https://x.com/techmeat).
