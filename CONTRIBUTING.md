# Contributing to The Cognitive Shift

## Before you start

You'll need:
- A GitHub account
- Write access to this repo (ask Rhys)

## Step 1: Set up your author profile

Create a file at `src/content/authors/your-name.md`:

```md
---
name: "Your Name"
bio: "A short one-liner about you."
avatar: "/assets/authors/your-name.jpeg"
---
```

Add your avatar image to `public/assets/authors/your-name.jpeg` (square, any size).

The filename becomes your author slug — use lowercase with hyphens.

## Step 2: Create your publication

Each publication is its own series. Create a file at `src/content/publications/your-pub-slug.md`:

```md
---
name: "Your Publication Name"
description: "One sentence describing what this publication covers."
owner: "your-name"
---
```

## Step 3: Write your article

Create a Markdown file at `src/content/articles/your-pub-slug/your-article-slug.md`:

```md
---
title: "Your Article Title"
excerpt: "One or two sentences shown on listing pages."
authors: ["your-name"]
publication: "your-pub-slug"
publishedAt: 2026-02-20
tags: ["topic-one", "topic-two"]
---

Write your article here in Markdown.

## Headings like this

Regular paragraphs, **bold**, *italic*, [links](https://example.com), and:

> Blockquotes work too.
```

## Step 4: Submit via pull request

1. Create a new branch: `git checkout -b article/your-article-slug`
2. Add your files (author, publication if new, article)
3. Commit and push: `git push -u origin article/your-article-slug`
4. Open a pull request on GitHub
5. Rhys reviews and merges — the site auto-deploys

## Quick reference

| What | Where |
|------|-------|
| Author profiles | `src/content/authors/{slug}.md` |
| Publications | `src/content/publications/{slug}.md` |
| Articles | `src/content/articles/{pub-slug}/{article-slug}.md` |
| Images | `public/assets/` |
