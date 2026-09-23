/**
 * Filters Management Module
 */
window.MOPCFilters = {
    state: {
        search: '',
        municipio: 'todos',
        estado: 'todos',
        tipo: 'todos',
        rangoInversion: 'todos',
        soloFotos: false
    },

    init() {
        this.bindEvents();
        this.populateFilterOptions();
    },

    populateFilterOptions() {
        const allObras = window.MOPCData.getAllObras();

        // Populate Municipios
        const munSelect = document.getElementById('filterMunicipio');
        if (munSelect) {
            const municipios = Array.from(new Set(allObras.map(o => o.municipio))).sort();
            municipios.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m;
                opt.textContent = m;
                munSelect.appendChild(opt);
            });
        }

        // Populate Tipos
        const tipoSelect = document.getElementById('filterTipo');
        if (tipoSelect) {
            const tipos = Array.from(new Set(allObras.map(o => o.tipo))).sort();
            tipos.forEach(t => {
                const opt = document.createElement('option');
                opt.value = t;
                opt.textContent = t;
                tipoSelect.appendChild(opt);
            });
        }
    },

    bindEvents() {
        const searchInput = document.getElementById('filterSearch');
        if (searchInput) {
            let debounceTimer = null;
            searchInput.addEventListener('input', (e) => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    this.state.search = e.target.value.trim().toLowerCase();
                    this.onFilterChange();
                }, 200);
            });
        }

        const munSelect = document.getElementById('filterMunicipio');
        if (munSelect) {
            munSelect.addEventListener('change', (e) => {
                this.state.municipio = e.target.value;
                this.onFilterChange();
            });
        }

        const estadoSelect = document.getElementById('filterEstado');
        if (estadoSelect) {
            estadoSelect.addEventListener('change', (e) => {
                this.state.estado = e.target.value;
                this.onFilterChange();
            });
        }

        const tipoSelect = document.getElementById('filterTipo');
        if (tipoSelect) {
            tipoSelect.addEventListener('change', (e) => {
                this.state.tipo = e.target.value;
                this.onFilterChange();
            });
        }

        const invSelect = document.getElementById('filterInversion');
        if (invSelect) {
            invSelect.addEventListener('change', (e) => {
                this.state.rangoInversion = e.target.value;
                this.onFilterChange();
            });
        }

        const fotosCheckbox = document.getElementById('filterSoloFotos');
        if (fotosCheckbox) {
            fotosCheckbox.addEventListener('change', (e) => {
                this.state.soloFotos = e.target.checked;
                this.onFilterChange();
            });
        }

        const resetBtn = document.getElementById('btnResetFilters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetFilters();
            });
        }

        const resetBannerBtn = document.getElementById('btnBannerReset');
        if (resetBannerBtn) {
            resetBannerBtn.addEventListener('click', () => {
                this.resetFilters();
            });
        }
    },

    resetFilters() {
        this.state = {
            search: '',
            municipio: 'todos',
            estado: 'todos',
            tipo: 'todos',
            rangoInversion: 'todos',
            soloFotos: false
        };

        const searchInput = document.getElementById('filterSearch');
        if (searchInput) searchInput.value = '';

        const munSelect = document.getElementById('filterMunicipio');
        if (munSelect) munSelect.value = 'todos';

        const estadoSelect = document.getElementById('filterEstado');
        if (estadoSelect) estadoSelect.value = 'todos';

        const tipoSelect = document.getElementById('filterTipo');
        if (tipoSelect) tipoSelect.value = 'todos';

        const invSelect = document.getElementById('filterInversion');
        if (invSelect) invSelect.value = 'todos';

        const fotosCheckbox = document.getElementById('filterSoloFotos');
        if (fotosCheckbox) fotosCheckbox.checked = false;

        this.onFilterChange();
    },

    filterData(allObras) {
        return allObras.filter(obra => {
            // Text search
            if (this.state.search) {
                const q = this.state.search;
                const matchName = obra.nombre.toLowerCase().includes(q);
                const matchLoc = obra.localidad.toLowerCase().includes(q);
                const matchMun = obra.municipio.toLowerCase().includes(q);
                const matchCode = obra.codigo.toLowerCase().includes(q);
                if (!matchName && !matchLoc && !matchMun && !matchCode) {
                    return false;
                }
            }

            // Municipio
            if (this.state.municipio !== 'todos') {
                if (obra.municipio !== this.state.municipio) {
                    return false;
                }
            }

            // Estado
            if (this.state.estado !== 'todos') {
                if (obra.estado !== this.state.estado) {
                    return false;
                }
            }

            // Tipo
            if (this.state.tipo !== 'todos') {
                if (obra.tipo !== this.state.tipo) {
                    return false;
                }
            }

            // Rango de inversión
            if (this.state.rangoInversion !== 'todos') {
                const inv = obra.inversion || 0;
                switch (this.state.rangoInversion) {
                    case 'top-100m':
                        if (inv < 100000000) return false;
                        break;
                    case 'mid-20-100m':
                        if (inv < 20000000 || inv >= 100000000) return false;
                        break;
                    case 'low-20m':
                        if (inv <= 0 || inv >= 20000000) return false;
                        break;
                    case 'sin-desglose':
                        if (inv > 0) return false;
                        break;
                }
            }

            // Solo con fotos
            if (this.state.soloFotos) {
                if (!obra.fotos || obra.fotos.length === 0) {
                    return false;
                }
            }

            return true;
        });
    },

    renderActiveBadges() {
        const container = document.getElementById('activeFiltersList');
        if (!container) return;

        container.innerHTML = '';
        const badges = [];

        if (this.state.search) {
            badges.push({ key: 'search', label: `Búsqueda: "${this.state.search}"` });
        }
        if (this.state.municipio !== 'todos') {
            badges.push({ key: 'municipio', label: `Municipio: ${this.state.municipio}` });
        }
        if (this.state.estado !== 'todos') {
            badges.push({ key: 'estado', label: `Estado: ${this.state.estado}` });
        }
        if (this.state.tipo !== 'todos') {
            badges.push({ key: 'tipo', label: `Tipo: ${this.state.tipo}` });
        }
        if (this.state.rangoInversion !== 'todos') {
            const labels = {
                'top-100m': '> RD$ 100M',
                'mid-20-100m': 'RD$ 20M - 100M',
                'low-20m': '< RD$ 20M',
                'sin-desglose': 'Sin monto individual'
            };
            badges.push({ key: 'rangoInversion', label: `Inversión: ${labels[this.state.rangoInversion]}` });
        }
        if (this.state.soloFotos) {
            badges.push({ key: 'soloFotos', label: 'Solo con fotografía' });
        }

        badges.forEach(b => {
            const chip = document.createElement('span');
            chip.className = 'filter-chip';
            chip.innerHTML = `
                ${b.label}
                <button type="button" class="chip-remove" title="Quitar filtro" aria-label="Quitar filtro">&times;</button>
            `;
            chip.querySelector('.chip-remove').addEventListener('click', () => {
                this.removeFilter(b.key);
            });
            container.appendChild(chip);
        });
    },

    removeFilter(key) {
        if (key === 'search') {
            this.state.search = '';
            const el = document.getElementById('filterSearch');
            if (el) el.value = '';
        } else if (key === 'soloFotos') {
            this.state.soloFotos = false;
            const el = document.getElementById('filterSoloFotos');
            if (el) el.checked = false;
        } else {
            this.state[key] = 'todos';
            const idMap = {
                municipio: 'filterMunicipio',
                estado: 'filterEstado',
                tipo: 'filterTipo',
                rangoInversion: 'filterInversion'
            };
            const el = document.getElementById(idMap[key]);
            if (el) el.value = 'todos';
        }
        this.onFilterChange();
    },

    onFilterChange() {
        this.renderActiveBadges();
        if (window.MOPCApp) {
            window.MOPCApp.applyFilters();
        }
    }
};
