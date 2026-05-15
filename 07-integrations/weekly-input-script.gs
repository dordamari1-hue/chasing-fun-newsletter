/**
 * Chasing Fun — Weekly Input Endpoint
 *
 * Receives a POST from the input form (the one hosted at /input on the site)
 * and writes a row to the "Weekly Inputs" sheet.
 * Sends Dor a confirmation email so he knows the submission landed.
 *
 * DEPLOY AS WEB APP:
 *   - Execute as: Me (chasingfm@gmail.com)
 *   - Who has access: Anyone
 */

const SHEET_ID = '15tfBk5183GCOFspqVq88XLwnceEAr1UhaPTUhPAY6cE';
const NOTIFY_EMAIL = 'chasingfm@gmail.com'; // change if you want notifications elsewhere

const FIELDS = [
  'issue_num', 'publish_date',
  'framing',
  'forecast_title', 'forecast_text', 'forecast_image',
  'w1_title', 'w1_body',
  'w2_title', 'w2_quote', 'w2_source', 'w2_body',
  'inline_image', 'inline_image_alt', 'inline_image_caption',
  'w3_title', 'w3_body',
  'w4_title', 'w4_body', 'w4_action',
  'w5_title', 'w5_body', 'w5_url',
  'cta_type', 'cta_custom',
  'trip_name', 'trip_desc', 'trip_deadline',
  'event_name', 'event_desc', 'event_when',
  'community_msg',
  'teaser_title', 'teaser_body',
  'up_next', 'notes',
  'user_agent'
];

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    var p = e.parameter || {};

    var row = [new Date()];
    FIELDS.forEach(function(f){
      row.push((p[f] || '').trim());
    });
    row.push('pending'); // status column

    sheet.appendRow(row);

    // Notify Dor by email
    try {
      var issueNum = (p['issue_num'] || '?').trim();
      var publishDate = (p['publish_date'] || '').trim();
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: '🌊 New newsletter input submitted — Issue #' + issueNum,
        body:
          'You just submitted a new weekly input.\n\n' +
          'Issue: #' + issueNum + '\n' +
          'Publish date: ' + publishDate + '\n\n' +
          'Go to Cowork and tell Claude: "I submitted issue #' + issueNum + '"\n' +
          'Claude will read the row from the sheet and build the post.\n\n' +
          'Sheet: https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/edit'
      });
    } catch (mailErr) {
      // email failure shouldn't block submission
    }

    return jsonResponse({ ok: true, issue_num: p['issue_num'] || '' });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function doGet() {
  return jsonResponse({ ok: true, status: 'alive' });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
