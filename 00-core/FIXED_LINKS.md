# FIXED_LINKS.md — Constants the Agent Reuses

> Single source of truth for URLs, numbers, and assets the newsletter reuses every week.
> If a value here changes, update *only* this file — every template references it.

---

## Newsletter Signup
```
https://forms.gle/APYSNPtgJZdH6wYP7
```

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
