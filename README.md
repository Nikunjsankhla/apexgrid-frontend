# ApexGrid Tournament Engine — Frontend

A production-ready **React 18 + Vite + Tailwind CSS** single page application for the
ApexGrid esports tournament engine. It consumes the live Spring Boot backend on Render
and is configured for zero-config deployment on **Netlify** (and Docker).

## Live services

| Layer     | Technology                  | URL                                                        |
| --------- | --------------------------- | ---------------------------------------------------------- |
| Frontend  | React + Vite + Tailwind     | Netlify (`*.netlify.app`)                                  |
| Backend   | Java 17 · Spring Boot · Maven | https://apexgrid-backend-ejej.onrender.com                |
| Database  | MySQL 8.4 (Aiven Cloud)     | `mysql-162e3cb2-...aivencloud.com:19294`                   |

## Features

- **Dark slate/cyan esports UI** — faithful port of the original static page.
- **Live bracket** — reads `GET /api/brackets/tournaments/{id}/matches` and renders semifinal/final cards.
- **Score submission** — `PUT /api/brackets/matches/{id}/score` with draw + negative guards and a `Submitting…` state; re-fetches so the winner advances automatically.
- **Standings leaderboard** — `GET /api/brackets/tournaments/{id}/standings`.
- **Tournament selector, Reset Scores, Sync Live API, All/Upcoming/Finished filters, champion banner.**
- **Auth** — login / registration modal with password confirmation, persisted through a crash-safe storage wrapper.
- **Graceful degradation** — if the API/CORS is unavailable the app falls back to a same-origin proxy and then to a bundled snapshot.

## Project structure

```
src/
├── api/bracketApi.js         # fetch wrapper -> Render (with proxy fallback)
├── components/
│   ├── Navbar.jsx            # logo, nav, auth badge / logout
│   ├── AuthModal.jsx         # login + registration
│   ├── TournamentControls.jsx# selector, Reset Scores, Sync Live API
│   ├── BracketFilter.jsx     # All / Upcoming / Finished pills
│   ├── MatchCard.jsx         # stage, time, status, scores, submit
│   ├── BracketView.jsx       # filtered bracket list
│   ├── EngineView.jsx        # tournaments view container
│   ├── Standings.jsx         # leaderboard
│   ├── Rosters.jsx           # registered rosters
│   ├── ChampionBanner.jsx    # concluded-tournament banner
│   ├── HomeView.jsx
│   ├── AboutView.jsx
│   └── Footer.jsx
├── data/tournamentCatalog.js # local snapshot + pure helpers
├── utils/safeStorage.js      # try/catch localStorage with memory fallback
├── App.jsx                   # state + data orchestration
├── main.jsx
└── index.css
```

## Environment variables

Copy `.env.example` to `.env` if you need to override defaults.

| Variable             | Default                                         | Purpose                                              |
| -------------------- | ----------------------------------------------- | ---------------------------------------------------- |
| `VITE_API_BASE_URL`  | `https://apexgrid-backend-ejej.onrender.com`    | Backend base URL (direct calls).                     |
| `VITE_PROXY_API_BASE`| `` (same origin)                                | Fallback prefix used when a direct call is blocked.  |

## Local development

```bash
npm install
npm run dev        # http://localhost:5173 (proxies /api -> Render)
npm run build      # production bundle in dist/
npm run preview    # serve the build on http://localhost:4173
```

## Deployment

### Netlify

`netlify.toml` already declares the build command (`npm run build`), the publish
directory (`dist`) and the SPA + `/api/*` proxy redirects. Import the repository at
[app.netlify.com](https://app.netlify.com) and click **Deploy** — no further config.

### Docker

```bash
docker build -t apexgrid-frontend .
docker run -p 8081:80 apexgrid-frontend
```

The image builds the SPA and serves it with nginx (SPA fallback + `/api` proxy).
