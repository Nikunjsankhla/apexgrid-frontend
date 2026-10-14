/**
 * bracketApi
 * ----------
 * Centralised API service layer for the ApexGrid Tournament Engine.
 *
 * The SPA talks to the live Spring Boot backend on Render. Requests target the
 * Render origin directly first; if that is blocked (no CORS header, offline,
 * cold-start network error) the request is transparently retried against the
 * same-origin `/api/*` proxy configured in `netlify.toml` / `vite.config.js`.
 */

export const DIRECT_API_BASE =
  import.meta.env.VITE_API_BASE_URL || 'https://apexgrid-backend-ejej.onrender.com';

// Same-origin proxy prefix (Netlify redirect / Vite dev proxy). Empty string
// keeps requests relative to the current origin.
export const PROXY_API_BASE = import.meta.env.VITE_PROXY_API_BASE ?? '';

// Backwards-compatible export name.
export const API_BASE = DIRECT_API_BASE;

function buildUrl(base, path) {
  const trimmedBase = base ? base.replace(/\/+$/, '') : '';
  return `${trimmedBase}${path}`;
}

async function doFetch(base, path, options) {
  const url = buildUrl(base, path);
  const hasBody = Boolean(options && options.body);
  const headers = {
    Accept: 'application/json',
    ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
    ...((options && options.headers) || {}),
  };

  const response = await fetch(url, { ...options, headers });

  const raw = await response.text();
  let data = null;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw;
    }
  }

  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && (data.message || data.error)) ||
      `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

// Remember when the direct (cross-origin) origin is unusable so subsequent
// calls go straight to the same-origin proxy instead of paying the failed
// round-trip every time. Reset implicitly on a successful direct call.
let preferProxy = false;

function isTransportFailure(error) {
  return (
    error instanceof TypeError ||
    error?.name === 'TypeError' ||
    error?.message === 'Failed to fetch' ||
    error?.message === 'NetworkError when attempting to fetch resource.'
  );
}

async function request(path, options) {
  const bases = [preferProxy ? PROXY_API_BASE : DIRECT_API_BASE, preferProxy ? DIRECT_API_BASE : PROXY_API_BASE];
  // De-duplicate when both bases resolve to the same origin.
  const ordered = bases.filter((base, index) => bases.indexOf(base) === index);

  let lastError;
  for (const base of ordered) {
    try {
      const result = await doFetch(base, path, options);
      preferProxy = base === PROXY_API_BASE && PROXY_API_BASE !== DIRECT_API_BASE;
      return result;
    } catch (error) {
      lastError = error;
      // Only retry on transport-level failures (DNS, network, CORS block).
      // Real HTTP error responses (4xx/5xx) must be surfaced to the caller.
      if (!isTransportFailure(error)) throw error;
    }
  }
  throw lastError;
}

/** GET /api/tournaments — every tournament registered in the engine. */
export function fetchTournaments() {
  return request('/api/tournaments');
}

/** GET /api/brackets/tournaments/{id}/matches — the live knockout bracket. */
export function fetchMatches(tournamentId) {
  return request(`/api/brackets/tournaments/${tournamentId}/matches`);
}

/** GET /api/brackets/tournaments/{id}/standings — computed leaderboard. */
export function fetchTournamentsStandings(tournamentId) {
  return request(`/api/brackets/tournaments/${tournamentId}/standings`);
}

/**
 * PUT /api/brackets/matches/{matchId}/score
 * Submitting a score advances the winning team into the downstream fixture.
 */
export function submitMatchScore(matchId, scoreTeamA, scoreTeamB) {
  return request(`/api/brackets/matches/${matchId}/score`, {
    method: 'PUT',
    body: JSON.stringify({ scoreTeamA, scoreTeamB }),
  });
}

export default {
  API_BASE,
  DIRECT_API_BASE,
  PROXY_API_BASE,
  fetchTournaments,
  fetchMatches,
  fetchStandings: fetchTournamentsStandings,
  submitMatchScore,
};
