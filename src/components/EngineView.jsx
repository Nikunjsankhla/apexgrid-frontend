import ChampionBanner from './ChampionBanner';
import TournamentControls from './TournamentControls';
import BracketView from './BracketView';
import Standings from './Standings';
import Rosters from './Rosters';

/**
 * Tournaments engine view: champion banner, header controls, live bracket,
 * standings leaderboard and registered rosters.
 */
export default function EngineView({
  tournaments,
  activeTournament,
  localMatches,
  matches,
  standings,
  rosters,
  filter,
  onFilterChange,
  onSelectTournament,
  onReset,
  onSync,
  syncing,
  onScoreSubmit,
  submittingMatchId,
  loading,
  error,
  notice,
  champion,
}) {
  return (
    <section className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
      <ChampionBanner champion={champion} onPlayAgain={onReset} />

      <TournamentControls
        tournaments={tournaments}
        activeTournament={activeTournament}
        onSelect={onSelectTournament}
        onReset={onReset}
        onSync={onSync}
        syncing={syncing}
      />

      {notice && (
        <div className="text-xs text-cyan-200 bg-cyan-950/40 border border-cyan-800/60 rounded-lg px-3 py-2 animate-fade-in">
          {notice}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <BracketView
          matches={matches}
          allMatches={matches}
          localMatches={localMatches}
          filter={filter}
          onFilterChange={onFilterChange}
          onScoreSubmit={onScoreSubmit}
          submittingMatchId={submittingMatchId}
          loading={loading}
          error={error}
        />

        <div className="space-y-6">
          <Standings standings={standings} />
          <Rosters teams={rosters} />
        </div>
      </div>
    </section>
  );
}
