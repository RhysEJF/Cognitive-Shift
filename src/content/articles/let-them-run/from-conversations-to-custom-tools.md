---
title: '133 Forgotten Conversations. 9,529 Lines of Intelligence. Zero Monthly Fees.'
excerpt: >-
  I asked my AI second brain to extract knowledge from a year of meeting
  transcripts. It mined 133 conversations into 40+ contact profiles and 9,500
  lines of structured intelligence. Then it built me a replacement for the
  transcription tool I was paying for. Overnight. While I slept.
authors:
  - rhys-fisher
publication: let-them-run
publishedAt: 2026-04-16
tags:
  - ai-second-brain
  - flow-os
  - compound-knowledge
  - claude-code
  - agent-orchestration
draft: false
---
I was staring at a $20 invoice from Tactiq, my meeting transcription tool at the time, when I made the mistake of asking a question that cost me a few hours.

*"What if I ran these transcripts through my custom Claude Code persistent memory ingestion system?"*

Not transcribe. Not summarise. A Custom Claude Code setup that learns and gets smarter with use. As in extract the relationships, the decisions, the frameworks, the promises people made, the things I said I'd do and forgot about. The stuff that matters six months later when you're building something where the conversation you had would have been a real unlock.

That question set off a chain reaction that ended with me cancelling the subscription entirely. [Flow OS](https://thecognitiveshift.com/training) took the night shift and built my own transcriber. But the transcriber isn't the interesting part. The interesting part is what happened before that.

## One Conversation, Six Outputs

I started with a single transcript. A strategy call with my co-founder Mike, recorded by Tactiq, sitting in a place I'd never looked at twice.

I fed it to my AI second brain (a system I've been building called Flow OS, which gives Claude Code persistent memory across sessions) and asked it to extract everything useful.

![](https://assets.thecognitiveshift.com/articles/1776288900-image.png)

From one hour-long conversation, the system produced:

**A contact profile** with details I'd forgotten I knew. Mike's current venture priorities, his rate card, his network connections, his tax situation. Not because any of that was the point of the call. It was ambient context that a human brain discards but a persistent system captures.

**A relationship timeline** tracking how our dynamic has evolved. It even captured how our co-founder dynamic had shifted in a nuanced, meaningful, and positive way. Fourteen distinct relationship moments, each tagged with whether it was constructive, a milestone, or a signal worth watching.

**A conversation summary** with ten structured discussion points. Not bullet points from the transcript. Structured knowledge: "*Skills remain valuable even as models improve"* backed by Mike's specific argument about employee handbooks at McDonald's. "*Everything is a search problem*" with his battleship analogy for entrepreneurship.

**Three actionable decisions** I'd made during the call and subsequently forgotten about. Pursue the [x] partnership in [y] way. Focus the [z] business and keep pushing the "[Darwinian idea testing](https://thecognitiveshift.com/publications/let-them-run/simulated-darwinism-for-brand-website-design-systems/)". When it's worth [considering a salaried role](https://every.to/also-true-for-humans/i-achieved-the-four-hour-workweek-so-why-did-i-just-take-a-job) if the terms are right.

**Topic tags** that make this conversation searchable: askrally-strategy, skills-vs-models, search-problem-framework, training-business, [x]-partnership.

All of this from a transcript I'd never read. One conversation. Six structured outputs that feed directly into my working memory for the next time I talk to Mike, pitch a client, or make a decision about where to focus.

That's when I realised what I was sitting on.

## The Scale Problem (and the Browser That Solved It)

I had years of conversations in Tactiq. Over 700 transcripts from the past 12 months alone! Every client call, every co-founder sync, every exploratory chat with a stranger who might become important. All sitting in a SaaS tool's archive, doing nothing. Worse than nothing. Because I was paying $240/year for it.

I wanted them all in my system. Tactiq lets you auto-push to places, but wouldn't let me bulk export to drive.

So I did what any reasonable person would do. I asked my AI to figure it out.

Flow OS has Playwright integrated as a browser automation tool out of the box. Instead of me reverse-engineering Tactiq's UI and writing a scraping script, I went for a bike ride on my [vibe coded gravel bike](https://howlerbikes.com/), and just DM'd my system over telegram, pointed at Tactiq and told it to figure out how to save each transcript to Google Drive.

It logged in, discovered the sequence of buttons to click, and templated the process. Then it spun up 50 parallel agents that progressively worked through saving every transcript, handling pagination, waiting for uploads, moving to the next one.

After filtering based on contacts who I've spoken to this year, 133 transcripts saved to Google Drive. From there, I ran the same /learn command that had worked on the single conversation. But this time, at scale.

The system processed all 133 transcripts and produced: 40+ contact profiles (created or enriched), relationship timelines for everyone I'd had multiple conversations with, structured summaries for every call, and a web of cross-referenced context that connected conversations to each other.

201 files changed. 9,529 lines of structured knowledge extracted from conversations I'd already had and forgotten about.

## The $240 Question

With all my transcripts now flowing through my own pipeline, I looked at Tactiq differently. Because my system had just worked around their lack of a feature, so it prompted the question "*what am I really paying for*?", and probably more importantly "*do I even trust this vendor*?"

I landed on them being a Chrome extension that joins my Google Meet calls, reads the captions Google already generates, and saves them. That's it. The captions already include speaker names. Google does the speech recognition. Tactiq just reads the DOM and stores the text.

I'd been paying $20 a month for a MutationObserver. FML.\
\
Then I remembered I had swarms [generating books end-to-end overnight](https://thecognitiveshift.com/publications/let-them-run/swarm-intelligence-the-book-86-ai-agents-wrote-while-i-slept/) that were selling! Surely it could have this ready by morning.

## The Overnight Build

I used Flow OS to configure the long-running agent orchestration add-on, with an outcome to build a replacement. It created a plan, broke it into tasks, and deployed an autonomous worker before bed.

The plan was simple. Fork an open-source Chrome extension called [TranscripTonic](https://github.com/vivek-nexus/transcriptonic) that already knows how to read Google Meet captions. Add a webhook that posts the transcript to a local server. Have that server upload to Google Drive in the exact format my learning pipeline expects.

Nine tasks. The worker picked them up one by one, autonomously. Fork the repo. Strip it down. Design the output format. Build the webhook. Wire them together. Rebrand. Add error handling. Test.

I checked in the morning. Nine of nine tasks complete. A working Chrome extension, tested and ready.

I loaded it in Chrome, joined a test call, talked for thirty seconds, hung up. Checked Google Drive. There it was:

```
title: "wuk-fekd-eaf"
date: "2026-04-15T17:46:14.522Z"
participants:
  - "Rhys Fisher"
source: meeting-transcriber
platform: google-meet
```

![](https://assets.thecognitiveshift.com/articles/1776288900-image.png)

With the full transcript, speaker names, timestamps. Exactly the format my pipeline consumes.

I joined a real call later that day. The transcript appeared in Drive with the meeting title pulled from my calendar, speaker names attributed correctly, the whole thing formatted and ready for extraction.

I cancelled Tactiq.

## What This Is Actually About

This isn't a story about saving $20 a month. It's about what happens when your AI has memory.

Most people use AI like a calculator. You type a question, you get an answer, you close the tab. The next conversation starts from zero. Every session is stateless. You're paying the context-loading tax every single time.

The moment your AI can remember what it learned yesterday, the economics change completely. Each conversation becomes compound interest. That strategy call with Mike didn't just produce a transcript. It produced structured knowledge that will inform every future interaction with him, every pitch to a similar client, every decision about where to focus.

![](https://assets.thecognitiveshift.com/articles/1776288900-image.png)

And when you stack enough of those conversations together, the system starts seeing patterns you can't. It notices that three different people mentioned the same concern about your positioning. It tracks that you promised four different people you'd follow up on something and haven't. It connects a framework someone mentioned in January to a problem you're trying to solve in April.

The transcriber was a side effect of this rabbit hole. I didn't set out to build one. I set out to mine my conversations for knowledge, hit a wall with the tool that was supposed to help, and realised the tool was the simplest part of the whole stack. The hard part, the valuable part, is the persistent memory layer that makes the knowledge compound.

If you're just getting started on your Claude Code journey or been on it for some months, and perhaps realised you might have skipped some foundational pieces, you're leaving most of the value on the table. Let's get you set up with [Flow OS](https://thecognitiveshift.com/training) and lets figure out what you can become when you're augmented.
