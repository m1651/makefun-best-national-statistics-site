// Page views: one render function per section. Every view is plain HTML
// built from data.js, with real figures and a source line under each block.
import { COUNTRY, HEADLINE, YEARS, SERIES, PEOPLE, HEALTH, EDUCATION, TRADE, STATES, SOURCES, NAV } from './data.js';
import { drawChart, fmtPop } from './charts.js';

export function navHtml(active) {
  return '<nav class="tabs" aria-label="Sections">' + NAV.map((n) =>
    `<a href="${n.hash}" class="${n.hash === active ? 'on' : ''}">${n.label}</a>`).join('') + '</nav>';
}

function srcLine(source) { return `<p class="src">Source: ${source}</p>`; }
function card(f) {
  return `<article class="card"><p class="k">${f.label}</p><p class="v">${f.value}</p>` +
    `<p class="m">${f.year ? f.year : ''}${f.change ? ' · ' + f.change : ''}</p>` +
    (f.note ? `<p class="n">${f.note}</p>` : '') + srcLine(f.source) + '</article>';
}
function sectionHead(title, intro) {
  return `<h1>${title}</h1><p class="lede">${intro}</p>`;
}
function chartBlock(id, title, seriesKey, note) {
  return `<section class="panel"><div class="panel-head"><h2>${title}</h2>` +
    `<div class="ctl"><label>Chart <select id="${id}-type" data-chart="${id}"><option value="line">Line</option><option value="bar">Bars</option></select></label>` +
    `<label>From <select id="${id}-from" data-chart="${id}">${YEARS.slice(0, 7).map((y) => `<option value="${y}">${y}</option>`).join('')}</select></label></div></div>` +
    `<canvas id="${id}" class="chart" data-series="${seriesKey}" height="260"></canvas>` +
    `<p class="src">Source: ${SERIES[seriesKey].source} · ${note || 'Figures are annual.'}</p></section>`;
}

export function renderOverview() {
  return sectionHead('United States in numbers',
    `The United States is the world's largest economy and its third most populous country. ` +
    `Capital ${COUNTRY.capital}; land area ${COUNTRY.areaKm2} km². Every figure below carries its year and source.`) +
    '<div class="grid">' + HEADLINE.map(card).join('') + '</div>' +
    chartBlock('c-gdp', 'GDP, 2015–2025', 'gdp', 'Current US dollars. ') +
    '<section class="panel"><h2>At a glance</h2><ul class="facts">' +
    '<li><strong>3rd</strong> most populous country in the world (341.8m, 2025, World Bank WDI).</li>' +
    '<li><strong>1st</strong> largest economy by GDP ($30.77 trillion, 2025, World Bank WDI).</li>' +
    '<li><strong>78.4 years</strong> life expectancy at birth (2023, CDC/NCHS).</li>' +
    '<li><strong>0.938</strong> Human Development Index (2023, UNDP) — very high human development.</li></ul>' +
    srcLine('World Bank WDI; CDC/NCHS; UNDP') + '</section>' +
    '<p class="next">Explore: <a href="#/economy">Economy</a> · <a href="#/people">People</a> · <a href="#/health">Health</a> · <a href="#/states">States</a></p>';
}

export function renderEconomy() {
  return sectionHead('Economy',
    'GDP reached $30.77 trillion in 2025, growing 2.2% in real terms. The charts below use World Bank WDI annual figures; pick a metric and a start year.') +
    '<div class="grid">' + HEADLINE.slice(1, 3).map(card).join('') +
    card({ label: 'Real GDP growth', value: '+2.2%', year: 2025, change: 'after +2.8% in 2024', source: 'World Bank WDI' }) + '</div>' +
    `<section class="panel"><div class="panel-head"><h2>Pick a series</h2><div class="ctl"><label>Indicator <select id="econ-metric">` +
    Object.entries(SERIES).map(([k, s]) => `<option value="${k}">${s.label}</option>`).join('') +
    `</select></label></div></div><canvas id="c-econ" class="chart" data-series="gdp" height="260"></canvas>` +
    srcLine('World Bank WDI') + '</section>' +
    chartBlock('c-pop', 'Population, 2015–2025', 'population', '') +
    '<section class="panel"><h2>GDP by year</h2><table class="tbl"><thead><tr><th>Year</th><th>GDP ($ trillion)</th><th>GDP per person</th></tr></thead><tbody>' +
    YEARS.map((y, i) => `<tr><td>${y}</td><td>$${SERIES.gdp.values[i].toFixed(2)}</td><td>$${SERIES.gdpPerCapita.values[i].toLocaleString('en-US')}</td></tr>`).join('') +
    '</tbody></table>' + srcLine('World Bank WDI') + '</section>';
}

export function renderPeople() {
  return sectionHead('People',
    '341.8 million people in 2025, growing about 0.5% a year. The population is ageing: 18.4% are 65 or older, and the median age is 38.9.') +
    '<div class="grid">' + PEOPLE.map(card).join('') + '</div>' +
    chartBlock('c-pop2', 'Population, 2015–2025', 'population', '') +
    '<section class="panel"><h2>How the population is changing</h2><p>The Census Bureau\'s Vintage 2024 estimates put growth between 2023 and 2024 at nearly 1.0% — the fastest in decades — driven mainly by net international migration. The fertility rate, 1.63 births per woman in 2024, is below the replacement level of about 2.1.</p>' + srcLine('U.S. Census Bureau, Dec 2024 release; World Bank WDI') + '</section>';
}

export function renderHealth() {
  return sectionHead('Health',
    'Life expectancy rebounded to 78.4 years in 2023, up 0.9 year on 2022, after the pandemic fall. The United States spends more per person on health than any other country.') +
    '<div class="grid">' + HEALTH.map(card).join('') + '</div>' +
    '<section class="panel"><h2>Life expectancy, men and women</h2><table class="tbl"><thead><tr><th>Group</th><th>At birth (2023)</th><th>At age 65 (2023)</th></tr></thead><tbody>' +
    '<tr><td>Both sexes</td><td>78.4 years</td><td>19.5 years</td></tr>' +
    '<tr><td>Men</td><td>75.8 years</td><td>18.2 years</td></tr>' +
    '<tr><td>Women</td><td>81.1 years</td><td>20.7 years</td></tr></tbody></table>' +
    srcLine('CDC / NCHS Data Brief No. 521, December 2024') + '</section>';
}

export function renderEducation() {
  return sectionHead('Education',
    'Nearly every child finishes primary school, and four in five young people enrol in tertiary education. Public spending on education was 5.4% of GDP in 2022.') +
    '<div class="grid">' + EDUCATION.map(card).join('') + '</div>' +
    '<section class="panel"><h2>Completion rates</h2><p>Primary completion 99.6% (2024), lower secondary 98.7% (2024), upper secondary 92.4% (2024). Tertiary enrolment, gross, was 79.4% in 2022 — the share of the tertiary-age population enrolled, which can exceed 100% in theory but here sits below it.</p>' + srcLine('World Bank WDI') + '</section>';
}

export function renderWork() {
  return sectionHead('Work & prices',
    'Unemployment averaged 4.2% of the labour force in 2025. Consumer price inflation peaked at 8.0% in 2022 and eased to 2.9% in 2024.') +
    chartBlock('c-unemp', 'Unemployment rate, 2015–2025', 'unemployment', 'ILO modelled estimate. ') +
    chartBlock('c-infl', 'Consumer price inflation, 2015–2024', 'inflation', '2025 not yet published. ') +
    '<section class="panel"><h2>Unemployment and inflation by year</h2><table class="tbl"><thead><tr><th>Year</th><th>Unemployment</th><th>Inflation (CPI)</th></tr></thead><tbody>' +
    YEARS.map((y, i) => `<tr><td>${y}</td><td>${SERIES.unemployment.values[i].toFixed(1)}%</td><td>${SERIES.inflation.values[i] === null ? '—' : SERIES.inflation.values[i].toFixed(1) + '%'}</td></tr>`).join('') +
    '</tbody></table>' + srcLine('World Bank WDI; BLS CPI-U annual averages') + '</section>';
}

export function renderTrade() {
  return sectionHead('Trade',
    'The United States exported $3,215 billion of goods and services in 2024 and imported $4,114 billion — a deficit of about $898 billion. Exports were 11.0% of GDP.') +
    '<div class="grid">' + TRADE.map(card).join('') + '</div>' +
    '<section class="panel"><h2>Reading the balance</h2><p>A trade deficit means the country buys more goods and services from abroad than it sells. The deficit here is the simple difference of the two WDI totals above; it is not a judgement — the same year, the United States remained the world\'s largest economy by a wide margin.</p>' + srcLine('World Bank WDI, 2024') + '</section>';
}

export function renderStates() {
  return sectionHead('States',
    'The ten most populous states hold more than half of all Americans. Figures are the Census Bureau\'s Vintage 2024 estimates for 1 July 2024.') +
    `<section class="panel"><div class="panel-head"><h2>Top 10 states by population</h2><div class="ctl"><label>Search <input id="state-q" type="search" placeholder="Type a state name" aria-label="Search states"></label><label>Sort <select id="state-sort"><option value="pop">Largest first</option><option value="name">A–Z</option><option value="growth">Fastest growing</option></select></label></div></div>` +
    '<div id="state-list"></div>' + srcLine('U.S. Census Bureau, Vintage 2024 Population Estimates') + '</section>';
}

export function stateRows(list) {
  const max = Math.max(...STATES.map((s) => s.pop));
  return '<ol class="states">' + list.map((s, i) =>
    `<li><span class="rank">${i + 1}</span><span class="sname">${s.name}</span>` +
    `<span class="bar"><span style="width:${Math.round((s.pop / max) * 100)}%"></span></span>` +
    `<span class="spop">${fmtPop(s.pop)}</span><span class="sgrow">${s.growth} in 2023–24</span></li>`).join('') + '</ol>';
}

export function renderSources() {
  return sectionHead('Sources & methods',
    'Every figure on this site comes from a public source listed below, with the year it describes shown next to it. Figures are reproduced as published; the trade balance is the only derived figure, and it is labelled as such. This page was compiled 28 November 2026.') +
    '<section class="panel"><h2>Sources</h2><dl class="sources">' +
    SOURCES.map((s) => `<dt>${s.name}</dt><dd>${s.what} <span class="src-inline">${s.link}</span></dd>`).join('') +
    '</dl></section>' +
    '<section class="panel"><h2>Methods & limits</h2><ul class="facts">' +
    '<li>Annual series run 2015–2025; a missing year is shown as “—”, never filled in.</li>' +
    '<li>Unemployment uses the ILO modelled estimate published in WDI, which differs slightly from the BLS headline annual average in some years.</li>' +
    '<li>State populations are Census Bureau estimates for 1 July 2024, not the 2020 census count.</li>' +
    '<li>Figures are rounded for display; underlying values are in data.js.</li></ul></section>';
}

export const ROUTES = {
  '/': renderOverview, '/economy': renderEconomy, '/people': renderPeople,
  '/health': renderHealth, '/education': renderEducation, '/work': renderWork,
  '/trade': renderTrade, '/states': renderStates, '/sources': renderSources,
};
