# Newsletter Signup — Setup Instructions

> Goal: when someone enters their name + email on any landing page, it lands directly in a Google Sheet you own, tagged with the page they came from and the sequence they should go into.
>
> Total time: ~5 minutes (one-time).

---

## Architecture

```
Website forms (multiple LPs)  →  Google Apps Script  →  Google Sheet
                              (tagged with source_page + sequence)
```

### Schema of the central database

| Column | Source | Purpose |
|---|---|---|
| `timestamp` | Auto | When they signed up |
| `name` | User input | Personalization in nurture |
| `email` | User input | Required, normalized to lowercase |
| `source_page` | Hidden form field | Which landing page (e.g., `weekend-magazine`, `summer-trip-lp`) |
| `source_url` | Auto | Exact URL they came from |
| `sequence` | Hidden form field | Which automation flow they go into (`long_term_nurture`, `summer_trip_inquiry`, etc.) |
| `campaign` | Auto | UTM campaign if present (e.g., `weekend_insights_5`) |
| `utm_source` | Auto from URL | Traffic source (whatsapp, instagram, etc.) |
| `utm_medium` | Auto from URL | CTA type |
| `user_agent` | Auto | Device/browser, for debugging |
| `status` | Manual | Empty default. Use later for `subscribed`/`unsubscribed`/`bounced` |
| `notes` | Manual | Free text for manual notes |

### Per-page configuration baked into each form

Each landing page's form has hidden fields that label the signup correctly. For the **weekend magazine** specifically:
- `source_page` = `weekend-magazine`
- `sequence` = `long_term_nurture`

For **future landing pages**, you'll just tell me: "create a new LP at `/summer-trip` with sequence `summer_trip_inquiry`" and I'll build a form that tags signups accordingly.

---

## ✅ Already Done For You

The sheet is already created in your Google Drive:
- **Name:** Chasing Fun — Signups Database
- **URL:** <https://docs.google.com/spreadsheets/d/1LaVug4kIG-JdwY17PTOPmZ3wCOBawL7hd6riAPpk6N8/edit>
- Headers row already populated (12 columns above)

---

## What You Need to Do — 3 Steps, 5 Minutes

### Step 1 — Open the sheet

Open the link above. You should see one row with headers and an empty body. Confirm you can access it.

### Step 2 — Create the Apps Script

1. With the sheet open: top menu → **Extensions → Apps Script**
2. A new tab opens with a code editor and a placeholder `myFunction()`. **Delete everything** in that editor.
3. Open this file in your project:
   ```
   C:\GitHub\chasing-fun-newsletter\07-integrations\newsletter-signup-script.gs
   ```
4. Copy ALL its contents → paste into the Apps Script editor
5. Click 💾 save (or Ctrl+S). When prompted for a project name: **"Newsletter Signup"**.

> **Note:** the Sheet ID is already baked into the script — no manual config needed.

### Step 3 — Deploy as Web App

1. In the Apps Script editor, click the blue **Deploy** button (top-right) → **New deployment**
2. Click ⚙️ next to "Select type" → choose **Web app**
3. Fill in:
   - **Description:** `Signups endpoint v1`
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone` ⚠️ (critical — the form must be reachable without login)
4. Click **Deploy**
5. Authorize when prompted:
   - "Google hasn't verified this app" → click **Advanced** → **Go to Newsletter Signup (unsafe)** → **Allow**
   - This is normal for personal Apps Scripts.
6. After deployment, you see a **Web app URL** that looks like:
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```
7. **Copy that URL.**

### Step 4 — Tell me the URL

Paste the URL in chat. I will:
1. Add it to `00-core/FIXED_LINKS.md`
2. Update the templates so `{{signup_endpoint_url}}` is replaced with the real URL
3. You push via GitHub Desktop
4. We test by submitting a real signup from the live site

---

## Test the Endpoint Yourself

Before telling me, you can verify the deploy works:
1. Open the URL in your browser
2. You should see: `{"ok":true,"status":"alive"}` — that's the GET health check

If you see that JSON, the script is alive. ✅

---

## What the Sheet Will Look Like After Real Signups

| timestamp | name | email | source_page | source_url | sequence | campaign | utm_source | utm_medium | user_agent | status | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-05-08 09:14 | דניאל | someone@gmail.com | weekend-magazine | https://chasing-fun-newsletter.vercel.app/posts/weekend-insights-1?utm_source=whatsapp... | long_term_nurture | weekend_insights_1 | whatsapp | community | Chrome/... | | |
| 2026-05-08 09:18 | מעיין | another@gmail.com | homepage | https://chasing-fun-newsletter.vercel.app/?utm_source=instagram... | long_term_nurture | homepage | instagram | bio | Safari/... | | |

You can filter by `sequence` to know exactly who needs which nurture flow.

---

## Adding a New Landing Page (Future)

When you want to add a new LP that captures signups for a different sequence:

1. Tell me: *"new LP: page slug `summer-trip-2026`, sequence `summer_trip_inquiry`"*
2. I'll:
   - Create the new HTML page in `site/`
   - Add a form with `data-source-page="summer-trip-2026"` and `data-sequence="summer_trip_inquiry"`
   - Push the change

Same Apps Script handles everything — no Apps Script changes needed.

---

## Optional: Email Notification on New Signup

Want an email when each new person joins? Add this to the script:

```js
function sendNotification(name, email, source_page, sequence) {
  MailApp.sendEmail({
    to: 'dordamari1@gmail.com',
    subject: '🌊 הרשמה חדשה — ' + source_page,
    body: 'שם: ' + name + '\nאימייל: ' + email + '\nדף מקור: ' + source_page + '\nרצף: ' + sequence
  });
}
```

And inside `doPost`, after `sheet.appendRow(...)`, call:
```js
sendNotification(name, email, source_page, sequence);
```

(Skip for now — you'll see rows pile up in the sheet anyway.)
