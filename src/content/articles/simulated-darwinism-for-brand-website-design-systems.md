---
title: Simulated Darwinism for Brand Website Design Systems
excerpt: How AI swarms turn design budgets into exploration, not deliverables.
authors:
  - rhys-fisher
publication: let-them-run
publishedAt: 2026-03-30
tags:
  - swarms
  - web design
  - askrally
  - simulation
draft: false
---
When I ran Unvanity, my previous analytics agency, I went through a phase of setting up clients to chart their [word-of-mouth coefficient](https://www.reforge.com/blog/how-to-calculate-your-word-of-mouth-coefficient), the inherent virality of a website. How many new organic users does each active user generate? It looks like this. \
\
![](https://assets.thecognitiveshift.com/articles/1774882679-generated-image-march-30-2026-3-18pm.jpg)

The differences between sites were something to pause over. Same industries, same budgets. One site earned a free visit for every couple of paid visits. Others needed dozens to generate a viral session. That coefficient gap changed everything downstream, ad spend, scalability, the entire economics of the business.

It raised a question I never managed to put down. Why do companies commit to one design direction before knowing which one spreads?

Years later, I now experiment with AI orchestration systems that manage autonomous workforces. I deploy swarms. When my long-running-agent harness [started working reliably](https://thecognitiveshift.com/publications/let-them-run/compound-swarmcrafting-why-ai-should-write-books-before-you-let-it-rebuild-itself/), I wanted to run an experiment I'd been carrying since those coefficient reports, what happens when the cost of exploring design directions drops to near zero?

## **$200K Buys You One Direction**

The standard brand website engagement looks like this: discovery workshops, stakeholder interviews, mood boards, two or three concepts narrowed to one, then months of refinement through committee. The output is a website. Not the best possible website, the one that survived the process.

Will everyone feel good about it? Sure. Will you sell more? That's less clear. Is it the best site you could have spent that money on? Probably not.

Nobody involved did anything wrong. Exploration is just expensive when humans do it. So you explore a little, commit early, and spend the remaining budget polishing a single bet.

I wanted to know what happens when you invert that ratio. Same budget, but instead of one direction refined by committee, dozens, hundreds, even thousands get generated in parallel, each evolving against synthetic audiences calibrated on real humans. No HIPPO deciding which concept lives. Just performance in simulation, looped instantly into the next design.

## **The System Was Working. What If It Had Tools?**

Flow is my experimental AI workforce system. You define an outcome, shape the vision, it decomposes the work, spins up autonomous workers to push outcomes over the line while you sleep.

![](https://assets.thecognitiveshift.com/articles/1774882679-screenshot-2026-03-30-at-15.26.51.png)

It shipped the website you're on. [Multiple books](https://leanpub.com/agentic-swarms-tactical-field-guide). Built its own scraping tools and decoded winning [content formulas](https://docs.google.com/document/d/1F4KcCX3xX8vvohaWBiarTv0oq-LPY-LFBp83jddcqHo/edit?usp=sharing). My swarm could think, but it was sandboxed. It could build its own tools when it needed to, and sometimes did, but not everything can be vibed so easily. There's real value locked in some APIs and systems that would take far longer to rebuild than any single outcome budget justifies. So I built an integration layer. Point Flow at a repo or API, it scopes its own integration, I approve or adjust, and workers execute with whatever external tools the task needs. That changed the surface area of what an outcome could be.

## **Two Tools I Could Reason About**

[Google Stitch](https://stitch.withgoogle.com/) was popping off in my feed, an agentic first design system for generating… design systems. I initially passed it off as unnecessary. My swarm had already built websites after all. But the Zoomable Canvas, design.md, and exportability were interesting enough to spend a couple of hours figuring out how to integrate this properly. Figured at the very least it would be cool to have a canvas to view a history of iterated design concepts. That's exactly the kind of capability that multiplies when you parallelize it during a client engagement.

[AskRally](https://askrally.com/) is one of my startups, co-founded with Mike Taylor. I spent months [building n8ns](https://askrally.com/workflows) for it, so knew where the alpha was when leveraging our [calibrated virtual focus groups](https://askrally.com/article/genpop-panel). We interviewed hundreds of real humans and trained AI personas 1:1.

The combination was immediate. Generate variants with Stitch. Test them against simulated humans with AskRally. Let the results inform the next generation. The question wasn't whether the loop was elegant, it was whether the signal would be real enough to act on.

![](https://assets.thecognitiveshift.com/articles/1774882679-screenshot-2026-03-30-at-15.37.48.png)

## **Proof of Concept: Getting Ralph Loops Running With Stitch**

I pointed it at one of my own brands first. The Cognitive Shift, my playground for AI R&D. I started with a stupid simple outcome. Extracted the copy, fed the same brief and content into Stitch through Flow, and asked for three directions.

![](https://assets.thecognitiveshift.com/articles/1774882679-screenshot-2026-03-30-at-15.55.31.png)

![](https://assets.thecognitiveshift.com/articles/1774882679-screenshot-2026-03-30-at-15.56.03.png)

![](https://assets.thecognitiveshift.com/articles/1774882679-screenshot-2026-03-30-at-15.59.47.png)

What came back were three genuinely different design systems. Minimal, Dark, and Organic Minimal. Don't ask me what those mean… this was just a POC to get Flow talking to Stitch.

Same words. Same brief. Three distinct answers to "*what should this brand feel like?*"

The interesting part isn't that AI can generate websites, that's table stakes. It's that identical inputs produced real divergence in typographic choices, colour logic, and spatial hierarchy. These aren't theme swaps. They're different points of view.

More importantly, this proved the integration layer worked. Stitch was operating inside a Flow outcome, producing real artefacts. The plumbing was solid. Time to try something harder. Adding simulated voice of customer testing.

## **Scaling It: Three Variants, Three Rounds, Fifty-Four Voices**

The real test was a client engagement, a B2B SaaS company whose name I won't share. Weeks of strategy work had already been completed to define the business strategy, competitive positioning, and messaging pillars. All of it digested into context for the swarm.

![](https://assets.thecognitiveshift.com/articles/1774882679-screenshot-2026-03-30-at-16.05.30.png)

Stitch generated three distinct design variants from the same strategic foundation. One read premium enterprise, restrained, authoritative, built to reassure procurement teams. Another went field-credible bold, industrial aesthetic, direct language, the kind of site that feels like it was made by people who've actually been on a rooftop. The third was conversion-optimized clean, structured for the analytical buyer who wants the pricing table before the mission statement.

Each variant ran through rounds of AskRally persona feedback. Multiple feedback cycles. Fifty-four individual persona reviews. What's crazy is that Flow workers actually found relevant personas from our AskRally's GenPop panel. Not an exact match because we likely did not interview them, but the closest thing we have. I didn't even tell it to do that. It found a representative sample that aligns with a typical buyer committee for this client.

![](https://assets.thecognitiveshift.com/articles/1774882679-screenshot-2026-03-30-at-16.09.44.png)

![](https://assets.thecognitiveshift.com/articles/1774882679-screenshot-2026-03-30-at-16.10.00.png)

Round one surfaced raw reactions. Every persona did mental math on the per-user pricing before reading another word. Trust gaps appeared. A construction company owner compared the software to three tools he'd already tried and abandoned. A hobby shop owner said the monthly cost was "more than the turbo exhaust on my rally car." A retired electrician recalled carbon paper invoices and wondered why software needed to cost anything at all.

![](https://assets.thecognitiveshift.com/articles/1774882679-screenshot-2026-03-30-at-16.11.08.png)

![](https://assets.thecognitiveshift.com/articles/1774882679-screenshot-2026-03-30-at-16.14.07.png)

![](https://assets.thecognitiveshift.com/articles/1774882679-screenshot-2026-03-30-at-16.13.01.png)

Round two addressed the obvious problems and surfaced deeper anxieties. Unease about AI-generated pricing, questions about contract flexibility, the absence of product visuals.

Round three closed remaining gaps, early price anchoring, adoption proof points, verification paths that let skeptical buyers confirm claims before committing.\
\
After a few more rounds, each design had been iterated on to produce something like this in Stitch.

![](https://assets.thecognitiveshift.com/articles/1774882679-untitled-design-35-.jpg)

The most useful finding wasn't which variant "won" in the sim or why. It was that when I looked at the end result. It was hands down better than the first. Not after weeks of back and forth with stakeholders and tens of thousands in fees. But for less than $5 in tokens and a few hours letting the swarm run.

The end direction wasn't briefed. It was discovered. Don't get me wrong, it's possible to configure it to be more opinionated. This was just a proof of concept to see if swarm and synthetic testing could be merged into a new design system. One that leverages evolutionary advantages. Something you could run in a scaled up fashion where you end up with dozens of pre-filtered brand concepts narrowed down from thousands tested against virtual focus groups.

This is what exploration buys you. A search space that reveals combinations a linear process would never reach. The human's role shifts from producing designs to directing the system and making the final synthesis call.

## **Once It Works, It Becomes a Template**

In Flow, there's the option to add evals baked into outcomes and room to really cook a system for autonomous work that makes you feel things. The best bit about it. Once an outcome works, you can templatise it with a skill optimized for repeating the pattern. The brand website template doesn't just produce a website. It includes variant generation with design system output, feedback loops with audience-specific persona panels, iteration cycles with convergence tracking, and then when you have a winner going viral in simulators, you can get the swarm building the site, implementing analytics, adding CMS integration … all so the marketing team owns their content, and a design system that lives inside Claude so new pages can be built against it natively.

For $200K with a partner running swarm infrastructure, you don't get one website. You get an evolutionary process that produces and tests thousands, iterating around the clock, running hundreds of cycles against synthetic humans calibrated on real voices. Dozens of promising brands in high fidelity clickable prototypes. Then only designs that prove themselves in battle hardened evals reach the client's desk. \
\
The output isn't just a design system, a component library, a CMS structure, analytics, and a marketing team that builds new pages using rules that emerged from the process. It's launching with something that makes every future advertising dollar travel further. Because buy two clicks, get one free travels.

The shift isn't replacing humans with AI. It's what happens when design exploration stops being the expensive part. When you can explore 300 directions for the cost of one, the question moves from "what can we afford to try" to "what's worth pursuing." That's the cognitive shift. 😉
