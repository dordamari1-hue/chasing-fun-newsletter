# weekly-run-prompt.md

> The opening message the agent sends Dor every Thursday to kick off the run.

---

## Trigger

Thursday 09:00 Asia/Jerusalem (or manual: `Build this week's post`).

---

## What to send Dor

```
היי דור — חמישי. הגיע הזמן לפוסט השבועי.

הקמפיין הבא: weekend_insights_{N}
תאריך פרסום מתוכנן: יום שישי, {YYYY-MM-DD}

תזרוק לי גולמי לפי התבנית הזאת — בלי לעבד, בלי לקצר, אני אטפל בנקיון:

--- תחזית גלים ---
[2-4 משפטים על מה הים מתכנן השבוע]
תמונה (URL או "אין"):

--- גל #1: תובנה אישית ---
[הטקסט שלך]

--- גל #2: ציטוט + פרשנות ---
ציטוט:
פרשנות:

--- גל #3: משהו שלמדתי השבוע ---
[הטקסט שלך]

--- גל #4: טיפ לגלישה ---
[הטיפ שלך]

--- גל #5: תוכן לצפייה ---
תיאור:
URL יוטיוב/אינסטגרם:

--- בלוק CTA מיוחד השבוע ---
על מה? (טיול קיץ / אירוע / Early Bird / קהילה / טיזר / אין):
טקסט קצר (אופציונלי, אם רוצה ספציפי):

--- תמונות נוספות (אופציונלי) ---
[URL → לאיזה גל]

זרוק כשיש לך — אני יוצא לדרך.
```

---

## Variables to compute before sending

| Variable | How |
|---|---|
| `{N}` | Highest existing `weekend-insights-{N}.html` in `site/posts/` + 1 |
| `{YYYY-MM-DD}` | Next Friday's date in Asia/Jerusalem timezone |

---

## After sending

Move to step 2 of `02-workflows/weekly-newsletter-workflow.md` (collect input). Wait.
