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
tags: []
draft: false
---
When I was 16, I fell in love with falconry after an afternoon walking a field with a Harris hawk on my arm, hunting rabbits with a group of falconers.

I wanted my own bird. Not a hawk. A falcon. I'd watched videos of people spinning lures while falcons dove past at speed, and I wanted that spectacle. What I didn't realise was that I'd picked one of the hardest birds to start with. Falcons are light and unforgiving. Get the weight wrong by a few grams and you're on an eight-hour bike ride chasing it across the countryside.

So before I got the bird, I spent every spare moment with the one guy I knew who understood falconry, interviewing him for hours, draining everything he'd learned over years. He put up with it because I was the only person in his life who treated his obsession as fascinating rather than a weird quirk.

When I finally got the falcon, it worked. Not cleanly. There were the bike rides, and one freezing morning where I had to emergency-feed it with an earbud because I'd miscalculated the cold. But the bird flew, came back, and eventually grew strong enough to release into the wild.

The principle was simple: squeeze out every drop of knowledge before you commit to the hard part.

This is exactly how I point AI swarms at some problems. Before I let a swarm rebuild flow, my homegrown workforce manager, I made it write a book first. Swarm Intelligence. Not as a creative exercise. As a strategic extraction.

I'm pulling latent knowledge out of the models across domains, synthesising it into frameworks that don't exist yet. Then I feed those frameworks back to the swarm to perform audits. Upgrade plans fall out the other end.

I call it compound swarmcrafting. I used to build flow 2.0. And books now take hours to generate not days. \
\
Here's how it works.

## **The Forward Deployed Swarm**

I've written in detail about [how 86 AI agents wrote a 54,000-word tactical field guide while I slept](https://thecognitiveshift.com/publications/let-them-run/swarm-intelligence-the-book-86-ai-agents-wrote-while-i-slept/). I won't retell that story here. What I want to talk about is what made it work, because that's what makes compound swarmcrafting possible.

The approach came down to sequencing. Before a single word of the book was written, I had the swarm do three things first.

1. ...invent a framework
1. ...conduct deep research across six domains I curated
1. ...synthesise everything into a knowledge base.

Only then did writing begin.

The framework step is the most consequential. I gave the swarm a rambling description of what I wanted, something connecting swarm biology, military doctrine, competitive gaming, multi-agent systems, business strategy, and complexity science. From that, flow's planning pipeline generated a task with one critical instruction:

```
....design "a memorable strategic framework, analogous to OODA, that organizes all content into 5-7 chapters. Each letter maps to a strategic domain. The framework name should be memorable, tactical, and capture the essence of winning through swarm intelligence." 
```

A single worker picked that up and produced the SWARMS framework. Sense, Wage, Adapt, Replicate, Mobilize, Sustain, a six-dimension model it synthesised from the intersections between all six research domains.

With the framework as the spine, 40+ research tasks ran sequentially accross all six domains, each producing a standalone evidence document. A synthesis phase mapped research to framework, identified gaps, ran structured debates on conflicting evidence. Only then did the writing wave begin, skeleton drafts, triple reviews, final rewrites, assembly.

The result was a book that people are actually reading.

> "*The book gets it*" – Shaun Thresher. \
\
"*What I've read is really, really good, great job*" – Damian Nomura's

That credibility matters, because the entire compound swarmcrafting pattern depends on the forward swarm producing something genuinely useful, not AI slop, but real cross-domain synthesis that surfaces knowledge the models had but I didn't. Bringing my blind spots into light.

After the project, I codified the methodology into a reusable skill, so any future Field Guide follows the same proven wave structure. But the book itself produced something even more valuable than a methodology. It produced a framework I could point back at my own system.

## **The Inverse: When the Swarm Audits Itself**

Here's where compound swarmcrafting diverges from normal AI workflows.

Most people would take the book, publish it, and move on. I did something different: I turned the book's framework into a reusable scoring skill, a markdown file that any AI agent can consume, and pointed it back at the system that wrote it.

The SWARMS assessment skill scores any idea or system across those six dimensions on a 1–5 scale, checks alignment against ten universal principles the book identified, and produces a prioritised audit report. I'm open-sourcing this skill so anyone can run the same assessment against their own systems.

I ran it against Flow itself. Eleven upgrade ideas I'd been collecting from studying other repos, Paperclip, Compound Engineering, Claude Code's Agent Teams, each scored and ranked across all six dimensions.

The results were immediate and clear. Resilient Worker and Discovery Engine scored highest at 20/30. The weakest dimensions across the entire roadmap were Replicate and Mobilize, the system could think and adapt, but it couldn't scale or coordinate at the level the framework demanded.

The swarm's own book had just told me exactly what to build next, in what order, and why. No roadmap planning sessions. No prioritisation debates. The intelligence was already there, it just needed to be extracted first and pointed inward.

## **The Compound: Building What the Book Prescribed**

Armed with a prioritised list that my own system's output had generated, I built Flow 2.0 in a week. Thirty-two commits. The upgrades read like a direct response to the audit:

**Self-healing workers**, agents that detect rate limits, turn exhaustion, and infrastructure failures, then recover automatically instead of crashing. This directly addressed the Sustain dimension.

**Tiered complexity handling**, the system now estimates task complexity before claiming it. Too complex? It decomposes automatically. Too simple? It runs lean. This was the Adapt dimension.

**Parallel worker deployment**, a button to launch multiple workers simultaneously on independent tasks. The Mobilize dimension, addressed head-on.

**Discovery Engine**, a three-tier planning pipeline (Quick, Standard, Deep) that researches and plans before executing. The Sense dimension.

The proof that it worked wasn't theoretical. I tested it immediately on a second book project. The same type of work that had taken two days and constant human intervention now completed in hours, with almost no babysitting. The compound had kicked in: the swarm's output had genuinely upgraded the swarm.

## **The Pattern: What Compound Swarmcrafting Actually Is**

Here's the pattern, stripped to its essentials:

1. **Forward swarm**, Deploy agents to produce something ambitious. A book, a field guide, a research synthesis. The goal isn't just the deliverable. The goal is to force the models to surface latent knowledge across domains and synthesise it into frameworks that don't exist yet.
1. **Inverse swarm**, Turn the output into a reusable skill. Point it back at your own system. Let the swarm audit itself using the intelligence it just produced.
1. **Compound**, Build what the audit prescribes. The upgrades aren't guesses, they're ranked, scored, and grounded in cross-domain research your own system generated.
1. **Repeat**, Run the improved system on the next ambitious project. Each cycle's output becomes the principal for the next.

This is not recursive in the way people fear, where AI feeds on its own output and degrades. The critical difference is human direction at every turn. I set the vision for the book. I decided to turn the framework into a skill. I chose which upgrades to build. The swarm executes; the human curates. That curation is what prevents the loop from collapsing and what makes each cycle genuinely compound rather than circular.

It's the same principle as the falcon. You don't start by flying the bird. You start by extracting every piece of knowledge you can from someone who knows more than you. Then, when you finally commit, you're not guessing, you're executing against a map that already exists.

## **Where This Goes**

The loop doesn't stop at one cycle. Every ambitious project the improved system runs will surface new frameworks, new patterns, new audit criteria. Each cycle produces a richer substrate for the next.

I'm open-sourcing the SWARMS assessment skill so you can run the same inverse operation on your own systems. Point it at your AI tooling, your orchestration layer, your agent architecture. Let the framework tell you where you're strong and where you're exposed.

Because the real unlock isn't building better AI systems. It's letting AI systems tell you how to build them better, and then actually listening.
