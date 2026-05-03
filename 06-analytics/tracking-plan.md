# tracking-plan.md

> What we measure, where it's measured, and what we ignore.
> Lean — we don't need a 10-tool stack for a small newsletter.

---

## North Star

**Time on page (median).**
If readers spend 3+ minutes on the post, the newsletter is doing its job.

Everything else is supporting.

---

## Supporting Metrics

| Metric | Tool | Why we care |
|---|---|---|
| Unique page views | Vercel Analytics | Volume / reach |
| Top sources | Vercel Analytics (UTM) | Did the WhatsApp blast work? Did people share? |
| Top referrers | Vercel Analytics | Catches non-UTM traffic (organic, direct) |
| `utm_campaign` breakdown | Vercel Analytics | Per-week performance |
| Click-through to newsletter signup | n/a yet (future GA4) | Conversion to email list |
| Click-through to WhatsApp CTA | n/a yet (future GA4) | Engagement signal |

---

## What We Ignore (for now)

- Heatmaps, scroll depth — not worth the complexity
- A/B testing — we don't have the volume yet
- Retargeting pixels — will add when we run paid campaigns
- Social engagement on the WhatsApp message itself — WhatsApp doesn't expose this

---

## UTM Conventions (the source of all truth)

See `00-core/UTM_RULES.md`.

The agent's job is to ensure every link is tagged. The analytics' job is to read those tags. If a tag is missing or wrong, it shows up in Vercel Analytics under `utm_source: (not set)` — review weekly.

---

## Weekly Review Cadence

- **Sunday morning:** the agent pulls the previous week's numbers (manually or via Vercel MCP) and writes a row in `06-analytics/weekly-performance-template.md`.
- **End of month:** Dor reviews trends. Adjust patterns in `01-templates/whatsapp-message-templates.md` or `01-templates/cta-blocks.html` if data suggests something isn't working.

---

## When We Add GA4 (later)

If/when Dor wires GA4 (via Supermetrics or the GA4 connector):

1. Add the GA4 measurement ID to `<head>` of `mobile-magazine-template.html` and `index.html`
2. Set up these GA4 events:
   - `cta_click_newsletter`
   - `cta_click_whatsapp_thanks`
   - `cta_click_summer_trip` (and other dynamic CTAs)
3. Update this file with the GA4 property ID and event list
