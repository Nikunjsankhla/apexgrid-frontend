/** Standings leaderboard computed from completed match history. */
export default function Standings({ standings }) {
  const rows = Array.isArray(standings) ? standings : [];

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold uppercase heading-font text-slate-200">Standings Leaderboard</h2>
      <div className="card-bg rounded-lg overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="p-3">Team</th>
              <th className="p-3 text-center">P</th>
              <th className="p-3 text-center">W</th>
              <th className="p-3 text-right">Win%</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            {rows.length ? (
              rows.map((standing) => (
                <tr key={standing.teamName} className="hover:bg-slate-800/30">
                  <td className="p-3 font-semibold text-slate-200">{standing.teamName}</td>
                  <td className="p-3 text-center text-slate-400">{standing.matchesPlayed}</td>
                  <td className="p-3 text-center text-emerald-400">{standing.matchesWon}</td>
                  <td className="p-3 text-right text-cyan-400">{Math.round(standing.winRatePercentage)}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-slate-500">
                  No standings yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
