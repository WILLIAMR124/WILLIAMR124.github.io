/*
let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition
}

const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  glowDuration: 75,
  maximumGlowPointSpacing: 10,
  colors: ["249 146 253", "252 254 255"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"]
}

let count = 0;
  
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
      selectRandom = items => items[rand(0, items.length - 1)];

const withUnit = (value, unit) => `${value}${unit}`,
      px = value => withUnit(value, "px"),
      ms = value => withUnit(value, "ms");

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
        diffY = b.y - a.y;
  
  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

const calcElapsedTime = (start, end) => end - start;

const appendElement = element => document.body.appendChild(element),
      removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

const createStar = position => {
  const star = document.createElement("span"),
        color = selectRandom(config.colors);
  
  star.className = "star fa-solid fa-sparkle";
  
  star.style.left = px(position.x);
  star.style.top = px(position.y);
  star.style.fontSize = selectRandom(config.sizes);
  star.style.color = `rgb(${color})`;
  star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
  star.style.animationName = config.animations[count++ % 3];
  star.style.starAnimationDuration = ms(config.starAnimationDuration);
  
  appendElement(star);

  removeElement(star, config.starAnimationDuration);
}

const createGlowPoint = position => {
  const glow = document.createElement("div");
  
  glow.className = "glow-point";
  
  glow.style.left = px(position.x);
  glow.style.top = px(position.y);
  
  appendElement(glow)
  
  removeElement(glow, config.glowDuration);
}

const determinePointQuantity = distance => Math.max(
  Math.floor(distance / config.maximumGlowPointSpacing),
  1
);

/* --  

The following is an explanation for the "createGlow" function below:

I didn't cover this in my video, but I ran into an issue where moving the mouse really quickly caused gaps in the glow effect. Kind of like this:

*   *       *       *    *      *    🖱️

instead of:

*************************************🖱️

To solve this I sort of "backfilled" some additional glow points by evenly spacing them in between the current point and the last one. I found this approach to be more visually pleasing than one glow point spanning the whole gap.

The "quantity" of points is based on the config property "maximumGlowPointSpacing".

My best explanation for why this is happening is due to the mousemove event only firing every so often. I also don't think this fix was totally necessary, but it annoyed me that it was happening so I took on the challenge of trying to fix it.

-- */
/*
const createGlow = (last, current) => {
  const distance = calcDistance(last, current),
        quantity = determinePointQuantity(distance);
  
  const dx = (current.x - last.x) / quantity,
        dy = (current.y - last.y) / quantity;
  
  Array.from(Array(quantity)).forEach((_, index) => { 
    const x = last.x + dx * index, 
          y = last.y + dy * index;
    
    createGlowPoint({ x, y });
  });
}

const updateLastStar = position => {
  last.starTimestamp = new Date().getTime();

  last.starPosition = position;
}

const updateLastMousePosition = position => last.mousePosition = position;

const adjustLastMousePosition = position => {
  if(last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = position;
  }
};

const handleOnMove = e => {
  const mousePosition = { x: e.clientX, y: e.clientY }
  
  adjustLastMousePosition(mousePosition);
  
  const now = new Date().getTime(),
        hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars,
        hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;
  
  if(hasMovedFarEnough || hasBeenLongEnough) {
    createStar(mousePosition);
    
    updateLastStar(mousePosition);
  }
  
  createGlow(last.mousePosition, mousePosition);
  
  updateLastMousePosition(mousePosition);
}

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

document.body.onmouseleave = () => updateLastMousePosition(originPosition);
*/

/* Parallax Starfield Background */
document.addEventListener('DOMContentLoaded', () => {
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

        requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    });

    requestAnimationFrame(draw);
});