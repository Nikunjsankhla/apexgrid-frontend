/**
 * tournamentCatalog
 * -----------------
 * The canonical local dataset for the ApexGrid Tournament Engine.
 *
 * The live Spring Boot backend is the source of truth whenever it is
 * reachable. This catalog provides:
 *   1. Instant first paint (no empty screens while the API cold-starts).
 *   2. Graceful offline fallback if Render / Aiven are unavailable.
 *   3. Rich roster metadata (captain / in-game role) and match schedule times
 *      that the current REST contract does not expose.
 */

export const TOURNAMENTS = {
  '1': {
    id: 1,
    title: 'Apex Masters 2026',
    game: 'Valorant',
    meta: 'Single Elimination \u2022 4 Teams',
    teams: [
      { name: 'Sentinels', captain: 'Sentinels_Cap', role: 'Duelist' },
      { name: 'Fnatic', captain: 'Fnatic_Cap', role: 'Initiator' },
      { name: 'Paper Rex', captain: 'PaperRex_Cap', role: 'Duelist' },
      { name: 'Team Liquid', captain: 'TeamLiquid_Cap', role: 'Sentinel' },
    ],
    matches: [
      { matchId: 101, roundNumber: 1, matchNumberInRound: 1, teamAName: 'Sentinels', teamBName: 'Fnatic', scoreTeamA: 13, scoreTeamB: 9, winnerName: 'Sentinels', status: 'COMPLETED', time: '17:00 UTC' },
      { matchId: 102, roundNumber: 1, matchNumberInRound: 2, teamAName: 'Paper Rex', teamBName: 'Team Liquid', scoreTeamA: 11, scoreTeamB: 13, winnerName: 'Team Liquid', status: 'COMPLETED', time: '18:30 UTC' },
      { matchId: 103, roundNumber: 2, matchNumberInRound: 1, teamAName: 'Sentinels', teamBName: 'Team Liquid', scoreTeamA: null, scoreTeamB: null, winnerName: null, status: 'SCHEDULED', time: 'Today \u2022 20:00 UTC' },
    ],
  },
  '2': {
    id: 2,
    title: 'Major Championship 2026',
    game: 'CS2',
    meta: 'Single Elimination \u2022 4 Teams',
    teams: [
      { name: 'Natus Vincere', captain: 's1mple_lead', role: 'AWPer' },
      { name: 'FaZe Clan', captain: 'karrigan_igl', role: 'IGL' },
      { name: 'Vitality', captain: 'ZywOo_star', role: 'Rifler' },
      { name: 'G2 Esports', captain: 'm0NESY_snip', role: 'Entry' },
    ],
    matches: [
      { matchId: 201, roundNumber: 1, matchNumberInRound: 1, teamAName: 'Natus Vincere', teamBName: 'FaZe Clan', scoreTeamA: 16, scoreTeamB: 12, winnerName: 'Natus Vincere', status: 'COMPLETED', time: '15:00 UTC' },
      { matchId: 202, roundNumber: 1, matchNumberInRound: 2, teamAName: 'Vitality', teamBName: 'G2 Esports', scoreTeamA: 14, scoreTeamB: 16, winnerName: 'G2 Esports', status: 'COMPLETED', time: '16:30 UTC' },
      { matchId: 203, roundNumber: 2, matchNumberInRound: 1, teamAName: 'Natus Vincere', teamBName: 'G2 Esports', scoreTeamA: null, scoreTeamB: null, winnerName: null, status: 'SCHEDULED', time: 'Today \u2022 19:30 UTC' },
    ],
  },
  '3': {
    id: 3,
    title: 'Fortnite Champion Series',
    game: 'Fortnite',
    meta: 'Single Elimination \u2022 4 Teams',
    teams: [
      { name: 'Zone Warriors', captain: 'Bugha_Clone', role: 'Builder' },
      { name: 'Storm Walkers', captain: 'Mongraal_Pace', role: 'Fragger' },
      { name: 'Victory Vipers', captain: 'Mero_Clutch', role: 'Support' },
      { name: 'Loot Titans', captain: 'TaySon_Grid', role: 'Anchor' },
    ],
    matches: [
      { matchId: 301, roundNumber: 1, matchNumberInRound: 1, teamAName: 'Zone Warriors', teamBName: 'Storm Walkers', scoreTeamA: 85, scoreTeamB: 62, winnerName: 'Zone Warriors', status: 'COMPLETED', time: '14:00 UTC' },
      { matchId: 302, roundNumber: 1, matchNumberInRound: 2, teamAName: 'Victory Vipers', teamBName: 'Loot Titans', scoreTeamA: null, scoreTeamB: null, winnerName: null, status: 'SCHEDULED', time: 'Today \u2022 15:30 UTC' },
      { matchId: 303, roundNumber: 2, matchNumberInRound: 1, teamAName: 'Zone Warriors', teamBName: 'TBD', scoreTeamA: null, scoreTeamB: null, winnerName: null, status: 'SCHEDULED', time: 'Today \u2022 18:00 UTC' },
    ],
  },
  '4': {
    id: 4,
    title: 'World Invitational',
    game: 'Rocket League',
    meta: 'Single Elimination \u2022 4 Teams',
    teams: [
      { name: 'Karmine Corp', captain: 'Vatira_Aerial', role: 'Striker' },
      { name: 'Gen.G Mobil1', captain: 'Chronic_Goal', role: 'Midfield' },
      { name: 'BDS Esports', captain: 'MonkeyMoon_Def', role: 'Goalkeeper' },
      { name: 'G2 Stride', captain: 'Atomic_Rot', role: 'Flex' },
    ],
    matches: [
      { matchId: 401, roundNumber: 1, matchNumberInRound: 1, teamAName: 'Karmine Corp', teamBName: 'Gen.G Mobil1', scoreTeamA: 4, scoreTeamB: 2, winnerName: 'Karmine Corp', status: 'COMPLETED', time: '13:00 UTC' },
      { matchId: 402, roundNumber: 1, matchNumberInRound: 2, teamAName: 'BDS Esports', teamBName: 'G2 Stride', scoreTeamA: 3, scoreTeamB: 1, winnerName: 'BDS Esports', status: 'COMPLETED', time: '14:00 UTC' },
      { matchId: 403, roundNumber: 2, matchNumberInRound: 1, teamAName: 'Karmine Corp', teamBName: 'BDS Esports', scoreTeamA: 4, scoreTeamB: 3, winnerName: 'Karmine Corp', status: 'COMPLETED', time: '16:00 UTC' },
    ],
  },
};

export const TOURNAMENT_OPTIONS = Object.values(TOURNAMENTS).map((t) => ({
  id: String(t.id),
  label: `${t.game}: ${t.title}`,
}));

const GAME_LABELS = {
  VALORANT: 'Valorant',
  CS2: 'CS2',
  GTA6: 'GTA 6',
  FORTNITE: 'Fortnite',
  Rainbow_Six_Siege: 'Rainbow Six Siege',
  CREW2: 'The Crew 2',
  ROCKET_LEAGUE: 'Rocket League',
  DOTA2: 'Dota 2',
};

export function gameLabel(gameType) {
  if (!gameType) return '';
  return GAME_LABELS[gameType] || String(gameType).replace(/_/g, ' ');
}

export function getLocalTournament(id) {
  return TOURNAMENTS[String(id)] || null;
}

/** Normalise a roster entry to a plain team name. */
function teamNameOf(team) {
  if (!team) return '';
  return typeof team === 'string' ? team : team.name;
}

/**
 * Build roster cards for a tournament.
 * `teamNames` (from the live API) wins; local metadata supplies captain/role.
 */
export function deriveRosters(teamNames, localTeams = []) {
  const metadata = new Map(localTeams.map((t) => [t.name, t]));
  const names = (teamNames && teamNames.length ? teamNames : localTeams.map(teamNameOf)).filter(Boolean);

  return names.map((name) => {
    const known = metadata.get(name);
    return (
      known || {
        name,
        captain: `${String(name).replace(/\s+/g, '')}_Cap`,
        role: 'Player',
      }
    );
  });
}

/** Win/loss table computed client-side from match history. */
export function calculateStandings(teams, matches) {
  const roster = (teams || []).map(teamNameOf).filter(Boolean);
  const safeMatches = Array.isArray(matches) ? matches : [];

  return roster
    .map((name) => {
      let played = 0;
      let won = 0;
      safeMatches.forEach((m) => {
        if (m.status === 'COMPLETED' && (m.teamAName === name || m.teamBName === name)) {
          played += 1;
          if (m.winnerName === name) won += 1;
        }
      });
      const winRate = played > 0 ? Math.round((won / played) * 100) : 0;
      return { teamName: name, matchesPlayed: played, matchesWon: won, winRatePercentage: winRate };
    })
    .sort((a, b) => b.matchesWon - a.matchesWon || b.winRatePercentage - a.winRatePercentage);
}

/** Human readable stage name derived from the round index. */
export function stageLabel(roundNumber, totalRounds) {
  if (totalRounds && roundNumber === totalRounds) return 'Grand Final';
  if (roundNumber === 1) return 'Semifinal';
  return `Round ${roundNumber}`;
}

/** Heuristic kick-off time when the API does not return a schedule. */
export function resolveMatchTime(match, localMatches = []) {
  if (match.time) return match.time;
  const twin = localMatches.find(
    (m) => m.roundNumber === match.roundNumber && m.matchNumberInRound === match.matchNumberInRound
  );
  if (twin && twin.time) return twin.time;
  return match.roundNumber === 1 ? '18:00 UTC' : '20:00 UTC';
}

/**
 * Client-side mirror of the backend promotion rule: the winner is written into
 * the downstream fixture. Used when the live API is unreachable so the demo
 * still demonstrates bracket progression.
 */
export function applyLocalAdvancement(matches, matchId, scoreA, scoreB) {
  const next = (matches || []).map((m) => ({ ...m }));
  const match = next.find((m) => m.matchId === matchId);
  if (!match) return next;

  match.scoreTeamA = scoreA;
  match.scoreTeamB = scoreB;
  match.winnerName = scoreA > scoreB ? match.teamAName : match.teamBName;
  match.status = 'COMPLETED';

  if (match.roundNumber === 1) {
    const finalMatch = next.find((m) => m.roundNumber === match.roundNumber + 1);
    if (finalMatch) {
      if (match.matchNumberInRound === 1) finalMatch.teamAName = match.winnerName;
      if (match.matchNumberInRound === 2) finalMatch.teamBName = match.winnerName;
    }
  }

  return next;
}

/** Reset a local bracket back to its scheduled state. */
export function resetLocalMatches(matches) {
  return (matches || []).map((m) => ({
    ...m,
    scoreTeamA: null,
    scoreTeamB: null,
    winnerName: null,
    status: 'SCHEDULED',
    teamAName: m.roundNumber === 1 ? m.teamAName : 'TBD',
    teamBName: m.roundNumber === 1 ? m.teamBName : 'TBD',
  }));
}

/** Determine the grand champion of a completed bracket. */
export function findChampion(matches) {
  const safeMatches = matches || [];
  if (!safeMatches.length) return null;
  const lastRound = Math.max(...safeMatches.map((m) => m.roundNumber || 0));
  const final = safeMatches.find((m) => m.roundNumber === lastRound);
  if (final && final.status === 'COMPLETED' && final.winnerName) return final.winnerName;
  return null;
}
