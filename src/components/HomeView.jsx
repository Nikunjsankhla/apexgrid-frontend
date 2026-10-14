const FEATURES = [
  {
    title: 'Deterministic Progression',
    body: 'Winners automatically advance into downstream fixture nodes with immutable record tracking.',
  },
  {
    title: 'Validation Guards',
    body: 'Negative score prohibition and draw prevention baked directly into the backend engine service layer.',
  },
  {
    title: 'Live Standings Calculation',
    body: 'Real-time win percentages and played match statistics computed directly from match history.',
  },
];

export default function HomeView({ onNavigate }) {
  return (
    <section className="flex-1 max-w-6xl w-full mx-auto p-6 flex flex-col justify-center items-center text-center space-y-8 my-auto">
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-400 text-xs">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>ApexGrid Engine 1.0 &bull; Live Tournament Orchestrator</span>
      </div>

      <h1 className="text-4xl md:text-6xl font-extrabold heading-font uppercase tracking-wider text-white max-w-3xl leading-tight">
        Orchestrate Esports Brackets With <span className="text-cyan-400">Zero Latency</span>
      </h1>

      <p className="text-slate-400 text-sm md:text-base max-w-xl">
        Automated single-elimination bracket generation, real-time score verification, strict draw guards,
        and dynamic standing leaderboards.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <button
          type="button"
          onClick={() => onNavigate('engine')}
          className="px-6 py-3 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase text-xs tracking-wider transition"
        >
          Launch Tournament Grid
        </button>
        <button
          type="button"
          onClick={() => onNavigate('about')}
          className="px-6 py-3 rounded card-bg border border-slate-700 hover:border-slate-500 text-white font-bold uppercase text-xs tracking-wider transition"
        >
          Read Architecture
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-left pt-10">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="card-bg p-5 rounded-lg space-y-2">
            <h3 className="font-bold text-cyan-400 text-sm heading-font uppercase">{feature.title}</h3>
            <p className="text-xs text-slate-400">{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
