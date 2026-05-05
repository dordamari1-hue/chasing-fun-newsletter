/**
 * Chasing Fun — Multi-LP Signup Endpoint
 *
 * Receives POST requests from the website's signup forms (any landing page).
 * Each form posts: name, email, source_page, source_url, sequence,
 * campaign, utm_source, utm_medium, user_agent.
 *
 * Appends every submission as a new row in the central Signups sheet.
 *
 * The downstream automation system (built elsewhere) reads from this sheet
 * by `sequence` to route each subscriber into the right nurture flow.
 *
 * DEPLOY AS WEB APP:
 *   - Execute as: Me (your email)
 *   - Who has access: Anyone (required so the form works without login)
 */

// === Pre-configured: the sheet is already created and headers are set ===
const SHEET_ID = '1LaVug4kIG-JdwY17PTOPmZ3wCOBawL7hd6riAPpk6N8';

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    var p = e.parameter || {};

    var name        = (p.name        || '').trim();
    var email       = (p.email       || '').trim().toLowerCase();
    var source_page = (p.source_page || '').trim();
    var source_url  = (p.source_url  || '').trim();
    var sequence    = (p.sequence    || '').trim();
    var campaign    = (p.campaign    || '').trim();
    var utm_source  = (p.utm_source  || '').trim();
    var utm_medium  = (p.utm_medium  || '').trim();
    var user_agent  = (p.user_agent  || '').trim();

    if (!isValidEmail(email)) {
      return jsonResponse({ ok: false, error: 'invalid_email' });
    }

    sheet.appendRow([
      new Date(),
      name,
      email,
      source_page,
      source_url,
      sequence,
      campaign,
      utm_source,
      utm_medium,
      user_agent,
      '',  // status — for manual tracking later (subscribed/unsubscribed/bounced)
      ''   // notes — for manual notes later
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function doGet() {
  // Health check
  return jsonResponse({ ok: true, status: 'alive' });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
