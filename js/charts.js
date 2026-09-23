/**
 * Charts Management using Chart.js
 */
window.MOPCCharts = {
    instances: {
        estado: null,
        municipio: null,
        tipo: null,
        topObras: null
    },

    currentEstadoMetric: 'count', // 'count' or 'investment'

    init() {
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js no está cargado. Se omitirá la inicialización de gráficos.');
            return;
        }

        // Global Chart.js configuration
        Chart.defaults.font.family = "'Inter', system-ui, -apple-system, sans-serif";
        Chart.defaults.color = '#475569';
        Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(15, 23, 42, 0.92)';
        Chart.defaults.plugins.tooltip.titleFont = { size: 13, weight: '600' };
        Chart.defaults.plugins.tooltip.bodyFont = { size: 12 };
        Chart.defaults.plugins.tooltip.padding = 10;
        Chart.defaults.plugins.tooltip.cornerRadius = 8;

        this.setupEventListeners();
    },

    setupEventListeners() {
        const toggleBtnCount = document.getElementById('btnChartEstadoCount');
        const toggleBtnInv = document.getElementById('btnChartEstadoInv');

        if (toggleBtnCount && toggleBtnInv) {
            toggleBtnCount.addEventListener('click', () => {
                this.currentEstadoMetric = 'count';
                toggleBtnCount.classList.add('active');
                toggleBtnInv.classList.remove('active');
                if (window.MOPCApp && window.MOPCApp.filteredData) {
                    this.renderChartEstado(window.MOPCApp.filteredData);
                }
            });

            toggleBtnInv.addEventListener('click', () => {
                this.currentEstadoMetric = 'investment';
                toggleBtnInv.classList.add('active');
                toggleBtnCount.classList.remove('active');
                if (window.MOPCApp && window.MOPCApp.filteredData) {
                    this.renderChartEstado(window.MOPCApp.filteredData);
                }
            });
        }
    },

    updateAll(filteredObras) {
        if (typeof Chart === 'undefined') return;

        this.renderChartEstado(filteredObras);
        this.renderChartMunicipio(filteredObras);
        this.renderChartTipo(filteredObras);
        this.renderChartTop(filteredObras);
    },

    renderChartEstado(obras) {
        const ctx = document.getElementById('chartEstadoCanvas');
        if (!ctx) return;

        if (this.instances.estado) {
            this.instances.estado.destroy();
        }

        const terminadas = obras.filter(o => o.estado === 'Terminada');
        const ejecucion = obras.filter(o => o.estado === 'En Ejecución');

        const isCount = this.currentEstadoMetric === 'count';
        const dataValues = isCount
            ? [terminadas.length, ejecucion.length]
            : [
                terminadas.reduce((acc, o) => acc + (o.inversion || 0), 0),
                ejecucion.reduce((acc, o) => acc + (o.inversion || 0), 0)
              ];

        const total = dataValues[0] + dataValues[1];

        this.instances.estado = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Terminadas', 'En Ejecución'],
                datasets: [{
                    data: dataValues,
                    backgroundColor: ['#059669', '#2563EB'],
                    hoverBackgroundColor: ['#047857', '#1D4ED8'],
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '68%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 14,
                            usePointStyle: true,
                            padding: 18,
                            font: { size: 12, weight: '500' }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const val = context.raw || 0;
                                const pct = total > 0 ? ((val / total) * 100).toFixed(1) : 0;
                                if (isCount) {
                                    return ` ${context.label}: ${val} obras (${pct}%)`;
                                } else {
                                    return ` ${context.label}: ${window.MOPCData.formatDOP(val)} (${pct}%)`;
                                }
                            }
                        }
                    }
                }
            }
        });
    },

    renderChartMunicipio(obras) {
        const ctx = document.getElementById('chartMunicipioCanvas');
        if (!ctx) return;

        if (this.instances.municipio) {
            this.instances.municipio.destroy();
        }

        // Group by municipality
        const munMap = {};
        obras.forEach(o => {
            const m = o.municipio || 'Otros';
            if (!munMap[m]) {
                munMap[m] = { count: 0, inversion: 0 };
            }
            munMap[m].count += 1;
            munMap[m].inversion += (o.inversion || 0);
        });

        const sortedMun = Object.keys(munMap).sort((a, b) => munMap[b].inversion - munMap[a].inversion);
        const labels = sortedMun;
        const invValues = sortedMun.map(m => munMap[m].inversion / 1e6); // In millions
        const counts = sortedMun.map(m => munMap[m].count);

        this.instances.municipio = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Inversión (Millones RD$)',
                    data: invValues,
                    backgroundColor: '#002D62',
                    borderRadius: 6,
                    maxBarThickness: 38
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        grid: { color: '#F1F5F9' },
                        ticks: {
                            callback: (v) => `RD$ ${v}M`,
                            font: { size: 11 }
                        }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { font: { size: 12, weight: '500' } }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const idx = context.dataIndex;
                                const originalInv = munMap[labels[idx]].inversion;
                                return [
                                    ` Inversión: ${window.MOPCData.formatDOP(originalInv)}`,
                                    ` Obras registradas: ${counts[idx]}`
                                ];
                            }
                        }
                    }
                }
            }
        });
    },

    renderChartTipo(obras) {
        const ctx = document.getElementById('chartTipoCanvas');
        if (!ctx) return;

        if (this.instances.tipo) {
            this.instances.tipo.destroy();
        }

        const tipoMap = {};
        obras.forEach(o => {
            const t = o.tipo || 'Otras';
            if (!tipoMap[t]) {
                tipoMap[t] = { count: 0, inversion: 0 };
            }
            tipoMap[t].count += 1;
            tipoMap[t].inversion += (o.inversion || 0);
        });

        const sortedTipos = Object.keys(tipoMap).sort((a, b) => tipoMap[b].count - tipoMap[a].count);
        const labels = sortedTipos;
        const counts = sortedTipos.map(t => tipoMap[t].count);
        const palette = [
            '#0284C7', // Sky Blue
            '#D97706', // Amber
            '#059669', // Emerald
            '#6366F1', // Indigo
            '#DC2626', // Crimson
            '#0D9488', // Teal
            '#8B5CF6'  // Purple
        ];

        this.instances.tipo = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Cantidad de Obras',
                    data: counts,
                    backgroundColor: palette.slice(0, labels.length),
                    borderRadius: 6,
                    maxBarThickness: 32
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: {
                            font: { size: 11 },
                            maxRotation: 30,
                            minRotation: 15
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: '#F1F5F9' },
                        ticks: { stepSize: 2 }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const idx = context.dataIndex;
                                const tipoName = labels[idx];
                                const inv = tipoMap[tipoName].inversion;
                                return [
                                    ` Cantidad: ${context.raw} obras`,
                                    ` Inversión: ${window.MOPCData.formatDOP(inv)}`
                                ];
                            }
                        }
                    }
                }
            }
        });
    },

    renderChartTop(obras) {
        const ctx = document.getElementById('chartTopCanvas');
        if (!ctx) return;

        if (this.instances.topObras) {
            this.instances.topObras.destroy();
        }

        const validObras = obras.filter(o => o.inversion && o.inversion > 0);
        const sorted = [...validObras].sort((a, b) => b.inversion - a.inversion).slice(0, 8);

        // Shorten title for chart label
        const labels = sorted.map(o => {
            const words = o.nombre.split(' ');
            return words.length > 5 ? words.slice(0, 5).join(' ') + '…' : o.nombre;
        });

        const values = sorted.map(o => o.inversion / 1e6); // in millions
        const colors = sorted.map(o => o.estado === 'Terminada' ? '#059669' : '#2563EB');

        this.instances.topObras = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Inversión (Millones RD$)',
                    data: values,
                    backgroundColor: colors,
                    borderRadius: 6,
                    maxBarThickness: 24
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        grid: { color: '#F1F5F9' },
                        ticks: {
                            callback: (v) => `RD$ ${v}M`,
                            font: { size: 10 }
                        }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { font: { size: 11 } }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            title: (items) => {
                                if (!items.length) return '';
                                const idx = items[0].dataIndex;
                                return sorted[idx].nombre;
                            },
                            label: (context) => {
                                const idx = context.dataIndex;
                                const o = sorted[idx];
                                return [
                                    ` Inversión: ${window.MOPCData.formatDOP(o.inversion)}`,
                                    ` Estado: ${o.estado}`,
                                    ` Municipio: ${o.municipio}`
                                ];
                            }
                        }
                    }
                }
            }
        });
    }
};
