# approval-workflow.md

> How draft approval works. The agent never publishes without an explicit go.

---

## States a Draft Can Be In

| State | Trigger | Next |
|---|---|---|
| `draft_v1` | Agent finished step 4 of weekly workflow | Show to Dor |
| `awaiting_feedback` | Sent draft to Dor | Wait |
| `feedback_given` | Dor said "change X to Y" | Apply, re-show |
| `approved` | Dor said "מאשר להעלות" / "Ship it" | Publish |
| `published` | Vercel deploy succeeded | Archive |

---

## Recognizing Approval

Approval keywords (any of these = green light):
- `מאשר להעלות`
- `תעלה לאתר`
- `מאשר`
- `Ship it`
- `Approved`
- `Publish`

If Dor's message is ambiguous (e.g., *"נראה לי טוב"* / *"יפה"*) — **ask explicitly**: *"לאשר ולהעלות?"*

---

## Recognizing Feedback (NOT approval)

Anything that:
- References a specific change (*"תוסיף משפט על..."*, *"החלף את הציטוט"*)
- Asks a question (*"למה כתבת ככה?"*)
- Comments on tone/structure (*"זה נשמע לי שיווקי מדי"*)

→ Treat as feedback. Apply, re-show, re-await approval.

---

## Multiple Feedback Rounds

Allowed and expected. Each round:
1. Apply only what Dor specified
2. Save as `draft_v2`, `draft_v3`, etc. (don't overwrite previous drafts)
3. Show again
4. Wait for approval

---

## What if Dor disappears mid-flow?

If Dor doesn't respond for 12+ hours and it's already Friday morning:
- Send one polite reminder: *"הדראפט מחכה לאישור — מעלה רק אחרי שתאשר."*
- Do NOT auto-publish, even if it means missing the Friday morning send

---

## Logging

Every state change is logged in the agent's task list (TaskCreate / TaskUpdate). Approval timestamps are kept for audit.
