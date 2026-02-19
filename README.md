# The Cognitive Shift

**[thecognitiveshift.com](https://thecognitiveshift.com)**

Static site built with [Astro](https://astro.build), deployed to Cloudflare Pages. Pushes to `main` auto-deploy.

---

## Editing content

All content is Markdown files in `src/content/`. Edit them directly on GitHub or clone the repo locally.

| What | Where |
|------|-------|
| Articles | [`src/content/articles/{publication}/{article}.md`](src/content/articles/) |
| Publications | [`src/content/publications/{slug}.md`](src/content/publications/) |
| Author profiles | [`src/content/authors/{slug}.md`](src/content/authors/) |
| Images | [`public/assets/`](public/assets/) |

### Quick edit on GitHub

1. Navigate to the file above
2. Click the pencil icon to edit
3. Commit to a new branch and open a pull request
4. Once merged, the site auto-deploys

## Adding new content

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for the full guide.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # Build to dist/
```
