/**
 * Tournament header: title, game meta, tournament selector, reset & sync actions.
 */
export default function TournamentControls({
  tournaments,
  activeTournament,
  onSelect,
  onReset,
  onSync,
  syncing,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold heading-font uppercase tracking-wide text-white">
          {activeTournament?.title || 'Apex Masters 2026'}
        </h1>
        <p className="text-xs text-slate-400">
          Game: <span className="text-cyan-400 font-semibold">{activeTournament?.game || 'Valorant'}</span>{' '}
          &bull; <span>{activeTournament?.meta || 'Single Elimination \u2022 4 Teams'}</span>
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          aria-label="Select tournament"
          value={String(activeTournament?.id ?? '1')}
          onChange={(event) => onSelect(event.target.value)}
          className="text-xs card-bg border border-slate-700 text-cyan-300 rounded px-3 py-1.5 focus:outline-none focus:border-cyan-400 font-semibold cursor-pointer"
        >
          {tournaments.map((tournament) => (
            <option key={tournament.id} value={String(tournament.id)}>
              {tournament.optionLabel || `${tournament.game}: ${tournament.title}`}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold px-4 py-2 rounded card-bg hover:border-amber-500 text-amber-400 transition"
        >
          Reset Scores
        </button>
        <button
          type="button"
          onClick={onSync}
          disabled={syncing}
          className="text-xs font-semibold px-4 py-2 rounded card-bg hover:border-cyan-500 text-cyan-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {syncing ? 'Syncing\u2026' : 'Sync Live API'}
        </button>
      </div>
    </div>
  );
}
