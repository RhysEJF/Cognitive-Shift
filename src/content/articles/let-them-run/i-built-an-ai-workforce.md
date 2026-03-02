---
title: 'I Built an AI Workforce That Runs While I Walk, Talk and Sleep'
excerpt: "Everyone's grinding in Cursor. I was too. So I built an AI workforce manager where I describe the outcome, deploy swarms overnight, and only get pulled back in when they're stuck."
authors: ["rhys-fisher"]
publication: "let-them-run"
publishedAt: 2026-03-02
tags: []
---

Everyone's grinding in Cursor. I was too. I launched two products this year, [RideReady](https://rideready.xyz/) and [fizz](https://fizz.fit/), and nearly lost my mind vibe coding them into existence. You can only say "fix it, it doesn't work" so many times before you start imagining a world where these things run while you sleep. So I built an AI workforce manager where I describe the outcome, deploy swarms overnight, and only get pulled back in when they're stuck. It breaks, I fix the system, and next time it breaks less. This is what it looks like when you stop being the cognitive bottleneck and start being the swarm operator.

---

## The bottleneck has moved

Every generation of tooling promises to make building faster. And every generation reveals that speed was never really the constraint.

When GitHub Copilot arrived, developers celebrated writing code faster. When Cursor and Claude Code followed, non-developers like me could suddenly ship products from scratch. But here's what nobody warned us about. When execution gets cheap, the bottleneck shifts upstream. It moves from "can you build it?" to "can you describe what's worth building, and why, with enough clarity that something else can go and do it?"

I noticed this halfway through building fizz. The hours I spent getting the best results weren't the ones where I was writing better prompts. They were the ones where I stepped back and wrote a clearer description of what I actually wanted. The bottleneck was never my typing speed. It was my thinking. The industry has a name for this shift. From human-in-the-loop, where you supervise every step, to human-on-the-loop, where you set the intent and only get pulled in when it matters. But the way it felt to me was simpler than that. I stopped being an operator and started being an orchestrator.

I experienced this shift firsthand. Not as theory, but as pain.

## 128 hours in the loop

I'm not a developer. I cut my teeth in marketing, ran a boutique data analytics consultancy, then co-founded [AskRally](https://askrally.com/) before starting a venture studio. I've never attached my identity to writing code. That turned out to matter.

At the start of this year, I vibe coded two products from scratch. RideReady is an automated bike component wear tracker. As you ride, it calculates kilometres across your components and alerts you for maintenance. fizz is stranger. Connect Strava, complete an activity, and it generates a dancing AI video of you in the right sportswear, in the right scene. Hike in Spain, and you're hiking in Spain.

![RideReady and Fizz product screens](/assets/rideready-fizz-screens.png)

fizz took eight days of sixteen-hour sessions. Most of the core product came together in a couple of days, but then I spent the rest trying to hack-proof it. AI video generation is expensive, and I didn't want someone exploiting the system and draining my account.

The loop looked like this. Prompt the LLM, run the code, find the bug, prompt again. I knew what the MVP should be almost immediately. But I was burning my best days in the weeds while the vision document sat unfinished and the deployment plan gathered dust. Feature creep was eating the hours I should have spent on go-to-market, on strategy, on the next idea.

That's when I stopped asking "how do I code faster?" and started asking "what if I wasn't in the editor at all?"

## From operator to orchestrator

Because I'm not a developer, I had no ego keeping me at the keyboard. If handing the whole process to agents worked, I'd happily do it. There were more valuable things I could spend my time on.

That's the mindset behind Flow, my R&D experiment in what I'm calling outcome-first orchestration. The concept is simple. Instead of prompting an LLM line by line, I describe an outcome. Build this app, decode that content formula, research this market. I shape a vision. What are we trying to do, what does success look like, what opinions do I have on how the work should be done. Then I deploy autonomous workers and let them run.

![Flow outcome interface with intent and success criteria](/assets/flow-outcome-interface.png)

An outcome is a structured brief. Intent, success criteria, context sections. I can talk into it, literally ramble about wanting the app optimised for virality, or wanting agents to build a custom scraper before tackling the main task. Flow detects skill and tool dependencies automatically. It runs a two-phased implementation. First it deploys workers to build the required capabilities (scrapers, analysers, whatever the main task needs) and then it deploys workers to execute on the actual outcome.

Think of it as taking a generic group of agents and turning them into a specialised unit aimed at one specific goal. The vision, not the code, is what shapes the quality of the output.

## The retro loop

The system breaks constantly. The first few days of running projects through Flow, I was getting pulled in left, right and centre. Agents hit ambiguity, got stuck in loops, or just failed. Every time, the observability layer (I call it HOMЯ) would escalate and surface a decision. Add more context, split it.

![HOMЯ escalation with decision options](/assets/homr-escalation.png)

You can only take so much of that before you add a YOLO mode. So I did. YOLO mode puts another AI in the human-in-the-loop seat, letting it make decisions that would normally require me. This is the shift from human-in-the-loop to human-on-the-loop in practice, not as a theoretical framework, but as something I built because I needed to sleep.

The real breakthrough, though, is what happens after. The U.S. Army developed a practice in the 1970s called the After Action Review, a structured debrief where soldiers analyse what was supposed to happen, what actually happened, and what to do differently next time. Peter Senge called it "one of the most successful organisational learning methods yet devised." I built the AI equivalent.

After every completed outcome, I run an automated retrospective. It analyses every escalation, every moment HOMЯ pulled me in, every failure point, and surfaces ideas for how the system can improve itself. Some features it's suggested are things I'd never have come up with, or at least not without spending hours combing through error logs for patterns. I approve the ones I like, and Flow creates a new outcome focused on implementing them.

![Retro output with suggested improvements](/assets/retro-improvements.png)

There's a flywheel here. The more work I push through, the more it learns, the less it escalates, the less it needs me. I've committed to getting kicked in the teeth as much as possible over the next few months, feeding it every project I can, to see how fast the flywheel spins.

## Beyond code

This isn't just for building apps. I pointed the swarm at a content creator called Etymology Nerd (millions of followers, incredible short-form videos) and told it to download his recent YouTube content, extract transcripts, and analyse his format.

It built the scraper. It built the transcript extractor. It created skills for how to use those tools. Then it ran the analysis. [The output was remarkable.](https://docs.google.com/document/d/1F4KcCX3xX8vvohaWBiarTv0oq-LPY-LFBp83jddcqHo/edit?usp=sharing) His core formula broken down into hook patterns, body structures, transition techniques, rhetorical devices. The kind of teardown that would have taken me days, distilled into something I could paste into a Claude project and say "create video transcripts in this style."

![Etymology Nerd content analysis output](/assets/etymology-nerd-analysis.png)

Now every Sunday I generate a batch of transcripts, add them to my Google Calendar, and each morning I read from one and publish a video. His formula produces one video a week because of the research involved. I could do ten a day.

## The walk that built a bike mechanic

Flow also works through the CLI and Telegram, which solved a problem that's nagged me for years. I have my best ideas on walks. By the time I get home, make a note, and remember to act on it, the momentum is gone. My notes are messy. I forget to read them. The idea dies quietly in a list.

Now I talk into Telegram mid-walk. There's a Claude agent between me and Flow that has a skill on how to pilot the whole system. It knows the CLI commands, how to structure outcomes, how to prep and deploy runs. I ramble at it, it prepares the project, and hits run. By the time I'm back, there's something to look at.

<iframe width="315" height="560" src="https://www.youtube.com/embed/2HGnnzuidIQ" frameborder="0" allowfullscreen></iframe>

A few days ago I tested this with something personal. I was out walking and threw it a task. Build me a maintenance guide for my bike. Not a generic one. Something specific to my exact components.

Here's what happened. Flow deployed agents to do deep research and build an AI agent that could act as my bike mechanic, one that understood component-level maintenance. Then the bike mechanic agent prepped an interview and actually interviewed me about every component on the bike. What groupset, what wheels, what tyres, what year, what condition. Once it had all that context, it prepared a [component-specific maintenance guide](https://docs.google.com/document/d/16Hw3HpV-WV6_tids9bssPww8RUkhyZlqirBIc9XdM28/edit?usp=sharing) tailored to exactly what I'm riding.

![Bike mechanic component guide](/assets/bike-mechanic-guide.png)

That whole chain, research, agent creation, interview, personalised guide, kicked off from a voice message on a walk. That's when the thesis became real to me. The bottleneck isn't building. It's knowing what to describe and caring enough about the outcome to describe it well.

## Let them run

Here's the part that's hard to say out loud.

Every one of these experiments required me to let go of something I was attached to. The vibe coding grind felt productive, even when it wasn't. Being in the editor, watching the code scroll by, fixing things with my own prompts, that felt like work. Walking away from the keyboard to go on a walk felt like skiving.

But the discomfort is the point. We've spent years building identities around the work-about-the-work, the debugging, the prompt-wrangling, the late nights in Cursor. Letting an AI dissolve a cognitive bottleneck you've attached your ego to is genuinely uncomfortable. It means admitting that your value isn't in the execution. It's in the vision, the taste, the messy human judgment about what's worth building in the first place.

The U.S. Army learned this when they moved from top-down performance critiques to After Action Reviews. The breakthrough wasn't better soldiers; it was leaders learning to let the team surface its own lessons. The breakthrough wasn't control. It was trust.

I think the same thing is happening now with AI swarms. The builders who thrive won't be the ones who code fastest. They'll be the ones who can hold a clear vision, describe it with precision, and then do the hardest thing of all. Walk away and let them run.

I'm publishing these experiments at thecognitiveshift.com, and together with Shaun we've created a community called Swarm Operators. We're going to have to answer some tough questions over the next twelve to twenty-four months. I'd rather be in the messy middle when those questions arrive than theorising from the sidelines.
