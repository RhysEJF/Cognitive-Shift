# The Cognitive Shift — Launch Checklist

> Last updated: 2026-02-17

## Status: Soft Launch (site deployed, backend not connected)

---

## 1. DNS & HTTPS
- [x] A records pointing to GitHub Pages IPs (185.199.108-111.153)
- [x] CNAME `www` → `thecognitiveshift.com`
- [x] CNAME file in repo set to `thecognitiveshift.com` (apex domain)
- [x] HTTPS certificate issued by GitHub/Let's Encrypt
- [x] Enforce HTTPS in GitHub repo Settings → Pages

## 2. Open Graph / Social Sharing
- [x] OG + Twitter Card meta tags on all pages (index, signup, publications, authors, 404)
- [ ] Generate OG image (1200×630px) and upload to `assets/og-image.png`
- [ ] Test social previews at https://opengraph.xyz

## 3. PocketBase Collections (BLOCKING — signups broken without this)
PocketBase is running at `https://pocketbase-production-3085.up.railway.app`
Admin UI: `https://pocketbase-production-3085.up.railway.app/_/`

Create collections per `POCKETBASE-SCHEMA.md`:
- [ ] Extend `users` auth collection (add display_name, slug, bio, avatar, role)
- [ ] Create `publications` collection (name, slug, description, cover_image, owner, editors, is_active)
- [ ] Create `articles` collection (title, slug, excerpt, content, author, publication, featured_image, is_published, published_at, tags)
- [ ] Create `newsletter_subscribers` collection — **set public create rule (empty string "")**
- [ ] Create `community_applications` collection — **set public create rule (empty string "")**
- [ ] Test newsletter signup from landing page (end-to-end)
- [ ] Test community application from /signup/ page (end-to-end)

## 4. Resend (Email Sending)
- [ ] Create Resend account at https://resend.com
- [ ] Get API key
- [ ] Verify sending domain (add DNS records Resend provides)
- [ ] Test `send-newsletter.js --dry-run`
- [ ] Test `send-community-invite.js --dry-run`

## 5. First Content
- [ ] Create your author profile in PocketBase (users collection — display_name, slug, bio, avatar)
- [ ] Create first publication (e.g., "Bottleneck Cartography" or similar)
- [ ] Write and publish first article
- [ ] Verify article renders correctly on the site
- [ ] Verify newsletter modal appears on article scroll (30% trigger)

## 6. Nice-to-Haves (Post-Launch)
- [ ] Automate newsletter sending (cron job on Railway)
- [ ] Automate community invite emails (cron or PocketBase hook)
- [ ] Add favicon / apple-touch-icon
- [ ] Add Google Analytics or Plausible
- [ ] Add RSS feed for publications
- [ ] SEO: submit sitemap to Google Search Console

---

## Architecture Reference

| Component | Where | URL |
|-----------|-------|-----|
| Static site | GitHub Pages | https://thecognitiveshift.com |
| Repo | GitHub | https://github.com/RhysEJF/Cognitive-Shift |
| CMS + Forms | PocketBase on Railway | https://pocketbase-production-3085.up.railway.app |
| Email sending | Resend (scripts in `/scripts/`) | https://resend.com |
| Domain registrar | GoDaddy | — |
| Design system | `DESIGN-SYSTEM.md` | — |
| DB schema | `POCKETBASE-SCHEMA.md` | — |
| Digital Twin outcome | `out_wzaiVsINHd7t` | — |
