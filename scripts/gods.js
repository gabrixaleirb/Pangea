// ═══════════════════════════════════════════════════════════════
// RPG WORLD WIKI TEMPLATE — gods.js
// ═══════════════════════════════════════════════════════════════
//
// HOW TO ADD GODS:
//   1. Copy one of the example objects below
//   2. Fill in all fields
//   3. For god images: place files in /images/gods/ and set
//      image: "../images/gods/your-god.webp"
//      OR use a placeholder:
//      image: "https://placehold.co/200x200/1e293b/fbbf24?text=GodName"
//   4. Save — the page updates automatically
//
// FIELDS EXPLAINED:
//   id            — unique number, never repeat
//   name          — god's name
//   description   — who/what this god is; personality and followers
//   image         — path to god portrait/symbol image
//   domain        — what this god rules over (e.g. "War, Honour")
//   symbol        — the god's holy symbol
//   representative — what form does this god take (appearance)
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {

  const gods = [
    {
      id: 1,
      name: "[God Name]",
      description: "Who is this deity? What do they represent, and who worships them? What is their personality like?",
      image: "https://placehold.co/200x200/1e293b/fbbf24?text=God+1",
      domain: "[Domain 1], [Domain 2]",
      symbol: "A description of the god's holy symbol.",
      representative: "How does this god appear or manifest — animal, human form, abstract?"
    },
    {
      id: 2,
      name: "[God Name 2]",
      description: "Description of this deity's nature, worshippers, and role in your world's religion.",
      image: "https://placehold.co/200x200/1e293b/8b5cf6?text=God+2",
      domain: "[Domain 1], [Domain 2]",
      symbol: "The holy symbol of this god.",
      representative: "What form does this god take?"
    },
    {
      id: 3,
      name: "[God Name 3]",
      description: "A darker deity, perhaps — feared as much as worshipped.",
      image: "https://placehold.co/200x200/1e293b/e74c3c?text=God+3",
      domain: "[Death], [Shadow]",
      symbol: "A skull wreathed in shadow.",
      representative: "A cloaked figure whose face is never seen."
    }
    // ✏️ Add more gods here. Don't forget the comma after each entry!
  ];

  // OPTIONAL SECOND PANTHEON
  // If your world has multiple pantheons (e.g. Old Gods vs New Gods),
  // you can use this second array. The rendering engine below supports both.
  // If you only need one pantheon, leave this array empty: []
  const godsTwo = [
    {
      id: 201,
      name: "[Ancient God Name]",
      description: "An elder deity from before recorded history. Ancient and distant, worshipped by few but feared by many.",
      image: "https://placehold.co/200x200/0f172a/fbbf24?text=Ancient+God",
      domain: "[Ancient Domain 1], [Ancient Domain 2]",
      symbol: "A description of this ancient god's symbol.",
      representative: "What primordial form does this god take?"
    }
    // ✏️ Add more ancient/second-pantheon gods here
  ];

    
  //==============================================
  //DOM ELEMENTS
  //==============================================
  const godsGrid = document.getElementById('godsGrid');
  const godsGrid2 = document.getElementById('godsGrid2');
  //==============================================
  //CREATE GODS
  //==============================================
  renderGods(gods, godsGrid);
  renderGods(godsTwo, godsGrid2);

  function renderGods(godsArray, grid) {
    grid.innerHTML = ''; //clear grid

    godsArray.forEach((god, index) =>{
      const card = createGodCard(god, index);
      grid.appendChild(card);

    });

    // Trigger fade-in only for visible cards
      setTimeout(() => {
          godsGrid.querySelectorAll('.gods-card:not(.hidden-card)').forEach(card => {
              card.style.animationPlayState = 'running';
          });
      }, 50);
  }

  function createGodCard(god, delayIndex) {
    const card = document.createElement('div');
    card.className = 'gods-card';
    card.style.animationDelay = `${delayIndex * 0.1}s`;

    card.innerHTML = `
      <div class="gods-image" style="background-image: url('${god.image}');">
      </div>
      <div class="gods-content">
        <div class="gods-header">
          <h3 class="gods-name">${god.name}</h3>
        </div>
        <div class="gods-divider"></div>
          <p class="gods-description">
            ${god.description}
          </p>

          <div class="gods-detail">
            <i class="fas fa-crown"></i>
            <span>${god.domain}</span>
          </div>
          <div class="gods-detail">
            <i class="fas fa-ankh"></i>
            <span>${god.symbol}</span>
          </div>
          <div class="gods-detail">
            <i class="fas fa-person"></i>
            <span>${god.representative}</span>
          </div>
        </div>
      </div>
    `;

    return card;
  }

  // Console message
    console.log(`%c Gods Page Loaded! 👑`, 
        `color: #48bb78; font-size: 16px; font-weight: bold;`);
    console.log(`%c ${gods.length} gods ready to explore`, 
        `color: #a0aec0; font-size: 14px;`);

});