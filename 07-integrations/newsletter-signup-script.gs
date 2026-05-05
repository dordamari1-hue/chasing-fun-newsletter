/**
 * Chasing Fun Newsletter — Email signup endpoint
 *
 * Receives POST requests from the website's inline signup form
 * and appends each submission to a Google Sheet.
 *
 * DEPLOY AS WEB APP:
 *   - Execute as: Me (your email)
 *   - Who has access: Anyone (required for the form to work without login)
 *
 * The deployed Web App URL is what we paste into FIXED_LINKS.md as
 * NEWSLETTER_SIGNUP_ENDPOINT — and the agent injects it into the templates.
 */

// === EDIT THIS: paste the ID of your Google Sheet (from its URL) ===
const SHEET_ID = 'PASTE_SHEET_ID_HERE';
const SHEET_NAME = 'Signups';   // tab name in the sheet (will be created if missing)

function doPost(e) {
  try {
    var sheet = getOrCreateSheet();
    var params = e.parameter || {};
    var email = (params.email || '').trim().toLowerCase();
    var campaign = (params.campaign || '').trim();
    var source = (params.source || '').trim();

    if (!isValidEmail(email)) {
      return jsonResponse({ ok: false, error: 'invalid_email' }, 400);
    }

    // De-dup: don't add the same email twice from the same campaign
    if (alreadyExists(sheet, email)) {
      return jsonResponse({ ok: true, status: 'already_subscribed' });
    }

    sheet.appendRow([
      new Date(),
      email,
      campaign,
      source,
      e.parameter.userAgent || ''
    ]);

    return jsonResponse({ ok: true, status: 'added' });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

function doGet() {
  // Health check — returns 200 if the script is alive
  return jsonResponse({ ok: true, status: 'alive' });
}

function getOrCreateSheet() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Email', 'Campaign', 'Source', 'UserAgent']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function alreadyExists(sheet, email) {
  if (sheet.getLastRow() < 2) return false;
  var emails = sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).getValues();
  for (var i = 0; i < emails.length; i++) {
    if (String(emails[i][0]).toLowerCase() === email) return true;
  }
  return false;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonResponse(obj, status) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
