/**
 * Project Sheet Modal & Civil Works Details Module
 */
window.MOPCModal = {
    currentObra: null,
    currentPhotoIndex: 0,

    init() {
        this.bindEvents();
    },

    bindEvents() {
        const dialog = document.getElementById('projectModal');
        if (!dialog) return;

        // Close on clicking backdrop (light dismiss pattern)
        dialog.addEventListener('click', (e) => {
            const rect = dialog.getBoundingClientRect();
            const isInDialog = (
                rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                rect.left <= e.clientX && e.clientX <= rect.left + rect.width
            );
            if (!isInDialog) {
                this.close();
            }
        });

        // Close buttons
        const closeBtns = dialog.querySelectorAll('.btn-close-modal');
        closeBtns.forEach(b => b.addEventListener('click', () => this.close()));

        // Keyboard escape is natively handled by <dialog>, but let's ensure cleanup
        dialog.addEventListener('close', () => {
            document.body.classList.remove('modal-open');
        });

        // Civil works modal
        const civDialog = document.getElementById('civilesModal');
        if (civDialog) {
            civDialog.addEventListener('click', (e) => {
                const rect = civDialog.getBoundingClientRect();
                const isInDialog = (
                    rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                    rect.left <= e.clientX && e.clientX <= rect.left + rect.width
                );
                if (!isInDialog) {
                    civDialog.close();
                    document.body.classList.remove('modal-open');
                }
            });

            const civCloseBtns = civDialog.querySelectorAll('.btn-close-modal');
            civCloseBtns.forEach(b => b.addEventListener('click', () => {
                civDialog.close();
                document.body.classList.remove('modal-open');
            }));
        }

        // Trigger civil works modal button from KPI banner or navbar
        const openCivilesBtn = document.getElementById('btnOpenCivilesModal');
        if (openCivilesBtn) {
            openCivilesBtn.addEventListener('click', () => this.openCiviles());
        }

        const openCivilesKpi = document.getElementById('kpiCivilesCard');
        if (openCivilesKpi) {
            openCivilesKpi.addEventListener('click', () => this.openCiviles());
        }
    },

    open(obraId) {
        const allObras = window.MOPCData.getAllObras();
        const obra = allObras.find(o => o.id === obraId);
        if (!obra) return;

        this.currentObra = obra;
        this.currentPhotoIndex = 0;

        const dialog = document.getElementById('projectModal');
        if (!dialog) return;

        // Fill modal details
        document.getElementById('modalObraCode').textContent = obra.codigo;
        document.getElementById('modalObraTitle').textContent = obra.nombre;
        document.getElementById('modalObraMun').textContent = obra.municipio;
        document.getElementById('modalObraLoc').textContent = obra.localidad;
        document.getElementById('modalObraTipo').textContent = obra.tipo;
        document.getElementById('modalObraFuente').textContent = obra.fuente;

        // Status badge
        const badgeEl = document.getElementById('modalObraStatus');
        if (badgeEl) {
            badgeEl.textContent = obra.estado;
            badgeEl.className = `badge ${obra.estado === 'Terminada' ? 'badge-success' : 'badge-primary'}`;
        }

        // Investment card
        const invEl = document.getElementById('modalObraInv');
        const invSubEl = document.getElementById('modalObraInvSub');
        if (invEl) {
            invEl.textContent = obra.inversion ? window.MOPCData.formatDOP(obra.inversion) : 'Incluido en Plan General';
        }
        if (invSubEl) {
            invSubEl.textContent = obra.inversion
                ? 'Monto oficial reportado por el MOPC'
                : 'Esta intervención forma parte del presupuesto global del Plan de Asfalto Provincial';
        }

        // Gallery / Images
        this.renderGallery(obra);

        // Coordinates & GPS section
        const gpsSection = document.getElementById('modalGpsSection');
        if (gpsSection) {
            if (obra.coordenadas && obra.coordenadas.lat && obra.coordenadas.lon) {
                const { lat, lon } = obra.coordenadas;
                gpsSection.innerHTML = `
                    <div class="gps-card">
                        <div class="gps-info">
                            <span class="gps-label">Coordenadas GPS Verificadas:</span>
                            <span class="gps-coords">${lat.toFixed(6)}, ${lon.toFixed(6)}</span>
                        </div>
                        <div class="gps-actions">
                            <button type="button" class="btn btn-secondary btn-sm" onclick="window.MOPCModal.close(); window.MOPCMap.focusObra(${lat}, ${lon}, '${obra.id}')">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                Ver en Mapa del Dashboard
                            </button>
                            <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">
                                Abrir en Google Maps &rarr;
                            </a>
                        </div>
                    </div>
                `;
            } else {
                gpsSection.innerHTML = `
                    <div class="gps-card gps-empty">
                        <div class="gps-info">
                            <span class="gps-label">Ubicación Administrativa:</span>
                            <span class="gps-coords">${obra.localidad}, Municipio de ${obra.municipio}</span>
                            <p class="gps-notice">Las coordenadas de geolocalización satelital específica no fueron provistas en el informe original del MOPC para este proyecto.</p>
                        </div>
                    </div>
                `;
            }
        }

        document.body.classList.add('modal-open');
        dialog.showModal();
    },

    renderGallery(obra) {
        const galleryWrap = document.getElementById('modalGalleryWrap');
        if (!galleryWrap) return;

        if (obra.fotos && obra.fotos.length > 0) {
            if (this.currentPhotoIndex >= obra.fotos.length) {
                this.currentPhotoIndex = 0;
            }
            const foto = obra.fotos[this.currentPhotoIndex];
            const isMulti = obra.fotos.length > 1;

            let thumbsHtml = '';
            if (isMulti) {
                thumbsHtml = `
                    <div class="modal-gallery-thumbs">
                        ${obra.fotos.map((f, i) => `
                            <button type="button" class="gallery-thumb-btn ${i === this.currentPhotoIndex ? 'active' : ''}" onclick="window.MOPCModal.switchPhoto(${i})" title="${f.titulo}">
                                <img src="${f.archivo}" alt="${f.titulo}">
                                <span class="thumb-index">${i + 1}/${obra.fotos.length}</span>
                            </button>
                        `).join('')}
                    </div>
                `;
            }

            galleryWrap.innerHTML = `
                <div class="modal-photo-container">
                    <img src="${foto.archivo}" alt="${foto.titulo}" id="modalMainPhoto" class="modal-main-photo">
                    <div class="modal-photo-caption">
                        <span class="photo-title">${foto.titulo}</span>
                        <span class="photo-tag">${isMulti ? `Foto ${this.currentPhotoIndex + 1} de ${obra.fotos.length}` : 'Registro MOPC'}</span>
                    </div>
                </div>
                ${thumbsHtml}
            `;
        } else {
            galleryWrap.innerHTML = `
                <div class="modal-photo-placeholder">
                    <div class="placeholder-icon-wrap">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#002D62" stroke-width="1.6">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                    </div>
                    <h4>Registro Fotográfico No Disponible</h4>
                    <p>Esta obra no contiene fotografía individualizada en la carpeta de imágenes del informe.</p>
                </div>
            `;
        }
    },

    switchPhoto(index) {
        if (!this.currentObra || !this.currentObra.fotos[index]) return;
        this.currentPhotoIndex = index;
        this.renderGallery(this.currentObra);
    },

    close() {
        const dialog = document.getElementById('projectModal');
        if (dialog && dialog.open) {
            dialog.close();
            document.body.classList.remove('modal-open');
        }
    },

    printCurrent() {
        window.print();
    },

    openCiviles() {
        const dialog = document.getElementById('civilesModal');
        if (!dialog) return;

        const data = window.MOPCData.getProgramasEspeciales();

        document.getElementById('civAsfaltoM2').textContent = `${data.asfalto_colocado.m2} m²`;
        document.getElementById('civAsfaltoKm').textContent = `${data.asfalto_colocado.km} km`;
        document.getElementById('civAsfaltoM3').textContent = `${data.asfalto_colocado.m3} m³`;
        document.getElementById('civAsfaltoSectores').textContent = `${data.asfalto_colocado.sectores} sectores`;
        document.getElementById('civAsfaltoInv').textContent = data.asfalto_colocado.inversion;

        document.getElementById('civAcerasM2').textContent = data.aceras_y_contenes.aceras;
        document.getElementById('civContenesMl').textContent = data.aceras_y_contenes.contenes;
        document.getElementById('civAcerasKm').textContent = data.aceras_y_contenes.total;
        document.getElementById('civAcerasInv').textContent = data.aceras_y_contenes.inversion;

        const tableBody = document.getElementById('progAsfaltoTableBody');
        if (tableBody && data.asfalto_programado_2025) {
            tableBody.innerHTML = data.asfalto_programado_2025.sectores.map(s => `
                <tr>
                    <td><strong>${s.sector}</strong></td>
                    <td>${s.municipio}</td>
                    <td><span class="badge badge-primary">${s.km.toFixed(2)} km</span></td>
                </tr>
            `).join('');
        }

        document.body.classList.add('modal-open');
        dialog.showModal();
    }
};
