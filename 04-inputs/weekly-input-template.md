# weekly-input-template.md

> The form Dor fills in every Thursday. Stays the same every week — only the values change.
> The agent sends a copy of this in the Thursday-morning kickoff message.

---

```
=== INPUT: WEEKEND INSIGHTS #{N} ===

CAMPAIGN NAME: weekend_insights_{N}
PUBLISH DATE: {YYYY-MM-DD}   (Friday)

--- תחזית גלים לסופ״ש ---
TITLE (אופציונלי, אחרת אגנרט):
TEXT:
תמונה (URL או "אין"):

--- גל #1: תובנה אישית מהשבוע ---
TITLE (אופציונלי):
BODY:

--- גל #2: ציטוט + פרשנות ---
TITLE (אופציונלי):
QUOTE:
QUOTE_SOURCE (אם יש):
COMMENTARY:

--- גל #3: משהו שלמדתי השבוע ---
TITLE (אופציונלי):
BODY:

--- גל #4: טיפ לגלישה ---
TITLE (אופציונלי):
BODY:

--- גל #5: תוכן לצפייה ---
TITLE (אופציונלי):
DESCRIPTION:
URL (YouTube / Instagram):

--- בלוק CTA מיוחד השבוע ---
WHICH_BLOCK: [summer_trip | early_bird | event | community | teaser | none]
CUSTOM_TEXT (אופציונלי):
SUB_FIELDS (per block — fill only what applies):
  - early_bird:    trip_name, trip_short_description, deadline_date
  - event:         event_name, event_description, event_date_and_location
  - community:     community_message
  - teaser:        teaser_title, teaser_body

--- תמונות נוספות לפוסט (אופציונלי) ---
URL → לאיזה גל לשבץ:

--- הערות/בקשות מיוחדות לסוכן השבוע ---
[למשל: "הקפד שלא להזכיר את הציטוט בגל #3 — חזרתי על אותה אמירה"]
[או: "לחתוך אגרסיבית יותר השבוע, יצאתי ארוך"]

=== END INPUT ===
```

---

## Notes for Dor

- Skip any field with `"אין"` — the agent will adapt.
- If you want to skip a whole wave, write `SKIP` next to its TITLE.
- Don't pre-edit your text. Send raw. Cleanup is the agent's job.
- The agent will ask **once** if something critical is missing (e.g., no video URL but you said Wave #5 is video). Won't pester.

---

## Notes for the Agent

- Always validate that `WHICH_BLOCK` matches one of the 6 options in `01-templates/cta-blocks.html`.
- If `PUBLISH DATE` is not a Friday, ask Dor to confirm.
- If campaign number conflicts with an existing file, increment by 1 and ask Dor to confirm.
