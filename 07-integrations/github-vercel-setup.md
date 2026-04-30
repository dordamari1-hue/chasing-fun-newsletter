# GitHub + Vercel Setup Guide

> Goal: wire up GitHub and Vercel **once**, so that every weekly post the agent
> generates can be pushed with a single command and deployed automatically.
>
> Total time: ~10 minutes the first time. Zero minutes every week after.

---

## What you'll have when you're done

```
Local folder on your computer
   │
   │  git push
   ▼
GitHub repo: chasing-fun-newsletter
   │
   │  webhook
   ▼
Vercel project: chasing-fun-newsletter
   │
   │  builds + serves
   ▼
Live URL: https://chasing-fun-newsletter.vercel.app
```

Every time the agent commits and pushes a new post, Vercel rebuilds the site within ~30 seconds. No manual upload, no copy-paste, no WordPress editor.

---

## Prerequisites checklist

- [ ] GitHub account (free is fine) — *you said you have one ✅*
- [ ] Vercel account, signed in with the same GitHub account — *you said you have one ✅*
- [ ] Git installed locally on your machine
  - **Test:** open a terminal (PowerShell or Command Prompt on Windows) and run `git --version`. If you see a version number, you're good.
  - **If not installed:** download from <https://git-scm.com/download/win>

---

## Step 1 — Create the GitHub repo

1. Go to <https://github.com/new>
2. Repository name: **`chasing-fun-newsletter`**
3. Description: *Weekly newsletter site for Chasing Fun community*
4. Visibility: **Private** is fine (Vercel can still deploy from private repos). Public is also fine if you'd rather.
5. **Do NOT** check "Add a README", "Add .gitignore", or "Add license" — we already have those locally.
6. Click **Create repository**.

After creation, GitHub will show a page with a URL like:

```
https://github.com/<your-username>/chasing-fun-newsletter.git
```

Copy that URL. You'll need it in Step 3.

---

## Step 2 — Initialize git locally and make the first commit

Open a terminal and run these commands (replace the path with yours if different):

```powershell
cd "C:\Users\dor\OneDrive\שולחן העבודה\CLAUDE AI\ניוז לטר\chasing-fun-weekend-newsletter-agent"

git init
git branch -M main
git add .
git commit -m "Initial commit: project structure + first sample post"
```

> **About OneDrive:** the project lives inside a OneDrive folder. That's fine, but git can occasionally complain about file locks while OneDrive is syncing. If you hit weird errors, pause OneDrive syncing for a minute and retry.

---

## Step 3 — Connect the local repo to GitHub

Replace `<your-username>` with your actual GitHub username:

```powershell
git remote add origin https://github.com/<your-username>/chasing-fun-newsletter.git
git push -u origin main
```

The first `push` will prompt you to log in to GitHub. On Windows, the easiest path is:

- Install **GitHub CLI** from <https://cli.github.com/> if you haven't yet
- Run `gh auth login` and follow the prompts
- Then re-run the push

Alternative: when prompted, GitHub now requires a **Personal Access Token** instead of your password.
Create one at <https://github.com/settings/tokens?type=beta>, give it `Contents: Read and Write` permission scoped to this single repo, and use it as the password.

After the push, refresh your GitHub repo page in the browser — you should see all the files.

---

## Step 4 — Import the repo into Vercel

1. Go to <https://vercel.com/new>
2. Under **Import Git Repository**, find `chasing-fun-newsletter` and click **Import**.
3. On the configuration screen:
   - **Project Name:** `chasing-fun-newsletter` (default is fine)
   - **Framework Preset:** *Other*
   - **Root Directory:** click **Edit** → set it to `site` (this is the most important step!)
   - **Build Command:** leave empty
   - **Output Directory:** leave empty
   - **Install Command:** leave empty
4. Click **Deploy**.

In about 30 seconds Vercel will give you a live URL like
`https://chasing-fun-newsletter.vercel.app`. Open it on your phone — you should see the homepage with the hero block and "עוד אין פוסטים" empty state.

If you also want to verify a post page, hit
`https://chasing-fun-newsletter.vercel.app/posts/weekend-insights-1`
(no `.html` needed thanks to `cleanUrls` in `vercel.json`).

---

## Step 5 — Enable Vercel Analytics (recommended)

Inside the Vercel dashboard for this project:

1. Go to **Analytics** in the left sidebar.
2. Click **Enable**.
3. Choose the free tier — it's plenty for our volume.

This gives you page views, top sources, top referrers, and (critically) the breakdown by `utm_source`, `utm_medium`, and `utm_campaign` — which is exactly what we need to measure each weekly post.

> **Tip:** Vercel Analytics is privacy-friendly and doesn't need a cookie banner.

---

## Step 6 — Tell me you're done

Once you've completed Steps 1–4, ping me with:

- ✅ **GitHub repo URL** (e.g. `https://github.com/<you>/chasing-fun-newsletter`)
- ✅ **Vercel live URL** (e.g. `https://chasing-fun-newsletter.vercel.app`)

I'll then do a sanity check from my side — fetch the live page, verify the structure, confirm the deploy is wired correctly — and we'll move on to the next file: `00-core/BRAND.md`.

---

## Weekly Workflow After Setup (Preview)

Once setup is done, every Friday looks like this:

```bash
# Agent does this automatically (you just say "ship it"):
cd <project>
git add site/posts/weekend-insights-N.html site/index.html
git commit -m "Publish: Weekend Insights #N"
git push
# Vercel auto-deploys. Agent returns the UTM-tagged link + WhatsApp message.
```

You don't need to touch any of this manually. You'll just say "approved" and the agent handles the rest.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `git push` asks for password and fails | Use Personal Access Token (Step 3) or install GitHub CLI |
| Vercel deploy succeeds but shows 404 | Root Directory wasn't set to `site/` — go to Project Settings → General and fix it, then redeploy |
| Hebrew characters look broken | Make sure the file is saved as UTF-8 (the templates already are) |
| OneDrive locks files during git commit | Pause OneDrive for 30 seconds, run the command, resume |
| Vercel build fails with "no entry file" | Make sure `site/index.html` exists and is committed |

---

## Why this stack (vs WordPress)

- **Speed:** static HTML loads in <1s on mobile, vs. WordPress's typical 2–4s.
- **Cost:** $0/month for both GitHub and Vercel at our scale.
- **Version control:** every edit is a git commit, fully reversible.
- **No plugins, no updates, no security patches.** Static files don't get hacked.
- **Custom domain** is one click in Vercel when you're ready.
- **The agent can ship without you opening any dashboard.**

---

*This document will be updated whenever the deployment process changes.*
