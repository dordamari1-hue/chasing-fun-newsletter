# FIXED_LINKS.md — Constants the Agent Reuses

> Single source of truth for URLs, numbers, and assets the newsletter reuses every week.
> If a value here changes, update *only* this file — every template references it.

---

## Newsletter Signup (legacy Google Form — kept as fallback)
```
https://forms.gle/APYSNPtgJZdH6wYP7
```

## Signups Database (Google Sheet — created)
- **Sheet name:** Chasing Fun — Signups Database
- **Sheet ID:** `1LaVug4kIG-JdwY17PTOPmZ3wCOBawL7hd6riAPpk6N8`
- **Direct link:** <https://docs.google.com/spreadsheets/d/1LaVug4kIG-JdwY17PTOPmZ3wCOBawL7hd6riAPpk6N8/edit>
- **Schema:** timestamp, name, email, source_page, source_url, sequence, campaign, utm_source, utm_medium, user_agent, status, notes

## Signups Endpoint (Apps Script Web App — DEPLOYED)
```
https://script.google.com/macros/s/AKfycbyj_kYbRKHO8yPG7QuR8AG7tQguC0VtIM1XVqdJrK8Iv426duPu6U7FlUQmYqNqR6Jb6Q/exec
```
- **Account:** chasingfm@gmail.com
- **Deployed:** 2026-05-05
- This URL is the value injected anywhere `{{signup_endpoint_url}}` appears in templates.
- Setup record in `07-integrations/newsletter-signup-setup.md`.

## Forecast Widget — Default (Hilton Beach, Tel Aviv)
**Embed HTML to inject into `{{windy_widget_html}}`:**
```html
<iframe class="windy" loading="lazy" src="https://embed.windy.com/embed2.html?type=forecast&location=coordinates&detail=&detailLat=32.0917&detailLon=34.7700&metricWind=default&metricTemp=default&radarRange=-1&menu=&message=&marker=true&calendar=&pressure=&overlay=waves"></iframe>
```
- **Lat/Lon:** 32.0917, 34.7700 (Hilton Beach, Tel Aviv)
- **Type:** `forecast` — combines map + per-spot detail (chart-like)
- **Overlay:** `waves` — wave height visualization
- Override per post by passing different lat/lon if a weekly post is themed around another spot.

## Per-Page Form Defaults
| Page | source_page | sequence |
|---|---|---|
| Homepage (`/`) | `homepage` | `long_term_nurture` |
| Archive (`/archive`) | `archive` | `long_term_nurture` |
| Weekly post (`/posts/weekend-insights-N`) | `weekend-magazine` | `long_term_nurture` |

## Logo (always at footer)
```
https://chasingfun.co.il/wp-content/uploads/2026/03/Final-Logo-01-3.png
```

## WhatsApp
- **Number:** `+972548668646`
- **Default button text:** `קראתי את הפוסט, תודה`
- **Default button link template:**
  ```
  https://wa.me/972548668646?text=קראתי%20את%20הפוסט%2C%20תודה
  ```

## Website
```
https://chasingfun.co.il
```

## Newsletter Site (Vercel)
```
https://chasing-fun-newsletter.vercel.app
```

## Repo
```
https://github.com/dordamari1-hue/chasing-fun-newsletter
```

---

## How URL Slugs Are Built

Each weekly post lives at:
```
https://chasing-fun-newsletter.vercel.app/posts/weekend-insights-{N}
```

Where `{N}` is the campaign number (e.g., `weekend-insights-5`).
The corresponding HTML file lives at `site/posts/weekend-insights-{N}.html` in the repo.

---

*Last updated: 2026-04-30. If this file changes, also update `01-templates/mobile-magazine-template.html`.*
