---
title: "أصبح Open Second Brain مستقراً، وحصلت Dark Factory على طبقتها التالية"
description: "وصل Open Second Brain إلى نسخة مستقرة، وأصبح Hermes قادراً على استخدامه كذاكرة أصلية، بينما يحول Hermes Workflows كتيبات العمل اليدوية إلى رسوم عمل ذاتية."
pubDate: 2026-06-16
locale: ar
tags: [open-second-brain, dark-factory, hermes, workflows, agents, memory]
ogImage: "/posters/og/posts/open-second-brain-stable-and-hermes-workflows.png"
---

ما زلت أغوص أكثر في منظومة Hermes Agent. في مايو كان الأمر يبدو كسلسلة تجارب مترابطة: ذاكرة، Kanban، Telegram، وكلاء فرعيون، ومراجعات بين المراحل. الآن بدأت الصورة تتحول إلى نظام أكثر تماسكاً.

الهدف لم يتغير: بناء **Dark Factory** صغيرة خاصة بي. ليس “وكيل يساعد في كتابة الكود”، بل مصنع تمر فيه الفكرة عبر عملية واضحة: تحليل، تخطيط، تنفيذ، مراجعة، اختبارات، نشر، وتسجيل القرارات في الذاكرة. الطريق إلى الاستقلالية الكاملة ما زال طويلاً، لكن جزءاً من الهدف تحقق بالفعل. كثير مما كان يحتاج إلى تنسيق يدوي مني بدأ يتحرك وحده.

خلال الأسابيع الأخيرة نمت طبقتان بالذات: [Open Second Brain](https://github.com/itechmeat/open-second-brain) كطبقة ذاكرة، و[Hermes Workflows](https://github.com/itechmeat/hermes-workflows) كمنسق مستقبلي لسير العمل.

## لم يعد Open Second Brain مجرد تجربة

حصل Open Second Brain على نسخة مستقرة. بالنسبة لي هذه عتبة نفسية مهمة: لم يعد المشروع يبدو كفكرة نجربها بسرعة، بل كأداة يمكن استخدامها كل يوم.

العقود العامة أصبحت أقل اهتزازاً. يستطيع Hermes وصل O2B كـ memory provider أصلي، لا كحل جانبي مؤقت. يمكن لـ Hermes على الحاسوب، وHermes على VPS، وClaude Code، وCodex، وغيرها من runtimes أن تنظر إلى نفس Markdown vault بدون أن تفقد القواعد المتراكمة والتفضيلات وآثار القرارات.

كتبت سابقاً لماذا هذا مهم في مقال [بناء OpenSecondBrain](/ar/posts/how-i-built-open-second-brain/). باختصار: تطوير البرمجيات بالوكلاء يصطدم بسرعة بمشكلة الذاكرة. ليس “ماذا كان في آخر رد من النموذج”، بل ماذا قررنا قبل أسبوع، وما القواعد التي كررتها خمس مرات، وما artifacts الموجودة، وأين يعيش context المشروع، وما الاستنتاجات التي لا يجب أن تضيع في compaction التالي.

يعالج O2B هذا بطريقة عملية جداً: vault متوافق مع Obsidian، وMarkdown عادي، و`Brain/`، وأدوات CLI/MCP حتمية، ومرات `dream`، وتطبيق مرحلي لتغييرات الذاكرة، وrollback، وبحث، وملاحظات يومية، وpreferences، وpinned context. لا يوجد “دماغ SaaS” مخفي يجب الوثوق به. الملفات عندي.

## النجوم والدافع الحقيقي

يكتسب plugin شعبية تدريجياً. وقت كتابة هذا المقال، لدى المستودع [71 نجمة](https://github.com/itechmeat/open-second-brain)، وما زال بعيداً عن الآلاف.

لكن هدفي ليس “جمع النجوم”. سيكون ذلك لطيفاً طبعاً. النجوم تساعد الآخرين على رؤية أن المشروع حي، وتعطي المستودع بعض الظهور. إذا كان O2B مفيداً أو مثيراً للاهتمام لك، فالنجمة مفيدة.

الدافع الأساسي مختلف: أنا المستخدم الرئيسي لهذا plugin. هو يحل مشاكلي أولاً. أبني بيئة Hermes يجب فيها على الوكلاء تذكر تفضيلاتي، وكتابة الأحداث، وشرح مصدر الاستنتاجات، ونقل context بين الجلسات. إذا عملت الأداة جيداً في هذا السيناريو، فقد أدت وظيفتها.

كل ما عدا ذلك أثر جانبي مفيد.

## اختبار ذاكرة مستقل

أكثر إشارة مثيرة لم تأت من README ولا من ترويجي الشخصي، بل من مطور مستقل قارن إضافات الذاكرة على تثبيت Hermes جديد. أعطى الوكيل خياراً بين reddit obsidian layout وOpenSecondBrain وHoncho وOpenViking، فاختار Hermes O2B كذاكرته المفضلة.

التعليق يبدو تقريباً كإعلان، مع أنني لم أطلبه:

> So i gave my fresh install on a $1 vps the choice of a reddit obsidian layout, opensecondbrain, honcho and openviking and it chose opensecondbrain as its preferred memory.. nemotron3 ultra free said the quality is outstanding and 80% of what honcho provides. Just local and free. Only thing missing is the neuromancer inference.

ليست عبارة “80% من Honcho” هي الأهم عندي. مثل هذه المقارنات تقريبية دائماً: أهداف مختلفة، معماريات مختلفة، ومستوى نضج مختلف.

الأهم أن شخصاً خارجياً وضعه في بيئة نظيفة، وأعطى الوكيل حرية الاختيار، وكان O2B واضحاً ومفيداً بما يكفي ليتم اختياره بدون تدخلي. لمشروع بدأ كذاكرة داخلية لـ Hermes عندي، هذه محطة جيدة.

## أين وصلت Dark Factory الآن

إذا نظرت إلى Dark Factory ككل، فقد أتمتت بالفعل أجزاء كانت سابقاً أكثر العمل اليدوي مللاً.

أستطيع أن أعطي Hermes فكرة مشروع في Telegram. يطرح أسئلة توضيحية، يقسم العمل إلى مراحل، ينشئ الوثائق، يحرك البطاقات في Kanban، يرسل المراجعة إلى profile آخر، يصلح الملاحظات، ينشر النتيجة، ويكتب الأحداث المهمة في الذاكرة. هذه هي نفس الدورة التي عرضتها في مقال [أول workflow لـ Dark Factory](/ar/posts/how-i-built-the-first-dark-fabric-workflow/) ثم في [Startit](/ar/posts/dark-factory-and-open-second-brain-at-startit/).

فيما يلي فيديو آخر من نفس خط التجارب.

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/J09BbfMpMAw" title="Dark Factory وOpen Second Brain وHermes Workflows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

هذا لا يعني بعد “اضغط الزر وانسَ الأمر إلى الأبد”. ما زلت أقرأ النتائج، وأعدل العملية، وأوقف run أحياناً، وأعيد مهمة إلى الخلف أحياناً. لكن التحول الأساسي حدث: لم أعد الموزع الدائم بين الوكلاء. دوري أصبح أكثر فأكثر صياغة النية، واتخاذ بعض القرارات، وفحص النتيجة.

بالنسبة لشخص واحد، هذا يوفر قدراً واضحاً من الانتباه.

## الطبقة الجديدة: Hermes Workflows

القطعة الكبيرة التالية قيد التطوير النشط: [Hermes Workflows](https://github.com/itechmeat/hermes-workflows). المشروع ما زال شاباً، لكنه بالضبط الجزء الذي يجب أن يغير قواعد اللعبة.

قبل ذلك، كانت workflow الخاصة بي أقرب إلى playbooks موصوفة جيداً فوق Hermes: Kanban، وcron، وprofiles، وroles، واتفاقات يدوية، وبعض glue. كان هذا يعمل، لكن جزءاً من العملية ظل يعيش في رأسي وفي التعليمات.

يقوم `hermes-workflows` بخطوة مختلفة: تصبح workflow رسماً بيانياً.

داخل الرسم توجد عقد:

- `agent_task` - مهمة لـ Hermes profile محدد؛
- `script` - خطوة shell حتمية عندما لا يكون النموذج ضرورياً؛
- `condition` - تفرع بناءً على النتيجة السابقة؛
- `human_review` - نقطة صريحة تحتاج إلى إنسان؛
- `finish` - نهاية مع تسليم النتيجة.

الجزء المهم: هذا ليس محركاً منفصلاً يحاول استبدال Hermes. يتم compile للـ workflow إلى primitives أصلية في Hermes: Kanban، وCron، وProfiles، وdelivery router، وskills. يبقى النظام قابلاً للقراءة عبر نفس الواجهات التي أستخدمها أصلاً.

بالنسبة لـ Dark Factory هذا جوهري. عندما توصف العملية كـ graph، يمكن validate لها، وexport، وإعادة استخدامها، وتشغيلها بجدول، ومشاهدة live telemetry للعقد، ورؤية pending approvals، وتنفيذ retry، وتحليل trace بعد الفشل. لم يعد الأمر “قيل للوكيل أن يتبع التعليمات”، بل عقداً قابلاً للتنفيذ.

## لماذا يقرب هذا المصنع من الاستقلالية

الضعف الرئيسي في Dark Factory ليس أن الوكلاء يكتبون كوداً سيئاً. هم يخطئون طبعاً، لكن المراجعات والاختبارات والقيود تعالج ذلك. الضعف الرئيسي هو إدارة العملية.

إذا عاشت العملية داخل prompt طويل، فهي هشة. يمكن للوكيل أن يتجاوز مرحلة، أو يخلط الأدوار، أو ينسى أن التنفيذ يحتاج إلى review من profile آخر، أو يبدأ عملاً downstream قبل أن يمر upstream بالمراجعة.

يعالج graph هذه المشكلة بطريقة هندسية أكثر. لكل عقدة input وoutput وstatus وقواعد انتقال. إذا فشلت المراجعة، لا يستيقظ downstream. إذا فشلت خطوة script، لا يتظاهر الوكيل أن كل شيء بخير. إذا كان الإنسان مطلوباً، تتوقف workflow عند `human_review` بدلاً من التخمين.

هنا يلتقي O2B وHermes Workflows في نظام واحد:

- workflows تقود العملية؛
- Hermes ينفذ المهام بآلياته الأصلية؛
- Open Second Brain يخزن context والتفضيلات والقرارات وآثار runs؛
- يبقى الإنسان داخل الحلقة حيث يكون ذلك مهماً فعلاً.

هذا يشبه مصنعاً أكثر من مجموعة حيل AI منفصلة.

## ما التالي

الهدف القريب هو إيصال `hermes-workflows` إلى حالة أستطيع فيها عرض demo كامل: ليس مجرد graph جميل في dashboard، بل run يمر بنفسه عبر عدة مراحل agent، ومراجعة، وتفرعات، وكتابة في الذاكرة، وتسليم نتيجة.

عندما يصبح ذلك مستقراً، ستكون Dark Factory أقرب بكثير إلى الشكل الذي بدأت كل هذا من أجله. فكرة في المدخل. Graph للعملية. عدة وكلاء بأدوار مختلفة. ذاكرة تنجو بين الجلسات. الإنسان ليس موزعاً، بل صاحب النية والقرار النهائي.

والأكثر إثارة أن Dark Factory بدأت بالفعل تبني نفسها. كل ليلة تقوم بـ research pass: تبحث عن أفكار جديدة لتحسين Open Second Brain، تقارن الأساليب، تستخرج أنماطاً مفيدة، وتضع مهاماً على لوحة Kanban في Hermes. ثم تأخذ دورياً scope مناسباً إلى التنفيذ، توصله إلى PR، وبعد approve مني تحوله إلى release.

يمكن رؤية أمثلة على هذه الإصدارات في [GitHub Releases الخاصة بـ Open Second Brain](https://github.com/itechmeat/open-second-brain/releases). ابتداءً من `v1.12.0`، تم تنفيذ الإصدارات بالكامل بواسطة Hermes بدون مشاركتي في الكود. كل ما كان مطلوباً مني هو قراءة PR الذي تم إنشاؤه والضغط على approve.

ما زال هذا يبدو كبيراً قليلاً، لكن قبل بضعة أشهر كان Open Second Brain مجرد مستودع فارغ. الآن هو plugin مستقر يمكن لـ Hermes اختياره كذاكرة.

سنرى إلى أي مدى يمكن دفع هذا المصنع.
