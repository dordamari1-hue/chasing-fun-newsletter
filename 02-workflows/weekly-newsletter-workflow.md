# weekly-newsletter-workflow.md

> The end-to-end process the agent runs every Thursday → Friday.

---

## Trigger

- Scheduled: Thursday 09:00 Asia/Jerusalem (handled by `mcp__scheduled-tasks`)
- Manual: Dor types `Build this week's post` in chat

---

## Steps

### 1. Open the run
- Read `00-core/BRAND.md`, `00-core/VOICE_AND_STYLE.md` — voice/identity refresh
- Read `04-inputs/weekly-input-template.md` — the input shape
- Determine the next campaign number (`weekend_insights_{N}`) by listing `site/posts/`

### 2. Collect input from Dor
Send Dor a short message: *"הגיע יום חמישי — הינה התבנית. תזרוק לי גולמי ואני יוצא."*
Attach the filled-in template fields (most are constant; only the changing parts need answers).

Wait for Dor's input. If something's missing (e.g., no video link), ask **once**, in one consolidated message.

### 3. Clean text
- Apply `00-core/VOICE_AND_STYLE.md` — only spelling, syntax, punctuation, paragraph breaks
- Never rewrite, shorten, or "polish" the voice
- Improvement ideas go to a separate "הצעות לשיפור — לא הוטמעו עדיין" section, kept aside

### 4. Build HTML
- Load `01-templates/mobile-magazine-template.html`
- Fill all `{{placeholders}}`
- Pick the right CTA block from `01-templates/cta-blocks.html` based on Dor's "special this week" answer
- Replace `{{campaign_name}}` globally with `weekend_insights_{N}`
- Save to `05-outputs/drafts/weekend-insights-{N}.html`

### 5. Show Dor the draft
- Provide a path to the draft file
- Say exactly: *"זו גרסה כמעט-מוכנה. תבדוק בטלפון ותגיד אם לאשר או מה לשנות."*
- Wait

### 6. Apply feedback (if any)
- Edit only what Dor specified
- Don't touch anything else
- Loop back to Step 5 if more changes come

### 7. Wait for explicit approval
The agent does NOT ship until Dor says one of:
- `מאשר להעלות`
- `תעלה לאתר`
- `Ship it`
- `Approved`

Anything ambiguous = ask, don't assume.

### 8. Publish
- Move the file from `05-outputs/drafts/` → `site/posts/weekend-insights-{N}.html`
- Update `site/index.html` (insert new post card per `00-core/DEPLOYMENT_RULES.md`)
- Commit + push (commit message per DEPLOYMENT_RULES)
- Wait ~30s for Vercel deploy

### 9. Return outputs to Dor
A single message containing:
1. **Live UTM-tagged community link** (per `00-core/UTM_RULES.md` pattern #1)
2. **WhatsApp message text** (from `01-templates/whatsapp-message-templates.md`)
3. **Clean URL** (no UTMs, for personal reference)
4. **Reminder:** *"שלח את ההודעה לקבוצה ביום שישי בבוקר. תן לי לדעת איך הלך."*

### 10. Archive
- Copy the final HTML to `05-outputs/published/weekend-insights-{N}_{YYYY-MM-DD}.html`
- Append a row to `06-analytics/weekly-performance-template.md` with campaign name + topic + publish date

---

## What the agent NEVER does

- Auto-publishes without explicit approval
- Modifies tone/voice
- Changes Hero, Intro, Logo, or Fixed CTAs (these are template constants)
- Skips UTMs
- Sends the WhatsApp message itself (Dor sends it manually for now)

---

## Total expected duration

- Steps 1–4: 5–10 minutes (most of it waiting on Dor's input)
- Steps 5–7: 5–30 minutes (depends on Dor's review/feedback round)
- Steps 8–10: 1–2 minutes
