---
title: 'Swarm Intelligence: The Book 86 AI Agents Wrote While I Slept'
excerpt: "I didn't write a single paragraph of this book. I described an outcome, went to sleep, and woke up to 431,000 words of working material distilled into a 54,000-word tactical field guide."
authors: ["rhys-fisher"]
publication: "let-them-run"
publishedAt: 2026-03-09
tags: ["ai-swarms", "agentic-ai", "book-writing", "flow", "autonomous-agents"]
featuredImage: "https://assets.thecognitiveshift.com/articles/swarm-intelligence-cover.jpg"
---

![The Swarm Intelligence Handbook](https://assets.thecognitiveshift.com/articles/swarm-intelligence-cover.jpg)

I didn't write a single paragraph of this book. I didn't assign a single task. I described an outcome, went to sleep, and woke up to 431,000 words of working material.

You've had an idea for a book you never wrote. So have I.

About a dozen of them. Life, time, the sheer mountain of research, it always wins. Until it didn't.

Because now I have [FLOW](https://thecognitiveshift.com/publications/let-them-run/i-built-an-ai-workforce/). My own AI workforce manager. It built the website you're on. I figured a book was next. I set the goal, went to sleep.

It worked.

A little too well.

Over two days, a swarm of 86 wiggums extracted wisdom out of Anthropic's model, across six academic domains, debated each other's findings, caught their own mistakes, and delivered a 54,000-word tactical field guide on a topic that would have taken me months.

I just told them what I wanted the topic to be. How the information should be valuable. And my thoughts on how to approach the research using [Wispr Flow](https://wisprflow.ai/). I was out of the weeds and in flow state, shaping the vision. Fun!

Here's what that looked like.

## The Ramble That Started Everything

It began with a ramble. Not an outline. Not a brief. Just me talking at my computer about an idea that had been nagging me. A hunch that the fields of swarm biology, military doctrine, competitive gaming, multi-agent systems, and business strategy must have a common thread. Some uniting principles that encode the physics of coordinating distributed intelligence, and they were about to become table stakes. So I needed to connect the dots.

I wanted a cross-domain field guide. Something that would teach leaders how to actually win with agentic AI swarms, grounded in real research, not vibes. The kind of book that treats ant colonies and StarCraft pros and Prussian generals  equal sources of strategic truth.

The problem? I'm one person. I was deep in strategy work for my venture studio clients, running executive AI trainings, and traveling accross the country to give live demos. Juggling the messy middle stuff I can't hand over to the bots.

The research alone spans six domains, each with decades of literature. The writing would require synthesizing insights from bee decision-making, OODA loops, fitness landscapes, and LLM coordination architectures into something a CEO could actually use on Monday morning.

Where would I get the time?

Spoiler. I decided I wouldn't try...

## How FLOW Turned a Ramble Into a Book

FLOW is a harness I built to deploy and manage an AI workforce. Think of it like a harness around "Wiggum loops" so you can get Agents autonomously claiming tasks and working on stuff while you sleep.

A dispatcher agent decomposed my intent into structure. My messy description of wanting a "cross-domain tactical field guide on agentic swarms" became a structured outcome with a clear success criteria. I had opinions on how it should sequence the work. So I just spoke them into a "how" section which generates a design.md, detailing how to approach the research domains, synthesize findings, write chapters organized around a unifying framework, review everything, assemble the final product. It's by no means bullet proof. Most human work isn't. Yet humans manage to write amazing books. There's a deep insight there worth reading twice. Because it's baked into how FLOW works.

**The capability phase came first.** Before any research started, the system built what it needed. A task-refiner skill for breaking complex work into well-scoped units. A cross-domain-researcher skill that was a 860-line document that explicitly instructs workers to
use WebSearch and WebFetch, with detailed search terms, target URLs, and retrieval protocols for each of the 6 domains. While there's room for improving this. The pattern I cannot stress enough. Capability-building before execution changes everything. The right tools produce qualitatively different output than agents brute-forcing with generic prompts.

**Then the research swarm deployed.** workers spun up claiming tasks across six research domains.

- **Swarm biology**: ant colony optimization, bee collective decision-making, flocking dynamics, slime mold network optimization
- **Military doctrine**: OODA loops, Mission Command (Auftragstaktik), distributed warfare, wolfpack tactics
- **Competitive gaming**: StarCraft cognitive economics, AlphaStar, meta-evolution in competitive play
- **Multi-agent systems**: coordination architectures, digital stigmergy, human-agent oversight models, LLM framework comparisons
- **Business strategy**: cognitive bottleneck dissolution, governance and risk frameworks
- **Complexity science**: complex adaptive systems, fitness landscapes, Kauffman NK models

Each agent worked independently, synthesizing findings, and writing structured research documents. I've since spotted [Andrew Karpathy open sourcing](https://x.cokarpathy/status/2030371219518931079) an interesting repo I'd like to explore for the next book.

To get the workers unstuck, I built a wiggum observability engine called HOMЯ. Escalations pull a human on the loop to decide between a few easy options. Add more context. Decompose. Skip ect…but what good is human on the loop if human is asleep. So I added a YOLO mode called auto-resolve. Basically a Claude agent made the decision for me. So when tasks proved too complex for a single pass, the system auto-decomposed them into subtasks. Went from 10'ish tasks to over 90 this way. Research at book production scale became four separate investigations (literature survey, signal decay modeling, scaling benchmarks, synthesis) executed by different agents.

**Gap analysis and debate.** After the initial research, a coverage matrix was generated to find holes. A 49,000-word gaps-and-debates document identified contradictions between domains. A formal debate process resolved conflicts, like whether stigmergy actually translates to digital systems at production scale, or whether it's just a nice metaphor. It's wild to think these bots were debating one another while I was dreaming about [gravel biking adventures](https://www.linkedin.com/posts/rejf_now-i-just-need-to-build-this-thing-howlerbikescom-activity-7428791831678611456-66hi).

**Knowledge base assembly.** Cross-domain patterns were extracted and organized: natural systems findings, adversarial systems findings, a unified timeline, and the pattern document that became the backbone of the book's SWARMS framework. Yes, it came up with that framework. Just how it came up with how HOMЯ stands for holistic observation, management, and response 😂.

**Chapter writing, in waves.** Six chapters were drafted, each grounded in the research. Then came reviews. Five individual chapter reviews plus a cross-chapter consistency review. Then rewrites incorporating the review feedback. Then a final assembly pass into a single consolidated document with a table of contents, appendices, quick-reference cards, and a situation-based index.

The whole thing took two  86 tasks. 82 completed successfully. 30 workers running in parallel. 431,000 words of intermediate output distilled into a 54,000-word field guide.

![Flow output from the swarm book project](https://assets.thecognitiveshift.com/articles/swarm-intelligence-flow-outputs.jpg)

[You can download a copy here](https://leanpub.com/agentic-swarms-tactical-field-guide/c/thecognitiveshift). (Grab one of 100 free beta copies)

## The Cascade Failure (What Almost Went Wrong)

Here's where I owe you honesty, because this was not a smooth ride.

Midway through, the system hit what I can only call a complexity escalation loop. The HOMR protocol detected that certain tasks were too complex for their turn limits. The correct response was to decompose them into subtasks. So it did.

And then those subtasks were also flagged as too complex. So they got decomposed too.

Sixteen times, the system decided to "break into subtasks." Sixteen escalations. The swarm was recursively fragmenting its own work, like a cell dividing when it should have been growing. Tasks that should have been one focused research effort became four sub-investigations, each of which threatened to spawn its own children.

The fix was blunt but effective. Increase the turn limit. Give agents more room to work instead of more agents to share the work. Three times I had to step in to unblock.

It's still early days for FLOW and I deployed a bunch of improvements throughout the book. 3 more branches are in progress too. But this taught me something that became a core principle of the book itself. **The coordination architecture is the competitive advantage.** Same agents, different topology, dramatically different results.

## What the Swarm Produced

The book is aimed at being a sort of tactical hand book, organized around the SWARMS framework:

- **S**ENSE — Distributed perception and intelligence gathering
- **W**AGE — Competitive engagement and tempo advantage
- **A**DAPT — Strategic evolution and learning velocity
- **R**EPLICATE — Scaling intelligence operations at near-zero marginal cost
- **M**OBILIZE — Coordinated execution at scale
- **S**USTAIN, governance, and the long game

Each capability is grounded in the research and validated by what the research calls "ten universal principles", patterns that appear independently in ant colonies, military doctrine, StarCraft tournaments, and distributed systems engineering. When six domains converge on the same truth, it's not a metaphor. It's structural.

The guide includes tactical playbooks for each capability, 14 quick-reference cards (from a Swarm Readiness Scorecard to an Agent Economics Calculator), an implementation timeline, and a situation-based index so you can find "I'm being outpaced by a competitor" and get pointed to the exact playbook.

I used an AI swarm to write a book about AI swarms, and the swarm exhibited the exact dynamics the book describes. The cascade failure was a coordination architecture problem (Chapter 5). The fix was an adaptation mechanism (Chapter 3). The HOMR protocol sharing discoveries between tasks was stigmergic coordination (Chapter 1). The agents running in parallel at near-zero marginal cognitive cost was the replication economics argument (Chapter 4).

The book is its own proof of concept.

The window for establishing competitive advantage with agentic swarms is 18-24 months. After that, this becomes table stakes. The organizations that learn to make AI workforces work for them, self equip with optimizing capabilities, manage coordination, and design for failure *now* will compound their advantage while everyone else is still writing prompts by hand.

The guide is available now in Beta.

Again. First 100 copies go out for free. I'm one chapter into reading it and can already tell you there
are a few billion dollar ideas in that chapter alone.

Read it and then come join the Discord to discuss. We're organizing our first virtual meetup soon.
