---
title: "我如何给 AI 代理一个钱包,以及它为何立刻就需要记忆"
description: "open-second-brain 0.8.0 和 Pay Memory:我如何通过 pay.sh 让代理为外部 API 付费,以及为什么核心并不在于支付本身,而是每一分钱花在何处的清晰记录。"
pubDate: 2026-05-10
locale: zh
tags: [pay-memory, agent-payments, pay-sh, solana, second-brain]
ogImage: "/posters/og/posts/how-i-gave-an-ai-agent-a-wallet.png"
prFileId: 59c8a1ba8bdfb8c83c2f3ac4c32d4044e085b7a3aea994cc166fd65a456c71fc
---

几天前我发布了 [open-second-brain](/zh/posts/how-i-built-open-second-brain/) -- 一个面向 AI 代理的基于文件的记忆层。从那时起,有一个念头一直在我脑海里萦绕。如果代理跑在 VPS 上、按自己的节奏、通过 Telegram 工作 -- 那么它迟早要花钱。买一次 API 调用。生成一张插图。触发一次付费搜索。

支付本身是个早已被解决的问题。[pay.sh](https://pay.sh) 通过 Solana 上的 USDC 微支付,把一次普通的 HTTP 调用包装成付费调用。代理通过 `pay` 运行 curl,钱包签署交易,另一端返回响应。搞定。

但"搞定"只是故事的一半。

## 带着钱包的混乱

设想一下:代理在处理一项任务,路上做出一连串决策,其中两次是付费调用。一小时后,你打开终端,scrollback 早已飞出屏幕。某处发生过 `pay` 调用,某处到达了 tx 签名,某处返回了 JSON 响应。

代理为什么这么做?依据是什么?它原本预期花多少?实际扣了多少?结果在哪?

如果你想把任何自主的事交给代理,"自己去读 scrollback"是行不通的。终端日志没有结构,没有与任务关联,无法索引,熬不过一次重启,也无法在 Obsidian 中作为一份正常的产物打开。

我很快就明白,任务并不是"教会代理付钱" -- 而是"让每一次付款都留下有意义的痕迹"。

![一个 AI 代理握着一只数字钱包,而微支付的轨迹流向彼此关联的 Markdown 收据卡片](./image.png)

这张插图正是用文章所描述的方式生成的:通过 `pay.sh`,使用 `paysponge/fal` 这个 x402 网关与 `fal-ai/fast-sdxl` 端点。生成花费 **0.01 USDC**,来自 mainnet 钱包 `64FaukkZDUdFTufXF49H1CrHjDfsmBFqfrUjsAS8XrgP`;公开的 Solana 交易为 [`5ZYnkabzLvHqEgXNJfKopiRwbGkriHJ2bps2NnkX7HzqQAyTZYjcyJVCTvZwMquyMviv2juyAdbP9P2depHrJxQW`](https://solscan.io/tx/5ZYnkabzLvHqEgXNJfKopiRwbGkriHJ2bps2NnkX7HzqQAyTZYjcyJVCTvZwMquyMviv2juyAdbP9P2depHrJxQW)。request id 是 `019e135a-357b-71f3-8b9d-305e728b05fb`,生成的 asset 在本地保存为 `image.png`。

而 open-second-brain 在这里刚好完美契合。

## Pay Memory

在 0.8.0 版本里,OSB 多了一层新东西 -- **Pay Memory**。简而言之:为钱准备的记忆。

每一次付费操作之后,vault 里都会出现一份普通的 Markdown 文件,带有以下字段:

- 代理**为什么**决定付款;
- 调用了**哪个服务**;
- 当时生效的**spending policy** 是哪一条以及它如何裁定(`allowed` / `approval_required` / `denied` / `not_checked`);
- **预期成本**与**实际扣款金额**;
- **payment proof** -- 那笔可以在 Solscan 中打开并核验的具体 Solana 签名;
- **结果** -- 指向另一份附有输出内容的 asset note 的链接;
- 若 policy 要求,则记录**由谁审批**。

它不是 SQLite 表,也不是 dashboard。它就是一份普通的 Markdown,放在代理写 daily log 的同一个文件夹里。你可以用眼睛打开它,做批注,提交进 Git,稍后用 grep 找到它,或者把它当作证据展示。

OSB 在这里并没有变成支付系统 -- 它不保管钱包,不签署交易,不做 enforcement。它做自己擅长的事:维护一份诚实、可被人类阅读的记忆。pay.sh 让代理获得付费资源的访问权;Pay Memory 让人能在一周以后打开 vault,从容地理解发生过什么。

顺便说一句,[一份真正的 receipt 长这个样子](/files/fal-generate-a-no-text-fast-sdxl-illustration-for-the-techmeat-d.md) -- 就是本文开头那张插图对应的那一份。直接从 vault 里拿出的原始 Markdown,未经任何处理。frontmatter 里是上面列出的全部字段,下面则是用人类语言写的文字,说明"为什么"、"policy 返回了什么",以及"实际扣了多少"。

在 Second Brain 里,它就放在这条路径下:

```
AI Wiki/
└── payments/
    └── 2026-05-10/
        └── fal-generate-a-no-text-fast-sdxl-illustration-for-the-techmeat-d.md
```

毫无玄机:日期 → 文件夹,slug → 文件名。适合 grep、git diff 以及在 Obsidian 中的日常浏览。

## 一个比其他都更重要的原则

当我审阅初稿实现时,目光立刻被一个细节钩住了:receipt 总是写着 "Allowed by the configured spending policy" -- 即使 vault 里根本没有任何 policy。

听上去像是小事一桩。实际上,这把整件事的意义全杀掉了。

Pay Memory 是一层 audit。一层 audit 的价值,完全取决于它有多诚实。一旦 receipt 开始讲一个漂亮的故事而不是真实的故事,一切就崩塌了。所以规则其实很简单:与其自信地虚假记录 `allowed`,不如写下 `not_checked`。如果 policy 没被检查 -- 就这样写。如果 policy 返回了 `denied` 但有人用手放过了那次调用 -- 也这样写。

"漂亮叙事"的诱惑是 audit 系统的头号敌人。这大概是这一天最重要的一条教训 -- 我打算把它带到项目的其他部分。

## 生产环境里的一次真实付款

到一天的末尾,这一切需要在真金白银上而不是 sandbox fixture 上验证。我往一个全新的 Solana 钱包发了十美分的 USDC,让代理通过 Google Places 帮我在贝尔格莱德找三家咖啡馆。

一秒之后,三个真实的地点回来了 -- Artist Specialty Coffee、Dusha、DRIP。Tx 已在 mainnet 上 finalised,$0.001 USDC,余额从 0.10 变成 0.099。签名在 Solscan,可点击。

紧接着整条 Pay Memory 链条启动:vault 里多出一份带着真实签名的 receipt、一份单独列出三家咖啡馆的 asset note、一份每日支付报告,以及 Daily 里一条简短的、附有两份文件链接的条目。我可以在 Obsidian 里打开 vault,点开 proof,在浏览器中看到那笔真实付款,而紧挨着它的,是一段用人类语言写就的、关于代理为什么这么做的清晰说明。

## 这一切到底为了什么

我并不是在给自己搭一套 enterprise compliance 或者 blockchain-for-everything。架构本身简单得有些丢人 -- 就是放在正确文件夹里的一堆 Markdown 文件。

但背后的想法很重要。

如果代理变得越来越自主,它的记忆就不仅要覆盖文字行为,还得覆盖带后果的行为:调用外部服务、花钱、生成 asset、申请 approval。付款只是最生动的例子,因为信任的问题在那里立刻浮现。同样的原则可以很自然地搬到发布文章、发送邮件、deploy、下达一次生成订单、一次 on-chain 操作上。

简短版本:

> pay.sh 给代理通往付费资源的钥匙。
> Pay Memory 让人有能力在一周之后理解,代理为什么动用了这把钥匙。

如果代理只是花钱 -- 那是一种风险。如果代理在花钱的同时,留下了诚实、互相关联、可被人类阅读的痕迹 -- 那就已经是一种可以慢慢开始信任的 workflow 了。

Pay Memory 随 [open-second-brain 0.8.0](https://github.com/itechmeat/open-second-brain/releases/tag/v0.8.0) 一同发布。
