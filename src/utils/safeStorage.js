/**
 * safeStorage
 * -----------
 * A defensive wrapper around `window.localStorage`.
 *
 * Browsers in strict / incognito / sandboxed modes (or when third-party
 * cookies are blocked) throw a SecurityError the moment `localStorage` is
 * accessed. Authentication state must never crash the app because of that,
 * so every call is wrapped in try/catch with an in-memory Map fallback.
 */

const memoryStore = new Map();

function getBackingStore() {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      // Probe with a lightweight round-trip: some browsers expose the object
      // but throw on the very first write.
      const probe = '__apexgrid_probe__';
      window.localStorage.setItem(probe, '1');
      window.localStorage.removeItem(probe);
      return window.localStorage;
    }
  } catch {
    /* fall through to the in-memory store */
  }
  return null;
}

export const safeStorage = {
  getItem(key) {
    const store = getBackingStore();
    if (store) {
      try {
        const value = store.getItem(key);
        if (value !== null && value !== undefined) return value;
      } catch {
        /* ignore and fall back */
      }
    }
    return memoryStore.has(key) ? memoryStore.get(key) : null;
  },

  setItem(key, value) {
    const stringValue = String(value);
    memoryStore.set(key, stringValue);
    const store = getBackingStore();
    if (store) {
      try {
        store.setItem(key, stringValue);
      } catch {
        /* persisted only in memory */
      }
    }
  },

  removeItem(key) {
    memoryStore.delete(key);
    const store = getBackingStore();
    if (store) {
      try {
        store.removeItem(key);
      } catch {
        /* nothing else to do */
      }
    }
  },
};

export default safeStorage;
