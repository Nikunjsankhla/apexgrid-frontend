/** Trophy banner shown once the grand final produces a champion. */
export default function ChampionBanner({ champion, onPlayAgain }) {
  if (!champion) return null;

  return (
    <div className="card-bg glow-gold p-4 rounded-lg bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="text-2xl">&#127942;</div>
        <div>
          <div className="text-xs uppercase font-bold text-amber-400 tracking-wider">Tournament Concluded</div>
          <div className="text-lg font-bold text-white">
            <span className="text-amber-300">{champion}</span> is the Grand Champion!
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onPlayAgain}
        className="text-xs px-3 py-1.5 rounded border border-amber-500/50 hover:bg-amber-500/10 text-amber-300 transition"
      >
        Play Again
      </button>
    </div>
  );
}
