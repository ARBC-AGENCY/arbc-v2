/**
 * Intro gate — controls the "video game intro screen" behaviour.
 *
 * The HomeHero is shown on the very first visit, or when 24 h have elapsed
 * since the user last LEFT the home page. Once the user navigates away from
 * home the timestamp is stamped; any subsequent attempt to reach "/" within
 * that 24-hour window is redirected to /explore instead.
 *
 * Crucially the flag is written on DEPARTURE (not arrival), so refreshing
 * the home page before ever clicking a link still shows the intro.
 */

const KEY = "arbc_intro_seen";
const TTL = 24 * 60 * 60 * 1000; // 24 h in ms

export function hasSeenIntroRecently(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return false;
    return Date.now() - parseInt(raw, 10) < TTL;
  } catch {
    return false; // private-browsing / storage blocked
  }
}

/** Call this the moment the user navigates AWAY from the home page. */
export function markIntroSeen(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, Date.now().toString());
  } catch {
    // ignore
  }
}
