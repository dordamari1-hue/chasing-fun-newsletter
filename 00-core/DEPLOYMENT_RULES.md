# DEPLOYMENT_RULES.md — How Posts Reach the Live Site

> Replaces what would have been WORDPRESS_RULES.md.
> Source of truth for the publish step.

---

## The Pipeline

```
Local file in site/posts/   →   git commit + push   →   Vercel auto-deploy   →   Live URL
```

**One push = one deploy.** Vercel rebuilds the entire site within ~30 seconds of the push being received on `main`.

---

## What Gets Deployed

Only `site/` is deployed. Everything outside `site/` (agent docs, drafts, prompts) is ignored by Vercel because the project's **Root Directory is set to `site`** (configured at project import time in Vercel).

---

## Where New Posts Go

- **File path in repo:** `site/posts/weekend-insights-{N}.html`
- **Live URL after deploy:** `https://chasing-fun-newsletter.vercel.app/posts/weekend-insights-{N}` (no `.html` because of `cleanUrls`)

---

## Updating the Homepage Index

The homepage (`site/index.html`) shows the most recent posts. When a new post ships, the agent must:

1. Open `site/index.html`
2. Find the comment markers `<!-- POSTS_LIST_START -->` and `<!-- POSTS_LIST_END -->`
3. Replace the empty-state block (or insert a new card at the top) using this pattern:
   ```html
   <a href="/posts/weekend-insights-{N}" class="post-card">
     <div class="post-meta">{date} · גיליון #{N}</div>
     <div class="post-title">{post_title}</div>
     <div class="post-excerpt">{1-line teaser}</div>
   </a>
   ```
4. Newest post on top.
5. Commit both files together (the new post + updated index).

---

## Commit Message Convention

```
Publish: Weekend Insights #{N} — {short topic}
```

Example:
```
Publish: Weekend Insights #5 — קיץ נפתח, תחזית גלי שני
```

---

## Pre-Publish Checklist (agent runs through this before pushing)

- [ ] All UTMs present and correctly formatted
- [ ] Hero block intact (title, subtitle, brand tag)
- [ ] All 5 waves present (or explicit confirmation from Dor that one is skipped)
- [ ] Dynamic CTA block present
- [ ] Fixed CTAs at bottom (newsletter + WhatsApp)
- [ ] Logo at footer
- [ ] Mobile preview mentally walked through
- [ ] Campaign name matches across all UTMs in the file
- [ ] Homepage `index.html` updated with new post card

---

## After Publish

The agent:
1. Returns the community-share link (with UTMs) to Dor
2. Returns the WhatsApp message text
3. Logs the campaign in `06-analytics/weekly-performance-template.md`
4. Copies the published HTML to `05-outputs/published/weekend-insights-{N}_{YYYY-MM-DD}.html` for archive

---

## Never Do

- Push directly to a non-main branch and expect it to deploy (Vercel only auto-deploys `main`)
- Hard-delete published posts (they live in git history forever — that's the point)
- Edit a published post without bumping a `last_updated` field in its meta (we want a full audit trail)
- Bypass the index update — homepage must always reflect the latest post

---

*Last updated: 2026-04-30.*
