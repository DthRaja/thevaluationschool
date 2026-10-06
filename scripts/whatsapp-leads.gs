/**
 * Google Apps Script web app that stores "Contact us on WhatsApp" submissions.
 *
 * Setup:
 * 1. Open the target Google Sheet → Extensions → Apps Script, paste this file.
 * 2. Project Settings → Script properties → add SECRET = <a long random string>.
 *    Use the same value for GOOGLE_SHEET_SECRET in the Next.js .env.
 * 3. Deploy → New deployment → Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. Copy the web app URL (ends in /exec) into GOOGLE_SHEET_WEBHOOK_URL in .env.
 * After editing the script, use Deploy → Manage deployments → Edit → New version
 * so the same /exec URL serves the new code.
 */

const SHEET_NAME = "WhatsApp Leads";
const HEADERS = ["Timestamp", "Name", "Email", "Doubt related to", "Course(s)", "Message", "Page URL"];

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const secret = PropertiesService.getScriptProperties().getProperty("SECRET");

    if (secret && data.secret !== secret) {
      return json_({ ok: false, error: "Unauthorized" });
    }

    if (!data.name || !data.email || !data.topic || !data.message) {
      return json_({ ok: false, error: "Missing required fields" });
    }

    lock.waitLock(10000);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }

    sheet.appendRow([
      new Date(),
      clean_(data.name),
      clean_(data.email),
      clean_(data.topic),
      clean_(data.courses),
      clean_(data.message),
      clean_(data.pageUrl),
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try {
      lock.releaseLock();
    } catch (ignored) {}
  }
}

// Prefix values that Sheets would treat as formulas (=, +, -, @) so user input
// can't inject formulas into the spreadsheet.
function clean_(value) {
  const text = String(value == null ? "" : value).slice(0, 2000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
