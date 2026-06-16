---
title: "Open Second Brain je postao stabilan, a Dark Factory je dobila sledeći sloj"
description: "Open Second Brain je stigao do stabilne verzije, Hermes sada može da ga koristi kao nativnu memoriju, a Hermes Workflows pretvara moje ručne playbook-e u autonomne grafove rada."
pubDate: 2026-06-16
locale: sr
tags: [open-second-brain, dark-factory, hermes, workflows, agents, memory]
ogImage: "/posters/og/posts/open-second-brain-stable-and-hermes-workflows.png"
---

I dalje duboko ulazim u ekosistem Hermes Agenta. U maju je to još delovalo kao niz povezanih eksperimenata - memorija, Kanban, Telegram, subagenti, review između faza - ali sada slika počinje da se sklapa u jedan sistem.

Cilj je isti: da napravim svoju malu **Dark Factory**. Ne „agent koji pomaže da se piše kod“, nego fabrika u kojoj ideja prolazi kroz jasan proces: analiza, planiranje, implementacija, review, testovi, deploy i zapisivanje odluka u memoriju. Do pune autonomije ima još puta, ali deo tog cilja je već postignut. Mnogo toga što je ranije tražilo moje ručno dispečiranje sada stvarno ide samo.

U poslednjih nekoliko nedelja najviše su porasla dva sloja: [Open Second Brain](https://github.com/itechmeat/open-second-brain) kao memorija i [Hermes Workflows](https://github.com/itechmeat/hermes-workflows) kao budući orkestrator procesa.

## Open Second Brain više nije eksperiment

Open Second Brain je dobio stabilnu verziju. Za mene je to važna psihološka granica: projekat više ne deluje kao „hajde brzo da proverimo ideju“, nego kao alat koji mogu da koristim svakog dana.

Javni kontrakti su manje klimavi. Hermes može da priključi O2B kao nativni memory provider, a ne kao sporedni hack. Jedan Hermes na laptopu, drugi na VPS-u, Claude Code, Codex i drugi runtime-ovi mogu da gledaju u isti Markdown vault i da ne izgube akumulirana pravila, preferencije i tragove odluka.

Već sam pisao zašto je to važno u tekstu o [razvoju OpenSecondBrain-a](/sr/posts/how-i-built-open-second-brain/). Ukratko: agentski razvoj vrlo brzo nailazi na problem memorije. Ne „šta je bilo u poslednjem odgovoru modela“, nego šta smo odlučili pre nedelju dana, koja pravila sam ponovio pet puta, koji artefakti već postoje, gde je trenutni kontekst projekta i koji zaključci ne smeju da nestanu pri sledećoj kompakciji.

O2B to rešava prizemno: Obsidian-kompatibilan vault, plain Markdown, `Brain/`, deterministički CLI/MCP alati, `dream` prolazi, staged primena promena memorije, rollback, pretraga, daily zapisi, preferences i pinned context. Nema skrivenog SaaS mozga kojem dodatno treba verovati. Fajlovi su kod mene.

## Zvezdice i prava motivacija

Plugin postepeno dobija popularnost. U trenutku pisanja repozitorijum ima [71 zvezdicu](https://github.com/itechmeat/open-second-brain), još daleko od hiljada.

Ali moj cilj nije da „skupljam zvezdice“. Bilo bi lepo, naravno. Zvezdice pomažu drugima da vide da je projekat živ i daju repozitorijumu malo više vidljivosti. Ako vam je O2B koristan ili zanimljiv, zvezdica će pomoći.

Glavna motivacija je druga: ja sam glavni korisnik ovog plugina. On pre svega rešava moje zadatke. Gradim Hermes okruženje u kojem agenti treba da pamte moje preferencije, pišu događaje, objašnjavaju odakle su došli zaključci i prenose kontekst između sesija. Ako alat dobro radi za taj scenario, već se isplatio.

Ostalo je prijatan sporedni efekat.

## Nezavisan test memorije

Najzanimljiviji signal nije došao iz README-ja niti iz moje samopromocije, nego od nezavisnog developera koji je upoređivao memory plugine na svežoj Hermes instalaciji. Dao je agentu izbor između nekoliko opcija - reddit obsidian layout, OpenSecondBrain, Honcho i OpenViking - i Hermes je izabrao O2B kao preferiranu memoriju.

Komentar zvuči skoro kao reklama, iako ga nisam naručio:

> So i gave my fresh install on a $1 vps the choice of a reddit obsidian layout, opensecondbrain, honcho and openviking and it chose opensecondbrain as its preferred memory.. nemotron3 ultra free said the quality is outstanding and 80% of what honcho provides. Just local and free. Only thing missing is the neuromancer inference.

Meni ovde nije ključna fraza „80% of Honcho“. Takva poređenja su uvek uslovna: različiti ciljevi, različite arhitekture, različit nivo zrelosti.

Važnije je drugo: spoljašnji čovek je to postavio u čisto okruženje, dao agentu izbor i O2B je bio dovoljno jasan i koristan da bude izabran bez moje ruke na vagi. Za projekat koji je počeo kao interna memorija za moj Hermes, to je dobar prag.

## Gde je Dark Factory sada

Ako gledam Dark Factory u celini, već sam automatizovao delove koji su ranije bili najdosadniji ručni rad.

Mogu da dam Hermesu ideju projekta u Telegramu. On postavlja pitanja, razlaže rad na faze, pravi dokumente, pomera kartice po Kanbanu, daje review drugom profilu, popravlja komentare, deployuje rezultat i piše važne događaje u memoriju. To je isti ciklus koji sam pokazao u tekstu o [prvom workflow-u za Dark Factory](/sr/posts/how-i-built-the-first-dark-fabric-workflow/) i kasnije na [Startit](/sr/posts/dark-factory-and-open-second-brain-at-startit/).

Ispod je još jedan video iz iste linije eksperimenata.

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/J09BbfMpMAw" title="Dark Factory, Open Second Brain i Hermes Workflows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

To još nije „pritisneš dugme i zaboraviš zauvek“. Čitam rezultate, menjam proces, ponekad zaustavim run, ponekad vratim zadatak nazad. Ali ključni pomak se već desio: prestajem da budem stalni dispečer između agenata. Sve češće je moja uloga da formulišem nameru, donesem nekoliko odluka i proverim rezultat.

Za jednog čoveka to je ozbiljna ušteda pažnje.

## Novi sloj: Hermes Workflows

Sledeći veliki komad je u aktivnom razvoju - [Hermes Workflows](https://github.com/itechmeat/hermes-workflows). Projekat je još mlad, ali upravo on treba da promeni pravila igre.

Pre njega moji workflow-i su više ličili na dobro opisane playbook-e preko Hermesa: Kanban, cron, profili, uloge, ručni dogovori i malo lepka. To je već radilo, ali deo procesa je i dalje živeo u mojoj glavi i u instrukcijama.

`hermes-workflows` pravi drugi korak: workflow postaje graf.

U grafu postoje čvorovi:

- `agent_task` - zadatak za konkretan Hermes profil;
- `script` - deterministički shell korak kada model nije potreban;
- `condition` - grananje po rezultatu prethodnog čvora;
- `human_review` - eksplicitna tačka gde je potreban čovek;
- `finish` - završetak sa isporukom rezultata.

Važno je: ovo nije poseban engine koji pokušava da zameni Hermes. Workflow se kompajlira u nativne Hermes primitive: Kanban, Cron, Profiles, delivery router, skills. Sistem ostaje čitljiv kroz iste površine koje već koristim.

Za Dark Factory to je principijelno. Kada je proces opisan kao graf, može da se validira, eksportuje, koristi ponovo, pokreće po rasporedu, prati kroz live telemetry po čvorovima, vidi pending approvals, radi retry i analizira trace posle pada. To više nije „agentu je rečeno da prati instrukciju“, nego izvršivi ugovor.

## Zašto to približava fabriku autonomiji

Glavna slabost Dark Factory nije to što agenti loše pišu kod. Greše, naravno, ali to rešavaju review, testovi i ograničenja. Glavna slabost je upravljanje procesom.

Ako proces živi u dugačkom promptu, krhak je. Agent može da preskoči fazu, pomeša uloge, zaboravi da implementaciju treba da pregleda drugi profil ili počne downstream posao pre nego što upstream prođe proveru.

Graf to rešava inženjerskije. Svaki čvor ima ulaz, izlaz, status i pravila prelaza. Ako review ne prođe, downstream se ne budi. Ako script korak padne, agent se ne pravi da je sve u redu. Ako je potreban čovek, workflow staje na `human_review` umesto da pogađa.

Tu se O2B i Hermes Workflows spajaju u jedan sistem:

- workflows vode proces;
- Hermes izvršava zadatke nativnim mehanizmima;
- Open Second Brain čuva kontekst, preferencije, odluke i tragove run-ova;
- čovek ostaje u petlji tamo gde je to stvarno važno.

To već više liči na fabriku nego na skup odvojenih AI trikova.

## Šta dalje

Najbliži cilj je da dovedem `hermes-workflows` do stanja u kojem mogu da pokažem pun demo: ne samo lep graf u dashboardu, nego run koji sam prolazi kroz više agentskih faza, review, grananja, zapis u memoriju i isporuku rezultata.

Kada to bude radilo stabilno, Dark Factory će biti mnogo bliže obliku zbog kojeg sam sve ovo počeo. Ideja na ulazu. Graf procesa. Više agenata u različitim ulogama. Memorija koja preživljava sesije. Čovek nije dispečer, nego vlasnik namere i finalne odluke.

Najzanimljivije je da je Dark Factory već počela da gradi samu sebe. Svake noći radi research pass: traži nove ideje za poboljšanje Open Second Brain-a, upoređuje pristupe, izvlači korisne obrasce i stavlja zadatke na Hermes Kanban tablu. Zatim periodično uzme odgovarajući scope zadataka u implementaciju, dovede ga do PR-a i, posle mog approve-a, pretvori u release.

Primere takvih release-ova možete videti u [GitHub Releases Open Second Brain-a](https://github.com/itechmeat/open-second-brain/releases). Počev od `v1.12.0`, release-ovi su implementirani potpuno od strane Hermesa, bez mog učešća u kodu. Od mene se tražilo samo da pročitam kreirani PR i kliknem approve.

Još zvuči malo veliko, ali pre par meseci Open Second Brain je bio samo prazan repozitorijum. Sada je stabilan plugin koji Hermes može da izabere kao svoju memoriju.

Videćemo koliko daleko ova fabrika može da ode.
