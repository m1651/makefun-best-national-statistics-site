// Router and controls: hash routes, chart wiring, state search and sorting.
// Imports the views and the canvas chart renderer; no network calls.
import { ROUTES, navHtml, stateRows } from './views.js';
import { SERIES, STATES, YEARS } from './data.js';
import { drawChart } from './charts.js';

const app = document.getElementById('app');

function seriesPoints(key, fromYear) {
  const s = SERIES[key];
  return YEARS.map((y, i) => ({ year: y, v: s.values[i] })).filter((p) => p.year >= fromYear);
}

function drawAll() {
  document.querySelectorAll('canvas.chart').forEach((c) => {
    const key = c.dataset.series;
    const id = c.id;
    const typeSel = document.getElementById(id + '-type');
    const fromSel = document.getElementById(id + '-from');
    const type = typeSel ? typeSel.value : 'line';
    const from = fromSel ? Number(fromSel.value) : 2015;
    drawChart(c, seriesPoints(key, from), { type, unit: SERIES[key].unit, title: SERIES[key].label });
  });
}

function wireCharts() {
  document.querySelectorAll('select[data-chart]').forEach((sel) => {
    sel.addEventListener('change', drawAll);
  });
  const metric = document.getElementById('econ-metric');
  if (metric) {
    metric.addEventListener('change', () => {
      const c = document.getElementById('c-econ');
      c.dataset.series = metric.value;
      drawChart(c, seriesPoints(metric.value, 2015), { type: 'line', unit: SERIES[metric.value].unit, title: SERIES[metric.value].label });
    });
  }
}

function wireStates() {
  const q = document.getElementById('state-q');
  const sort = document.getElementById('state-sort');
  const list = document.getElementById('state-list');
  if (!q || !sort || !list) return;
  function apply() {
    const term = q.value.trim().toLowerCase();
    let rows = STATES.filter((s) => s.name.toLowerCase().includes(term));
    if (sort.value === 'name') rows = [...rows].sort((a, b) => a.name.localeCompare(b.name));
    else if (sort.value === 'growth') rows = [...rows].sort((a, b) => parseFloat(b.growth) - parseFloat(a.growth));
    else rows = [...rows].sort((a, b) => b.pop - a.pop);
    list.innerHTML = rows.length ? stateRows(rows)
      : '<p class="empty">No state matches “' + q.value.replace(/</g, '&lt;') + '”. Try another name.</p>';
  }
  q.addEventListener('input', apply);
  sort.addEventListener('change', apply);
  apply();
}

function route() {
  const hash = location.hash || '#/';
  const path = hash.slice(1).split('?')[0] || '/';
  const render = ROUTES[path] || ROUTES['/'];
  const active = ROUTES[path] ? '#' + path : '#/';
  app.innerHTML = navHtml(active) + render();
  document.title = 'United States in Numbers — ' + (path === '/' ? 'Overview' : path.slice(1).replace(/^\w/, (c) => c.toUpperCase()));
  wireCharts();
  wireStates();
  drawAll();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
window.addEventListener('resize', () => { drawAll(); });
route();
