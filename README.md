# ⚔️ RPG World Wiki Template

A fully featured, dark-fantasy wiki template for tabletop RPG worldbuilders, dungeon masters, and campaign creators. Built with pure HTML, CSS, and JavaScript — no frameworks, no build tools, no accounts needed.

---

## ✨ Features

- **Characters page** — PC and NPC cards with portrait images, status badges, and a detail modal
- **Locations page** — Filterable grid + an interactive map (powered by Leaflet.js) with clickable markers
- **Lore page** — Searchable archive of stories, legends, myths, and chronicles with category filters
- **Bestiary / Dangers page** — Fauna, flora, fungi, and monsters with danger ratings and full modal descriptions
- **Gods & Pantheons page** — Deity cards with domains, symbols, and lore
- **Timeline page** — Chronological event browser with era grouping and impact ratings
- **Stars & Constellations page** — Cosmology section for sky lore
- **Sticky navbar** with mobile hamburger menu
- **Back-to-top button**
- **Scroll-triggered fade-in animations** on cards
- **Fully responsive** — works on mobile, tablet, and desktop
- **No dependencies to install** — just open `index.html` in a browser

---

## 🚀 Quick Start

1. Open `index.html` in any browser — the site works immediately with placeholder content
2. Open `HOW_TO_CUSTOMIZE.md` for a step-by-step setup guide
3. Start with `styles/general.css` — edit the `:root` block to set your colors and fonts
4. Edit each `scripts/*.js` file to add your world's data
5. Deploy to GitHub Pages, Netlify, or any static host (free)

---

## 📁 File Structure

```
/
├── index.html              ← Home page
├── pages/
│   ├── characters.html     ← Characters page
│   ├── locations.html      ← Locations + interactive map
│   ├── lore.html           ← Lore archive
│   ├── dangers.html        ← Bestiary / Fauna & Flora
│   ├── gods.html           ← Gods & Pantheons
│   ├── timeline.html       ← World timeline
│   ├── stars.html          ← Sky & Constellations
├── styles/
│   ├── general.css         ← ★ MAIN THEME FILE — edit colors/fonts here
│   ├── characters.css      ← Characters page styles
│   ├── locations.css       ← Locations page styles
│   ├── map.css             ← Interactive map styles
│   ├── lore.css            ← Lore page styles
│   ├── dangers.css         ← Bestiary page styles
│   ├── gods.css            ← Gods page styles
│   ├── timeline.css        ← Timeline page styles
│   ├── stars.css           ← Stars page styles
├── scripts/
│   ├── main.js             ← Shared behaviour (navbar, scroll, animations)
│   ├── characters.js       ← ★ ADD YOUR CHARACTERS HERE
│   ├── locations.js        ← ★ ADD YOUR LOCATIONS HERE
│   ├── lore.js             ← ★ ADD YOUR LORE STORIES HERE
│   ├── dangers.js          ← ★ ADD YOUR BESTIARY ENTRIES HERE
│   ├── gods.js             ← ★ ADD YOUR GODS HERE
│   ├── timeline.js         ← ★ ADD YOUR TIMELINE EVENTS HERE
│   ├── stars.js            ← ★ ADD YOUR CONSTELLATIONS HERE
│   ├── map.js              ← ★ ADD YOUR MAP MARKERS HERE
└── images/
    ├── personagens/        ← Character portrait images
    ├── maps/               ← Location and world map images
    ├── lore/               ← Lore section images
    └── stars/              ← Constellation images
```

---

## 🎨 Theming in 2 Minutes

Open `styles/general.css` and find the `:root` block near the top:

```css
:root {
    --primary-dark:   #0f172a;   /* page background */
    --secondary-dark: #1e293b;   /* navbar, footer */
    --accent-light:   #1abc9c;   /* headings, borders */
    --accent-dark:    #2980b9;   /* icons, buttons */
    --text-light:     #f8fafc;
    --text-muted:     #94a3b8;
    --font-heading:   'Cinzel', serif;
    --font-body:      'Roboto', sans-serif;
}
```

Change those 8 values and the entire site updates instantly.

---

## 🗺️ Interactive Map

The Locations page includes an interactive map powered by [Leaflet.js](https://leafletjs.com/) (loaded from CDN — no install needed).

To use it with your own world map:
1. Add your map image to `/images/maps/`
2. Update the image path in `scripts/map.js`
3. Update `MAP_W` and `MAP_H` to your image's pixel dimensions
4. Set `debugMode = true` in `map.js`, hover over the map in a browser to find coordinates, then add markers

---

## 🌐 Deploying for Free

**GitHub Pages** (recommended):
1. Push this folder to a GitHub repository
2. Go to Settings → Pages → Source: `main` branch
3. Your wiki is live at `https://yourusername.github.io/your-repo`
4. Need more help? Watch `https://www.youtube.com/watch?v=e5AwNU3Y2es`

**Netlify**:
1. Drag and drop this folder to [netlify.com/drop](https://netlify.com/drop)
2. Instant live URL — no account needed

---

## 📋 Browser Support

Chrome, Firefox, Safari, Edge — all modern browsers. Internet Explorer is not supported.

---

## 📄 Credits & Licenses

See `CREDITS.md` for a full list of libraries and resources used.

---

## 💬 Need Help?

If something isn't working, check `HOW_TO_CUSTOMIZE.md` for common issues and step-by-step guidance.

Feel free to ask me any questions on itch.io or gumroad!
