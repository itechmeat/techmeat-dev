---
title: "İlk Dark Factory workflow'unu nasıl kurdum"
description: "Bir VPS üzerinde Hermes, 13 görevden oluşan bir kanban grafiği, farklı profiller üzerinde aşamalar arası incelemeler, Telegram üzerinden bir insanla mini-brainstorm ve sonunda bare-HTML deploy. İlk çalışan Dark Factory yığını — birkaç hata ayıklama turundan sağ çıktı ve şimdi tüm aşamaları elle yönlendirmeye gerek kalmadan geçiyor."
pubDate: 2026-05-17
locale: tr
tags: [dark-factory, hermes, kanban, workflow, claude-code, codex]
ogImage: "/posters/og/posts/how-i-built-the-first-dark-fabric-workflow.png"
---

[Önceki yazıda](/tr/posts/how-i-built-open-second-brain/) OpenSecondBrain'i — yani AI ajanlarının kullandığı bellek katmanını — anlatmıştım. Bellek hikâyenin yalnızca yarısı. Diğer yarısı sürecin kendisi: kim ne yapıyor, kim kimi denetliyor, neye "bitti" denir ve tüm bunlar chat'te tek bir cümleyle nasıl başlatılır.

Bugün ilk çalışan sürümü devreye aldım: `new-project` workflow'u. Bir fikri Telegram'a getiriyorum, çıkışta belgeleri, tasarımı, planı ve gerçek bir kamuya açık sayfası olan tam kurulmuş bir proje elime geçiyor.

## Dışarıdan nasıl görünüyor

Bir fikir getiriyorum. Örneğin: "küçük stüdyom için tek sayfalık bir landing istiyorum".

Sonra hedefli kısa soru turlarına cevap veriyorum. Önce brainstorm: hedef kitle kim, neyi vurgulamak istiyorum, hangi stack'i tercih ederim, nasıl bir his olmalı. Ardından her aşama boyunca 4–5 sorudan oluşan birkaç kısa oturum daha: mevcut belgenin yazarının kafadan uydurmamak için ihtiyaç duyduğu şey neyse.

Geri kalanını fabrika yapıyor. Bu sırada ben kendi işlerimle ilgilenebiliyorum.

## Canlı kartlarıyla bir kanban

Tüm bunun en görünür kısmı kanban panosu. Nihai plana "evet" dediğimde, orkestratör tek bir geçişte üzerine 13 kart oluşturuyor, her iş aşaması için bir tane. Sonrası gözlerimin önünde oluyor.

Kartlar kendi başlarına hareket ediyor. İlki yanıyor, `running` işareti alıyor, ve subagent'lardan birinin onu üstlendiğini anlıyorum. Birkaç dakika sonra kart `done`'a kayıyor ve bir sonraki yanıyor. Her üretim aşamasının arasında her zaman bir inceleme kartı duruyor ve onu farklı bir subagent'ın üstlenmesi gerekiyor: belgeyi yazan asla kendi işini incelemiyor.

Bazen inceleme geçmiyor. O zaman inceleme kartı `blocked`'a geçiyor, yanında aynı yazar için yeni bir fix-task beliriyor ve tüm downstream usulca bekliyor. Yazar düzeltip fix-task'ı kapattığında inceleme uyanıp artefakt'ı tekrar okuyor. Geçebilir. Geri yollayabilir. En fazla iki tur, sonra bana eskale ediliyor.

Sonunda panoya neredeyse bir kargo takibi gibi bakıyorum: şimdi monte ediyorlar, şimdi paketliyorlar, şimdi gönderiyorlar. Yalnızca bu bir kurye değil — projemin farklı parçaları üzerinde aynı anda çalışan birkaç subagent.

## Sonunda elime ne geçiyor

Sürecin sonunda elimde:

- fikrin özünü yakalayan yapılandırılmış bir `about.md`;
- işlevsel ve işlevsel olmayan gereksinimleri içeren `specs.md`;
- teknik çerçeveyi ortaya koyan `architecture.md`;
- MVP'ye kadar fazlı bir yol haritasıyla `plan.md`;
- görsel kimlik, token'lar, tipografi ve anahtar ekranlarıyla `DESIGN.md`;
- tüm bu dosyaları içeren projeye özel bir GitHub deposu;
- `<slug>.techmeat.dev` alt alanında deploy edilmiş, şimdilik `about.md`'yi yansıtan mümkün olan en sade HTML'i sunan kamuya açık bir sayfa. Bu, projenin var olduğunun ve erişilebilir olduğunun sözüdür.

Asıl özelliğin uygulanması başka bir workflow'un, sonrakinin, işi. Bu ilkinin amacı, bir fikri "her şey tarif edildi, her şey üzerinde anlaşıldı, projenin kendi adresi var" durumuna getirmek. Sonrasında fabrika gerçek geliştirme için zaten kiralanabilir.

## Zor olan kısım

Birkaç hata ayıklama turu yaptım. Her seferinde kendi komik bug'ı çıkıyordu: bir subagent kendi çalışma dizinini toparlamaya çalışıp kendi shell oturumunu öldürüyordu; ya da aşamanın ortasında, uygulama bu workflow'a girmediği ve bir sonrakinin işi olduğu halde, özelliği uygulamaya başlıyordu. Turlar arasında skill'i yamayıp yeniden başlatıyordum. Şu anki haliyle döngü baştan sona temiz çalışıyor.

## Yol boyunca bellek de büyüdü

Önceki yazıda [OpenSecondBrain](https://github.com/itechmeat/open-second-brain)'in hikâyenin diğer yarısı olduğunu söz vermiştim. O zamandan beri bu yarı epey olgunlaştı ve fabrikanın kendisi için bu önemli.

Ana değişiklik: OpenSecondBrain'de artık bir "gözlemsel bellek" katmanı var. Eskiden ona elle, günlük gibi yazardım. Şimdi subagent'lar tercihlerimi geçerken yakalıyor ("commit'ler emir kipinde yazılır" ya da "iç kısaltmaları açıklamadan kullanma" gibi şeyler), notları bir gelen kutusuna bırakıyor, ve günde bir kez Hermes agent `dream`'i çalıştırıyor — tekrarlayan gözlemleri kurallara terfi ettiren bir arka plan geçişi. Bu kurallar her bir sonraki oturumun başında otomatik olarak yükleniyor ve artık aynı şeyi yirmi kez tekrarlamak zorunda kalmıyorum.

Buna ek olarak: tüm OpenSecondBrain bilgi tabanı üzerinde tam metin arama, her `dream` geçişi öncesi backup ve rollback, her ücretli işlemi kaydeden ayrı bir katman (ne ödendi, neden, neye bağlı) ve bir agent'ın diğerinin kurallarını yanlışlıkla ezmesine karşı makine düzeyinde korunma. Tüm bunlar fabrikayı mümkün kılan şey: bir subagent `DESIGN.md` yazdığında, tipografi ve arayüz hakkındaki birikmiş tercihlerimi zaten görüyor. Bir kez chat'te düşürdüm, OpenSecondBrain onları sabitledi, ve şimdi her yeni projeye hatırlatma olmadan onlarla birlikte yolculuk ediyorlar.

## Sırada ne var

`new-project` yalnızca bootstrap. Sırada `new-feature` var — mevcut bir projeyi belgeleriyle birlikte alıp bir sonraki özelliği production'a kadar götüren bir workflow. Ve üçüncüsü, `bugfix`: triyaj, repro, fix, doğrulama, ship. Bu üç playbook birlikte, bir kişilik Dark Factory'imin sürümü: bir fikir veya bir bug raporu getiriyorum, çıkışta çalışan bir özellik oluyor.

Tam fabrikaya kadar yol hâlâ önümüzde. Ama ilk parça kurulu ve stabil bir şekilde çalışıyor.

Tüm bunu opensource olarak yayınlamak için henüz erken: bu aşamada bu daha çok bir araştırma, bitmiş bir ürün değil. Tam proje inşa süreci güvenilir biçimde çalışmaya başladığında her şeyi açacağım. Beni [X](https://x.com/techmeat)'te takip edin.
