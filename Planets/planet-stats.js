(function () {
    'use strict';

    var DATA = window.PLANET_STATS;
    if (!DATA) return;

    var ORDER = ['The Sun', 'Mercury', 'Venus', 'Earth', 'The Moon', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
    var ATMOSPHERE_COLORS = ['#4f8cff', '#e85d3f', '#e6b35a', '#d9a066', '#6fd3d3', '#b0b0b0', '#e8d3a0', '#4a6cff'];

    var section = document.getElementById('planet-stats-section');
    if (!section) return;

    var currentKey = section.getAttribute('data-planet');
    var current = DATA[currentKey];
    if (!current) return;

    var FILES = {
        'The Sun': 'the-sun',
        'The Moon': 'the-moon'
    };
    var fileFor = function (k) { return './' + (FILES[k] || k) + '.html'; };

    /* ---------- quick facts (single source of truth: planet-data.js) ---------- */
    var quickList = document.getElementById('quick-facts');
    if (quickList && current.quickFacts) {
        current.quickFacts.forEach(function (f) {
            var li = document.createElement('li');
            var strong = document.createElement('strong');
            strong.textContent = f.label + ': ';
            li.appendChild(strong);
            li.appendChild(document.createTextNode(f.value));
            quickList.appendChild(li);
        });
    }

    /* ---------- build page structure ---------- */
    var inner = document.createElement('div');
    inner.className = 'stats-inner';
    section.appendChild(inner);

    var header = document.createElement('div');
    header.className = 'stats-header';
    header.innerHTML = '<h2>Interactive Planet Statistics</h2>';

    var label = document.createElement('label');
    label.className = 'stats-switcher';
    label.textContent = 'View stats for: ';
    var sel = document.createElement('select');
    sel.id = 'planet-switcher';
    ORDER.forEach(function (k) {
        var o = document.createElement('option');
        o.value = k;
        o.textContent = DATA[k].name;
        if (k === currentKey) o.selected = true;
        sel.appendChild(o);
    });
    label.appendChild(sel);
    header.appendChild(label);
    inner.appendChild(header);

    var layout = document.createElement('div');
    layout.className = 'stats-layout';
    inner.appendChild(layout);

    var cards = document.createElement('div');
    cards.className = 'summary-cards';
    cards.id = 'summary-cards';
    layout.appendChild(cards);

    var atmo = document.createElement('div');
    atmo.className = 'atmosphere-panel';
    atmo.innerHTML = '<h3>Atmosphere Composition</h3>';

    var atmoWrap = document.createElement('div');
    atmoWrap.className = 'chart-wrap';
    var atmoCanvas = document.createElement('canvas');
    atmoCanvas.id = 'atmosphere-chart';
    atmoWrap.appendChild(atmoCanvas);
    atmo.appendChild(atmoWrap);

    var atmoTip = document.createElement('div');
    atmoTip.className = 'chart-tooltip';
    atmoWrap.appendChild(atmoTip);

    var legend = document.createElement('ul');
    legend.className = 'legend';
    legend.id = 'atmosphere-legend';
    atmo.appendChild(legend);

    var atmoNote = document.createElement('p');
    atmoNote.className = 'atmosphere-note';
    atmoNote.id = 'atmosphere-note';
    atmo.appendChild(atmoNote);
    layout.appendChild(atmo);

    var compare = document.createElement('div');
    compare.className = 'comparison-charts';
    compare.id = 'comparison-charts';
    inner.appendChild(compare);

    /* ---------- summary cards ---------- */
    var SUMMARY = [
        {
            label: 'Gravity',
            fmt: function (p) { return p.gravity + ' m/s²'; },
            rel: function (p) { return p.gravity / 274; },
            note: function (p) { return p.gravityNote; }
        },
        {
            label: 'Distance from Sun',
            fmt: function (p) { return p.distance + ' million km'; },
            rel: function (p) { return p.distance / 4495; },
            note: function (p) { return p.distance === 0 ? 'The Sun itself — the center of the solar system.' : p.distance + ' million km from the Sun.'; }
        },
        {
            label: 'Moons',
            fmt: function (p) { return p.moons; },
            rel: function (p) { return p.moons / 274; },
            note: function (p) {
                if (p.moons === 0) return (p.name === 'The Sun' || p.name === 'The Moon') ? 'Not applicable.' : 'No moons confirmed.';
                return p.moons + (p.moons === 1 ? ' moon confirmed.' : ' moons confirmed.');
            }
        },
        {
            label: 'Avg. Temperature',
            fmt: function (p) { return p.temperature + ' °C'; },
            rel: function (p) { return Math.min((p.temperature + 200) / 665, 1); },
            note: function (p) { return p.name === 'The Sun' ? 'Scorching surface temperature.' : 'Average surface temperature.'; }
        }
    ];

    function renderSummary(planetKey) {
        var p = DATA[planetKey];
        cards.innerHTML = '';
        SUMMARY.forEach(function (s) {
            var rel = s.rel(p);
            var pct = rel > 0 ? Math.max(rel * 100, 2) : 0;
            var card = document.createElement('div');
            card.className = 'stat-card';
            card.innerHTML =
                '<h3>' + s.label + '</h3>' +
                '<p class="stat-value">' + s.fmt(p) + '</p>' +
                '<div class="stat-bar"><div class="stat-fill" style="width:0%;background:' + p.color + '"></div></div>' +
                '<p class="stat-note">' + s.note(p) + '</p>';
            cards.appendChild(card);
            var fill = card.querySelector('.stat-fill');
            setTimeout(function () { fill.style.width = pct + '%'; }, 30);
        });
    }

    /* ---------- canvas helpers ---------- */
    function setupCanvas(canvas) {
        var dpr = window.devicePixelRatio || 1;
        var cssW = canvas.clientWidth || 320;
        var cssH = canvas.clientHeight || 160;
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        var ctx = canvas.getContext('2d');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        return { ctx: ctx, w: cssW, h: cssH };
    }

    function drawBarChart(canvas, items, opts) {
        var s = setupCanvas(canvas);
        var ctx = s.ctx, cssW = s.w, cssH = s.h;
        ctx.clearRect(0, 0, cssW, cssH);

        ctx.font = '11px "Helvetica Neue", Arial, sans-serif';
        var labelW = 10;
        items.forEach(function (it) {
            labelW = Math.max(labelW, ctx.measureText(it.label).width);
        });
        labelW += 10;

        var padTop = 6, padRight = 4, padBottom = 2;
        var plotW = cssW - labelW - padRight - 4;
        var plotH = cssH - padTop - padBottom;
        var rowH = plotH / items.length;

        items.forEach(function (it, i) {
            var y = padTop + i * rowH + rowH / 2;

            ctx.fillStyle = '#cfcfcf';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            ctx.fillText(it.label, labelW - 6, y);

            var w = it.value > 0 ? Math.max(it.value / opts.max * plotW, 2) : 0;
            var barH = Math.min(rowH * 0.5, 13);

            ctx.globalAlpha = it.current ? 1 : 0.42;
            ctx.fillStyle = it.color;
            ctx.fillRect(labelW + 1, y - barH / 2, w, barH);
            ctx.globalAlpha = 1;

            ctx.fillStyle = '#e8e8ff';
            ctx.font = 'bold 11px "Helvetica Neue", Arial, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(it.text, labelW + 6 + w, y);
        });

        if (opts.baseline) {
            var bx = labelW + 1 + (opts.baseline / opts.max) * plotW;
            ctx.strokeStyle = '#999';
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(bx, padTop);
            ctx.lineTo(bx, cssH - padBottom);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = '#b0b0c8';
            ctx.font = '9px "Helvetica Neue", Arial, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(opts.baselineLabel || '', bx + 3, padTop + 7);
        }

        canvas._hits = items.map(function (it, i) {
            return { x0: 0, x1: cssW, y0: padTop + i * rowH, y1: padTop + (i + 1) * rowH, item: it };
        });
    }

    function drawDonut(canvas, segments, center) {
        var s = setupCanvas(canvas);
        var ctx = s.ctx, cssW = s.w, cssH = s.h;
        ctx.clearRect(0, 0, cssW, cssH);

        var total = segments.reduce(function (sum, seg) { return sum + seg.value; }, 0);
        var cx = cssW / 2, cy = cssH / 2;
        var r = Math.min(cssW, cssH) / 2 - 6;
        var th = r * 0.6;
        var angle = -Math.PI / 2;

        segments.forEach(function (seg, i) {
            var sweep = (seg.value / total) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(cx, cy, r, angle, angle + sweep);
            ctx.arc(cx, cy, r - th, angle + sweep, angle, true);
            ctx.closePath();
            ctx.fillStyle = ATMOSPHERE_COLORS[i % ATMOSPHERE_COLORS.length];
            ctx.fill();
            angle += sweep;
        });

        ctx.fillStyle = '#e8e8ff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 16px "Helvetica Neue", Arial, sans-serif';
        ctx.fillText(center.top, cx, cy - 7);
        ctx.font = '12px "Helvetica Neue", Arial, sans-serif';
        ctx.fillStyle = '#9a9ac0';
        ctx.fillText(center.bottom, cx, cy + 11);

        canvas._donut = { cx: cx, cy: cy, r: r, th: th, total: total, segments: segments };
    }

    /* ---------- atmosphere ---------- */
    function renderAtmosphere(planetKey) {
        var p = DATA[planetKey];
        var segments = p.atmosphere;
        var total = segments.reduce(function (sum, seg) { return sum + seg.value; }, 0);
        var top = segments.reduce(function (a, b) { return b.value > a.value ? b : a; });

        drawDonut(atmoCanvas, segments, {
            top: top.name,
            bottom: p.atmosphereQualitative ? 'main gases' : (top.value / total * 100).toFixed(1) + '%'
        });

        legend.innerHTML = '';
        segments.forEach(function (seg, i) {
            var li = document.createElement('li');
            var dot = document.createElement('span');
            dot.className = 'dot';
            dot.style.background = ATMOSPHERE_COLORS[i % ATMOSPHERE_COLORS.length];
            li.appendChild(dot);
            li.appendChild(document.createTextNode(seg.name + ' '));
            var pct = document.createElement('strong');
            pct.textContent = p.atmosphereQualitative ? 'main' : (seg.value / total * 100).toFixed(1) + '%';
            li.appendChild(pct);
            legend.appendChild(li);
        });

        if (p.atmosphereNote) {
            atmoNote.textContent = p.atmosphereNote;
            atmoNote.style.display = '';
        } else {
            atmoNote.style.display = 'none';
        }
    }

    atmoWrap.addEventListener('mousemove', function (e) {
        var rect = atmoCanvas.getBoundingClientRect();
        var d = atmoCanvas._donut;
        if (!d) return;
        var dx = e.clientX - rect.left - d.cx;
        var dy = e.clientY - rect.top - d.cy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var hit = null;
        if (dist > d.r - d.th && dist < d.r) {
            var ang = Math.atan2(dy, dx);
            var rel = (ang + Math.PI / 2 + 2 * Math.PI) % (2 * Math.PI);
            var running = 0;
            for (var i = 0; i < d.segments.length; i++) {
                running += (d.segments[i].value / d.total) * 2 * Math.PI;
                if (rel <= running) { hit = d.segments[i]; break; }
            }
        }
        if (hit) {
            atmoTip.textContent = hit.name + ': ' + (hit.value / d.total * 100).toFixed(1) + '%';
            atmoTip.style.left = (e.clientX - rect.left + 12) + 'px';
            atmoTip.style.top = (e.clientY - rect.top + 12) + 'px';
            atmoTip.classList.add('visible');
        } else {
            atmoTip.classList.remove('visible');
        }
    });
    atmoWrap.addEventListener('mouseleave', function () {
        atmoTip.classList.remove('visible');
    });

    /* ---------- comparison charts ---------- */
    var CHART_DEFS = [
        {
            id: 'chart-gravity',
            title: 'Gravity vs Earth',
            max: 30,
            value: function (k) { return DATA[k].gravity / 9.81; },
            text: function (k) { return (DATA[k].gravity / 9.81).toFixed(2) + '×'; }
        },
        {
            id: 'chart-distance',
            title: 'Distance from the Sun',
            max: 4500,
            value: function (k) { return DATA[k].distance; },
            text: function (k) { return DATA[k].distance.toLocaleString() + ' M km'; }
        },
        {
            id: 'chart-moons',
            title: 'Number of Moons',
            max: 150,
            value: function (k) { return DATA[k].moons; },
            text: function (k) { return String(DATA[k].moons); }
        },
        {
            id: 'chart-temperature',
            title: 'Average Temperature',
            max: 665,
            baseline: 200,
            baselineLabel: '0 °C',
            exclude: function (k) { return k === 'The Sun'; },
            value: function (k) { return DATA[k].temperature + 200; },
            text: function (k) { return DATA[k].temperature + ' °C'; }
        }
    ];

    CHART_DEFS.forEach(function (def) {
        var block = document.createElement('div');
        block.className = 'chart-block';

        var h3 = document.createElement('h3');
        h3.textContent = def.title;
        block.appendChild(h3);

        var wrap = document.createElement('div');
        wrap.className = 'chart-wrap';
        var canvas = document.createElement('canvas');
        wrap.appendChild(canvas);
        block.appendChild(wrap);
        compare.appendChild(block);

        var items = [];
        ORDER.forEach(function (k) {
            if (def.exclude && def.exclude(k)) return;
            items.push({
                key: k,
                label: DATA[k].name,
                value: def.value(k),
                text: def.text(k),
                color: DATA[k].color,
                href: fileFor(k),
                current: k === currentKey
            });
        });

        var h = items.length * 24 + 12;
        canvas.style.height = h + 'px';
        wrap.style.height = h + 'px';
        canvas.style.width = '100%';

        var tip = document.createElement('div');
        tip.className = 'chart-tooltip';
        wrap.appendChild(tip);

        function redraw() {
            drawBarChart(canvas, items, { max: def.max, baseline: def.baseline, baselineLabel: def.baselineLabel });
        }
        redraw();
        window.addEventListener('resize', redraw);

        wrap.addEventListener('mousemove', function (e) {
            var rect = canvas.getBoundingClientRect();
            var x = e.clientX - rect.left, y = e.clientY - rect.top;
            var hit = null;
            (canvas._hits || []).forEach(function (h) {
                if (x >= h.x0 && x <= h.x1 && y >= h.y0 && y <= h.y1) hit = h;
            });
            if (hit) {
                tip.textContent = hit.item.label + ': ' + hit.item.text + (hit.item.current ? ' (this planet)' : ' — click to view');
                tip.style.left = (x + 10) + 'px';
                tip.style.top = (y + 10) + 'px';
                tip.classList.add('visible');
                wrap.style.cursor = 'pointer';
                canvas._active = hit.item;
            } else {
                tip.classList.remove('visible');
                wrap.style.cursor = 'default';
                canvas._active = null;
            }
        });
        wrap.addEventListener('mouseleave', function () {
            tip.classList.remove('visible');
            canvas._active = null;
        });
        wrap.addEventListener('click', function () {
            if (canvas._active && canvas._active.href) window.location.href = canvas._active.href;
        });
    });

    /* ---------- planet switcher ---------- */
    sel.addEventListener('change', function () {
        renderSummary(sel.value);
        renderAtmosphere(sel.value);
    });

    window.addEventListener('resize', function () {
        renderAtmosphere(currentKey);
    });

    renderSummary(currentKey);
    renderAtmosphere(currentKey);
})();
