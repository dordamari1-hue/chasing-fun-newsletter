# github-publish-prompt.md

> The internal prompt the agent uses when shipping an approved post to GitHub → Vercel.
> Replaces what would have been wordpress-publish-prompt.md.

---

## Preconditions

- Dor said: `מאשר להעלות` / `Ship it` / equivalent
- Approved HTML lives at `05-outputs/drafts/weekend-insights-{N}.html`
- All UTMs verified

---

## Steps the Agent Runs

### 1. Move file
```bash
mv 05-outputs/drafts/weekend-insights-{N}.html \
   site/posts/weekend-insights-{N}.html
```

### 2. Update homepage index
Edit `site/index.html` between `<!-- POSTS_LIST_START -->` and `<!-- POSTS_LIST_END -->`. Insert new card on top:
```html
<a href="/posts/weekend-insights-{N}" class="post-card">
  <div class="post-meta">{date_he} · גיליון #{N}</div>
  <div class="post-title">{post_title}</div>
  <div class="post-excerpt">{teaser}</div>
</a>
```
Where:
- `date_he` = Hebrew-formatted date, e.g. `1 במאי 2026`
- `teaser` = 8-12 words pulled from Wave #1 or forecast

If empty-state card exists, replace it (only the first time).

### 3. Stage + commit
```bash
git add site/posts/weekend-insights-{N}.html site/index.html
git commit -m "Publish: Weekend Insights #{N} — {short_topic}"
```

### 4. Push
```bash
git push origin main
```

### 5. Poll Vercel deploy
Use `mcp__c5a5e2c5-a870-469a-bf09-267cfeca8f39__list_deployments` (limit 1) until state = `READY`.
Timeout after 90 seconds → escalate.

### 6. Archive published copy
```bash
cp site/posts/weekend-insights-{N}.html \
   05-outputs/published/weekend-insights-{N}_{YYYY-MM-DD}.html
```

### 7. Append analytics row
Open `06-analytics/weekly-performance-template.md`, append:
```
| {N} | {YYYY-MM-DD} | {short_topic} | {published_url} | {community_link} | | | |
```
(Empty trailing cells get filled later when measurements come in.)

---

## When Git is Not Available in the Sandbox

The agent's bash sandbox may not have GitHub credentials. In that case:

1. Write the moved file + updated index locally (the agent CAN do this on Dor's filesystem)
2. Tell Dor: *"הקבצים מוכנים. תעלה לגיטהאב דרך הדפדפן: עריכה ב-`site/posts/weekend-insights-{N}.html` (תחליף תוכן) + עריכה ב-`site/index.html` (תכניס את הכרטיס החדש בראש הרשימה). פירוט מלא ב-`07-integrations/github-vercel-setup.md` סעיף 'Weekly Workflow After Setup'."*
3. Wait for Dor to confirm push completed
4. Then proceed to step 5 (poll Vercel)

---

## Failure Recovery

| Failure | Action |
|---|---|
| Vercel build fails | Fetch `get_deployment_build_logs`, surface error to Dor, do NOT auto-rollback |
| Push rejected (non-fast-forward) | `git pull --rebase origin main`, then push again |
| Live URL 404 | Verify Vercel Root Directory is still `site/`; check filename casing |
| Push auth fails | Stop, delegate the push to Dor, then resume from step 5 |
