---
title: "How I Built OpenSecondBrain"
description: "The story of open-second-brain: how Hermes on a VPS, Obsidian, MCP, CLI, and several agent runtimes came together into a small file-based memory for AI agents."
pubDate: 2026-05-09
locale: en
tags: [second-brain, dark-fabric, hermes, openclaw, claude-code, codex]
ogImage: "/posters/og/posts/building-techmeat-dev-with-coding-agents.png"
prFileId: f0d6ac5f8c4cc74a943975e6edc488faaedfea790c1f43c4bf19319d9f4021b8
---

I've been actively using various AI tools for a long time now, but at some point it became clear: I wasn't just using them — I had almost completely "wrapped" myself in agents and everything AI-related.

For several months, agents have been writing code according to my workflows: planning, implementation, review, fixes, re-verification. It works, but the process has a strange manual tail. Even when an agent writes the code, I still have to move tasks between stages, transfer context, remind them of the rules, run checks, and make sure the next executor understands what has already happened.

There was too much repetitive work. So the next natural step wasn't another feature, but automating the workflow itself.

That's how [OpenSecondBrain](https://github.com/itechmeat/open-second-brain) came to be — an attempt to give agents proper memory about what we're doing, why we're doing it, and what decisions have already been made.

## From Manual Workflows to Dark Fabric

In [the first post](/posts/building-techmeat-dev-with-coding-agents/), I wrote about launching this blog with coding agents. The workflow there was deliberately simple: set the context, build an Astro project, go through the design, add posts, verify the result.

But my usual process is more complex. It has roles, intermediate reviews, separate agents for different task types, and quality control at every step. When there are many such tasks, the human turns into a dispatcher: move the context here, ask that one to check this, give the next agent the output from the previous one, don't forget to record the decision.

I wanted to arrive at a more rigid model that increasingly sounds like Dark Fabric: a feature idea goes in, a feature comes out — implemented, tested, and deployed. Not "an agent wrote a piece of code," but a factory that knows how to break down work into stages and carry it through the process.

We're still far from a full Dark Fabric. But the first practical step already exists: Hermes, running on a VPS, with agents for different tasks, skills, a Telegram interface, and cheap model routing through OmniRoute.

And almost immediately, the second mandatory component of this factory became apparent: agents need memory.

## Why an Agent Needs a Second Brain

If an agent works for a single session, you can just put the context in the prompt. If an agent works on a project for weeks, that's not enough.

It needs to know:

- what rules have already been adopted in the project;
- what decisions were discussed and why those particular ones were chosen;
- what facts surfaced during investigations;
- what artifacts have already been created;
- which agents participated in the work;
- where the human knowledge base is, and where the agents' utility area is.

And most importantly — this shouldn't depend solely on "model memory." I need a simple, verifiable, file-based knowledge system that I can open by hand, read in Obsidian, sync, commit partially, or not commit at all.

That's why open-second-brain from the very beginning turned out not to be "yet another chatbot with memory," but a small infrastructure around a Markdown vault.

## Why Obsidian and Markdown

Choosing an Obsidian-compatible vault was almost obvious.

First, these are ordinary Markdown files. No magic, no proprietary database, no dependency on a specific service. If an agent writes something, I can open the file and see the result.

Second, Obsidian already handles the human side of a Second Brain well: notes, wikilinks, Daily Notes, manual navigation, the graph, search. There was no point in building my own knowledge interface when there's a familiar tool.

Third, agents don't need all of Obsidian. They need deterministic operations: create a utility structure, add an event to the daily log, build a page index, check vault health, export the config without secrets. All of this can be done through CLI and MCP, without forcing the model to "think" about file operations where it's better to execute a precise command.

Currently, open-second-brain creates an agent area `AI Wiki/` in the vault, maintains daily logs in `Daily/*.md`, can update a Markdown index, check configuration, and doesn't touch human notes above the utility section `## Raw events`.

## I Gave an Empty Repository — the Agent Chose the Architecture

The most interesting part: I didn't sit down to design all this as a classic library API. I gave the agent links to popular implementations, an empty repository, and a task: make a universal plugin, primarily for Hermes, but so that other agents could pick it up too.

The first commit was purely documentary: a README and project bootstrap on May 6th. Then the agent quickly built up a CLI foundation, the `o2b` command, init/doctor, vault primitives, and an index. That same day, an MCP server appeared — an important layer, because through MCP different runtimes can get the same tools without manual command-line parsing.

The first versions were very practical: make it so that Hermes could install the plugin, spin up a vault, check the status, and write events. Not a perfect architecture on paper, but a working minimal memory for a real agent.

Then the project started evolving under the pressure of integrations.

## From Hermes to a Universal Plugin

Hermes remained the primary runtime. That's what the project was designed for: install a plugin, point to a vault, give the agent tools, and make it write important events to the Second Brain.

But it quickly became clear that tying everything only to Hermes was wrong. I already had different agents and different environments: Claude Code, Codex, OpenClaw. If the Second Brain is supposed to be a shared memory, it can't live in just one client.

So adapters and manifests for several runtimes appeared in the project:

- Hermes as the main installation scenario;
- Claude Code through a marketplace manifest and MCP;
- Codex through its own marketplace manifest and MCP;
- OpenClaw first through a JS adapter, then through a full native plugin entry;
- a generic MCP contract for runtimes that will appear later.

This is an important architectural decision: there should be one core, but there can be multiple entry points. Agents don't need to argue about where the truth is. The truth is in the vault and in the shared set of operations.

## What Had to Be Fixed Along the Way

open-second-brain evolved very quickly: from May 6th to 9th, the project went from a README to version `0.7.0`. And almost every version was not "cosmetics," but a reaction to a real integration problem.

For example, OpenClaw first got native plugin compatibility, but the runtime turned out to be stricter than expected. We had to add `name` inside tool objects, make `register()` synchronous, and then rewrite the OpenClaw plugin to pure JavaScript without `child_process`, because the security scanner blocked subprocesses.

The next big topic was identity. If the diary just says `@agent`, such a log is almost useless. So in `0.6.0`, a workflow with agent names appeared: `o2b init --agent-name`, registration in `AI Wiki/identity/agents.md`, and verification that Daily entries get a proper `@agent-name` instead of a placeholder.

Then came timezone support, protection against writing to the wrong vault, marketplace manifests for Claude and Codex, auto-instructions for MCP, normalization of empty arguments, install flow verification, multi-agent registry. None of this sounds like a heroic product feature, but these are exactly the details that distinguish a toy from a tool you can leave running on a server.

## Version 0.7.0: One Core in TypeScript and Bun

The biggest change happened in `0.7.0`: the project migrated to a unified TypeScript core on Bun.

Before that, the repository had parallel logic: a Python implementation for CLI/MCP, a JavaScript part for OpenClaw, a Hermes shim. This kind of scheme starts drifting quickly. Fixed a bug in one place — no guarantee you fixed it in another. Added timezone support in Python — better not forget to repeat it in JS.

In `0.7.0`, the agent removed the duplication: Hermes, Claude Code, Codex, and OpenClaw now consume shared modules from `src/core/`. The CLI lives in `src/cli/`, MCP in `src/mcp/`, and the OpenClaw entry is compiled from TypeScript to a JS bundle via `bun build`.

Along the way, a proper test suite appeared: `bun:test` with 176 cases, Python shim tests, a concurrent append-event test with 12 processes, bundle freshness checks, and version synchronization checks in manifests.

This is exactly the moment where the advantage of an agent workflow is visible. It's unpleasant for a human to manually migrate the same code between runtimes and rewrite tests. For an agent — it's fine, as long as you give it a clear goal, constraints, and result verification.

## How It Lives on a VPS

This whole story runs on an ordinary VPS for about $8 a month. Hermes lives there too, development happens there, AI subscriptions are managed there, and model routing runs through OmniRoute.

For me, this is an important part of the experiment. I don't want AI-assisted workflows to require separate expensive infrastructure. I need a server, a browser, Telegram as an agent interface, git repositories nearby, and cheap access to models.

The result is a rather strange but working picture: I can write to the agent in Telegram from my phone, it'll parse the task on the VPS, go to the repository, use the necessary skills, create an artifact, run checks, and write an important event to the Second Brain.

This isn't Dark Fabric yet. But it's also not just "chatting with a model."

## What Came Out

As of this draft, open-second-brain is a small but already useful memory layer for agent-based development.

It can:

- initialize an Obsidian-compatible vault for agent work;
- create `AI Wiki/` and utility pages;
- write daily events in Markdown;
- store agent identities;
- account for the user's timezone, not just server time;
- check vault, config, and runtime manifest health;
- export configuration with sensitive values redacted;
- work through CLI, MCP, and runtime adapters;
- support Hermes, Claude Code, Codex, and OpenClaw from a single repository.

The most valuable thing isn't even the list of commands. What's valuable is that agents now have a shared memory protocol: when something durable happens — code, a fix, a config change, content, a research finding, a design decision — it needs to be recorded so that future-me and future-agent can find it later.

## What's Next

The nearest goal is to bring the Hermes + open-second-brain combination to a state where the agent doesn't just write events, but actually uses accumulated memory during planning and review.

Beyond that, I want to:

- better connect Daily logs with wiki pages;
- add more useful search and summaries of project history;
- write a separate post about how exactly Hermes works on the VPS and how communication through Telegram is set up;
- transform current workflows into a more autonomous Dark Fabric;
- test whether different agents can share a single vault without pain and without breaking each other's context.

The main takeaway so far is simple: agents need not just a model and not just access to a repository. They need an environment where decisions, facts, and events become a durable part of the process.

[open-second-brain](https://github.com/itechmeat/open-second-brain) is my first working step in that direction.

## How This Post Was Written

Sorry, but this post was also written by the same Hermes agent. Only this paragraph and my [Facebook post](https://www.facebook.com/reel/1355271143340726/) were written by hand. I simply asked the agent to clone my blog as a regular project, look at the commit history, and use the Facebook post as a base. And of course, I reread and edited the text before publishing. And don't tell me it has no soul — I pour my soul into the agent.
