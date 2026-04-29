---
title: "How I built this blog with coding agents"
description: "The story of launching techmeat.dev: from a spontaneous idea and a set of skills to Astro, Cloudflare Pages, brainstorming, and the first version of the blog."
pubDate: 2026-04-28
tags: [ai-coding, astro, bun]
prNumber: 2
ogImage: "/posters/og/posts/building-techmeat-dev-with-coding-agents.png"
locale: en
---

I used to have a blog. Decent traffic, a clear topic, real personal experience: I wrote about frontend and the things I worked through myself. Then for not-particularly-important reasons I stopped maintaining it, and lost the domain along the way.

For a long time it felt like that story had simply ended. But today I felt like writing again — not about frontend as a profession, but about how I build real projects with coding agents. No abstractions about the future of development, just concrete processes, mistakes, and decisions.

That's how [techmeat.dev](https://techmeat.dev/) came to be.

## Why I started this at all

The idea was spontaneous. I had unused tokens piling up, a few hypotheses I wanted to test, and I decided to put together a small but real project: a blog where the process of building it becomes the first piece of content.

My usual workflow with agents is much more elaborate: several stages of planning, review, and checkpoints. Here I deliberately simplified it. I wanted to see how far you can get if you quickly set the direction, prepare the context, and hand the agent most of the starter work.

This isn't a reference process; it's an experimental version. I'll probably write about the stricter approach separately.

## Preparation: skills, context, and project rules

First I installed the skills I needed. For a project like this it matters more than it seems: "build a blog" is too weak a problem statement. The agent needs clear rules: which technologies to use, where to keep the content, how to think about SEO, how to handle design, what not to do without reason. The starter set is captured in the working file [INIT.md](https://github.com/itechmeat/techmeat-dev/blob/master/docs/INIT.md).

After that I initialized `CLAUDE.md` — the file with the project's base context. The draft itself was in Russian, but I translated it into English right away for the working context, so it would be equally useful across every locale and tool.

```text
This project is empty for now, but I am going to build my blog here. The project will be based on Astro, and posts will be stored as Markdown files. Each article will go through a multi-stage SEO and GEO preparation workflow using the skills available in the project and the geo-optimizer-skill CLI: https://github.com/Auriti-Labs/geo-optimizer-skill, which is already installed.

The blog will be about building projects with AI coding.

The domain has already been chosen and purchased: techmeat.dev.

The project will be hosted on Cloudflare Pages.

The primary language of the blog will be English, but there will also be translations into other languages, at least 10 popular ones. Translation pages must point to the English version of the same article with canonical links.

The project design must be created using the impeccable skill.

All project documentation must be written in English. Draft documentation may be an exception.
```

Then I copied `CLAUDE.md` into `AGENTS.md`. I don't want to tie the project to one specific agent: if tomorrow I continue development in a different tool, the base rules stay next to the code.

## First boot: foundation only

I didn't ask the agent to start with pages or design. At the start I needed a correct technical foundation: an Astro project ready for Cloudflare Pages, with a clean structure and no extra initiative.

The prompt was deliberately narrow:

```text
Let's start developing our blog project. First, use the Astro skills and set up the initial project, preparing it for hosting on Cloudflare Pages. There is no need to build pages or do any additional work right now. Only set up the project.
```

The narrower the first request, the smaller the chance the agent starts "improving" the project where no decision has been made yet. That saves a lot of nerves: I needed a reliable starting point, not a pretty mockup.

## Brainstorming instead of premature design

Next I turned on Superpowers and started brainstorming, deliberately asking it not to discuss design. At this stage I needed to decide what the blog consists of as a product, not what it looks like.

The prompt was:

```text
Let's brainstorm in Russian about what my blog should consist of. Here's how I currently see it:

- All pages should share a unified design, but we are not discussing the design itself yet, only common blocks and similar structural elements. The header should include the techmeat.dev name and a language switcher. To clarify, the brainstorming result should describe what the blog should have, not how it should look.
- The home page should show previews of the 10 latest posts with links to the full posts. Maybe it should include something else too; suggest options.
- There should be an About page: something like a CV, but in a more blog-like form.
- There should be a Contacts page with links to my social profiles and GitHub.
- Maybe some other pages are needed; suggest options.
- This should be a very simple blog, mostly informational. I expect to publish materials often.
```

Brainstorming took about an hour. For a project this small that sounds like a lot, but the time paid off: without it I wouldn't have ended up with a coherent plan and architecture spec. The agent helped me break the blog down into pages, shared blocks, the language model, and the content structure.

The result was two internal artifacts: the [plan](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/plans/2026-04-27-blog-v1.md) for the first version, and the [architecture spec](https://github.com/itechmeat/techmeat-dev/blob/master/docs/superpowers/specs/2026-04-27-blog-architecture-design.md).

## Autonomous development, review, and fixes

After brainstorming, all I had to do was agree with the direction and let the agent work. Most of the base structure appeared autonomously: routes, Markdown content, locales, components, RSS, tags, infrastructure for translations.

It didn't go entirely without manual intervention. I added a few correcting prompts: clarified the set of languages, asked the agent to fix small bugs and tighten details it missed on the first pass.

Then I asked GPT-5.5 to review the resulting code and apply fixes immediately. I barely got involved: the agent found a few useful improvements, applied them, and ran the checks. Honestly, I pretty much vibe-coded this version, which is something I usually try to avoid. Here it was acceptable: the project is small, the cost of error is low, and the whole point was to test the boundaries of this approach.

This is where you can see clearly how I think about AI coding in general. The agent isn't a magical "make me a product" button; it's a very fast executor that needs frames, context, and periodic review. With good frames it offloads a large amount of grunt work. With vague ones it produces uncertainty just as fast.

## Why I deferred design

I deliberately kept design out of the first phase. I have a separate process for the visual side, and I wanted to go through it on its own, without mixing architecture, content, and interface into a single task.

That's why the first version of the blog looks like a technical skeleton: routes, localization, posts, tags, and the publishing infrastructure are already in place, the visual system isn't, and that's fine. Sometimes it's more useful to get a working project first and then calmly think about how it looks and feels.

## What I want to test with this blog

techmeat.dev is a working lab, not just a notes warehouse. I'm interested in how development changes when there's a coding agent next to you all the time: where it speeds up the work, where it creates hidden risks, and where it helps you see a solution you would have reached much later on your own.

Three things in particular hold my attention.

**Process.** Not "the agent wrote the code" but what came before and after: which prompts worked, which constraints I had to set, which decisions are better left to a human.

**Quality.** AI-assisted development easily turns into a stream of patches if you don't keep a plan and reviews. I want to show both the successful results and the places where the agent got it wrong, or where my problem statement wasn't precise enough.

**Repeatability.** If you can't repeat the approach on the next project, it isn't a process — it's a one-time trick. So I'll capture not just the final code but the working schemes too: how the task was framed, which files appeared, which tools were involved, how decisions were made.

## What's next

The next stage is design. The continuation of this post will be exactly about that: how I did it, what decisions I made, what came out of it. Although what it will actually look like, I don't know myself yet.

For now, for the record, let's preserve how the blog looks today:

<iframe loading="lazy" width="560" height="315" src="https://www.youtube.com/embed/eo8KNkGzBBM?si=KVKJ1hHw26kDkmtZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
