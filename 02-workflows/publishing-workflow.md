# publishing-workflow.md

> Mechanical steps from approval to live post. Pure automation — no judgment calls here.

---

## Pre-Publish Checklist

Run through `00-core/DEPLOYMENT_RULES.md` → "Pre-Publish Checklist" section.
If any item fails → loop back to feedback round.

---

## Publishing Steps

### 1. Move draft → site
```
Move: 05-outputs/drafts/weekend-insights-{N}.html
  →   site/posts/weekend-insights-{N}.html
```

### 2. Update homepage
Open `site/index.html`, locate `<!-- POSTS_LIST_START -->`, insert new card at top per `DEPLOYMENT_RULES.md`.

### 3. Commit
```
git add site/posts/weekend-insights-{N}.html site/index.html
git commit -m "Publish: Weekend Insights #{N} — {short topic}"
```

### 4. Push
```
git push origin main
```

### 5. Wait for Vercel deploy
- Use `mcp__c5a5e2c5-a870-469a-bf09-267cfeca8f39__list_deployments` to poll status
- Expected duration: 25–45 seconds
- If deploy fails → fetch build logs (`get_deployment_build_logs`) and report to Dor

### 6. Verify live URL
Open `https://chasing-fun-newsletter.vercel.app/posts/weekend-insights-{N}` and confirm 200 OK.
(Note: agent's network access to Vercel may be restricted — if so, ask Dor to verify on his phone.)

### 7. Archive
```
Copy: site/posts/weekend-insights-{N}.html
   →  05-outputs/published/weekend-insights-{N}_{YYYY-MM-DD}.html
```

### 8. Log analytics row
Append to `06-analytics/weekly-performance-template.md`:
```
| {N} | {YYYY-MM-DD} | {short topic} | {published_url} | {community_link} |
```

### 9. Compose final response to Dor
Per `weekly-newsletter-workflow.md` step 9.

---

## Failure Modes

| Failure | Recovery |
|---|---|
| Git push fails (auth) | Stop, ask Dor to push manually |
| Vercel deploy fails | Fetch logs, surface error to Dor, do not retry blindly |
| Live URL returns 404 | Verify Vercel Root Directory is still `site`; check filename casing |
| Hebrew chars look mangled | Re-encode file as UTF-8 BOM-less |

---

## Never Do During Publishing

- Force-push
- Rewrite git history
- Delete previous posts
- Push from a branch other than `main`
- Trigger a redeploy without a new commit (creates noise in deploy logs)
