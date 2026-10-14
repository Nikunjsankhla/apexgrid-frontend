const NAV_ITEMS = [
  { key: 'home', label: 'Home' },
  { key: 'engine', label: 'Tournaments' },
  { key: 'about', label: 'About' },
];

export default function Navbar({ view, onNavigate, user, onOpenAuth, onLogout }) {
  return (
    <header className="border-b border-slate-800 bg-[#0b1120]/80 backdrop-blur sticky top-0 z-50 px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center space-x-6">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <span className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center font-bold text-black heading-font text-xl">
            A
          </span>
          <span className="text-xl font-bold tracking-wider text-cyan-400 heading-font uppercase">
            ApexGrid Engine
          </span>
        </button>

        <nav className="hidden md:flex items-center space-x-4 text-xs font-semibold uppercase tracking-wider">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => onNavigate(item.key)}
              className={
                view === item.key
                  ? 'text-cyan-400 hover:text-white transition'
                  : 'text-slate-400 hover:text-white transition'
              }
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono px-3 py-1.5 rounded bg-slate-800 text-cyan-300 border border-slate-700 max-w-[180px] truncate">
              {user}
            </span>
            <button
              type="button"
              onClick={onLogout}
              className="text-xs px-2.5 py-1 text-rose-400 hover:text-rose-300 border border-rose-900 rounded transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => onOpenAuth('login')}
              className="text-xs uppercase font-semibold px-4 py-2 rounded border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-white transition"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => onOpenAuth('signup')}
              className="text-xs uppercase font-semibold px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-black transition"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
