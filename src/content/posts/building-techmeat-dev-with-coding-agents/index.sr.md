---
title: "Kako sam izgradio ovaj blog uz coding agente"
description: "Priča o pokretanju techmeat.dev: od spontane ideje i seta skill-ova do Astro-a, Cloudflare Pages-a, brainstorming-a i prve verzije bloga."
pubDate: 2026-04-28
tags: [ai-coding, astro, bun]
ogImage: "/posters/og/posts/building-techmeat-dev-with-coding-agents.png"
locale: sr
prFileId: 157451cbe44986df613bfc2c43afbcafd84b718d1da3b3a14ef2cac7d3c655e9
---

Nekada sam imao blog. Pristojan saobraćaj, jasna tema, prava lična iskustva: pisao sam o frontendu i o stvarima koje sam sam rešavao. Onda sam ga, iz ne baš važnih razloga, prestao održavati i usput izgubio domen.

Dugo je delovalo da je ta priča prosto završena. Ali danas mi se opet pisalo — ne o frontendu kao profesiji, već o tome kako gradim prave projekte sa coding agentima. Bez apstrakcija o budućnosti razvoja, samo konkretni procesi, greške i odluke.

Tako je nastao [techmeat.dev](https://techmeat.dev/).

## Zašto sam ovo uopšte počeo

Ideja je bila spontana. Imao sam neiskorišćene tokene koji su se gomilali, par hipoteza koje sam hteo da proverim, i odlučio sam da napravim mali ali pravi projekat: blog gde sam proces izgradnje postaje prvi komad sadržaja.

Moj uobičajeni workflow sa agentima mnogo je razrađeniji: nekoliko faza planiranja, review-a i checkpoint-a. Ovde sam ga namerno pojednostavio. Hteo sam da vidim koliko daleko se može stići ako brzo postaviš pravac, pripremiš kontekst i predaš agentu većinu starter posla.

Ovo nije referentni proces; ovo je eksperimentalna verzija. Verovatno ću o strožem pristupu pisati zasebno.

## Priprema: skill-ovi, kontekst i pravila projekta

Prvo sam instalirao skill-ove koji su mi trebali. Za ovakav projekat to je važnije nego što izgleda: „napravi blog" je previše slabo postavljen problem. Agentu su potrebna jasna pravila: koje tehnologije koristiti, gde držati sadržaj, kako razmišljati o SEO-u, kako pristupiti dizajnu, šta bez razloga ne raditi. Starter set zabeležen je u radnoj datoteci [INIT.md](https://github.com/itechmeat/techmeat-dev/blob/master/docs/INIT.md).

Posle toga sam inicijalizovao `CLAUDE.md` — datoteku sa osnovnim kontekstom projekta. Sam nacrt bio je na ruskom, ali sam ga odmah preveo na engleski za radni kontekst, kako bi bio podjednako koristan u svakom locale-u i alatu.

```text
This project is empty for now, but I am going to build my blog here. The project will be based on Astro, and posts will be stored as Markdown files. Each article will go through a multi-stage SEO and GEO preparation workflow using the skills available in the project and the geo-optimizer-skill CLI: https://github.com/Auriti-Labs/geo-optimizer-skill, which is already installed.

The blog will be about building projects with AI coding.

The domain has already been chosen and purchased: techmeat.dev.

The project will be hosted on Cloudflare Pages.

The primary language of the blog will be English, but there will also be translations into other languages, at least 10 popular ones. Translation pages must point to the English version of the same article with canonical links.

The project design must be created using the impeccable skill.

All project documentation must be written in English. Draft documentation may be an exception.
```

Onda sam kopirao `CLAUDE.md` u `AGENTS.md`. Ne želim da projekat vežem za jednog konkretnog agenta: ako sutra nastavim razvoj u drugom alatu, osnovna pravila ostaju pored koda.

## Prvi boot: samo temelj

Nisam tražio od agenta da krene sa stranicama ili dizajnom. Na startu mi je trebao ispravan tehnički temelj: Astro projekat spreman za Cloudflare Pages, sa čistom strukturom i bez suvišne inicijative.

Prompt je bio namerno uzak:

```text
Let's start developing our blog project. First, use the Astro skills and set up the initial project, preparing it for hosting on Cloudflare Pages. There is no need to build pages or do any additional work right now. Only set up the project.
```

Što je prvi zahtev uži, manja je šansa da agent počne da „popravlja" projekat tamo gde još nikakva odluka nije doneta. To štedi mnogo živaca: trebala mi je pouzdana startna tačka, ne zgodna maketa.

## Brainstorming umesto preuranjenog dizajna

Sledeće sam uključio Superpowers i počeo brainstorming, namerno tražeći da se dizajn ne razmatra. U ovoj fazi je trebalo odlučiti od čega blog kao proizvod treba da se sastoji, a ne kako izgleda.

Prompt je bio:

```text
Let's brainstorm in Russian about what my blog should consist of. Here's how I currently see it:

- All pages should share a unified design, but we are not discussing the design itself yet, only common blocks and similar structural elements. The header should include the techmeat.dev name and a language switcher. To clarify, the brainstorming result should describe what the blog should have, not how it should look.
- The home page should show previews of the 10 latest posts with links to the full posts. Maybe it should include something else too; suggest options.
- There should be an About page: something like a CV, but in a more blog-like form.
- There should be a Contacts page with links to my social profiles and GitHub.
- Maybe some other pages are needed; suggest options.
- This should be a very simple blog, mostly informational. I expect to publish materials often.
```

Brainstorming je trajao oko sat vremena. Za ovako mali projekat zvuči puno, ali se vreme isplatilo: bez njega ne bih dobio koherentan plan i arhitekturni spec. Agent mi je pomogao da blog razložim na stranice, zajedničke blokove, jezički model i strukturu sadržaja.

Rezultat su dva interna artefakta: [plan](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/plans/2026-04-27-blog-v1.md) za prvu verziju i [arhitekturni spec](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/specs/2026-04-27-blog-architecture-design.md).

## Autonomni razvoj, review i ispravke

Posle brainstorming-a, sve što je trebalo bilo je da se složim sa pravcem i pustim agenta da radi. Većina osnovne strukture pojavila se autonomno: rute, Markdown sadržaj, locale-i, komponente, RSS, tagovi, infrastruktura za prevode.

Nije prošlo potpuno bez ručne intervencije. Dodao sam par korigujućih prompt-ova: pojasnio set jezika, tražio da se isprave sitni bagovi i da se zategnu detalji koje je agent u prvom prolasku propustio.

Onda sam tražio od GPT-5.5 da pregleda dobijeni kod i odmah primeni ispravke. Jedva sam se uključivao: agent je našao par korisnih poboljšanja, primenio ih i pokrenuo provere. Iskreno, ovu verziju sam praktično vibe-codeovao, što inače pokušavam da izbegnem. Ovde je bilo prihvatljivo: projekat je mali, cena greške niska, a cela poenta je bila isprobati granice ovog pristupa.

Tu se jasno vidi kako uopšte razmišljam o AI coding-u. Agent nije magično dugme „napravi mi proizvod"; to je veoma brz izvršilac kome trebaju okviri, kontekst i povremeni review. Sa dobrim okvirima preuzima ogromnu količinu rutinskog posla. Sa neodređenima — proizvodi neizvesnost jednako brzo.

## Zašto sam dizajn odložio

Namerno sam dizajn izostavio iz prve faze. Imam zaseban proces za vizuelnu stranu i hteo sam da prođem kroz njega samostalno, ne mešajući arhitekturu, sadržaj i interfejs u jedan zadatak.

Zato prva verzija bloga izgleda kao tehnički skelet: rute, lokalizacija, postovi, tagovi i infrastruktura za objavljivanje su već tu, vizuelni sistem nije, i to je u redu. Ponekad je korisnije prvo dobiti radni projekat, pa onda mirno razmišljati o tome kako izgleda i kako se oseća.

## Šta želim da proverim sa ovim blogom

techmeat.dev je radna laboratorija, a ne samo skladište beleški. Zanima me kako se razvoj menja kada ti je coding agent stalno uz lakat: gde ubrzava posao, gde stvara skrivene rizike i gde ti pomaže da vidiš rešenje do kojeg bi sam stigao mnogo kasnije.

Tri stvari mi posebno drže pažnju.

**Proces.** Ne „agent je napisao kod", nego ono što je bilo pre i posle: koji su prompti radili, koja ograničenja sam morao da postavim, koje odluke je bolje ostaviti čoveku.

**Kvalitet.** Razvoj uz AI lako se pretvara u stream zakrpa ako se ne drži plan i review-i. Hoću da pokažem i uspele rezultate i mesta gde je agent pogrešio, ili gde moja postavka problema nije bila dovoljno precizna.

**Ponovljivost.** Ako pristup ne možeš ponoviti na sledećem projektu, to nije proces — to je jednokratni trik. Zato ću beležiti ne samo finalni kod nego i radne šeme: kako je zadatak postavljen, koje su se datoteke pojavile, koji su alati bili uključeni, kako su odluke donošene.

## Šta sledi

Sledeća faza je dizajn. Nastavak ovog posta biće upravo o tome: kako sam to uradio, koje sam odluke doneo, šta je iz toga ispalo. Iako kako će to zapravo izgledati — ne znam ni sam još uvek.

Za sada, za zapis, sačuvajmo kako blog izgleda danas:

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/eo8KNkGzBBM?si=KVKJ1hHw26kDkmtZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Dizajn kroz Impeccable

Ako si pogledao klip iznad — već si video kako je blog izgledao pre i kako je počeo da izgleda posle.

Dizajn sam namerno odložio za posebnu fazu — da ga ne mešam sa arhitekturom i sadržajem u istom zadatku. Kolege su mi preporučile sistem skill-ova [Impeccable](https://impeccable.style/) — pomaže agentu da napravi promišljeniji vizual umesto podrazumevane AI-estetike.

Ispalo je istovremeno jednostavno i ne baš jednostavno. Jednostavno — jer je sve stalo u jedan prompt i par krugova pitanja sa Claude Code-om. Ne baš — jer je prompt morao biti napisan pažljivo, a pitanja Claude Code-a nisu bila baš laka.

Početni prompt:

```text
The blog is already running on the base setup with starter content, but it was deliberately built without design — I wanted to handle that as a separate phase.

You have the impeccable skill, but I'm not great at using it yet. Let's learn it together from the docs at https://impeccable.style/docs/impeccable.

What I want for the blog: a simple, elegant design with minimal decorative imagery (ideally none at all). Content first, but the site should feel pleasant — design must not get in the way of consuming content. At the same time the visual character should reflect my own attitude toward design.

I have no references; let's build it from scratch.
The blog already has a light/dark theme toggle — we can keep it or drop it.
We have many locales, including Asian scripts and Arabic, so RTL matters.
Mobile-first is also important.
You'll find more details in /docs.
You can ask me questions, but don't drown me in them — only the essentials.
```

Claude Code je dizajn osvežio prilično brzo. Posle par dodatnih prompt-ova rezultat mi je odgovarao.

## Posteri kroz Pencil

Sledeće — posteri, da linkovi ka blogu izgledaju lepo kad se dele po društvenim mrežama. Uključio sam [Pencil](https://www.pencil.dev/) (MCP im je odličan) i tražio od Claude Code-a da izgradi [sistem postera](https://github.com/itechmeat/techmeat-dev/blob/master/design/posters.pen) i izveze ih u projekat. Nije prošlo bez sitnih ručnih ispravki, ali u celini — brzo i uredno.

Prompt za ovaj deo:

```text
I'm adding a `design/` folder to the project for design artifacts. Let's start with post posters.

Posters will live in Pencil — you have the MCP for that.

Build a poster system for every page of the blog; the layouts should be templated. Post posters should be kept separate so adding a new poster per post is easy.

Posters need two sizes — landscape and portrait — to cover both social-network variants.

Make a poster for the first post, fully on-spec and at the correct dimensions. The first poster will become the template, with small per-post variations.

Export every poster, place them correctly inside the project, and wire each one up to the matching page.

The home-page poster should also serve as the default poster for any page that doesn't have its own yet.
```

## Komentari, Lighthouse i hosting

Sistem za komentare nisam uključio — za sada ne vidim potrebu. Ako želiš da prokomentarišeš objavu — ispod nje stoji link na PR, možeš ostaviti komentar tamo.

Na samom kraju zamolio sam agenta da prođe sajt kroz Lighthouse i podigne metrike. Brojke su na kraju stale na 100%.

Hosting sam od početka hteo da napravim što jeftinijim po novcu i vremenu — izbor je pao na Cloudflare Pages. $0 za sve, plus ugrađena analitika. Domen sam, uzgred, takođe kupio na Cloudflare-u — ispao je jeftiniji nego kod uobičajenih registrara.

## Šta sledi

Time je prvi ciklus završen: blog radi, preveden je, ima dizajn, OG-postere i metrike kojih se ne treba stideti. Sledeći korak je automatizacija pisanja objava. Imam ideju kako to uraditi „na moderan način" — o tome ću pisati u zasebnoj objavi.
