// ═══════════════════════════════════════════════════════════════
// RPG WORLD WIKI TEMPLATE — characters.js
// ═══════════════════════════════════════════════════════════════
//
// HOW TO ADD CHARACTERS:
//   1. Copy one of the example objects below
//   2. Fill in all the fields
//   3. For images: place your file in /images/personagens/
//      and set image: "/images/personagens/your-file.webp"
//      OR use a placeholder: "https://placehold.co/400x600/1e293b/fbbf24?text=Name"
//   4. Save the file — the page updates automatically
//
// FIELDS EXPLAINED:
//   id        — unique number, never repeat across PCs AND NPCs
//   name      — character's name
//   race      — e.g. "Human", "Elf", "Dwarf", "Tiefling"
//   class     — e.g. "Fighter", "Wizard", "Rogue"
//   excerpt   — 1 short sentence shown on the card
//   backstory — full backstory shown in the modal (can be long)
//   image     — path to portrait image
//   player    — (PC only) the real name of the player
//   faction   — group or faction the character belongs to
//   status    — "Active" | "Deceased" | "Missing"
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function () {

    // ─────────────────────────────────────────────
    // STATUS CONFIG — controls badge color and icon
    // Add new statuses here if you need them.
    // ─────────────────────────────────────────────
    const statusConfig = {
        "Active":   { color: '#2ecc71', icon: 'fa-heart' },
        "Deceased": { color: '#e74c3c', icon: 'fa-skull' },
        "Missing":  { color: '#f39c12', icon: 'fa-question-circle' },
        "Retired":  { color: '#95a5a6', icon: 'fa-door-open' }
    };

    // ─────────────────────────────────────────────
    // PLAYER CHARACTERS (PCs)
    // These are the adventurers played by your group.
    // ─────────────────────────────────────────────
    const playerCharacters = [
        {
            id: 1,
            name: "Adon Pakhnes",
            race: "Elfo das neves",
            class: "Mago",
            excerpt: "A short, punchy sentence that sums up who this character is.",
            backstory: "Write the full backstory here. This appears in the character modal when a visitor clicks 'View'. It can be as long as you like.",
            image: "/images/personagens/Adon%20e%20Balladur.jpeg",
            player: "Gabrix",
            faction: "[Faction or Party Name]",
            status: "Active"
        },
        {
            id: 2,
            name: "[PC Name 2]",
            race: "[Race]",
            class: "[Class]",
            excerpt: "Another short summary sentence for the card.",
            backstory: "Full backstory for this character.",
            image: "https://placehold.co/400x600/1e293b/fbbf24?text=Character+2",
            player: "[Player Name]",
            faction: "Guilda do Exterminio do Norte",
            status: "Active"
        }
        // ✏️ Add more player characters here, following the same format.
        // Remember to increment the id number each time!
    ];

    // ─────────────────────────────────────────────
    // NON-PLAYER CHARACTERS (NPCs)
    // Important figures who appear in your campaigns.
    // ─────────────────────────────────────────────
    const npcCharacters = [
        {
            id: 101,
            name: "Vicent Karendeniz",
            race: "Humano",
            class: "Capitão pirata",
            excerpt: "A villain, ally, or mysterious stranger — one sentence about them.",
            backstory: "Full backstory or description for this NPC.",
            image: "/images/personagens/Placeholder.webp",
            faction: "VictoriaShip",
            status: "Active"
        },
        {
            id: 102,
            name: "[NPC Name 2]",
            race: "[Race]",
            class: "[Role]",
            excerpt: "Short description of this NPC's role in the world.",
            backstory: "Full description here.",
            image: "https://placehold.co/400x600/1e293b/fbbf24?text=NPC+2",
            faction: "[Faction]",
            status: "Deceased"
        }
        // ✏️ Add more NPCs here. NPC ids should be clearly separate
        // from PC ids to avoid collisions — starting at 101 is a good convention.
    ];

    // ═══════════════════════════════════════════════
    // ↓↓ You don't need to edit anything below here ↓↓
    // ═══════════════════════════════════════════════

    const pcGrid              = document.getElementById('pcGrid');
    const npcGrid             = document.getElementById('npcGrid');
    const characterModal      = document.getElementById('characterModal');
    const closeCharacterModal = document.getElementById('closeCharacterModal');
    const characterModalBody  = document.getElementById('characterModalBody');

    renderGrid(playerCharacters, pcGrid, 'pc');
    renderGrid(npcCharacters, npcGrid, 'npc');

    function renderGrid(characters, grid, type) {
        grid.innerHTML = '';

        if (characters.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                    <i class="fas fa-user-slash fa-3x" style="color: var(--accent-purple); display: block; margin-bottom: 1rem;"></i>
                    <p>No characters added yet.</p>
                </div>`;
            return;
        }

        const sorted = [...characters].sort((a, b) => a.name.localeCompare(b.name));

        sorted.forEach((character, index) => {
            const card = createCard(character, type, index);
            grid.appendChild(card);
        });

        setTimeout(() => {
            grid.querySelectorAll('.character-card').forEach(card => {
                card.style.animationPlayState = 'running';
            });
        }, 50);
    }

    function createCard(character, type, index) {
        const status = statusConfig[character.status] || statusConfig["Active"];

        const card = document.createElement('div');
        card.className = 'character-card';
        card.style.animationDelay = `${index * 0.08}s`;
        card.style.animationPlayState = 'paused';
        card.style.setProperty('--status-color', status.color);

        const badgeClass = type === 'pc' ? 'badge-pc' : 'badge-npc';
        const badgeLabel = type === 'pc' ? 'PC' : 'NPC';

        const footerLeft = type === 'pc'
            ? `<span class="character-player"><i class="fas fa-gamepad"></i> ${character.player}</span>`
            : `<span class="character-player"><i class="fas fa-flag"></i> ${character.faction || '—'}</span>`;

        card.innerHTML = `
            <div class="character-portrait" style="background-image: url('${character.image}')">
                <span class="character-type-badge ${badgeClass}">${badgeLabel}</span>
            </div>
            <div class="character-card-body">
                <h3 class="character-name">${character.name}</h3>
                <p class="character-race-class">
                    <i class="fas fa-hat-wizard"></i>
                    ${character.race} • ${character.class}
                </p>
                <p class="character-excerpt">${character.excerpt}</p>
                <div class="character-card-footer">
                    ${footerLeft}
                    <button class="character-view-btn" data-id="${character.id}" data-type="${type}">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </div>`;

        card.querySelector('.character-view-btn').addEventListener('click', () => openModal(character.id, type));
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.character-view-btn')) openModal(character.id, type);
        });

        return card;
    }

    function openModal(id, type) {
        const list = type === 'pc' ? playerCharacters : npcCharacters;
        const character = list.find(c => c.id === id);
        if (!character) return;

        const status     = statusConfig[character.status] || statusConfig["Active"];
        const badgeClass = type === 'pc' ? 'badge-pc' : 'badge-npc';
        const badgeLabel = type === 'pc' ? 'Player Character' : 'Important NPC';

        const playerSection = type === 'pc' ? `
            <div class="modal-info-section">
                <h3><i class="fas fa-gamepad"></i> Player</h3>
                <div class="modal-player-box">
                    <i class="fas fa-user"></i>
                    <span>${character.player}</span>
                </div>
            </div>` : '';

        const factionSection = character.faction ? `
            <div class="modal-info-section">
                <h3><i class="fas fa-flag"></i> Faction / Group</h3>
                <p>${character.faction}</p>
            </div>` : '';

        characterModalBody.innerHTML = `
            <div class="modal-portrait-col" style="background-image: url('${character.image}')">
                <div class="modal-portrait-info">
                    <span class="modal-portrait-badge ${badgeClass}">${badgeLabel}</span>
                    <h2 class="modal-character-name">${character.name}</h2>
                    <p class="modal-race-class">
                        <i class="fas fa-hat-wizard"></i>
                        ${character.race} • ${character.class}
                    </p>
                </div>
            </div>
            <div class="modal-info-col">
                <div class="modal-info-section">
                    <h3><i class="fas fa-circle" style="color:${status.color};font-size:0.7rem;"></i> Status</h3>
                    <p style="color:${status.color};font-weight:500;">
                        <i class="fas ${status.icon}"></i> ${character.status}
                    </p>
                </div>
                <div class="modal-info-section">
                    <h3><i class="fas fa-scroll"></i> Story</h3>
                    <p>${character.backstory || character.excerpt}</p>
                </div>
                ${playerSection}
                ${factionSection}
            </div>`;

        characterModal.style.display = 'block';
        characterModal.scrollTop = 0;
    }

    closeCharacterModal.addEventListener('click', () => {
        characterModal.style.display = 'none';
    });

    characterModal.addEventListener('click', function (e) {
        if (e.target === characterModal) characterModal.style.display = 'none';
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && characterModal.style.display === 'block') {
            characterModal.style.display = 'none';
        }
    });

});
