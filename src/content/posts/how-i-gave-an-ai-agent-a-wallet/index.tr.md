---
title: "Yapay zekâ ajanıma cüzdan verdim ve neden hemen bir hafızaya ihtiyaç duydu"
description: "open-second-brain 0.8.0 ve Pay Memory: ajanın pay.sh üzerinden harici API'lere ödeme yapmasına nasıl izin verdim ve neden asıl önemli kısım ödemenin kendisi değil, harcanan her kuruşun net kaydı oldu."
pubDate: 2026-05-10
locale: tr
tags: [pay-memory, agent-payments, pay-sh, solana, second-brain]
ogImage: "/posters/og/posts/how-i-gave-an-ai-agent-a-wallet.png"
prFileId: a30cf6d41f459d7d24590a118064ebc777fab39011cb7c969bdd692d2c80618e
---

Birkaç gün önce [open-second-brain](/tr/posts/how-i-built-open-second-brain/)'i yayınladım - yapay zekâ ajanları için dosya tabanlı bir hafıza katmanı. O zamandan beri aklımı bir fikir kemiriyordu. Ajan VPS'te, kendi takvimine göre, Telegram üzerinden çalışıyorsa - er ya da geç para harcaması gerekecek. API çağrısı satın almak. Bir illüstrasyon üretmek. Ücretli bir arama tetiklemek.

Ödemenin kendisi zaten çözülmüş bir problem. [pay.sh](https://pay.sh), sıradan bir HTTP çağrısını Solana üzerinde USDC mikroödemeleriyle ücretli bir çağrıya sarmalıyor. Ajan `pay` üzerinden curl'ü çalıştırıyor, cüzdan işlemi imzalıyor, karşı taraf bir yanıt döndürüyor. Tamam.

Ama "tamam" hikâyenin yalnızca yarısı.

## Cüzdanla kaos

Şunu hayal edin: ajan bir görev üzerinde çalışıyor, yol boyunca bir avuç karar veriyor, ikisi ücretli çağrılar. Bir saat sonra terminali açıyorsunuz ve scrollback çoktan ekranın dışına uçmuş. Yukarıda bir yerde `pay` çağrıları olmuş, bir yerde tx imzaları gelmiş, bir yerde JSON yanıtları dönmüş.

Ajan bunu neden yaptı? Hangi dayanakla? Ne kadar harcamayı bekliyordu? Gerçekte ne kadar düşüldü? Sonuç nerede?

Ajana özerk bir şey emanet etmek istiyorsanız, "scrollback'i oku" işe yaramaz. Terminal logu yapısal değildir, göreve bağlı değildir, indekslenemez, restart'ı atlatmaz ve Obsidian'da normal bir artefakt olarak açılamaz.

Görevin "ajana ödeme yapmayı öğretmek" değil - "her ödemenin anlamlı bir iz bırakmasını sağlamak" olduğunu oldukça çabuk anladım.

![Bir yapay zekâ ajanı dijital cüzdan tutarken mikroödeme izi birbirine bağlı Markdown makbuz kartlarına akıyor](./image.png)

Bu illüstrasyon, postanın anlattığı şekilde üretildi: `pay.sh` üzerinden, `paysponge/fal` x402 gateway'i ve `fal-ai/fast-sdxl` endpoint'i kullanılarak. Üretim, `64FaukkZDUdFTufXF49H1CrHjDfsmBFqfrUjsAS8XrgP` mainnet cüzdanından **0.01 USDC** tuttu; halka açık Solana işlemi [`5ZYnkabzLvHqEgXNJfKopiRwbGkriHJ2bps2NnkX7HzqQAyTZYjcyJVCTvZwMquyMviv2juyAdbP9P2depHrJxQW`](https://solscan.io/tx/5ZYnkabzLvHqEgXNJfKopiRwbGkriHJ2bps2NnkX7HzqQAyTZYjcyJVCTvZwMquyMviv2juyAdbP9P2depHrJxQW). Request id `019e135a-357b-71f3-8b9d-305e728b05fb`'di ve üretilen asset lokalde `image.png` olarak kaydedildi.

Ve open-second-brain işte tam buraya kusursuzca oturdu.

## Pay Memory

0.8.0 sürümünde OSB yeni bir katman kazandı - **Pay Memory**. Kısacası: para için hafıza.

Her ücretli eylemden sonra vault'ta şu alanları içeren sıradan bir Markdown dosyası beliriyor:

- **neden** ajan ödeme yapmaya karar verdi;
- **hangi servis** çağrıldı;
- **hangi spending policy** geçerliydi ve ne karar verdi (`allowed` / `approval_required` / `denied` / `not_checked`);
- **beklenen maliyet** ve **gerçekten düşülen tutar**;
- **payment proof** - Solscan'de açıp doğrulayabileceğiniz spesifik Solana imzası;
- **sonuç** - çıktıyla birlikte ayrı bir asset note'a giden bağlantı;
- **kim onayladı**, policy bunu gerektirdiyse.

Bu bir SQLite tablosu değil, bir dashboard da değil. Ajan'ın daily log'unu yazdığı klasörle aynı yerde duran düz Markdown. Gözle açabilir, yorum yapabilir, Git'e commit edebilir, sonradan grep'leyebilir veya kanıt olarak gösterebilirsiniz.

OSB burada bir ödeme sistemine dönüşmüyor - cüzdan tutmuyor, işlem imzalamıyor, enforcement yapmıyor. İyi bildiği şeyi yapıyor: dürüst, insan tarafından okunabilir bir hafıza tutuyor. pay.sh ajana ücretli kaynaklara erişim veriyor; Pay Memory insana bir hafta sonra vault'u açıp ne olduğunu sakince anlama imkânı veriyor.

Bu arada, [gerçek bir receipt tam olarak böyle görünüyor](/files/fal-generate-a-no-text-fast-sdxl-illustration-for-the-techmeat-d.md) - yazının en başındaki o illüstrasyonun receipt'i. Ham Markdown, doğrudan vault'tan, hiçbir işlem görmeden. Yukarıda listelenen tüm alanların bulunduğu bir frontmatter ve altında "neden", "policy ne döndürdü" ve "gerçekten ne kadar düşüldü" üzerine insan diliyle yazılmış bir metin.

Second Brain'in içinde şu yolda yaşıyor:

```
AI Wiki/
└── payments/
    └── 2026-05-10/
        └── fal-generate-a-no-text-fast-sdxl-illustration-for-the-techmeat-d.md
```

Sihir yok: tarih → klasör, slug → dosya adı. grep, git diff ve Obsidian'da olağan gezinti için rahat.

## Geri kalanın hepsinden önemli çıkan bir ilke

Taslak implementasyonu gözden geçirirken gözüm hemen bir detaye takıldı: receipt sürekli "Allowed by the configured spending policy" yazıyordu - vault'ta hiçbir policy olmasa bile.

Küçük bir şey gibi duruyor. Aslında tüm amacı öldürüyor.

Pay Memory bir audit katmanıdır. Bir audit katmanı tam olarak dürüst olduğu kadar değerlidir. Receipt gerçeğin yerine güzel bir hikâye anlatmaya başladığı anda her şey çöker. O yüzden kural basit çıktı: `allowed`'u kendinden emin biçimde hatalı loglamaktansa `not_checked` yazmak daha iyi. Policy kontrol edilmediyse - bunu söyle. Policy `denied` döndürdüyse ama bir insan çağrıyı elle geçirdiyse - bunu da söyle.

"Güzel anlatı" cazibesi, bir audit sisteminin baş düşmanıdır. Ve bu muhtemelen günün en önemli dersi - projenin başka kısımlarına da taşımayı planladığım bir ders.

## Üretimde gerçek bir ödeme

Günün sonunda bütün bunları sandbox fixture'larında değil, gerçek parayla denemek gerekiyordu. Yepyeni bir Solana cüzdanına on sent USDC gönderdim ve ajandan Google Places üzerinden Belgrad'da üç kafe bulmasını istedim.

Bir saniye sonra üç gerçek yer döndü - Artist Specialty Coffee, Dusha, DRIP. Tx mainnet'te finalize, $0.001 USDC, bakiye 0.10'dan 0.099'a indi. Solscan'de imza, tıklanabilir.

Ve ardından tüm Pay Memory zinciri devreye girdi: vault'ta gerçek imzayla bir receipt, üç kafeyle ayrı bir asset note, günlük bir ödeme raporu ve her iki dosyaya da bağlantı veren Daily'de kısa bir kayıt. Vault'u Obsidian'da açıp proof'a tıklayabiliyorum, explorer'da gerçek ödemeyi görebiliyorum ve hemen yanında - ajanın bunu neden yaptığına dair net, insan diliyle bir hikâye.

## Tüm bunlar neden

Kendime enterprise compliance ya da blockchain-for-everything kurmaya çalışmıyorum. Mimari aslında utandıracak kadar basit - doğru klasörlerde bir avuç Markdown dosyası.

Ama arkasındaki fikir önemli.

Ajan gittikçe daha özerk çalışıyorsa, hafızasının yalnızca metinsel eylemleri değil, sonuçları olan eylemleri de kapsaması gerekir: dış bir servise yapılan çağrı, harcanan para, üretilen bir asset, istenen bir approval. Ödeme en çarpıcı örnek, çünkü güven sorusu hemen orada karşımıza çıkıyor. Aynı ilkeler bir gönderi yayımlamaya, e-posta göndermeye, deploy'a, bir üretim siparişine, on-chain bir operasyona kolayca aktarılıyor.

Kısa versiyon:

> pay.sh ajana ücretli kaynaklara erişim verir.
> Pay Memory insana bir hafta sonra ajanın bu erişimi neden kullandığını anlama olanağı verir.

Ajan sadece para harcıyorsa - bu bir risktir. Ajan para harcayıp dürüst, bağlantılı, insan tarafından okunabilir bir iz bırakıyorsa - bu artık yavaş yavaş güvenmeye başlanabilecek bir workflow'dur.

Pay Memory, [open-second-brain 0.8.0](https://github.com/itechmeat/open-second-brain/releases/tag/v0.8.0) kapsamında çıktı.
