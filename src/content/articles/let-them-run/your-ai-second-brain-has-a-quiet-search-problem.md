---
title: Your AI Second Brain Has a Quiet Search Problem
excerpt: >-
  If you're already running an AI Second Brain on markdown plus grep, your 
  search layer is quietly underperforming. After auditing 50+ memory repos, 
  I picked the one that ships. Here's what changes when you swap grep for 
  hybrid search.
authors:
  - rhys-fisher
publication: let-them-run
# publishedAt: 2026-05-05
tags:
  - ai-memory
  - qmd
  - second-brain
  - flow-os
  - claude-code
  - markdown
  - semantic-search
  - hybrid-search
draft: true
---
If you're reading this, you've probably already purchased an AI Second Brain. Markdown files in a folder system. Claude Code reading them. The core `/plan`, `/work` and `/learn` commands, and a custom crafted CLAUDE.md that gets injected at session start and tells the model where to go to find out more about your world.

You've felt the magic. The first time the AI surfaces something you wrote three months ago and connects it to what you're working on right now. That's the moment. It's why this pattern is taking over.

I built mine too, using the same pattern everyone else is following. It didn't take long to notice the cracks. So I dug into +50 repos in the hunt for a fix. Now I set people up with something undeniably better. (keep reading)

Here's what nobody told me when I was running the default Second Brain pattern, and what nobody is telling you now. **The search layer underneath is quietly underperforming.** And that's meant to be the core. Once you see it, you're going to understand why you need to upgrade it immediately.

## The Wall You've Already Hit

You've had this moment. You ask the AI something fuzzy. *"Who was that prospect I met who said something brilliant about marketing stuff, but I told him I'd get back to him when we raised our seed round?"* Or *"Which podcast appearance could I drop into this prospect's inbox to push the deal forward?"* And one of three things tends to happen.

1. The AI returns a wall of 50+ files because your keywords matched too broadly
2. It returns nothing because your exact phrasing isn't in any file
3. It returns a few hits but misses the obvious answer that you, the human who wrote the notes, know is in there

You probably blamed Claude. Or your prompt. Or your folder structure.

It's none of those. It's grep.

## First, What Is Grep?

Grep is the original Unix tool for searching files. Type a word, get every line in every file that contains that word. Fast. Free. Built into every system. The Second Brain pattern leans on it because it's already there.

But there's a catch. 

## Grep Can Only Find What You Already Remember

Six months ago, you had a really good conversation with a customer. They told you exactly why your product worked for their team. The moment was clear. They said something quotable, something specific, and you knew right then it would shape future pitches. You wrote it down. You filed it. That's what your Second Brain is for.

Today you're building a pitch deck. You need that quote. You ask the AI, *"What did customers say about why our product worked for their team?"*

Grep goes hunting. It searches for "customers" and finds eighty files. It searches for "product works" and finds nothing, because the customer's actual words were *"this is the first tool my team didn't immediately ignore."* It searches for "team" and returns two hundred files mentioning any team you've ever worked with.

The note exists. The insight is in your Second Brain. But you can't get it back unless you can remember the exact words the customer used. Which you can't. That's why you wrote it down in the first place. 

This is the failure. Not that grep is slow. Not that it's noisy. It's that grep makes you remember in order to find. Your Second Brain becomes a passive filing cabinet instead of an active recall system. Which means it's not really a Second Brain. It's not a compounding intelligence layer. It's the most expensive folder you'll ever pay for. A black hole for your best ideas. 

![](https://assets.thecognitiveshift.com/articles/1777985435839-screenshot-2026-05-05-at-14.50.23.png)

## After Fifty Memory Repos, I Picked One

Here's what I noticed digging through 50+ AI memory projects on GitHub. A lot of big claims. A lot of self-graded benchmarks. And the people talking about these repos, almost no one is plugging the thing into "real" work and asking the tough questions. I get it. Contact with reality is for the bold and brave. 

So I decided to make contact with reality. I took the base grep + markdown memory system everyone seams to be on, and asked it the kind of fuzzy question to simulate when my first brain forgets. 

The query.

> *"hey what was that convo we had about the person who's like the champion for AI stuff but has to get their boss to sign off on the money?"*

The result. 

### Grep

```
$ grep -ril "champion" memory/ experiences/
30 files

$ grep -ril "internal champion" memory/ experiences/
5 files

$ grep -ril "boss approval\|budget approval\|sign off" memory/ experiences/
5 files (none matching the framing)

$ grep -ril "buy-in\|stakeholder" memory/ experiences/
20 files (too broad)
```

By the time I'd run seven keyword variations, grep had surfaced two candidates. James F., from a demo I ran in 2025. Y., from a pricing discussion at a UK university. Both fit *some* aspects of the description. Neither was the person I was actually thinking of.

That's grep's ceiling. Two plausible-but-wrong candidates, and the actual answer hidden in a file the keywords never reached.

### QMD

```json
[
  {
    "score": 0.88,
    "title": "Ideal Client Profile",
    "snippet": "Tactics before foundations. They want a content marketing strategy before establishing messaging pillars..."
  },
  {
    "score": 0.50,
    "title": "Tom D. / Rhys | Catchup",
    "snippet": "Tom: Prototype Ghost-integrated publishing automation. Talk to Richard about AI positioning..."
  },
  {
    "score": 0.46,
    "title": "Direct Pitch Email: Ben N. — The Adoption Amplifier",
    "snippet": "Perfect for your 5-6 champions, mid-sized companies wanting to move beyond trial-and-error AI experimentation..."
  },
  {
    "score": 0.45,
    "title": "Relationship Profile: Ben N.",
    "snippet": "Influencer/Champion. Must present to manager for budget approval, but has clear advocacy role and manager appears receptive to AI initiatives."
  },
  {
    "score": 0.43,
    "title": "James F. / Rhys | AskRally Demo",
    "snippet": "Influencer/Champion. Must present to manager for budget approval, but has clear advocacy role..."
  }
]
```

Look at result #4. *"Influencer/Champion. Must present to manager for budget approval, but has clear advocacy role."* That's a near-verbatim match for the question I just asked. The person is **Ben N.** My automated transcript memory extraction had captured his decision role explicitly in his relationship file the day after our call.

QMD didn't get this perfectly. The top hit (score 0.88) is my generic Ideal Client Profile, which is irrelevant. The reranker drifted. Worth being honest about. Hybrid search is not magic.

But the right answer was sitting at rank 3 and rank 4, with snippets that named Ben directly. I had my answer in seconds. And almost half as many tokens spent. 

![](https://assets.thecognitiveshift.com/articles/1777994992432-screenshot-2026-05-05-at-17.29.46.png)

Grep would have had me reading thirty files and still pitching the wrong person.

That's the difference. Same markdown! Same Claude. Different search layer.

## What That "Hybrid Index" Actually Is

It's called [QMD](https://github.com/tobi/qmd), short for Query Markup Documents. A library built by [Tobi Lütke](https://x.com/tobi), Shopify CEO. Runs entirely on your own machine. No servers, no API keys, no cloud.

Here's the clever bit. When you ask QMD a question, it doesn't just search once. A small local model rephrases your query into several different shapes. Keyword variants. Semantic sentences. A hypothetical version of what the right answer might actually look like. All of them get searched in parallel against your markdown index. The results get fused, the reranker picks the winner. One question becomes many. One ranked list comes back.

![](https://assets.thecognitiveshift.com/articles/1777995754773-qmd-architecture.png)

What it does.

- Indexes your existing markdown files (no migration, no schema lock-in)
- Combines BM25 keyword search (the grep replacement) with vector embeddings (semantic) and an LLM reranker (gets the top result right)
- Returns ranked snippets with file paths and relevance scores
- Runs three search modes. `qmd search` (fast keyword, ~270ms), `qmd vsearch` (vector only), and `qmd query` (hybrid with reranking, ~10s, the recommended one)

What it does NOT do.

- Replace your markdown files (they remain the source of truth)
- Require a server (SQLite is already on every machine)
- Need API keys for cloud services (the embedding model runs locally)
- Demand a new file format (your existing notes work as-is)

The whole index is a single SQLite file at `~/.cache/qmd/index.sqlite`. Your markdown stays in git, where it belongs. The index isn't backed up, it's rebuilt on demand from your markdown in minutes. Delete it any time. Your data is never trapped. You own the memories that make your AI sessions great. 

## The Frontmatter Multiplier

QMD reads your markdown files as plain text. It doesn't have special handling for YAML frontmatter. But adding structured frontmatter to your notes still pays off, because every tag you write becomes a high-signal token in the search index.

```yaml
---
id: mem_2026-03-09_mike-t_catchup_a3f1b8c2
type: capture
entities: [mike-t, james-s]
topics: [executive-offsites, product-strategy]
created: 2026-03-09T14:32:00Z
relationships:
  - type: cross-domain
    target: mem_2026-01-09_mike-t_strategy_b8c2d4e1
    confidence: 0.9
---
```

Each note now carries its own DNA. Who it's about (`entities`), what it's about (`topics`), what it relates to (`relationships`), how confident the extractor was, and when it was created. The slug `mike-t` is a rare token that BM25 weighs heavily, far more than the word "Mike" which shows up everywhere. Vector embeddings of the surrounding chunks pick up the semantic neighbourhood. That's why your tagged notes outrank random mentions in a sea of noise.

This isn't QMD doing something clever with your frontmatter. It's you doing something clever with QMD. By tagging notes with entity slugs, topic tags, and typed relationships, you hand the search layer cleaner anchors than prose alone provides.

It's also a forward investment. The schema (entities, relationships, supersedes, confidence) is something I'm experimenting with to support graph-aware retrieval and entity-pivoting that QMD doesn't do today but the next layer up will. The notes you write now keep paying interest as the retrieval layer gets smarter.

This is the part Second Brain templates have been missing. The notes have always been good. The retrieval layer is what's been holding the rest of the system back.

## Why This Doesn't Break Your Brain

I don't want you to throw out your Second Brain. I want you to *upgrade the search layer* without disturbing anything else.

- Your markdown stays the source of truth
- Your folder structure stays
- Your `/plan` and `/learn` commands stay (with one tweak, they query QMD instead of grep).
- The AI on top stays the same model
- Your existing notes work as-is. Backfilled frontmatter is a bonus, not a requirement

You add one binary. You point your search command at it. You keep working.

## What One Customer Did Within the First Hour

I am shipping QMD to my Flow OS clients, one in particular runs a newsletter with thousands of subscribers and five years of archives. Within an hour of finishing setup, he was running queries against his own work. Finding which past editions might resonate with a potential sponsor. Surfacing themes he'd forgotten he'd covered. Pulling out his own insights for repurposing.

He didn't spend all day reading through his old sends. He just asked and seconds later had the perfect examples of prior work. 

That's what your Second Brain can unlock the moment the search layer stops being a grep.

## How Do I Use QMD?

If you're already running a Second Brain and want the easiest way to upgrade, point Claude at this template and ask it to run the brain transplant. Your Second Brain keeps its shape. The Flow OS core takes over the thinking. Here's what happens during the procedure.

1. Audits your existing memory folder for structure
2. Backs everything up to a fresh git branch (so nothing is lost)
3. Adds frontmatter to your existing markdown files (backfilled by an LLM pass)
4. Installs QMD locally and indexes your collection
5. Updates your `/plan` and `/learn` commands to query through QMD instead of grep

You should be done in under an hour. But if you feel like you want more support or get started with Flow OS, [book a call with me here](https://thecognitiveshift.com/training/) to chat. Here's what some of my customers are saying.

> "I feel like I'm living in the future already." - Tom Parker

> "This is great. I am feeling like I have the keys to a Ferrari." - John Farrall

> "Yeah, this is pretty f****** exciting. I can build. I can do anything." - Karan Bavandi
