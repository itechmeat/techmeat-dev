---
title: "Open Second Brain Is Stable, and Dark Factory Got Its Next Layer"
description: "Open Second Brain has reached a stable version, Hermes can now use it as native memory, and the new Hermes Workflows plugin turns my manual playbooks into autonomous work graphs."
pubDate: 2026-06-16
locale: en
tags: [open-second-brain, dark-factory, hermes, workflows, agents, memory]
ogImage: "/posters/og/posts/open-second-brain-stable-and-hermes-workflows.png"
prFileId: 09a62e4c42f356f90f2ca21079b3e9f7190330f685b1799cbee38337effdfa4a
---

I am still digging deeper into the Hermes Agent ecosystem. In May it still looked like a set of related experiments - memory, Kanban, Telegram, subagents, review stages - but now the pieces are starting to become one system.

The goal is the same: to build my small **Dark Factory**. Not “an agent that helps write code”, but a factory where an idea goes through a process: analysis, planning, implementation, review, tests, deployment, and memory updates. Full autonomy is still ahead, but part of that goal is already working. A lot of the manual dispatching I used to do now really runs by itself.

Two layers grew the most in the last few weeks: [Open Second Brain](https://github.com/itechmeat/open-second-brain) as memory, and [Hermes Workflows](https://github.com/itechmeat/hermes-workflows) as the future orchestrator.

## Open Second Brain stopped being an experiment

Open Second Brain now has a stable version. For me this is an important psychological line: the project no longer feels like “let’s quickly test an idea” and starts behaving like a tool I can use every day.

The public contracts are less shaky now. Hermes can connect O2B as a native memory provider, not as a sidecar hack. Hermes on my laptop, Hermes on a VPS, Claude Code, Codex, and other runtimes can look into the same Markdown vault without losing accumulated rules, preferences, and decision traces.

I already wrote why this matters in the post about [building OpenSecondBrain](/en/posts/how-i-built-open-second-brain/). In short: agentic development quickly runs into a memory problem. Not “what was in the model’s last answer”, but what we decided a week ago, which rules I have repeated five times, which artifacts already exist, where the project context lives, and which conclusions must survive the next compaction.

O2B solves this in a very grounded way: an Obsidian-compatible vault, plain Markdown, `Brain/`, deterministic CLI/MCP tools, `dream` passes, staged memory application, rollback, search, daily notes, preferences, and pinned context. No hidden SaaS brain that needs extra trust. The files are mine.

## Stars and the real motivation

The plugin is gradually gaining attention. At the time of writing, the repository has [71 stars](https://github.com/itechmeat/open-second-brain), still far from thousands.

But collecting stars is not the goal. It would be nice, of course. Stars help other people see that the project is alive and give the repository a little more visibility. If O2B is useful or interesting to you, a star helps.

The main motivation is different: I am the primary user of this plugin. It solves my own problems first. I am building a Hermes environment where agents need to remember my preferences, write events, explain where conclusions came from, and carry context across sessions. If it works well for that scenario, it has already paid for itself.

Everything else is a useful side effect.

## An independent memory test

The most interesting signal did not come from the README or my own promotion. It came from an independent developer comparing memory plugins on a fresh Hermes install. He gave the agent a choice between several options - a reddit Obsidian layout, OpenSecondBrain, Honcho, and OpenViking - and Hermes picked O2B as its preferred memory.

The comment almost reads like an ad, though I did not ask for it:

> So i gave my fresh install on a $1 vps the choice of a reddit obsidian layout, opensecondbrain, honcho and openviking and it chose opensecondbrain as its preferred memory.. nemotron3 ultra free said the quality is outstanding and 80% of what honcho provides. Just local and free. Only thing missing is the neuromancer inference.

The “80% of Honcho” line is not the important part for me. Comparisons like that are always approximate: different goals, different architectures, different product maturity.

What matters is that someone external installed it in a clean environment, gave the agent a choice, and O2B was clear and useful enough to be selected without my hand on the scale. For a project that started as internal memory for my Hermes setup, that is a good milestone.

## Where Dark Factory is now

Looking at Dark Factory as a whole, I have already automated pieces that used to be the most boring manual work.

I can give Hermes a project idea in Telegram. It asks clarifying questions, breaks the work into stages, creates documents, moves cards through Kanban, sends review to another profile, fixes comments, deploys the result, and writes important events into memory. This is the same cycle I showed in the post about the [first Dark Factory workflow](/en/posts/how-i-built-the-first-dark-fabric-workflow/) and later at [Startit](/en/posts/dark-factory-and-open-second-brain-at-startit/).

Here is another video from the same line of experiments.

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/J09BbfMpMAw" title="Dark Factory, Open Second Brain and Hermes Workflows" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

This is still not “press a button and forget forever”. I read outputs, tune the process, sometimes stop a run, sometimes send a task back. But the important shift has happened: I am less and less the permanent dispatcher between agents. More often my role is to state intent, make a few decisions, and check the result.

For one person, that saves a noticeable amount of attention.

## The new layer: Hermes Workflows

The next big piece is under active development: [Hermes Workflows](https://github.com/itechmeat/hermes-workflows). The project is still young, but it is the part that should change the game.

Before it, my workflows were closer to well-described playbooks on top of Hermes: Kanban, cron, profiles, roles, conventions, and some glue. That already worked, but part of the process still lived in my head and in instructions.

`hermes-workflows` makes a different move: a workflow becomes a graph.

The graph has nodes:

- `agent_task` - a task for a specific Hermes profile;
- `script` - a deterministic shell step when the model is not needed;
- `condition` - a branch based on the previous result;
- `human_review` - an explicit point where a human is needed;
- `finish` - completion with result delivery.

The important part: this is not a separate engine trying to replace Hermes. A workflow compiles into native Hermes primitives: Kanban, Cron, Profiles, delivery router, skills. The system stays readable through the same surfaces I already use.

For Dark Factory this matters. When the process is a graph, it can be validated, exported, reused, scheduled, watched through live node telemetry, inspected for pending approvals, retried, and traced after failures. It is no longer “the agent was told to follow the instruction”, but an executable contract.

## Why this brings the factory closer to autonomy

The main weakness of Dark Factory is not that agents write bad code. They make mistakes, of course, but review, tests, and constraints handle that. The main weakness is process control.

If the process lives in a long prompt, it is fragile. An agent can skip a stage, mix roles, forget that implementation must be reviewed by another profile, or start downstream work before upstream has passed review.

A graph solves this more like engineering. Every node has input, output, status, and transition rules. If review fails, downstream does not wake up. If a script step fails, the agent does not pretend everything is fine. If a human is needed, the workflow stops at `human_review` instead of guessing.

This is where O2B and Hermes Workflows become one system:

- workflows run the process;
- Hermes executes tasks through native mechanisms;
- Open Second Brain stores context, preferences, decisions, and run traces;
- the human stays in the loop where it actually matters.

That already looks more like a factory than a set of disconnected AI tricks.

## What is next

The nearest goal is to bring `hermes-workflows` to the point where I can show a real demo: not just a nice graph in a dashboard, but a run that passes through several agent stages, review, branching, memory writes, and result delivery.

Once that becomes stable, Dark Factory will be much closer to the shape I started all this for. Idea in. Process graph. Several agents in different roles. Memory that survives sessions. A human who owns intent and the final decision, not dispatch.

The most interesting part: Dark Factory has already started building itself. Every night it runs a research pass: looks for new ideas to improve Open Second Brain, compares approaches, extracts useful patterns, and creates tasks on the Hermes Kanban board. Then it periodically takes a suitable task scope into implementation, drives it to a PR, and, after my approval, turns it into a release.

Examples are visible in [Open Second Brain GitHub Releases](https://github.com/itechmeat/open-second-brain/releases). Starting with `v1.12.0`, the releases were implemented entirely by Hermes without my participation in the code. I only had to read the generated PR and approve it.

It still sounds a bit loud, but a couple of months ago Open Second Brain was just an empty repository. Now it is a stable plugin that Hermes can choose as its memory.

Let’s see how far this factory can go.
