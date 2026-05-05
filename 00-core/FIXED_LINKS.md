# FIXED_LINKS.md — Constants the Agent Reuses

> Single source of truth for URLs, numbers, and assets the newsletter reuses every week.
> If a value here changes, update *only* this file — every template references it.

---

## Newsletter Signup (legacy Google Form — kept as fallback)
```
https://forms.gle/APYSNPtgJZdH6wYP7
```

## Newsletter Signup Endpoint (new — inline form on site, posts to Google Sheet)
```
NEEDS_SETUP
```
> Set up via `07-integrations/newsletter-signup-setup.md`.
> When deployed, paste the Apps Script Web App URL here (replaces `NEEDS_SETUP`).
> The agent injects it into all templates wherever `{{signup_endpoint_url}}` appears.

## Forecast Widget — Default Spot
- **Spot:** Hilton Beach, Tel Aviv (default — overridable per post)
- **Embed URL pattern:**
  ```
  https://embed.windy.com/embed2.html?lat=32.0917&lon=34.7700&zoom=11&level=surface&overlay=waves&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=32.0917&detailLon=34.7700&metricWind=default&metricTemp=default&radarRange=-1
  ```
> Configure other spots via `07-integrations/forecast-widget-setup.md`.

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
