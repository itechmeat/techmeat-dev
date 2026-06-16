---
title: "Open Second Brain স্থিতিশীল হয়েছে, আর Dark Factory পেল পরের স্তর"
description: "Open Second Brain এখন স্থিতিশীল ভার্সনে পৌঁছেছে, Hermes একে native memory হিসেবে ব্যবহার করতে পারে, আর Hermes Workflows আমার manual playbook-গুলোকে autonomous work graph-এ বদলে দিচ্ছে।"
pubDate: 2026-06-16
locale: bn
tags: [open-second-brain, dark-factory, hermes, workflows, agents, memory]
ogImage: "/posters/og/posts/open-second-brain-stable-and-hermes-workflows.png"
---

আমি এখনো Hermes Agent ecosystem-এর ভেতরে আরও গভীরে যাচ্ছি। মে মাসে এটা ছিল কিছু সংযুক্ত experiment-এর মতো - memory, Kanban, Telegram, subagents, stage-এর মাঝে review। এখন এগুলো ধীরে ধীরে একসাথে একটি পূর্ণ system হয়ে উঠছে।

আমার লক্ষ্য একই: নিজের ছোট **Dark Factory** তৈরি করা। “কোড লিখতে সাহায্য করা agent” নয়, বরং এমন factory যেখানে একটি idea পরিষ্কার process দিয়ে যায়: analysis, planning, implementation, review, tests, deploy, এবং decisions memory-তে লেখা। সম্পূর্ণ autonomy এখনো সামনে, কিন্তু এর একটি অংশ ইতিমধ্যে কাজ করছে। আগে যেসব manual dispatching আমাকে করতে হতো, তার অনেকটাই এখন সত্যিই নিজে নিজে চলে।

গত কয়েক সপ্তাহে সবচেয়ে বেশি বড় হয়েছে দুটি layer: memory হিসেবে [Open Second Brain](https://github.com/itechmeat/open-second-brain), এবং future orchestrator হিসেবে [Hermes Workflows](https://github.com/itechmeat/hermes-workflows)।

## Open Second Brain আর experiment নয়

Open Second Brain এখন stable version পেয়েছে। আমার কাছে এটা গুরুত্বপূর্ণ মানসিক সীমারেখা: project আর “চল দ্রুত idea test করি” মনে হয় না; বরং প্রতিদিন ব্যবহারযোগ্য tool মনে হয়।

Public contract এখন কম কাঁপে। Hermes O2B-কে পাশে থাকা hack হিসেবে নয়, native memory provider হিসেবে connect করতে পারে। Laptop-এর Hermes, VPS-এর Hermes, Claude Code, Codex এবং অন্য runtime একই Markdown vault দেখতে পারে, accumulated rules, preferences এবং decision traces না হারিয়ে।

এটা কেন জরুরি, আমি [OpenSecondBrain বানানোর post](/bn/posts/how-i-built-open-second-brain/)-এ লিখেছিলাম। সংক্ষেপে: agentic development খুব দ্রুত memory problem-এ ধাক্কা খায়। “Model-এর শেষ উত্তরে কী ছিল” নয়, বরং আমরা এক সপ্তাহ আগে কী সিদ্ধান্ত নিয়েছি, কোন rules আমি পাঁচবার repeat করেছি, কোন artifacts তৈরি হয়েছে, project context কোথায় আছে, এবং কোন conclusions পরের compaction-এ হারানো যাবে না।

O2B এটা খুব বাস্তবভাবে সমাধান করে: Obsidian-compatible vault, plain Markdown, `Brain/`, deterministic CLI/MCP tools, `dream` passes, staged memory application, rollback, search, daily notes, preferences এবং pinned context। কোনো hidden SaaS brain নেই যাকে আলাদা করে বিশ্বাস করতে হবে। Files আমার কাছেই থাকে।

## Stars এবং আসল motivation

Plugin ধীরে ধীরে popularity পাচ্ছে। লেখার সময় repository-তে [71 stars](https://github.com/itechmeat/open-second-brain) আছে, হাজার থেকে এখনো অনেক দূরে।

কিন্তু আমার লক্ষ্য “stars জমানো” নয়। অবশ্যই ভালো লাগবে। Stars অন্যদের বুঝতে সাহায্য করে যে project জীবিত, এবং repository-কে একটু visibility দেয়। O2B যদি আপনার কাজে লাগে বা interesting লাগে, একটি star কাজে আসবে।

মূল motivation অন্য: আমিই এই plugin-এর primary user। এটা প্রথমে আমার কাজ solve করে। আমি এমন Hermes environment বানাচ্ছি যেখানে agents আমার preferences মনে রাখবে, events লিখবে, conclusions কোথা থেকে এসেছে explain করবে, এবং sessions-এর মধ্যে context carry করবে। যদি tool এই scenario-তে ভালো কাজ করে, তাহলে সেটাই যথেষ্ট।

বাকি সব useful side effect।

## Independent memory test

সবচেয়ে interesting signal README বা আমার self-promotion থেকে আসেনি, এসেছে একজন independent developer থেকে, যিনি fresh Hermes install-এ memory plugins compare করছিলেন। তিনি agent-কে reddit obsidian layout, OpenSecondBrain, Honcho এবং OpenViking-এর মধ্যে choice দিয়েছিলেন, আর Hermes O2B-কে preferred memory হিসেবে বেছে নিয়েছে।

Comment প্রায় advertisement-এর মতো, যদিও আমি চাইনি:

> So i gave my fresh install on a $1 vps the choice of a reddit obsidian layout, opensecondbrain, honcho and openviking and it chose opensecondbrain as its preferred memory.. nemotron3 ultra free said the quality is outstanding and 80% of what honcho provides. Just local and free. Only thing missing is the neuromancer inference.

আমার কাছে “80% of Honcho” অংশটি সবচেয়ে গুরুত্বপূর্ণ নয়। এমন comparison সবসময় approximate: goals আলাদা, architecture আলাদা, maturity আলাদা।

গুরুত্বপূর্ণ হলো: বাইরের একজন মানুষ clean environment-এ এটা বসিয়েছেন, agent-কে choice দিয়েছেন, এবং O2B যথেষ্ট পরিষ্কার ও useful হয়েছে যাতে আমার কোনো প্রভাব ছাড়াই সেটি নির্বাচিত হয়। আমার Hermes-এর internal memory হিসেবে শুরু হওয়া project-এর জন্য এটা ভালো milestone।

## Dark Factory এখন কোথায়

Dark Factory-কে পুরোটা দেখলে, আমি ইতিমধ্যে সেই অংশগুলো automate করেছি যেগুলো আগে সবচেয়ে বিরক্তিকর manual work ছিল।

আমি Telegram-এ Hermes-কে project idea দিতে পারি। সে clarification questions করে, কাজকে stages-এ ভাগ করে, documents তৈরি করে, Kanban-এ cards সরায়, review অন্য profile-কে দেয়, comments fix করে, result deploy করে এবং important events memory-তে লেখে। এই একই cycle আমি [প্রথম Dark Factory workflow](/bn/posts/how-i-built-the-first-dark-fabric-workflow/) নিয়ে post-এ এবং পরে [Startit](/bn/posts/dark-factory-and-open-second-brain-at-startit/)-এ দেখিয়েছিলাম।

নিচে একই experiment line-এর আরেকটি video।

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/J09BbfMpMAw" title="Dark Factory, Open Second Brain এবং Hermes Workflows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

এটা এখনো “button চাপো এবং চিরতরে ভুলে যাও” নয়। আমি results পড়ি, process ঠিক করি, কখনও run থামাই, কখনও task ফেরত পাঠাই। কিন্তু মূল shift হয়ে গেছে: agents-এর মধ্যে আমি স্থায়ী dispatcher থাকছি কম। এখন বেশি সময় আমার role হলো intent বলা, কয়েকটি decision নেওয়া এবং result check করা।

একজন মানুষের জন্য এটা attention-এর উল্লেখযোগ্য সাশ্রয়।

## নতুন layer: Hermes Workflows

পরের বড় অংশ active development-এ আছে: [Hermes Workflows](https://github.com/itechmeat/hermes-workflows)। Project এখনো young, কিন্তু game বদলানোর কথা এই অংশেরই।

এর আগে আমার workflows ছিল Hermes-এর ওপর ভালো করে লেখা playbook-এর মতো: Kanban, cron, profiles, roles, manual agreements এবং কিছু glue। এটা কাজ করত, কিন্তু process-এর কিছু অংশ এখনো আমার মাথায় এবং instructions-এ থাকত।

`hermes-workflows` অন্য step নেয়: workflow graph হয়ে যায়।

Graph-এর মধ্যে nodes আছে:

- `agent_task` - নির্দিষ্ট Hermes profile-এর task;
- `script` - model দরকার না হলে deterministic shell step;
- `condition` - আগের result অনুযায়ী branch;
- `human_review` - explicit point যেখানে মানুষ দরকার;
- `finish` - result delivery সহ finish।

গুরুত্বপূর্ণ বিষয়: এটা Hermes-কে replace করতে চাওয়া আলাদা engine নয়। Workflow Hermes-এর native primitives-এ compile হয়: Kanban, Cron, Profiles, delivery router, skills। System সেই একই surfaces দিয়ে readable থাকে, যেগুলো আমি আগেই ব্যবহার করি।

Dark Factory-এর জন্য এটা মৌলিক। Process graph হিসেবে described হলে validate, export, reuse, schedule করা যায়; node-level live telemetry দেখা যায়; pending approvals, retry এবং failure-এর পরে trace analysis করা যায়। এটা আর “agent-কে instruction follow করতে বলা হয়েছে” নয়, বরং executable contract।

## কেন এটা factory-কে autonomy-র কাছে আনে

Dark Factory-র main weakness এটা নয় যে agents খারাপ code লেখে। তারা ভুল করে, অবশ্যই, কিন্তু review, tests এবং constraints সেটা সামলায়। Main weakness হলো process management।

Process যদি long prompt-এ থাকে, সেটা fragile। Agent stage skip করতে পারে, roles mix করতে পারে, ভুলে যেতে পারে যে implementation অন্য profile দিয়ে review করাতে হবে, অথবা upstream pass করার আগে downstream work শুরু করতে পারে।

Graph এটা বেশি engineeringভাবে solve করে। প্রতিটি node-এর input, output, status এবং transition rules থাকে। Review fail হলে downstream জাগে না। Script step fail হলে agent ভান করে না যে সব ঠিক আছে। Human দরকার হলে workflow guess না করে `human_review`-এ থামে।

এখানেই O2B এবং Hermes Workflows এক system হয়:

- workflows process চালায়;
- Hermes native mechanisms দিয়ে tasks execute করে;
- Open Second Brain context, preferences, decisions এবং run traces রাখে;
- মানুষ loop-এ থাকে যেখানে সত্যিই দরকার।

এটা আলাদা আলাদা AI trick-এর চেয়ে factory-র মতো বেশি লাগে।

## এরপর কী

নিকটতম লক্ষ্য হলো `hermes-workflows`-কে এমন অবস্থায় নেওয়া যেখানে আমি full demo দেখাতে পারব: dashboard-এ সুন্দর graph নয়, বরং এমন run যা কয়েকটি agent stage, review, branching, memory write এবং result delivery নিজে পার হয়।

এটা stable হলে Dark Factory সেই আকারের অনেক কাছে যাবে যার জন্য আমি সব শুরু করেছিলাম। Input-এ idea। Process graph। ভিন্ন roles-এ কয়েকটি agents। Sessions পেরিয়েও থাকা memory। মানুষ dispatcher নয়, intent এবং final decision-এর owner।

সবচেয়ে interesting বিষয়: Dark Factory ইতিমধ্যে নিজেকে বানানো শুরু করেছে। প্রতি রাতে সে research pass করে: Open Second Brain উন্নত করার নতুন ideas খোঁজে, approaches compare করে, useful patterns বের করে এবং Hermes Kanban board-এ tasks রাখে। তারপর periodically উপযুক্ত task scope implementation-এ নেয়, PR পর্যন্ত নিয়ে যায়, এবং আমার approve-এর পরে release বানায়।

এমন releases-এর উদাহরণ [Open Second Brain GitHub Releases](https://github.com/itechmeat/open-second-brain/releases)-এ দেখা যায়। `v1.12.0` থেকে releases সম্পূর্ণ Hermes implement করেছে, code-এ আমার অংশগ্রহণ ছাড়া। আমাকে শুধু created PR পড়তে হয়েছে এবং approve করতে হয়েছে।

এখনো একটু বড় শোনায়, কিন্তু কয়েক মাস আগে Open Second Brain ছিল শুধু empty repository। এখন এটা stable plugin, যাকে Hermes নিজের memory হিসেবে বেছে নিতে পারে।

দেখা যাক এই factory কত দূর যেতে পারে।
