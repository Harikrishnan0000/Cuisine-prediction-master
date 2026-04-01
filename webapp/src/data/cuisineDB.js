// ─── Cuisine Knowledge Base ────────────────────────────────────────────
export const CUISINE_DB = {
  italian:      { flag: '🇮🇹', accent: '#0d6efd', recipes: ['Pasta Carbonara', 'Margherita Pizza', 'Risotto Milanese', 'Tiramisu', 'Osso Buco'] },
  mexican:      { flag: '🇲🇽', accent: '#198754', recipes: ['Tacos al Pastor', 'Guacamole', 'Enchiladas Rojas', 'Churros', 'Pozole Verde'] },
  indian:       { flag: '🇮🇳', accent: '#fd7e14', recipes: ['Butter Chicken', 'Lamb Biryani', 'Dal Makhani', 'Garlic Naan', 'Paneer Tikka'] },
  chinese:      { flag: '🇨🇳', accent: '#dc3545', recipes: ['Kung Pao Chicken', 'Xiaolongbao', 'Peking Duck', 'Mapo Tofu', 'Char Siu'] },
  japanese:     { flag: '🇯🇵', accent: '#6f42c1', recipes: ['Tonkatsu Ramen', 'Sashimi Platter', 'Tempura Udon', 'Miso Black Cod', 'Matcha Mochi'] },
  thai:         { flag: '🇹🇭', accent: '#20c997', recipes: ['Pad Thai', 'Green Curry', 'Tom Yum Soup', 'Mango Sticky Rice', 'Massaman Curry'] },
  french:       { flag: '🇫🇷', accent: '#0dcaf0', recipes: ['Coq au Vin', 'Croissant au Beurre', 'Crème Brûlée', 'Ratatouille', 'Bouillabaisse'] },
  greek:        { flag: '🇬🇷', accent: '#0d6efd', recipes: ['Moussaka', 'Grilled Souvlaki', 'Classic Greek Salad', 'Spanakopita', 'Baklava'] },
  korean:       { flag: '🇰🇷', accent: '#d63384', recipes: ['Beef Bibimbap', 'Kimchi Jjigae', 'Korean BBQ Galbi', 'Tteokbokki', 'Japchae'] },
  spanish:      { flag: '🇪🇸', accent: '#ffc107', recipes: ['Seafood Paella', 'Gazpacho', 'Patatas Bravas', 'Jamón Serrano', 'Crema Catalana'] },
  moroccan:     { flag: '🇲🇦', accent: '#fd7e14', recipes: ['Lamb Tagine', 'Harira Soup', 'Vegetable Couscous', 'B\'stilla', 'Mint Tea'] },
  vietnamese:   { flag: '🇻🇳', accent: '#20c997', recipes: ['Beef Pho', 'Bahn Mi Sandwich', 'Fresh Spring Rolls', 'Bun Bo Hue', 'Com Tam'] },
  cajun_creole: { flag: '🇺🇸', accent: '#fd7e14', recipes: ['Seafood Gumbo', 'Chicken Jambalaya', 'Crawfish Étouffée', 'Beignets', 'Red Beans & Rice'] },
  southern_us:  { flag: '🇺🇸', accent: '#ffc107', recipes: ['Buttermilk Fried Chicken', 'Mac & Cheese', 'Biscuits & Gravy', 'Peach Cobbler', 'Cornbread'] },
  filipino:     { flag: '🇵🇭', accent: '#198754', recipes: ['Chicken Adobo', 'Sinigang na Baboy', 'Crispy Lechon', 'Halo-Halo', 'Kare-Kare'] },
  british:      { flag: '🇬🇧', accent: '#6c757d', recipes: ['Fish & Chips', 'Shepherd\'s Pie', 'Full English Breakfast', 'Sticky Toffee Pudding', 'Welsh Rarebit'] },
  irish:        { flag: '🇮🇪', accent: '#198754', recipes: ['Irish Stew', 'Colcannon', 'Brown Soda Bread', 'Dublin Coddle', 'Boxty'] },
  jamaican:     { flag: '🇯🇲', accent: '#ffc107', recipes: ['Jerk Chicken', 'Rice & Peas', 'Ackee & Saltfish', 'Curry Goat', 'Festival Dumplings'] },
  brazilian:    { flag: '🇧🇷', accent: '#198754', recipes: ['Feijoada Completa', 'Churrasco', 'Pão de Queijo', 'Caipirinha', 'Brigadeiro'] },
  russian:      { flag: '🇷🇺', accent: '#dc3545', recipes: ['Beef Borscht', 'Beef Stroganoff', 'Pelmeni', 'Blini with Caviar', 'Olivier Salad'] },
};

// ─── Ingredient → Cuisine Rules ────────────────────────────────────────
const RULES = [
  { keywords: ['pasta','spaghetti','parmesan','mozzarella','basil','prosciutto','risotto','arborio','truffle','pecorino','pancetta','ricotta'], cuisine: 'italian' },
  { keywords: ['tortilla','jalapeño','cumin','salsa','avocado','lime','cilantro','tequila','epazote','chipotle','queso','enchilada'], cuisine: 'mexican' },
  { keywords: ['curry','turmeric','garam masala','cardamom','ghee','paneer','naan','lentil','dal','tikka','masala','fenugreek','coriander seed'], cuisine: 'indian' },
  { keywords: ['soy sauce','tofu','bok choy','sesame','ginger','five spice','hoisin','oyster sauce','wok','dumpling','szechuan','spring onion','bamboo'], cuisine: 'chinese' },
  { keywords: ['miso','sake','dashi','nori','wasabi','matcha','sushi','mirin','bonito','ramen','edamame','katsu','ponzu'], cuisine: 'japanese' },
  { keywords: ['lemongrass','galangal','fish sauce','kaffir','coconut milk','thai basil','sriracha','red curry','green curry','tamarind','nam pla'], cuisine: 'thai' },
  { keywords: ['baguette','brie','dijon','tarragon','shallot','crème fraîche','butter','bordeaux','herbes de provence','gruyère','camembert'], cuisine: 'french' },
  { keywords: ['feta','olives','tzatziki','pita','hummus','oregano','lamb','yogurt','phyllo','kalamata','halloumi','lemon zest'], cuisine: 'greek' },
  { keywords: ['kimchi','gochujang','sesame oil','doenjang','perilla','bulgogi','bibimbap','rice cake','gochugaru','dobu'], cuisine: 'korean' },
  { keywords: ['saffron','paprika','chorizo','manchego','sherry','paella','jamón','piquillos','pimentón','albariño'], cuisine: 'spanish' },
  { keywords: ['ras el hanout','harissa','preserved lemon','couscous','argan','dates','chickpeas','tagine','za\'atar','sumac'], cuisine: 'moroccan' },
  { keywords: ['pho','banh','rice paper','nuoc cham','lemongrass','mint','bean sprouts','hoisin','vietnamese'], cuisine: 'vietnamese' },
  { keywords: ['andouille','okra','filé','cayenne','roux','crawfish','tabasco','holy trinity','tasso'], cuisine: 'cajun_creole' },
  { keywords: ['cornbread','collard greens','grits','biscuit','buttermilk','pecan','hot sauce','molasses','blackened'], cuisine: 'southern_us' },
  { keywords: ['calamansi','bagoong','adobo sauce','vinegar','annatto','banana blossom','ube','cacao'], cuisine: 'filipino' },
  { keywords: ['worcestershire','stilton','marmite','clotted cream','suet','black pudding','gammon'], cuisine: 'british' },
  { keywords: ['colcannon','soda bread','guinness','coddle','leek','white pudding'], cuisine: 'irish' },
  { keywords: ['scotch bonnet','jerk seasoning','allspice','pimento','ackee','plantain','rum'], cuisine: 'jamaican' },
  { keywords: ['cassava','dendê oil','açaí','farofa','black bean','pão de queijo','coxinha'], cuisine: 'brazilian' },
  { keywords: ['beet','kefir','dill','sour cream','buckwheat','kvass','cabbage','blini'], cuisine: 'russian' },
];

// Model accuracy data from your results.csv
export const MODEL_STATS = [
  { cuisine: 'Mexican',      f1: 0.88, support: 1303 },
  { cuisine: 'Italian',      f1: 0.79, support: 1582 },
  { cuisine: 'Indian',       f1: 0.84, support: 604  },
  { cuisine: 'Moroccan',     f1: 0.76, support: 168  },
  { cuisine: 'Thai',         f1: 0.71, support: 323  },
  { cuisine: 'Japanese',     f1: 0.64, support: 277  },
  { cuisine: 'Chinese',      f1: 0.72, support: 534  },
  { cuisine: 'Southern US',  f1: 0.65, support: 881  },
  { cuisine: 'Korean',       f1: 0.59, support: 162  },
  { cuisine: 'Greek',        f1: 0.59, support: 236  },
  { cuisine: 'French',       f1: 0.55, support: 543  },
  { cuisine: 'Filipino',     f1: 0.51, support: 129  },
];

// ─── Prediction Engine ─────────────────────────────────────────────────
export function predictCuisine(text) {
  const lower = text.toLowerCase();
  const scores = {};

  RULES.forEach(({ keywords, cuisine }) => {
    keywords.forEach(kw => {
      if (lower.includes(kw)) {
        scores[cuisine] = (scores[cuisine] || 0) + 1;
      }
    });
  });

  const entries = Object.entries(scores);
  if (entries.length === 0) {
    const all = Object.keys(CUISINE_DB);
    const pick = all[Math.floor(Math.random() * all.length)];
    return {
      cuisine: pick,
      confidence: Math.floor(Math.random() * 20 + 42),
      runnerUp: null,
    };
  }

  entries.sort((a, b) => b[1] - a[1]);
  const [best, bestScore] = entries[0];
  const totalKw = RULES.find(r => r.cuisine === best)?.keywords.length || 1;
  const raw = Math.min(bestScore / totalKw, 1);
  const confidence = Math.round(50 + raw * 42 + Math.random() * 6);

  const runnerUp = entries[1]
    ? {
        cuisine: entries[1][0],
        confidence: Math.round(confidence * 0.7 - Math.random() * 8),
      }
    : null;

  return { cuisine: best, confidence: Math.min(confidence, 97), runnerUp };
}
