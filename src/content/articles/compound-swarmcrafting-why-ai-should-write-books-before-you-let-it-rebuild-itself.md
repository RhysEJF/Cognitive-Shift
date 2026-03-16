---
title: >-
  Compound Swarmcrafting: Why AI Should Write Books Before You Let It Rebuild
  Itself
excerpt: >-
  I let 86 AI agents write a book about swarm intelligence, then fed the book
  back to the swarm as its own upgrade plan, and it worked. 
authors:
  - rhys-fisher
publication: let-them-run
publishedAt: 2026-03-16
tags:
  - wiggum-loop
  - swarms
  - AI agent orchestration
  - 'AI Harness Engineering '
draft: false
---
When I was 16, I fell in love with falconry after an afternoon walking a field with a Harris hawk on my arm, hunting rabbits with a group of falconers.

I wanted my own bird. Not a hawk. A falcon. I'd watched videos of people spinning lures while falcons dove past at speed, and I wanted that spectacle. What I didn't realise was that I'd picked one of the hardest birds to start with. Falcons are light and unforgiving. Get the weight wrong by a few grams and you're on an eight-hour bike ride chasing it across the countryside.

So before I got the bird, I spent every spare moment with the one guy I knew who understood falconry, interviewing him for hours, draining everything he'd learned over years. He put up with it because I was the only person in his life who treated his obsession as fascinating rather than a weird quirk.

When I finally got the falcon, it worked. Not cleanly. There were the bike rides, and one freezing morning where I had to emergency-feed it with an earbud because I'd miscalculated the cold. But the bird flew, came back, and eventually grew strong enough to release into the wild.

The principle was simple: squeeze out every drop of knowledge before you commit to the hard part.

This is exactly how I point AI swarms at some problems. Before I let a swarm rebuild Flow, my homegrown workforce manager, I made it write a book first. Swarm Intelligence. Not as a creative exercise. As a strategic extraction.

I'm pulling latent knowledge out of the models across domains, synthesising it into frameworks that don't exist yet. Then I feed those frameworks back to the swarm to perform audits. Upgrade plans fall out the other end.

I call it compound swarmcrafting. I used to build Flow 2.0. And books now take hours to generate not days. \
\
Here's how it works.

## **The Forward Deployed Swarm**

I've written in detail about [how 86 AI agents wrote a 54,000-word tactical field guide while I slept](https://thecognitiveshift.com/publications/let-them-run/swarm-intelligence-the-book-86-ai-agents-wrote-while-i-slept/). I won't retell that story here. What I want to talk about is what made it work, because that's what makes compound swarmcrafting possible.

The approach came down to sequencing. Before a single word of the book was written, I had the swarm do three things first.

1. ...invent a framework
1. ...conduct deep research across six domains I curated
1. ...synthesise everything into a knowledge base.

Only then did writing begin.

The framework step is the most consequential. I gave the swarm a rambling description of what I wanted, something connecting swarm biology, military doctrine, competitive gaming, multi-agent systems, business strategy, and complexity science. From that, Flow's planning pipeline generated a task with one critical instruction:

```
....design "a memorable strategic framework, analogous to OODA, that organizes all content into 5-7 chapters. Each letter maps to a strategic domain. The framework name should be memorable, tactical, and capture the essence of winning through swarm intelligence." 
```

A single worker picked that up and produced the SWARMS framework. Sense, Wage, Adapt, Replicate, Mobilize, Sustain, a six-dimension model it synthesised from the intersections between all six research domains.

With the framework as the spine, 40+ research tasks ran sequentially accross all six domains, each producing a standalone evidence document. A synthesis phase mapped research to framework, identified gaps, ran structured debates on conflicting evidence. Only then did the writing wave begin, skeleton drafts, triple reviews, final rewrites, assembly.

The result was a book that people are actually reading.

> "*The book gets it*" – Shaun Thresher \
\
"*What I've read is really, really good, great job*" – Damian Nomura's

That credibility matters, because the entire compound swarmcrafting pattern depends on the forward swarm producing something genuinely useful, not AI slop, but real cross-domain synthesis that surfaces knowledge the models had but I didn't. Bringing my blind spots into light.

After the project, I codified the methodology into a [reusable skill](https://github.com/RhysEJF/cognitive-shift-resources/blob/main/skills/field-guide-factory.md), so any future Field Guide follows the same proven wave structure. But the book itself produced something even more valuable than a methodology. It produced a framework I could point back at my own system.

## **Letting The Swarm Audit Its Own** Orchestration Layer

Here's where compound swarmcrafting diverges from normal AI workflows.

Most people would take the book, [publish it](https://leanpub.com/agentic-swarms-tactical-field-guide), and move on. I did something different. I turned the book's framework into [a reusable scoring skill](https://github.com/RhysEJF/cognitive-shift-resources/blob/main/skills/swarms-assessment.md), a markdown file that any AI agent can consume, and pointed it back at the system that wrote it.

The SWARMS assessment skill scores any idea or system across those six dimensions on a 1–5 scale, checks alignment against ten universal principles the book identified, and produces a prioritised audit report. I'm sharing this skill so anyone can run the same assessment against their own systems. (*if you improve it, please dm me for repo write permissions)*

I ran it against Flow itself, along with a set of integration briefs I'd generated by pointing a [separate analysis skill](https://github.com/RhysEJF/cognitive-shift-resources/blob/main/skills/analyze-repo.md) at repos I'd been tracking in the community, Paperclip, Compound Engineering, Claude Code's Agent Teams. That skill surfaces overlaps and opportunities for integration, and the briefs it produces became improvement ideas. Everything scored and ranked across all six dimensions. You can read the [full audit report here](https://github.com/RhysEJF/cognitive-shift-resources/blob/main/examples/swarms-assessment-flow-1.0-report.md).\
\
![](Screenshot_2026-03-11_at_13.11.09.PNG)

The results mapped directly to frustrations I'd been feeling but hadn't connected. Overnight runs would break in small, irritating ways, a worker would hit a rate limit and fail instead of recovering, a complex task would crash mid-execution instead of decomposing, turn exhaustion would mark a task as failed when it was actually half-done. I'd been treating these as isolated bugs. The SWARMS assessment showed they were all symptoms of the same two underdeveloped dimensions: Sustain and Mobilize. The system could think and partially adapt, but it couldn't survive contact with reality at scale. The framework didn't just score my system, it gave me a map that connected scattered pain points to their root capabilities.

The swarm's own book had just told me exactly what to build next, in what order, and why. No roadmap planning sessions. No prioritisation debates. The intelligence was already there, it just needed to be extracted first and pointed inward.

## **The Compound Unlock**

Armed with a prioritised list, it was time for human in the loop, so I spent a day chatting back and forth with Claude Code, finessing and refining some of the ideas into a plan I was confident in. Then let them run to produce Flow 2.0 while I slept. Thirty-two commits. The upgrades read like a direct response to the audit.\
\
**The Discovery Engine** replaced single-shot task generation with a tiered planning pipeline that scores outcome clarity and routes to the appropriate depth, Quick, Standard, or Deep, so every task arrives with a verification command, complexity score, and dependencies already mapped. Workers stopped getting stuck on vague instructions because the intelligence moved upstream. Sense.

**Self-healing workers** layered seven independent recovery mechanisms over what had been a brittle overnight runner, rate limit detection, turn exhaustion checkpoints, auto-decomposition of unfinished work, exponential backoff restarts, and a teaching-errors system that injects every past failure into the next retry so workers get smarter instead of repeating mistakes. Sustain.

**Parallel worker deployment** added git worktree isolation and atomic task claiming so multiple agents can work the same outcome without file conflicts, coordinated through a real-time event backbone that replaced 12 polling intervals with instant typed events. Mobilize.

**Evolve mode** gave the system the ability to optimise, not just execute, a hill-climbing loop that measures a metric, makes one change, keeps or reverts, and repeats until the budget runs out or progress plateaus. Adapt.

The proof that it worked wasn't theoretical. I tested it immediately on a second book project. The same type of work that had taken two days and constant human intervention now completed in hours, with almost no babysitting, kicked off by a 10-min late night chat via Telegram. The swarm's output had genuinely led to an upgraded way to pilot the swarm.

## **What Compound Swarmcrafting Actually Is**

Here's the pattern, stripped to its essentials:

1. **Forward swarm**, Deploy agents to produce something ambitious. A book, a field guide, a research synthesis. The goal isn't just the deliverable. The goal is to force the models to surface latent knowledge across domains and synthesise it into frameworks that don't exist yet.
1. **Inverse swarm**, Turn the output into a reusable skill. Point it back at your own system. Let the swarm audit itself using the intelligence it just produced.
1. **Compound**, Build what a collaboration between the audit and human prescribes (vision). The upgrades aren't guesses, they're ranked, scored, and grounded in cross-domain research your own system generated.
1. **Repeat**, Run the improved system on the next ambitious project. Each cycle's output becomes the principal for the next.

This is not recursive in the way people fear, where AI feeds on its own output and degrades. The critical difference is human direction at key moments. I set the vision for the book. I decided to turn the framework into a skill. I chose which upgrades to build. The swarm executes; the human curates. That curation is what prevents the loop from collapsing and what makes each cycle genuinely compound rather than circular.

It's the same principle as the falcon. You don't start by flying the bird. You start by extracting every piece of knowledge you can from someone who knows more than you. Then, when you finally commit, you're not guessing, you're executing against a map that already exists.
