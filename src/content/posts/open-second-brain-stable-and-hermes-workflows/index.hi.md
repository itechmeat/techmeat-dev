---
title: "Open Second Brain स्थिर हो गया, और Dark Factory को अगली परत मिल गई"
description: "Open Second Brain स्थिर संस्करण तक पहुंच गया है, Hermes अब उसे native memory की तरह इस्तेमाल कर सकता है, और Hermes Workflows मेरे manual playbooks को autonomous work graphs में बदल रहा है."
pubDate: 2026-06-16
locale: hi
tags: [open-second-brain, dark-factory, hermes, workflows, agents, memory]
ogImage: "/posters/og/posts/open-second-brain-stable-and-hermes-workflows.png"
---

मैं अभी भी Hermes Agent ecosystem में गहराई से जा रहा हूं. मई में यह memory, Kanban, Telegram, subagents और stage review जैसे जुड़े हुए experiments की series लगती थी. अब ये pieces एक ज्यादा coherent system में जुड़ने लगे हैं.

मेरा लक्ष्य वही है: अपनी छोटी **Dark Factory** बनाना. “Code लिखने में मदद करने वाला agent” नहीं, बल्कि ऐसी factory जहां idea एक साफ process से गुजरता है: analysis, planning, implementation, review, tests, deploy और decisions को memory में लिखना. पूरी autonomy अभी दूर है, लेकिन उसका एक हिस्सा पहले से काम कर रहा है. जो manual dispatching पहले मुझे करनी पड़ती थी, उसका बड़ा हिस्सा अब सच में अपने आप चल रहा है.

पिछले कुछ हफ्तों में दो layers सबसे ज्यादा बढ़ीं: memory के रूप में [Open Second Brain](https://github.com/itechmeat/open-second-brain), और future orchestrator के रूप में [Hermes Workflows](https://github.com/itechmeat/hermes-workflows).

## Open Second Brain अब experiment नहीं रहा

Open Second Brain को stable version मिल गया है. मेरे लिए यह psychological boundary है: project अब “चलो जल्दी से idea test करें” जैसा नहीं, बल्कि रोज इस्तेमाल होने वाले tool जैसा लगता है.

Public contracts अब कम हिलते हैं. Hermes O2B को side hack की तरह नहीं, native memory provider की तरह connect कर सकता है. Laptop पर Hermes, VPS पर Hermes, Claude Code, Codex और दूसरे runtimes एक ही Markdown vault देख सकते हैं और accumulated rules, preferences और decision traces खोते नहीं.

मैंने यह क्यों जरूरी है, [OpenSecondBrain बनाने वाले post](/hi/posts/how-i-built-open-second-brain/) में पहले लिखा है. छोटा जवाब: agentic development बहुत जल्दी memory problem से टकराता है. “Model के पिछले answer में क्या था” नहीं, बल्कि हमने पिछले हफ्ते क्या decide किया, कौन से rules मैं पांच बार repeat कर चुका हूं, कौन से artifacts बने, project context कहां है, और कौन से conclusions अगली compaction में नहीं खोने चाहिए.

O2B इसे बहुत जमीन से जुड़कर solve करता है: Obsidian-compatible vault, plain Markdown, `Brain/`, deterministic CLI/MCP tools, `dream` passes, staged memory application, rollback, search, daily notes, preferences और pinned context. कोई hidden SaaS brain नहीं जिस पर अलग से भरोसा करना पड़े. Files मेरे पास रहती हैं.

## Stars और असली motivation

Plugin धीरे-धीरे popular हो रहा है. लिखते समय repository पर [71 stars](https://github.com/itechmeat/open-second-brain) हैं, हजारों से अभी दूर.

लेकिन मेरा लक्ष्य “stars collect करना” नहीं है. अच्छा लगेगा, बेशक. Stars दूसरों को दिखाते हैं कि project alive है और repository को थोड़ी visibility देते हैं. अगर O2B आपके लिए useful या interesting है, तो star काम आएगा.

Main motivation दूसरी है: मैं खुद इस plugin का primary user हूं. यह पहले मेरी problems solve करता है. मैं ऐसा Hermes environment बना रहा हूं जहां agents मेरी preferences याद रखें, events लिखें, conclusions कहां से आए यह explain करें, और sessions के बीच context carry करें. अगर tool इस scenario में अच्छी तरह काम करता है, तो वह पहले ही अपने काम का है.

बाकी सब useful side effect है.

## Independent memory test

सबसे interesting signal README या मेरी self-promotion से नहीं आया, बल्कि एक independent developer से आया जिसने fresh Hermes install पर memory plugins compare किए. उसने agent को reddit obsidian layout, OpenSecondBrain, Honcho और OpenViking में से चुनने दिया, और Hermes ने O2B को preferred memory चुना.

Comment लगभग advertisement जैसा है, हालांकि मैंने इसे नहीं मांगा था:

> So i gave my fresh install on a $1 vps the choice of a reddit obsidian layout, opensecondbrain, honcho and openviking and it chose opensecondbrain as its preferred memory.. nemotron3 ultra free said the quality is outstanding and 80% of what honcho provides. Just local and free. Only thing missing is the neuromancer inference.

मेरे लिए “80% of Honcho” वाली line सबसे important नहीं है. ऐसी comparisons हमेशा approximate होती हैं: अलग goals, अलग architectures, अलग product maturity.

Important बात यह है कि किसी outside person ने इसे clean environment में लगाया, agent को choice दी, और O2B इतना clear और useful निकला कि वह बिना मेरे influence के चुना गया. मेरे Hermes के internal memory layer के रूप में शुरू हुए project के लिए यह अच्छा milestone है.

## Dark Factory अभी कहां है

पूरी Dark Factory को देखें तो मैंने पहले से उन parts को automate कर लिया है जो सबसे boring manual work थे.

मैं Telegram में Hermes को project idea दे सकता हूं. वह clarification questions पूछता है, काम को stages में तोड़ता है, documents बनाता है, Kanban पर cards move करता है, review दूसरे profile को देता है, comments fix करता है, result deploy करता है और important events memory में लिखता है. यही cycle मैंने [पहले Dark Factory workflow](/hi/posts/how-i-built-the-first-dark-fabric-workflow/) वाले post और फिर [Startit](/hi/posts/dark-factory-and-open-second-brain-at-startit/) में दिखाया था.

नीचे उसी experiment line का एक और video है.

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/J09BbfMpMAw" title="Dark Factory, Open Second Brain और Hermes Workflows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

यह अभी भी “button दबाओ और हमेशा के लिए भूल जाओ” नहीं है. मैं results पढ़ता हूं, process adjust करता हूं, कभी run stop करता हूं, कभी task वापस भेजता हूं. लेकिन key shift हो चुका है: मैं agents के बीच permanent dispatcher कम होता जा रहा हूं. ज्यादा बार मेरा role intent formulate करना, कुछ decisions लेना और result check करना है.

एक व्यक्ति के लिए यह attention की बड़ी बचत है.

## नई layer: Hermes Workflows

अगला बड़ा हिस्सा active development में है: [Hermes Workflows](https://github.com/itechmeat/hermes-workflows). Project अभी young है, लेकिन यही game बदलने वाला part है.

इसके पहले मेरे workflows Hermes के ऊपर लिखे अच्छे playbooks जैसे थे: Kanban, cron, profiles, roles, manual agreements और थोड़ा glue. यह काम करता था, लेकिन process का हिस्सा अभी भी मेरे दिमाग और instructions में रहता था.

`hermes-workflows` अलग step लेता है: workflow graph बन जाता है.

Graph में nodes होते हैं:

- `agent_task` - किसी specific Hermes profile के लिए task;
- `script` - deterministic shell step, जब model की जरूरत न हो;
- `condition` - पिछले result के आधार पर branch;
- `human_review` - explicit point जहां human चाहिए;
- `finish` - result delivery के साथ finish.

Important बात: यह Hermes को replace करने वाला अलग engine नहीं है. Workflow Hermes primitives में compile होता है: Kanban, Cron, Profiles, delivery router, skills. System उन्हीं surfaces से readable रहता है जिन्हें मैं पहले से इस्तेमाल करता हूं.

Dark Factory के लिए यह जरूरी है. जब process graph के रूप में described होता है, उसे validate, export, reuse, schedule किया जा सकता है; node-level live telemetry देखी जा सकती है; pending approvals, retry और failure के बाद trace analysis possible होते हैं. यह “agent को instruction follow करने को कहा गया” नहीं, बल्कि executable contract है.

## यह factory को autonomy के पास क्यों लाता है

Dark Factory की main weakness यह नहीं है कि agents खराब code लिखते हैं. वे mistakes करते हैं, लेकिन review, tests और constraints उसे संभाल लेते हैं. Main weakness process management है.

अगर process long prompt में रहता है तो वह fragile है. Agent stage skip कर सकता है, roles mix कर सकता है, भूल सकता है कि implementation को दूसरे profile से review चाहिए, या upstream pass होने से पहले downstream काम शुरू कर सकता है.

Graph इसे ज्यादा engineering तरीके से solve करता है. हर node का input, output, status और transition rules होता है. Review fail हो तो downstream नहीं जागता. Script step fail हो तो agent pretend नहीं करता कि सब ठीक है. Human चाहिए तो workflow `human_review` पर रुकता है, guess नहीं करता.

यहीं O2B और Hermes Workflows एक system बनते हैं:

- workflows process चलाते हैं;
- Hermes native mechanisms से tasks execute करता है;
- Open Second Brain context, preferences, decisions और run traces store करता है;
- human loop में वहीं रहता है जहां सच में जरूरी है.

यह अब अलग-अलग AI tricks से ज्यादा factory जैसा लगने लगा है.

## आगे क्या

Nearest goal है `hermes-workflows` को उस state तक लाना जहां मैं full demo दिखा सकूं: dashboard में सुंदर graph नहीं, बल्कि ऐसा run जो कई agent stages, review, branching, memory writes और result delivery से खुद गुजरे.

जब यह stable होगा, Dark Factory उस रूप के काफी पास होगी जिसके लिए मैंने यह सब शुरू किया. Input में idea. Process graph. अलग roles में कई agents. Sessions से बची रहने वाली memory. Human dispatcher नहीं, बल्कि intent और final decision का owner.

सबसे interesting बात: Dark Factory ने खुद को बनाना शुरू कर दिया है. हर रात वह research pass करती है: Open Second Brain को बेहतर बनाने के लिए नए ideas खोजती है, approaches compare करती है, useful patterns निकालती है और Hermes Kanban board पर tasks बनाती है. फिर समय-समय पर suitable task scope implementation में लेती है, PR तक पहुंचाती है, और मेरे approve के बाद release में बदल देती है.

ऐसे releases के examples [Open Second Brain GitHub Releases](https://github.com/itechmeat/open-second-brain/releases) में देखे जा सकते हैं. `v1.12.0` से शुरू होकर releases पूरी तरह Hermes ने implement किए, code में मेरी भागीदारी के बिना. मुझे सिर्फ created PR पढ़ना और approve करना था.

यह अभी थोड़ा बड़ा दावा लगता है, लेकिन कुछ महीने पहले Open Second Brain सिर्फ empty repository था. अब यह stable plugin है जिसे Hermes अपनी memory के रूप में चुन सकता है.

देखते हैं यह factory कितनी दूर तक जा सकती है.
