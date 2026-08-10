# 🛠️ How to Customize Your RPG Wiki

This guide walks you through setting up the template for your own world, step by step.

---

## Step 1 — Set Your World Name & Tagline

Open these files and replace every instance of `[WORLD NAME]` and `[TAGLINE]`:

- `index.html` — the `<title>` tag, navbar logo, and hero section
- `pages/characters.html` — `<title>` and navbar
- `pages/locations.html` — `<title>` and navbar
- `pages/lore.html` — `<title>` and navbar
- *(repeat for all other pages in `/pages/`)*
- `site.webmanifest` — update `name` and `short_name`

**Tip:** Use your editor's Find & Replace (Ctrl+H / Cmd+H) to replace `[WORLD NAME]` across all files at once.

---

## Step 2 — Change the Color Theme

Open `styles/general.css` and find the `:root` block near the very top:

```css
:root {
    --primary-dark:    #1a0a0a;   /* main page background */
    --secondary-dark:  #2d1010;   /* navbar, footer, card bg */
    --accent-light:    #1abc9c;   /* headings, active borders */
    --accent-dark:     #2980b9;   /* icons, buttons, hover */
    --text-light:      #f8fafc;   /* primary body text */
    --text-muted:      #94a3b8;   /* secondary/placeholder text */
}
```

Change those hex values to match your world's aesthetic. The entire site updates immediately. Some suggested themes:

| Theme                   | Primary   | Secondary | light     | dark      |
|-------------------------|-----------|-----------|-----------|-----------|
| Blood & Iron (dark red) | `#1a0a0a` | `#2d1010` | `#e74c3c` | `#8e44ad` |
| Ocean & Storm (teal)    | `#0a1628` | `#0d2137` | `#1abc9c` | `#2980b9` |
| Forest & Ruin (green)   | `#0a1a0e` | `#122b17` | `#f1c40f` | `#27ae60` |
| Desert & gold (warm)    | `#1a1208` | `#2d1f0a` | `#f39c12` | `#e67e22` |

---

## Step 3 — Change the Hero Background Image

Open `styles/general.css` and find the `.hero` rule. Change the URL inside `url('...')`:

```css
.hero {
    background:
        linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.9)),
        url('YOUR-IMAGE-URL-HERE');
}
```

Options:
- **Local file:** `url('../images/your-hero-image.jpg')` — place the file in `/images/`
- **Unsplash:** Copy a direct image URL from [unsplash.com](https://unsplash.com) (free, no account needed)
- **Your own art:** Any JPEG, PNG, or WebP works

The gradient overlay on top keeps the text readable regardless of the image.

---

## Step 4 — Change the Font

Fonts are loaded from Google Fonts in each HTML file's `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
```

To change fonts:
1. Go to [fonts.google.com](https://fonts.google.com) and pick two fonts (one for headings, one for body)
2. Copy the new `<link>` tag and replace the one above in **every HTML file**
3. Update the font names in `styles/general.css`:

```css
:root {
    --font-heading: 'YourHeadingFont', serif;
    --font-body:    'YourBodyFont', sans-serif;
}
```

**Good RPG heading fonts:** Cinzel, MedievalSharp, Uncial Antiqua, IM Fell English, Almendra  
**Good body fonts:** Roboto, Lato, Open Sans, Source Sans 3

---

## Step 5 — Add Your Characters

Open `scripts/characters.js`. You'll find two arrays: `playerCharacters` and `npcCharacters`.

Copy and fill in this template for each character:

```javascript
{
    id: 3,                          // unique number — never repeat
    name: "Aldric Stormhand",
    race: "Human",
    class: "Paladin",
    excerpt: "A disgraced knight seeking redemption in a world that has forgotten honour.",
    backstory: "Full backstory here. Can be as long as you like.",
    image: "/images/personagens/aldric.webp",  // or a placeholder URL
    player: "Jamie",               // PC only
    faction: "Order of the Silver Flame",
    status: "Active"               // "Active" | "Deceased" | "Missing"
},
```

**For images without portraits:** Use a placeholder:
```
Placeholder.webp
```

---

## Step 6 — Add Your Locations

Open `scripts/locations.js` and add entries to the `locations` array:

```javascript
{
    id: 5,
    name: "Ashfall Keep",
    region: "region_one",           // must match a key in map.js regionColors
    type: "ruin",                   // city | town | wilderness | dungeon | ruin
    description: "Short card description — 1-2 sentences.",
    image: "../images/maps/ashfall.webp",
    population: "Abandoned",
    ruler: "None",
    danger: "High",
    tags: ["Ruins", "Haunted", "Ancient"],
    details: {
        history: "Longer history text shown in the modal.",
        notable: "The Throne Room, The Sealed Vault, The Bell Tower",
        factions: ["Ghost Legion", "Treasure Hunters Guild"]
    }
},
```

---

## Step 7 — Set Up the Interactive Map

1. Add your world map image to `/images/maps/` (any size, but 2000×1125px works well)
2. Open `scripts/map.js`
3. Update the image path and dimensions:

```javascript
const MAP_W = 2000;   // your map's pixel width
const MAP_H = 1125;   // your map's pixel height
```

4. Find where the map image is referenced in `pages/locations.html` and update the path
5. Update `regionColors` with your region names:

```javascript
const regionColors = {
    'northern_reach': '#aec9dd',
    'deadlands':      '#c2456e',
    'verdant_plain':  '#00d659',
    // add more as needed
};
```

6. Set `debugMode = true` in `map.js`, open `locations.html` in a browser, hover over your map to find pixel coordinates for each location, then add markers

---

## Step 8 — Add Lore Stories

Open `scripts/lore.js` and add entries to `loreEntries`:

```javascript
{
    id: 3,
    title: "The Legend of the Ashen King",
    category: "legend",            // history | legend | chronicle | myth | prophecy
    excerpt: "Short teaser shown on the card.",
    fullText: [
        "First paragraph of the story.",
        "Second paragraph.",
        "Each string is one paragraph."
    ],
    author: "Unknown",
    readTime: 4                    // estimated minutes to read there are world counts online for this
},
```

---

## Step 9 — Add Gods

Open `scripts/gods.js` and add entries to the `gods` array:

```javascript
{
    id: 4,
    name: "Varek the Undying",
    description: "God of death and memory. Worshipped by morticians, soldiers, and those who fear forgetting.",
    image: "../images/gods/varek.webp",
    domain: "Death, Memory",
    symbol: "A closed eye over an hourglass",
    representative: "A skeletal figure in a scholar's robes"
},
```

---

## Step 10 — Add Timeline Events

Open `scripts/timeline.js` and add entries to the `events` array:

```javascript
{
    id: 7,
    year: 1450,
    era: "The Age of Ash",
    title: "The Burning of Valdris",
    summary: "The great city of Valdris was razed overnight. No one claimed responsibility.",
    details: "Full description of this event and its consequences.",
    type: "catastrophe",           // war | discovery | political | catastrophe | cultural
    impact: "critical"             // low | medium | high | critical
},
```

---

## Step 11 — Deploy & Share

**GitHub Pages (free, recommended):**
1. Create a free account at [github.com](https://github.com)
2. Create a new repository
3. Upload all your files
4. Settings → Pages → Source: main branch
5. Your wiki is live! Share the URL

**Netlify Drop (instant, no account):**
1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag your entire project folder into the browser
3. Get an instant live URL

---

## Common Issues

**Map not showing:** Make sure your map image path in `map.js` is correct relative to the `pages/` folder.

**Cards not appearing:** Check the browser console (F12) for JavaScript errors. Usually a missing comma in a data array.

**Styles not loading:** If opening files directly from disk (not a server), some browsers block relative CSS. Use a local server: in VS Code, install the "Live Server" extension.

**Images not loading:** Check that image paths start with `../images/` when referenced from inside the `pages/` folder, and just `images/` from `index.html`.
