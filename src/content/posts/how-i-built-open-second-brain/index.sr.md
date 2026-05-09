---
title: "Kako sam napravio OpenSecondBrain"
description: "Priča o open-second-brain: kako su Hermes na VPS-u, Obsidian, MCP, CLI i nekoliko agentskih runtime-a postali mala fajl-bazirana memorija za AI agente."
pubDate: 2026-05-09
locale: sr
tags: [second-brain, dark-fabric, hermes, openclaw, claude-code, codex]
ogImage: "/posters/og/posts/building-techmeat-dev-with-coding-agents.png"
prFileId: 145afac48f95d2f8e5af5a3f4af2da00d95d4cd290d815604f6a33418b672311
---

Već dugo aktivno koristim razne AI alatke, ali u jednom trenutku je postalo jasno: ne samo da ih koristim — skoro da sam se potpuno „umotao" u agente i sve što je vezano za AI.

Već nekoliko meseci agenti mi pišu kod po mojim tokovima rada: planiranje, implementacija, revizija, ispravke, ponovna provera. To funkcioniše, ali proces ima čudan ručni rep. Čak i kada agent piše kod, ja i dalje moram da premeštam zadatke između faza, prenosim kontekst, podsećam na pravila, pokrećem provere i vodim računa da sledeći izvršilac razume šta se već dogodilo.

Ponavljajućeg posla je bilo previše. Zato sledeći prirodni korak nije bila još jedna funkcija, već automatizacija samog toka rada.

Tako je nastao [OpenSecondBrain](https://github.com/itechmeat/open-second-brain) — pokušaj da se agentima da normalna memorija o tome šta radimo, zašto to radimo i koje odluke su već donete.

## Od ručnih tokova rada do Dark Fabric

U [prvom postu](/sr/posts/building-techmeat-dev-with-coding-agents/) sam pisao o tome kako sam pokrenuo ovaj blog uz pomoć koding agenata. Tamo je tok rada bio namerno jednostavan: postaviti kontekst, izgraditi Astro projekat, proći kroz dizajn, dodati postove, proveriti rezultat.

Ali moj uobičajeni proces je složeniji. Ima uloge, međurevizije, odvojene agente za različite tipove zadataka i kontrolu kvaliteta na svakom koraku. Kada takvih zadataka bude mnogo, čovek postaje dispečer: prebaci kontekst ovamo, zamoli onoga da proveri ovo, daj sledećem agentu izlaz prethodnog, ne zaboravi da zabeležiš odluku.

Želeo sam da dođem do rigidnijeg modela koji sve češće zvuči kao Dark Fabric: na ulazu ideja funkcije, na izlazu — funkcija realizovana, testirana i deplojovana. Ne „agent je napisao komad koda", već fabrika koja ume sama da rastavi posao na faze i provuče ga kroz proces.

Do punopravne Dark Fabric je još daleko. Ali prvi praktični korak već postoji: Hermes, podignut na VPS-u, sa agentima za različite zadatke, veštinama, Telegram interfejsom i jeftinom maršrutizacijom modela kroz OmniRoute.

I gotovo odmah je otkrivena druga obavezna komponenta ove fabrike: agentima treba memorija.

## Zašto agentu treba Second Brain

Ako agent radi jednu sesiju, može mu se prosto staviti kontekst u prompt. Ako agent radi na projektu nedeljama, to nije dovoljno.

Treba da zna:

- koja su pravila već usvojena u projektu;
- koje odluke su diskutovane i zašto su izabrane baš te;
- koje su se činjenice pojavile tokom istraga;
- koji artefakti su već kreirani;
- koji su agenti učestvovali u radu;
- gde se nalazi ljudska baza znanja, a gde servisna zona agenata.

I najvažnije — to ne bi trebalo da zavisi samo od „memorije modela". Treba mi jednostavan, proveriv, fajl-baziran sistem znanja koji mogu otvoriti rukom, pročitati u Obsidian-u, sinhronizovati, komitovati delimično ili uopšte ne komitovati.

Zato open-second-brain od samog početka nije postao „još jedan četbot sa memorijom", već mala infrastruktura oko Markdown volta.

## Zašto Obsidian i Markdown

Izbor Obsidian-kompatibilnog volta je bio skoro očigledan.

Prvo, to su obični Markdown fajlovi. Nema magije, nema zatvorene baze, nema zavisnosti od konkretnog servisa. Ako agent nešto zapiše, mogu otvoriti fajl i videti rezultat.

Drugo, Obsidian već dobro rešava ljudski deo Second Brain-a: beleške, vikilinkove, dnevne beleške, ručnu navigaciju, graf, pretragu. Nije bilo smisla praviti sopstveni interfejs za znanje kada postoji alat koji je već poznat.

Treće, agentima ne treba ceo Obsidian. Trebaju im determinističke operacije: kreirati servisnu strukturu, dodati događaj u dnevni log, izgraditi indeks strana, proveriti zdravlje volta, eksportovati konfiguraciju bez tajni. Sve to se može raditi kroz CLI i MCP, bez prisiljavanja modela da „razmišlja" o fajl operacijama gde je bolje izvršiti preciznu naredbu.

Trenutno open-second-brain kreira u voltu agentsku zonu `AI Wiki/`, vodi dnevne logove u `Daily/*.md`, ume da ažurira Markdown indeks, proverava konfiguraciju i ne dira ljudske beleške iznad servisne sekcije `## Raw events`.

## Dao sam prazan repozitorijum — agent je izabrao arhitekturu

Najinteresantnije: nisam sedeo da projektujem sve ovo kao klasičnu bibliotečku API. Dao sam agentu linkove na popularne implementacije, prazan repozitorijum i zadatak: napravi univerzalni plagin, pre svega za Hermes, ali tako da ga i drugi agenti mogu preuzeti.

Prvi komit je bio potpuno dokumentacioni: README i bootstrap projekta 6. maja. Zatim je agent brzo izgradio CLI fondaciju, naredbu `o2b`, init/doctor, volt primitive i indeks. Istog dana se pojavio MCP server — važan sloj, jer kroz MCP različiti runtime-i mogu dobijati iste alate bez ručnog parsiranja komandne linije.

Prve verzije su bile veoma praktične: učiniti da Hermes može instalirati plagin, podići volt, proveriti stanje i pisati događaje. Ne savršena arhitektura na papiru, već radna minimalna memorija za pravog agenta.

Zatim je projekat počeo da se menja pod pritiskom integracija.

## Od Hermes-a do univerzalnog plagina

Hermes je ostao glavni runtime. Za njega je projekat i zamišljen: instalirati plagin, ukazati na volt, dati agentu alate i naterati ga da piše važne događaje u Second Brain.

Ali prilično brzo je postalo jasno da vezivanje samo za Hermes nije ispravno. Već imam različite agente i različita okruženja: Claude Code, Codex, OpenClaw. Ako Second Brain treba da bude zajednička memorija, ne može živeti samo u jednom klijentu.

Tako su u projektu nastali adapteri i manifesti za nekoliko runtime-a:

- Hermes kao glavni scenario instalacije;
- Claude Code kroz manifest marketplejsa i MCP;
- Codex kroz sopstveni manifest marketplejsa i MCP;
- OpenClaw prvo kroz JS adapter, zatim kroz pun unos nativnog plagina;
- generički MCP ugovor za runtime-e koji će se pojaviti kasnije.

Ovo je važna arhitektonska odluka: jezgro treba da bude jedno, a ulaza može biti više. Agentima nije potrebno da se spore gde je istina. Istina je u voltu i u zajedničkom skupu operacija.

## Šta je trebalo popraviti putem

open-second-brain se razvijao vrlo brzo: od 6. do 9. maja projekat je prošao put od README-a do verzije `0.7.0`. I skoro svaka verzija nije bila „kozmetika", već reakcija na stvarni problem integracije.

Na primer, OpenClaw je prvo dobio nativnu kompatibilnost plagina, ali runtime se pokazao strožim nego što je očekivano. Moralo se dodati `name` unutar objekata tool, učiniti `register()` sinhronim, a zatim prepisati OpenClaw plagin u čisti JavaScript bez `child_process`, jer je skener bezbednosti blokirao potprocese.

Sledeća velika tema bila je identitet. Ako u dnevniku piše samo `@agent`, takav log je skoro beskoristan. Zato je u `0.6.0` nastao tok rada sa imenima agenata: `o2b init --agent-name`, registracija u `AI Wiki/identity/agents.md` i provera da Daily unosi dobijaju pravilan `@agent-name` umesto placeholder-a.

Zatim su dodati podrška za vremensku zonu, zaštita od pisanja u pogrešan volt, manifesti marketplejsa za Claude i Codex, automatske instrukcije za MCP, normalizacija praznih argumenata, provera instalacionog toka i multi-agentski registar. To ne zvuči kao herojska produktna funkcija, ali su baš takvi detalji ono što razlikuje igračku od alata koji može ostaviti da radi na serveru.

## Verzija 0.7.0: jedno jezgro na TypeScript-u i Bun-u

Najveća promena se dogodila u `0.7.0`: projekat je prešao na ujednačeno TypeScript jezgro na Bun-u.

Do tada je repozitorijum imao paralelnu logiku: Python implementacija za CLI/MCP, JavaScript deo za OpenClaw, Hermes shim. Takva šema brzo počinje da driftuje. Popravio si bag na jednom mestu — nije sigurno da si ga popravio na drugom. Dodao podršku za vremensku zonu u Python — bolje ne zaboravi da ponoviš u JS.

U `0.7.0` agent je uklonio dupliranje: Hermes, Claude Code, Codex i OpenClaw sada konzumiraju zajedničke module iz `src/core/`. CLI živi u `src/cli/`, MCP u `src/mcp/`, a OpenClaw unos se kompajlira iz TypeScript-a u JS bundle kroz `bun build`.

Uz to se pojavila propisna testna baza: `bun:test` sa 176 slučajeva, Python shim testovi, konkurentni test append-event sa 12 procesa, provere svežine bundle-a i sinhronizacije verzija u manifestima.

To je baš trenutak gde se vidi prednost agentskog toka rada. Čoveku je neprijatno ručno premeštati isti kod između runtime-a i prepisivati testove. Agentu — normalno, ako mu se da jasan cilj, ograničenja i provera rezultata.

## Kako to živi na VPS-u

Cela ova priča se vrti na običnom VPS-u za oko 8 dolara mesečno. Tamo takođe živi Hermes, tamo se može voditi razvoj, tamo se upravlja AI pretplatama i maršrutizacijom kroz OmniRoute.

Za mene je to važan deo eksperimenta. Ne želim da AI-asistirani tok rada zahteva posebnu skupu infrastrukturu. Treba mi server, pretraživač, Telegram kao interfejs ka agentu, git repozitorijumi u blizini i jeftin pristup modelima.

Dobija se prilično čudna, ali radna slika: mogu sa telefona napisati agentu na Telegram, on će na VPS-u rastaviti zadatak, otići u repozitorijum, iskoristiti potrebne veštine, kreirati artefakt, pokrenuti provere i zabeležiti važan događaj u Second Brain.

To još nije Dark Fabric. Ali to nije ni prosto „ćaskanje sa modelom".

## Šta je ispalo

U trenutku ovog nacrta, open-second-brain je mali, ali već koristan sloj memorije za agentski razvoj.

Ume da:

- inicijalizuje Obsidian-kompatibilan volt za agentski rad;
- kreira `AI Wiki/` i servisne stranice;
- piše dnevne događaje u Markdown;
- čuva identitete agenata;
- uzima u obzir vremensku zonu korisnika, a ne samo vreme servera;
- proverava zdravlje volta, konfiguracije i manifesta runtime-a;
- eksportuje konfiguraciju sa redigovanim osetljivim vrednostima;
- radi kroz CLI, MCP i adaptere runtime-a;
- podržava Hermes, Claude Code, Codex i OpenClaw iz jednog repozitorijuma.

Najvrednije nije ni spisak naredbi. Vredno je to što su agenti dobili zajednički protokol memorije: kada se desi nešto trajno — kod, ispravka, promena konfiguracije, sadržaj, istraživački nalaz, dizajn-odluka — treba to zabeležiti tako da budući-ja i budući-agent to mogu pronaći kasnije.

## Šta dalje

Najbliži cilj je dovesti spregu Hermes + open-second-brain do stanja gde agent ne samo piše događaje, već stvarno koristi nagomilanu memoriju prilikom planiranja i revizije.

Dalje želim da:

- bolje povežem Daily logove sa wiki stranicama;
- dodam korisniju pretragu i sumare po istoriji projekta;
- opišem u posebnom postu kako tačno Hermes radi na VPS-u i kako je ustrojena komunikacija kroz Telegram;
- pretvorim trenutne tokove rada u autonomniju Dark Fabric;
- proverim da li različiti agenti mogu bez bola deliti jedan volt i ne kvariti međusobni kontekst.

Glavni zaključak za sada je jednostavan: agentima nije potreban samo model ni samo pristup repozitorijumu. Treba im okruženje gde odluke, činjenice i događaji postaju trajni deo procesa.

[open-second-brain](https://github.com/itechmeat/open-second-brain) je moj prvi radni korak u tom pravcu.

## Kako je napisan ovaj post

Izvinite, ali ovaj post je takođe napisao isti agent Hermes. Rukom su napisani samo ovaj pasus i moj [post na Facebook-u](https://www.facebook.com/reel/1355271143340726/). Jednostavno sam zamolio agenta da klonira moj blog kao običan projekat, pregleda istoriju komitova i uzme Facebook post kao bazu. I naravno, pročitao sam i ispravio tekst pre objave. I ne recite da nema duše — ja ubacujem dušu u agenta.
