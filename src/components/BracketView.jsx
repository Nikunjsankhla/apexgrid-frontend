import MatchCard from './MatchCard';
import BracketFilter from './BracketFilter';
import { resolveMatchTime, stageLabel } from '../data/tournamentCatalog';

/**
 * Renders the filtered knockout bracket plus the status filter control.
 */
export default function BracketView({
  matches,
  allMatches,
  localMatches,
  filter,
  onFilterChange,
  onScoreSubmit,
  submittingMatchId,
  loading,
  error,
}) {
  const safeMatches = Array.isArray(matches) ? matches : [];
  const totalRounds = safeMatches.length
    ? Math.max(...safeMatches.map((m) => m.roundNumber || 1))
    : 1;

  const filtered = safeMatches.filter((m) => filter === 'ALL' || m.status === filter);

  const completedCount = safeMatches.filter((m) => m.status === 'COMPLETED').length;

  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h2 className="text-lg font-bold uppercase heading-font text-slate-200">Knockout Brackets</h2>
        <BracketFilter value={filter} onChange={onFilterChange} />
      </div>

      {error && (
        <div className="text-xs text-amber-300 bg-amber-950/30 border border-amber-800/60 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono uppercase tracking-wider">
        <span>{allMatches.length} fixtures</span>
        <span>{completedCount} completed</span>
      </div>

      {loading ? (
        <div className="text-xs text-slate-500 py-6 text-center card-bg rounded-lg animate-pulse">
          Loading live bracket&hellip;
        </div>
      ) : filtered.length ? (
        <div className="space-y-4">
          {filtered.map((match) => (
            <MatchCard
              key={match.matchId}
              match={match}
              stage={stageLabel(match.roundNumber, totalRounds)}
              time={resolveMatchTime(match, localMatches)}
              submitting={submittingMatchId === match.matchId}
              onSubmit={onScoreSubmit}
            />
          ))}
        </div>
      ) : (
        <div className="text-xs text-slate-500 py-6 text-center card-bg rounded-lg">
          No matches match current filter.
        </div>
      )}
    </div>
  );
}
