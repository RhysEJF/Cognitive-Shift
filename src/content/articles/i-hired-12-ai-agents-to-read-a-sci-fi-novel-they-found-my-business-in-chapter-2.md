---
title: I Hired 12 AI Agents to Read a Sci-Fi Novel. They Found My Business in Chapter 2.
excerpt: >-
  I pointed 12 AI agents at Accelerando, the canonical post-scarcity novel, and they extracted 230 structured business ideas in seven minutes. One of them was my current product. I didn't read the novel - I just made hot chocolate while parallel agents read 289 pages simultaneously.
authors:
  - rhys-fisher
publication: let-them-run
publishedAt: 2026-04-23
tags:
  - ai-agent-orchestration
  - parallel-processing
  - claude-code
  - accelerando
  - post-scarcity
  - idea-extraction
  - flow-os
  - agent-swarms
draft: true
---

It's 9pm. I'm staring at row 21 of a spreadsheet.

The row says "Distributed software agent collective (metacortex), a cloud of software agents that surrounds him in netspace, borrowing CPU cycles from convenient processors, spawning new agents to research new experiences, and at night, they return to roost and share their knowledge."

That's Flow OS.

Or at least one of the things I've been using it for the last months. 

Except the row doesn't come from my notes, or my pitch deck, or one of my client calls.

It comes from a Charles Stross novel written in 2005.

And I didn't read the novel. Twelve AI agents did. In seven minutes. While I made a hot chocolate. (I am listening to it)

## Why I pointed AI at a sci-fi novel

Accelerando is the book that gave me Manfred Macx uploading lobster neural patterns so crustaceans could migrate to the asteroid belt as autonomous economic agents. It's the canonical post-scarcity novel (nine interconnected chapters covering IP law gone feral, reputation economies, the singularity, corporate-grade legal personhood for uplifted animals, and what happens when attention is the only scarce resource left.

It's 289 pages. It's idea-dense in a way that makes your brain hurt. Stross crams a serious business idea into nearly every paragraph, often as a throwaway aside.

Here's the thing. If you're building in AI right now, post-scarcity thinking is a goldmine. Not because the scenarios are going to happen tomorrow, but because Stross already walked the mental road of "what does commerce look like when attention, reputation, and compute have flipped what's scarce?" (which is exactly the road I'm about to walk in real life.

So yeah. I wanted to review the ideas. I did not want to re-read 289 pages to get them.

The old way to do this, read the book with a highlighter. Keep a notebook. Go back and transcribe your highlights. Maybe twelve hours of work. Maybe twenty. By the time you finish chapter 9, you've forgotten chapter 2.

The new way, spin up twelve AI agents and let them read it in parallel.

## The pipeline. 12 agents, one message, 289 pages

Here's what I actually did.

1. I wrote ONE prompt template. It said, extract every futuristic technology, product, market, or societal shift. Fill a 24-column schema. Use "unclear" if the book doesn't say (never invent. Quote verbatim.

2. I mapped the book into 12 chunks. Nine chapters. Three of them were long, so I split those in half. Each chunk ~18-25 pages.

3. I spawned all 12 agents in a single message. One Agent call per chunk. run_in_background, true. Each agent got a 10-line brief pointing to the shared template, plus its assigned pages and output file path.

4. I waited two minutes. The agents read their chunks in parallel and wrote their findings to chunk-specific JSON files. No orchestrator overhead. No sequential queuing. Twelve minds reading twelve different slices of the book at the same time.

5. I merged the results into one CSV. Deduped on product + chapter. Sorted by book order. Wrote 394KB of structured ideas.

6. I verified every single row. Not a 5-sample spot check (every one of the 230 extracted quotes string-matched against the source PDF. 97% verified, 3% were honest inference flagged by the agent itself.

Total wall clock, seven minutes.

Two minutes of agents reading. Five minutes of me writing the merger and running the verification sweep.

I keep having to stop and check the timestamps because it doesn't feel real.

## What 230 structured business ideas actually looks like

Let me show you three of the ideas the agents pulled out. Every one of these has a verbatim Stross quote, a page number, a category, a time horizon, a target customer, a business model hint, a moat type, a regulatory-friction score, and eighteen other fields.

### Idea #1. Uplifted-crustacean economic agents (Ch1, p22)

Quote "Panulirus interruptus uploads. Something tells me you might have heard of it?"

What Stross describes. Scan the neural connectome of a lobster. Run it as software. Grant it corporate-grade legal personhood. Dispatch the uplifted lobster-minds to the asteroid belt as cheap, expendable workers for hostile environments.

What the agent extracted:
- Problem, cheap cognition for hostile environments without the ethics overhead of human labour
- Target customer, asteroid mining concerns, deep-sea operators, hostile-environment industrial firms
- Business model, sell labour-hours of agent collectives, or licence the scanning IP
- Moat. IP on scanning methodology + regulatory (first to win a personhood ruling)
- Time horizon, far
- Adjacent ideas, uplifted-rodent micro-task pools, pet-consciousness preservation services, non-human voting blocs

Is any of this a venture I'm going to build next quarter? No. But the adjacent ideas column (pet consciousness preservation, non-human voting blocs (those are a rabbit hole worth an afternoon. And the agent surfaced them unprompted, because I told it to capture three spin-offs per row.

### Idea #2. The metacortex (Ch2, p30) (aka the thing I'm already building

Quote "The metacortex (a distributed cloud of software agents that surrounds him in netspace, borrowing CPU cycles from convenient processors... spawning new agents to research new experiences, and at night, they return to roost and share their knowledge."

Time horizon the agent assigned, mid (5-15 years).

Stross wrote this in 2004. I'm building it right now.

The agent classified it as "SaaS for agent management; licensing of agent architectures; compute reselling." That's three of the five revenue lines on my Flow OS deck. The adjacent ideas field lists "agent-as-a-service marketplace, agent insurance/reliability guarantees, agent consciousness metrics." Two of those are on my Q3 roadmap.

I didn't read this chapter before I started building Flow OS. I've read Accelerando twice in my life but not since 2018. The fact that my current product is a 20-year-old sci-fi gag is either extremely validating or mildly terrifying, and I haven't decided which.

### Idea #3. Patent-jurisdiction-shopping service (Ch1, p8)

Quote "He's the guy who patented the business practice of moving your e-business somewhere with a slack intellectual property regime."

Time horizon, near (0-5 years). Business model, consulting fees + percentage of savings. Regulatory friction, high (obviously).

This is a post-scarcity IP idea masquerading as a near-term venture, and it's the kind of thing that would never occur to me sitting in a café (but sitting in Stross's head in 2005, it was a throwaway character detail on page 8. The agent caught it, structured it, and filed it under Finance / IP / Governance with a note about tax-exile adjacency.

This is the thing I came to this book for. Stross's post-scarcity brain pre-thinks the weird IP contortions I'm about to live through. The agents pulled 17 more finance-and-IP-adjacent ideas just from chapters 1-3.

## The full sheet

230 ideas. 24 columns each. Five thousand, five hundred, and twenty data points extracted from a single novel in seven minutes.

👉 [Link to the Google Sheet (coming]

Every row has the verbatim quote. Every row is traceable to a page. Every row has a confidence flag, explicit (Stross literally describes it), inferred (Stross implies it), or speculative (the agent stretched (kept because loose-net beats missing a gem).

Top categories by volume. Governance (34 ideas), Space economy (21), Finance (17), Identity (16), AI agents (14), Mind uploading (14). The book is dense.

I can now grep this sheet for "near-term venture with a reputation-economy moat and high regulatory friction" and get a shortlist. Stross already did the creative lift. The agents did the extraction lift. My job is curation (which is the only job I actually want.

## Why this changes how I read

Here's the shift that's keeping me up.

AI doesn't just read faster. It reads in parallel.

A human reader is single-threaded. You open a book at page 1, you close it at page 289, and everything in between is sequential. Your memory of chapter 2 decays by the time you hit chapter 7. Your note-taking is lossy. Your ability to notice that "this idea on page 30 is adjacent to the idea on page 193" degrades with every chapter that passes.

Twelve agents reading twelve chunks don't have that problem. Each one has a full, fresh context window focused on its 20 pages. None of them forget. The synthesis (looking across chapters (happens at CSV-merge time, not inside one exhausted reader's head.

And once the book is in a CSV, it stays in a CSV. Next month when I'm planning a new venture, I grep for "governance + near-term + low capital intensity" and Stross's brain is still available to me. The book becomes a queryable idea database. Each book I process compounds into the next project.

This is the second shift. AI doesn't just automate (it accumulates. I've now built one reusable pipeline (the parallel extraction prompt, the merger script, the verification sweep) that works on any long-form text. The next book takes seven minutes. The one after that takes seven minutes. In a year I'll have thirty books of structured ideas, all cross-searchable, all traceable to verbatim quotes with page numbers.

I'm not a better reader than I was last week. I have a better reading system.

## The capability most people miss

Here's the thing. most people don't know about Claude Code (or any agentic AI tool).

You can spawn N sub-agents in a single message and they run in parallel.

Not "ask Claude to do N things sequentially." Not "open N chat tabs." Parallel sub-agent spawning (one orchestrator, N workers, one wall-clock cost instead of N.

Almost nobody uses this. Most people use AI like a single-threaded colleague, one prompt, one response, wait, next prompt. That's like hiring a brilliant consultant and making them do every task one at a time with no team.

The shift isn't "AI is a tool." It's "AI is a workforce you can instance on demand." When you need 12 parallel readers, you spawn 12. When you need 50 synthetic persona interviews, you spawn 50. When you need 200 code-review agents to audit a repo, you spawn 200. The marginal cost of the 12th agent vs the 1st agent is negligible.

If you're still using Claude or ChatGPT as a one-prompt-at-a-time assistant, you are leaving about 90% of the tool on the floor.

## Try this yourself

Pick a reference book you've always meant to read properly but never will. A Stross novel. A 400-page industry report. A decade of your competitor's blog posts downloaded into one PDF.

Write ONE extraction prompt template describing what you want to pull out of it and the schema for each row.

Split the book into 20-page chunks.

Spawn one agent per chunk in a single message. run_in_background, true. Each agent gets the template plus its chunk pages plus its output file path.

Wait the two minutes.

Merge. Verify. Query.

The book you've been meaning to read for five years becomes a structured database tonight.

The question isn't whether AI can read a book.

It's whether your AI can read twelve chapters at once while you make coffee.