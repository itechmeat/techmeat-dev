---
title: "我是如何用编程 Agent 搭建这个博客的"
description: "techmeat.dev 上线的故事：从一个临时起意和一组 skills，一路走到 Astro、Cloudflare Pages、头脑风暴和博客的第一个版本。"
pubDate: 2026-04-28
tags: [ai-coding, astro, meta]
locale: zh
---

我以前有过一个博客。流量还算不错，主题清晰，写的是真实的个人经历：那时候我写前端，也写自己亲手趟过的事。后来因为一些并不算重要的原因，我没有再维护它，连域名也跟着丢了。

很长一段时间里，我都觉得那段故事就这么结束了。可今天又想写了，不再是关于前端这门职业，而是关于我如何借助编程 Agent 做真实的项目。不是关于「开发的未来」那种泛泛而谈，而是落到具体的流程、错误和决策上。

[techmeat.dev](https://techmeat.dev/) 就是这样出现的。

## 我为什么开始这件事

念头是临时起意的。我攒了一些没用完的 token，有几个想验证的假设，于是决定做一个小但真实的项目：一个把搭建过程本身当作第一篇内容的博客。

我跟 Agent 协作的常规 workflow 要复杂得多：好几轮规划、review 和检查点。这次我故意把它简化了。我想看看：如果你迅速定下方向、准备好上下文、把大部分起步工作交给 Agent 自动完成，能走多远。

这并不是参考流程，而是一个实验版本。关于更严谨的做法，我大概会单独写一篇。

## 准备：skills、上下文与项目规则

我先安装了需要的 skills。对这种项目来说，这件事比看起来重要：「给我做个博客」是一个太弱的命题。Agent 需要清晰的规则：用什么技术、内容放在哪里、怎么思考 SEO、如何处理设计、不必要时不要做什么。起步用的那一套记录在了工作文件 [INIT.md](https://github.com/itechmeat/techmeat-dev/blob/master/docs/INIT.md) 里。

之后我初始化了 `CLAUDE.md`，也就是承载项目基础上下文的那份文件。草稿原本是俄文的，但我立刻把它翻成英文当工作上下文，这样它在所有 locale 和不同工具里都能同样好用。

```text
This project is empty for now, but I am going to build my blog here. The project will be based on Astro, and posts will be stored as Markdown files. Each article will go through a multi-stage SEO and GEO preparation workflow using the skills available in the project and the geo-optimizer-skill CLI: https://github.com/Auriti-Labs/geo-optimizer-skill, which is already installed.

The blog will be about building projects with AI coding.

The domain has already been chosen and purchased: techmeat.dev.

The project will be hosted on Cloudflare Pages.

The primary language of the blog will be English, but there will also be translations into other languages, at least 10 popular ones. Translation pages must point to the English version of the same article with canonical links.

The project design must be created using the impeccable skill.

All project documentation must be written in English. Draft documentation may be an exception.
```

随后我把 `CLAUDE.md` 复制成了 `AGENTS.md`。我不想把项目绑在某一个 Agent 上：要是明天我换一个工具继续开发，基础规则也得就在代码旁边。

## 第一次启动：只搭地基

我没有让 Agent 一上来就做页面或者设计。开头我需要一个正确的技术地基：一个为 Cloudflare Pages 准备好的 Astro 项目，结构清晰，不要画蛇添足。

prompt 故意写得很窄：

```text
Let's start developing our blog project. First, use the Astro skills and set up the initial project, preparing it for hosting on Cloudflare Pages. There is no need to build pages or do any additional work right now. Only set up the project.
```

第一条请求越窄，Agent 在尚未做出决定的地方擅自「优化」项目的概率就越小。这能省下大量精神成本：我要的是一个可靠的起点，不是一张漂亮的设计稿。

## 用头脑风暴代替过早的设计

接着我打开 Superpowers，开始头脑风暴，并且明确要求不要谈设计。在这一阶段要决定的，是博客作为产品由什么组成，而不是它长什么样。

prompt 是这样的：

```text
Let's brainstorm in Russian about what my blog should consist of. Here's how I currently see it:

- All pages should share a unified design, but we are not discussing the design itself yet, only common blocks and similar structural elements. The header should include the techmeat.dev name and a language switcher. To clarify, the brainstorming result should describe what the blog should have, not how it should look.
- The home page should show previews of the 10 latest posts with links to the full posts. Maybe it should include something else too; suggest options.
- There should be an About page: something like a CV, but in a more blog-like form.
- There should be a Contacts page with links to my social profiles and GitHub.
- Maybe some other pages are needed; suggest options.
- This should be a very simple blog, mostly informational. I expect to publish materials often.
```

头脑风暴大概用了一个小时。对这么小的项目来说听上去挺多，但这一小时的回报很值：没有它就不会有一份自洽的方案和架构规范。Agent 帮我把博客拆成了页面、共用块、语言模型和内容结构。

最后产出了两份内部产物：第一版的[实施计划](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/plans/2026-04-27-blog-v1.md)和[架构规范](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/specs/2026-04-27-blog-architecture-design.md)。

## 自主开发、Review 与修复

头脑风暴之后，我要做的就是同意方向，然后让 Agent 自己干。大部分基础结构是自动出现的：路由、Markdown 内容、locales、组件、RSS、tags、翻译用的基础设施。

也不是完全没动手。我加了几条修正性 prompt：把语言列表说清楚、让它修一些小 bug、把它在第一遍里漏掉的细节补回来。

之后我请 GPT-5.5 来做代码 review，并直接把修复落上去。整个过程我几乎没插手：Agent 找到了几处有用的改进，应用并跑完了检查。说实话，这个版本我基本上是 vibe-code 出来的，平时我会刻意避免这么做。这里可以接受：项目小，错误成本低，目的本来就是去试这套做法的边界。

这里能很清楚地看出我对 AI coding 的整体理解。Agent 不是「请帮我做个产品」的魔法按钮，而是一个非常快的执行者，它需要边界、上下文和定期 review。边界给得好，它能替你扛掉大量粗活；边界含糊，它产出不确定性的速度也一样快。

## 我为什么把设计往后放

我刻意不把设计放进第一阶段。视觉这一块我有自己的一套流程，我希望让它走自己的路，不要把架构、内容和界面搅在同一个任务里。

所以博客的第一个版本看起来像是技术骨架：路由、本地化、文章、tags、发布基础设施都已经就位了，视觉系统则还没有，这没关系。有时候先有一个能跑的项目，再静下来想它该是什么样、给人什么感觉，反而更划算。

## 我想用这个博客验证什么

techmeat.dev 对我来说不只是一个堆放笔记的地方，而是一个工作中的实验室。我感兴趣的是：当一个编程 Agent 一直就在你旁边，开发会发生什么变化——它在哪些地方加快了节奏，又在哪些地方制造了隐藏的风险，以及在哪些地方它能让我看到一个原本要拖很久才能想到的解法。

有三件事尤其抓住我的注意。

**过程。** 不是「Agent 写了代码」，而是它前后发生了什么：哪些 prompt 起了作用，要给它加哪些约束，哪些决定还是留给人来做更稳妥。

**质量。** 如果不守住计划和 review，AI-assisted development 很容易变成一连串补丁。我想展示成功的结果，也想展示那些 Agent 出错的地方，或者我自己把问题没说够准的地方。

**可复用性。** 一种做法如果不能在下一个项目里被复用，那它就不是流程，而是一次性的小聪明。所以我会同时记录最终的代码和工作图谱：任务是怎么被提出来的、出现了哪些文件、用到了哪些工具、决定是怎么做出来的。

## 接下来呢

下一阶段是设计。这篇 post 的续篇正是关于这件事：我是怎么做的，做了哪些决定，最后出了什么样。尽管它最终长成什么样，我自己现在也还不知道。

在那之前，为了留个记录，先把博客今天的样子保存下来：

<!-- TODO: Embed YouTube video showcasing the first version of the blog. -->
