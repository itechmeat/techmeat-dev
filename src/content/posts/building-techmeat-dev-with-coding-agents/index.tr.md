---
title: "Bu blogu coding ajanlarıyla nasıl inşa ettim"
description: "techmeat.dev'in lansman hikâyesi: spontane bir fikir ve bir set skill'den Astro'ya, Cloudflare Pages'e, brainstorming'e ve blogun ilk versiyonuna."
pubDate: 2026-04-28
tags: [ai-coding, astro, bun]
ogImage: "/posters/og/posts/building-techmeat-dev-with-coding-agents.png"
locale: tr
prFileId: 6f947f57207579d277679c17020b0c01f5dc792905447d092be80bee15d69dc1
---

Eskiden bir blogum vardı. Düzgün bir trafik, net bir konu, gerçek bir kişisel deneyim: frontend hakkında ve kendi başıma çözdüğüm şeyler hakkında yazıyordum. Sonra çok da önemli olmayan sebeplerden onu sürdürmeyi bıraktım ve bu arada domain'i de kaybettim.

Uzun bir süre o hikâyenin sadece bittiğini düşündüm. Ama bugün canım yeniden yazmak istedi — bir meslek olarak frontend hakkında değil, coding ajanlarıyla gerçek projeleri nasıl inşa ettiğim hakkında. Geliştirmenin geleceğine dair soyutlamalar yok, sadece somut süreçler, hatalar ve kararlar.

[techmeat.dev](https://techmeat.dev/) böyle ortaya çıktı.

## Bunu neden başlattım

Fikir spontaneydi. Birikmiş kullanılmamış token'larım, test etmek istediğim birkaç hipotezim vardı ve küçük ama gerçek bir proje yapmaya karar verdim: inşa süreci ilk içerik parçası olan bir blog.

Ajanlarla olağan iş akışım çok daha ayrıntılıdır: birkaç planlama, review ve checkpoint aşaması. Burada onu bilerek basitleştirdim. Yönü hızlıca belirleyip bağlamı hazırlayıp ajana starter işin çoğunu verirsen ne kadar ileri gidebileceğini görmek istedim.

Bu referans bir süreç değil; deneysel bir versiyon. Daha katı yaklaşım hakkında muhtemelen ayrıca yazacağım.

## Hazırlık: skill'ler, bağlam ve proje kuralları

Önce ihtiyacım olan skill'leri yükledim. Böyle bir proje için bu göründüğünden daha önemli: "blog yap" çok zayıf bir problem ifadesidir. Ajanın net kurallara ihtiyacı var: hangi teknolojileri kullanacak, içeriği nerede tutacak, SEO'yu nasıl düşünecek, dizayna nasıl yaklaşacak, sebepsiz yere ne yapmayacak. Starter set, çalışma dosyası [INIT.md](https://github.com/itechmeat/techmeat-dev/blob/master/docs/INIT.md)'de yakalandı.

Ondan sonra `CLAUDE.md`'yi başlattım — projenin temel bağlamını içeren dosya. Taslağın kendisi Rusçaydı ama her locale ve araçta eşit oranda yararlı olsun diye onu hemen çalışma bağlamı için İngilizceye çevirdim.

```text
This project is empty for now, but I am going to build my blog here. The project will be based on Astro, and posts will be stored as Markdown files. Each article will go through a multi-stage SEO and GEO preparation workflow using the skills available in the project and the geo-optimizer-skill CLI: https://github.com/Auriti-Labs/geo-optimizer-skill, which is already installed.

The blog will be about building projects with AI coding.

The domain has already been chosen and purchased: techmeat.dev.

The project will be hosted on Cloudflare Pages.

The primary language of the blog will be English, but there will also be translations into other languages, at least 10 popular ones. Translation pages must point to the English version of the same article with canonical links.

The project design must be created using the impeccable skill.

All project documentation must be written in English. Draft documentation may be an exception.
```

Sonra `CLAUDE.md`'yi `AGENTS.md`'ye kopyaladım. Projeyi tek bir ajana bağlamak istemiyorum: yarın geliştirmeye başka bir araçta devam edersem, temel kurallar kodun yanında kalsın.

## İlk boot: yalnızca temel

Ajandan sayfalarla veya tasarımla başlamasını istemedim. Başlangıçta bana doğru bir teknik temel gerekiyordu: Cloudflare Pages için hazır, temiz yapılı ve gereksiz inisiyatif almayan bir Astro projesi.

Prompt bilerek dardı:

```text
Let's start developing our blog project. First, use the Astro skills and set up the initial project, preparing it for hosting on Cloudflare Pages. There is no need to build pages or do any additional work right now. Only set up the project.
```

İlk istek ne kadar darsa, ajanın henüz hiçbir karar verilmemiş yerlerde projeyi "iyileştirmeye" başlama olasılığı o kadar düşük olur. Bu çok sinir tasarrufu sağlıyor: bana güvenilir bir başlangıç noktası gerekiyordu, güzel bir maket değil.

## Erken tasarım yerine brainstorming

Ardından Superpowers'ı açtım ve brainstorming'e başladım, bilerek tasarımı tartışmamasını istedim. Bu aşamada blogun bir ürün olarak nelerden oluşması gerektiğine karar vermek gerekiyordu, neye benzediğine değil.

Prompt şuydu:

```text
Let's brainstorm in Russian about what my blog should consist of. Here's how I currently see it:

- All pages should share a unified design, but we are not discussing the design itself yet, only common blocks and similar structural elements. The header should include the techmeat.dev name and a language switcher. To clarify, the brainstorming result should describe what the blog should have, not how it should look.
- The home page should show previews of the 10 latest posts with links to the full posts. Maybe it should include something else too; suggest options.
- There should be an About page: something like a CV, but in a more blog-like form.
- There should be a Contacts page with links to my social profiles and GitHub.
- Maybe some other pages are needed; suggest options.
- This should be a very simple blog, mostly informational. I expect to publish materials often.
```

Brainstorming yaklaşık bir saat sürdü. Bu kadar küçük bir proje için çok geliyor ama zaman kendini ödedi: o olmasaydı tutarlı bir plan ve mimari spec elde edemezdim. Ajan, blogu sayfalara, ortak bloklara, dil modeline ve içerik yapısına ayırmama yardım etti.

Sonuç iki dahili artefakt oldu: ilk versiyon için [plan](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/plans/2026-04-27-blog-v1.md) ve [mimari spec](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/specs/2026-04-27-blog-architecture-design.md).

## Otonom geliştirme, review ve düzeltmeler

Brainstorming'den sonra tüm yapmam gereken yönle hemfikir olup ajanı çalışmaya bırakmaktı. Temel yapının çoğu otonom olarak ortaya çıktı: rotalar, Markdown içerik, locale'ler, bileşenler, RSS, etiketler, çeviri altyapısı.

Tamamen elle müdahale olmadan ilerlemedi. Birkaç düzeltici prompt ekledim: dil setini netleştirdim, küçük bug'ların düzeltilmesini ve ajanın ilk geçişte kaçırdığı detayların sıkılaştırılmasını istedim.

Sonra GPT-5.5'tan elde edilen kodu gözden geçirip düzeltmeleri hemen uygulamasını istedim. Pek karışmadım: ajan birkaç yararlı iyileştirme buldu, uyguladı ve kontrolleri çalıştırdı. Açıkçası bu versiyonu büyük ölçüde vibe-code yaptım, ki bunu genelde yapmaktan kaçınırım. Burada kabul edilebilirdi: proje küçük, hata maliyeti düşük ve bütün amaç bu yaklaşımın sınırlarını test etmekti.

AI coding hakkında genel olarak nasıl düşündüğümü tam burada görebilirsin. Ajan büyülü bir "bana ürün yap" düğmesi değildir; çerçevelere, bağlama ve periyodik review'a ihtiyacı olan çok hızlı bir uygulayıcıdır. İyi çerçevelerle büyük miktarda rutin işi üstlenir. Belirsiz çerçevelerle de aynı hızla belirsizlik üretir.

## Tasarımı neden erteledim

Tasarımı bilerek ilk fazın dışında tuttum. Görsel taraf için ayrı bir sürecim var ve mimariyi, içeriği ve arayüzü tek bir göreve karıştırmadan bunu kendi başına geçmek istedim.

Bu yüzden blogun ilk versiyonu teknik bir iskelet gibi görünüyor: rotalar, yerelleştirme, postlar, etiketler ve yayınlama altyapısı zaten yerinde, görsel sistem değil ve bu sorun değil. Bazen önce çalışan bir proje almak ve ondan sonra sakince nasıl göründüğünü ve hissettirdiğini düşünmek daha yararlıdır.

## Bu blogla neyi test etmek istiyorum

techmeat.dev sadece bir not deposu değil, çalışan bir laboratuvar. Yanında sürekli bir coding ajanı varken geliştirmenin nasıl değiştiğiyle ilgileniyorum: nerede işi hızlandırır, nerede gizli riskler yaratır, nerede sana kendi başına çok daha sonra ulaşacağın bir çözümü görmene yardım eder.

Özellikle üç şey ilgimi tutuyor.

**Süreç.** "Ajan kodu yazdı" değil, ondan önce ve sonra ne olduğu: hangi promptlar işe yaradı, hangi kısıtlamaları koymak zorunda kaldım, hangi kararları insana bırakmak daha iyi.

**Kalite.** AI destekli geliştirme, plan ve review tutmazsan kolayca bir yama akışına dönüşür. Hem başarılı sonuçları hem de ajanın yanıldığı veya problem ifademin yeterince net olmadığı yerleri göstermek istiyorum.

**Tekrarlanabilirlik.** Yaklaşımı bir sonraki projede tekrarlayamıyorsan, o bir süreç değil — tek seferlik bir numaradır. Bu yüzden sadece nihai kodu değil, çalışma şemalarını da yakalayacağım: görev nasıl çerçevelendi, hangi dosyalar ortaya çıktı, hangi araçlar dahildi, kararlar nasıl alındı.

## Sırada ne var

Bir sonraki aşama tasarım. Bu yazının devamı tam olarak onunla ilgili olacak: nasıl yaptım, hangi kararları aldım, ne çıktı. Gerçekte nasıl görüneceğini ise ben bile henüz bilmiyorum.

Şimdilik, kayda geçmesi için, blogun bugün nasıl göründüğünü saklayalım:

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/eo8KNkGzBBM?si=KVKJ1hHw26kDkmtZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Impeccable ile tasarım

Yukarıdaki klibi izlediysen — blogun önce nasıl göründüğünü ve sonradan nasıl göründüğünü zaten gördün demektir.

Tasarımı bilerek ayrı bir faz olarak bıraktım — onu mimari ve içerikle aynı görevde karıştırmamak için. Meslektaşlarım [Impeccable](https://impeccable.style/) skill sistemini önerdiler — varsayılan AI estetiği yerine ajana daha düşünülmüş bir görsel inşa etmesinde yardımcı olur.

Hem basit hem de o kadar basit değil çıktı. Basit — çünkü her şey tek bir prompt'a ve Claude Code ile birkaç soru turuna sığdı. O kadar basit değil — çünkü prompt'un dikkatlice yazılması gerekti ve Claude Code'un soruları pek de kolay sayılmazdı.

Başlangıç prompt'u:

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

Claude Code tasarımı oldukça hızlı güncelledi. Birkaç netleştirici prompt sonrası sonuç beni ikna etti.

## Pencil ile posterler

Sonra — posterler, blog linkleri sosyal medyada paylaşılınca güzel görünsün diye. [Pencil](https://www.pencil.dev/)'ı bağladım (MCP'leri mükemmel) ve Claude Code'dan bir [poster sistemi](https://github.com/itechmeat/techmeat-dev/blob/master/design/posters.pen) inşa edip projeye export etmesini istedim. Küçük elle düzeltmeler gerekti ama genel olarak — hızlı ve temiz çıktı.

Bu kısım için prompt:

```text
I'm adding a `design/` folder to the project for design artifacts. Let's start with post posters.

Posters will live in Pencil — you have the MCP for that.

Build a poster system for every page of the blog; the layouts should be templated. Post posters should be kept separate so adding a new poster per post is easy.

Posters need two sizes — landscape and portrait — to cover both social-network variants.

Make a poster for the first post, fully on-spec and at the correct dimensions. The first poster will become the template, with small per-post variations.

Export every poster, place them correctly inside the project, and wire each one up to the matching page.

The home-page poster should also serve as the default poster for any page that doesn't have its own yet.
```

## Yorumlar, Lighthouse ve hosting

Yorum sistemi bağlamadım — şimdilik gereğini görmüyorum. Bir post hakkında konuşmak istersen — altında PR'a giden bir link var, oradan doğrudan yorum bırakabilirsin.

En sonunda ajandan siteyi Lighthouse'tan geçirip metrikleri sıkılaştırmasını istedim. Rakamlar sonunda %100'de durdu.

Hosting'i en başından beri hem para hem zaman olarak mümkün olan en ucuz seçenek olarak yapmak istedim — Cloudflare Pages. Her şey için sıfır dolar, üstüne dahili analitik. Domain'i de bu arada Cloudflare'den aldım — alışılmış registrar'lardan daha ucuz çıktı.

## Sırada ne var

İşte ilk döngü kapandı: blog çalışıyor, çevrildi, tasarımı, OG posterleri ve utanılmayacak metrikleri var. Sıradaki adım post yazımının otomatikleştirilmesi. Bunu "modern" bir şekilde nasıl yapacağıma dair bir fikrim var — bu konuda ayrı bir post yazacağım.
