# Contributing to The Cognitive Shift

## Option A: Visual Editor (recommended for non-developers)

1. Go to [thecognitiveshift.com/keystatic](https://thecognitiveshift.com/keystatic)
2. Log in with your GitHub account
3. Create your author profile, publication (if new), and article using the form UI
4. Upload images via the [Image Vault](https://thecognitiveshift.com/contribute/vault) and paste the CDN URLs into your content
5. Hit **Save** — this creates a pull request for review
6. Once reviewed and merged, your article goes live automatically

## Option B: Git Workflow (for developers)

### Before you start

You'll need:
- A GitHub account
- Write access to this repo (ask Rhys)

### Step 1: Set up your author profile

Create a file at `src/content/authors/your-name.md`:

```md
---
name: "Your Name"
bio: "A short one-liner about you."
avatar: "https://assets.thecognitiveshift.com/authors/your-name.jpeg"
---
```

Upload your avatar via the [Image Vault](https://thecognitiveshift.com/contribute/vault) — choose the **Authors** category, then paste the CDN URL above.

The filename becomes your author slug — use lowercase with hyphens.

### Step 2: Create your publication

Each publication is its own series. Create a file at `src/content/publications/your-pub-slug.md`:

```md
---
name: "Your Publication Name"
description: "One sentence describing what this publication covers."
owner: "your-name"
---
```

### Step 3: Write your article

Create a Markdown file at `src/content/articles/your-pub-slug/your-article-slug.md`:

```md
---
title: "Your Article Title"
excerpt: "One or two sentences shown on listing pages."
authors: ["your-name"]
publication: "your-pub-slug"
publishedAt: 2026-02-20
tags: ["topic-one", "topic-two"]
featuredImage: "https://assets.thecognitiveshift.com/your-image.jpg"
---

Write your article here in Markdown.

## Headings like this

Regular paragraphs, **bold**, *italic*, [links](https://example.com), and:

> Blockquotes work too.
```

**Images:** Upload via the [Image Vault](https://thecognitiveshift.com/contribute/vault) and reference by the full CDN URL it gives you. Choose the appropriate category (articles, authors, publications, or general). Do not commit images to the Git repo.

**SEO is automatic.** Your `title` becomes the page title and `og:title`, `excerpt` becomes the meta description and `og:description`, and `featuredImage` (optional) becomes the `og:image`. No extra configuration needed.

### Step 4: Submit via pull request

1. Create a new branch: `git checkout -b article/your-article-slug`
2. Add your files (author, publication if new, article)
3. Commit and push: `git push -u origin article/your-article-slug`
4. Open a pull request on GitHub
5. Rhys reviews and merges — the site auto-deploys

## Quick reference

| What | Where |
|------|-------|
| Visual editor | [thecognitiveshift.com/keystatic](https://thecognitiveshift.com/keystatic) |
| Author profiles | `src/content/authors/{slug}.md` |
| Publications | `src/content/publications/{slug}.md` |
| Articles | `src/content/articles/{pub-slug}/{article-slug}.md` |
| Image uploads | [thecognitiveshift.com/contribute/vault](https://thecognitiveshift.com/contribute/vault) |
| Image CDN | `https://assets.thecognitiveshift.com/` (Cloudflare R2) |
