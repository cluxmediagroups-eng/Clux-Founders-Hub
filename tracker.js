/**
 * Clux Founders Hub — Page View Tracker
 * tracker.js | Version 1.0
 *
 * Silently records landing page visits into localStorage.
 * Data is read by admin.html — never visible to visitors.
 *
 * To install: add this single line before </body> in index.html:
 * <script src="tracker.js"></script>
 */

(function () {
  try {
    var KEY = 'cfh_page_views';
    var existing = JSON.parse(localStorage.getItem(KEY) || '[]');

    // De-duplicate: ignore if same session visited within last 30 minutes
    var lastView = existing[existing.length - 1];
    var now = Date.now();
    var THIRTY_MINS = 30 * 60 * 1000;
    if (lastView && (now - new Date(lastView.ts).getTime()) < THIRTY_MINS) return;

    // Parse UTM parameters from URL
    var params = new URLSearchParams(window.location.search);

    var entry = {
      ts:     new Date().toISOString(),
      source: params.get('utm_source')  || params.get('source') || 'direct',
      medium: params.get('utm_medium')  || null,
      ref:    params.get('utm_content') || params.get('ref')    || null,
      page:   'landing'
    };

    existing.push(entry);
    localStorage.setItem(KEY, JSON.stringify(existing));

  } catch (e) {
    // Fail silently — never break the page
  }
})();
