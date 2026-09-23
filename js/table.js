/**
 * Interactive Table Management (Sorting, Pagination, Filtering, Responsive View)
 */
window.MOPCTable = {
    sortColumn: 'inversion',
    sortDirection: 'desc',
    currentPage: 1,
    itemsPerPage: 10,
    currentData: [],

    init() {
        this.bindEvents();
    },

    bindEvents() {
        // Table header click for sorting
        const headers = document.querySelectorAll('#obrasTable th[data-sort]');
        headers.forEach(th => {
            th.addEventListener('click', () => {
                const column = th.dataset.sort;
                if (this.sortColumn === column) {
                    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    this.sortColumn = column;
                    this.sortDirection = column === 'inversion' ? 'desc' : 'asc';
                }
                this.updateHeaderIcons();
                this.render();
            });
        });

        // Items per page selector
        const perPageSelect = document.getElementById('tablePerPage');
        if (perPageSelect) {
            perPageSelect.addEventListener('change', (e) => {
                this.itemsPerPage = e.target.value === 'all' ? 9999 : parseInt(e.target.value, 10);
                this.currentPage = 1;
                this.render();
            });
        }
    },

    updateData(data) {
        this.currentData = data;
        this.currentPage = 1;
        this.render();
    },

    sortData(data) {
        return [...data].sort((a, b) => {
            let valA = a[this.sortColumn];
            let valB = b[this.sortColumn];

            if (this.sortColumn === 'inversion') {
                valA = a.inversion || 0;
                valB = b.inversion || 0;
            } else if (typeof valA === 'string') {
                valA = valA.toLowerCase();
                valB = (valB || '').toLowerCase();
                return this.sortDirection === 'asc'
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            }

            if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
            if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    },

    updateHeaderIcons() {
        const headers = document.querySelectorAll('#obrasTable th[data-sort]');
        headers.forEach(th => {
            const col = th.dataset.sort;
            th.classList.remove('sort-asc', 'sort-desc');
            if (col === this.sortColumn) {
                th.classList.add(this.sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
            }
        });
    },

    render() {
        const tbody = document.getElementById('obrasTableBody');
        const emptyState = document.getElementById('tableEmptyState');
        const paginationContainer = document.getElementById('tablePagination');
        const infoEl = document.getElementById('tableInfoText');

        if (!tbody) return;

        if (this.currentData.length === 0) {
            tbody.innerHTML = '';
            if (emptyState) emptyState.classList.remove('hidden');
            if (paginationContainer) paginationContainer.innerHTML = '';
            if (infoEl) infoEl.textContent = 'Mostrando 0 de 0 obras';
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');

        const sorted = this.sortData(this.currentData);
        const totalItems = sorted.length;
        const totalPages = Math.ceil(totalItems / this.itemsPerPage) || 1;

        if (this.currentPage > totalPages) {
            this.currentPage = totalPages;
        }

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const pageItems = sorted.slice(startIndex, startIndex + this.itemsPerPage);

        // Render rows
        tbody.innerHTML = pageItems.map(obra => {
            const isTerminada = obra.estado === 'Terminada';
            const badgeClass = isTerminada ? 'badge-success' : 'badge-primary';
            const hasFoto = obra.fotos && obra.fotos.length > 0;
            const thumbSrc = hasFoto ? obra.fotos[0].archivo : '';

            const thumbHtml = hasFoto
                ? `<div class="thumb-cell" onclick="window.MOPCModal.open('${obra.id}')" title="Ver foto de la obra">
                     <img src="${thumbSrc}" alt="${obra.nombre}" onerror="this.onerror=null; this.parentElement.innerHTML='<span class=\\'no-photo-icon\\'>📷</span>';">
                   </div>`
                : `<div class="thumb-cell no-photo" title="Sin fotografía disponible">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                       <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                       <circle cx="8.5" cy="8.5" r="1.5"></circle>
                       <polyline points="21 15 16 10 5 21"></polyline>
                     </svg>
                   </div>`;

            const gpsIcon = obra.coordenadas
                ? `<button class="btn-table-gps" onclick="event.stopPropagation(); window.MOPCMap.focusObra(${obra.coordenadas.lat}, ${obra.coordenadas.lon}, '${obra.id}')" title="Ubicar en mapa GPS">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                   </button>`
                : '';

            return `
                <tr class="table-row" onclick="window.MOPCModal.open('${obra.id}')">
                    <td class="col-foto">${thumbHtml}</td>
                    <td class="col-codigo"><span class="code-pill">${obra.codigo}</span></td>
                    <td class="col-nombre">
                        <div class="table-name-wrap">
                            <span class="obra-title">${obra.nombre}</span>
                            <span class="obra-subloc">${obra.localidad}</span>
                        </div>
                    </td>
                    <td class="col-municipio">
                        <span class="mun-tag">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                            ${obra.municipio}
                        </span>
                    </td>
                    <td class="col-tipo">
                        <span class="tipo-tag">${obra.tipo}</span>
                    </td>
                    <td class="col-estado">
                        <span class="badge ${badgeClass}">${obra.estado}</span>
                    </td>
                    <td class="col-inversion">
                        <div class="table-inv-wrap">
                            <span class="inv-main ${obra.inversion ? 'inv-bold' : 'inv-dim'}">
                                ${obra.inversion ? window.MOPCData.formatDOP(obra.inversion) : 'En Plan Asfalto'}
                            </span>
                        </div>
                    </td>
                    <td class="col-acciones" onclick="event.stopPropagation()">
                        <div class="action-buttons-wrap">
                            ${gpsIcon}
                            <button class="btn-table-view" onclick="window.MOPCModal.open('${obra.id}')" title="Ver ficha del proyecto">
                                Ficha
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        // Info text
        const endItem = Math.min(startIndex + this.itemsPerPage, totalItems);
        if (infoEl) {
            infoEl.textContent = `Mostrando ${startIndex + 1} a ${endItem} de ${totalItems} obras`;
        }

        // Render Pagination
        this.renderPagination(totalPages);
    },

    renderPagination(totalPages) {
        const container = document.getElementById('tablePagination');
        if (!container) return;

        if (totalPages <= 1) {
            container.innerHTML = '';
            return;
        }

        let html = '';

        // Previous button
        html += `
            <button class="page-btn page-nav" ${this.currentPage === 1 ? 'disabled' : ''} onclick="window.MOPCTable.changePage(${this.currentPage - 1})">
                &lsaquo; Anterior
            </button>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                html += `
                    <button class="page-btn ${i === this.currentPage ? 'active' : ''}" onclick="window.MOPCTable.changePage(${i})">
                        ${i}
                    </button>
                `;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                html += `<span class="page-ellipsis">&hellip;</span>`;
            }
        }

        // Next button
        html += `
            <button class="page-btn page-nav" ${this.currentPage === totalPages ? 'disabled' : ''} onclick="window.MOPCTable.changePage(${this.currentPage + 1})">
                Siguiente &rsaquo;
            </button>
        `;

        container.innerHTML = html;
    },

    changePage(page) {
        this.currentPage = page;
        this.render();
        // Smooth scroll to top of table
        const tableCard = document.getElementById('tableSection');
        if (tableCard) {
            tableCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};
