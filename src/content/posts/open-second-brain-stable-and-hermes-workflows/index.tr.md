---
title: "Open Second Brain stabil oldu, Dark Factory de bir sonraki katmanını aldı"
description: "Open Second Brain stabil bir sürüme ulaştı, Hermes artık onu yerel bellek olarak kullanabiliyor ve Hermes Workflows manuel playbook'larımı otonom iş grafiklerine dönüştürüyor."
pubDate: 2026-06-16
locale: tr
tags: [open-second-brain, dark-factory, hermes, workflows, agents, memory]
ogImage: "/posters/og/posts/open-second-brain-stable-and-hermes-workflows.png"
prFileId: 0856068b7cacbcdcf2bdbf4ef3b36c4a0781008f88f77c3f67d51ef94774123d
---

Hermes Agent ekosistemine dalmaya devam ediyorum. Mayıs ayında bu hâlâ birbirine bağlı deneyler gibi görünüyordu - bellek, Kanban, Telegram, alt ajanlar, aşamalar arası review. Şimdi ise tablo daha bütünlüklü bir sisteme dönüşmeye başlıyor.

Hedefim aynı: kendi küçük **Dark Factory**'mi kurmak. “Kod yazmaya yardım eden bir ajan” değil, bir fikrin net bir süreçten geçtiği bir fabrika: analiz, planlama, implementasyon, review, testler, deploy ve kararların belleğe yazılması. Tam otonomiye daha yol var, ama bu hedefin bir kısmı şimdiden çalışıyor. Eskiden elle yönlendirmem gereken birçok şey artık gerçekten kendi kendine ilerliyor.

Son haftalarda özellikle iki katman büyüdü: bellek olarak [Open Second Brain](https://github.com/itechmeat/open-second-brain) ve gelecekteki orkestratör olarak [Hermes Workflows](https://github.com/itechmeat/hermes-workflows).

## Open Second Brain artık deney değil

Open Second Brain stabil bir sürüm aldı. Benim için bu önemli bir psikolojik eşik: proje artık “hızlıca bir fikri deneyelim” gibi değil, her gün kullanılabilecek bir araç gibi davranıyor.

Public contract'lar daha az sallanıyor. Hermes, O2B'yi yandaki bir hack olarak değil, native memory provider olarak bağlayabiliyor. Laptop'taki Hermes, VPS'teki Hermes, Claude Code, Codex ve diğer runtime'lar aynı Markdown vault'a bakıp biriken kuralları, tercihleri ve karar izlerini kaybetmeyebiliyor.

Bunun neden önemli olduğunu [OpenSecondBrain'i nasıl geliştirdiğimi anlattığım yazıda](/tr/posts/how-i-built-open-second-brain/) yazmıştım. Kısaca: ajanlarla geliştirme çok hızlı bir bellek problemine çarpıyor. “Modelin son cevabında ne vardı” değil, geçen hafta neye karar verdik, hangi kuralları beş kez tekrar ettim, hangi artifact'ler oluştu, projenin mevcut context'i nerede ve hangi sonuçlar bir sonraki compaction'da kaybolmamalı.

O2B bunu çok pratik çözüyor: Obsidian-compatible vault, plain Markdown, `Brain/`, deterministik CLI/MCP araçları, `dream` pass'leri, staged memory uygulama, rollback, arama, daily kayıtlar, preferences ve pinned context. Güvenmek zorunda olduğum gizli bir SaaS beyni yok. Dosyalar bende.

## Star'lar ve gerçek motivasyon

Plugin yavaş yavaş popülerlik kazanıyor. Yazı anında repository'nin [71 star'ı](https://github.com/itechmeat/open-second-brain) var; binlerce star'a daha çok var.

Ama hedefim “star toplamak” değil. Elbette güzel olur. Star'lar başkalarının projenin canlı olduğunu görmesine yardım ediyor ve repo'ya biraz görünürlük veriyor. O2B sizin için faydalı ya da ilginçse star işe yarar.

Asıl motivasyon başka: Bu plugin'in ana kullanıcısı benim. Önce benim ihtiyaçlarımı çözüyor. Ajanların tercihlerimi hatırlaması, event yazması, sonuçların nereden geldiğini açıklaması ve context'i session'lar arasında taşıması gereken bir Hermes ortamı kuruyorum. Bu senaryoda iyi çalışıyorsa, araç zaten kendini amorti etti.

Gerisi hoş bir yan etki.

## Bağımsız bellek testi

En ilginç sinyal README'den ya da benim self-promotion'ımdan değil, temiz bir Hermes kurulumunda memory plugin'lerini karşılaştıran bağımsız bir geliştiriciden geldi. Ajanına reddit obsidian layout, OpenSecondBrain, Honcho ve OpenViking arasında seçim verdi; Hermes tercih edilen bellek olarak O2B'yi seçti.

Yorum neredeyse reklam gibi, ama ben istemedim:

> So i gave my fresh install on a $1 vps the choice of a reddit obsidian layout, opensecondbrain, honcho and openviking and it chose opensecondbrain as its preferred memory.. nemotron3 ultra free said the quality is outstanding and 80% of what honcho provides. Just local and free. Only thing missing is the neuromancer inference.

Benim için önemli olan “Honcho'nun %80'i” kısmı değil. Bu tür kıyaslar her zaman koşullu: farklı hedefler, farklı mimariler, farklı olgunluk seviyeleri.

Daha önemli olan şu: dışarıdan biri bunu temiz bir ortama kurdu, ajana seçim verdi ve O2B benim teraziyi itmem olmadan yeterince anlaşılır ve faydalı bulundu. Benim Hermes'im için iç bellek olarak başlayan bir proje için bu iyi bir eşik.

## Dark Factory şu anda nerede

Dark Factory'ye bütün olarak bakınca, eskiden en sıkıcı elle yapılan işleri oluşturan parçaları şimdiden otomatikleştirdim.

Telegram'da Hermes'e bir proje fikri verebiliyorum. Netleştirici sorular soruyor, işi aşamalara bölüyor, dokümanlar oluşturuyor, kartları Kanban'da hareket ettiriyor, review'u başka bir profile veriyor, yorumları düzeltiyor, sonucu deploy ediyor ve önemli event'leri belleğe yazıyor. Bu, [ilk Dark Factory workflow'u](/tr/posts/how-i-built-the-first-dark-fabric-workflow/) yazısında ve sonra [Startit](/tr/posts/dark-factory-and-open-second-brain-at-startit/)'te gösterdiğim döngünün aynısı.

Aşağıda aynı deney çizgisinden bir video daha var.

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/J09BbfMpMAw" title="Dark Factory, Open Second Brain ve Hermes Workflows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Bu hâlâ “butona bas ve sonsuza kadar unut” değil. Sonuçları okuyorum, süreci düzeltiyorum, bazen run'ı durduruyorum, bazen görevi geri gönderiyorum. Ama kilit değişim oldu: ajanlar arasında sürekli dispatcher olmayı bırakıyorum. Giderek daha çok rolüm niyeti formüle etmek, birkaç karar almak ve sonucu kontrol etmek.

Tek kişi için bu ciddi bir dikkat tasarrufu.

## Yeni katman: Hermes Workflows

Sıradaki büyük parça aktif geliştirmede: [Hermes Workflows](https://github.com/itechmeat/hermes-workflows). Proje hâlâ genç, ama oyunun kurallarını değiştirmesi gereken parça bu.

Ondan önce workflow'larım Hermes üstünde iyi tarif edilmiş playbook'lara benziyordu: Kanban, cron, profiller, roller, manuel anlaşmalar ve biraz glue. Bu zaten çalışıyordu, ama sürecin bir kısmı hâlâ benim kafamda ve talimatlarda yaşıyordu.

`hermes-workflows` başka bir adım atıyor: workflow bir graf oluyor.

Grafın içinde node'lar var:

- `agent_task` - belirli bir Hermes profili için görev;
- `script` - modele gerek yoksa deterministik shell adımı;
- `condition` - önceki sonuca göre dallanma;
- `human_review` - insan gereken açık nokta;
- `finish` - sonucun teslim edildiği bitiş.

Önemli kısım: bu Hermes'in yerini almaya çalışan ayrı bir engine değil. Workflow, Hermes'in native primitive'lerine compile ediliyor: Kanban, Cron, Profiles, delivery router, skills. Sistem zaten kullandığım yüzeylerden okunabilir kalıyor.

Dark Factory için bu temel. Süreç graf olarak tanımlandığında doğrulanabilir, export edilebilir, yeniden kullanılabilir, schedule edilebilir, node bazında live telemetry izlenebilir, pending approvals görülebilir, retry yapılabilir ve düşüşten sonra trace incelenebilir. Artık “ajana talimatı takip et denildi” değil, executable contract.

## Bu fabrikayı neden otonomiye yaklaştırıyor

Dark Factory'nin ana zayıflığı ajanların kötü kod yazması değil. Hata yapıyorlar elbette, ama review, testler ve constraint'ler bunu yönetiyor. Asıl zayıflık süreç yönetimi.

Süreç uzun bir prompt'ta yaşıyorsa kırılgan. Ajan bir aşamayı atlayabilir, rolleri karıştırabilir, implementasyonun başka bir profil tarafından review edilmesi gerektiğini unutabilir ya da upstream review'dan geçmeden downstream işe başlayabilir.

Graf bunu daha mühendisçe çözüyor. Her node'un input'u, output'u, status'u ve geçiş kuralları var. Review geçmezse downstream uyanmıyor. Script adımı düşerse ajan her şey yolundaymış gibi yapmıyor. İnsan gerekiyorsa workflow tahmin etmek yerine `human_review`'da duruyor.

O2B ve Hermes Workflows burada tek sisteme birleşiyor:

- workflows süreci yürütüyor;
- Hermes görevleri native mekanizmalarla çalıştırıyor;
- Open Second Brain context'i, tercihleri, kararları ve run izlerini saklıyor;
- insan gerçekten önemli olduğu yerde döngüde kalıyor.

Bu artık ayrı AI numaralarından çok bir fabrikaya benziyor.

## Sırada ne var

Yakın hedef `hermes-workflows`'u tam bir demo gösterebileceğim noktaya getirmek: dashboard'da güzel bir graf değil, birkaç ajan aşamasından, review'dan, dallanmalardan, belleğe yazımdan ve sonuç tesliminden geçen gerçek bir run.

Bu stabil çalıştığında Dark Factory, tüm bunlara başlama sebebim olan şekle çok yaklaşacak. Girişte fikir. Süreç grafı. Farklı rollerde birkaç ajan. Session'ları aşan bellek. İnsan dispatcher değil, niyetin ve son kararın sahibi.

En ilginci: Dark Factory kendini inşa etmeye başladı bile. Her gece bir research pass yapıyor: Open Second Brain'i iyileştirmek için yeni fikirler arıyor, yaklaşımları karşılaştırıyor, faydalı pattern'leri çıkarıyor ve Hermes Kanban panosuna görevler koyuyor. Sonra periyodik olarak uygun bir scope'u implementasyona alıyor, PR'a kadar götürüyor ve benim approve'umdan sonra release'e çeviriyor.

Bu release'lerin örneklerini [Open Second Brain GitHub Releases](https://github.com/itechmeat/open-second-brain/releases) sayfasında görebilirsiniz. `v1.12.0`'dan başlayarak release'ler kodda benim katılımım olmadan tamamen Hermes tarafından implemente edildi. Benden sadece oluşturulan PR'ı okumam ve approve etmem istendi.

Biraz büyük konuşma gibi geliyor, ama birkaç ay önce Open Second Brain sadece boş bir repository idi. Şimdi Hermes'in bellek olarak seçebildiği stabil bir plugin.

Bu fabrikayı ne kadar uzağa götürebileceğimi göreceğiz.
