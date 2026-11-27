// Canvas charts drawn by this site's own code. No library, no network.
// drawChart(canvas, series, opts) renders a line or bar chart with axes,
// gridlines, value labels and a highlighted latest point.
export function drawChart(canvas, points, opts) {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth || 640;
  const h = canvas.clientHeight || 260;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, w, h);
  const padL = 52, padR = 14, padT = 14, padB = 30;
  const iw = w - padL - padR, ih = h - padT - padB;
  const vals = points.map((p) => p.v).filter((v) => v !== null && v !== undefined);
  let min = Math.min(...vals), max = Math.max(...vals);
  if (max === min) { max += 1; min -= 1; }
  const span = max - min;
  min -= span * 0.08; max += span * 0.08;
  const x = (i) => padL + (iw * i) / (points.length - 1);
  const y = (v) => padT + ih - ((v - min) / (max - min)) * ih;
  ctx.font = '12px system-ui, sans-serif';
  ctx.fillStyle = '#5b6472';
  ctx.strokeStyle = '#e3e7ec';
  ctx.lineWidth = 1;
  for (let g = 0; g <= 4; g++) {
    const v = min + ((max - min) * g) / 4;
    const gy = y(v);
    ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(w - padR, gy); ctx.stroke();
    ctx.textAlign = 'right';
    ctx.fillText(fmtAxis(v, opts.unit), padL - 8, gy + 4);
  }
  ctx.textAlign = 'center';
  points.forEach((p, i) => {
    if (i % 2 === 0 || i === points.length - 1) ctx.fillText(String(p.year), x(i), h - 10);
  });
  if (opts.type === 'bar') {
    const bw = Math.min(34, (iw / points.length) * 0.62);
    points.forEach((p, i) => {
      if (p.v === null || p.v === undefined) return;
      ctx.fillStyle = i === points.length - 1 ? '#0b5cad' : '#7fb3e0';
      const top = y(p.v), base = y(min);
      ctx.fillRect(x(i) - bw / 2, top, bw, Math.max(1, base - top));
    });
  } else {
    ctx.strokeStyle = '#0b5cad';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    let started = false;
    points.forEach((p, i) => {
      if (p.v === null || p.v === undefined) return;
      if (!started) { ctx.moveTo(x(i), y(p.v)); started = true; } else ctx.lineTo(x(i), y(p.v));
    });
    ctx.stroke();
    points.forEach((p, i) => {
      if (p.v === null || p.v === undefined) return;
      ctx.fillStyle = '#0b5cad';
      ctx.beginPath(); ctx.arc(x(i), y(p.v), i === points.length - 1 ? 5 : 3, 0, Math.PI * 2); ctx.fill();
    });
  }
  const last = [...points].reverse().find((p) => p.v !== null && p.v !== undefined);
  if (last) {
    const li = points.indexOf(last);
    ctx.fillStyle = '#0b2a4a';
    ctx.font = 'bold 13px system-ui, sans-serif';
    ctx.textAlign = li > points.length - 3 ? 'right' : 'left';
    ctx.fillText(fmtAxis(last.v, opts.unit), x(li) + (li > points.length - 3 ? -8 : 8), y(last.v) - 10);
  }
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', `${opts.title}: latest ${last ? last.v : 'n/a'} ${opts.unit || ''} in ${last ? last.year : ''}`);
}

function fmtAxis(v, unit) {
  if (unit === '$ trillion') return '$' + v.toFixed(1) + 'T';
  if (unit === 'current US$') return '$' + Math.round(v).toLocaleString('en-US');
  if (unit === '% of labour force' || unit === '% per year') return v.toFixed(1) + '%';
  if (unit === 'millions') return v.toFixed(0) + 'm';
  return String(Math.round(v * 10) / 10);
}

// Horizontal bar list for state populations, drawn as styled divs by views.js;
// this helper formats a population number.
export function fmtPop(n) {
  return (n / 1e6).toFixed(2) + ' million';
}
