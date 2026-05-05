# Newsletter Signup — Setup Instructions

> Goal: when someone enters their email on the website, it lands directly in a Google Sheet you can see.
>
> Total time: ~10 minutes. One-time setup.

---

## Architecture

```
Website inline form  →  Google Apps Script Web App  →  Google Sheet
```

- **No paid services.** Free tier of Google Apps Script handles thousands of submissions.
- **You own the data** — it's just a sheet in your Google Drive.
- **No cookies, no tracking** — just an email + campaign tag per row.

---

## Step 1 — Create the Google Sheet

1. Go to <https://sheets.new> (this creates a fresh Google Sheet)
2. Rename it: **"Chasing Fun Newsletter — Signups"**
3. Look at the URL in your browser. It looks like:
   ```
   https://docs.google.com/spreadsheets/d/1AbCdEf...XyZ/edit
   ```
   The part **between `/d/` and `/edit`** is the Sheet ID. Copy it. You'll need it in Step 2.

---

## Step 2 — Create the Apps Script

1. Open your Google Sheet
2. Top menu → **Extensions → Apps Script**
3. A new tab opens with a code editor and a default `myFunction()` placeholder. **Delete everything** in that editor.
4. Open the file `07-integrations/newsletter-signup-script.gs` from this project folder.
5. Copy ALL its contents and **paste into the Apps Script editor**.
6. Find the line near the top:
   ```js
   const SHEET_ID = 'PASTE_SHEET_ID_HERE';
   ```
7. Replace `PASTE_SHEET_ID_HERE` with the Sheet ID you copied in Step 1.
8. Click the 💾 save icon (or Ctrl+S). Give the project a name when asked: **"Newsletter Signup"**.

---

## Step 3 — Deploy as Web App

1. In the Apps Script editor, click the blue **Deploy** button (top-right) → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" → choose **Web app**
3. Fill in:
   - **Description:** `Newsletter signup endpoint v1`
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone` ⚠️ (this is critical — the form must be reachable without login)
4. Click **Deploy**
5. Google will ask you to **authorize** the script. Follow the prompts.
   - When you see "Google hasn't verified this app" — click **Advanced** → **Go to Newsletter Signup (unsafe)** → **Allow**.
   - This is normal for personal Apps Scripts. Google's "unsafe" warning means "this isn't a Google-verified app" — but YOU wrote it (well, we did), so it's fine.
6. After deployment, you'll see a **Web app URL** that looks like:
   ```
   https://script.google.com/macros/s/AKfycbz.../exec
   ```
7. **Copy that URL.** This is the endpoint our website's form posts to.

---

## Step 4 — Tell me the URL

Paste the URL in chat. I'll:
1. Add it to `00-core/FIXED_LINKS.md` as the canonical signup endpoint.
2. Update the templates so the next deploy includes it (replacing `{{signup_endpoint_url}}`).
3. Tell you to push the change via GitHub Desktop.
4. Verify it works by submitting a test signup from the live site.

---

## Step 5 — (Optional) Email notification on each signup

Want a notification email when a new person signs up? Add this function to the Apps Script:

```js
function onNewSignup(email, campaign, source) {
  MailApp.sendEmail({
    to: 'dordamari1@gmail.com',
    subject: '🌊 New newsletter signup',
    body: 'Email: ' + email + '\nCampaign: ' + campaign + '\nSource: ' + source
  });
}
```

And inside `doPost`, after `sheet.appendRow(...)`, call `onNewSignup(email, campaign, source);`.

(Skip this for now — you'll see the rows pile up in the sheet anyway.)

---

## What the Sheet Will Look Like

| Timestamp | Email | Campaign | Source | UserAgent |
|---|---|---|---|---|
| 2026-05-08 09:14 | someone@gmail.com | weekend_insights_1 | page | Chrome/... |
| 2026-05-08 09:18 | another@gmail.com | homepage | homepage | Safari/... |

You can filter by Campaign to see which weekly post drove the most signups.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Form on site says "הטופס עוד לא חובר" | The endpoint URL hasn't been pasted into FIXED_LINKS.md yet — tell me to do it |
| Submissions don't appear in sheet | Check you set "Who has access: Anyone" in deployment |
| "Authorization required" error | The deployment "Execute as" isn't set to your account — re-deploy |
| Sheet ID was wrong | Open Apps Script editor → fix `SHEET_ID` → save → New Version of deployment |

---

## Updating the Script Later

If we change the script (add features, fix bugs):
1. Edit in Apps Script editor
2. Save
3. Click **Deploy → Manage deployments**
4. Click the pencil ✏️ next to the active version → choose **New version** → Deploy
5. The URL stays the same — no changes needed in the website code.
