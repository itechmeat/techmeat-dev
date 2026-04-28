---
title: "كيف بنيت هذه المدونة بمساعدة وكلاء البرمجة"
description: "قصة إطلاق techmeat.dev: من فكرة عفوية ومجموعة من الـ skills إلى Astro و Cloudflare Pages وجلسة عصف ذهني وأول إصدار من المدونة."
pubDate: 2026-04-28
tags: [ai-coding, astro, meta]
locale: ar
---

كان لدي مدونة من قبل. حركة زيارات معقولة، موضوع واضح، تجربة شخصية حقيقية: كنت أكتب عن الفرونت إند وعن الأشياء التي أمر بها بنفسي. ثم لأسباب ليست بالغة الأهمية توقفت عن متابعتها، وفقدت معها الدومين.

لفترة طويلة بدا لي أن تلك الحكاية انتهت ببساطة. لكني اليوم شعرت من جديد بالرغبة في الكتابة، لكن لم يعد حول الفرونت إند كمهنة، بل حول كيف أبني مشاريع حقيقية بمساعدة وكلاء البرمجة. بدون تجريدات عن مستقبل التطوير، عبر عمليات وأخطاء وقرارات ملموسة.

هكذا ظهر [techmeat.dev](https://techmeat.dev/).

## لماذا بدأت أصلاً

جاءت الفكرة عفوية. كانت لدي tokens غير مستخدمة تتراكم، وعدة فرضيات أردت اختبارها، وقررت أن أركّب مشروعاً صغيراً لكنه حقيقي: مدونة تصبح فيها عملية البناء ذاتها أول مادة منشورة.

سير عملي المعتاد مع الوكلاء أكثر تعقيداً بكثير: عدة مراحل من التخطيط والمراجعة ونقاط التحقق. هنا بسّطته عن قصد. أردت أن أرى إلى أي مدى يمكن المضي إذا حددت الاتجاه بسرعة، وجهّزت السياق، وأعطيت الوكيل الجزء الأكبر من العمل الأولي ليقوم به ذاتياً.

هذه ليست عملية مرجعية، بل نسخة تجريبية. عن المقاربة الأكثر صرامة سأكتب على الأرجح في مقال منفصل.

## التحضير: skills والسياق وقواعد المشروع

أولاً ثبّتت الـ skills اللازمة. لمشروع كهذا الأمر أهم مما يبدو: «اصنع لي مدونة» صياغة ضعيفة جداً للمهمة. الوكيل يحتاج قواعد واضحة: ما التقنيات التي يستخدمها، أين يخزّن المحتوى، كيف يفكر في الـ SEO، كيف يتعامل مع التصميم، وما الذي لا يفعله دون داعٍ. مجموعة البداية مدوّنة في ملف العمل [INIT.md](https://github.com/itechmeat/techmeat-dev/blob/master/docs/INIT.md).

بعد ذلك أنشأت `CLAUDE.md`، وهو الملف الذي يحمل السياق الأساسي للمشروع. كانت المسودة بالروسية، لكن لسياق العمل ترجمتها إلى الإنجليزية فوراً، حتى تكون مفيدة بالقدر نفسه عبر جميع الـ locales والأدوات المختلفة.

```text
This project is empty for now, but I am going to build my blog here. The project will be based on Astro, and posts will be stored as Markdown files. Each article will go through a multi-stage SEO and GEO preparation workflow using the skills available in the project and the geo-optimizer-skill CLI: https://github.com/Auriti-Labs/geo-optimizer-skill, which is already installed.

The blog will be about building projects with AI coding.

The domain has already been chosen and purchased: techmeat.dev.

The project will be hosted on Cloudflare Pages.

The primary language of the blog will be English, but there will also be translations into other languages, at least 10 popular ones. Translation pages must point to the English version of the same article with canonical links.

The project design must be created using the impeccable skill.

All project documentation must be written in English. Draft documentation may be an exception.
```

ثم نسخت `CLAUDE.md` إلى `AGENTS.md`. لا أريد ربط المشروع بوكيل محدد بعينه: إن أكملت غداً التطوير في أداة أخرى، تبقى القواعد الأساسية بجانب الكود.

## الإقلاع الأول: الأساس فقط

لم أطلب من الوكيل أن يبدأ بالصفحات أو التصميم. في البداية كنت أحتاج أساساً تقنياً صحيحاً: مشروع Astro جاهز لـ Cloudflare Pages، ببنية واضحة وبدون مبادرات زائدة.

كان الـ prompt ضيقاً عن قصد:

```text
Let's start developing our blog project. First, use the Astro skills and set up the initial project, preparing it for hosting on Cloudflare Pages. There is no need to build pages or do any additional work right now. Only set up the project.
```

كلما كان الطلب الأول أضيق، قلّت احتمالية أن يبدأ الوكيل في «تحسين» المشروع في موضع لم يُتَّخذ فيه قرار بعد. هذا يوفر الكثير من الأعصاب: كنت أحتاج نقطة انطلاق موثوقة، لا واجهة جميلة.

## عصف ذهني بدلاً من تصميم سابق لأوانه

ثم شغّلت Superpowers وبدأت جلسة عصف ذهني، وطلبت صراحةً عدم الخوض في التصميم. في هذه المرحلة كان يجب أن نقرر مما تتكون المدونة كمنتج، لا كيف تبدو.

كان الـ prompt كالتالي:

```text
Let's brainstorm in Russian about what my blog should consist of. Here's how I currently see it:

- All pages should share a unified design, but we are not discussing the design itself yet, only common blocks and similar structural elements. The header should include the techmeat.dev name and a language switcher. To clarify, the brainstorming result should describe what the blog should have, not how it should look.
- The home page should show previews of the 10 latest posts with links to the full posts. Maybe it should include something else too; suggest options.
- There should be an About page: something like a CV, but in a more blog-like form.
- There should be a Contacts page with links to my social profiles and GitHub.
- Maybe some other pages are needed; suggest options.
- This should be a very simple blog, mostly informational. I expect to publish materials often.
```

استغرق العصف الذهني نحو ساعة. لمشروع بهذا الصغر يبدو ذلك كثيراً، لكن الوقت آتى ثماره: لولاه ما كنت سأخرج بخطة متماسكة ومواصفات معمارية. ساعد الوكيل في تقسيم المدونة إلى صفحات وكتل مشتركة ونموذج لغوي وبنية محتوى.

نتيجة لذلك ظهرت قطعتان داخليتان: [الخطة](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/plans/2026-04-27-blog-v1.md) للإصدار الأول و[المواصفات المعمارية](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/specs/2026-04-27-blog-architecture-design.md).

## تطوير ذاتي ومراجعة وإصلاحات

بعد العصف الذهني، لم يبقَ سوى الموافقة على التوجه وترك الوكيل يعمل. ظهرت معظم البنية الأساسية ذاتياً: المسارات ومحتوى Markdown والـ locales والمكونات وRSS والـ tags والبنية التحتية للترجمات.

لم يخلُ الأمر تماماً من تدخل يدوي. أضفت بضعة prompts تصحيحية: حدّدت قائمة اللغات بدقة، وطلبت إصلاح bugs صغيرة وضبط تفاصيل أغفلها الوكيل في الجولة الأولى.

ثم طلبت من GPT-5.5 أن يقوم بمراجعة الكود وأن يطبّق الإصلاحات على الفور. بالكاد تدخّلت في العملية: عثر الوكيل على عدة تحسينات مفيدة، وطبّقها وأجرى عمليات الفحص. بصراحة، vibe-codetُ هذا الإصدار كاملاً تقريباً، وهو ما أحاول عادةً تجنبه. هنا كان مقبولاً: المشروع صغير، تكلفة الخطأ منخفضة، وكان الهدف بالضبط اختبار حدود هذا النهج.

هنا يتضح جيداً كيف أرى الـ AI coding عموماً. الوكيل ليس زراً سحرياً «اصنع لي منتجاً»، بل منفّذ سريع جداً يحتاج إلى أُطر وسياق ومراجعة دورية. بأطر جيدة يخلّصك من حجم كبير من العمل الخام. وبأُطر ضبابية ينتج عدم اليقين بالسرعة نفسها.

## لماذا أجّلت التصميم

تعمدت ألا أُدرج التصميم في المرحلة الأولى. لدي عملية منفصلة للجانب البصري، وأردت أن أمر بها على حِدة، دون خلط المعمارية والمحتوى والواجهة في مهمة واحدة.

لذلك يبدو الإصدار الأول من المدونة كهيكل تقني: المسارات، الترجمة، المنشورات، الـ tags والبنية التحتية للنشر موجودة بالفعل، أما النظام البصري فلا، وهذا طبيعي. أحياناً يكون من الأنفع أن تحصل أولاً على مشروع يعمل، ثم تفكر بهدوء في كيف يبدو وكيف يُحَسّ.

## ما الذي أريد اختباره من خلال هذه المدونة

techmeat.dev هي مختبر عمل، لا مجرد مستودع للملاحظات. يهمني كيف يتغير التطوير حين يكون بجانبك دائماً وكيل برمجة: أين يسرّع العمل، وأين يخلق مخاطر مخفية، وأين يساعدك على رؤية حل ما كنت ستصل إليه وحدك إلا بعد وقت أطول بكثير.

ثلاثة أشياء بالذات تشدّ انتباهي.

**العملية.** ليس «الوكيل كتب الكود»، بل ما الذي حدث قبل وبعد: أي prompts عملت، وأي قيود اضطررت إلى وضعها، وأي قرارات يُفضَّل تركها للإنسان.

**الجودة.** الـ AI-assisted development يتحول بسهولة إلى تيار من الإصلاحات إذا لم تحافظ على الخطة والمراجعة. أريد أن أُظهر النتائج الموفّقة كذلك المواضع التي أخطأ فيها الوكيل أو التي لم تكن صياغتي للمهمة فيها دقيقة بما يكفي.

**القابلية للتكرار.** إن لم يكن النهج قابلاً للتكرار في المشروع التالي، فهو ليس عملية، بل خدعة عابرة. لذلك سأوثّق ليس الكود النهائي فقط، بل أيضاً مخططات العمل: كيف صيغت المهمة، وأي ملفات ظهرت، وأي أدوات شاركت، وكيف اتُّخذت القرارات.

## ما التالي

المرحلة التالية هي التصميم. تكملة هذا المنشور ستكون عن ذلك بالضبط: كيف أنجزته، وما القرارات التي اتخذتها، وما الذي خرج في النهاية. مع أنّي حتى الآن لا أعرف بنفسي كيف سيبدو فعلياً.

في هذه الأثناء، للسجل، فلنحفظ كيف تبدو المدونة اليوم:

<!-- TODO: Embed YouTube video showcasing the first version of the blog. -->
