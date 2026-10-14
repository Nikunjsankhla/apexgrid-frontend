import { useEffect, useState } from 'react';

/**
 * A single knockout fixture.
 * Shows the stage, match number, kick-off time, status badge, both teams with
 * their scores, and (when the match is resolvable) score inputs + submit action.
 */
export default function MatchCard({ match, stage, time, submitting, onSubmit }) {
  const [scoreA, setScoreA] = useState('');
  const [scoreB, setScoreB] = useState('');

  // Keep the inputs in sync when the live bracket refreshes.
  useEffect(() => {
    setScoreA(match.scoreTeamA ?? '');
    setScoreB(match.scoreTeamB ?? '');
  }, [match.matchId, match.scoreTeamA, match.scoreTeamB]);

  const completed = match.status === 'COMPLETED';
  const teamA = match.teamAName || 'TBD';
  const teamB = match.teamBName || 'TBD';
  const canSubmit = !completed && teamA !== 'TBD' && teamB !== 'TBD';

  const winnerA = match.winnerName && match.winnerName === teamA;
  const winnerB = match.winnerName && match.winnerName === teamB;

  const handleSubmit = () => {
    onSubmit(match.matchId, scoreA, scoreB);
  };

  return (
    <div className="card-bg p-4 rounded-lg space-y-3">
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-cyan-400">
            {stage} &bull; Match #{match.matchNumberInRound}
          </span>
          <span className="text-[11px] text-slate-500 font-mono">({time || 'TBD'})</span>
        </div>
        <span
          className={
            completed
              ? 'px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800'
              : 'px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300'
          }
        >
          {match.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div
          className={`p-2.5 rounded bg-slate-900/60 border flex justify-between items-center ${
            winnerA ? 'border-emerald-500 text-emerald-400 font-bold' : 'border-slate-800'
          }`}
        >
          <span className="font-semibold truncate">{teamA}</span>
          <span className="font-mono font-bold">{match.scoreTeamA ?? '-'}</span>
        </div>
        <div
          className={`p-2.5 rounded bg-slate-900/60 border flex justify-between items-center ${
            winnerB ? 'border-emerald-500 text-emerald-400 font-bold' : 'border-slate-800'
          }`}
        >
          <span className="font-semibold truncate">{teamB}</span>
          <span className="font-mono font-bold">{match.scoreTeamB ?? '-'}</span>
        </div>
      </div>

      {canSubmit && (
        <div className="pt-2 flex items-center justify-end space-x-2 border-t border-slate-800/80">
          <input
            type="number"
            min="0"
            inputMode="numeric"
            aria-label={`${teamA} score`}
            value={scoreA}
            onChange={(event) => setScoreA(event.target.value)}
            placeholder="0"
            className="w-14 text-center text-xs py-1 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
          />
          <span className="text-xs text-slate-500">:</span>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            aria-label={`${teamB} score`}
            value={scoreB}
            onChange={(event) => setScoreB(event.target.value)}
            placeholder="0"
            className="w-14 text-center text-xs py-1 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="text-xs px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting\u2026' : 'Submit Score'}
          </button>
        </div>
      )}
    </div>
  );
}
