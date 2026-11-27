# United States in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/m1651/makefun-best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/m1651/makefun-best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

An original national statistics site for the United States, built for the [make.fun bounty](https://make.fun/bounty/best-national-statistics-site-20261126-0539). It runs entirely offline from static files — no network request, no account, no tracking.

## What it shows

- **Overview** — headline figures: population 341.8m (2025), GDP $30.77 trillion (2025), GDP per person $90,027, unemployment 4.2%, inflation 2.9% (2024), life expectancy 78.4 years (2023).
- **Economy** — GDP, population and GDP-per-person series 2015–2025 with a metric picker and a year-by-year table.
- **People** — median age, age structure, fertility, urban share, electricity access.
- **Health** — life expectancy by sex, infant and under-5 mortality, health spending, Human Development Index.
- **Education** — spending, enrolment and completion rates.
- **Work & prices** — unemployment and CPI inflation charts and tables, 2015–2025.
- **Trade** — exports, imports and the derived trade balance for 2024.
- **States** — the ten most populous states (Census Bureau Vintage 2024 estimates) with search and sorting.
- **Sources** — every figure's source and year, plus methods and limits.

Every figure carries its source and the year it describes. Sources: World Bank World Development Indicators, U.S. Census Bureau, U.S. Bureau of Labor Statistics, CDC/NCHS, UNDP.

## How it works

`app/` is plain static files with no build step: `index.html`, `style.css`, and small ES modules — `data.js` (figures and sources), `charts.js` (canvas charts drawn by the site's own code), `views.js` (one render function per section), `main.js` (hash router and controls). Open `app/index.html` in a browser, or serve the folder with any static server. Charts are drawn on canvas; every navigation link, filter, year selector and chart toggle works.

## Hand-in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to `/output` (or `$MAKEFUN_OUTPUT_DIR`) and writes `output/dossier.json` with `buildDossier` from `vendor/makefun-frontend.ts` (the kit's copy, unchanged).

## License

MIT — see [LICENSE](LICENSE).

Made for the make.fun bounty — [enter or follow it here](https://make.fun/bounty/best-national-statistics-site-20261126-0539?ref=mee18qb6).
