---
title: Flipping the Ralph Loop
excerpt: >-
  The Ralph Loop doesn't care which direction you point it. When you flip it (or
  run Ralph in reverse), it doesn't build, it reads. And what it reads from an
  existing system is something most teams can spend months wishing they had
  discovered, a specification of what the code actually does, extracted from the
  code itself. 
authors:
  - shaun-thresher
publication: workbench-ai
publishedAt: 2026-03-12
tags:
  - ralph loop
featuredImage: >-
  https://assets.thecognitiveshift.com/articles/1773252139374-man-upside-down.jpg
draft: false
---
You're running the Ralph Loop. You know the pattern, give the agent a spec, let it build, test, iterate. Almost everyone runs it the same direction: forward, toward something you want to create, like an app.

Here's the direction most practitioners haven't tried: backward. At code already existing.

Let me explain...

The Ralph Loop doesn't care which direction you point it. When you flip it (or run Ralph in reverse), it doesn't build, it reads. And what it reads from an existing system is something most teams can spend months wishing they had discovered, a specification of what the code actually does, extracted from the code itself.

This isn't theoretical. Huntley (the man who created Ralph Loop) demonstrated the full pipeline on ghuntley.com/tradecraft.

C source to assembly to specifications to a working ZX Spectrum tape image.
Binary to spec to reimplementation.

That's reverse mode running end-to-end, on compiled code, producing a functional output from extracted specifications.

The technique exists. The question is how to apply it systematically to a production codebase?

## Why your agents running forward loops are probably guessing

Every Ralph Loop iteration needs constraints to stay on track. Without a spec (or a weak spec), the agent reasons from first principles on each pass, what do I think this should do? That's why loops drift and why you end up re-prompting, correcting, pulling the output back toward what you actually want.

Lapsley describes this as "AI Drift", the tendency for LLM implementations to diverge from your actual requirements because those requirements were never made explicit. Most people fix drift by writing better prompts. That's the wrong fix.

The problem isn't the prompts. The problem is the agent has no authoritative description of what the system does, so it improvises. Every iteration without a spec compounds the divergence.

Or as Horthy put it: "if the specs are bad, the results will be meh." The corollary is worse, if the specs don't exist, the results are random. But if you're a senior engineer, you already know that.

The spec you need already exists. It's inside the code. Reverse mode with Ralph Loops can extract it.

## Running Ralph backwards

Not all applications carry the same risk or reward.

**Your own systems.** This is where you start. Point the loop at a codebase without documentation, your own, inherited, or acquired code base, and extract behavioral specs module by module. Using this technique you get two things: documentation reflecting current behavior rather than what someone intended two years ago, and a grounding context making every subsequent forward loop significantly more constrained. Low legal risk. High immediate return.

**Knowledge extraction.** Run it against academic papers, research PDFs, technical documentation, anything with structured knowledge. The output isn't specs in the software sense; it's structured summaries the loop can use as context. No legal risk. Quality depends on your source material.

**Competitive analysis / clean-rooming.** Extract specs from a competitor's publicly available code, docs, and marketing materials, then forward-build from those specs. Highest leverage, highest risk. Clean-room reverse engineering has 40+ years of legal precedent, but AI-assisted clean-rooming is legally untested. The traditional defense (separation between analysis team and implementation team) gets complicated when both roles are performed by the same model that may have the competitor's source in its training data. BSL and similar licenses may prohibit this contractually even where it's otherwise legal. If you're going here, involve legal counsel first.

Start with your own systems. It has the best risk-to-reward ratio and teaches you the failure modes before the stakes get higher.

## Preparation

A few things separate this working from not working.

**Domain knowledge is non-negotiable.** The model can faithfully describe bugs as features. Workarounds become intentional design. Without someone who can distinguish "this is what it does" from "this is what it should do," you're generating plausible fiction. A person with a trained eye needs to be in the loop during validation. One of the core benefits of having the end system online is you can then fill these domain gaps with overnight research runs, just how Rhys did here with his [Swarm Intelligence book](https://thecognitiveshift.com/publications/let-them-run/) before refactoring his harness.

**Sandbox your environment.** Docker, devcontainer, or equivalent. You know the drill.

**Know your language tier.** The loop uses ripgrep to search a codebase. Source-searchable languages work cleanly. Compiled dependencies require manual context engineering because the agent can't grep into binaries.

{% table %}
- Tier
- Examples
- What to expect
---
- Source-searchable
- Rust, TypeScript, Python, Go, Ruby
- Standard extraction. Ripgrep handles everything.
---
- Mixed (source + compiled deps)
- Java (JARs), .NET (DLLs)
- Extract from source. Document compiled deps as external contracts in the Assumptions section.
---
- Polyglot
- Node + Python, Go + TypeScript
- Extract by language boundary. Treat cross-tier interfaces as a separate module.
{% /table %}

**Your existing documentation is input, not output.** Product docs, API references, onboarding guides, marketing materials, gather everything before you start.

Huntley found running extraction against HashiCorp's open-source Nomad orchestrator that the public repository covered roughly 80% of behaviors, but product guides were required to fill in enterprise feature coverage not appearing in the source. Nomad is a workload orchestrator with a significant enterprise feature set beyond the open-source core, and without the product documentation, one in five behaviors would have been missing from the extracted specs.

*One scope note: this guide covers codebases. The same methodology works on other complex systems like workflows, processes, procedures, but the tooling here assumes source code.*

## What the extraction actually looks like

**Map the boundaries yourself first.** Identify the modules, services, or packages before running any loops. Don't ask the agent to figure this out because it will either try to do everything at once (context overflow) or pick arbitrary file groupings.

```
project/
├── specs/
│   ├── index.md              # System overview. You write this first
│   ├── auth/
│   ├── billing/
│   ├── api-gateway/
│   └── data-pipeline/
```

**Write index.md by hand.** 10-20 lines. What the system does, what the major modules are, how they connect. This framing document goes into every iteration's context window. Without it, the agent has no map.

If your system is under ~5,000 lines and you can read it in an afternoon, don't bother with reverse mode. Just read the code.

**Version control your specs from day one.** Commit spec files alongside the code they describe. Convention: `specs: extract [module-name]` on initial extraction, `specs: update [module-name] — [reason]` on corrections. Treat spec changes like code changes. This is what makes Roomba comparisons meaningful over time.

**Extract one module at a time, not as a batch.** Huntley's Nomad experiment and a handful of practitioners report roughly ~80% extraction accuracy on first pass, but that number comes from a small pool of projects and models, not a controlled benchmark. Your results will vary by codebase complexity, language, and model. At that approximate accuracy, batching 20 modules produces roughly 4 modules of output needing correction, and you won't catch the format inconsistencies until you've built the whole set. Start incremental. Switch to batch only after your first 3 modules look consistent.

**Context window discipline.** Liu et al.'s "Lost in the Middle" (TACL, 2024) demonstrated a U-shaped performance curve: models retrieve information well from the beginning and end of their context, but performance degrades significantly for information positioned in the middle, even for models explicitly designed for long contexts. Practitioners have converged on keeping utilization below 60-70% as a working heuristic, though the paper itself doesn't prescribe a specific threshold. When module A depends on B, C, and D, load 3-5 line summaries of dependency interfaces instead of full specs, create `specs/[module]/dependencies-summary.md` for any module whose dependency specs collectively exceed 30% of your context window.

**Watch for overbaking.** Unconstrained extraction loops will over-specify. Horthy's team learned this on existing codebases and adjusted: "we have since set up any ralph-ish desired state loops to run ONCE on a cron overnight, and merge small iterations over time. Waking up to one small refactor every morning is better than both a) waking up to none and b) waking up to 50." The same discipline applies to reverse mode. One module per loop run. Review before the next.

Here's a prompt to get you started:

```markdown
# Task: Generate specification for [MODULE NAME]

## Context
You are analyzing an existing system. The system overview is in index.md.
Previously generated specs for related modules are included for reference.

## Instructions
Study the source code for [MODULE NAME] and produce a specification document describing:

1. **Purpose**: What this module does in one paragraph.
2. **Public interfaces**: Every function, endpoint, or method that other modules call.
   For each: name, parameters, return type, and what it does.
3. **Dependencies**: What this module requires from other modules or external services.
4. **Data contracts**: What data structures flow in and out.
5. **Behavioral contracts**: What guarantees this module makes.
   Include error handling behavior, retry logic, caching, etc.
6. **Assumptions**: What this module assumes about its environment
   that isn't enforced by types or tests.

## Rules
- Describe behavior, do not copy code.
- If behavior seems contradictory or unclear, flag it explicitly as "UNCLEAR:"
  rather than guessing at intent.
- If you find behavior that looks like a bug or workaround rather than
  intentional design, flag it as "INVESTIGATE:" with your reasoning.
- One module only. Do not analyze other modules even if you see their code.

## Output
Write the specification to specs/[module-name]/spec.md
```

Use this output format consistently, inconsistent formats make gap identification and Roomba comparisons much harder:

```
## Purpose
[One paragraph]

## Public Interfaces
- name:
- signature:
- returns:
- behavior:
- called-by:

## Dependencies
[What this module requires from other modules or external services]

## Data Contracts
[Data structures that flow in and out]

## Behavioral Contracts
[What guarantees this module makes — error handling, retry logic, caching, failure modes]

## Assumptions
[What this module assumes about its environment that isn't enforced by types or tests]
```

Flag consistently: `UNCLEAR: [behavior] — [why unclear]` and `INVESTIGATE: [behavior] — [hypothesis]`. These flags are your primary input for the gap review, so sloppy flagging compounds downstream.

If you're on Claude Code, the smart-ralph plugin's `/ralph-specum:index` command automates the initial scan and handles chunking, try it before building your own loop.

### What good extraction looks like

Here's actual process output, using a simple 3-module API backend as the example.

**The index.md:**

```markdown
# System: API Backend

A REST API backend serving a SaaS application. Handles user authentication,
subscription billing, and routes all external requests through a central gateway.

## Modules

- **auth**: Validates user identity. Issues and verifies JWT tokens.
  Called by api-gateway on every request.
- **billing**: Manages subscription state. Integrates with Stripe.
  Triggered by api-gateway on plan change events.
- **api-gateway**: Entry point for all external traffic. Enforces auth,
  routes to internal services, handles rate limiting.

## Key connections

api-gateway → auth (every request, before routing)
api-gateway → billing (on /subscribe and /cancel endpoints only)
billing has no dependency on auth
```

**The auth module spec:**

```markdown
## Purpose
Issues and verifies JWT tokens for the API backend. Provides two public
operations: token generation on login and token verification on each
inbound request. Does not handle session state, tokens are stateless.

## Public Interfaces

- name: generateToken
  signature: generateToken(userId: string, role: UserRole) → string
  returns: signed JWT string
  behavior: Issues a JWT with 24-hour expiry. Embeds userId and role
            as claims. Signs with RS256 using key loaded from KEY_PATH env var.
  called-by: api-gateway (on successful credential verification)

- name: verifyToken
  signature: verifyToken(token: string) → TokenPayload | null
  returns: decoded payload object or null if invalid/expired
  behavior: Verifies signature and expiry. Returns null on any validation
            failure — does not throw. Caller is responsible for handling null.
  called-by: api-gateway (middleware, on every inbound request)

## Dependencies
- KEY_PATH environment variable (path to RSA private key file)
- jsonwebtoken library (node_modules)

## Data Contracts
TokenPayload: { userId: string, role: UserRole, iat: number, exp: number }
UserRole: enum — "admin" | "member" | "readonly"

## Behavioral Contracts
- Tokens expire after 24 hours, not configurable at call time
- verifyToken never throws; returns null on all failure cases
- No token refresh logic — expired tokens require re-login

UNCLEAR: The KEY_PATH env var is loaded at module initialization, not per-call.
  If the key file changes while the service is running, the old key remains
  in memory until restart. Whether this is intentional or an oversight is
  not documented.

## Assumptions
- KEY_PATH points to a valid RSA private key at startup
- Callers check for null return from verifyToken before proceeding
- No token revocation is expected (no blocklist, no Redis dependency)
```

Notice what's specific: the signing algorithm (RS256), the 24-hour expiry, the failure behavior (null, not throw). If your extraction produces "this module handles authentication by verifying user credentials," that's too generic, see the failure modes below.

The UNCLEAR flag was brought to the engineer who owns the module. Her answer: "Intentional. Key rotation requires a restart anyway, we'd need to support two valid keys during the rotation window, and we haven't built that." The flag was resolved, the constraint documented, the Assumptions section updated.

## What surprises most people

This is where reverse mode earns its setup cost:

**The model documents your bugs.** It describes what the code does, not what it should do. Workarounds accumulated over three years look like intentional design. Constraints nobody wanted become documented behavior. This is actually useful, you now have an accurate map of what you're shipping, but it requires a human to separate "this is a decision" from "this is a mistake that became load-bearing."

**INVESTIGATE flags are your technical debt map.** When the model flags something as looking like a bug or workaround, it's usually right. Practitioners consistently report review fatigue reading AI-generated markdown, it looks grammatical and plausible, which makes errors harder to catch than reviewing code where bad patterns are visually obvious. The INVESTIGATE flags are where your surprises live. Don't skim them.

**Thin specs on complex modules diagnose human pain points.** If a module has 3,000 lines and the spec is two paragraphs, the model couldn't make sense of it. That's signal, not failure. Modules opaque to the extraction loop are typically opaque to the engineers who maintain them. Mark them with `REVIEW:`, prioritize them for human review, and understand that every forward-mode loop touching that module has the same opacity problem.

**Three failure modes and their fixes:**

- *Generic output* ("this module handles authentication"): your module is too large or your context is too full. Split at natural interface boundaries, halve the source files, re-run. If it's still generic after splitting, write the Purpose section by hand and extract only Public Interfaces and Behavioral Contracts, sometimes a human-written framing sentence is enough to break the model out of summary mode.
- *Invented behavior*: grep for the function name or behavior described. If it's not in the source, delete the claim and mark it `UNCLEAR:`. Increase scrutiny on the rest of that module's output, invention in one section means the model was filling gaps elsewhere too.
- *Suspiciously thin spec for a complex module*: don't re-run immediately. Mark it `REVIEW: This module requires manual review. Automated extraction produced minimal output.` Continue with other modules and return during validation with a human who knows the module. Thin output on a complex module usually means the code itself resists comprehension, not that the extraction failed.

**Filling what code doesn't reveal.** After extracting from source, run a separate pass over your non-code materials, product docs, API references, customer-facing descriptions. Customer-facing product descriptions are surprisingly complete behavioral specs as they describe what the system does from the user's perspective, capturing intent that code-level analysis misses.

```markdown
# Task: Fill specification gaps for [MODULE NAME]

## Context
The current specification for [MODULE NAME] is attached (spec.md).
The following gaps have been identified: [list gaps]

## Materials
- Product documentation: [files]
- API documentation: [files]
- Marketing materials: [files]

## Instructions
Review the supplementary materials and update the specification to fill
the identified gaps. For each addition:
- Mark new content with "SOURCE: [material name]" so it can be traced.
- If the supplementary material contradicts the existing spec,
  flag it as "CONFLICT:" with both versions.
- Do not remove existing spec content. Add to it.
```

**Validate before you trust.** The specs are hypotheses, not documentation. Validate every module in this order:

1. **Resolve every UNCLEAR and INVESTIGATE flag.** These are your highest-signal items. An unresolved flag is a known gap; a resolved flag is a confirmed behavior.
1. **For any behavior described, find the code that implements it.** Grep for the function name, the endpoint, the error message. If you can't find the implementation, the spec is inventing.
1. **Write a test for at least one behavioral contract.** Pick the most critical guarantee the spec describes and verify it holds. This is the cheapest way to catch specs that are grammatically correct but functionally wrong.
1. **Walk through with someone who owns the module.** If working solo, skip to step 5 instead.
1. **Feed the spec into a forward-mode loop and compare.** Ask the model to reimplement the module from the spec alone. If the output is structurally different from the actual implementation, the spec has gaps.

(Solo practitioners: steps 1-3 and 5 give you adequate validation without team access.)

The third-refinement rule from EPAM's practice: if you're making a third correction to the same spec, stop editing and re-extract from scratch. Accumulated errors are faster to restart than fix.

Horthy's August 2025 experiment demonstrates what this looks like in practice. He ran ralph against HumanLayer's existing frontend codebase with a "make the codebase match the standards" prompt. Ralph autonomously produced a `REACT_REFACTOR_PLAN.md` from the codebase, then implemented it over 6 hours. The PR wasn't merged due to rebase conflicts, but the plan document itself, extracted from existing code, describing what needed to change, is structurally identical to spec extraction. The code produced the spec, not the other way around. (PR: github.com/humanlayer/humanlayer/pull/513)

## Roombas and where it compounds

Most people stop at the initial extraction. That's where the leverage starts, not where the value compounds.

Once you have specs, you run lightweight reverse-mode loops on a schedule to catch drift, code changing without the spec updating. These are Roombas: small, focused, automated.

*A caveat: the Roomba patterns below are proposed workflows. Practitioners describe using them on individual projects, but there's no published evidence of teams running these at scale in production CI/CD pipelines. Treat them as starting points to adapt, not proven processes.*

Don't wait until all modules are extracted to set up your first one. After completing your first module spec, run the spec-drift Roomba on it immediately. If the output is garbage, your spec format needs adjustment, better to learn that at module 1 than module 14. Early Roomba setup also validates your flagging conventions and output structure before they propagate across the entire spec set.

**Spec drift Roomba:**

```markdown
# Task: Spec drift check for [MODULE NAME]

Compare the current implementation of [MODULE NAME] against its specification.

Report:
1. Behaviors in code NOT described in the spec (new undocumented behavior)
2. Behaviors in the spec NOT implemented in code (removed/broken features)
3. Behaviors that have changed from what the spec describes

For each finding, include the file and line number in the code
and the section in the spec.

Output to reports/spec-drift/[module-name]-[date].md
```

**Security Roomba:**

```markdown
# Task: Security review for [MODULE NAME]

Review the implementation of [MODULE NAME] against its specification's
security-relevant sections.

Flag:
1. Authentication/authorization checks described in spec but not in code
2. Input validation described in spec but not enforced
3. Data handling patterns that don't match spec (e.g., PII logged,
   secrets in plaintext, missing encryption)
4. New security-relevant behavior not described in any spec

Output to reports/security/[module-name]-[date].md
```

Run nightly or per-PR, not continuously. Wire them in:

- **PR review:** Run spec-drift against changed files. Output as a PR comment.
- **Sprint planning:** Run all Roombas weekly. The accumulated drift report becomes your prioritization input.
- **Post-incident:** After an outage, run reverse mode on affected components. The delta between "what the spec says should happen" and "what the code actually does" is your root cause surface area.

Start with reports, not auto-fixes. Auto-fix requires enough back pressure (tests, type checks, lints) to trust the output. Get comfortable with the report quality first.

Huntley has described a full auto-heal cycle where a reverse-mode loop identifies a problem and a forward-mode loop fixes, deploys, and verifies it (documented on ghuntley.com/loop and in the AI Giants podcast). That claim is not independently verified. Whether or not that specific implementation holds, the direction is right: specs that stay current and code that self-corrects against them.

## Conclusion

This is not a way to understand a system without documentation or reading code. The specs are a scaffold for human understanding, not a replacement for it.

The model will miss things. It will describe bugs as features. It will hallucinate non-existent behavior. Your job is to catch that. The specs make catching issues faster and more systematic, you're reading with a map instead of building from scratch.

**A note on cost and alternatives.** Running extraction loops against a large codebase burns tokens. For smaller systems (under ~5,000 lines, as noted above), a senior engineer with grep and an afternoon may produce better results faster and cheaper. Reverse mode earns its cost on codebases large enough that no single person holds the full picture.

**Model sensitivity.** These techniques were developed and tested primarily with Claude and GPT-family models. Results may differ across providers (Claude, GPT, Gemini, open-weight models) and across versions of the same model. An extraction workflow tuned for one model version is not guaranteed to produce equivalent output on the next. If you change models, re-validate a sample module before trusting the pipeline.

Two different accuracy numbers matter here and they measure different things. Extraction completeness (~80% of actual behavior captured on first pass) and post-review usability (60-80% of specs usable as-is, 20-40% needing correction) are practitioner-reported estimates from a small number of projects, not controlled benchmarks. Your numbers will vary by codebase size, language, domain complexity, and model. Extraction completeness tells you how much of the system the model found. Post-review usability tells you how much human cleanup the output requires. A spec can capture 80% of a module's behavior and still need correction on what it captured, these are different failure modes, not additive metrics.

## Sources

**Primary:** Huntley's ghuntley.com/loop, ghuntley.com/ralph, ghuntley.com/tradecraft (C-to-ASM-to-specs ZX Spectrum reimplementation)

**Practitioner accounts:** Horthy's HumanLayer history + August 2025 refactor experiment (humanlayer.dev, Jan 2026; PR #513) · Lapsley's spec-driven development + "AI Drift" concept (blog.davidlapsley.io, Jan-Feb 2026)

**Research:** Liu et al., "Lost in the Middle: How Language Models Use Long Contexts," TACL 2024 (arxiv.org/abs/2307.03172)

**Analysis:** beuke.org feedback theory analysis · Farr's Ralph Playbook (claytonfarr.github.io) · BoundaryML "AI That Works" podcast featuring Horthy (Oct 2025, youtube.com/watch?v=fOPvAPdqgPo)

**Further reading (not independently verified):** EPAM's Spec Kit implementation (epam.com) · Böttger's Spec Kit + Ralph (dominic-boettger.com) · AI Giants podcast (Codacy) · Dev Interrupted podcast (LinearB) · DreamHost first-principles analysis (dreamhost.com/blog)

**Legal:** Clean-room design precedent (Compaq/IBM, Sony v. Connectix, Apple v. Franklin) · Finnegan trade secret analysis · NTARI historical overview (Dec 2025)

**Tooling:** smart-ralph /ralph-specum:index (tzachbon/smart-ralph) · awesome-ralph resource catalog (snwfdhmp/awesome-ralph) · GitHub spec-kit and community discussion (#152 on evolving specs)
