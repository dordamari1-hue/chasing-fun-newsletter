# link-tracking-notes.md

> Operational gotchas around link tracking. Read once. Refer back when something looks weird.

---

## Why this file exists

Links are 90% of the value of the newsletter. If a link is broken or untracked, the entire weekly run is wasted from a measurement standpoint.

---

## The 3 Things That Most Often Go Wrong

### 1. Hebrew in WhatsApp links not URL-encoded

**Wrong:**
```
https://wa.me/972548668646?text=קראתי את הפוסט&utm_source=...
```

**Right:**
```
https://wa.me/972548668646?text=%D7%A7%D7%A8%D7%90%D7%AA%D7%99%20%D7%90%D7%AA%20%D7%94%D7%A4%D7%95%D7%A1%D7%98&utm_source=...
```

The agent encodes Hebrew with `encodeURIComponent` mentally before writing the link. WhatsApp on Android sometimes truncates un-encoded Hebrew, and the prefilled message disappears.

### 2. `&` raw inside `href` attributes

In HTML attributes, `&` must be `&amp;`:

**Wrong:**
```html
<a href="https://...?utm_source=page&utm_medium=cta&utm_campaign=...">
```

**Right:**
```html
<a href="https://...?utm_source=page&amp;utm_medium=cta&amp;utm_campaign=...">
```

Modern browsers usually fix this, but some link parsers (LinkedIn, some email clients) don't.

### 3. UTM `utm_campaign` mismatched across links in the same post

If Wave #4 has `utm_campaign=weekend_insights_5` but the trip CTA has `utm_campaign=weekend_insights_4` (a copy-paste mistake from last week), Vercel Analytics will show two campaigns instead of one.

The agent's safeguard: do a global find-and-replace on `{{campaign_name}}` at the very last step before saving.

---

## Sanity Checks Before Pushing

Run mentally on the final HTML:
1. Open one of every link kind (newsletter, WhatsApp-thanks, dynamic CTA) and confirm UTMs are present.
2. Confirm `utm_campaign` is identical in all of them.
3. If the post mentions a trip, confirm the trip CTA has `utm_medium=summer_trip_cta` (or appropriate sibling), not the generic `cta`.

---

## How to Test a Single Link

Open in a private/incognito window. Vercel Analytics will record a hit within ~30 seconds. If after 60 seconds the source/medium/campaign aren't showing under the right values, the link is malformed.

---

## Future: Short Links?

Not implemented. Not recommended for now because:
- Short links require an extra service (Bitly, Rebrandly)
- They obscure UTMs from the user
- WhatsApp doesn't auto-preview short links as nicely

If we ever want short links for SMS or print, revisit. For now, plain UTM-tagged URLs are the right tool.
