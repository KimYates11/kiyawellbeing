/* Floating "Complimentary wellbeing checklist" button, shared by every page.
   Links to the Wellbeing Check section on the corporate page. It slides in
   after a little scrolling (or 6 seconds) and stays hidden for the rest of
   the visit once closed. */
(() => {
  const script = document.currentScript;
  let closed = false;
  try { closed = sessionStorage.getItem('wcToggleClosed') === '1'; } catch (e) {}
  if (closed) return;

  const href = new URL('corporate.html#wellbeing-check', script.src).href;

  const css = `
.wc-toggle{position:fixed;right:20px;bottom:20px;z-index:90;display:flex;align-items:center;gap:4px;background:#116E6B;color:#fff;border-radius:100px;box-shadow:0 10px 28px rgba(17,110,107,.35);padding:6px 6px 6px 8px;transform:translateY(140%);opacity:0;transition:transform .45s cubic-bezier(.2,.7,.3,1),opacity .3s ease;max-width:calc(100vw - 32px);font-family:'General Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.wc-toggle.show{transform:none;opacity:1;}
.wc-toggle a{display:flex;align-items:center;gap:12px;color:#fff;text-decoration:none;padding:6px 8px 6px 6px;}
.wc-toggle .wc-ico{flex:none;width:38px;height:38px;border-radius:50%;background:#F6E3D8;display:flex;align-items:center;justify-content:center;}
.wc-toggle .wc-ico svg{width:20px;height:20px;stroke:#116E6B;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
.wc-toggle .wc-txt{display:flex;flex-direction:column;line-height:1.2;}
.wc-toggle .wc-txt small{font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#F6E3D8;}
.wc-toggle .wc-txt span{font-size:15px;font-weight:600;}
.wc-toggle a:hover .wc-txt span{text-decoration:underline;text-underline-offset:3px;}
.wc-toggle button{flex:none;width:32px;height:32px;border-radius:50%;border:0;background:rgba(255,255,255,.14);color:#fff;font-size:18px;line-height:1;cursor:pointer;}
.wc-toggle button:hover{background:rgba(255,255,255,.28);}
@media(max-width:600px){.wc-toggle{left:16px;right:16px;bottom:16px;justify-content:space-between;}.wc-toggle .wc-txt span{font-size:14px;}}
@media(prefers-reduced-motion:reduce){.wc-toggle{transition:none;}}`;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const t = document.createElement('div');
  t.className = 'wc-toggle';
  t.id = 'wcToggle';
  t.setAttribute('role', 'complementary');
  t.setAttribute('aria-label', 'Complimentary workplace wellbeing checklist');
  t.innerHTML =
    '<a href="' + href + '">' +
      '<span class="wc-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><polyline points="8.5,9 10,10.5 13,7.5"/><line x1="8.5" y1="14" x2="15.5" y2="14"/><line x1="8.5" y1="17" x2="13" y2="17"/></svg></span>' +
      '<span class="wc-txt"><small>Complimentary</small><span>Wellbeing checklist for your workplace &rarr;</span></span>' +
    '</a>' +
    '<button type="button" aria-label="Hide the checklist offer">&times;</button>';

  const start = () => {
    document.body.appendChild(t);
    const show = () => t.classList.add('show');
    const check = () => { if (window.scrollY > 300) { show(); window.removeEventListener('scroll', check); } };
    window.addEventListener('scroll', check, { passive: true });
    setTimeout(show, 6000);
    t.querySelector('button').addEventListener('click', () => {
      t.classList.remove('show');
      try { sessionStorage.setItem('wcToggleClosed', '1'); } catch (e) {}
      setTimeout(() => t.remove(), 500);
    });
  };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();
