---
title: "Open Second Brain 已经稳定，Dark Factory 得到了下一层能力"
description: "Open Second Brain 已达到稳定版本，Hermes 现在可以把它作为原生记忆使用，而 Hermes Workflows 正在把我的手动 playbook 变成自主执行的工作图。"
pubDate: 2026-06-16
locale: zh
tags: [open-second-brain, dark-factory, hermes, workflows, agents, memory]
ogImage: "/posters/og/posts/open-second-brain-stable-and-hermes-workflows.png"
---

我还在继续深入 Hermes Agent 生态。五月时，这还像是一组彼此相关的实验：记忆、Kanban、Telegram、子代理、阶段之间的 review。现在这些东西开始拼成一个更完整的系统。

目标没有变：搭建我自己的小型 **Dark Factory**。不是“一个帮我写代码的 agent”，而是一座工厂，让一个想法经过清晰流程：分析、规划、实现、review、测试、部署，并把决策写入记忆。距离完全自治还很远，但目标的一部分已经实现了。很多以前需要我手动调度的事情，现在真的能自己往前走。

过去几周里，增长最明显的是两层：[Open Second Brain](https://github.com/itechmeat/open-second-brain) 作为记忆层，以及 [Hermes Workflows](https://github.com/itechmeat/hermes-workflows) 作为未来的流程编排层。

## Open Second Brain 不再只是实验

Open Second Brain 已经有了稳定版本。对我来说，这是一个重要的心理边界：它不再像“快速验证一个想法”，而开始像一个可以每天使用的工具。

公共契约也不再那么晃。Hermes 可以把 O2B 作为原生 memory provider 接入，而不是旁边的临时补丁。笔记本上的 Hermes、VPS 上的 Hermes、Claude Code、Codex 和其他 runtime 都可以读取同一个 Markdown vault，不丢失积累的规则、偏好和决策痕迹。

我在[开发 OpenSecondBrain 的文章](/zh/posts/how-i-built-open-second-brain/)里已经写过为什么这很重要。简单说，agentic development 很快会遇到记忆问题。不是“模型上一条回答里有什么”，而是我们一周前做了什么决定，我已经重复过五次的规则是什么，哪些 artifact 已经存在，项目当前 context 在哪里，以及哪些结论不能在下一次 compaction 时丢掉。

O2B 用很朴素的方式解决它：Obsidian-compatible vault、plain Markdown、`Brain/`、确定性的 CLI/MCP 工具、`dream` pass、分阶段应用记忆变更、rollback、搜索、daily notes、preferences 和 pinned context。没有一个需要额外信任的隐藏 SaaS 大脑。文件在我这里。

## 星标和真正的动机

这个插件正在慢慢获得关注。写这篇文章时，仓库有 [71 个 star](https://github.com/itechmeat/open-second-brain)，离几千个还很远。

但我的目标不是“收集 star”。当然，有 star 会很好。star 能让别人知道项目还活着，也能给仓库一点可见度。如果 O2B 对你有用，或者你觉得有意思，一个 star 会有帮助。

真正的动机是别的：我自己就是这个插件的主要用户。它首先解决的是我的问题。我在搭建一个 Hermes 环境，里面的 agents 需要记住我的偏好、写事件、解释结论从哪里来，并在 session 之间搬运 context。只要它在这个场景里工作得好，它就已经值了。

其他都是有用的副作用。

## 独立的记忆测试

最有意思的信号不是来自 README，也不是来自我的自我宣传，而是来自一个独立开发者。他在一个全新的 Hermes 安装上比较不同的 memory plugin。他给 agent 几个选择：reddit obsidian layout、OpenSecondBrain、Honcho 和 OpenViking，最后 Hermes 选择了 O2B 作为偏好的记忆。

这条评论几乎像广告，虽然不是我要求的：

> So i gave my fresh install on a $1 vps the choice of a reddit obsidian layout, opensecondbrain, honcho and openviking and it chose opensecondbrain as its preferred memory.. nemotron3 ultra free said the quality is outstanding and 80% of what honcho provides. Just local and free. Only thing missing is the neuromancer inference.

对我来说，“80% of Honcho”不是重点。这类比较总是有条件的：目标不同、架构不同、产品成熟度也不同。

更重要的是：外部的人把它放进一个干净环境，让 agent 自己选择，而 O2B 足够清晰、有用，能在没有我影响的情况下被选中。对于一个最初只是为我的 Hermes 做内部记忆的项目，这是一个很好的节点。

## Dark Factory 现在在哪里

如果看整个 Dark Factory，现在我已经自动化了以前最无聊的手工部分。

我可以在 Telegram 里给 Hermes 一个项目想法。它会问澄清问题，把工作拆成阶段，创建文档，在 Kanban 上移动卡片，把 review 交给另一个 profile，修复评论，部署结果，并把重要事件写入记忆。这就是我在[第一个 Dark Factory workflow](/zh/posts/how-i-built-the-first-dark-fabric-workflow/) 和后来在 [Startit](/zh/posts/dark-factory-and-open-second-brain-at-startit/) 展示过的循环。

下面是这条实验线上的另一个视频。

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/J09BbfMpMAw" title="Dark Factory、Open Second Brain 和 Hermes Workflows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

这还不是“按下按钮然后永远忘掉”。我会读结果、调整流程，有时停止一个 run，有时把任务退回去。但关键变化已经发生：我越来越少扮演 agents 之间的长期调度员。更多时候，我的角色是表达意图、做几个决定，然后检查结果。

对一个人来说，这已经节省了不少注意力。

## 新的一层：Hermes Workflows

下一块大的东西正在积极开发中：[Hermes Workflows](https://github.com/itechmeat/hermes-workflows)。项目还很年轻，但它应该会改变游戏规则。

在它之前，我的 workflow 更像是写得很清楚的 Hermes playbook：Kanban、cron、profiles、roles、人工约定和一点胶水。这已经能工作，但流程的一部分仍然活在我的脑子和指令里。

`hermes-workflows` 迈出了另一步：workflow 变成了图。

图里有节点：

- `agent_task` - 给某个 Hermes profile 的任务；
- `script` - 不需要模型时的确定性 shell 步骤；
- `condition` - 根据上一步结果分支；
- `human_review` - 明确需要人介入的点；
- `finish` - 完成并交付结果。

重要的是：这不是一个试图替代 Hermes 的独立 engine。Workflow 会编译成 Hermes 的原生 primitives：Kanban、Cron、Profiles、delivery router、skills。系统仍然可以通过我已经在用的界面来阅读。

这对 Dark Factory 很关键。当流程被描述为图时，它可以被验证、导出、复用、定时执行，可以查看每个节点的 live telemetry、pending approvals，可以 retry，也可以在失败后分析 trace。它不再是“告诉 agent 按说明做”，而是一个可执行的契约。

## 为什么这让工厂更接近自治

Dark Factory 最大的弱点不是 agents 写不好代码。当然它们会犯错，但 review、测试和限制能处理这些。最大的弱点是流程控制。

如果流程只存在于一个很长的 prompt 里，它就很脆弱。Agent 可能跳过阶段、混淆角色、忘记实现后需要另一个 profile review，或者在 upstream 还没通过检查前就开始 downstream 工作。

图用更工程化的方式解决这个问题。每个节点都有输入、输出、状态和转移规则。如果 review 没通过，downstream 不会醒来。如果 script 步骤失败，agent 不会假装一切正常。如果需要人，workflow 会停在 `human_review`，而不是猜答案。

这里 O2B 和 Hermes Workflows 合成一个系统：

- workflows 负责推进流程；
- Hermes 用原生机制执行任务；
- Open Second Brain 保存 context、偏好、决策和 run traces；
- 人只在真正重要的地方留在 loop 里。

这已经更像工厂，而不是一组零散的 AI 技巧。

## 接下来

最近的目标是把 `hermes-workflows` 做到可以展示完整 demo：不是 dashboard 里一个漂亮的图，而是一个真正的 run，能经过多个 agent 阶段、review、分支、写入记忆并交付结果。

当它稳定后，Dark Factory 会更接近我最初想要的形态：入口是想法，内部是流程图，不同角色的多个 agents，能跨 session 存活的记忆。人不是调度员，而是意图和最终决定的拥有者。

最有意思的是：Dark Factory 已经开始构建它自己。每天夜里它会做一次 research pass：寻找改进 Open Second Brain 的新想法，比较不同方法，提取有用模式，并把任务放到 Hermes 的 Kanban board 上。之后它会周期性地拿一组合适的任务去实现，推进到 PR，然后在我 approve 之后变成 release。

这些 release 的例子可以在 [Open Second Brain GitHub Releases](https://github.com/itechmeat/open-second-brain/releases) 里看到。从 `v1.12.0` 开始，release 都是 Hermes 完全实现的，我没有参与代码。我要做的只是阅读生成的 PR 并 approve。

听起来还是有点夸张，但几个月前 Open Second Brain 还只是一个空仓库。现在它已经是 Hermes 可以选择作为记忆的稳定插件。

继续看看这座工厂能走多远。
