document.addEventListener('DOMContentLoaded', function() {
    // ═══════════════════════════════════════════════════════════════
    // RPG WORLD WIKI TEMPLATE — locations.js
    // ═══════════════════════════════════════════════════════════════
    //
    // HOW TO ADD LOCATIONS:
    //   1. Copy one of the example objects below
    //   2. Fill in all the fields
    //   3. For images: place your map/location image in /images/maps/
    //      and set image: "../images/maps/your-file.webp"
    //   4. Save — the page updates automatically
    //
    // FIELDS EXPLAINED:
    //   id          — unique number, never repeat
    //   name        — location name
    //   region      — must match one of your region keys (see map.js)
    //   type        — "city" | "town" | "wilderness" | "dungeon" | "ruin"
    //   description — short text shown on the card (1-2 sentences)
    //   image       — path to a map or location image
    //   population  — e.g. "12,000" or "Unknown" or "0"
    //   ruler       — who controls this location
    //   danger      — "Low" | "Medium" | "High" | "Extreme"
    //   tags        — array of keyword tags for searching
    //   details     — object with history, notable, factions fields
    //
    // REGION KEYS: these must match what you define in map.js
    //   Use lowercase, no accents (e.g. "northern_reach", "deadlands")
    // ═══════════════════════════════════════════════════════════════

    const locations = [
        {
            id: 1,
            name: "[City Name]",
            region: "region_one",
            type: "city",
            description: "A short description of this city. What is it known for? Who lives here?",
            image: "../images/maps/placeholder-city.webp",
            population: "50,000",
            ruler: "[Ruler Name or Council]",
            danger: "Low",
            tags: ["Capital", "Magic", "Trade"],
            details: {
                history: "The longer history of this city. How was it founded? What significant events happened here?",
                notable: "Notable landmarks, temples, or points of interest in this location.",
                factions: ["[Faction 1]", "[Faction 2]", "[Faction 3]"]
            }
        },
        {
            id: 2,
            name: "[Wilderness Area]",
            region: "region_two",
            type: "wilderness",
            description: "A dangerous stretch of untamed land. Few who enter return unchanged.",
            image: "../images/maps/placeholder-wild.webp",
            population: "0",
            ruler: "None",
            danger: "High",
            tags: ["Forest", "Dangerous", "Mystical"],
            details: {
                history: "The history or legend surrounding this wilderness area.",
                notable: "What makes this place notable — ruins, magical anomalies, rare creatures?",
                factions: ["[Local Tribe]", "[Monster Faction]"]
            }
        },
        {
            id: 3,
            name: "[Dungeon Name]",
            region: "region_three",
            type: "dungeon",
            description: "An ancient ruin rumoured to hold forgotten treasures — and forgotten horrors.",
            image: "../images/maps/placeholder-dungeon.webp",
            population: "Unknown",
            ruler: "[Ancient Lich / Nobody / Boss Monster]",
            danger: "Extreme",
            tags: ["Ancient", "Ruins", "Undead"],
            details: {
                history: "Who built this place? Why was it abandoned? What dark history does it carry?",
                notable: "The famous rooms, traps, or treasures associated with this dungeon.",
                factions: ["[Undead Legion]", "[Ruin Raiders Guild]"]
            }
        },
        {
            id: 4,
            name: "[Town Name]",
            region: "region_four",
            type: "town",
            description: "A quiet town on the edge of civilisation. Friendly folk, but haunted by old secrets.",
            image: "../images/maps/placeholder-town.webp",
            population: "3,500",
            ruler: "[Mayor / Sheriff]",
            danger: "Low",
            tags: ["Town", "Trade", "Frontier"],
            details: {
                history: "Founded by settlers three generations ago, this town has grown steadily despite its remote location.",
                notable: "The Old Mill, The Crow's Nest Inn, The Sealed Well",
                factions: ["[Town Guard]", "[Merchant Circle]"]
            }
        }
        // ✏️ Add more locations here. Don't forget the comma after each entry!
    ];


    // DOM Elements
    const locationsGrid = document.getElementById('locationsGrid');
    const locationSearch = document.getElementById('locationSearch');
    const searchBtn = document.getElementById('searchBtn');
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const regionCards = document.querySelectorAll('.region-card');
    const locationModal = document.getElementById('locationModal');
    const closeModal = document.querySelector('.close-modal');
    const modalBody = document.getElementById('modalBody');

    // State
    let currentFilter = 'all';
    let currentRegion = null;
    let currentView = 'grid';

    // Initialize
    renderLocations(locations);

    // Event Listeners

    // Filter by region
    regionCards.forEach(card => {
        card.addEventListener('click', function() {
            const region = this.dataset.region;
            
            // Toggle region selection
            if (currentRegion === region) {
                currentRegion = null;
                this.style.opacity = '1';
            } else {
                currentRegion = region;
                regionCards.forEach(c => c.style.opacity = '0.5');
                this.style.opacity = '1';
                
            }
            
            filterLocations();
        });
    });

    // Search functionality
    searchBtn.addEventListener('click', performSearch);
    locationSearch.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = locationSearch.value.toLowerCase().trim();
        if (searchTerm === '') {
            renderLocations(locations);
            return;
        }

        const filtered = locations.filter(location => 
            location.name.toLowerCase().includes(searchTerm) ||
            location.description.toLowerCase().includes(searchTerm) ||
            location.region.includes(searchTerm)
        );

        renderLocations(filtered);
    }

    // View toggle — only runs if buttons exist (add the HTML buttons if you want this feature)
    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener('click', function() {
            if (currentView !== 'grid') {
                currentView = 'grid';
                locationsGrid.classList.remove('list-view');
                gridViewBtn.classList.add('active');
                listViewBtn.classList.remove('active');
            }
        });

        listViewBtn.addEventListener('click', function() {
            if (currentView !== 'list') {
                currentView = 'list';
                locationsGrid.classList.add('list-view');
                listViewBtn.classList.add('active');
                gridViewBtn.classList.remove('active');
            }
        });
    }

    // Modal
    document.addEventListener('click', function(e) {
    // Check if we clicked the close button or its children
            if (e.target.closest('.close-modal')) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Close button clicked!');
                locationModal.style.display = 'none';
                document.body.style.overflow = ''; // Re-enable body scroll if needed
        }
    }, true); // true = use capture phase

    // Backdrop click (click outside modal content)
    locationModal.addEventListener('click', function(e) {
        // Only close if clicking the dark background, not the content box
        if (e.target === locationModal) {
            console.log('Backdrop clicked!');
            locationModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && locationModal.style.display === 'block') {
            locationModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });


    // Functions
    function filterLocations() {
        let filtered = locations;
        
        // Apply type filter
        if (currentFilter !== 'all') {
            filtered = filtered.filter(location => location.type === currentFilter);
        }
        
        // Apply region filter
        if (currentRegion) {
            filtered = filtered.filter(location => location.region === currentRegion);
        }
        
        renderLocations(filtered);
    }

    function renderLocations(locationsArray) {
    locationsGrid.innerHTML = '';

    const existingBtn = document.querySelector('.show-more-btn');
    if (existingBtn) existingBtn.remove();
    
    if (locationsArray.length === 0) {
        locationsGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-map-marked-alt fa-3x"></i>
                <h3>No results found</h3>
                <p>Try a different search or filter</p>
            </div>
        `;
        return;
    }

    const initialCount = 3;
    
    locationsArray.forEach((location, index) => {
        const card = createLocationCard(location, index);
        if (index >= initialCount) {
            card.classList.add('hidden-card');
        }
        locationsGrid.appendChild(card);
    });

    // Add show more button if there are more than initialCount
    if (locationsArray.length > initialCount) {
        const showMoreBtn = document.createElement('button');
        showMoreBtn.className = 'show-more-btn';
        showMoreBtn.innerHTML = `<i class="fas fa-chevron-down"></i> See all (${locationsArray.length - initialCount} more)`;
        showMoreBtn.addEventListener('click', function() {
            const hidden = locationsGrid.querySelectorAll('.hidden-card');
            if (hidden.length > 0) {
                hidden.forEach(card => card.classList.remove('hidden-card'));
                this.innerHTML = `<i class="fas fa-chevron-up"></i> See less`;
            } else {
                locationsArray.slice(initialCount).forEach((_, i) => {
                    locationsGrid.children[initialCount + i].classList.add('hidden-card');
                });
                this.innerHTML = `<i class="fas fa-chevron-down"></i> See all (${locationsArray.length - initialCount} more)`;
                locationsGrid.scrollIntoView({ behavior: 'smooth' });
            }
        });
        locationsGrid.after(showMoreBtn);
    }
}

    function createLocationCard(location, delayIndex) {
        const card = document.createElement('div');
        card.className = 'location-card';
        card.style.animationDelay = `${delayIndex * 0.1}s`;
        

        // Type icon
        const typeIcons = {
            city: 'fa-city',
            wilderness: 'fa-tree',
            dungeon: 'fa-dungeon',
            town: 'fa-home',
            ruin: 'fa-monument'
        };
        
        // Region colors
        const regionColors = {
            region_one: '#6e2f8bff',
            region_two: '#aec9ddff',
            region_four: '#ed8936',
            region_three: '#48bb78'
        };
        
        card.style.setProperty('--region-color', regionColors[location.region] || '#fbbf24');
        
        card.innerHTML = `
            <div class="location-image" style="background-image: url('${location.image}')">
                <span class="location-type"><i class="fas ${typeIcons[location.type]}"></i> ${location.type.charAt(0).toUpperCase() + location.type.slice(1)}</span>
            </div>
            <div class="location-content">
                <div class="location-header">
                    <div>
                        <h3 class="location-title">${location.name}</h3>
                        <p class="location-region" style="color: ${regionColors[location.region]}">
                            <i class="fas fa-map-pin"></i> ${location.region.charAt(0).toUpperCase() + location.region.slice(1)}
                        </p>
                    </div>
                </div>
                <p class="location-desc">${location.description}</p>
                <div class="location-details">
                    <div class="detail-item">
                        <i class="fas fa-users"></i>
                        <span>${location.population}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-crown"></i>
                        <span>${location.ruler}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Danger ${location.danger}</span>
                    </div>
                </div>
                <div class="location-footer">
                    <button class="view-details" data-id="${location.id}">
                        <i class="fas fa-eye"></i> Details
                    </button>
                </div>
            </div>
        `;
        
        // Add click event for details button
        card.querySelector('.view-details').addEventListener('click', function() {
            showLocationDetails(location.id);
        });
        
        return card;
    }

    function showLocationDetails(locationId) {
        const location = locations.find(loc => loc.id === locationId);
        if (!location) return;
        
        const regionColors = {
            region_one: '#a0aec0',
            region_four: '#63b3ed',
            region_two: '#ed8936',
            region_three: '#48bb78'
        };
        
        const typeIcons = {
            city: 'fa-city',
            wilderness: 'fa-tree',
            dungeon: 'fa-dungeon',
            town: 'fa-home',
            ruin: 'fa-monument'
        };
        
        modalBody.innerHTML = `
            <div class="location-modal-content">
                <div class="modal-header">
                    <h2>${location.name}</h2>
                    <div class="modal-subtitle">
                        <span class="modal-type" style="background: ${regionColors[location.region]}">
                            <i class="fas ${typeIcons[location.type]}"></i> ${location.type.toUpperCase()}
                        </span>
                        <span class="modal-region">
                            <i class="fas fa-map-marker-alt"></i> Região ${location.region.charAt(0).toUpperCase() + location.region.slice(1)}
                        </span>
                    </div>
                </div>
                
                <div class="modal-image" style="background-image: url('${location.image}')"></div>
                
                <div class="modal-body-content">
                    <div class="modal-row">
                        <div class="modal-col">
                            <h3><i class="fas fa-scroll"></i> Description</h3>
                            <p>${location.description}</p>
                        </div>
                        <div class="modal-col">
                            <h3><i class="fas fa-info-circle"></i> Quick Facts</h3>
                            <div class="facts-grid">
                                <div class="fact">
                                    <i class="fas fa-users"></i>
                                    <div>
                                        <strong>Population</strong>
                                        <p>${location.population}</p>
                                    </div>
                                </div>
                                <div class="fact">
                                    <i class="fas fa-crown"></i>
                                    <div>
                                        <strong>Rulers</strong>
                                        <p>${location.ruler}</p>
                                    </div>
                                </div>
                                <div class="fact">
                                    <i class="fas fa-exclamation-triangle"></i>
                                    <div>
                                        <strong>Danger</strong>
                                        <p>${location.danger}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-section">
                        <h3><i class="fas fa-landmark"></i> History</h3>
                        <p>${location.details.history}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h3><i class="fas fa-star"></i> Characteristics</h3>
                        <p>${location.details.notable}</p>
                    </div>
                    
                    <div class="modal-section">
                        <h3><i class="fas fa-flag"></i> Factions & Groups</h3>
                        <p>${location.details.factions.join(', ')}</p>
                    </div>
                    
                </div>
            </div>
        `;
        
        // Add some modal styles
        const modalStyles = document.createElement('style');
        modalStyles.textContent = `
            .location-modal-content {
                color: var(--text-light);
            }
            
            .modal-header {
                margin-bottom: 2rem;
            }
            
            .modal-header h2 {
                color: var(--accent-light);
                font-size: 2.5rem;
                margin-bottom: 0.5rem;
            }
            
            .modal-subtitle {
                display: flex;
                gap: 1rem;
                align-items: center;
            }
            
            .modal-type {
                background: var(--accent-dark);
                color: white;
                padding: 0.3rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: bold;
            }
            
            .modal-region {
                color: var(--text-muted);
            }
            
            .modal-image {
                height: 300px;
                background-size: cover;
                background-position: center;
                border-radius: var(--border-radius);
                margin-bottom: 2rem;
            }
            
            .modal-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 2rem;
                margin-bottom: 2rem;
            }
            
            .modal-section {
                margin-bottom: 2rem;
                padding-bottom: 1rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .modal-section h3 {
                color: var(--accent-light);
                margin-bottom: 1rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .facts-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            
            .fact {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 5px;
            }
            
            .fact i {
                color: var(--accent-dark);
                font-size: 1.5rem;
            }
            
            .modal-section ul {
                padding-left: 1.5rem;
                color: var(--text-muted);
            }
            
            .modal-section li {
                margin-bottom: 0.5rem;
            }
            
            @media (max-width: 768px) {
                .modal-row {
                    grid-template-columns: 1fr;
                }
                
                .facts-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        // Remove existing modal styles if any
        const existingStyles = document.querySelector('#modal-styles');
        if (existingStyles) existingStyles.remove();
        
        modalStyles.id = 'modal-styles';
        document.head.appendChild(modalStyles);
        
        // Show modal
        locationModal.style.display = 'block';
    }

    // Initialize with fade-in animation
    setTimeout(() => {
        document.querySelectorAll('.location-card').forEach(card => {
            card.classList.add('visible');
        });
    }, 100);

    // Console message
    console.log(`%c Locations Page Loaded! 🗺️`, 
        `color: #48bb78; font-size: 16px; font-weight: bold;`);
    console.log(`%c ${locations.length} locations ready to explore`, 
        `color: #a0aec0; font-size: 14px;`);
});