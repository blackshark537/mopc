/**
 * Data Model and Store for MOPC La Vega Public Works Dashboard
 * Sources:
 * - obras_terminadas.csv (34 records)
 * - obras_en_ejecucion.csv (13 records)
 * - obras_civiles.json (Asfalto y Aceras/Contenes)
 * - imagenes.json (Coordinates & Image metadata)
 * - 15_la_vega_ec_2_1_74d4713d70.pdf (MOPC Enero 2025)
 */

const MOPC_DATASET = {
    metadata: {
        provincia: 'La Vega',
        pais: 'República Dominicana',
        institucion: 'Ministerio de Obras Públicas y Comunicaciones (MOPC)',
        periodo: 'Enero 2025 / 1er. Trimestre 2025',
        fuenteDocumental: '15_la_vega_ec_2_1_74d4713d70.pdf',
        totalObrasRegistradas: 47,
        inversionTotalTerminadas: 2221149873.59,
        inversionTotalEjecucion: 3402554705.38,
        inversionAsfaltoColocado: 2249814910.00,
        inversionAcerasContenes: 41574542.64
    },
    obras: [
  {
    "id": "OBR-TERM-01",
    "codigo": "LV-T01",
    "nombre": "DEMOLICIÓN Y CONSTRUCCIÓN DE LOS PUENTES DEL DISTRIBUIDOR PONTÓN",
    "estado": "Terminada",
    "inversion": 406000000.0,
    "inversion_formateada": "RD$ 406,000,000.00",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "El Pontón",
    "tipo": "Puentes y Pasarelas",
    "fotos": [
      {
        "archivo": "image/DEMOLICIÓN Y CONSTRUCCIÓN DE LO PUENTES DEL DISTRIBUIDOR PONTÓN.jpg",
        "titulo": "Demolición y Construcción de los Puentes del Distribuidor Pontón"
      }
    ],
    "coordenadas": {
      "lat": 19.201431,
      "lon": -70.496323
    },
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-02",
    "codigo": "LV-T02",
    "nombre": "CONSTRUCCIÓN DEL MERCADO MUNICIPAL DE LA VEGA - ETAPA II",
    "estado": "Terminada",
    "inversion": 276143264.38,
    "inversion_formateada": "RD$ 276,143,264.38",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Edificaciones y Equipamiento",
    "fotos": [
      {
        "archivo": "image/CONSTRUCCIÓN MERCADO DE LA VEGA.jpg",
        "titulo": "Construcción del Mercado Municipal de La Vega"
      }
    ],
    "coordenadas": {
      "lat": 19.226128,
      "lon": -70.5285
    },
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-03",
    "codigo": "LV-T03",
    "nombre": "ASFALTADO CALLES DEL CENTRO DE JARABACOA",
    "estado": "Terminada",
    "inversion": 205491427.5,
    "inversion_formateada": "RD$ 205,491,427.50",
    "tiene_inversion": true,
    "municipio": "Jarabacoa",
    "localidad": "Jarabacoa",
    "tipo": "Pavimentación Urbana",
    "fotos": [
      {
        "archivo": "image/ASFALTADO CALLES JARABACOA.jpg",
        "titulo": "Asfaltado de Calles del Centro de Jarabacoa"
      }
    ],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-04",
    "codigo": "LV-T04",
    "nombre": "CONSTRUCCIÓN DE LA CARRETERA LAS GUARANITA LA VEGA",
    "estado": "Terminada",
    "inversion": 200000000.0,
    "inversion_formateada": "RD$ 200,000,000.00",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Carreteras y Conexiones",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-05",
    "codigo": "LV-T05",
    "nombre": "PUENTE SOBRE EL RIO CAMÚ CAMINO A VILLA TAPIA",
    "estado": "Terminada",
    "inversion": 175347351.8,
    "inversion_formateada": "RD$ 175,347,351.80",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "Camino a Villa Tapia",
    "tipo": "Puentes y Pasarelas",
    "fotos": [
      {
        "archivo": "image/CONSTRUCCIÓN PUENTE SABANETA SOBRE EL RÍO CAMÚ.jpg",
        "titulo": "Construcción Puente Sabaneta sobre el Río Camú"
      }
    ],
    "coordenadas": {
      "lat": 19.225801,
      "lon": -70.47976
    },
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-06",
    "codigo": "LV-T06",
    "nombre": "READECUACIÓN Y AMPLIACIÓN DEL PUENTE DE LAS 7S",
    "estado": "Terminada",
    "inversion": 165000000.0,
    "inversion_formateada": "RD$ 165,000,000.00",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Puentes y Pasarelas",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-07",
    "codigo": "LV-T07",
    "nombre": "CONSTRUCCION MERCADO DE LA VEGA - ETAPA I",
    "estado": "Terminada",
    "inversion": 160495243.2,
    "inversion_formateada": "RD$ 160,495,243.20",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Edificaciones y Equipamiento",
    "fotos": [
      {
        "archivo": "image/CONSTRUCCIÓN MERCADO DE LA VEGA.jpg",
        "titulo": "Construcción del Mercado Municipal de La Vega"
      }
    ],
    "coordenadas": {
      "lat": 19.226128,
      "lon": -70.5285
    },
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-08",
    "codigo": "LV-T08",
    "nombre": "ASFALTADO DE CALLES DEL CENTRO DE LA VEGA DON FAUSTO",
    "estado": "Terminada",
    "inversion": 150000000.0,
    "inversion_formateada": "RD$ 150,000,000.00",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-09",
    "codigo": "LV-T09",
    "nombre": "CARRETERA RANCHO VIEJO-PELADERO",
    "estado": "Terminada",
    "inversion": 83000000.0,
    "inversion_formateada": "RD$ 83,000,000.00",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Carreteras y Conexiones",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-10",
    "codigo": "LV-T10",
    "nombre": "RECONSTRUCCIÓN DE LAS CALLES DE JARABACOA PINAL DORADO MARIA AUXILIADORA LA TRINCHERA",
    "estado": "Terminada",
    "inversion": 80000000.0,
    "inversion_formateada": "RD$ 80,000,000.00",
    "tiene_inversion": true,
    "municipio": "Jarabacoa",
    "localidad": "Jarabacoa",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-11",
    "codigo": "LV-T11",
    "nombre": "CONSTRUCCIÓN DE CARRETERA CARRERA DE PALMA - SANTO CERRO",
    "estado": "Terminada",
    "inversion": 53000000.0,
    "inversion_formateada": "RD$ 53,000,000.00",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "Carrera de Palma - Santo Cerro",
    "tipo": "Carreteras y Conexiones",
    "fotos": [
      {
        "archivo": "image/CONSTRUCCIÓN CARRETERA CARRERA DE PALMA - SANTO CERRO.jpg",
        "titulo": "Construcción Carretera Carrera de Palma - Santo Cerro"
      }
    ],
    "coordenadas": {
      "lat": 19.282602,
      "lon": -70.558323
    },
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-12",
    "codigo": "LV-T12",
    "nombre": "ASFALTADO DE LAS CALLES DE SABANETA",
    "estado": "Terminada",
    "inversion": 43000000.0,
    "inversion_formateada": "RD$ 43,000,000.00",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "Sabaneta",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-13",
    "codigo": "LV-T13",
    "nombre": "CONSTRUCCIÓN DE PUENTE PEATONAL Y MOTORIZADO CRUCE DE SOTO LA VEGA",
    "estado": "Terminada",
    "inversion": 39891334.62,
    "inversion_formateada": "RD$ 39,891,334.62",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "Cruce de Soto",
    "tipo": "Puentes y Pasarelas",
    "fotos": [
      {
        "archivo": "image/PUENTE PEATONAL Y MOTORIZADO ENTRADA DE SOTO.jpg",
        "titulo": "Puente Peatonal y Motorizado Cruce/Entrada de Soto"
      }
    ],
    "coordenadas": {
      "lat": 19.244672,
      "lon": -70.529066
    },
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-14",
    "codigo": "LV-T14",
    "nombre": "CONSTRUCCIÓN DEL PUENTE EL CAIMITO PROVINCIA LA VEGA",
    "estado": "Terminada",
    "inversion": 38200030.92,
    "inversion_formateada": "RD$ 38,200,030.92",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Puentes y Pasarelas",
    "fotos": [
      {
        "archivo": "image/PUENTE EL CAIMITO.jpg",
        "titulo": "Construcción del Puente El Caimito, Provincia La Vega"
      }
    ],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-15",
    "codigo": "LV-T15",
    "nombre": "PUENTE SOBRE ARROYO LOS CHARCOS",
    "estado": "Terminada",
    "inversion": 29733411.17,
    "inversion_formateada": "RD$ 29,733,411.17",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Puentes y Pasarelas",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-16",
    "codigo": "LV-T16",
    "nombre": "MURO DE GAVIÓN Y SOCAVÓN EN EL PUENTE SOBRE EL RIO VERDE",
    "estado": "Terminada",
    "inversion": 28369479.86,
    "inversion_formateada": "RD$ 28,369,479.86",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Puentes y Pasarelas",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-17",
    "codigo": "LV-T17",
    "nombre": "REASFALTADO CARRETERA TRAMO LA VIRGEN - CONSTANZA",
    "estado": "Terminada",
    "inversion": 25232673.6,
    "inversion_formateada": "RD$ 25,232,673.60",
    "tiene_inversion": true,
    "municipio": "Constanza",
    "localidad": "Constanza",
    "tipo": "Carreteras y Conexiones",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-18",
    "codigo": "LV-T18",
    "nombre": "MURO DE GAVION Y SOCAVON EN EL PUENTE ARROYO HONDO",
    "estado": "Terminada",
    "inversion": 23953111.89,
    "inversion_formateada": "RD$ 23,953,111.89",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Puentes y Pasarelas",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-19",
    "codigo": "LV-T19",
    "nombre": "CONSTRUCCIÓN DE UN PUENTE EN LA VEREDA",
    "estado": "Terminada",
    "inversion": 22150918.58,
    "inversion_formateada": "RD$ 22,150,918.58",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Puentes y Pasarelas",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-20",
    "codigo": "LV-T20",
    "nombre": "VIVIENDAS ECONOMICAS LA VEGA",
    "estado": "Terminada",
    "inversion": 10080000.0,
    "inversion_formateada": "RD$ 10,080,000.00",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Edificaciones y Equipamiento",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-21",
    "codigo": "LV-T21",
    "nombre": "REPARACION PUENTE METALICO RANCHITO PROVINCIA LA VEGA",
    "estado": "Terminada",
    "inversion": 3548935.13,
    "inversion_formateada": "RD$ 3,548,935.13",
    "tiene_inversion": true,
    "municipio": "Jima Abajo",
    "localidad": "Ranchito",
    "tipo": "Puentes y Pasarelas",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-22",
    "codigo": "LV-T22",
    "nombre": "SUMINISTRO HAC JARABACOA- LOS SALESIANOS",
    "estado": "Terminada",
    "inversion": 2512690.94,
    "inversion_formateada": "RD$ 2,512,690.94",
    "tiene_inversion": true,
    "municipio": "Jarabacoa",
    "localidad": "Jarabacoa",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-23",
    "codigo": "LV-T23",
    "nombre": "ASFALTO DE CALLES SECTOR SANTO DOMINGO SABIO",
    "estado": "Terminada",
    "inversion": 0.0,
    "inversion_formateada": "Incluido en Plan de Asfalto",
    "tiene_inversion": false,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-24",
    "codigo": "LV-T24",
    "nombre": "ASFALTO DE CALLES SECTOR ARBOLEDA 2",
    "estado": "Terminada",
    "inversion": 0.0,
    "inversion_formateada": "Incluido en Plan de Asfalto",
    "tiene_inversion": false,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-25",
    "codigo": "LV-T25",
    "nombre": "ASFALTO DE CALLES DEL SECTOR VILLA TAPIA",
    "estado": "Terminada",
    "inversion": 0.0,
    "inversion_formateada": "Incluido en Plan de Asfalto",
    "tiene_inversion": false,
    "municipio": "La Vega",
    "localidad": "Camino a Villa Tapia",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-26",
    "codigo": "LV-T26",
    "nombre": "ASFALTO SECTOR VILLA ROSA",
    "estado": "Terminada",
    "inversion": 0.0,
    "inversion_formateada": "Incluido en Plan de Asfalto",
    "tiene_inversion": false,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-27",
    "codigo": "LV-T27",
    "nombre": "ASFALTO SECTOR LA CIGUA",
    "estado": "Terminada",
    "inversion": 0.0,
    "inversion_formateada": "Incluido en Plan de Asfalto",
    "tiene_inversion": false,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-28",
    "codigo": "LV-T28",
    "nombre": "ASFALTO SECTOR SAN MARTIN",
    "estado": "Terminada",
    "inversion": 0.0,
    "inversion_formateada": "Incluido en Plan de Asfalto",
    "tiene_inversion": false,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-29",
    "codigo": "LV-T29",
    "nombre": "ASFALTO DE CALLES SECTOR BARRIO INCO",
    "estado": "Terminada",
    "inversion": 0.0,
    "inversion_formateada": "Incluido en Plan de Asfalto",
    "tiene_inversion": false,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-30",
    "codigo": "LV-T30",
    "nombre": "ASFALTO DE CALLES SECTOR DOÑA MERIN",
    "estado": "Terminada",
    "inversion": 0.0,
    "inversion_formateada": "Incluido en Plan de Asfalto",
    "tiene_inversion": false,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-31",
    "codigo": "LV-T31",
    "nombre": "ASFALTO DE CALLES SECTOR ANA MAGALIS",
    "estado": "Terminada",
    "inversion": 0.0,
    "inversion_formateada": "Incluido en Plan de Asfalto",
    "tiene_inversion": false,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-32",
    "codigo": "LV-T32",
    "nombre": "ASFALTO DE CALLES SECTOR RANCHO VIEJO LOS PELADEROS PRIMERA PARTE",
    "estado": "Terminada",
    "inversion": 0.0,
    "inversion_formateada": "Incluido en Plan de Asfalto",
    "tiene_inversion": false,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-33",
    "codigo": "LV-T33",
    "nombre": "ASFALTO DE CALLES SECTOR CARRERA DE PALMA",
    "estado": "Terminada",
    "inversion": 0.0,
    "inversion_formateada": "Incluido en Plan de Asfalto",
    "tiene_inversion": false,
    "municipio": "La Vega",
    "localidad": "Carrera de Palma - Santo Cerro",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-TERM-34",
    "codigo": "LV-T34",
    "nombre": "ASFALTO DE AVE. MONSEÑOR PANAL",
    "estado": "Terminada",
    "inversion": 0.0,
    "inversion_formateada": "Incluido en Plan de Asfalto",
    "tiene_inversion": false,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Pavimentación Urbana",
    "fotos": [],
    "coordenadas": null,
    "fuente": "MOPC - 34 Obras Terminadas (Enero 2025)"
  },
  {
    "id": "OBR-EJEC-01",
    "codigo": "LV-E01",
    "nombre": "RECONSTRUCCIÓN DE CALZADAS AUTOPISTA DUARTE TRAMO CONTROBA (ENTRADA DE SF PROVINCIA LA VEGA)",
    "estado": "En Ejecución",
    "inversion": 2100000000.0,
    "inversion_formateada": "RD$ 2,100,000,000.00",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "Autopista Duarte - Controba",
    "tipo": "Carreteras y Conexiones",
    "fotos": [
      {
        "archivo": "image/Senal-Hombres-Trabajando.webp",
        "titulo": "Señalización Oficial de Obra en Ejecución - MOPC"
      }
    ],
    "coordenadas": null,
    "fuente": "MOPC - 13 Obras en Ejecución (Enero 2025)"
  },
  {
    "id": "OBR-EJEC-02",
    "codigo": "LV-E02",
    "nombre": "RECONSTRUCCIÓN CARRETERA JARABACOA - LA VEGA",
    "estado": "En Ejecución",
    "inversion": 573000000.0,
    "inversion_formateada": "RD$ 573,000,000.00",
    "tiene_inversion": true,
    "municipio": "Jarabacoa",
    "localidad": "Jarabacoa",
    "tipo": "Carreteras y Conexiones",
    "fotos": [
      {
        "archivo": "image/Senal-Hombres-Trabajando.webp",
        "titulo": "Señalización Oficial de Obra en Ejecución - MOPC"
      }
    ],
    "coordenadas": null,
    "fuente": "MOPC - 13 Obras en Ejecución (Enero 2025)"
  },
  {
    "id": "OBR-EJEC-03",
    "codigo": "LV-E03",
    "nombre": "CARRETERA ELADIO ROMERO SANTO-SANTA ANA-SABANA REY-LOS SOLARES",
    "estado": "En Ejecución",
    "inversion": 291222206.44,
    "inversion_formateada": "RD$ 291,222,206.44",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Carreteras y Conexiones",
    "fotos": [
      {
        "archivo": "image/Senal-Hombres-Trabajando.webp",
        "titulo": "Señalización Oficial de Obra en Ejecución - MOPC"
      }
    ],
    "coordenadas": null,
    "fuente": "MOPC - 13 Obras en Ejecución (Enero 2025)"
  },
  {
    "id": "OBR-EJEC-04",
    "codigo": "LV-E04",
    "nombre": "CONSTRUCCIÓN DE LA CARRETERA ARROYO HONDO - CUTUPU",
    "estado": "En Ejecución",
    "inversion": 143000000.0,
    "inversion_formateada": "RD$ 143,000,000.00",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "Arroyo Hondo - Cutupú",
    "tipo": "Carreteras y Conexiones",
    "fotos": [
      {
        "archivo": "image/Senal-Hombres-Trabajando.webp",
        "titulo": "Señalización Oficial de Obra en Ejecución - MOPC"
      }
    ],
    "coordenadas": null,
    "fuente": "MOPC - 13 Obras en Ejecución (Enero 2025)"
  },
  {
    "id": "OBR-EJEC-05",
    "codigo": "LV-E05",
    "nombre": "RECONSTRUCCIÓN DE CALLES CABIRMOTA - LAS CANAS",
    "estado": "En Ejecución",
    "inversion": 100000000.0,
    "inversion_formateada": "RD$ 100,000,000.00",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Pavimentación Urbana",
    "fotos": [
      {
        "archivo": "image/Senal-Hombres-Trabajando.webp",
        "titulo": "Señalización Oficial de Obra en Ejecución - MOPC"
      }
    ],
    "coordenadas": null,
    "fuente": "MOPC - 13 Obras en Ejecución (Enero 2025)"
  },
  {
    "id": "OBR-EJEC-06",
    "codigo": "LV-E06",
    "nombre": "PUENTE DE HORMIGÓN POSTENSADO SOBRE RIO LA PALMA CARRETERA EL HOYITO. DM. TIREO CONSTANZA",
    "estado": "En Ejecución",
    "inversion": 60837637.03,
    "inversion_formateada": "RD$ 60,837,637.03",
    "tiene_inversion": true,
    "municipio": "Constanza",
    "localidad": "Constanza",
    "tipo": "Puentes y Pasarelas",
    "fotos": [
      {
        "archivo": "image/Senal-Hombres-Trabajando.webp",
        "titulo": "Señalización Oficial de Obra en Ejecución - MOPC"
      }
    ],
    "coordenadas": null,
    "fuente": "MOPC - 13 Obras en Ejecución (Enero 2025)"
  },
  {
    "id": "OBR-EJEC-07",
    "codigo": "LV-E07",
    "nombre": "SOLUCIÓN DEL PUNTO CRITICO LA PISTA PASO BAJITO",
    "estado": "En Ejecución",
    "inversion": 50000000.0,
    "inversion_formateada": "RD$ 50,000,000.00",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Mitigación y Drenaje",
    "fotos": [
      {
        "archivo": "image/Senal-Hombres-Trabajando.webp",
        "titulo": "Señalización Oficial de Obra en Ejecución - MOPC"
      }
    ],
    "coordenadas": null,
    "fuente": "MOPC - 13 Obras en Ejecución (Enero 2025)"
  },
  {
    "id": "OBR-EJEC-08",
    "codigo": "LV-E08",
    "nombre": "CONSTRUCCIÓN DE CAMINO PONTÓN- EL PINITO MATANZA - CRUCE DE SABANETA",
    "estado": "En Ejecución",
    "inversion": 36000000.0,
    "inversion_formateada": "RD$ 36,000,000.00",
    "tiene_inversion": true,
    "municipio": "La Vega",
    "localidad": "Sabaneta",
    "tipo": "Caminos Vecinales",
    "fotos": [
      {
        "archivo": "image/Senal-Hombres-Trabajando.webp",
        "titulo": "Señalización Oficial de Obra en Ejecución - MOPC"
      }
    ],
    "coordenadas": null,
    "fuente": "MOPC - 13 Obras en Ejecución (Enero 2025)"
  },
  {
    "id": "OBR-EJEC-09",
    "codigo": "LV-E09",
    "nombre": "REPARACIÓN Y TERMINACIÓN CARRETERA ENRIQUE JIMENEZ MOYA CONSTANZA LA VEGA",
    "estado": "En Ejecución",
    "inversion": 30737381.91,
    "inversion_formateada": "RD$ 30,737,381.91",
    "tiene_inversion": true,
    "municipio": "Constanza",
    "localidad": "Constanza",
    "tipo": "Carreteras y Conexiones",
    "fotos": [
      {
        "archivo": "image/CARRETERA ENRIQUE JIMENEZ MOYA, CONSTANZA.jpg",
        "titulo": "Reparación y Terminación Carretera Enrique Jiménez Moya, Constanza"
      },
      {
        "archivo": "image/Senal-Hombres-Trabajando.webp",
        "titulo": "Señalización Oficial de Obra en Ejecución - MOPC"
      }
    ],
    "coordenadas": null,
    "fuente": "MOPC - 13 Obras en Ejecución (Enero 2025)"
  },
  {
    "id": "OBR-EJEC-10",
    "codigo": "LV-E10",
    "nombre": "ALCANTARILLA DE CAJÓN SIMPLE 10.00 X 5.67 MTS EN ARROYO BONITO. LA DESCUBIERTA – CONSTANZA",
    "estado": "En Ejecución",
    "inversion": 17757480.0,
    "inversion_formateada": "RD$ 17,757,480.00",
    "tiene_inversion": true,
    "municipio": "Constanza",
    "localidad": "Constanza",
    "tipo": "Puentes y Pasarelas",
    "fotos": [
      {
        "archivo": "image/Senal-Hombres-Trabajando.webp",
        "titulo": "Señalización Oficial de Obra en Ejecución - MOPC"
      }
    ],
    "coordenadas": null,
    "fuente": "MOPC - 13 Obras en Ejecución (Enero 2025)"
  },
  {
    "id": "OBR-EJEC-11",
    "codigo": "LV-E11",
    "nombre": "DEMOLICIÓN Y RECONSTRUCCIÓN DEL PUENTE ANTONIO GUZMAN SOBRE EL RIO CAMÚ -",
    "estado": "En Ejecución",
    "inversion": 0.0,
    "inversion_formateada": "En Proceso de Contratación / Presupuesto en Asignación",
    "tiene_inversion": false,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Puentes y Pasarelas",
    "fotos": [
      {
        "archivo": "image/Senal-Hombres-Trabajando.webp",
        "titulo": "Señalización Oficial de Obra en Ejecución - MOPC"
      }
    ],
    "coordenadas": null,
    "fuente": "MOPC - 13 Obras en Ejecución (Enero 2025)"
  },
  {
    "id": "OBR-EJEC-12",
    "codigo": "LV-E12",
    "nombre": "CAMINO VECINAL MATA DE CAFE LA CIENEGA -",
    "estado": "En Ejecución",
    "inversion": 0.0,
    "inversion_formateada": "En Proceso de Contratación / Presupuesto en Asignación",
    "tiene_inversion": false,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Caminos Vecinales",
    "fotos": [
      {
        "archivo": "image/Senal-Hombres-Trabajando.webp",
        "titulo": "Señalización Oficial de Obra en Ejecución - MOPC"
      }
    ],
    "coordenadas": null,
    "fuente": "MOPC - 13 Obras en Ejecución (Enero 2025)"
  },
  {
    "id": "OBR-EJEC-13",
    "codigo": "LV-E13",
    "nombre": "CAMINO VECINAL ATOLLADERA -",
    "estado": "En Ejecución",
    "inversion": 0.0,
    "inversion_formateada": "En Proceso de Contratación / Presupuesto en Asignación",
    "tiene_inversion": false,
    "municipio": "La Vega",
    "localidad": "La Vega",
    "tipo": "Caminos Vecinales",
    "fotos": [
      {
        "archivo": "image/Senal-Hombres-Trabajando.webp",
        "titulo": "Señalización Oficial de Obra en Ejecución - MOPC"
      }
    ],
    "coordenadas": null,
    "fuente": "MOPC - 13 Obras en Ejecución (Enero 2025)"
  }
],
    programasEspeciales: {
  "asfalto_colocado": {
    "m2": "1,468,976.69",
    "m3": "91,829.18",
    "km": "262.21",
    "sectores": 129,
    "inversion": "RD$ 2,249,814,910.00"
  },
  "aceras_y_contenes": {
    "aceras": "21,372.68 M2",
    "contenes": "19,912.60 ML",
    "total": "19.9 KM",
    "inversion": "RD$ 41,574,542.64"
  },
  "asfalto_programado_2025": {
    "periodo": "1er. Trimestre 2025",
    "sectores": [
      {
        "sector": "Calles del Sector Las Guaranitas",
        "municipio": "Las Guaranitas (La Vega)",
        "km": 4.0
      },
      {
        "sector": "Mirador Universitario",
        "municipio": "La Vega",
        "km": 3.0
      },
      {
        "sector": "Don Juan",
        "municipio": "La Vega",
        "km": 8.5
      },
      {
        "sector": "Mantenimiento al Centro del Pueblo",
        "municipio": "La Vega",
        "km": 6.0
      }
    ],
    "total_km": 21.5
  }
}
};

// Data Helper methods
window.MOPCData = {
    getRawData() {
        return MOPC_DATASET;
    },

    getAllObras() {
        return JSON.parse(JSON.stringify(MOPC_DATASET.obras));
    },

    getProgramasEspeciales() {
        return JSON.parse(JSON.stringify(MOPC_DATASET.programasEspeciales));
    },

    getMetadata() {
        return { ...MOPC_DATASET.metadata };
    },

    formatDOP(amount) {
        if (amount === null || amount === undefined || isNaN(amount) || amount === 0) {
            return 'RD$ 0.00';
        }
        return 'RD$ ' + Number(amount).toLocaleString('es-DO', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    },

    formatShortDOP(amount) {
        if (!amount || amount === 0) return 'RD$ 0';
        if (amount >= 1e9) {
            return 'RD$ ' + (amount / 1e9).toFixed(2) + ' B';
        }
        if (amount >= 1e6) {
            return 'RD$ ' + (amount / 1e6).toFixed(1) + ' M';
        }
        if (amount >= 1e3) {
            return 'RD$ ' + (amount / 1e3).toFixed(0) + ' K';
        }
        return 'RD$ ' + amount.toLocaleString('es-DO');
    },

    calculateKPIs(obras) {
        const totalObras = obras.length;
        const terminadas = obras.filter(o => o.estado === 'Terminada');
        const ejecucion = obras.filter(o => o.estado === 'En Ejecución');

        const invTerminadas = terminadas.reduce((acc, o) => acc + (o.inversion || 0), 0);
        const invEjecucion = ejecucion.reduce((acc, o) => acc + (o.inversion || 0), 0);
        const invTotalObras = invTerminadas + invEjecucion;

        const pctTerminadas = totalObras > 0 ? ((terminadas.length / totalObras) * 100).toFixed(1) : 0;
        const pctEjecucion = totalObras > 0 ? ((ejecucion.length / totalObras) * 100).toFixed(1) : 0;

        const programas = MOPC_DATASET.programasEspeciales;
        const invAsfalto = 2249814910.00;
        const invAceras = 41574542.64;
        const invGranTotal = invTotalObras + invAsfalto + invAceras;

        return {
            totalObras,
            countTerminadas: terminadas.length,
            countEjecucion: ejecucion.length,
            pctTerminadas,
            pctEjecucion,
            invTerminadas,
            invEjecucion,
            invTotalObras,
            invAsfalto,
            invAceras,
            invGranTotal,
            asfaltoKm: programas.asfalto_colocado.km || '262.21',
            asfaltoM2: programas.asfalto_colocado.m2 || '1,468,976.69',
            asfaltoSectores: programas.asfalto_colocado.sectores || 129,
            acerasKm: programas.aceras_y_contenes.total || '19.9 KM'
        };
    }
};
