export default function Footer({ onNavigate, onOpenAuth, backendOnline }) {
  return (
    <footer className="border-t border-slate-800 bg-[#070b12] px-6 py-6 mt-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <span
            className={`w-2 h-2 rounded-full ${backendOnline ? 'bg-emerald-400' : 'bg-amber-400'}`}
            title={backendOnline ? 'Render backend reachable' : 'Using cached data'}
          />
          <span className="text-slate-300 font-semibold">
            ApexGrid Tournament Engine &bull; {backendOnline ? 'Live Engine Connected' : 'Offline Snapshot'}
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <button type="button" onClick={() => onNavigate('home')} className="hover:text-cyan-400 transition">
            Home
          </button>
          <button type="button" onClick={() => onNavigate('engine')} className="hover:text-cyan-400 transition">
            Tournaments
          </button>
          <button type="button" onClick={() => onNavigate('about')} className="hover:text-cyan-400 transition">
            About System
          </button>
          <button type="button" onClick={() => onOpenAuth('signup')} className="text-cyan-400 hover:underline">
            Create Account
          </button>
        </div>

        <div className="text-[11px] text-slate-500 font-mono">ApexGrid Engine &copy; 2026</div>
      </div>
    </footer>
  );
}
