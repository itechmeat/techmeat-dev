---
title: "OpenSecondBrain'i Nasıl Kurdum"
description: "open-second-brain'in hikayesi: bir VPS üzerinde Hermes, Obsidian, MCP, CLI ve birkaç agent çalışma zamanının AI agentları için küçük bir dosya tabanlı belleğe nasıl dönüştüğü."
pubDate: 2026-05-09
tags: [ai-coding, bun]
locale: tr
---

Bir süredir çeşitli AI araçlarını aktif olarak kullanıyorum, ama bir noktada şunu anladım: bu araçları sadece kullanmıyorum, neredeyse tamamen agentlara ve AI ile ilgili her şeye "sarılmış" durumdayım.

Birkaç aydır agentlar benim workflow'larıma göre kod yazıyor: planlama, uygulama, review, düzeltmeler, yeniden kontrol. Bu işe yarıyor, ama sürecin tuhaf bir manuel kuyruğu var. Kodu agent yazsa bile, görevleri aşamalar arasında taşımak, bağlamı aktarmak, kuralları hatırlatmak, kontrolleri başlatmak ve bir sonraki çalışanın neler olduğunu anlamasını sağlamak yine bana kalıyor.

Tekrarlanan işler fazla arttı. Bu yüzden bir sonraki doğal adım yeni bir özellik değil, workflow'nun kendisinin otomatikleşmesiydi.

Böylece [OpenSecondBrain](https://github.com/itechmeat/open-second-brain) projesi ortaya çıktı — agentlara ne yaptığımızı, neden yaptığımızı ve hangi kararların zaten alındığını hatırlayabilecekleri normal bir bellek vermeye çalışan bir deney.

## Manuel workflow'lardan Dark Fabric'e

İlk yazımda, bu blogu kodlama agentlarıyla nasıl kurduğumu anlattım. Orada workflow bilerek basitti: bağlamı ver, Astro projesini derle, tasarımı geçir, posterları ekle, sonucu kontrol et.

Ama benim normal sürecim daha karmaşık. Orada roller var, ara incelemeler, farklı görev türleri için ayrı agentlar ve her adımda kalite kontrolü. Bu tür görevler çoğaldığında, insan bir dispatchere dönüşüyor: bağlamı şuraya taşı, bunu kontrol etmesini iste, bir sonrakine öncekinin çıktısını ver, kararı kaydetmeyi unutma.

Daha sıkı bir modele ulaşmak istiyordum; gittikçe daha sık duyulan bir kavram olan Dark Fabric'e benzer bir şeye: girişte bir özellik fikri, çıkışta özellik implemente edilmiş, test edilmiş ve deploy edilmiş. "Agent bir kod parçası yazdı" değil, işi aşamalara bölmeyi ve süreçten geçirmeyi bilen bir fabrika.

Tam teşekküllü Dark Fabric'e daha çok var. Ama ilk pratik adım atıldı: bir VPS üzerinde çalışan Hermes, farklı görevler için agentlar, yetenekler, Telegram arayüzü ve OmniRoute üzerinden ucuz model yönlendirmesi.

Ve neredeyse hemen bu fabrikanın ikinci zorunlu parçası ortaya çıktı: agentların belleğe ihtiyacı var.

## Agent neden Second Brain'e ihtiyaç duyar

Agent tek bir oturum çalışıyorsa, bağlamı sadece prompt'a koymak yeterli. Agent haftalarca bir proje üzerinde çalışıyorsa, bu yetmez.

Bilmesi gerekenler:

- projede hangi kurallar kabul edilmiş;
- hangi kararlar tartışılmış ve neden tam olarak onlar seçilmiş;
- araştırmalar sırasında hangi gerçekler ortaya çıkmış;
- hangi artefaktlar zaten oluşturulmuş;
- çalışmada hangi agentlar yer almış;
- insan bilgi tabanı nerede, agent hizmet alanı nerede.

Ve en önemlisi — bu sadece "model belleğine" bağlı olmamalı. Basit, doğrulanabilir, dosya tabanlı, elle açılabilir, Obsidian'da okunabilir, senkronize edilebilir, kısmen commit edilebilir veya hiç commit edilmeyebilen bir bilgi sistemine ihtiyacım var.

Bu yüzden open-second-brain başından beri "bellekli bir chatbot" olmadı; Markdown vault etrafında küçük bir altyapı oldu.

## Neden Obsidian ve Markdown

Obsidian uyumlu vault seçimi neredeyse açıktı.

Birincisi, bunlar sıradan Markdown dosyaları. Hiçbir sihir, kapalı veritabanı veya belirli bir servise bağımlılık yok. Agent bir şey yazdıysa, dosyayı açıp sonucu görebilirim.

İkincisi, Obsidian zaten Second Brain'in insan kısmını iyi çözüyor: notlar, wikilinkler, Daily, manuel navigasyon, graf, arama. Alışık olduğum bir araç varken bilgi için ayrı bir arayüz yapmanın anlamı yoktu.

Üçüncüsü, agentların tüm Obsidian'a ihtiyacı yok. Onların ihtiyacı olan şey deterministik işlemler: hizmet yapısı oluşturmak, günlük log'a olay eklemek, sayfa indeksi oluşturmak, vault sağlığını kontrol etmek, yapılandırmayı sırlar olmadan dışa aktarmak. Tüm bunlar CLI ve MCP üzerinden yapılabilir; dosya işlemleri hakkında modelin "düşünmesini" gerektirmeyen yerlerde kesin komut çalıştırmak daha iyi.

Şu an open-second-brain vault içinde `AI Wiki/` agent alanı oluşturuyor, `Daily/*.md` içinde günlük loglar tutuyor, Markdown indeksini güncelleyebiliyor, yapılandırmayı kontrol ediyor ve `## Raw events` hizmet bölümünün üzerindeki insan notlarına dokunmuyor.

## Boş bir depo verdim — agent mimariyi seçti

En ilginç olanı: tüm bunları klasik bir kütüphane API'si olarak tasarlamadım. Agent'a popüler implementasyonlara linkler verdim, boş bir depo ve bir görev: öncelikle Hermes için, ama diğer agentların da kullanabilmesi için evrensel bir eklenti yap.

İlk commit tamamen belgeseldi: README ve proje bootstrapping 6 Mayıs'ta. Sonra agent hızla CLI temelini oluşturdu, `o2b` komutu, init/doctor, vault primitives ve indeks. Aynı gün MCP sunucusu ortaya çıktı — önemli bir katman, çünkü MCP üzerinden farklı runtime'lar komut satırını manuel olarak parse etmeden aynı araçları alabilir.

İlk sürümler çok pratikti: Hermes eklentiyi kurabilsin, vault'u başlatsın, durumu kontrol etsin ve olayları yazsın. Kağıt üzerinde mükemmel bir mimari değil, çalışan bir agent için çalışan minimum bellek.

Daha sonra proje entegrasyon baskısıyla değişmeye başladı.

## Hermes'ten evrensel eklentiye

Hermes ana runtime olarak kaldı. Proje onun için tasarlandı: eklentiyi kur, vault'u göster, agent'a araçları ver ve önemli olayları Second Brain'e yazmasını sağla.

Ama oldukça hızlı anlaşıldı ki sadece Hermes'e bağlanmak yanlış. Elimde zaten farklı agentlar ve farklı ortamlar var: Claude Code, Codex, OpenClaw. Second Brain ortak bir bellek olacaksa, tek bir istemcide yaşayamaz.

Böylece projede birkaç runtime için adaptörler ve manifestler ortaya çıktı:

- Hermes ana kurulum senaryosu olarak;
- Claude Code marketplace manifesti ve MCP üzerinden;
- Codex kendi marketplace manifesti ve MCP üzerinden;
- OpenClaw önce JS adaptörü ile, sonra tam teşekküllü native plugin girişiyle;
- gelecekte ortaya çıkacak runtime'lar için generic MCP sözleşmesi.

Bu önemli bir mimari karar: çekirdek bir tane olmalı, giriş noktaları birden fazla olabilir. Agentların nerede gerçeğin olduğunu tartışması gerekmez. Gerçek — vault'ta ve ortak işlem kümesindedir.

## Yolda neler düzeltilmek zorunda kaldı

open-second-brain çok hızlı gelişti: 6-9 Mayıs arasında proje README'den `0.7.0` sürümüne kadar gitti. Ve neredeyse her sürüm "kozmetik" değil, gerçek bir entegrasyon problemine tepkiydi.

Örneğin, OpenClaw önce native plugin uyumluluğu aldı, ama runtime beklenenden daha katı çıktı. `name`'i tool objelerinin içine eklemek, `register()`'ı senkron yapmak ve sonra OpenClaw eklentisini `child_process` olmadan saf JavaScript'e yeniden yazmak gerekti, çünkü güvenlik tarayıcısı subprocess'i engelliyordu.

Bir sonraki büyük konu — identity. Günlükte sadece `@agent` yazıyorsa, böyle bir log neredeyse işe yaramaz. Bu yüzden `0.6.0`'da agent isimleriyle bir workflow ortaya çıktı: `o2b init --agent-name`, `AI Wiki/identity/agents.md`'de kayıt ve Daily kayıtlarının placeholder değil normal `@agent-name` aldığının kontrolü.

Sonra timezone, yanlış vault'a yazma koruması, Claude ve Codex için marketplace manifestleri, MCP için otomatik talimatlar, boş argüman normalizasyonu, kurulum akışı kontrolü, multi-agent registry eklendi. Bunlar kahramanca bir ürün özelliği gibi duymuyor, ama tam olarak bu tür detaylar bir oyuncağı sunucuda çalışmaya bırakılabilen bir araçtan ayırır.

## Sürüm 0.7.0: TypeScript ve Bun üzerinde tek çekirdek

En büyük değişiklik `0.7.0`'da oldu: proje tek bir TypeScript çekirdeğine, Bun üzerine taşındı.

Bundan önce depoda paralel mantık vardı: CLI/MCP için Python implementasyonu, OpenClaw için JavaScript kısmı, Hermes shim. Böyle bir düzen hızlıca drift etmeye başlıyor. Bir yerde hata düzelttin — diğer yerde düzelttiğin garanti değil. Python'da timezone ekledin — JS'de tekrarlamayı unutma.

`0.7.0`'da agent tekrarı kaldırdı: Hermes, Claude Code, Codex ve OpenClaw artık `src/core/`'daki ortak modülleri tüketiyor. CLI `src/cli/`'de yaşıyor, MCP `src/mcp/`'de, OpenClaw girişi TypeScript'ten `bun build` ile JS bundle olarak derleniyor.

Bu arada normal bir test tabanı da ortaya çıktı: 176 test kassistli `bun:test`, Python shim testleri, 12 süreçte concurrent append-event testi, bundle tazelik kontrolü ve manifestlerde versiyon senkronizasyonu kontrolü.

Bu tam olarak agent workflow'sunun avantajının göründüğü an. Bir insanın aynı kodu runtime'lar arasında elle taşıması ve testleri yeniden yazması hoşuna gitmez. Agent için — bu normal, net bir hedef, kısıtlamalar ve sonuç kontrolü verildiğinde.

## VPS'te bu nasıl yaşıyor

Tüm bu hikaye ayda yaklaşık 8 dolara normal bir VPS'te dönüyor. Orada Hermes de yaşıyor, orada geliştirme yapılabiliyor, orada AI abonelikleri ve OmniRoute üzerinden yönlendirme yönetiliyor.

Benim için bu deneyin önemli bir parçası. AI destekli workflow'nun ayrı pahalı bir altyapı gerektirmesini istemiyorum. Bir sunucu, tarayıcı, agent'a arayüz olarak Telegram, yanında git depoları ve modellere ucuz erişim yeterli.

Oldukça tuhaf ama çalışan bir tablo çıkıyor: telefondan Telegram'da agent'a yazabiliyorum, o VPS'te görevi çözüyor, depoya giriyor, gereken yetenekleri kullanıyor, artefakt oluşturuyor, kontrolleri çalıştırıyor ve önemli olayı Second Brain'e yazıyor.

Bu henüz Dark Fabric değil. Ama artık sadece "modelle sohbet" de değil.

## Ne ortaya çıktı

Bu taslak sırasında open-second-brain — agent geliştirme için küçük ama zaten kullanışlı bir bellek katmanı.

Yapabildikleri:

- agent çalışması için Obsidian uyumlu vault başlatmak;
- `AI Wiki/` ve hizmet sayfaları oluşturmak;
- günlük olayları Markdown olarak yazmak;
- agent identity'lerini kaydetmek;
- sunucu zamanı yerine kullanıcı timezone'unu hesaba katmak;
- vault, config ve runtime manifestlerinin sağlığını kontrol etmek;
- yapılandırmayı gizli değerleri sansürleyerek dışa aktarmak;
- CLI, MCP ve runtime adaptörleri üzerinden çalışmak;
- Hermes, Claude Code, Codex ve OpenClaw'ı tek bir depodan desteklemek.

En değerli olanı — komut listesi değil. Değerli olan — agentların ortak bir bellek protokolü ortaya çıktı: dayanıklı bir şey olduğunda — kod, düzeltme, yapılandırma, içerik, araştırma sonucu, tasarım kararı — bunu gelecekteki-ben ve gelecekteki-agent'ın daha sonra bulabileceği şekilde kaydetmek gerekiyor.

## Sırada ne var

En yakın hedef — Hermes + open-second-brain bağlamını, agentın sadece olayları yazmadığı, ama planlama ve review'da biriken belleği gerçekten kullandığı bir duruma getirmek.

Daha sonra istenenler:

- Daily logları wiki sayfalarıyla daha iyi bağlamak;
- proje geçmişi üzerinde daha kullanışlı arama ve özetler eklemek;
- Hermes'in VPS'te tam olarak nasıl çalıştığını ve Telegram üzerinden iletişimin nasıl kurulduğunu ayrı bir yazıda anlatmak;
- mevcut workflow'ları daha otonom bir Dark Fabric'e dönüştürmek;
- farklı agentların bir vault'u sorunsuz paylaşabileceğini ve birbirlerinin bağlamını bozmayacağını kontrol etmek.

Şimdilik ana sonuç basit: agentların sadece modele ve depoya erişimi yetmez. Onlara kararların, gerçeklerin ve olayların sürecin kalıcı bir parçası haline geldiği bir ortam lazım.

[open-second-brain](https://github.com/itechmeat/open-second-brain) — bu yönde attığım ilk çalışan adım.

## Bu yazı nasıl yazıldı

Özür dilerim, ama bu yazı da aynı Hermes agentı tarafından yazıldı. Sadece bu paragraf ve [Facebook'taki gönderim](https://www.facebook.com/reel/1355271143340726/) elle yazıldı. Agent'a sadece blogumu normal bir proje olarak klonlamasını, commit geçmişine bakmasını ve Facebook gönderisini temel almasını söyledim. Ve elbette yayınlamadan önce metni yeniden okuyup düzelttim. Ruh vermediğimi söylemeyin, ruhumu agent'a koyuyorum.
