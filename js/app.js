/**
 * Main Application Orchestrator for MOPC La Vega Dashboard
 */
window.MOPCApp = {
    allData: [],
    filteredData: [],

    init() {
        console.log('Iniciando MOPC La Vega Dashboard...');

        // Retrieve dataset
        this.allData = window.MOPCData.getAllObras();
        this.filteredData = [...this.allData];

        // Initialize modules
        window.MOPCDashboard.init();
        window.MOPCCharts.init();
        window.MOPCTable.init();
        window.MOPCFilters.init();
        window.MOPCModal.init();
        window.MOPCMap.init();

        // Initial render
        this.applyFilters();
        this.setupGlobalEvents();

        console.log(`Dashboard listo: ${this.allData.length} obras cargadas.`);
    },

    setupGlobalEvents() {
        // Quick export / print button in header
        const btnPrint = document.getElementById('btnPrintReport');
        if (btnPrint) {
            btnPrint.addEventListener('click', () => {
                window.print();
            });
        }

        // View toggle (scroll to section)
        const navLinks = document.querySelectorAll('.nav-link[data-target]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    },

    applyFilters() {
        this.filteredData = window.MOPCFilters.filterData(this.allData);

        // Update all UI components reactively
        window.MOPCDashboard.updateKPIs(this.filteredData);
        window.MOPCCharts.updateAll(this.filteredData);
        window.MOPCTable.updateData(this.filteredData);
        window.MOPCMap.updateMarkers(this.filteredData);
    }
};

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.MOPCApp.init();
});
