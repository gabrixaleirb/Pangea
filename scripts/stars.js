// ═══════════════════════════════════════════════════════════════
// RPG WORLD WIKI TEMPLATE — stars.js
// ═══════════════════════════════════════════════════════════════
//
// HOW TO ADD CONSTELLATIONS:
//   1. Copy one of the example objects below
//   2. Fill in name and description
//   3. For images: place your constellation art in /images/stars/
//      and set image: "../images/stars/your-file.webp"
//      OR use a placeholder URL
//   4. Save — the page updates automatically
//
// FIELDS EXPLAINED:
//   id          — unique number, never repeat
//   name        — constellation name
//   description — the legend or lore behind this constellation
//   image       — path to the constellation image/icon
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

  const stars = [
    {
      id: 1,
      name: "[Constellation Name]",
      description: "The legend behind this constellation. Who does it represent? What myth does it tell? What do sailors or farmers use it for?",
      image: "https://placehold.co/120x120/0f172a/fbbf24?text=★"
    },
    {
      id: 2,
      name: "[Constellation Name 2]",
      description: "Another constellation and its lore. Perhaps a god's symbol, a fallen hero, or a warning sign in the sky.",
      image: "https://placehold.co/120x120/0f172a/8b5cf6?text=★"
    },
    {
      id: 3,
      name: "[Constellation Name 3]",
      description: "A third constellation. The three-constellation minimum ensures the page layout looks correct.",
      image: "https://placehold.co/120x120/0f172a/fbbf24?text=★"
    }
    // ✏️ Add more constellations here. Don't forget the comma after each entry!
  ];

  //==============================================
  //DOM ELEMENTS
  //==============================================
  const starsGrid = document.getElementById('starsGrid');

  //==============================================
  //RENDER STARS
  //==============================================
  renderStars(stars);

  function renderStars(starsArray) {
    starsGrid.innerHTML = ''; // Clear existing content

    starsArray.forEach((star, index) => {
      const card = createStarCard(star, index);
      starsGrid.appendChild(card);

    });
    // Trigger fade-in only for visible cards
      setTimeout(() => {
          starsGrid.querySelectorAll('.star-card:not(.hidden-card)').forEach(card => {
              card.style.animationPlayState = 'running';
          });
      }, 50);
  }

  function createStarCard(star, delayIndex) {
    const card = document.createElement('div');
    card.className = 'star-card';
    card.style.animationDelay = `${delayIndex * 0.1}s`;

    card.innerHTML = `
      <div class="star-image" style="background-image: url('${star.image}');">
      </div>
      <div class="star-content">
        <div class="star-header">
          <h3 class="star-name">${star.name}</h3>
          </div>
          <div class="star-divider"></div>
          <p class="star-description">${star.description}</p>
      </div>
    `;
    return card;
  }

  // Console message
    console.log(`%c Stars Page Loaded! 🌟`, 
        `color: #48bb78; font-size: 16px; font-weight: bold;`);
    console.log(`%c ${stars.length} stars ready to explore`, 
        `color: #a0aec0; font-size: 14px;`);

});
