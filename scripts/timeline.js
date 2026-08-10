// timeline.js — Vertical timeline for your world's history

document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // CATEGORY CONFIG
    // Each category gets a colour applied to the card
    // top border, year text, badge, and node dot.
    // Add new categories here as needed.
    // =============================================
    const categoryConfig = {
        war:    { label: 'War',     color: '#e74c3c', icon: 'fa-fire' },
        politics:  { label: 'Politics',   color: '#0092d6', icon: 'fa-crown' },
        magic:     { label: 'Magic',      color: '#8b5cf6', icon: 'fa-hat-wizard' },
        disaster:  { label: 'Disaster',   color: '#e67e22', icon: 'fa-bolt' },
        foundation:  { label: 'Foundation',   color: '#2ecc71', icon: 'fa-landmark' },
        religion:  { label: 'Religion',   color: '#f0c040', icon: 'fa-ankh' },
        exploration:{ label: 'Exploration', color: '#1abc9c', icon: 'fa-compass' },
        discovery:   { label: 'Discovery',   color: '#9b59b6', icon: 'fa-lightbulb' }

    };

    const events = [
        // ═══════════════════════════════════════════════════════════════
        // RPG WORLD WIKI TEMPLATE — Timeline Events
        // ═══════════════════════════════════════════════════════════════
        //
        // HOW TO ADD EVENTS:
        //   1. Copy one of the example objects below
        //   2. Fill in all fields
        //   3. Keep events roughly in chronological order by year
        //   4. Save — the timeline rebuilds automatically
        //
        // FIELDS EXPLAINED:
        //   id       — unique number, never repeat
        //   year     — the in-world year (can be negative for ancient history)
        //   era      — the historical period name (groups events visually)
        //   title    — short event name shown on the timeline node
        //   summary  — 1-2 sentences shown on the timeline
        //   details  — full description shown when expanded
        //   type     — "war" | "discovery" | "politics" | "disaster" | "cultural"
        //   impact   — "low" | "medium" | "high" | "critical"
        // ═══════════════════════════════════════════════════════════════
        {
            id: 1,
            year: 1,
            era: "[Ancient Era Name]",
            title: "[World Creation / Founding Event]",
            summary: "The moment your world began — a creation myth, a great founding, or the dawn of recorded history.",
            details: "[Full description of this pivotal event. What happened? Who was involved? What changed forever?",
            type: "foundation",
            impact: "critical"
        },
        {
            id: 2,
            year: 300,
            era: "[Ancient Era Name]",
            title: "[First Great War]",
            summary: "A devastating conflict that reshaped the map of your world.",
            details: "Who fought? Why? What was the outcome? How many died? What kingdoms rose or fell?",
            type: "war",
            impact: "critical"
        },
        {
            id: 3,
            year: 800,
            era: "[Middle Era Name]",
            title: "[A Major Discovery]",
            summary: "A discovery that changed how magic, technology, or society worked in your world.",
            details: "Full description of the discovery and its consequences for your world.",
            type: "magic",
            impact: "high"
        },
        {
            id: 4,
            year: 1200,
            era: "[Middle Era Name]",
            title: "[Political Upheaval]",
            summary: "A kingdom fell. A new power rose. The balance of the world shifted.",
            details: "Describe the political event — a coup, a revolution, the death of a dynasty.",
            type: "politics",
            impact: "high"
        },
        {
            id: 5,
            year: 1800,
            era: "[Modern Era Name]",
            title: "[Recent Catastrophe]",
            summary: "A disaster that living characters may still remember.",
            details: "What happened in living memory that your player characters grew up knowing about?",
            type: "disaster",
            impact: "critical"
        },
        {
            id: 6,
            year: 2000,
            era: "[Modern Era Name]",
            title: "[Campaign Start / Present Day]",
            summary: "The state of the world as the campaign begins.",
            details: "What is the current political, social, and magical situation in your world right now?",
            type: "exploration",
            impact: "medium"
        }
        // ✏️ Add more events here. Don't forget the comma after each entry!
    ];


    // =============================================
    // DOM ELEMENTS
    // =============================================
    const track        = document.getElementById('timelineTrack');
    const eraLabel     = document.getElementById('eraLabel');
    const modal        = document.getElementById('timelineModal');
    const closeBtn     = document.getElementById('closeTimelineModal');
    const modalBody    = document.getElementById('timelineModalBody');

    // =============================================
    // RENDER TIMELINE
    // =============================================
    renderTimeline();

    function renderTimeline() {
        let lastEra = null;

        events.forEach((event, index) => {

            // Insert era divider when era changes
            if (event.era !== lastEra) {
                const divider = createEraDivider(event.era);
                track.appendChild(divider);
                lastEra = event.era;
            }

            // Alternate left/right
            const side = index % 2 === 0 ? 'left' : 'right';
            const el = createEventElement(event, side);
            track.appendChild(el);
        });

        // End marker
        const end = document.createElement('div');
        end.className = 'timeline-end';
        end.innerHTML = `<i class="fas fa-hourglass-end"></i> A história continua...`;
        track.appendChild(end);

        // Trigger scroll animations
        initScrollAnimations();
    }

    // =============================================
    // CREATE ERA DIVIDER
    // =============================================
    function createEraDivider(eraName) {
        const div = document.createElement('div');
        div.className = 'timeline-era-divider';
        div.dataset.era = eraName;
        div.innerHTML = `<span><i class="fas fa-scroll"></i> ${eraName}</span>`;
        return div;
    }

    // =============================================
    // CREATE EVENT ELEMENT
    // =============================================
    function createEventElement(event, side) {
        const cat = categoryConfig[event.type] || { label: event.type, color: '#fbbf24', icon: 'fa-star' };

        const el = document.createElement('div');
        el.className = `timeline-event ${side}`;
        el.dataset.era = event.era;
        el.style.setProperty('--event-color', cat.color);

        el.innerHTML = `
            <div class="timeline-node" style="background: ${cat.color}; box-shadow: 0 0 0 3px ${cat.color}33;"></div>
            <div class="timeline-connector"></div>
            <div class="timeline-card" style="--event-color: ${cat.color}">
                <div class="timeline-card-header">
                    <span class="timeline-year">${event.year}</span>
                    <span class="timeline-category-badge">
                        <i class="fas ${cat.icon}"></i> ${cat.label}
                    </span>
                </div>
                <h3 class="timeline-card-title">${event.title}</h3>
                <p class="timeline-card-desc">${event.summary}</p>
                <div class="timeline-card-footer">
                    <button class="timeline-details-btn" data-id="${event.id}">
                        <i class="fas fa-book-open"></i> Read more
                    </button>
                </div>
            </div>
        `;

        el.querySelector('.timeline-details-btn').addEventListener('click', () => openModal(event.id));
        el.addEventListener('click', e => {
            if (!e.target.closest('.timeline-details-btn')) openModal(event.id);
        });

        return el;
    }

    // =============================================
    // SCROLL ANIMATIONS — IntersectionObserver
    // Each event starts invisible (opacity: 0, translateX).
    // When it enters the viewport it gets the 'visible' class
    // which triggers the CSS transition.
    // The staggered delay makes events reveal one after another
    // as the user scrolls down, not all at once.
    // =============================================
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    // Small delay so rapid scrolling still looks staggered
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 80);
                    observer.unobserve(entry.target); // animate once only
                }
            });
        }, {
            threshold: 0.15,    // 15% of element visible before triggering
            rootMargin: '0px 0px -60px 0px' // trigger slightly before bottom of viewport
        });

        // Observe events, dividers and end marker
        track.querySelectorAll('.timeline-event, .timeline-era-divider, .timeline-end')
            .forEach(el => observer.observe(el));

        // =============================================
        // ERA INDICATOR — updates sticky label as user scrolls
        // =============================================
        const eraObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const era = entry.target.dataset.era;
                    if (era) {
                        eraLabel.innerHTML = `<i class="fas fa-scroll"></i> ${era}`;
                    }
                }
            });
        }, {
            threshold: 0,
            rootMargin: '-80px 0px -80% 0px' // triggers when element is near top of viewport
        });

        track.querySelectorAll('[data-era]').forEach(el => eraObserver.observe(el));
    }

    // =============================================
    // MODAL
    // =============================================
    function openModal(id) {
        const event = events.find(e => e.id === id);
        if (!event) return;

        const cat = categoryConfig[event.type] || { label: event.type, color: '#fbbf24', icon: 'fa-star' };

        const paragraphs = `<p>${event.details}</p>`;

        modalBody.innerHTML = `
            <div style="border-bottom: 1px solid rgba(251,191,36,0.1); padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
                <span class="timeline-category-badge" style="
                    background: ${cat.color}22;
                    color: ${cat.color};
                    border: 1px solid ${cat.color}55;
                    display: inline-flex; align-items: center; gap: 0.4rem;
                    padding: 0.3rem 0.9rem; border-radius: 20px;
                    font-size: 0.75rem; font-weight: bold;
                    text-transform: uppercase; letter-spacing: 0.08em;
                    margin-bottom: 1rem;">
                    <i class="fas ${cat.icon}"></i> ${cat.label}
                </span>
                <div class="modal-event-year" style="color: ${cat.color}; text-shadow: 0 0 16px ${cat.color}66;">
                    ${event.year}
                </div>
                <h2 class="modal-event-title">${event.title}</h2>
                <div class="modal-event-meta">
                    <span><i class="fas fa-layer-group"></i> ${event.era}</span>
                </div>
            </div>
            <div class="modal-event-description">
                ${paragraphs}
            </div>
        `;

        modal.style.display = 'block';
        modal.scrollTop = 0;
    }

    closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
    modal.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.style.display = 'none'; });

    console.log(`%c Timeline Loaded! ⏳`, `color: #fbbf24; font-size: 16px; font-weight: bold;`);
    console.log(`%c ${events.length} events in history`, `color: #94a3b8; font-size: 14px;`);
});