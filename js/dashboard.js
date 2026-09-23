/**
 * Dashboard KPIs & Metric Cards Management
 */
window.MOPCDashboard = {
    init() {
        this.renderStaticInfo();
    },

    renderStaticInfo() {
        const meta = window.MOPCData.getMetadata();
        const periodEl = document.getElementById('headerPeriod');
        if (periodEl) {
            periodEl.textContent = meta.periodo;
        }
    },

    updateKPIs(filteredObras) {
        const kpis = window.MOPCData.calculateKPIs(filteredObras);
        const allObras = window.MOPCData.getAllObras();
        const isFiltered = filteredObras.length !== allObras.length;

        // Total obras
        const totalObrasEl = document.getElementById('kpiTotalObras');
        if (totalObrasEl) {
            totalObrasEl.textContent = kpis.totalObras;
        }

        const totalObrasSubEl = document.getElementById('kpiTotalObrasSub');
        if (totalObrasSubEl) {
            if (isFiltered) {
                totalObrasSubEl.textContent = `De ${allObras.length} obras registradas`;
            } else {
                totalObrasSubEl.textContent = '100% de la cartera registrada';
            }
        }

        // Terminadas
        const terminadasEl = document.getElementById('kpiTerminadas');
        if (terminadasEl) {
            terminadasEl.textContent = kpis.countTerminadas;
        }

        const pctTerminadasEl = document.getElementById('kpiPctTerminadas');
        if (pctTerminadasEl) {
            pctTerminadasEl.textContent = `${kpis.pctTerminadas}%`;
        }

        const barTerminadasEl = document.getElementById('kpiBarTerminadas');
        if (barTerminadasEl) {
            barTerminadasEl.style.width = `${kpis.pctTerminadas}%`;
        }

        // En Ejecución
        const ejecucionEl = document.getElementById('kpiEjecucion');
        if (ejecucionEl) {
            ejecucionEl.textContent = kpis.countEjecucion;
        }

        const pctEjecucionEl = document.getElementById('kpiPctEjecucion');
        if (pctEjecucionEl) {
            pctEjecucionEl.textContent = `${kpis.pctEjecucion}%`;
        }

        const barEjecucionEl = document.getElementById('kpiBarEjecucion');
        if (barEjecucionEl) {
            barEjecucionEl.style.width = `${kpis.pctEjecucion}%`;
        }

        // Inversión Obras
        const invTotalEl = document.getElementById('kpiInvTotal');
        if (invTotalEl) {
            invTotalEl.textContent = window.MOPCData.formatShortDOP(kpis.invTotalObras);
        }

        const invTotalSubEl = document.getElementById('kpiInvTotalSub');
        if (invTotalSubEl) {
            invTotalSubEl.textContent = window.MOPCData.formatDOP(kpis.invTotalObras);
        }

        const invTerminadasSubEl = document.getElementById('kpiInvTerminadasSub');
        if (invTerminadasSubEl) {
            invTerminadasSubEl.textContent = window.MOPCData.formatShortDOP(kpis.invTerminadas);
        }

        const invEjecucionSubEl = document.getElementById('kpiInvEjecucionSub');
        if (invEjecucionSubEl) {
            invEjecucionSubEl.textContent = window.MOPCData.formatShortDOP(kpis.invEjecucion);
        }

        // Programas de Obras Civiles (Estáticos / Gran Total)
        const granTotalEl = document.getElementById('kpiGranTotal');
        if (granTotalEl) {
            granTotalEl.textContent = window.MOPCData.formatShortDOP(kpis.invGranTotal);
        }

        const granTotalSubEl = document.getElementById('kpiGranTotalSub');
        if (granTotalSubEl) {
            granTotalSubEl.textContent = window.MOPCData.formatDOP(kpis.invGranTotal);
        }

        // Resumen Asfalto y Aceras
        const asfaltoKmEl = document.getElementById('kpiAsfaltoKm');
        if (asfaltoKmEl) {
            asfaltoKmEl.textContent = `${kpis.asfaltoKm} km`;
        }

        const asfaltoM2El = document.getElementById('kpiAsfaltoM2');
        if (asfaltoM2El) {
            asfaltoM2El.textContent = `${kpis.asfaltoM2} m²`;
        }

        const asfaltoSectoresEl = document.getElementById('kpiAsfaltoSectores');
        if (asfaltoSectoresEl) {
            asfaltoSectoresEl.textContent = `${kpis.asfaltoSectores} sectores`;
        }

        const acerasKmEl = document.getElementById('kpiAcerasKm');
        if (acerasKmEl) {
            acerasKmEl.textContent = kpis.acerasKm;
        }

        // Filter indicator bar
        const activeFilterBanner = document.getElementById('activeFilterBanner');
        const activeCountEl = document.getElementById('activeResultsCount');
        if (activeFilterBanner && activeCountEl) {
            activeCountEl.textContent = `${filteredObras.length} de ${allObras.length} obras`;
            if (isFiltered) {
                activeFilterBanner.classList.remove('hidden');
            } else {
                activeFilterBanner.classList.add('hidden');
            }
        }
    }
};
