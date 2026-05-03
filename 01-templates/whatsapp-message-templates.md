# whatsapp-message-templates.md

> The agent picks one of these patterns each week and adapts it to the post.
> Goal: get clicks from the WhatsApp group to the post page.

---

## Anatomy of a Good WhatsApp Message

1. **Opening hook** — a sensory image or unexpected line (1 sentence)
2. **Tease the content** — what's actually in the post, in the language of the audience (1-2 sentences)
3. **A reason to click NOW** — implicit urgency, but never sales-y
4. **The link** — UTM-tagged community link (pattern #1 from `00-core/UTM_RULES.md`)

Total length: 5-8 short lines. Optimized to feel like a friend dropping a recommendation in the group, not a marketing blast.

---

## Pattern A — Forecast-Led (use when surf forecast is the strongest hook)

```
{forecast hook — 1 sentence about the conditions or vibe of the week}

העליתי את פרק התובנות החדש —
{teaser line about Wave #1 or #3, the strongest content piece this week}, {teaser line about Wave #4 or #5}.

אם בא לכם כמה דקות של ים, מחשבה ואנרגיה טובה — זה כאן:
{community_utm_link}
```

**Example:**
> סופ״ש רגוע בים, אבל הגלים האמיתיים מגיעים בתחילת השבוע 🌊
>
> העליתי את פרק התובנות החדש —
> יש שם תחזית לימים שכן שווה להיכנס, קטע חזק על החיבור שבמים, מחשבה שתשנה לכם את הגישה לגלישה, וטיפ פרקטי על תכנון גלישה וזרימה על הגל.
>
> אם בא לכם כמה דקות של ים, מחשבה ואנרגיה טובה — זה כאן:
> https://chasing-fun-newsletter.vercel.app/posts/weekend-insights-1?utm_source=whatsapp&utm_medium=community&utm_campaign=weekend_insights_1

---

## Pattern B — Story-Led (use when Wave #1 or #3 is a strong personal story)

```
{1-line of the personal moment from the post}

כתבתי על זה השבוע — וגם על:
- {Wave #2 short reference}
- {Wave #4 short reference}
- {Wave #5 reference — the video}

הכל כאן, 5 דקות קריאה:
{community_utm_link}
```

---

## Pattern C — Question-Led (use sparingly — when there's a real reflective question)

```
{a real question, not a marketing question}

אני שיתפתי איך אני חושב על זה בפוסט החדש — יחד עם תחזית, ציטוט שעבד עליי השבוע, וטיפ אחד שכדאי לדעת אם אתם בים בקרוב.

זה כאן:
{community_utm_link}
```

---

## Patterns to AVOID

- ❌ "פוסט חדש עלה!! קישור בתגובות 👇"
- ❌ "אל תחמיצו!"
- ❌ Multi-paragraph essays — keep it short
- ❌ More than one emoji per message
- ❌ "הסיפור הזה ישנה לכם את החיים"
- ❌ Sending the link without UTM (kills our analytics)

---

## Formatting Rules for WhatsApp

- **Bold** with `*text*`
- _Italic_ with `_text_`
- Line breaks matter — break sentences for readability on phone
- The link goes on its own line, never inline mid-sentence
- WhatsApp auto-previews the link — Dor doesn't need to add image/preview manually

---

## What the Agent Returns Each Week

After publishing, the agent gives Dor exactly this:

```
=== WhatsApp Message ===
{the chosen pattern, fully filled in}

=== Live URL (no UTM, for personal sharing) ===
https://chasing-fun-newsletter.vercel.app/posts/weekend-insights-{N}

=== UTM-tagged community link (use this in the WhatsApp group) ===
https://chasing-fun-newsletter.vercel.app/posts/weekend-insights-{N}?utm_source=whatsapp&utm_medium=community&utm_campaign=weekend_insights_{N}
```

Dor copies the WhatsApp message, pastes into the group, and ships.
