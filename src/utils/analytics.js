const STORAGE_KEY = "pixel_folio_analytics_v1";

export function trackEvent(type, payload = {}) {
  const event = {
    type,
    payload,
    ts: Date.now(),
  };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : { events: [], counters: {} };
    parsed.events.push(event);
    parsed.counters[type] = (parsed.counters[type] || 0) + 1;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch {
  }

  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    console.info("[analytics]", event);
  }
}
