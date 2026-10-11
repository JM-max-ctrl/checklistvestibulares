const V = 'checklists-v13';
const CORE = ["./", "index.html", "sw.js", "qr-libs.js", "checklist_sis_1serie_2026.html", "manifest-sis-1.webmanifest", "icons/sis-1-180.png", "icons/sis-1-192.png", "icons/sis-1-512.png", "checklistSIS.html", "manifest-sis-2.webmanifest", "icons/sis-2-180.png", "icons/sis-2-192.png", "icons/sis-2-512.png", "checklist_sis_3serie_2026.html", "manifest-sis-3.webmanifest", "icons/sis-3-180.png", "icons/sis-3-192.png", "icons/sis-3-512.png", "checklist_psc_1etapa_2027.html", "manifest-psc-1.webmanifest", "icons/psc-1-180.png", "icons/psc-1-192.png", "icons/psc-1-512.png", "checklistPSC.html", "manifest-psc-2.webmanifest", "icons/psc-2-180.png", "icons/psc-2-192.png", "icons/psc-2-512.png", "checklist_psc_3etapa_2027.html", "manifest-psc-3.webmanifest", "icons/psc-3-180.png", "icons/psc-3-192.png", "icons/psc-3-512.png"];
self.addEventListener('install', e => e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url), same = u.origin === location.origin;
  if (same && r.mode === 'navigate') {
    e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); return res; })
      .catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match('index.html'))));
    return;
  }
  if (same || /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) {
    e.respondWith(caches.match(r).then(m => {
      const n = fetch(r).then(res => { if (res && (res.ok || res.type === 'opaque')) { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); } return res; }).catch(() => m);
      return m || n;
    }));
  }
});
