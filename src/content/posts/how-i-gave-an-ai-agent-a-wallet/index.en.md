---
title: "How I gave my AI agent a wallet — and why it immediately needed a memory"
description: "open-second-brain 0.8.0 and Pay Memory: how I let an agent pay for external APIs through pay.sh, and why the key part turned out to be not the payment itself but a clear record of every cent spent."
pubDate: 2026-05-10
locale: en
tags: [pay-memory, agent-payments, pay-sh, solana, second-brain]
ogImage: "/posters/og/posts/how-i-gave-an-ai-agent-a-wallet.png"
---

A few days ago I shipped [open-second-brain](/posts/how-i-built-open-second-brain/) — a file-based memory layer for AI agents. Ever since, one idea has been nagging at me. If an agent runs on a VPS, on its own schedule, through Telegram — sooner or later it'll need to spend money. Buy an API call. Generate an illustration. Hit a paid search.

The payment itself is a solved problem. [pay.sh](https://pay.sh) wraps an ordinary HTTP call into a paid one via USDC micropayments on Solana. The agent runs curl through `pay`, the wallet signs the transaction, the other side returns a response. Done.

But "done" is only half the story.

## Chaos with a wallet

Picture this: the agent is working on a task, makes a handful of decisions along the way, two of which are paid calls. An hour later you open the terminal and the scrollback has already flown off the screen. Somewhere up there were `pay` invocations, somewhere tx signatures arrived, somewhere JSON responses came back.

Why did the agent do this? On what grounds? How much did it expect to spend? How much actually got debited? Where's the result?

If you want to trust the agent with anything autonomous, "read the scrollback" doesn't cut it. A terminal log isn't structured, isn't linked to the task, isn't indexable, doesn't survive a restart, and you can't open it in Obsidian as a normal artifact.

I figured out pretty quickly that the task wasn't "teach the agent to pay" — it was "make sure every payment leaves behind a meaningful trace."

And open-second-brain fit perfectly here.

## Pay Memory

In version 0.8.0, OSB got a new layer — **Pay Memory**. In short: memory for money.

After every paid action, a plain Markdown file appears in the vault with these fields:

- **why** the agent decided to pay;
- **which service** was called;
- **which spending policy** applied and what it decided (`allowed` / `approval_required` / `denied` / `not_checked`);
- **expected cost** and **actual amount debited**;
- **payment proof** — the specific Solana signature you can open in Solscan and verify;
- **the result** — a link to a separate asset note with the output;
- **who approved**, if the policy required it.

It's not a SQLite table and it's not a dashboard. It's plain Markdown sitting in the same folder where the agent writes its daily log. You can open it with your eyes, comment on it, commit it to Git, later grep for it, or show it as proof.

OSB doesn't become a payment system here — it doesn't hold a wallet, doesn't sign transactions, doesn't do enforcement. It does what it's good at: it keeps an honest, human-readable memory. pay.sh gives the agent access to paid resources; Pay Memory gives the human the ability to open the vault a week later and calmly understand what happened.

## One principle that turned out to matter more than the rest

When I reviewed the draft implementation, my eye immediately caught one detail: the receipt was always writing "Allowed by the configured spending policy" — even when no policy existed in the vault at all.

Sounds like a small thing. In reality, it kills the whole point.

Pay Memory is an audit layer. An audit layer is valuable exactly as much as it's honest. The moment the receipt starts telling a pretty story instead of the real one, everything falls apart. So the rule turned out simple: better to write `not_checked` than to confidently log `allowed` falsely. If the policy wasn't checked — say so. If the policy returned `denied` but a human pushed the call through manually — say that too.

The temptation of a "good narrative" is the main enemy of an audit system. And that's probably the most important lesson of the day — one I plan to carry over into other parts of the project.

## A real payment in production

By the end of the day, all of this needed to be checked not on sandbox fixtures but on real money. I sent ten cents of USDC to a fresh Solana wallet and asked the agent to find three cafés in Belgrade via Google Places.

A second later, three real places came back — Artist Specialty Coffee, Dusha, DRIP. Tx finalised on mainnet, $0.001 USDC, balance moved from 0.10 to 0.099. Signature in Solscan, clickable.

And then the whole Pay Memory chain kicked in: a receipt with the real signature in the vault, a separate asset note with the three cafés, a daily payment report, and a short entry in Daily with links to both files. I can open the vault in Obsidian, click on the proof, see the actual payment in the explorer, and right next to it — a clear, human-language story of why the agent did it.

## Why all of this

I'm not trying to build enterprise compliance for myself or blockchain-for-everything. The architecture itself is embarrassingly simple — a set of Markdown files in the right folders.

But the idea behind it matters.

If an agent works more and more autonomously, its memory needs to cover not only textual actions but actions with consequences too: calling an external service, spending money, creating an asset, requesting approval. Payment is just the most vivid example, because the question of trust shows up immediately. The same principles translate easily to publishing a post, sending an email, deploying, ordering a generation, an on-chain operation.

Short version:

> pay.sh gives the agent access to paid resources.
> Pay Memory gives the human the ability to understand, a week later, why the agent used that access.

If the agent just spends money — that's a risk. If the agent spends money and leaves an honest, linked, human-readable trail — that's already a workflow you can slowly start trusting.

Pay Memory shipped as part of [open-second-brain 0.8.0](https://github.com/itechmeat/open-second-brain/releases/tag/v0.8.0).
