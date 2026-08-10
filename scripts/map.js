// ═══════════════════════════════════════════════════════════════
// RPG WORLD WIKI TEMPLATE — map.js
// ═══════════════════════════════════════════════════════════════
//
// HOW TO USE THE INTERACTIVE MAP:
//   1. Replace /images/maps/your-world-map.webp with your map image
//      (update the path in locations.html where the map div lives)
//   2. Update MAP_W and MAP_H to your map image dimensions
//   3. Update regionColors keys to match your region names
//   4. Add markers using debug mode (see instructions in markers array)
// =============================================
// HOW TO ADD A NEW MARKER:
// Find the coordinates by hovering your mouse over the map image
// in a browser (use browser devtools or the debug mode below).
// Then add a new object to the `markers` array following the same format.
//
// COORDINATE SYSTEM:
// Leaflet image maps use [y, x] pixel coordinates where:
//   [0, 0]      = TOP-LEFT of the image
//   [1125, 2000] = BOTTOM-RIGHT of the image (your map is 2000x1125px)
// So [500, 800] means 500px from top, 800px from left.
// =============================================

document.addEventListener('DOMContentLoaded', function () {

    // =============================================
    // MAP IMAGE DIMENSIONS
    // EXPLANATION: These MUST match the actual pixel size of your image.
    // If they're wrong, markers will appear in the wrong positions.
    // Your map is 2000 x 1125 pixels.
    // =============================================
    const MAP_W = 2000;
    const MAP_H = 1125;

    // =============================================
    // MARKERS
    // EXPLANATION: Each marker is an object with:
    //   coords  — [y, x] pixel position on the map image
    //   name    — shown as the popup title
    //   region  — region name (used for colour coding)
    //   type    — location type (city, dungeon, town, wilderness, ruin)
    //   desc    — short description shown in popup
    //   link    — (optional) if set, popup shows a "Ver mais" button
    //             that filters the locations grid to this location
    //
    // TO FIND COORDINATES:
    // Set debugMode = true below, then hover over the map in your browser.
    // The coordinates will be shown in the top-right corner of the map.
    // Once you have the right coords, set debugMode = false again.
    // =============================================
    const markers = [
        // ═══════════════════════════════════════════════════════════════
        // RPG WORLD WIKI TEMPLATE — Map Markers
        // ═══════════════════════════════════════════════════════════════
        //
        // HOW TO ADD MAP MARKERS:
        //   1. Set debugMode = true (find it below in this file)
        //   2. Open locations.html in your browser
        //   3. Hover over your map image — coordinates appear top-right
        //   4. Copy those coords into a new marker object here
        //   5. Set debugMode = false when done
        //
        // IMPORTANT: coords are [Y, X] pixel position on your map image.
        //   [0, 0] = top-left corner of the image
        //   Update MAP_W and MAP_H below to match YOUR map image dimensions.
        //
        // FIELDS:
        //   coords — [y, x] pixel position on the map
        //   name   — location name (should match a location in locations.js)
        //   region — must match a key in regionColors below
        //   type   — "city" | "town" | "dungeon" | "wilderness" | "ruin"
        //   desc   — short description shown in the map popup
        //   link   — true if this location has an entry in locations.js
        // ═══════════════════════════════════════════════════════════════

        // EXAMPLE MARKERS — replace these with your own locations
        {
            coords: [400, 600],
            name: "[City Name]",
            region: "region_one",
            type: "city",
            desc: "The capital and largest city of your world. A hub of trade and power.",
            link: true
        },
        {
            coords: [700, 300],
            name: "[Wilderness Area]",
            region: "region_two",
            type: "wilderness",
            desc: "A dark and treacherous forest few dare to enter.",
            link: true
        },
        {
            coords: [200, 1000],
            name: "[Dungeon Name]",
            region: "region_three",
            type: "dungeon",
            desc: "The crumbling remains of an ancient fortress, now home to unknown horrors.",
            link: true
        }
        // ✏️ Add more markers here. Don't forget the comma after each entry!
    ];


    // =============================================
    // REGION COLOURS
    // Matches your existing regionColors in locations.js
    // =============================================
    const regionColors = {
        'region_three': '#00d659',
        'region_two': '#aec9dd',
        'region_one': '#9b4fc2',
        'region_four':  '#ed8936',
        
    };

    // =============================================
    // TYPE ICONS (Font Awesome class names)
    // =============================================
    const typeIcons = {
        city:       'fa-city',
        town:       'fa-home',
        dungeon:    'fa-dungeon',
        wilderness: 'fa-tree',
        ruína:       'fa-monument'
    };

    // =============================================
    // DEBUG MODE
    // Set to true to see pixel coordinates as you hover the map.
    // Useful for placing new markers accurately.
    // Set back to false when done.
    // =============================================
    const debugMode = true;

    // =============================================
    // INITIALISE LEAFLET
    // EXPLANATION: We use CRS.Simple because this is a flat image,
    // not a real-world geographic projection. CRS.Simple treats
    // coordinates as plain pixels, which is what we want.
    // =============================================
    const map = L.map('wiki-map', {
        crs: L.CRS.Simple,
        minZoom: -2,        // how far out the user can zoom
        maxZoom: 2,         // how far in the user can zoom
        zoomSnap: 0.5,      // zoom increments
        attributionControl: false  // hide the "Leaflet" watermark
    });

    // =============================================
    // OVERLAY THE IMAGE
    // EXPLANATION: L.imageOverlay takes the image URL and its
    // bounds in [y, x] pixel coordinates.
    // The bounds go from [0, 0] (top-left) to [MAP_H, MAP_W] (bottom-right).
    // =============================================
    const bounds = [[0, 0], [MAP_H, MAP_W]];
    // CHANGE: Replace with the path to your world map image
    // Place your map in /images/maps/ and update the path below
    L.imageOverlay('../images/maps/your-world-map.webp', bounds).addTo(map);

    // =============================================
    // SET INITIAL VIEW
    // EXPLANATION: fitBounds makes the map start zoomed to show
    // the entire image. The padding adds a small border around it.
    // =============================================
    map.fitBounds(bounds, { padding: [10, 10] });
    map.setMaxBounds(bounds.map((b, i) => i === 0
        ? [b[0] - 200, b[1] - 200]
        : [b[0] + 200, b[1] + 200]
    ));

    // =============================================
    // CREATE CUSTOM MARKER ICON
    // EXPLANATION: We create a custom divIcon instead of the default
    // blue Leaflet pin. This gives us full CSS control over the look,
    // matching your site's dark fantasy aesthetic.
    // The colour ring around the icon matches the region colour.
    // =============================================
    function createIcon(marker) {
        const color = regionColors[marker.region] || '#fbbf24';
        const icon = typeIcons[marker.type] || 'fa-map-marker-alt';

        return L.divIcon({
            className: 'wiki-marker',
            html: `
                <div class="marker-pin" style="--marker-color: ${color}">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="marker-pulse" style="--marker-color: ${color}"></div>
            `,
            iconSize: [36, 36],
            iconAnchor: [18, 18],   // centre of the icon sits on the coordinate
            popupAnchor: [0, -22]   // popup appears above the icon
        });
    }

    // =============================================
    // ADD MARKERS TO MAP
    // =============================================
    markers.forEach(markerData => {
        const color = regionColors[markerData.region] || '#fbbf24';
        const icon = typeIcons[markerData.type] || 'fa-map-marker-alt';

        // "Ver mais" button only appears if link: true
        // EXPLANATION: Clicking it scrolls down to the locations grid
        // and could in future filter to that specific location.
        const linkBtn = markerData.link
          ? `<button class="popup-link" onclick="openLocationFromMap('${markerData.name}')">
            <i class="fas fa-arrow-down"></i> See details
            </button>`
          : '';

        const popupContent = `
            <div class="wiki-popup">
                <div class="popup-header" style="border-left: 3px solid ${color}">
                    <span class="popup-type" style="color: ${color}">
                        <i class="fas ${icon}"></i>
                        ${markerData.type.charAt(0).toUpperCase() + markerData.type.slice(1)}
                    </span>
                    <h3 class="popup-name">${markerData.name}</h3>
                    <p class="popup-region" style="color: ${color}">
                        <i class="fas fa-map-pin"></i>
                        ${markerData.region.charAt(0).toUpperCase() + markerData.region.slice(1)}
                    </p>
                </div>
                <p class="popup-desc">${markerData.desc}</p>
                ${linkBtn}
            </div>
        `;

        L.marker(markerData.coords, { icon: createIcon(markerData) })
            .addTo(map)
            .bindPopup(popupContent, {
                maxWidth: 260,
                className: 'wiki-leaflet-popup'
            });
    });

    // =============================================
    // DEBUG MODE — shows pixel coordinates on hover
    // =============================================
    if (debugMode) {
        const debugDisplay = document.getElementById('map-debug-coords');
        if (debugDisplay) {
            map.on('mousemove', function (e) {
                const y = Math.round(e.latlng.lat);
                const x = Math.round(e.latlng.lng);
                debugDisplay.textContent = `coords: [${y}, ${x}]`;
            });
        }
    }

    console.log(`%c Map Loaded! 🗺️`, `color: #fbbf24; font-size: 14px; font-weight: bold;`);
    console.log(`%c ${markers.length} marker(s) placed`, `color: #94a3b8; font-size: 13px;`);

    // Opens the location modal from a map marker click
    window.openLocationFromMap = function(locationName) {
    // Reveal all hidden cards first so we can find the right one
    document.querySelectorAll('.hidden-card').forEach(c => {
        c.classList.remove('hidden-card');
        c.classList.add('visible');
    });
    const showMoreBtn = document.querySelector('.show-more-btn');
    if (showMoreBtn) showMoreBtn.innerHTML = `<i class="fas fa-chevron-up"></i> See less`;

    // Find the matching location card by name
    const cards = document.querySelectorAll('.location-card');
    for (const card of cards) {
        const title = card.querySelector('.location-title');
        if (title && title.textContent.trim() === locationName) {
            // Close the map popup
            map.closePopup();
            // Scroll to the card
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Flash a light highlight ring, then open the modal
            card.style.transition = 'box-shadow 0.3s';
            card.style.boxShadow = '0 0 0 3px var(--accent-light)';
            setTimeout(() => {
                card.style.boxShadow = '';
                card.querySelector('.view-details').click();
            }, 600);
            return;
        }
    }
    };
});