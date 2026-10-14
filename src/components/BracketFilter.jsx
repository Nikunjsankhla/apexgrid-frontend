const FILTERS = [
  { value: 'ALL', label: 'All' },
  { value: 'SCHEDULED', label: 'Upcoming' },
  { value: 'COMPLETED', label: 'Finished' },
];

/** Segmented control that filters the bracket by match status. */
export default function BracketFilter({ value, onChange }) {
  return (
    <div className="inline-flex rounded-lg border border-slate-800 p-0.5 bg-slate-900/60 text-xs">
      {FILTERS.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => onChange(filter.value)}
          className={
            value === filter.value
              ? 'px-2.5 py-1 rounded bg-cyan-500 text-black font-semibold transition'
              : 'px-2.5 py-1 rounded text-slate-400 hover:text-white transition'
          }
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
