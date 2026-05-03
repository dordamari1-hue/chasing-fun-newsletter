# UTM_RULES.md — How Every Link is Tagged

> Every link in every newsletter must carry a UTM. No exceptions.
> Without UTMs we can't tell what's working.

---

## The 3 Parameters (always present)

| Param | What it tells us |
|---|---|
| `utm_source` | Where the click came from (whatsapp, page, instagram) |
| `utm_medium` | What kind of action led to the click (community, cta, summer_trip_cta) |
| `utm_campaign` | Which weekly post — always `weekend_insights_{N}` |

---

## Campaign Naming

Campaign name is **always** `weekend_insights_{N}` where `{N}` is the post number.
- First post: `weekend_insights_1`
- Second post: `weekend_insights_2`
- etc.

If Dor doesn't specify a number, increment from the previous one. Each weekly post gets exactly one campaign name, used everywhere.

---

## The 4 Link Patterns Used Inside the Newsletter

### 1. Community Share Link (the link Dor sends in WhatsApp group)
```
https://chasing-fun-newsletter.vercel.app/posts/weekend-insights-{N}?utm_source=whatsapp&utm_medium=community&utm_campaign=weekend_insights_{N}
```

### 2. Newsletter Signup CTA (inside the page)
```
https://forms.gle/APYSNPtgJZdH6wYP7?utm_source=page&utm_medium=cta&utm_campaign=weekend_insights_{N}
```

### 3. WhatsApp "I read it, thanks" CTA (inside the page)
```
https://wa.me/972548668646?text=קראתי%20את%20הפוסט%2C%20תודה&utm_source=page&utm_medium=cta&utm_campaign=weekend_insights_{N}
```

### 4. Trip CTA — when the dynamic block promotes a trip (inside the page)
```
https://wa.me/972548668646?text=אני%20רוצה%20לבדוק%20טיול%20גלישה%20לקיץ&utm_source=page&utm_medium=summer_trip_cta&utm_campaign=weekend_insights_{N}
```

> When the dynamic CTA promotes something *other* than a summer trip (event, early bird, community), use a matching `utm_medium` value: `event_cta`, `early_bird_cta`, `community_cta`.

---

## What the Agent Outputs Every Week

After publishing, the agent returns three things to Dor:

1. **The community link** (pattern #1 above) — for the WhatsApp group
2. **The clean URL** (no UTMs) — for personal sharing or reference
3. **A line for the analytics log** — `weekend_insights_{N} | YYYY-MM-DD | <topic>`

---

## Forbidden

- Links without UTMs
- Sharing the clean URL in the WhatsApp group (we lose attribution)
- Reusing a campaign name across two different weekly posts

---

*Reference: <https://ga-dev-tools.web.app/campaign-url-builder/> — useful for ad-hoc UTM building outside the weekly flow.*
