---
title: "Dark Factory ve Open Second Brain: otonom geliştirme ve onu ayakta tutan bellek"
description: "İki projem üzerine kısa bir konuşma — Dark Factory ve Open Second Brain. Sunumdan önce orkestratörümden sıfırdan çalışan bir sohbet uygulaması derlemesini istedim ve konuşmaya başladığım anda canlı URL'de deploy edilmiş site çoktan açılıyordu. İçeride: her iki projenin nasıl kurulduğu ve belleğin neden bir ek değil, zorunlu bir koşul olduğu."
pubDate: 2026-05-24
locale: tr
tags: [dark-factory, open-second-brain, startit, demo, hermes, agents]
prNumber: 8
ogImage: "/posters/og/posts/building-techmeat-dev-with-coding-agents.png"
prFileId: 7420b9320543ed09aef926ea3fbdd59cf12b4d4b71659f9e484e96aab2ccff9c
---

![startit sahnesinde, arkamda projeksiyonla](./hero.jpg)

Geçen gün [startit](https://startit.rs/)'e kısa bir konuşma için uğradım — son bir aydır ne yaptığımı anlatmak için. Salondaki kitle alanında uzmandı — kendi AI ajanlarını inşa eden builder'lar, dolayısıyla context window'un ne olduğunu veya bir ajana neden tek bir modelin yetmediğini açıklamak gerekmiyordu. Doğrudan asıl meseleye geçebildim.

Asıl mesele şu anda birbirine bağlı iki projede: **Dark Factory** — otonom geliştirme, ve **[Open Second Brain](https://github.com/itechmeat/open-second-brain)** — bu otonomiyi ayakta tutan bellek.

## Ne gösterdim

Slayt fazla yoktu. Mantık basit:

- Ben bir CoPilot inşa etmiyorum, bir **Dark Factory** inşa ediyorum — ajanların projeyi fikirden sürüme kendi başlarına götürdüğü bir üretim hattı. Ben fikri getiriyorum, sonrasında alt ajanlardan oluşan bir ekip beyin fırtınası, dokümanlar, tasarım, plan, repo ve deploy işlerini yapıyor. Bu sırada ben kendi işime bakıyorum ve sadece review aşamasında devreye giriyorum.
- Böyle bir kurguda çok hızlı bir şekilde **bellek sorununa** toslarsın. Terminal scrollback bellek değildir. Oturumlar arasında bağlamı aktarmak imkansızdır. Reasoning — bir ajanın belirli bir kararı neden aldığı — loglara akıp gidiyor ve kayboluyor.
- Bu yüzden fabrikanın yanında **Open Second Brain**'i büyütmek zorunda kaldım — ajanlar için dosya tabanlı bir bellek katmanı. Obsidian uyumlu bir vault içinde düz Markdown: her ajan okuyabiliyor, her ajan yazabiliyor, her şey insana sıradan metin notları olarak görünüyor.
- Bunun üzerine ilginç şeyler kurulabiliyor artık. Örneğin bir _gözlemsel bellek_ katmanı: alt ajanlar çalışırken benim tercihlerimi fark edip inbox'a koyuyorlar, geceleri ayrı bir geçiş (`dream`) tekrarlayan gözlemleri kurallara dönüştürüyor ve bu kurallar her yeni oturumun başında otomatik olarak yükleniyor. Aynı şeyleri yirmi kez tekrar etmekten kurtuluyorum.

## Demo: ajanların yarım saatte derlediği proje

Sunumdan önce Telegram'da orkestratöre tek bir cümle attım — aşağı yukarı "kullanıcının her repliğine kesinlikle yanlış olduğunu söyleyen bir parodi sohbet uygulaması yap". Sonra konuşmaya hazırlanmaya gittim.

Bir prompt, kısa bir beyin fırtınası — orkestratör birkaç netleştirici soru sorup planı sabitliyor — ve sonrasında pipeline otonom olarak ilerliyor. Sohbete olup bitenle ilgili raporlar düşmeye başlıyor: hangi aşama başlatıldı, hangi alt ajan üstlendi, review ne döndü. Süreç boyunca müdahale etmem gerekmiyor artık.

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/g2m4E5tSpEo" title="Dark Factory: Telegram'da yarım saatte proje" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Bu yarım saatte kaputun altında olanlar:

- product-tech-lead fikri beyin fırtınasına ve spesifikasyona ayırdı;
- mimar stack'i seçti ve genel hatları tarif etti;
- tasarımcı görsel kimliği ve anahtar ekranları topladı;
- paralel olarak GitHub reposu, VPS üzerinde systemd unit'leri, Caddy rotası ve ayrı bir alt alan adı oluşturuldu;
- fullstack mühendisi frontend ve backend'i yazdı, QA testleri koşturdu, devops yeşil deploy'a kadar götürdü.

Bütün bunlar, [önceki yazımda](/tr/posts/how-i-built-the-first-dark-fabric-workflow/) ayrıntılı incelediğim aynı kanban panosu hattı üzerinden gidiyor — aşamalar arası review'larla: 13 kart, her review için en fazla iki tur, producing ve review aşamalarında farklı alt ajanlar.

Sahneye çıktığım anda **[you-absolutely-wrong.techmeat.dev](https://you-absolutely-wrong.techmeat.dev/)** adresinde deploy edilmiş site çoktan açılıyordu. Ne yazarsanız yazın, asistanın mutlak bir özgüvenle yanıldığınızı açıkladığı bir sohbet. İçeride frontend'de React + Vite, backend'de Node.js üzerinde Hono, oturumlar için SQLite, model olarak da OpenCode üzerinden DeepSeek-v4. Bir landing page değil, tam bir proje.

<figure style="max-width: 479px; margin-inline: auto;">

![Çalışır haldeki you-absolutely-wrong.techmeat.dev ekran görüntüsü](./demo.png)

</figure>

## Bundan sonrası

Şu anda fabrikada iki workflow çalışıyor — `new-project` ([önceki yazıda](/tr/posts/how-i-built-the-first-dark-fabric-workflow/) ayrıntılı incelediğim o workflow) ve `new-feature` — bu ikincisi mevcut bir projeyi dokümanlarıyla birlikte alıp bir sonraki özelliği production'a kadar götürüyor. Sırada `validate-idea` — hipotez doğrulama için — ve `bugfix` var: triyaj, repro, fix, doğrulama, ship.

Bu dört döngü baştan sona istikrarlı bir şekilde işlemeye başladığında her şeyi açık kaynak olarak yayımlayacağım. Open Second Brain zaten [açık](https://github.com/itechmeat/open-second-brain) ve herkese açık olarak gelişiyor.

startit'teki arkadaşlara hem sahne için hem de konuşmadan sonraki sorular için teşekkürler — bir kısmı doğrudan benim backlog'uma düştü. Fabrikanın daha sonra nasıl şekillendiğini takip etmek isteyenler için hikayeyi [X](https://x.com/techmeat)'te yürütüyorum.
