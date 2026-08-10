document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // LORE DATA
    // EXPLANATION: Each story is an object in this array.
    // To add a new story, just copy one object and fill in the fields.
    // Fields:
    /*
       id: "",
       title: "",
       category:"history", "legend", "chronicle", "myth", "prophecy"
       excerpt: "",
       fullText: [
            "",
       ]
       author: "",
       readTime:
    */
    // =============================================
    const loreEntries = [
        // ✏️ EXAMPLE ENTRY — copy this block and fill in your own lore
        {
            id: 1,
            title: "[Story Title]",
            // category options: "history" | "legend" | "chronicle" | "myth" | "prophecy"
            category: "history",
            excerpt: "A short 1-2 sentence teaser shown on the lore card. Make it intriguing.",
            fullText: [
                // Each string in this array is one paragraph.
                // Split your text into paragraphs for readability.
                "First paragraph of the full story goes here. This is shown when the reader clicks to expand.",
                "Second paragraph. You can have as many paragraphs as you need.",
                "Third paragraph. Each string becomes its own paragraph in the modal view."
            ],
            author: "[Author Name]",
            readTime: 3  // estimated reading time in minutes
        },
        {
            id: 2,
            title: "[Legend Title]",
            category: "legend",
            excerpt: "A mysterious legend passed down through generations in your world.",
            fullText: [
                "Full text of the legend here.",
                "Continue the story across as many paragraphs as you need."
            ],
            author: "[Author Name]",
            readTime: 2
        }
        // ✏️ Add more lore entries here following the same pattern.
        // ⚠️  Each entry needs a unique id — never repeat an id!
        // ⚠️  Don't forget to add a comma after each entry except the last one.
    ];

    const categoryConfig = {
        history:  { label: 'History',  color: '#e07b39', icon: 'fa-scroll' },
        legend:     { label: 'Legends',     color: '#f0c040', icon: 'fa-star' },
        chronicle:   { label: 'Chronicle',   color: '#5b9bd5', icon: 'fa-feather-alt' },
        myth:      { label: 'Myths',      color: '#9b59b6', icon: 'fa-dragon' },
        prophecy:  { label: 'Prophecies',  color: '#2ecc71', icon: 'fa-book' }
    };

    // =============================================
    // DOM ELEMENTS
    // =============================================
    const loreGrid        = document.getElementById('loreGrid');
    const loreSearch      = document.getElementById('loreSearch');
    const loreSearchBtn   = document.getElementById('loreSearchBtn');
    const filterTags      = document.querySelectorAll('.filter-tag');
    const loreModal       = document.getElementById('loreModal');
    const closeLoreModal  = document.getElementById('closeLoreModal');
    const loreModalBody   = document.getElementById('loreModalBody');

    // State
    let currentFilter = 'all';

   
    renderEntries(loreEntries);

   
    filterTags.forEach(tag => {
        tag.addEventListener('click', function () {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            filterEntries();
        });
    });

    
    loreSearchBtn.addEventListener('click', performSearch);
    loreSearch.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') performSearch();
    });

    function performSearch() {
        const term = loreSearch.value.toLowerCase().trim();
        if (term === '') {
            renderEntries(loreEntries);
            return;
        }
        const filtered = loreEntries.filter(entry =>
            entry.title.toLowerCase().includes(term) ||
            entry.excerpt.toLowerCase().includes(term) ||
            entry.category.includes(term) ||
            entry.author.toLowerCase().includes(term)
        );
        renderEntries(filtered);
    }

    function filterEntries() {
        let filtered = loreEntries;
        if (currentFilter !== 'all') {
            filtered = filtered.filter(e => e.category === currentFilter);
        }
        renderEntries(filtered);
    }

   
    function renderEntries(entries) {
        loreGrid.innerHTML = '';

        // Remove any leftover show-more button
        const existingBtn = document.querySelector('.show-more-btn');
        if (existingBtn) existingBtn.remove();

        if (entries.length === 0) {
            loreGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-book fa-3x"></i>
                    <h3>No results found</h3>
                    <p>Try a different search or category</p>
                </div>
            `;
            return;
        }

        const initialCount = 3;

        entries.forEach((entry, index) => {
            const card = createCard(entry, index);
            if (index >= initialCount) {
                card.classList.add('hidden-card');
            }
            loreGrid.appendChild(card);
        });

            // Trigger fade-in only for visible cards
            setTimeout(() => {
                loreGrid.querySelectorAll('.lore-card:not(.hidden-card)').forEach(card => {
                    card.style.animationPlayState = 'running';
                });
            }, 50);

        // Show more button
        if (entries.length > initialCount) {
            const btn = document.createElement('button');
            btn.className = 'show-more-btn';
            btn.innerHTML = `<i class="fas fa-chevron-down"></i> See all (${entries.length - initialCount} mais)`;
            btn.addEventListener('click', function () {
                const hidden = loreGrid.querySelectorAll('.hidden-card');
                if (hidden.length > 0) {
                    hidden.forEach(card => {
                        card.classList.remove('hidden-card');
                    });
                    this.innerHTML = `<i class="fas fa-chevron-up"></i> See less`;
                } else {
                    Array.from(loreGrid.children).slice(initialCount).forEach(card => {
                        card.classList.add('hidden-card');
                    });
                    this.innerHTML = `<i class="fas fa-chevron-down"></i> See all (${entries.length - initialCount} mais)`;
                    loreGrid.scrollIntoView({ behavior: 'smooth' });
                }
            });
            loreGrid.after(btn);
        }
    }

   
    function createCard(entry, index) {
        const config = categoryConfig[entry.category] || { label: entry.category, color: '#8b5cf6', icon: 'fa-book' };

        const card = document.createElement('div');
        card.className = 'lore-card';
        card.style.borderLeftColor = config.color;
        card.style.animationDelay = `${index * 0.08}s`;

        card.innerHTML = `
            <div class="lore-card-header">
                <span class="lore-category-tag" style="background: ${config.color}22; color: ${config.color}; border: 1px solid ${config.color}55;">
                    <i class="fas ${config.icon}"></i> ${config.label}
                </span>
                <span class="lore-read-time">
                    <i class="fas fa-clock"></i> ${entry.readTime} min
                </span>
            </div>
            <h3 class="lore-card-title">${entry.title}</h3>
            <p class="lore-card-excerpt">${entry.excerpt}</p>
            <div class="lore-card-footer">
                <span class="lore-card-author">
                    <i class="fas fa-feather-alt"></i> ${entry.author}
                </span>
                <button class="lore-read-btn" data-id="${entry.id}">
                    <i class="fas fa-book-open"></i> Read more
                </button>
            </div>
        `;

        card.querySelector('.lore-read-btn').addEventListener('click', () => {
            openModal(entry.id);
        });

        return card;
    }

  
    function openModal(id) {
        const entry = loreEntries.find(e => e.id === id);
        if (!entry) return;

        const config = categoryConfig[entry.category] || { label: entry.category, color: '#8b5cf6', icon: 'fa-book' };

        const paragraphs = entry.fullText
            .map(p => {
                if (p.startsWith('img:')) {
                    const src = p.replace('img:', '');
                    return `<img class="lore-inline-image" src="${src}" alt="">`;
                }
                return `<p>${p}</p>`;
                })
            .join('');

        loreModalBody.innerHTML = `
            <div class="lore-modal-header" style="--modal-accent: ${config.color}">
                <span class="lore-modal-category" style="background: ${config.color}22; color: ${config.color}; border: 1px solid ${config.color}55;">
                    <i class="fas ${config.icon}"></i> ${config.label}
                </span>
                <h2 class="lore-modal-title">${entry.title}</h2>
                <div class="lore-modal-meta">
                    <span><i class="fas fa-feather-alt"></i> ${entry.author}</span>
                    <span><i class="fas fa-clock"></i> ${entry.readTime} min of reading</span>
                </div>
            </div>
            <div class="lore-modal-text">
                <div class="lore-story-body">
                    ${paragraphs}
                </div>
            </div>
        `;

        // Apply the gradient top bar colour dynamically
        const header = loreModalBody.querySelector('.lore-modal-header');
        header.style.setProperty('--modal-accent', config.color);
        header.style.borderTop = `4px solid ${config.color}`;

        loreModal.style.display = 'block';
        // Scroll modal to top in case a previous entry was scrolled down
        loreModal.scrollTop = 0;
    }

    // Close modal
    closeLoreModal.addEventListener('click', () => {
        loreModal.style.display = 'none';
    });

    loreModal.addEventListener('click', function (e) {
        if (e.target === loreModal) {
            loreModal.style.display = 'none';
        }
    });

    // Close modal with Esc
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && loreModal.style.display === 'block') {
            loreModal.style.display = 'none';
        }
    });

    // Check if a filter was passed in the URL (e.g. ?filter=legend or ?open=1)
    const urlParams = new URLSearchParams(window.location.search);

        const urlFilter = urlParams.get('filter');
            if (urlFilter) {
            const matchingTag = document.querySelector(`.filter-tag[data-filter="${urlFilter}"]`);
            if (matchingTag) matchingTag.click();
        }

        const urlOpen = urlParams.get('open');
            if (urlOpen) {
            const id = parseInt(urlOpen);
            document.querySelectorAll('.hidden-card').forEach(c => {
                c.classList.remove('hidden-card');
            });
            openModal(id);
        }

    console.log(`%c Lore Page Loaded! 📖`, `color: #fbbf24; font-size: 16px; font-weight: bold;`);
    console.log(`%c ${loreEntries.length} entries in the archives`, `color: #94a3b8; font-size: 14px;`);
});