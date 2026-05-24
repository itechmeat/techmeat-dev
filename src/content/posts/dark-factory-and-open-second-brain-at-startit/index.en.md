---
title: "Dark Factory and Open Second Brain: autonomous development and the memory it runs on"
description: "A short talk about my two projects — Dark Factory and Open Second Brain. Before the presentation I asked the orchestrator to build a working chat app from scratch — and by the time I started speaking, the deployed site was already live at its URL. Inside: how both projects are wired together and why memory turned out to be a hard requirement, not a nice-to-have."
pubDate: 2026-05-24
locale: en
tags: [dark-factory, open-second-brain, startit, demo, hermes, agents]
draft: true
---

![Me on stage at startit with a projector behind me](./hero.jpg)

The other day I dropped by [startit](https://startit.rs/) for a short talk — to share what I've been working on for the past month. The room was on-topic: builders who ship AI agents themselves, so I didn't have to explain what a context window is or why one model is sometimes not enough for an agent. I could go straight to the point.

And the point right now is two connected projects: **Dark Factory** — autonomous development, and **[Open Second Brain](https://github.com/itechmeat/open-second-brain)** — the memory that holds that autonomy together.

## What I showed

There weren't many slides. The logic is straightforward:

- I'm not building a CoPilot, I'm building a **Dark Factory** — a production line where agents carry a project from idea to release on their own. I bring the idea, then a team of subagents handles the brainstorm, the documents, the design, the plan, the repository, the deploy. I'm doing my own thing in the meantime and only step in for review.
- With that setup you very quickly hit the **memory problem**. The terminal scrollback is not memory. Passing context between sessions is impossible. Reasoning — why an agent made a particular decision — leaks into logs and gets lost.
- So alongside the factory I had to grow **Open Second Brain** — a file-based memory layer for agents. Plain Markdown in an Obsidian-compatible vault: any agent reads it, any agent writes to it, and a human sees everything as normal text notes.
- From there you can build interesting things on top. For instance, an _observing-memory_ layer: subagents notice my preferences as they work, drop them into an inbox, and overnight a separate pass (`dream`) turns recurring observations into rules — which then auto-load at the start of every next session. I stop repeating myself for the twentieth time.

## The demo: a project the agents built in half an hour

Before the presentation I pinged the orchestrator on Telegram with a single sentence — something like "make a parody chat where the AI replies to anything the user says with 'you are absolutely wrong'". Then I went off to prep for the talk.

One prompt, a short brainstorm — the orchestrator asks a few clarifying questions and locks in a plan — and after that the pipeline runs on its own. Status reports start arriving in chat: which stage is running, which subagent picked it up, what review returned. I no longer need to step in along the way.

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/g2m4E5tSpEo" title="Dark Factory: a project in half an hour over Telegram" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Under the hood, during that half hour:

- product-tech-lead broke the idea down into a brainstorm and a spec;
- the architect picked the stack and sketched the outline;
- the designer put together the visual identity and the key screens;
- in parallel, a GitHub repo, systemd units on the VPS, a Caddy route, and a dedicated subdomain were created;
- the fullstack engineer implemented the frontend and backend, QA ran the tests, devops drove it to a green deploy.

All of this rides the same kanban-board pipeline with review between stages that I walked through in detail [in the previous post](/posts/how-i-built-the-first-dark-fabric-workflow/): 13 cards, at most two rounds on each review, different subagents on the producing and review stages.

By the time I walked on stage, the deployed site was already live at **[you-absolutely-wrong.techmeat.dev](https://you-absolutely-wrong.techmeat.dev/)** — a chat where the assistant explains, with absolute confidence, that you are wrong, whatever you write. Inside: React + Vite on the frontend, Hono on Node.js on the backend, SQLite for sessions, DeepSeek-v4 via OpenCode as the model. A real project, not a landing page.

<figure style="max-width: 479px; margin-inline: auto;">

![Screenshot of you-absolutely-wrong.techmeat.dev in action](./demo.png)

</figure>

## What's next

The factory currently has two workflows running — `new-project` (the same one I covered in the [previous post](/posts/how-i-built-the-first-dark-fabric-workflow/)) and `new-feature`, which takes an existing project with its documents and ships the next feature to production. Next up are `validate-idea` for testing hypotheses and `bugfix`: triage, repro, fix, verification, ship.

Once those four loops run end-to-end reliably, I'll open everything as open source. Open Second Brain is already [open](https://github.com/itechmeat/open-second-brain) and evolving in public.

Thanks to the folks at startit for the venue and for the questions after the talk — some of them went straight into my backlog. If you want to follow how the factory comes together from here, I keep a running log on [X](https://x.com/techmeat).
