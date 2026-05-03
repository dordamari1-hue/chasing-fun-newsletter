# analytics-setup.md

> How to wire up the measurement layer. Two paths: Vercel Analytics (now), GA4 (later).

---

## Phase 1 — Vercel Analytics (set up day-one)

### Why
- Free
- Privacy-friendly (no cookie banner)
- Built into the same dashboard as the deploy
- Reports UTM breakdown out of the box

### How to enable
1. Open the project on Vercel: `https://vercel.com/dordamari1-hue/chasing-fun-newsletter`
2. Sidebar → **Analytics**
3. Click **Enable**
4. Choose the free tier (Hobby plan includes it)

That's it. Analytics start measuring from the next page view.

### What you'll see
- **Top pages** — which posts get the most traffic
- **Top referrers** — where traffic comes from
- **Top sources / mediums / campaigns** — UTM breakdown
- **Visit duration** (basic)

### Limits of Vercel Analytics
- No custom events (so no per-CTA click tracking)
- No goal funnels
- Limited to 30 days of history on the Hobby plan

---

## Phase 2 — Google Analytics 4 (later, when CTA tracking matters)

Only set up GA4 when:
- Vercel Analytics shows healthy weekly traffic
- We want to know exactly which CTAs convert
- We want to set conversion goals (e.g., trip inquiries from the newsletter)

### How (when ready)
1. Create a GA4 property at `https://analytics.google.com`
2. Get the Measurement ID (`G-XXXXXXXXXX`)
3. Add this snippet to `<head>` of `mobile-magazine-template.html` and `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```
4. Add `onclick` event handlers to each CTA `<a>` to fire `gtag('event', 'cta_click_<name>')`
5. In GA4, mark these events as conversions

### Reading GA4 data without leaving Claude
Two options once GA4 is wired:
- **Supermetrics MCP** (paid) — gives Claude direct query access
- **Windsor.ai MCP** (cheaper) — same idea, lighter

---

## Phase 3 — UTM Hygiene

Every Sunday review:
- Look at "Sources" in Vercel Analytics
- Anything tagged `(not set)` for source/medium/campaign = a missing UTM somewhere
- Check the most recent post — was a link missed? Fix the template, not just the post.

This is the agent's standing sanity-check.
