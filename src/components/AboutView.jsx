import { API_BASE } from '../api/bracketApi';

export default function AboutView({ onNavigate }) {
  const swaggerUrl = `${API_BASE.replace(/\/+$/, '')}/swagger-ui/index.html`;

  return (
    <section className="flex-1 max-w-5xl w-full mx-auto p-6 space-y-6 my-auto">
      <div className="space-y-2 border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-bold heading-font uppercase text-white">About ApexGrid Engine</h1>
        <p className="text-xs text-slate-400">Architectural blueprint and tournament validation specifications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
        <div className="card-bg p-5 rounded-lg space-y-3">
          <h3 className="text-cyan-400 font-bold heading-font text-sm uppercase">1. System Architecture</h3>
          <p>
            Built with Java 17 and Spring Boot on the backend, interacting directly with MySQL 8.0 over Spring
            Data JPA. This React + Vite single page application consumes the REST engine deployed on Render.
          </p>
          <p>
            Interactive endpoints and schema contracts are documented via OpenAPI 3.1 &amp; Swagger UI at{' '}
            <a
              href={swaggerUrl}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 underline font-mono break-all"
            >
              {swaggerUrl}
            </a>
            .
          </p>
        </div>

        <div className="card-bg p-5 rounded-lg space-y-3">
          <h3 className="text-cyan-400 font-bold heading-font text-sm uppercase">2. Core Match Invariants</h3>
          <ul className="list-disc pl-4 space-y-1 text-slate-400">
            <li>
              <strong>Draw Prevention:</strong> Single-elimination formats require an outright winner; tie
              submissions are rejected.
            </li>
            <li>
              <strong>Non-Negative Guards:</strong> Negative integers are rejected before reaching database
              persistence.
            </li>
            <li>
              <strong>Deterministic Advancement:</strong> Advancing rounds update both upstream winners and
              downstream brackets.
            </li>
          </ul>
        </div>

        <div className="card-bg p-5 rounded-lg space-y-3">
          <h3 className="text-cyan-400 font-bold heading-font text-sm uppercase">3. Relational Schema</h3>
          <p>
            Uses four normalized entity tables: <code className="text-cyan-300">tournaments</code>,{' '}
            <code className="text-cyan-300">teams</code>, <code className="text-cyan-300">players</code>, and{' '}
            <code className="text-cyan-300">matches</code> (<code className="text-cyan-300">MatchFixture</code>).
          </p>
        </div>

        <div className="card-bg p-5 rounded-lg space-y-3">
          <h3 className="text-cyan-400 font-bold heading-font text-sm uppercase">4. Getting Started</h3>
          <p>
            Select any game tournament using the dropdown in the Tournaments view, register an account, and
            enter match scores to observe live winner progression and standings updates.
          </p>
        </div>
      </div>

      <div className="pt-4 flex justify-center">
        <button
          type="button"
          onClick={() => onNavigate('engine')}
          className="px-6 py-2.5 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase text-xs tracking-wider transition"
        >
          Enter Tournament Grid
        </button>
      </div>
    </section>
  );
}
