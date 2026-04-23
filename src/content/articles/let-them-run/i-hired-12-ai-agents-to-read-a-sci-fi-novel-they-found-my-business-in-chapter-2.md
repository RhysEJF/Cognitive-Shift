---
title: >-
  I Hired 12 AI Agents to Read a Sci-Fi Novel. They Found My Business in Chapter
  2.
excerpt: >-
  I pointed 12 AI agents at Accelerando and extracted 230 business ideas in seven minutes. But the real goldmine wasn't the ideas - it was the mental models. I extracted Stross's post-scarcity reasoning patterns, tested them against my savings decisions, and compared them to traditional frameworks. The synthesis was better than either alone.
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
  - mental-models
  - decision-frameworks
  - cognitive-transplantation
  - financial-planning
  - agent-swarms
draft: false
---
It's 9pm. I'm staring at row 21 of a spreadsheet.

The row says "*Distributed software agent collective (metacortex), a cloud of software agents that surrounds him in netspace, borrowing CPU cycles from convenient processors, spawning new agents to research new experiences, and at night, they return to roost and share their knowledge.*"

That's Flow OS.

Or at least one of the things I've been using it for the last months.

Except the row doesn't come from my notes, or my pitch deck, or one of my client calls.

It comes from a Charles Stross novel written in 2005.

And I didn't read the novel. Twelve AI agents did. In seven minutes. While I made a hot chocolate. (*full disclosure: I am listening to the audio version*)

![Accelerando book cover](https://assets.thecognitiveshift.com/articles/1776935642382-screenshot-2026-04-23-at-11.13.54.png)

## Why I pointed AI at a sci-fi novel

Accelerando is the book that spawned the whole lobster branding meme (e.g. openClaw). Its protagonist, Manfred Macx, uploads lobster neural patterns so the crustaceans can migrate to the asteroid belt as autonomous economic agents. It's the canonical post-scarcity novel. Nine interconnected chapters covering IP law gone feral, reputation economies, the singularity, corporate-grade legal personhood for uplifted animals, and what happens when attention is the only scarce resource left.

It's 289 pages. It's idea-dense in a way that makes your brain hurt. Stross crams a serious business idea into nearly every paragraph, often as a throwaway aside.

Here's the thing. If you're building in AI right now, post-scarcity thinking is a goldmine! Not because the scenarios are going to happen tomorrow, but because Stross already walked the mental road of "*what does commerce look like when attention, reputation, and compute have flipped what's scarce?*" (which is exactly the road I'm about to walk in real life.)

So yeah. I wanted to review the ideas. To examine them. To study them and understand how far out these market opportunities really are. And I did not want to re-read 289 pages to get them.

The old way to do this, read the book with a highlighter. Keep a notebook. Go back and transcribe your highlights. Maybe twelve hours of work. Maybe twenty. By the time you finish chapter 9, you've forgotten chapter 2.

The new way, spin up twelve AI agents and let them read it in parallel.

## The pipeline. 12 agents, one message, 289 pages

Here's what I actually did.

1. I wrote ONE prompt template. It said something along the lines of, extract every futuristic technology, product, market, or societal shift. Fill in this 24-column schema...
1. I mapped the book into 12 chunks. Nine chapters. Three of them were long, so I split those in half. Each chunk ~18-25 pages.
1. I spawned all 12 agents in a single message. One Agent call per chunk. Each agent got a 10-line brief pointing to the shared template, plus its assigned pages and output file path.
1. I waited a few minutes. The agents read their chunks in parallel and wrote their findings, 394KB of structured ideas, to a CSV I could import into this [Google Sheet](Accelerando is the book that spawned the whole lobster branding meme (e.g. openClaw). Its protagonist, Manfred Macx, uploads lobster neural patterns so the crustaceans can migrate to the asteroid belt as autonomous economic agents. It's the canonical post-scarcity novel: nine interconnected chapters covering IP law gone feral, reputation economies, the singularity, corporate-grade legal personhood for uplifted animals, and what happens when attention is the only scarce resource left.) and share with you all.

Timeline, minutes. [The vibe](https://www.tiktok.com/@jakob.robic5/video/7619788544030166303?).

## What 230 structured business ideas actually looks like

Let me show you one of the ideas the agents pulled out. Just remember that each one has a verbatim Stross quote, a page number, a category, a time horizon, a target customer, a business model hint, a moat type, a regulatory-friction score, and eighteen other fields!

### Example Idea: Uplifted-crustacean economic agents (Ch1, p22)

Quote *"Panulirus interruptus uploads. Something tells me you might have heard of it?"*

What Stross describes. Scan the neural connectome of a lobster. Run it as software. Grant it corporate-grade legal personhood. Dispatch the uplifted lobster-minds to the asteroid belt as cheap, expendable workers for hostile environments. Sounds a lot like what we do at [AskRally](https://askrally.com/article/genpop-panel), but with humans. Like something straight out of [Pantheon](https://youtu.be/wTgYeETwgKQ?si=BDG47sW6XWls3xAe).

What the agent extracted:

- Problem, cheap cognition for hostile environments without the ethics overhead of human labour
- Target customer, asteroid mining concerns, deep-sea operators, hostile-environment industrial firms
- Business model, sell labour-hours of agent collectives, or licence the scanning IP
- Moat. IP on scanning methodology + regulatory (first to win a personhood ruling)
- Time horizon, far
- Adjacent ideas, uplifted-rodent micro-task pools, pet-consciousness preservation services, non-human voting blocs

Is any of this a venture I'm going to build next quarter? No. Already have a stake in this one. But there is an adjacent ideas column capturing three spin-offs per row. And there are hundreds of other rows! Something to review when I'm bored watching my swarm do the busy work.

## But what if the ideas weren't the real goldmine?

For weeks I'd been using [Mental Models OS](https://github.com/darnoux/mental-models-os), an open-source library of 80+ decision-making frameworks, and absolutely loving it as a way to break down problems through different mindsets. First principles, inversion, systems thinking, probabilistic reasoning. Each model shifts how you see a problem.

But staring at those 230 Accelerando ideas, I had a different question. What if the real value wasn't in Stross's specific products, but in how his brain *thinks* about post-scarcity problems?

Accelerando isn't just packed with ideas. It's jam-packed with abundance mindset reasoning patterns. What if I could extract those patterns as mental models and test them against real decisions?

So I built a skill to do exactly that.

### Extracting Mental Models from Fiction

I created an extraction skill that reads text and pulls out genuine reasoning patterns, not just ideas. The skill has strict criteria. A mental model must apply across multiple situations, have a describable mechanism, change how you think about future problems, and have clear triggers for when to use it.

I pointed this skill at the first five chapters of Accelerando.

Out came models like **Substrate Independence of Cognition** (the principle that work becomes portable across biological, digital, and hybrid substrates), **Agalmic Economy** (value flow through reputation and gifts when marginal cost hits zero), and **Abundance Graduation** (goods exiting markets entirely when they become cheap enough).

Eleven models total. Each one structured with the same format as Mental Models OS, clear triggers for when to apply them, and specific walkthroughs for analysis.

Then I had a thought. What would happen if I tested these post-scarcity models against a real decision and compared them to traditional mental models?

### The Savings Test

I picked a simple personal finance question. "How much of my salary should I save going forward?"

I ran the question through both frameworks.

**Traditional Mental Models** (first principles, probabilistic thinking, margin of safety, trade-offs analysis) recommended saving 25% with a phased approach. Build a $20k emergency fund first ($1,200/month), then shift to aggressive growth investments ($1,500/month). Classic defensive-then-offensive strategy.

**Post-Scarcity Models** recommended 20-25% but with completely different reasoning. Smaller emergency fund (10% to 3-6 months expenses) because cognitive work is increasingly substrate-independent and platform costs are falling. Larger capability investment (15%) because earning potential scales non-linearly with AI amplification.

Same total savings rate. Completely different allocation and reasoning.

The traditional models assumed historical risk patterns and linear career progression. The post-scarcity models assumed falling platform costs, location independence, and exponential capability gains from AI tools.

Both frameworks surfaced valid concerns the other missed. Traditional models caught health emergencies and market downturns. Post-scarcity models caught platform lock-in risks and the precedent-setting nature of AI worker financial planning.

The synthesis was better than either framework alone.

### Why This Matters

Most people think about AI assistance as "faster research" or "better writing." But what I'm seeing is something different. AI lets you extract reasoning patterns from any domain and apply them to your specific problems.

Stross spent years thinking through post-scarcity edge cases. I extracted his mental frameworks in minutes. The frameworks caught blindspots that traditional financial planning missed.

![Post-scarcity mental models meme](https://assets.thecognitiveshift.com/post-scarcity-mental-models-meme.png)

And now thanks to the importable repo I linked to above, you can too. Once you import it, type /post-scarcity [your question here]. And if you're a Flow OS customer, DM me and I'll share some perks.  
