# Chasing Fun — Weekend Newsletter Agent

> **Weekend Insights** — A weekly automation system that generates and publishes the Chasing Fun newsletter
> *Five waves of thought, surf, life, and inspiration*

---

## 1. Why This Project Exists

The Chasing Fun weekly newsletter is not just content — it's a **weekly marketing asset** designed to:

- Strengthen the connection with the community
- Drive traffic to the website
- Warm up the audience for surf trips
- Connect people to Chasing Fun's core values
- Maintain consistent weekly presence
- Build a content archive that will eventually become an SEO blog

This agent replaces the current manual workflow (ChatGPT → manual HTML paste into WordPress → manual WhatsApp message) with **a near-fully-automated pipeline** that needs only a brief weekly input from you and a final approval.

---

## 2. The Product in One Sentence

> Every Thursday, the agent opens a session with a reminder and an input template, collects the weekly content from you, cleans the text without altering your voice, builds a mobile-first HTML page, pushes it to GitHub (which auto-deploys to Vercel), and returns a UTM-tagged link plus a ready-to-send WhatsApp message for Friday.

---

## 3. Architecture: GitHub + Vercel + Static HTML

```
┌─────────────────────────────────────────────────────────────────┐
│  Local Folder (this project)                                    │
│  C:\...\ניוז לטר\chasing-fun-weekend-newsletter-agent           │
│  └── site/  ← this is what Vercel deploys                       │
└──────────────────────────┬──────────────────────────────────────┘
                           │  git push
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  GitHub Repo: chasing-fun-newsletter                            │
│  branch: main                                                   │
└──────────────────────────┬──────────────────────────────────────┘
                           │  webhook (auto-deploy)
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  Vercel Project: chasing-fun-newsletter                         │
│  Root Directory: site/                                          │
│  Live URL: https://chasing-fun-newsletter.vercel.app            │
└─────────────────────────────────────────────────────────────────┘
```

Each weekly post becomes a new HTML file under `site/posts/weekend-insights-N.html`. Vercel rebuilds the site on every push to `main`. UTM tracking happens via query strings on every link, measured downstream by Vercel Analytics or Google Analytics.

---

## 4. Folder Structure

```
/chasing-fun-weekend-newsletter-agent          ← GitHub repo root
│
├── site/                                       ← THE LIVE WEBSITE (Vercel deploys this)
│   ├── index.html                              ← Homepage listing all weekly posts
│   ├── posts/                                  ← One HTML file per weekly post
│   │   └── weekend-insights-1.html
│   ├── assets/                                 ← Images, fonts, shared CSS
│   │   ├── images/
│   │   └── styles/
│   ├── vercel.json                             ← Clean URLs + headers config
│   └── robots.txt
│
├── 00-core/                                    ← Brand identity, never deployed
│   ├── BRAND.md
│   ├── VOICE_AND_STYLE.md
│   ├── FIXED_LINKS.md
│   ├── UTM_RULES.md
│   └── DEPLOYMENT_RULES.md                     ← (replaces WORDPRESS_RULES.md)
│
├── 01-templates/                               ← Design + content templates
│   ├── mobile-magazine-template.html
│   ├── cta-blocks.html
│   └── whatsapp-message-templates.md
│
├── 02-workflows/                               ← Process docs
│   ├── weekly-newsletter-workflow.md
│   ├── approval-workflow.md
│   └── publishing-workflow.md
│
├── 03-prompts/                                 ← Prompts the agent runs
│   ├── system-prompt.md
│   ├── weekly-run-prompt.md
│   ├── text-cleanup-prompt.md
│   ├── html-generation-prompt.md
│   └── github-publish-prompt.md                ← (replaces wordpress-publish-prompt.md)
│
├── 04-inputs/                                  ← Weekly input templates
│   ├── weekly-input-template.md
│   └── assets-template.md
│
├── 05-outputs/                                 ← Weekly outputs (working copies)
│   ├── drafts/
│   ├── approved/
│   └── published/
│
├── 06-analytics/                               ← Measurement & improvement
│   ├── tracking-plan.md
│   ├── weekly-performance-template.md
│   └── improvement-loop.md
│
├── 07-integrations/                            ← External integrations
│   ├── github-vercel-setup.md                  ← (replaces wordpress-mcp-schema.md)
│   ├── analytics-setup.md
│   └── link-tracking-notes.md
│
├── .gitignore
├── .vercelignore                               ← Excludes agent docs from deployment
└── README.md                                   ← This file
```

> **Note:** Only the `site/` folder is deployed to Vercel. Everything else (docs, prompts, workflows, drafts) lives in the same repo for version control but is excluded from the build via Vercel's "Root Directory" setting.

---

## 5. Weekly Workflow (High Level)

```
Thursday 09:00   →  Agent sends reminder + input template
Thursday          →  You fill in the input (text, video, images)
Thursday evening  →  Agent cleans text, builds HTML, returns draft
Thu/Fri morning   →  You give feedback or approve
Friday            →  Agent commits + pushes to GitHub → Vercel auto-deploys
                  →  Returns UTM link + WhatsApp message
Friday            →  You paste the message into the WhatsApp group
Sunday            →  Agent sends performance report from previous week
```

---

## 6. Core Principles (Never Break)

1. **Don't change Dor's voice.** Fix only spelling, syntax, punctuation, spacing, paragraph breaks. Never shorten, rewrite, or "make it more marketing-y."
2. **Every link must carry a UTM.** No exceptions.
3. **Mobile-first.** Always test on phone before approving.
4. **Nothing ships to production without explicit approval** (`approved` / `ship it`).
5. **Improvement suggestions live separately**, under the heading *"Improvement Suggestions — Not Yet Applied"*.
6. **Archive everything.** Each post that goes live is committed to git history; the source HTML is also copied to `05-outputs/published/` with date and campaign name.

---

## 7. Key Commands

| What I say to the agent | What it does |
|---|---|
| `Build this week's post` | Starts the full weekly flow — asks for input, builds, returns draft |
| `Approved` / `Ship it` | Commits, pushes to GitHub → Vercel auto-deploys, returns final link |
| `Show me last week's performance` | Pulls UTM/Analytics data and summarizes |
| `Update the style guide` | Opens `VOICE_AND_STYLE.md` for editing |

---

## 8. Integrations (Status)

| Service | Purpose | Current Status |
|---|---|---|
| **GitHub** | Source-of-truth repo for the website | ✅ User has account |
| **Vercel** | Hosting + auto-deploy | ✅ Connected (MCP available) |
| **Vercel Analytics** | Page views, sources, UTM tracking | ⚠️ Will enable after first deploy |
| **Google Drive** | Asset archive (images, etc.) | ✅ Connected |
| **Notion** | (Optional) Editorial calendar + post archive | ✅ Connected |
| **Gmail** | Weekly notifications | ✅ Connected |
| **WhatsApp** | Group message delivery | ⚠️ Manual (or via Claude in Chrome) |
| **Scheduled Tasks** | Thursday auto-trigger | ✅ Built-in |

---

## 9. What I Need From You to Make It Fully Automated

### 🔴 Required (without these the agent can't ship on its own)

1. **A GitHub repo** named (suggested) `chasing-fun-newsletter`, public or private — both work.
2. **A Vercel project** linked to that repo, with **Root Directory** set to `site/`.
3. **Local git remote configured** — once we run `git remote add origin <repo-url>` here, the agent can push commits straight from this folder.

(Full step-by-step setup guide is in `07-integrations/github-vercel-setup.md` — coming next.)

### 🟡 Strongly Recommended

4. **Vercel Analytics enabled** on the project (one click in the Vercel dashboard) — gives you page views, sources, and UTM breakdown for free.
5. **A scheduled task** triggering this agent every Thursday at 09:00 (we'll set this up after the first manual run works end-to-end).
6. **A Google Drive folder** with reusable images (logos, default forecast images, etc.) so the agent doesn't ask for them every week.

### 🟢 Optional (Nice to Have)

7. **A Notion database** of "Weekly Newsletters" with status, campaign name, performance — for a clean editorial board view.
8. **WhatsApp delivery via Claude in Chrome** — if you let me open `web.whatsapp.com` and send the message into the group automatically (otherwise I just hand you the text).
9. **A custom domain later** (e.g., `newsletter.chasingfun.co.il`) — Vercel handles this in two clicks once you're ready.

---

## 10. Project Status (Living Log)

| Version | Date | What changed |
|---|---|---|
| 0.1 | 2026-04-30 | Project initialized; folder structure created; first README |
| 0.2 | 2026-04-30 | Switched architecture from WordPress to GitHub + Vercel; added `site/` folder |

This file updates whenever a new module is added or a process meaningfully changes.

---

## 11. Next Step

Awaiting your approval on this updated README. Once approved, I'll move on to:
**`07-integrations/github-vercel-setup.md`** — the full step-by-step guide to wire up the GitHub repo and Vercel project so the agent can push automatically.

> *Surfing is about timing. So are projects.*
