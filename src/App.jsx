import { useCallback, useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import AboutView from './components/AboutView';
import AuthModal from './components/AuthModal';
import EngineView from './components/EngineView';
import {
  TOURNAMENTS,
  applyLocalAdvancement,
  calculateStandings,
  deriveRosters,
  findChampion,
  gameLabel,
  resetLocalMatches,
} from './data/tournamentCatalog';
import {
  fetchMatches,
  fetchTournaments,
  fetchTournamentsStandings,
  submitMatchScore,
} from './api/bracketApi';
import safeStorage from './utils/safeStorage';

const USER_KEY = 'apex_user';

/**
 * Merge the local catalog with the live tournament list coming from Render so
 * the dropdown always has content, live entries take priority, and every entry
 * keeps its rich local metadata (roster captain/role, schedule times).
 */
function buildTournamentList(remoteTournaments) {
  const byId = new Map();

  Object.values(TOURNAMENTS).forEach((local) => {
    byId.set(String(local.id), {
      ...local,
      id: String(local.id),
      optionLabel: `${local.game}: ${local.title}`,
      live: false,
    });
  });

  (remoteTournaments || []).forEach((remote) => {
    const id = String(remote.id);
    const local = TOURNAMENTS[id];
    const game = gameLabel(remote.gameType) || local?.game || 'Unknown';
    const title = remote.title || local?.title || `Tournament ${id}`;
    const teamNames =
      remote.teamNames && remote.teamNames.length
        ? remote.teamNames
        : (local?.teams || []).map((team) => team.name);

    byId.set(id, {
      id,
      rawId: remote.id,
      title,
      game,
      meta: local?.meta || `Single Elimination \u2022 ${remote.maxTeams || teamNames.length || 4} Teams`,
      status: remote.status,
      teamNames,
      teams: local?.teams || [],
      matches: local?.matches || [],
      live: true,
      optionLabel: `${game}: ${title}`,
    });
  });

  return Array.from(byId.values()).sort((a, b) => Number(a.id) - Number(b.id));
}

export default function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(() => safeStorage.getItem(USER_KEY) || null);
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });

  const [activeTournamentId, setActiveTournamentId] = useState('1');
  const [filter, setFilter] = useState('ALL');

  const [remoteTournaments, setRemoteTournaments] = useState([]);
  const [matches, setMatches] = useState([]);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [submittingMatchId, setSubmittingMatchId] = useState(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [backendOnline, setBackendOnline] = useState(false);

  const tournaments = useMemo(() => buildTournamentList(remoteTournaments), [remoteTournaments]);

  const activeTournament = useMemo(
    () => tournaments.find((t) => String(t.id) === String(activeTournamentId)) || tournaments[0],
    [tournaments, activeTournamentId]
  );

  const localTournament = TOURNAMENTS[String(activeTournamentId)] || null;
  const localMatches = useMemo(() => localTournament?.matches || [], [localTournament]);

  const rosters = useMemo(
    () => deriveRosters(activeTournament?.teamNames, localTournament?.teams || []),
    [activeTournament, localTournament]
  );

  const champion = useMemo(() => findChampion(matches), [matches]);

  /** Fetch the bracket + standings for a tournament, falling back to local data. */
  const loadTournament = useCallback(async (tournamentId, { silent = false } = {}) => {
    const local = TOURNAMENTS[String(tournamentId)] || null;
    if (!silent) setLoading(true);

    try {
      const [liveMatches, liveStandings] = await Promise.all([
        fetchMatches(tournamentId),
        fetchTournamentsStandings(tournamentId).catch(() => null),
      ]);

      if (Array.isArray(liveMatches) && liveMatches.length) {
        setMatches(liveMatches);
        setStandings(
          Array.isArray(liveStandings) && liveStandings.length
            ? liveStandings
            : calculateStandings(local?.teams, liveMatches)
        );
        setBackendOnline(true);
        setError('');
      } else {
        setMatches(local?.matches || []);
        setStandings(calculateStandings(local?.teams, local?.matches || []));
        setBackendOnline(false);
        setError('Live API returned no fixtures \u2014 showing cached snapshot.');
      }
    } catch (err) {
      setMatches(local?.matches || []);
      setStandings(calculateStandings(local?.teams, local?.matches || []));
      setBackendOnline(false);
      setError(`Live API unavailable (${err.message}). Showing cached bracket.`);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  // Load the remote tournament catalog once on mount.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchTournaments();
        if (!cancelled && Array.isArray(list) && list.length) {
          setRemoteTournaments(list);
          setBackendOnline(true);
        }
      } catch {
        if (!cancelled) setBackendOnline(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Reload the bracket whenever the active tournament changes.
  useEffect(() => {
    loadTournament(activeTournamentId);
  }, [activeTournamentId, loadTournament]);

  const handleNavigate = (nextView) => {
    setView(nextView);
    if (nextView === 'engine') loadTournament(activeTournamentId, { silent: true });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTournament = (id) => {
    setActiveTournamentId(String(id));
    setFilter('ALL');
    setNotice('');
    setError('');
  };

  const handleSync = async () => {
    setSyncing(true);
    setNotice('');
    try {
      const list = await fetchTournaments();
      if (Array.isArray(list) && list.length) setRemoteTournaments(list);
      await loadTournament(activeTournamentId, { silent: true });
      setNotice('Synced with the live ApexGrid API.');
    } catch (err) {
      setNotice(`Sync failed (${err.message}) \u2014 using cached data.`);
    } finally {
      setSyncing(false);
    }
  };

  const handleReset = () => {
    const next = resetLocalMatches(matches.length ? matches : localMatches);
    setMatches(next);
    setStandings(calculateStandings(rosters, next));
    setNotice('Scores reset locally. Use "Sync Live API" to reload the server bracket.');
  };

  const handleScoreSubmit = async (matchId, rawA, rawB) => {
    const scoreA = Number.parseInt(rawA, 10);
    const scoreB = Number.parseInt(rawB, 10);

    if (Number.isNaN(scoreA) || Number.isNaN(scoreB) || scoreA < 0 || scoreB < 0) {
      setNotice('Please enter valid non-negative scores.');
      return;
    }
    if (scoreA === scoreB) {
      setNotice('Draws are not permitted in single-elimination brackets.');
      return;
    }

    setNotice('');
    setSubmittingMatchId(matchId);

    try {
      await submitMatchScore(matchId, scoreA, scoreB);

      // Re-fetch so the winning team advances into the downstream fixture.
      const [liveMatches, liveStandings] = await Promise.all([
        fetchMatches(activeTournamentId),
        fetchTournamentsStandings(activeTournamentId).catch(() => null),
      ]);

      setMatches(liveMatches);
      setStandings(
        Array.isArray(liveStandings) && liveStandings.length
          ? liveStandings
          : calculateStandings(rosters, liveMatches)
      );
      setBackendOnline(true);
      setError('');
      setNotice('Score accepted \u2014 winner advanced in the bracket.');
    } catch (err) {
      // Offline / conflict: apply the promotion rule locally so the demo remains usable.
      const next = applyLocalAdvancement(matches, matchId, scoreA, scoreB);
      setMatches(next);
      setStandings(calculateStandings(rosters, next));
      setNotice(`Score saved locally \u2014 backend sync failed (${err.message}).`);
    } finally {
      setSubmittingMatchId(null);
    }
  };

  const openAuth = (mode) => setAuthModal({ open: true, mode });
  const closeAuth = () => setAuthModal((prev) => ({ ...prev, open: false }));

  const handleAuthenticated = (email) => {
    safeStorage.setItem(USER_KEY, email);
    setUser(email);
  };

  const handleLogout = () => {
    safeStorage.removeItem(USER_KEY);
    setUser(null);
  };

  return (
    <>
      <Navbar
        view={view}
        onNavigate={handleNavigate}
        user={user}
        onOpenAuth={openAuth}
        onLogout={handleLogout}
      />

      {view === 'home' && <HomeView onNavigate={handleNavigate} />}

      {view === 'engine' && (
        <EngineView
          tournaments={tournaments}
          activeTournament={activeTournament}
          localMatches={localMatches}
          matches={matches}
          standings={standings}
          rosters={rosters}
          filter={filter}
          onFilterChange={setFilter}
          onSelectTournament={handleSelectTournament}
          onReset={handleReset}
          onSync={handleSync}
          syncing={syncing}
          onScoreSubmit={handleScoreSubmit}
          submittingMatchId={submittingMatchId}
          loading={loading}
          error={error}
          notice={notice}
          champion={champion}
        />
      )}

      {view === 'about' && <AboutView onNavigate={handleNavigate} />}

      <Footer onNavigate={handleNavigate} onOpenAuth={openAuth} backendOnline={backendOnline} />

      <AuthModal
        open={authModal.open}
        mode={authModal.mode}
        onClose={closeAuth}
        onAuthenticated={handleAuthenticated}
        onToggleMode={() =>
          setAuthModal((prev) => ({ ...prev, mode: prev.mode === 'login' ? 'signup' : 'login' }))
        }
      />
    </>
  );
}
