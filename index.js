document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('start-exploring-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            window.location.href = 'planets.html';
        });
    }

    const canvas = document.getElementById('starfield');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    const layers = [
        { count: 180, speed: 0.15, minR: 0.4, maxR: 1.1 },
        { count: 110, speed: 0.4, minR: 0.8, maxR: 1.8 },
        { count: 50, speed: 0.8, minR: 1.4, maxR: 2.8 }
    ];

    let stars = [];
    let mouseX = 0.5;
    let mouseY = 0.5;

    const rand = (min, max) => Math.random() * (max - min) + min;

    function buildStars() {
        stars = [];
        layers.forEach((layer, index) => {
            for (let i = 0; i < layer.count; i++) {
                stars.push({
                    layer: index,
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: rand(layer.minR, layer.maxR),
                    speed: layer.speed * rand(0.7, 1.4),
                    twinkleSpeed: rand(0.002, 0.015),
                    twinklePhase: Math.random() * Math.PI * 2,
                    tint: Math.random() < 0.8 ? null : Math.floor(rand(0, 360))
                });
            }
        });
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        buildStars();
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        const parallaxX = (mouseX - 0.5) * 30;
        const parallaxY = (mouseY - 0.5) * 30;

        for (const s of stars) {
            s.y += s.speed;
            if (s.y > height) {
                s.y = 0;
                s.x = Math.random() * width;
            }

            const layerFactor = s.layer + 1;
            const dx = s.x + parallaxX * layerFactor;
            const dy = s.y + parallaxY * layerFactor;

            const alpha = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(s.twinklePhase + performance.now() * s.twinkleSpeed));

            if (s.r > 2) {
                ctx.beginPath();
                ctx.arc(dx, dy, s.r * 3, 0, Math.PI * 2);
                ctx.fillStyle = s.tint === null
                    ? `rgba(255, 255, 255, ${alpha * 0.1})`
                    : `hsla(${s.tint}, 80%, 75%, ${alpha * 0.1})`;
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(dx, dy, s.r, 0, Math.PI * 2);
            ctx.fillStyle = s.tint === null
                ? `rgba(255, 255, 255, ${alpha})`
                : `hsla(${s.tint}, 80%, 78%, ${alpha})`;
            ctx.fill();
        }
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let rafId = null;
    let running = false;

    function loop() {
        draw();
        rafId = requestAnimationFrame(loop);
    }

    function start() {
        if (running) return;
        running = true;
        rafId = requestAnimationFrame(loop);
    }

    function stop() {
        running = false;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop();
        else if (!reducedMotion.matches) start();
    });

    if (reducedMotion.matches) {
        draw();
    } else {
        start();
    }
});
