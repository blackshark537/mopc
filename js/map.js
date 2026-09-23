/**
 * Interactive Leaflet Map for Georeferenced Public Works in La Vega
 */
window.MOPCMap = {
    map: null,
    markersGroup: null,
    hasInitialized: false,

    init() {
        const container = document.getElementById('mapContainer');
        if (!container) return;

        if (typeof L === 'undefined') {
            container.innerHTML = `
                <div class="map-fallback-msg">
                    <p>El servicio de mapas requiere conexión de red para cargar los mosaicos geográficos.</p>
                </div>
            `;
            return;
        }

        // Initialize Leaflet Map centered on La Vega
        this.map = L.map('mapContainer', {
            center: [19.23, -70.52],
            zoom: 11,
            scrollWheelZoom: false
        });

        // Add standard OpenStreetMap tiles (no API key required, reliable worldwide)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(this.map);

        this.markersGroup = L.layerGroup().addTo(this.map);
        this.hasInitialized = true;

        // Render initial markers
        if (window.MOPCApp && window.MOPCApp.filteredData) {
            this.updateMarkers(window.MOPCApp.filteredData);
        }
    },

    createCustomIcon(obra) {
        const isTerminada = obra.estado === 'Terminada';
        const colorClass = isTerminada ? 'pin-terminada' : 'pin-ejecucion';

        return L.divIcon({
            className: 'mopc-custom-pin',
            html: `
                <div class="mopc-marker-badge ${colorClass}">
                    <span class="marker-pulse"></span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                </div>
            `,
            iconSize: [36, 36],
            iconAnchor: [18, 36],
            popupAnchor: [0, -36]
        });
    },

    updateMarkers(filteredObras) {
        if (!this.hasInitialized || !this.map || !this.markersGroup) return;

        this.markersGroup.clearLayers();

        const geoObras = filteredObras.filter(o => o.coordenadas && o.coordenadas.lat && o.coordenadas.lon);
        const noticeEl = document.getElementById('mapNotice');

        if (geoObras.length === 0) {
            if (noticeEl) {
                noticeEl.textContent = 'Ninguna de las obras del filtro actual tiene coordenadas GPS en el dataset fuente.';
                noticeEl.classList.remove('hidden');
            }
            return;
        } else {
            if (noticeEl) {
                noticeEl.textContent = `Mostrando ${geoObras.length} obras georreferenciadas de fuentes oficiales MOPC.`;
                noticeEl.classList.remove('hidden');
            }
        }

        const bounds = [];

        geoObras.forEach(obra => {
            const { lat, lon } = obra.coordenadas;
            bounds.push([lat, lon]);

            const marker = L.marker([lat, lon], {
                icon: this.createCustomIcon(obra),
                title: obra.nombre
            });

            const fotoHtml = obra.fotos && obra.fotos.length > 0
                ? `<div class="popup-image-wrap"><img src="${obra.fotos[0].archivo}" alt="${obra.nombre}" onerror="this.style.display='none'"></div>`
                : '';

            const popupContent = `
                <div class="mopc-map-popup">
                    ${fotoHtml}
                    <div class="popup-body">
                        <span class="badge ${obra.estado === 'Terminada' ? 'badge-success' : 'badge-primary'}">${obra.estado}</span>
                        <h4 class="popup-title">${obra.nombre}</h4>
                        <div class="popup-meta">
                            <span class="popup-inv">${obra.inversion_formateada}</span>
                            <span class="popup-loc">${obra.localidad}</span>
                        </div>
                        <button class="popup-btn" onclick="window.MOPCModal.open('${obra.id}')">
                            Ver Ficha del Proyecto &rarr;
                        </button>
                    </div>
                </div>
            `;

            marker.bindPopup(popupContent, {
                maxWidth: 280,
                className: 'custom-leaflet-popup'
            });

            this.markersGroup.addLayer(marker);
        });

        if (bounds.length > 1) {
            this.map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
        } else if (bounds.length === 1) {
            this.map.setView(bounds[0], 13);
        }
    },

    focusObra(lat, lon, obraId) {
        if (!this.map || !lat || !lon) return;

        // Scroll smoothly to map section
        const mapSection = document.getElementById('mapSection');
        if (mapSection) {
            mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        this.map.flyTo([lat, lon], 14, { duration: 1.2 });

        // Open popup for this marker
        setTimeout(() => {
            this.markersGroup.eachLayer(layer => {
                const pos = layer.getLatLng();
                if (Math.abs(pos.lat - lat) < 0.0001 && Math.abs(pos.lng - lon) < 0.0001) {
                    layer.openPopup();
                }
            });
        }, 1300);
    }
};
