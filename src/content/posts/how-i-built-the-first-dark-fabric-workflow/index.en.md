---
title: "How I Built the First Dark Factory Workflow"
description: "Hermes on a VPS, a kanban graph of 13 tasks, reviews between stages on different profiles, a mini-brainstorm with a human over Telegram, and a bare-HTML deploy at the end. The first working Dark Factory stack — survived several debug runs and now ships through every stage without manual dispatching."
pubDate: 2026-05-17
locale: en
tags: [dark-factory, hermes, kanban, workflow, claude-code, codex]
ogImage: "/posters/og/posts/how-i-built-the-first-dark-fabric-workflow.png"
prFileId: e52425e3a87db49774573985a8c00ac3507c4d5cab4b71e90843e2fefbe65422
---

In my [previous post](/en/posts/how-i-built-open-second-brain/) I wrote about OpenSecondBrain — the memory layer AI agents rely on. Memory is only half the story. The other half is the process itself: who does what, who reviews whom, what counts as "done", and how all of it kicks off with a single phrase in chat.

Today I launched the first working version: the `new-project` workflow. I bring an idea to Telegram, and what comes out is a fully scaffolded project with documents, design, plan, and a real public page.

## How it looks from the outside

I bring an idea. For example: "I need a one-pager landing for my small studio."

Then I answer short rounds of targeted questions. First, the brainstorm itself: who's the audience, what should be emphasized, what stack do I prefer, how should it feel. Then, along each stage, a couple more short sessions of 4–5 questions each — whatever the author of the current document is missing so they don't have to make things up.

Everything else the factory does. I can get on with my own work in the meantime.

## A kanban board with live cards

The most visible part of all this is the kanban board. When I say "yes" to the final plan, the orchestrator creates 13 cards on it in a single pass, one for each stage of work. From there, everything happens in front of my eyes.

The cards move on their own. The first one lights up, gets a `running` flag, and I know one of the subagents has picked it up. A few minutes later it slides into `done`, and the next one lights up. Between every producing stage stands a review card, and a different subagent must claim it: the one who wrote the document never reviews their own work.

Sometimes the review fails. Then the review card goes `blocked`, a new fix-task appears next to it for the same author, and the entire downstream sits and waits. Once the author finishes the fix and closes it, the review wakes up and reads the artifact again. It might pass. It might send it back. Maximum two rounds, then it escalates to me.

In the end I watch the board almost like a package tracker: now they're assembling, now they're packing, now they're shipping. Except it's not a courier — it's several subagents simultaneously working on different parts of my project.

## What comes out

By the end of the process I have:

- a structured `about.md` capturing the essence of the idea;
- `specs.md` with functional and non-functional requirements;
- `architecture.md` with the technical outline;
- `plan.md` with a phased roadmap to MVP;
- `DESIGN.md` with visual identity, tokens, typography, and key screens;
- a dedicated GitHub repository for the project containing all of these files;
- a deployed public page at the `<slug>.techmeat.dev` subdomain, currently serving the simplest possible HTML that mirrors `about.md`. It's a promise that the project exists and is reachable.

Implementing the actual feature is the job of a different workflow, the next one. The goal of this first one is to get an idea to the state of "everything is described, everything is agreed, the project has its own address". After that you can hire the factory for the actual development.

## What was hard

I did several debug runs. Each one surfaced its own funny bug: a subagent would try to tidy up its own working directory and kill its own shell session; or it would start implementing the feature mid-stage even though implementation isn't part of this workflow and belongs to the next one. Between runs I'd patch the skill and restart. The cycle now runs cleanly from start to finish.

## Along the way, memory grew too

In the last post I promised that [OpenSecondBrain](https://github.com/itechmeat/open-second-brain) was half the story. Since then this half has matured considerably, and for the factory itself this matters.

The main change is that OpenSecondBrain now has an "observational memory" layer. I used to write into it manually, like a diary. Now the subagents pick up my preferences on the fly (things like "commits are written in the imperative" or "don't use internal abbreviations without context"), drop the notes into an inbox, and once a day a Hermes agent runs `dream` — a background pass that promotes recurring observations into rules. Those rules auto-load at the start of every next session, and I no longer have to repeat myself twenty times.

Plus: full-text search across the entire OpenSecondBrain knowledge base, backup and rollback before every `dream` pass, a separate layer recording each paid operation (what was paid, why, what it's tied to), and machine-enforced protection against one agent accidentally clobbering another's rules. All of this is what makes the factory possible: when a subagent writes `DESIGN.md`, it already sees my accumulated preferences about typography and interface. I dropped them in chat once, OpenSecondBrain pinned them, and now they ride along into every new project without any reminders.

## What's next

`new-project` is only the bootstrap. Next comes `new-feature`, a workflow that takes an existing project with its documents and ships the next feature to production. And a third one, `bugfix`: triage, repro, fix, verify, ship. Together these three playbooks are my version of Dark Factory for one person: I bring an idea or a bug report, and what comes out is a working feature.

Full factory mode is still ahead. But the first piece is built and runs stably.

Publishing this as open source is too early: at this stage it's more research than a finished product. Once the full project-building process runs reliably, I'll open everything up. Follow me on [X](https://x.com/techmeat).
