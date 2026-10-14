/** Registered team rosters with captain + in-game role. */
export default function Rosters({ teams }) {
  const rosters = Array.isArray(teams) ? teams : [];

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold uppercase heading-font text-slate-200">Registered Rosters</h2>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {rosters.length ? (
          rosters.map((team) => (
            <div key={team.name} className="card-bg p-3 rounded border border-slate-800">
              <div className="font-bold text-cyan-400 truncate">{team.name}</div>
              <div className="text-[10px] text-slate-400 font-mono truncate">Captain: {team.captain}</div>
              <div className="text-[10px] text-slate-500 font-mono truncate">Role: {team.role}</div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-xs text-slate-500 py-4 text-center">No rosters registered.</div>
        )}
      </div>
    </div>
  );
}
