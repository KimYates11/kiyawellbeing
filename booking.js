/* KIYA Wellbeing bookings (Cal.com embed)
   Change CAL_USER to your Cal.com username and every booking button updates.
   Event slugs must match the "URL" of each event type in Cal.com:
     intro-call          30 min  Corporate intro call (set to Hidden in Cal.com so it only shows on the corporate page)
     discovery-chat      15 min  Free chat for individual sessions
     reiki-1-hour-online-distance  60 min
     reiki-in-person               60 min
     reiki-75-mins-in-person       75 min
     rest-reset-2-hours            2 hrs
*/
(function () {
  var CAL_USER = 'kiyawellbeing';
  var BRAND = '#116E6B';
  var CONFIG = { layout: 'month_view', theme: 'light' };

  // Official Cal.com embed loader
  (function (C, A, L) { var p = function (a, ar) { a.q.push(ar); }; var d = C.document; C.Cal = C.Cal || function () { var cal = C.Cal; var ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true; } if (ar[0] === L) { var api = function () { p(api, arguments); }; var namespace = ar[1]; api.q = api.q || []; if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, 'https://app.cal.com/embed/embed.js', 'init');

  Cal('init', { origin: 'https://cal.com' });
  Cal('ui', {
    theme: 'light',
    cssVarsPerTheme: { light: { 'cal-brand': BRAND } },
    styles: { branding: { brandColor: BRAND } },
    hideEventTypeDetails: false,
    layout: 'month_view'
  });

  function link(slug) { return slug ? CAL_USER + '/' + slug : CAL_USER; }

  // Buttons: <a data-book="intro-call" href="...">  open the calendar in a pop-up on this page
  document.querySelectorAll('[data-book]').forEach(function (el) {
    var calLink = link(el.getAttribute('data-book'));
    el.setAttribute('href', 'https://cal.com/' + calLink);
    el.removeAttribute('target');
    el.addEventListener('click', function (e) {
      e.preventDefault();
      Cal('modal', { calLink: calLink, config: CONFIG });
    });
  });

  // Inline calendar: <div data-cal-inline="">  (empty value = all public session types)
  document.querySelectorAll('[data-cal-inline]').forEach(function (el, i) {
    if (!el.id) el.id = 'cal-inline-' + i;
    Cal('inline', {
      elementOrSelector: '#' + el.id,
      calLink: link(el.getAttribute('data-cal-inline')),
      layout: 'month_view',
      config: CONFIG
    });
  });
})();
