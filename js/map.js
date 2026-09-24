/**
 * =========================================================================
 * MOPC La Vega Dashboard — Módulo de Mapa Interactivo con Google Maps API
 * =========================================================================
 * 
 * Clave de Google Maps configurada:
 */
const GOOGLE_MAPS_API_KEY = 'AIzaSyCsbCk5GxQ1Zstw0EL2YDS-f_2bMEEkxfM';

/**
 * Callback global invocado automáticamente cuando la librería de Google Maps carga.
 */
window.onGoogleMapsLoaded = function () {
    console.log('[MOPCMap] Callback onGoogleMapsLoaded recibido.');
    if (window.MOPCMap && typeof window.MOPCMap.onApiLoaded === 'function') {
        window.MOPCMap.onApiLoaded();
    }
};

/**
 * Manejador oficial de errores de autenticación de Google Maps.
 */
window.gm_authFailure = function () {
    console.error('[MOPCMap] Error de autenticación en Google Maps (gm_authFailure).');
    const container = document.getElementById('mapContainer');
    if (container) {
        container.innerHTML = `
            <div class="map-fallback-msg">
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#CE1126" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <h4>Google Maps no pudo autenticar la clave</h4>
                <p>
                    Revisa las 3 causas habituales en tu <strong>Google Cloud Console</strong>:
                </p>
                <div style="text-align: left; max-width: 520px; margin: 0 auto 16px; font-size: 0.85rem; line-height: 1.6; color: var(--text-body); background: #FFFFFF; padding: 14px 18px; border-radius: 8px; border: 1px solid var(--border-light);">
                    <p style="margin: 0 0 8px 0;"><strong>1. API Habilitada:</strong> En <em>APIs y Servicios &gt; Biblioteca</em>, busca y activa <strong>Maps JavaScript API</strong>.</p>
                    <p style="margin: 0 0 8px 0;"><strong>2. Facturación vinculada:</strong> Google Maps Platform requiere que el proyecto de Google Cloud tenga una cuenta de facturación vinculada (otorga $200 USD de uso gratuito mensual).</p>
                    <p style="margin: 0;"><strong>3. Restricciones de clave:</strong> Si tiene restricción de sitios web (referrers HTTP), añade <code>localhost</code> o el dominio actual.</p>
                </div>
                <div>
                    <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                        Abrir Google Cloud Console &rarr;
                    </a>
                </div>
            </div>
        `;
    }
};

/**
 * Objeto MOPCMap — Controlador del Mapa en Google Maps y Street View 360°
 */
window.MOPCMap = {
    map: null,
    markers: [],
    activeInfoWindow: null,
    hasInitialized: false,
    pendingObras: null,
    streetViewService: null,
    svPanorama: null,
    currentSvLocation: null,
    currentSvHeading: 0,

    // Estilos personalizados para un aspecto institucional moderno y limpio
    mapStyles: [
        {
            featureType: 'administrative',
            elementType: 'geometry',
            stylers: [{ visibility: 'on' }]
        },
        {
            featureType: 'administrative.country',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#002D62' }]
        },
        {
            featureType: 'administrative.province',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#2563EB' }]
        },
        {
            featureType: 'landscape',
            elementType: 'geometry.fill',
            stylers: [{ color: '#F8FAFC' }]
        },
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{ color: '#CDE3F7' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [{ color: '#FED7AA' }]
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#FDBA74' }]
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry.fill',
            stylers: [{ color: '#FFFFFF' }]
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#E2E8F0' }]
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{ color: '#DCFCE7' }]
        }
    ],

    /**
     * Inicia la configuración y renderizado del mapa
     */
    init() {
        const container = document.getElementById('mapContainer');
        if (!container) return;

        // Si Google Maps no está cargado aún en window.google.maps
        if (typeof google === 'undefined' || !google.maps) {
            console.log('[MOPCMap] Google Maps API no está disponible aún. Esperando...');
            
            // Si no existe ninguna etiqueta de script de Google Maps en el HTML, inyectarla
            const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
            if (!existingScript && GOOGLE_MAPS_API_KEY && GOOGLE_MAPS_API_KEY !== 'TU_API_KEY_AQUI') {
                this.injectGoogleMapsScript(GOOGLE_MAPS_API_KEY);
            }
            return;
        }

        if (this.hasInitialized) return;

        console.log('[MOPCMap] Inicializando mapa en #mapContainer...');
        container.innerHTML = '';

        // Coordenadas centrales de la Provincia de La Vega, República Dominicana
        const laVegaCenter = { lat: 19.222, lng: -70.528 };

        // Crear instancia del mapa de Google
        this.map = new google.maps.Map(container, {
            center: laVegaCenter,
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            gestureHandling: 'cooperative',
            styles: this.mapStyles,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true
        });

        // Crear InfoWindow único reutilizable con ancho máximo holgado
        this.activeInfoWindow = new google.maps.InfoWindow({
            maxWidth: 320
        });

        // Cerrar Street View flotante si el usuario cierra el InfoWindow manualmente
        google.maps.event.addListener(this.activeInfoWindow, 'closeclick', () => {
            this.closeStreetView();
        });

        // Configurar botones del panel Street View flotante
        const btnSvClose = document.getElementById('btnSvClose');
        if (btnSvClose) {
            btnSvClose.onclick = () => this.closeStreetView();
        }

        const btnSvExpand = document.getElementById('btnSvExpand');
        if (btnSvExpand) {
            btnSvExpand.onclick = () => this.expandStreetView();
        }

        this.hasInitialized = true;

        // Forzar recalculo de dimensiones tras render inicial
        setTimeout(() => {
            if (this.map && window.google && window.google.maps) {
                google.maps.event.trigger(this.map, 'resize');
            }
        }, 250);

        // Si habían obras pendientes mientras la API cargaba, pintarlas ahora
        const dataToRender = this.pendingObras || (window.MOPCApp && window.MOPCApp.filteredData);
        if (dataToRender) {
            this.updateMarkers(dataToRender);
            this.pendingObras = null;
        }
    },

    /**
     * Llamado cuando el script de Google Maps termina de cargarse
     */
    onApiLoaded() {
        console.log('[MOPCMap] onApiLoaded invocado.');
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.init();
            });
        } else {
            this.init();
        }
    },

    /**
     * Carga dinámicamente el script de Google Maps si no existe en el DOM
     */
    injectGoogleMapsScript(apiKey) {
        if (document.querySelector('script[src*="maps.googleapis.com"]')) return;
        const script = document.createElement('script');
        script.id = 'googleMapsScript';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=onGoogleMapsLoaded&libraries=geometry`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    },

    /**
     * Genera un pin vectorial estilizado (SVG) según el estado de la obra
     */
    createCustomIcon(obra) {
        const isTerminada = obra.estado === 'Terminada';
        // Verde institucional para Terminadas (#059669), Azul dominicano para En Ejecución (#2563EB)
        const pinColor = isTerminada ? '#059669' : '#2563EB';

        // Pin SVG nítido y compatible en todos los navegadores
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="42" viewBox="0 0 34 42">
                <path d="M17 1C8.163 1 1 8.163 1 17c0 11.8 14.2 22.8 15.3 23.65a1.1 1.1 0 0 0 1.4 0C18.8 39.8 33 28.8 33 17 33 8.163 25.837 1 17 1z" 
                      fill="${pinColor}" 
                      stroke="#FFFFFF" 
                      stroke-width="1.8"/>
                <circle cx="17" cy="16" r="6" fill="#FFFFFF"/>
                <circle cx="17" cy="16" r="3.2" fill="${pinColor}"/>
            </svg>
        `.trim();

        return {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
            scaledSize: new google.maps.Size(34, 42),
            anchor: new google.maps.Point(17, 41)
        };
    },

    /**
     * Actualiza los marcadores en el mapa con base en los filtros activos
     */
    updateMarkers(filteredObras) {
        if (!this.hasInitialized || !this.map) {
            this.pendingObras = filteredObras;
            return;
        }

        // Limpiar marcadores existentes del mapa
        if (this.markers && this.markers.length > 0) {
            this.markers.forEach(item => {
                if (item.marker) {
                    item.marker.setMap(null);
                }
            });
        }
        this.markers = [];

        // Cerrar InfoWindow activo y Street View si están abiertos
        if (this.activeInfoWindow) {
            this.activeInfoWindow.close();
        }
        this.closeStreetView();

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

        const bounds = new google.maps.LatLngBounds();

        geoObras.forEach(obra => {
            const { lat, lon } = obra.coordenadas;
            const position = new google.maps.LatLng(lat, lon);
            bounds.extend(position);

            const marker = new google.maps.Marker({
                position: position,
                map: this.map,
                title: obra.nombre,
                icon: this.createCustomIcon(obra)
            });

            marker.addListener('click', () => {
                this.openInfoWindow(marker, obra);
            });

            this.markers.push({
                marker,
                obraId: obra.id,
                lat,
                lon,
                obra
            });
        });

        // Ajustar el encuadre según la cantidad de marcadores
        if (geoObras.length > 1) {
            this.map.fitBounds(bounds, 40);
        } else if (geoObras.length === 1) {
            this.map.setCenter(new google.maps.LatLng(geoObras[0].coordenadas.lat, geoObras[0].coordenadas.lon));
            this.map.setZoom(14);
        }
    },

    /**
     * Abre la ventana de información (InfoWindow) para una obra y consulta Street View
     */
    openInfoWindow(marker, obra) {
        if (!this.activeInfoWindow || !this.map) return;

        const fotoHtml = obra.fotos && obra.fotos.length > 0
            ? `<div class="popup-image-wrap"><img src="${obra.fotos[0].archivo}" alt="${obra.nombre}" onerror="this.style.display='none'"></div>`
            : '';

        const popupContent = `
            <div class="mopc-map-popup">
                ${fotoHtml}
                <div class="popup-body">
                    <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px; margin-bottom: 3px;">
                        <span class="badge ${obra.estado === 'Terminada' ? 'badge-success' : 'badge-primary'}">${obra.estado}</span>
                        <span id="popupSvBadge"></span>
                    </div>
                    <h4 class="popup-title">${obra.nombre}</h4>
                    <div class="popup-meta">
                        <span class="popup-inv">${obra.inversion_formateada}</span>
                        <span class="popup-loc">${obra.localidad} &bull; ${obra.municipio}</span>
                    </div>
                    <button type="button" class="popup-btn" onclick="window.MOPCModal.open('${obra.id}')">
                        Ver Ficha del Proyecto &rarr;
                    </button>
                </div>
            </div>
        `;

        this.activeInfoWindow.setContent(popupContent);
        this.activeInfoWindow.open(this.map, marker);

        // Consultar y activar Street View automáticamente si está disponible
        if (obra.coordenadas && obra.coordenadas.lat && obra.coordenadas.lon) {
            this.checkAndShowStreetView(obra.coordenadas.lat, obra.coordenadas.lon, obra);
        }
    },

    /**
     * Verifica la disponibilidad de Street View para las coordenadas dadas y despliega el visor
     */
    checkAndShowStreetView(lat, lon, obra) {
        if (!window.google || !google.maps) return;

        if (!this.streetViewService) {
            this.streetViewService = new google.maps.StreetViewService();
        }

        const pos = new google.maps.LatLng(lat, lon);

        // Buscar panorama en un radio de 250 metros
        this.streetViewService.getPanorama({
            location: pos,
            radius: 250,
            source: google.maps.StreetViewSource.DEFAULT
        }, (data, status) => {
            const panel = document.getElementById('streetViewPanel');
            const nameEl = document.getElementById('svObraName');
            const svContainer = document.getElementById('streetViewContainer');
            const badgeEl = document.getElementById('popupSvBadge');

            if (status === google.maps.StreetViewStatus.OK && data && data.location) {
                console.log('[MOPCMap] Street View disponible para:', obra.nombre);

                if (nameEl) nameEl.textContent = obra.nombre;
                if (panel) panel.classList.remove('hidden');

                if (badgeEl) {
                    badgeEl.innerHTML = `<span class="badge badge-success" style="font-size: 0.65rem; padding: 2px 6px;">📷 360° Activo</span>`;
                }

                this.currentSvLocation = data.location.latLng;

                // Calcular orientación hacia las coordenadas del proyecto
                let heading = 0;
                if (google.maps.geometry && google.maps.geometry.spherical) {
                    heading = google.maps.geometry.spherical.computeHeading(data.location.latLng, pos);
                }
                this.currentSvHeading = heading;

                // Crear o actualizar StreetViewPanorama
                if (!this.svPanorama && svContainer) {
                    this.svPanorama = new google.maps.StreetViewPanorama(svContainer, {
                        position: data.location.latLng,
                        pov: { heading: heading, pitch: 0 },
                        zoom: 1,
                        enableCloseButton: false,
                        addressControl: false,
                        fullscreenControl: false,
                        motionTracking: false,
                        linksControl: true,
                        panControl: true
                    });
                } else if (this.svPanorama) {
                    this.svPanorama.setPosition(data.location.latLng);
                    this.svPanorama.setPov({ heading: heading, pitch: 0 });
                }
            } else {
                console.log('[MOPCMap] Street View no disponible en este punto:', obra.nombre);
                if (panel) panel.classList.add('hidden');
                if (badgeEl) {
                    badgeEl.innerHTML = `<span class="badge badge-neutral" style="font-size: 0.65rem; opacity: 0.75; padding: 2px 6px;">Sin Street View</span>`;
                }
            }
        });
    },

    /**
     * Expande Street View a pantalla completa usando el Street View nativo del mapa
     */
    expandStreetView() {
        if (!this.map || !this.currentSvLocation) return;

        const mapStreetView = this.map.getStreetView();
        mapStreetView.setPosition(this.currentSvLocation);
        mapStreetView.setPov({ heading: this.currentSvHeading || 0, pitch: 0 });
        mapStreetView.setVisible(true);

        const panel = document.getElementById('streetViewPanel');
        if (panel) panel.classList.add('hidden');

        // Al salir de pantalla completa (flecha nativa de Google), volver a mostrar el panel si el mapa está visible
        google.maps.event.addListenerOnce(mapStreetView, 'visible_changed', () => {
            if (!mapStreetView.getVisible() && panel) {
                panel.classList.remove('hidden');
            }
        });
    },

    /**
     * Cierra el visor de Street View flotante
     */
    closeStreetView() {
        const panel = document.getElementById('streetViewPanel');
        if (panel) panel.classList.add('hidden');
    },

    /**
     * Enfoca suavemente una obra en el mapa y abre su ficha emergente y Street View
     */
    focusObra(lat, lon, obraId) {
        if (!this.map || !lat || !lon) return;

        // Desplazamiento suave hasta la sección del mapa
        const mapSection = document.getElementById('mapSection');
        if (mapSection) {
            mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        const targetPos = new google.maps.LatLng(lat, lon);
        this.map.panTo(targetPos);
        this.map.setZoom(15);

        // Abrir InfoWindow y Street View del marcador correspondiente
        setTimeout(() => {
            const item = this.markers.find(m => m.obraId === obraId || (
                Math.abs(m.lat - lat) < 0.0001 &&
                Math.abs(m.lon - lon) < 0.0001
            ));

            if (item && item.marker) {
                this.openInfoWindow(item.marker, item.obra);
            }
        }, 550);
    }
};
