/* =============================================================
   CUISINE PREDICTOR — Anti-Gravity App Logic
   Uses Matter.js for physics simulation
   ============================================================= */

'use strict';

// ─────────────────────────────────────────────
// 1. KNOWLEDGE BASE  (cuisine → recipes + flags)
// ─────────────────────────────────────────────
const CUISINE_DB = {
  italian:     { flag: '🇮🇹', color: '#e8f0fe', recipes: ['Pasta Carbonara', 'Margherita Pizza', 'Risotto', 'Tiramisu', 'Bruschetta'] },
  mexican:     { flag: '🇲🇽', color: '#fef3e2', recipes: ['Tacos al Pastor', 'Guacamole', 'Enchiladas', 'Churros', 'Pozole'] },
  indian:      { flag: '🇮🇳', color: '#fce8e6', recipes: ['Butter Chicken', 'Biryani', 'Dal Makhani', 'Naan Bread', 'Samosas'] },
  chinese:     { flag: '🇨🇳', color: '#e6f4ea', recipes: ['Kung Pao Chicken', 'Dim Sum', 'Fried Rice', 'Mapo Tofu', 'Spring Rolls'] },
  japanese:    { flag: '🇯🇵', color: '#f3e8fd', recipes: ['Sushi Rolls', 'Ramen', 'Tempura', 'Miso Soup', 'Yakitori'] },
  thai:        { flag: '🇹🇭', color: '#e2f3ec', recipes: ['Pad Thai', 'Green Curry', 'Tom Yum Soup', 'Mango Sticky Rice', 'Satay'] },
  french:      { flag: '🇫🇷', color: '#fff0f0', recipes: ['Croissants', 'Coq au Vin', 'Crème Brûlée', 'Ratatouille', 'Bouillabaisse'] },
  greek:       { flag: '🇬🇷', color: '#e0f2fe', recipes: ['Moussaka', 'Souvlaki', 'Greek Salad', 'Spanakopita', 'Baklava'] },
  korean:      { flag: '🇰🇷', color: '#fde8f0', recipes: ['Bibimbap', 'Kimchi Jjigae', 'Korean BBQ', 'Tteokbokki', 'Japchae'] },
  spanish:     { flag: '🇪🇸', color: '#fffde7', recipes: ['Paella', 'Gazpacho', 'Chorizo Tapas', 'Churros con Chocolate', 'Tortilla Española'] },
  moroccan:    { flag: '🇲🇦', color: '#fef9e7', recipes: ['Tagine', 'Harira Soup', 'Couscous', 'B\'stilla', 'Msemen'] },
  vietnamese:  { flag: '🇻🇳', color: '#e8fdf5', recipes: ['Pho', 'Banh Mi', 'Spring Rolls', 'Bun Bo Hue', 'Com Tam'] },
  cajun_creole:{ flag: '🇺🇸', color: '#fff3e0', recipes: ['Gumbo', 'Jambalaya', 'Crawfish Étouffée', 'Beignets', 'Red Beans & Rice'] },
  southern_us: { flag: '🇺🇸', color: '#fffde7', recipes: ['Fried Chicken', 'Mac & Cheese', 'Biscuits & Gravy', 'Peach Cobbler', 'Cornbread'] },
  filipino:    { flag: '🇵🇭', color: '#e8f5e9', recipes: ['Adobo', 'Sinigang', 'Lechon', 'Halo-Halo', 'Kare-Kare'] },
  british:     { flag: '🇬🇧', color: '#f8f8f8', recipes: ['Fish & Chips', 'Shepherd\'s Pie', 'Full English', 'Scones', 'Bangers & Mash'] },
  irish:       { flag: '🇮🇪', color: '#e8fde8', recipes: ['Irish Stew', 'Colcannon', 'Soda Bread', 'Boxty', 'Dublin Coddle'] },
  jamaican:    { flag: '🇯🇲', color: '#fffde7', recipes: ['Jerk Chicken', 'Rice & Peas', 'Ackee & Saltfish', 'Curry Goat', 'Bammy'] },
  brazilian:   { flag: '🇧🇷', color: '#e8f5e9', recipes: ['Feijoada', 'Pão de Queijo', 'Churrasco', 'Brigadeiro', 'Moqueca'] },
  russian:     { flag: '🇷🇺', color: '#e3f2fd', recipes: ['Borscht', 'Beef Stroganoff', 'Pelmeni', 'Blini', 'Olivier Salad'] },
};

// ─────────────────────────────────────────────
// 2. INGREDIENT → CUISINE MAPPING (keyword logic)
// ─────────────────────────────────────────────
const INGREDIENT_MAP = [
  { keywords: ['pasta','spaghetti','parmesan','basil','mozzarella','prosciutto','risotto','arborio','truffle','oregano'], cuisine: 'italian' },
  { keywords: ['tortilla','jalapeño','cumin','salsa','avocado','lime','cilantro','tequila','beans','chili','epazote'], cuisine: 'mexican' },
  { keywords: ['curry','turmeric','garam masala','cardamom','ghee','paneer','naan','lentil','dal','tikka','masala'], cuisine: 'indian' },
  { keywords: ['soy sauce','tofu','bok choy','sesame','ginger','five spice','hoisin','oyster sauce','wok','dumpling'], cuisine: 'chinese' },
  { keywords: ['miso','sake','dashi','nori','wasabi','matcha','sushi','mirin','bonito','ramen noodle'], cuisine: 'japanese' },
  { keywords: ['lemongrass','galangal','fish sauce','kaffir','coconut milk','thai basil','pad','sriracha','red curry'], cuisine: 'thai' },
  { keywords: ['baguette','brie','dijon','tarragon','shallot','crème','butter','bordeaux','herbes de provence'], cuisine: 'french' },
  { keywords: ['feta','olives','tzatziki','pita','hummus','oregano','lamb','yogurt','honey','phyllo'], cuisine: 'greek' },
  { keywords: ['kimchi','gochujang','sesame oil','doenjang','perilla','bulgogi','bibimbap','rice cake','soju'], cuisine: 'korean' },
  { keywords: ['saffron','paprika','chorizo','manchego','sherry','paella','jamón','olive','piquillos'], cuisine: 'spanish' },
  { keywords: ['ras el hanout','harissa','preserved lemon','couscous','argan','dates','chickpeas','cinnamon','tagine'], cuisine: 'moroccan' },
  { keywords: ['pho','banh','sriracha','noodle','lemongrass','rice paper','nuoc cham','hoisin','shrimp paste'], cuisine: 'vietnamese' },
  { keywords: ['andouille','okra','file','cayenne','holy trinity','roux','shrimp','crawfish','tabasco'], cuisine: 'cajun_creole' },
  { keywords: ['cornbread','collard','grits','biscuit','buttermilk','pecan','hot sauce','pork','molasses'], cuisine: 'southern_us' },
  { keywords: ['calamansi','bagoong','kamias','adobo','soy','vinegar','annatto','coconut','banana blossom'], cuisine: 'filipino' },
  { keywords: ['worcestershire','stilton','marmite','clotted cream','brown sauce','mushy peas','suet','gammon'], cuisine: 'british' },
  { keywords: ['colcannon','boxty','soda bread','guinness','black pudding','coddle','leek'], cuisine: 'irish' },
  { keywords: ['scotch bonnet','jerk','allspice','thyme','pimento','coconut rum','ackee','plantain'], cuisine: 'jamaican' },
  { keywords: ['cassava','dendê oil','açaí','guaraná','farofa','black beans','pão','coxinha'], cuisine: 'brazilian' },
  { keywords: ['beet','kefir','dill','sour cream','buckwheat','kvass','vodka','cabbage','pierogi','blini'], cuisine: 'russian' },
];

// ─────────────────────────────────────────────
// 3. PREDICTION ENGINE
// ─────────────────────────────────────────────
function predictCuisine(inputText) {
  const text = inputText.toLowerCase();
  const scores = {};

  INGREDIENT_MAP.forEach(({ keywords, cuisine }) => {
    keywords.forEach(kw => {
      if (text.includes(kw)) {
        scores[cuisine] = (scores[cuisine] || 0) + 1;
      }
    });
  });

  const entries = Object.entries(scores);
  if (entries.length === 0) {
    // Default fallback: pick a plausible random cuisine
    const all = Object.keys(CUISINE_DB);
    const pick = all[Math.floor(Math.random() * all.length)];
    return { cuisine: pick, confidence: Math.floor(Math.random() * 25 + 40) };
  }

  entries.sort((a, b) => b[1] - a[1]);
  const [bestCuisine, bestScore] = entries[0];
  const totalPossible = INGREDIENT_MAP.find(m => m.cuisine === bestCuisine)?.keywords.length || 1;
  // Normalize confidence: scale between 45–96 with jitter
  const raw = Math.min(bestScore / totalPossible, 1);
  const confidence = Math.round(45 + raw * 45 + Math.random() * 6);
  return { cuisine: bestCuisine, confidence: Math.min(confidence, 98) };
}

// ─────────────────────────────────────────────
// 4. MATTER.JS PHYSICS
// ─────────────────────────────────────────────
const { Engine, Render, Runner, Bodies, Body, World, Mouse, MouseConstraint, Events, Vector } = Matter;

let engine, render, runner, mConstraint;
let physicsActive = false;
let chipBodies = [];
let cardBody = null;
let domElements = []; // { el, body } pairs for sync

function initPhysics() {
  const W = window.innerWidth;
  const H = window.innerHeight;

  engine = Engine.create({ gravity: { x: 0, y: 0.8 } });
  const world = engine.world;

  const canvas = document.getElementById('physics-canvas');
  canvas.width = W;
  canvas.height = H;

  render = Render.create({
    canvas,
    engine,
    options: {
      width: W,
      height: H,
      wireframes: false,
      background: 'transparent',
    }
  });

  // Invisible walls & floor
  const walls = [
    Bodies.rectangle(W / 2, H + 30, W * 2, 60, { isStatic: true, label: 'floor' }),
    Bodies.rectangle(-30, H / 2, 60, H * 2, { isStatic: true, label: 'wall-l' }),
    Bodies.rectangle(W + 30, H / 2, 60, H * 2, { isStatic: true, label: 'wall-r' }),
  ];
  World.add(world, walls);

  // Mouse drag
  const mouse = Mouse.create(canvas);
  mConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.15, render: { visible: false } }
  });
  World.add(world, mConstraint);

  // Sync DOM elements to physics bodies
  Events.on(engine, 'afterUpdate', syncDOMToPhysics);

  Runner.run(Runner.create(), engine);
  Render.run(render);
}

function syncDOMToPhysics() {
  domElements.forEach(({ el, body }) => {
    if (!el || !body) return;
    const { x, y } = body.position;
    const angle = body.angle;
    el.style.left = `${x - el.offsetWidth / 2}px`;
    el.style.top  = `${y - el.offsetHeight / 2}px`;
    el.style.transform = `rotate(${angle}rad)`;
  });
}

function addPhysicsBody(el, opts = {}) {
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const body = Bodies.rectangle(cx, cy, rect.width, rect.height, {
    restitution: opts.restitution ?? 0.4,
    friction: opts.friction ?? 0.08,
    frictionAir: opts.frictionAir ?? 0.015,
    angle: opts.angle ?? 0,
    ...opts,
  });
  // Give initial impulse
  Body.setVelocity(body, {
    x: (Math.random() - 0.5) * (opts.vxRange ?? 8),
    y: -Math.abs(opts.vyRange ?? 6) * (Math.random() * 0.5 + 0.5),
  });
  Body.setAngularVelocity(body, (Math.random() - 0.5) * (opts.angVel ?? 0.08));
  World.add(engine.world, body);
  return body;
}

// ─────────────────────────────────────────────
// 5. PARTICLE BURST
// ─────────────────────────────────────────────
function burstParticles(cx, cy, count = 18) {
  const colors = ['#1a73e8','#34a853','#fbbc04','#ea4335','#9c27b0','#ff9800'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle = (Math.PI * 2 * i) / count;
    const dist  = 60 + Math.random() * 80;
    p.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    p.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    p.style.left = `${cx}px`;
    p.style.top  = `${cy}px`;
    p.style.background = colors[i % colors.length];
    p.style.animationDuration = `${0.5 + Math.random() * 0.5}s`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1000);
  }
}

// ─────────────────────────────────────────────
// 6. MAIN LAUNCH FUNCTION
// ─────────────────────────────────────────────
function launchGravity() {
  const inputEl = document.getElementById('ingredient-input');
  const rawInput = inputEl.value.trim();

  // Show loading
  const overlay = document.getElementById('loading-overlay');
  overlay.style.display = 'flex';

  // Get button center for burst
  const btn = document.getElementById('predict-btn');
  const btnRect = btn.getBoundingClientRect();
  const cx = btnRect.left + btnRect.width / 2;
  const cy = btnRect.top + btnRect.height / 2;

  // Simulate ML processing delay
  setTimeout(() => {
    overlay.style.display = 'none';

    const { cuisine, confidence } = predictCuisine(rawInput || 'pasta tomato cheese');
    const meta = CUISINE_DB[cuisine] || CUISINE_DB['italian'];

    // Particle burst on button
    burstParticles(cx, cy, 20);

    // Animate UI away
    animateUIAway();

    // Init physics
    initPhysics();
    physicsActive = true;

    // Show results after brief delay
    setTimeout(() => {
      showResultCard(cuisine, confidence, meta);
      setTimeout(() => showRecipeChips(meta.recipes.slice(0, 4)), 400);
      setTimeout(() => {
        document.getElementById('reset-btn').style.display = 'block';
      }, 800);
    }, 500);

  }, 1400);
}

// ─────────────────────────────────────────────
// 7. ANIMATE UI ELEMENTS AWAY
// ─────────────────────────────────────────────
function animateUIAway() {
  const wrapper = document.getElementById('ui-wrapper');
  wrapper.classList.add('gravity-active');

  const logo     = document.getElementById('logo');
  const inputRow = document.getElementById('input-row');
  const btnRow   = document.getElementById('button-row');
  const hint     = document.getElementById('hint-text');

  // Staggered, different directions
  setTimeout(() => logo.classList.add('fall-away'),    0);
  setTimeout(() => inputRow.classList.add('tilt-drop'), 80);
  setTimeout(() => btnRow.classList.add('slide-right'), 150);
  setTimeout(() => hint.classList.add('slide-left'),   100);

  // Hide wrapper completely after animations
  setTimeout(() => { wrapper.style.display = 'none'; }, 900);
}

// ─────────────────────────────────────────────
// 8. SHOW RESULT CARD
// ─────────────────────────────────────────────
function showResultCard(cuisine, confidence, meta) {
  const card = document.getElementById('result-card');
  const nameEl  = document.getElementById('result-cuisine-name');
  const flagEl  = document.getElementById('result-flag');
  const barEl   = document.getElementById('confidence-bar');
  const pctEl   = document.getElementById('confidence-percent');

  // Capitalize
  const label = cuisine.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  nameEl.textContent  = label;
  flagEl.textContent  = meta.flag;
  pctEl.textContent   = `${confidence}%`;

  // Position result card near center with slight offset
  const W = window.innerWidth;
  const H = window.innerHeight;
  card.style.display = 'block';
  card.style.left = `${W / 2 - 110 + (Math.random() - 0.5) * 60}px`;
  card.style.top  = `${H * 0.28}px`;
  card.style.position = 'fixed';

  // Animate confidence bar
  requestAnimationFrame(() => {
    setTimeout(() => {
      barEl.style.width = `${confidence}%`;
    }, 100);
  });

  // Add physics body for card
  card.style.transform = 'none';
  setTimeout(() => {
    cardBody = addPhysicsBody(card, {
      restitution: 0.35,
      frictionAir: 0.025,
      vxRange: 5,
      vyRange: 4,
      angVel: 0.05,
    });
    domElements.push({ el: card, body: cardBody });
  }, 600);
}

// ─────────────────────────────────────────────
// 9. SHOW RECIPE CHIPS
// ─────────────────────────────────────────────
function showRecipeChips(recipes) {
  const container = document.getElementById('chips-container');
  container.innerHTML = '';
  chipBodies = [];

  const W = window.innerWidth;
  const H = window.innerHeight;

  recipes.forEach((recipe, i) => {
    const chip = document.createElement('div');
    chip.className = 'recipe-chip';
    chip.textContent = `🍴 ${recipe}`;
    chip.id = `chip-${i}`;

    // Stagger positions along the top area
    const spreadX = W * 0.15 + (i / (recipes.length - 1 || 1)) * W * 0.7;
    chip.style.left = `${spreadX}px`;
    chip.style.top  = `${H * 0.08 + i * 5}px`;

    container.appendChild(chip);

    // Stagger physics attachment
    setTimeout(() => {
      const body = addPhysicsBody(chip, {
        restitution: 0.45,
        frictionAir: 0.02,
        vxRange: 10,
        vyRange: 5,
        angVel: 0.12,
      });
      chipBodies.push(body);
      domElements.push({ el: chip, body });
    }, i * 120);
  });
}

// ─────────────────────────────────────────────
// 10. RESET
// ─────────────────────────────────────────────
function resetUI() {
  // Stop physics
  if (render) {
    Render.stop(render);
    Runner.stop(Runner.create());
  }
  if (engine) {
    World.clear(engine.world);
    Engine.clear(engine);
  }

  physicsActive = false;
  domElements = [];
  chipBodies  = [];
  cardBody    = null;

  // Hide floating elements
  document.getElementById('result-card').style.display = 'none';
  document.getElementById('chips-container').innerHTML = '';
  document.getElementById('reset-btn').style.display = 'none';

  // Reset physics canvas
  const canvas = document.getElementById('physics-canvas');
  canvas.width  = 0;
  canvas.height = 0;

  // Restore UI wrapper
  const wrapper = document.getElementById('ui-wrapper');
  wrapper.style.display = 'flex';
  wrapper.classList.remove('gravity-active');

  ['logo','input-row','button-row','hint-text'].forEach(id => {
    const el = document.getElementById(id);
    el.classList.remove('fall-away','tilt-drop','slide-left','slide-right');
    el.style.opacity  = '';
    el.style.transform = '';
  });

  // Clear input
  document.getElementById('ingredient-input').value = '';

  // Re-trigger entrance animation
  wrapper.style.animation = 'none';
  requestAnimationFrame(() => {
    wrapper.style.animation = '';
  });
}

// ─────────────────────────────────────────────
// 11. KEYBOARD SHORTCUT — Enter key
// ─────────────────────────────────────────────
document.getElementById('ingredient-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') launchGravity();
});

// ─────────────────────────────────────────────
// 12. BUTTON MICRO-INTERACTION — ripple on click
// ─────────────────────────────────────────────
document.getElementById('predict-btn').addEventListener('mousedown', function(e) {
  const ripple = document.createElement('span');
  const rect   = this.getBoundingClientRect();
  const size   = Math.max(rect.width, rect.height);
  ripple.style.cssText = `
    position:absolute; border-radius:50%; pointer-events:none;
    width:${size}px; height:${size}px;
    left:${e.clientX - rect.left - size/2}px;
    top:${e.clientY - rect.top  - size/2}px;
    background:rgba(255,255,255,0.25);
    transform:scale(0); animation:ripple-spread .5s ease-out forwards;
  `;
  document.head.insertAdjacentHTML('beforeend', `
    <style id="ripple-style">
    @keyframes ripple-spread {
      to { transform:scale(2.5); opacity:0; }
    }
    </style>
  `);
  this.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

// ─────────────────────────────────────────────
// 13. WINDOW RESIZE — update walls
// ─────────────────────────────────────────────
window.addEventListener('resize', () => {
  if (!physicsActive || !engine) return;
  const W = window.innerWidth;
  const H = window.innerHeight;
  const canvas = document.getElementById('physics-canvas');
  canvas.width  = W;
  canvas.height = H;
  // Update floor (rough approach — clear and re-add)
  World.clear(engine.world, true);
  const walls = [
    Bodies.rectangle(W / 2, H + 30, W * 2, 60, { isStatic: true }),
    Bodies.rectangle(-30, H / 2, 60, H * 2, { isStatic: true }),
    Bodies.rectangle(W + 30, H / 2, 60, H * 2, { isStatic: true }),
  ];
  World.add(engine.world, walls);
  if (mConstraint) World.add(engine.world, mConstraint);
  // Re-add chip bodies
  chipBodies.forEach(b => World.add(engine.world, b));
  if (cardBody) World.add(engine.world, cardBody);
});

// ─────────────────────────────────────────────
// 14. CURSOR SPARKLE (subtle delight)
// ─────────────────────────────────────────────
let lastSparkle = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSparkle < 80) return;
  lastSparkle = now;
  if (physicsActive) return; // Skip in physics mode

  const spark = document.createElement('div');
  const size  = 4 + Math.random() * 5;
  spark.style.cssText = `
    position:fixed; pointer-events:none; z-index:9999;
    width:${size}px; height:${size}px; border-radius:50%;
    left:${e.clientX - size/2}px; top:${e.clientY - size/2}px;
    background: radial-gradient(circle, #1a73e8 0%, transparent 70%);
    opacity:0.6;
    animation: spark-fade 0.4s ease-out forwards;
  `;
  document.head.insertAdjacentHTML('beforeend', `
    <style id="spark-fade-style">
    @keyframes spark-fade { to { opacity:0; transform:scale(0); } }
    </style>
  `);
  document.body.appendChild(spark);
  setTimeout(() => spark.remove(), 450);
});
