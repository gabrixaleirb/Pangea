// dangers.js — Fauna & Flora page

document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // TYPE CONFIG
    // =============================================
    const typeConfig = {
        fauna:   { label: 'Fauna',    color: '#e07b39', icon: 'fa-paw' },
        flora:   { label: 'Flora',    color: '#2ecc71', icon: 'fa-leaf' },
        fungi:   { label: 'Fungi',    color: '#9b59b6', icon: 'fa-seedling' },
        monster: { label: 'Monster',  color: '#e74c3c', icon: 'fa-skull' }
    };

    // =============================================
    // DANGER CONFIG
    // =============================================
    const dangerConfig = {
        inoffensive: { label: 'Inoffensive', color: '#2ecc71' },
        low:         { label: 'Low',      color: '#27ae60' },
        medium:       { label: 'Medium',      color: '#f39c12' },
        high:        { label: 'High',       color: '#e67e22' },
        extreme:     { label: 'Extreme',    color: '#e74c3c' }
    };

    // =============================================
    // BESTIARY DATA
    // Fields:
    //   id          unique number, never repeat
    //   name        creature/plant name
    //   type        fauna | flora | fungi | monster
    //   danger      inoffensive | low | medium | high | extreme
    //   region      where it's found
    //   description short text shown on the card (1-2 sentences)
    //   fullDesc    full lore text shown in modal
    //   diet        what it eats / how it feeds (fauna/monster)
    //                 for flora/fungi use this for growth conditions
    //   behaviour   how it acts / what to watch out for
    //   image       
    // =============================================
    const entries = [
        // ═══════════════════════════════════════════════════════════════
        // RPG WORLD WIKI TEMPLATE — Bestiary / Fauna & Flora Entries
        // ═══════════════════════════════════════════════════════════════
        //
        // HOW TO ADD ENTRIES:
        //   1. Copy one of the example objects below
        //   2. Fill in all fields
        //   3. Place images in /images/bestiary/ (create this folder)
        //      OR use a placeholder image URL
        //   4. Save — the page updates automatically
        //
        // FIELDS EXPLAINED:
        //   id          — unique number, never repeat
        //   name        — creature or plant name
        //   type        — "fauna" | "flora" | "fungi" | "monster"
        //   danger      — "inoffensive" | "low" | "medium" | "high" | "extreme"
        //   region      — where it's found (free text)
        //   description — short text shown on the card (1-2 sentences)
        //   fullDesc    — full lore shown in the modal
        //   diet        — what it eats / how it feeds
        //   behaviour   — how it behaves, what to watch out for
        //   image       — path to an image, or a placeholder URL
        // ═══════════════════════════════════════════════════════════════
        {
            id: 1,
            name: "[Creature Name]",
            type: "fauna",
            danger: "medium",
            region: "[Region Name]",
            description: "A brief description of this creature shown on its card. Keep it to 1-2 sentences.",
            fullDesc: "The full lore entry for this creature. Where does it live? What role does it play in the ecosystem? Any legends surrounding it?",
            diet: "What does it eat? Herbivore, carnivore, magical energy?",
            behaviour: "How does it behave toward adventurers? Territorial, curious, aggressive only when threatened?",
            image: "https://placehold.co/300x200/1e293b/fbbf24?text=Creature"
        },
        {
            id: 2,
            name: "[Plant Name]",
            type: "flora",
            danger: "low",
            region: "[Region Name]",
            description: "A rare plant found in the deep forests. Its glow makes it easy to spot — and hard to avoid.",
            fullDesc: "Full description of this plant. Is it medicinal, magical, poisonous? What legends surround it?",
            diet: "Grows in [conditions]. Thrives near [magical source / terrain type].",
            behaviour: "Passive unless disturbed. Releases spores when threatened.",
            image: "https://placehold.co/300x200/1e293b/2ecc71?text=Plant"
        },
        {
            id: 3,
            name: "[Monster Name]",
            type: "monster",
            danger: "extreme",
            region: "[Region Name]",
            description: "A legendary monster that has haunted travellers for centuries. Few survive an encounter.",
            fullDesc: "The terrifying full description of this monster. Its origin, its powers, its weaknesses — if any are known.",
            diet: "Apex predator. Feeds on [anything / specific prey].",
            behaviour: "Highly aggressive. Territorial. Drawn to magical disturbances.",
            image: "https://placehold.co/300x200/1e293b/e74c3c?text=Monster"
        }
        // ✏️ Add more entries here. Don't forget the comma after each entry!
    ];


    // =============================================
    // DOM ELEMENTS
    // =============================================
    const bestiaryGrid      = document.getElementById('bestiaryGrid');
    const bestiarySearch    = document.getElementById('bestiarySearch');
    const bestiarySearchBtn = document.getElementById('bestiarySearchBtn');
    const filterTags        = document.querySelectorAll('.filter-tag');
    const dangerTags        = document.querySelectorAll('.danger-tag');
    const bestiaryModal     = document.getElementById('bestiaryModal');
    const closeBestiaryModal= document.getElementById('closeBestiaryModal');
    const bestiaryModalBody = document.getElementById('bestiaryModalBody');

    // State
    let currentType   = 'all';
    let currentDanger = 'all';

    // =============================================
    // COLOUR DANGER TAGS
    // =============================================
    dangerTags.forEach(tag => {
        const danger = tag.dataset.danger;
        if (danger !== 'all' && dangerConfig[danger]) {
            const color = dangerConfig[danger].color;
            tag.style.borderColor = color + '55';
            tag.style.color = color;
        }
    });

    // =============================================
    // INITIALISE
    // =============================================
    renderEntries(entries);

    // =============================================
    // TYPE FILTER
    // =============================================
    filterTags.forEach(tag => {
        tag.addEventListener('click', function () {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentType = this.dataset.filter;
            applyFilters();
        });
    });

    // =============================================
    // DANGER FILTER
    // =============================================
    dangerTags.forEach(tag => {
        tag.addEventListener('click', function () {
            dangerTags.forEach(t => {
                t.classList.remove('active');
                // Reset active style
                const d = t.dataset.danger;
                if (d !== 'all' && dangerConfig[d]) {
                    t.style.background = '';
                    t.style.color = dangerConfig[d].color;
                } else {
                    t.style.background = '';
                    t.style.color = '';
                }
            });
            this.classList.add('active');
            // Highlight active danger tag with its colour
            const danger = this.dataset.danger;
            if (danger !== 'all' && dangerConfig[danger]) {
                this.style.background = dangerConfig[danger].color;
                this.style.color = '#0f172a';
            }
            currentDanger = danger;
            applyFilters();
        });
    });

    // =============================================
    // SEARCH
    // =============================================
    bestiarySearchBtn.addEventListener('click', performSearch);
    bestiarySearch.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') performSearch();
    });

    function performSearch() {
        const term = bestiarySearch.value.toLowerCase().trim();
        if (term === '') {
            applyFilters();
            return;
        }
        const filtered = entries.filter(e =>
            e.name.toLowerCase().includes(term) ||
            e.description.toLowerCase().includes(term) ||
            e.region.toLowerCase().includes(term) ||
            e.type.includes(term)
        );
        renderEntries(filtered);
    }

    // =============================================
    // APPLY BOTH FILTERS TOGETHER
    // =============================================
    function applyFilters() {
        let filtered = entries;
        if (currentType !== 'all') {
            filtered = filtered.filter(e => e.type === currentType);
        }
        if (currentDanger !== 'all') {
            filtered = filtered.filter(e => e.danger === currentDanger);
        }
        renderEntries(filtered);
    }

    // =============================================
    // RENDER
    // =============================================
    function renderEntries(bestiaryArray) {
        bestiaryGrid.innerHTML = '';

        const existingBtn = document.querySelector('.show-more-btn');
        if (existingBtn) existingBtn.remove();

        if (bestiaryArray.length === 0) {
            bestiaryGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-paw fa-3x"></i>
                    <h3>No results found</h3>
                    <p>Try a different search or filter</p>
                </div>
            `;
            return;
        }

        const initialCount = 6;

        bestiaryArray.forEach((entry, index) => {
            const card = createCard(entry, index);
            if (index >= initialCount) card.classList.add('hidden-card');
            bestiaryGrid.appendChild(card);
        });

        setTimeout(() => {
            bestiaryGrid.querySelectorAll('.bestiary-card:not(.hidden-card)').forEach(card => {
                card.style.animationPlayState = 'running';
            });
        }, 50);

        if (bestiaryArray.length > initialCount) {
            const btn = document.createElement('button');
            btn.className = 'show-more-btn';
            btn.innerHTML = `<i class="fas fa-chevron-down"></i> See all (${bestiaryArray.length - initialCount} mais)`;
            btn.addEventListener('click', function () {
                const hidden = bestiaryGrid.querySelectorAll('.hidden-card');
                if (hidden.length > 0) {
                    hidden.forEach(card => {
                        card.classList.remove('hidden-card');
                        card.style.animationPlayState = 'running';
                    });
                    this.innerHTML = `<i class="fas fa-chevron-up"></i> Ver menos`;
                } else {
                    Array.from(bestiaryGrid.children).slice(initialCount).forEach(card => {
                        card.classList.add('hidden-card');
                    });
                    this.innerHTML = `<i class="fas fa-chevron-down"></i> See all (${arr.length - initialCount} mais)`;
                    bestiaryGrid.scrollIntoView({ behavior: 'smooth' });
                }
            });
            bestiaryGrid.after(btn);
        }
    }

    // =============================================
    // CREATE CARD
    // =============================================
    function createCard(entry, index) {
        const type   = typeConfig[entry.type]   || { label: entry.type,   color: '#8b5cf6', icon: 'fa-question' };
        const danger = dangerConfig[entry.danger] || { label: entry.danger, color: '#94a3b8' };

        const card = document.createElement('div');
        card.className = 'bestiary-card';
        card.style.setProperty('--type-color', type.color);
        card.style.animationDelay = `${index * 0.07}s`;
        card.style.animationPlayState = 'paused';

        card.innerHTML = `
            <div class="bestiary-card-image" style="background-image: url('${entry.image}')">
                <span class="bestiary-type-badge" style="--type-color: ${type.color}">
                    <i class="fas ${type.icon}"></i> ${type.label}
                </span>
                <span class="bestiary-danger-badge" style="color: ${danger.color}; border: 1px solid ${danger.color}55;">
                    <i class="fas fa-exclamation-triangle"></i> ${danger.label}
                </span>
            </div>
            <div class="bestiary-card-body">
                <h3 class="bestiary-card-name">${entry.name}</h3>
                <p class="bestiary-card-region">
                    <i class="fas fa-map-pin"></i> ${entry.region}
                </p>
                <p class="bestiary-card-desc">${entry.description}</p>
                <div class="bestiary-card-footer">
                    <button class="bestiary-view-btn" data-id="${entry.id}">
                        <i class="fas fa-eye"></i> See all
                    </button>
                </div>
            </div>
        `;

        card.querySelector('.bestiary-view-btn').addEventListener('click', () => openModal(entry.id));
        card.addEventListener('click', e => {
            if (!e.target.closest('.bestiary-view-btn')) openModal(entry.id);
        });

        return card;
    }

    // =============================================
    // MODAL
    // =============================================
    function openModal(id) {
        const entry  = entries.find(e => e.id === id);
        if (!entry) return;

        const type   = typeConfig[entry.type]    || { label: entry.type,   color: '#8b5cf6', icon: 'fa-question' };
        const danger = dangerConfig[entry.danger] || { label: entry.danger, color: '#94a3b8' };

        bestiaryModalBody.innerHTML = `
            <div class="bestiary-modal-image" style="background-image: url('${entry.image}')">
                <div class="bestiary-modal-image-info">
                    <div class="bestiary-modal-badges-spacer"></div>
                    <h2 class="bestiary-modal-name">${entry.name}</h2>
                    <div class="bestiary-modal-badges">
                        <span class="bestiary-type-badge" style="--type-color: ${type.color}">
                            <i class="fas ${type.icon}"></i> ${type.label}
                        </span>
                        <span class="bestiary-danger-badge" style="color: ${danger.color}; border: 1px solid ${danger.color}55;">
                            <i class="fas fa-exclamation-triangle"></i> ${danger.label}
                        </span>
                    </div>
                </div>
            </div>

            <div class="bestiary-modal-details">
                <div class="bestiary-modal-meta">
                    <span class="bestiary-meta-item">
                        <i class="fas fa-map-pin"></i> ${entry.region}
                    </span>
                    <span class="bestiary-meta-item">
                        <i class="fas ${type.icon}" style="color: ${type.color}"></i> ${type.label}
                    </span>
                    <span class="bestiary-meta-item" style="color: ${danger.color}">
                        <i class="fas fa-exclamation-triangle"></i> Danger ${danger.label}
                    </span>
                </div>

                <div class="bestiary-modal-section">
                    <h3><i class="fas fa-scroll"></i> Description</h3>
                    <p>${entry.fullDesc}</p>
                </div>

                <div class="bestiary-modal-section">
                    <h3><i class="fas fa-utensils"></i> Diet</h3>
                    <p>${entry.diet}</p>
                </div>

                <div class="bestiary-modal-section">
                    <h3><i class="fas fa-eye"></i> Behavior</h3>
                    <p>${entry.behaviour}</p>
                </div>
            </div>
        `;

        bestiaryModal.style.display = 'block';
        bestiaryModal.scrollTop = 0;
    }

    // Close modal
    closeBestiaryModal.addEventListener('click', () => { bestiaryModal.style.display = 'none'; });
    bestiaryModal.addEventListener('click', e => { if (e.target === bestiaryModal) bestiaryModal.style.display = 'none'; });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') bestiaryModal.style.display = 'none'; });

    // URL param support — e.g. ?filter=fauna or ?open=1
    const urlParams = new URLSearchParams(window.location.search);
    const urlFilter = urlParams.get('filter');
    if (urlFilter) {
        const tag = document.querySelector(`.filter-tag[data-filter="${urlFilter}"]`);
        if (tag) tag.click();
    }
    const urlOpen = urlParams.get('open');
    if (urlOpen) {
        document.querySelectorAll('.hidden-card').forEach(c => c.classList.remove('hidden-card'));
        openModal(parseInt(urlOpen));
    }

    console.log(`%c Bestiary Loaded! 🐾`, `color: #2ecc71; font-size: 16px; font-weight: bold;`);
    console.log(`%c ${entries.length} entries in the bestiary`, `color: #94a3b8; font-size: 14px;`);
});