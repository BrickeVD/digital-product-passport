// Complete product database for demo purposes
// Each product has full data for all passport sections

export interface DemoProduct {
  id: string
  sector: string
  sectorIcon: string
  brand: {
    name: string
    logo: string
    color: {
      hue: number // oklch hue value
      primary: string
      primaryForeground: string
      secondary: string
      muted: string
    }
  }
  product: {
    name: string
    series: string
    model: string
    description: string
    image: string
    serialNumber: string
    upc: string
    manufactureDate: string
    warrantyUntil: string
    status: "active" | "warranty" | "service"
  }
  specifications: {
    key: Array<{ label: string; value: string; icon?: string }>
    categories: Array<{
      name: string
      specs: Array<{ label: string; value: string }>
    }>
  }
  replacementParts: Array<{
    id: string
    name: string
    partNumber: string
    category: string
    quantity: number
    unit: string
    lifespan?: string
    description: string
    specifications: Array<{ label: string; value: string }>
    isOptional?: boolean
  }>
  optionalProducts: Array<{
    id: string
    name: string
    partNumber: string
    category: string
    description: string
    specifications: Array<{ label: string; value: string }>
  }>
  maintenance: {
    history: Array<{
      date: string
      type: string
      description: string
      technician: string
      partsUsed?: string[]
      nextService?: string
    }>
    upcoming: Array<{
      date: string
      type: string
      description: string
      priority: "low" | "medium" | "high"
    }>
  }
  sustainability: {
    energyLabel?: string
    co2Footprint: string
    recyclability: string
    materials: Array<{ name: string; percentage: number; recyclable: boolean }>
    certifications: string[]
    repairabilityScore?: number
    energySavingFeatures?: string[]
  }
  certifications: Array<{
    name: string
    issuer: string
    validUntil: string
    number: string
  }>
  ownership: {
    current: {
      company: string
      contact: string
      email: string
      since: string
      verified: boolean
    }
    history: Array<{
      company: string
      from: string
      to: string
      type: string
    }>
  }
  documentation?: Array<{
    title: string
    type: string // PDF, Video, Web
    category: string // Handleiding, Datasheet, Installatie, etc.
    url?: string
    downloadUrl?: string
    size?: string
    language?: string
    icon?: string
  }>
  allergens?: {
    contains: string[] // Allergens definitely present
    mayContain: string[] // Cross-contamination risk
    freeFrom: string[] // Confirmed free from (based on ingredients)
    ingredients?: string // Full ingredients list
  }
}

export const demoProducts: DemoProduct[] = [
  // SCHNEIDER ELECTRIC - Industrial Automation
  {
    id: "schneider-atv630",
    sector: "Industrie",
    sectorIcon: "Factory",
    brand: {
      name: "Schneider Electric",
      logo: "/images/schneider-electric-logo-jpg.png",
      color: {
        hue: 145,
        primary: "oklch(0.55 0.2 145)",
        primaryForeground: "oklch(0.985 0 0)",
        secondary: "oklch(0.96 0.02 145)",
        muted: "oklch(0.92 0.03 145)",
      },
    },
    product: {
      name: "Altivar Process ATV630",
      series: "ATV600",
      model: "ATV630D11M3",
      description: "Variable speed drive 200-240V, ND: 11kW / HD: 7.5kW, drie fase, IP21 kast montage",
      image:
        "https://download.schneider-electric.com/files?p_Doc_Ref=ATV630_FCD20220620B_Main&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png",
      serialNumber: "SE-2024-ATV630-78234",
      upc: "785901415961",
      manufactureDate: "2024-03-15",
      warrantyUntil: "2027-03-15",
      status: "active",
    },
    documentation: [
      {
        title: "Gebruikershandleiding ATV630",
        type: "PDF",
        category: "Handleidingen",
        url: "https://www.se.com/be/nl/download/document/ATV630_Installation_manual/",
        downloadUrl: "https://download.schneider-electric.com/files?p_Doc_Ref=ATV630_Installation_manual",
        size: "12.5 MB",
        language: "NL",
        icon: "Book",
      },
      {
        title: "Installatiehandleiding",
        type: "PDF",
        category: "Handleidingen",
        url: "https://www.se.com/be/nl/download/document/ATV630_Quick_Start/",
        downloadUrl: "https://download.schneider-electric.com/files?p_Doc_Ref=ATV630_Quick_Start",
        size: "3.2 MB",
        language: "NL",
        icon: "Wrench",
      },
      {
        title: "Programmeerhandleiding",
        type: "PDF",
        category: "Handleidingen",
        url: "https://www.se.com/be/nl/download/document/ATV630_Programming_manual/",
        downloadUrl: "https://download.schneider-electric.com/files?p_Doc_Ref=ATV630_Programming_manual",
        size: "28.4 MB",
        language: "NL",
        icon: "FileText",
      },
      {
        title: "Technische Datasheet",
        type: "PDF",
        category: "Technische documenten",
        url: "https://www.se.com/be/nl/product/ATV630D11M3/",
        downloadUrl: "https://download.schneider-electric.com/files?p_Doc_Ref=ATV630D11M3_document",
        size: "1.8 MB",
        language: "NL",
        icon: "FileText",
      },
      {
        title: "CAD Tekeningen (2D/3D)",
        type: "ZIP",
        category: "Technische documenten",
        downloadUrl: "https://download.schneider-electric.com/files?p_Doc_Ref=ATV630_CAD",
        size: "5.6 MB",
        language: "Universeel",
        icon: "FileText",
      },
      {
        title: "Firmware Update v2.8",
        type: "BIN",
        category: "Software",
        downloadUrl: "https://www.se.com/be/nl/download/document/ATV630_Firmware/",
        size: "8.2 MB",
        language: "Universeel",
        icon: "FileText",
      },
      {
        title: "Inbedrijfstelling Video Tutorial",
        type: "Video",
        category: "Training",
        url: "https://www.youtube.com/watch?v=schneider-atv630-setup",
        language: "EN",
        icon: "FileVideo",
      },
    ],
    specifications: {
      key: [
        { label: "Vermogen", value: "11 kW / 15 HP", icon: "Zap" },
        { label: "Spanning", value: "200-240V", icon: "Activity" },
        { label: "Bescherming", value: "IP21", icon: "Shield" },
        { label: "Gewicht", value: "13.8 kg", icon: "Weight" },
      ],
      categories: [
        {
          name: "Elektrische specificaties",
          specs: [
            { label: "Nominaal vermogen (ND)", value: "11 kW" },
            { label: "Zwaar vermogen (HD)", value: "7.5 kW" },
            { label: "Ingangsspanning", value: "200-240V ±10%" },
            { label: "Frequentiebereik", value: "50/60 Hz" },
            { label: "Uitgangsstroom (ND)", value: "46.8 A" },
            { label: "Uitgangsstroom (HD)", value: "32.7 A" },
            { label: "Motorfrequentie", value: "0.1-599 Hz" },
          ],
        },
        {
          name: "Fysieke specificaties",
          specs: [
            { label: "Afmetingen (H×B×D)", value: "211 × 546 × 232 mm" },
            { label: "Gewicht", value: "13.8 kg" },
            { label: "Beschermingsklasse", value: "IP21" },
            { label: "Montage", value: "Kast montage" },
          ],
        },
        {
          name: "Communicatie",
          specs: [
            { label: "Standaard poorten", value: "Modbus RTU, CANopen" },
            { label: "Optionele protocollen", value: "PROFINET, EtherNet/IP" },
            { label: "Display", value: "Grafisch LCD (optioneel)" },
          ],
        },
      ],
    },
    replacementParts: [
      {
        id: "vx5vpm001",
        name: "Koelventilator",
        partNumber: "VX5VPM001",
        category: "Koeling",
        quantity: 1,
        unit: "stuks",
        lifespan: "5 jaar",
        description: "Vervangende koelventilator voor ATV630 drives",
        specifications: [
          { label: "Type", value: "Axiaal" },
          { label: "Spanning", value: "24V DC" },
          { label: "Luchtverplaatsing", value: "120 m³/h" },
        ],
      },
    ],
    optionalProducts: [
      {
        id: "vw3a1111",
        name: "Grafisch Display Terminal",
        partNumber: "VW3A1111",
        category: "HMI",
        description: "Afneembare grafische display voor lokale bediening",
        specifications: [
          { label: "Display", value: "Grafisch LCD" },
          { label: "Talen", value: "Meertalig" },
        ],
      },
      {
        id: "vw3a3203",
        name: "I/O Uitbreidingsmodule",
        partNumber: "VW3A3203",
        category: "I/O",
        description: "Extra digitale en analoge I/O aansluitingen",
        specifications: [
          { label: "Digitale ingangen", value: "6" },
          { label: "Analoge uitgangen", value: "2" },
        ],
      },
      {
        id: "vw3a4702",
        name: "EMC Filter Klasse C2",
        partNumber: "VW3A4702",
        category: "EMC",
        description: "EMC-filter voor industriële omgevingen",
        specifications: [
          { label: "EMC klasse", value: "C2" },
          { label: "Toepassing", value: "Industrieel" },
        ],
      },
    ],
    maintenance: {
      history: [
        {
          date: "2024-09-15",
          type: "Preventief onderhoud",
          description: "Jaarlijkse inspectie en firmware update naar v2.8",
          technician: "Jan Peeters",
          partsUsed: [],
          nextService: "2025-09-15",
        },
      ],
      upcoming: [
        {
          date: "2025-09-15",
          type: "Preventief onderhoud",
          description: "Jaarlijkse inspectie en ventilatorcontrole",
          priority: "medium",
        },
      ],
    },
    sustainability: {
      co2Footprint: "85 kg CO₂e",
      recyclability: "92%",
      materials: [
        { name: "Staal", percentage: 45, recyclable: true },
        { name: "Aluminium", percentage: 25, recyclable: true },
        { name: "Kunststof", percentage: 18, recyclable: true },
        { name: "Koper", percentage: 10, recyclable: true },
        { name: "Elektronica", percentage: 2, recyclable: false },
      ],
      certifications: ["CE", "UL", "RoHS", "REACH"],
      energySavingFeatures: [
        "Stop and Go functie - tot 30% energiebesparing",
        "Automatische energieoptimalisatie",
        "Regeneratieve remfunctie",
      ],
    },
    certifications: [
      {
        name: "CE Conformiteit",
        issuer: "TÜV Rheinland",
        validUntil: "2027-12-31",
        number: "CE-2024-SE-78234",
      },
      {
        name: "UL Listed",
        issuer: "Underwriters Laboratories",
        validUntil: "2026-06-30",
        number: "UL-508C-2024-1234",
      },
    ],
    ownership: {
      current: {
        company: "Industriële Systemen BV",
        contact: "Marc Van Der Berg",
        email: "m.vanderberg@industrielesystemen.be",
        since: "2024-04-01",
        verified: true,
      },
      history: [
        {
          company: "Schneider Electric België",
          from: "2024-03-15",
          to: "2024-04-01",
          type: "Fabrikant",
        },
      ],
    },
  },

  // MIELE - White Goods / Appliances
  {
    id: "miele-wwd660",
    sector: "Witgoed",
    sectorIcon: "Waves",
    brand: {
      name: "Miele",
      logo: "/images/miele-logo.png",
      color: {
        hue: 15,
        primary: "oklch(0.55 0.25 15)",
        primaryForeground: "oklch(0.985 0 0)",
        secondary: "oklch(0.96 0.02 15)",
        muted: "oklch(0.92 0.03 15)",
      },
    },
    product: {
      name: "W1 Excellence Wasmachine",
      series: "W1",
      model: "WWD660 WCS TwinDos",
      description: "Voorlader wasmachine 8kg met TwinDos automatische wasmiddeldosering en WiFiConn@ct",
      image: "/images/miele-20w1-20wasmachine-20twindos.webp",
      serialNumber: "ML-2024-WWD660-45892",
      upc: "4002516375128",
      manufactureDate: "2024-01-20",
      warrantyUntil: "2026-01-20",
      status: "warranty",
    },
    documentation: [
      {
        title: "Gebruiksaanwijzing WWD660",
        type: "PDF",
        category: "Handleidingen",
        url: "https://www.miele.be/nl/c/handleidingen-702.htm",
        downloadUrl: "https://www.miele.be/pmedia/ZGA/TX2001/10713740-000-01_10713740-01.pdf",
        size: "8.4 MB",
        language: "NL",
        icon: "Book",
      },
      {
        title: "Installatiehandleiding",
        type: "PDF",
        category: "Handleidingen",
        url: "https://www.miele.be/nl/c/handleidingen-702.htm",
        downloadUrl: "https://www.miele.be/pmedia/ZGA/TX2001/10713740-installation.pdf",
        size: "2.1 MB",
        language: "NL",
        icon: "Wrench",
      },
      {
        title: "TwinDos Handleiding",
        type: "PDF",
        category: "Handleidingen",
        downloadUrl: "https://www.miele.be/pmedia/ZGA/TX2001/twindos-guide.pdf",
        size: "1.5 MB",
        language: "NL",
        icon: "FileText",
      },
      {
        title: "Miele@home App Handleiding",
        type: "PDF",
        category: "Handleidingen",
        url: "https://www.miele.be/nl/c/miele-home-app-702.htm",
        size: "3.2 MB",
        language: "NL",
        icon: "FileText",
      },
      {
        title: "EU Energie Label",
        type: "PDF",
        category: "Technische documenten",
        downloadUrl: "https://www.miele.be/pmedia/ZGA/TX2001/energy-label-wwd660.pdf",
        size: "0.5 MB",
        language: "EU",
        icon: "FileText",
      },
      {
        title: "Productfiche (EU 2019/2014)",
        type: "PDF",
        category: "Technische documenten",
        downloadUrl: "https://www.miele.be/pmedia/ZGA/TX2001/product-fiche-wwd660.pdf",
        size: "0.8 MB",
        language: "NL",
        icon: "FileText",
      },
      {
        title: "Video: TwinDos Instellen",
        type: "Video",
        category: "Training",
        url: "https://www.youtube.com/watch?v=miele-twindos-setup",
        language: "NL",
        icon: "FileVideo",
      },
    ],
    specifications: {
      key: [
        { label: "Capaciteit", value: "8 kg", icon: "Package" },
        { label: "Toerental", value: "1600 rpm", icon: "RotateCw" },
        { label: "Energie", value: "A", icon: "Zap" },
        { label: "Geluid", value: "72 dB", icon: "Volume2" },
      ],
      categories: [
        {
          name: "Wasprestaties",
          specs: [
            { label: "Vulgewicht", value: "8.0 kg" },
            { label: "Max. centrifugetoerental", value: "1600 rpm" },
            { label: "Energielabel", value: "A" },
            { label: "Wasklasse", value: "A" },
            { label: "Sluisklasse", value: "A" },
            { label: "Waterverbruik per cyclus", value: "48 liter" },
          ],
        },
        {
          name: "Afmetingen",
          specs: [
            { label: "Hoogte", value: "850 mm" },
            { label: "Breedte", value: "596 mm" },
            { label: "Diepte", value: "643 mm" },
            { label: "Gewicht", value: "96 kg" },
          ],
        },
        {
          name: "Functies",
          specs: [
            { label: "TwinDos automatisch doseren", value: "Ja" },
            { label: "CapDosing", value: "Ja" },
            { label: "AddLoad (later toevoegen)", value: "Ja" },
            { label: "Miele@home (WiFi)", value: "Ja" },
            { label: "SoftSteam stoomfunctie", value: "Ja" },
          ],
        },
        {
          name: "Elektrische aansluiting",
          specs: [
            { label: "Spanning", value: "220-240V" },
            { label: "Frequentie", value: "50 Hz" },
            { label: "Aansluitwaarde", value: "2.3 kW" },
          ],
        },
      ],
    },
    replacementParts: [
      {
        id: "miele-deurslot",
        name: "Deurslot mechanisme",
        partNumber: "11007818",
        category: "Deuren",
        quantity: 1,
        unit: "stuks",
        lifespan: "10+ jaar",
        description: "Origineel Miele deurslot voor W1 serie",
        specifications: [
          { label: "Type", value: "Elektronisch" },
          { label: "Compatibiliteit", value: "W1 Serie" },
        ],
      },
      {
        id: "miele-pomp",
        name: "Afvoerpomp",
        partNumber: "11019999",
        category: "Pompen",
        quantity: 1,
        unit: "stuks",
        lifespan: "8 jaar",
        description: "Loogpomp voor afvoer waswater",
        specifications: [
          { label: "Capaciteit", value: "30 l/min" },
          { label: "Spanning", value: "220V" },
        ],
      },
      {
        id: "miele-manchet",
        name: "Deurrubber manchet",
        partNumber: "12103510",
        category: "Afdichtingen",
        quantity: 1,
        unit: "stuks",
        lifespan: "10 jaar",
        description: "Flexibele afdichting tussen deur en trommel",
        specifications: [
          { label: "Materiaal", value: "EPDM Rubber" },
          { label: "Diameter", value: "Passend W1" },
        ],
      },
    ],
    optionalProducts: [
      {
        id: "miele-ultraphase1",
        name: "UltraPhase 1",
        partNumber: "WA UP1 1401 L",
        category: "Wasmiddel",
        description: "2-componenten wasmiddel voor witte en gekleurde was - fase 1",
        specifications: [
          { label: "Inhoud", value: "1.4 liter" },
          { label: "Doseringstype", value: "TwinDos" },
        ],
      },
      {
        id: "miele-ultraphase2",
        name: "UltraPhase 2",
        partNumber: "WA UP2 1402 L",
        category: "Wasmiddel",
        description: "2-componenten wasmiddel voor witte en gekleurde was - fase 2",
        specifications: [
          { label: "Inhoud", value: "1.4 liter" },
          { label: "Doseringstype", value: "TwinDos" },
        ],
      },
      {
        id: "miele-droger",
        name: "T1 Warmtepompdroger",
        partNumber: "TWD 360 WP 8kg",
        category: "Matching Product",
        description: "Bijpassende warmtepompdroger 8 kg met EcoDry technologie",
        specifications: [
          { label: "Capaciteit", value: "8 kg" },
          { label: "Energielabel", value: "A+++" },
        ],
      },
    ],
    maintenance: {
      history: [
        {
          date: "2024-12-01",
          type: "Installatie",
          description: "Professionele installatie en aansluiting TwinDos systeem",
          technician: "Miele Service",
          partsUsed: [],
          nextService: "2025-12-01",
        },
      ],
      upcoming: [
        {
          date: "2025-06-20",
          type: "Preventief onderhoud",
          description: "Jaarlijkse reiniging en controle filter/pomp",
          priority: "low",
        },
      ],
    },
    sustainability: {
      energyLabel: "A",
      co2Footprint: "320 kg CO₂e",
      recyclability: "85%",
      repairabilityScore: 9,
      materials: [
        { name: "Staal", percentage: 55, recyclable: true },
        { name: "Kunststof", percentage: 25, recyclable: true },
        { name: "Glas", percentage: 8, recyclable: true },
        { name: "Rubber", percentage: 7, recyclable: false },
        { name: "Elektronica", percentage: 5, recyclable: false },
      ],
      certifications: ["CE", "Energy Star", "EU Ecolabel"],
      energySavingFeatures: [
        "Automatische ladingherkenning",
        "ProfiEco motor - 30% zuiniger",
        "TwinDos - tot 30% minder wasmiddel",
        "Getest op 20 jaar levensduur",
      ],
    },
    certifications: [
      {
        name: "EU Energie Label A",
        issuer: "European Commission",
        validUntil: "2030-12-31",
        number: "EU-EL-2024-MIELE-660",
      },
      {
        name: "Quiet Mark",
        issuer: "Quiet Mark Ltd",
        validUntil: "2026-12-31",
        number: "QM-2024-45892",
      },
    ],
    ownership: {
      current: {
        company: "Familie Janssen",
        contact: "Peter Janssen",
        email: "peter.janssen@email.be",
        since: "2024-06-25",
        verified: true,
      },
      history: [
        {
          company: "Miele België",
          from: "2024-06-20",
          to: "2024-06-25",
          type: "Fabrikant",
        },
      ],
    },
  },

  // TONY'S CHOCOLONELY - Food & Traceability
  {
    id: "tonys-chocolonely",
    sector: "Voeding",
    sectorIcon: "Utensils",
    brand: {
      name: "Tony's Chocolonely",
      logo: "/images/tonys-chocolonely-logo.svg",
      color: {
        hue: 25,
        primary: "oklch(0.65 0.2 25)",
        primaryForeground: "oklch(0.985 0 0)",
        secondary: "oklch(0.96 0.04 25)",
        muted: "oklch(0.92 0.03 25)",
      },
    },
    product: {
      name: "Melkchocolade 32%",
      series: "Classic",
      model: "180g Reep",
      description: "Fairtrade melkchocolade reep - 100% slaafvrij",
      image: "/images/tony-20chocolonely-20melkchocolade-2032.webp",
      serialNumber: "TC-2024-MILK32-892341",
      upc: "8717677335879",
      manufactureDate: "2024-09-15",
      warrantyUntil: "2025-09-15",
      status: "active",
    },
    allergens: {
      contains: ["Melk", "Soja"],
      mayContain: ["Noten", "Pinda's", "Gluten"],
      freeFrom: [
        "Eieren",
        "Vis",
        "Schaaldieren",
        "Weekdieren",
        "Selderij",
        "Mosterd",
        "Sesamzaad",
        "Lupine",
        "Sulfiet",
      ],
      ingredients:
        "Suiker, cacaoboter, volle melkpoeder, cacaomassa, emulgator (sojalecithine), natuurlijk vanille-aroma. Cacao: minimaal 32%. Kan sporen bevatten van noten, pinda's en gluten.",
    },
    documentation: [
      {
        title: "Traceerbaarheidsrapport",
        type: "PDF",
        category: "Certificering",
        url: "https://tonyschocolonely.com/nl/nl/onze-missie/bean-to-bar",
        downloadUrl: "https://tonyschocolonely.com/storage/traceability-report-2024.pdf",
        size: "2.4 MB",
        language: "NL",
        icon: "FileText",
      },
      {
        title: "Tony's Open Chain Certificaat",
        type: "PDF",
        category: "Certificering",
        downloadUrl: "https://tonyschocolonely.com/storage/open-chain-certificate.pdf",
        size: "0.8 MB",
        language: "EN",
        icon: "Award",
      },
      {
        title: "Jaarlijks FAIR Report",
        type: "PDF",
        category: "Duurzaamheid",
        url: "https://tonyschocolonely.com/nl/nl/jaarfairslag",
        downloadUrl: "https://tonyschocolonely.com/storage/fair-report-2024.pdf",
        size: "15.2 MB",
        language: "NL",
        icon: "Book",
      },
      {
        title: "B Corp Impact Assessment",
        type: "Web",
        category: "Certificering",
        url: "https://www.bcorporation.net/en-us/find-a-b-corp/company/tonys-chocolonely",
        language: "EN",
        icon: "FileText",
      },
      {
        title: "Voedingswaarde Informatie",
        type: "PDF",
        category: "Productinformatie",
        downloadUrl: "https://tonyschocolonely.com/storage/nutrition-melk32.pdf",
        size: "0.3 MB",
        language: "NL",
        icon: "FileText",
      },
    ],
    specifications: {
      key: [
        { label: "Gewicht", value: "180 gram", icon: "Scale" },
        { label: "Cacao", value: "32%", icon: "Percent" },
        { label: "Herkomst", value: "Ghana", icon: "MapPin" },
        { label: "Certificering", value: "100% Traceerbaar", icon: "Award" },
      ],
      categories: [
        {
          name: "Productinformatie",
          specs: [
            { label: "Netto gewicht", value: "180 gram" },
            { label: "Cacaopercentage", value: "32%" },
            { label: "Type chocolade", value: "Melkchocolade" },
            { label: "Verpakking", value: "Papier (recyclebaar)" },
          ],
        },
        {
          name: "Ingrediënten",
          specs: [
            { label: "Suiker", value: "45%" },
            { label: "Cacaoboter", value: "19%" },
            { label: "Volle melkpoeder", value: "15%" },
            { label: "Cacaomassa", value: "13%" },
            { label: "Emulgator", value: "Sojalecithine" },
            { label: "Aroma", value: "Natuurlijke vanille" },
          ],
        },
        {
          name: "Voedingswaarde per 100g",
          specs: [
            { label: "Energie", value: "2270 kJ / 543 kcal" },
            { label: "Vetten", value: "31g" },
            { label: "Waarvan verzadigd", value: "19g" },
            { label: "Koolhydraten", value: "56g" },
            { label: "Waarvan suikers", value: "54g" },
            { label: "Eiwitten", value: "7.1g" },
            { label: "Zout", value: "0.20g" },
          ],
        },
        {
          name: "Traceerbaarheid",
          specs: [
            { label: "Cacao herkomst", value: "Ghana, Ivoorkust" },
            { label: "Coöperatie", value: "ABOCFA" },
            { label: "Traceerbaarheid", value: "100% Bean-to-Bar" },
            { label: "Programma", value: "Tony's Open Chain" },
          ],
        },
      ],
    },
    replacementParts: [],
    optionalProducts: [
      {
        id: "tonys-puur",
        name: "Puur 70%",
        partNumber: "TC-DARK-180",
        category: "Assortiment",
        description: "180g pure chocolade met 70% cacao",
        specifications: [
          { label: "Cacao", value: "70%" },
          { label: "Gewicht", value: "180g" },
        ],
      },
      {
        id: "tonys-karamel",
        name: "Melk Karamel Zeezout",
        partNumber: "TC-CARAMEL-180",
        category: "Assortiment",
        description: "180g melkchocolade met stukjes karamel en zeezout",
        specifications: [
          { label: "Cacao", value: "32%" },
          { label: "Gewicht", value: "180g" },
        ],
      },
    ],
    maintenance: {
      history: [
        {
          date: "2025-01-08",
          type: "Productie",
          description: "Geproduceerd in fabriek Zaandam, batch kwaliteitscontrole goedgekeurd",
          technician: "QC Team Zaandam",
          partsUsed: [],
        },
      ],
      upcoming: [],
    },
    sustainability: {
      co2Footprint: "3.5 kg CO₂e per reep",
      recyclability: "95%",
      materials: [
        { name: "Chocolade", percentage: 95, recyclable: false },
        { name: "Papieren verpakking", percentage: 4, recyclable: true },
        { name: "Inkt", percentage: 1, recyclable: true },
      ],
      certifications: ["Tony's Open Chain", "Rainforest Alliance", "B Corp", "100% Slaafvrij"],
      energySavingFeatures: [
        "Directe handel met boeren - hogere inkomens",
        "Geen kinderarbeid in supply chain",
        "Investering in lokale gemeenschappen",
        "Duurzame cacaoboerderijen",
      ],
    },
    certifications: [
      {
        name: "B Corporation",
        issuer: "B Lab",
        validUntil: "2026-12-31",
        number: "BCORP-2024-TC-4521",
      },
      {
        name: "Tony's Open Chain Partner",
        issuer: "Tony's Chocolonely",
        validUntil: "2025-12-31",
        number: "TOC-2024-MEMBER",
      },
    ],
    ownership: {
      current: {
        company: "Supermarkt Delhaize",
        contact: "Inkoop Afdeling",
        email: "inkoop@delhaize.be",
        since: "2024-09-20",
        verified: true,
      },
      history: [
        {
          company: "Tony's Chocolonely BV",
          from: "2024-09-15",
          to: "2024-09-20",
          type: "Producent",
        },
      ],
    },
  },

  // SIEMENS - Industrial Machinery
  {
    id: "siemens-g120",
    sector: "Machines",
    sectorIcon: "Cog",
    brand: {
      name: "Siemens",
      logo: "/images/siemens-ag-logo.png",
      color: {
        hue: 175,
        primary: "oklch(0.55 0.15 175)",
        primaryForeground: "oklch(0.985 0 0)",
        secondary: "oklch(0.96 0.02 175)",
        muted: "oklch(0.92 0.03 175)",
      },
    },
    product: {
      name: "SINAMICS G120",
      series: "SINAMICS",
      model: "6SL3210-1PE21-8UL0",
      description: "Modulaire frequentieomvormer voor standaard aandrijftoepassingen, 7.5kW",
      image: "/images/sinamics-20g120-20frequentieregelaar.webp",
      serialNumber: "SI-2024-G120-34567",
      upc: "4019169190824",
      manufactureDate: "2024-02-10",
      warrantyUntil: "2027-02-10",
      status: "active",
    },
    documentation: [
      {
        title: "SINAMICS G120 Bedieningshandleiding",
        type: "PDF",
        category: "Handleidingen",
        url: "https://support.industry.siemens.com/cs/document/109781535/",
        downloadUrl: "https://support.industry.siemens.com/cs/attachments/109781535/G120_OPM_0422_nl-NL.pdf",
        size: "24.8 MB",
        language: "NL",
        icon: "Book",
      },
      {
        title: "Installatiehandleiding",
        type: "PDF",
        category: "Handleidingen",
        downloadUrl: "https://support.industry.siemens.com/cs/attachments/109781535/G120_installation.pdf",
        size: "8.2 MB",
        language: "NL",
        icon: "Wrench",
      },
      {
        title: "Parameterlijst G120",
        type: "PDF",
        category: "Technische documenten",
        downloadUrl: "https://support.industry.siemens.com/cs/attachments/109781535/G120_parameter_list.pdf",
        size: "45.6 MB",
        language: "EN",
        icon: "FileText",
      },
      {
        title: "TIA Portal Integratie",
        type: "PDF",
        category: "Software",
        url: "https://support.industry.siemens.com/cs/document/109781535/",
        size: "12.4 MB",
        language: "EN",
        icon: "FileText",
      },
      {
        title: "PROFINET Communicatie",
        type: "PDF",
        category: "Technische documenten",
        downloadUrl: "https://support.industry.siemens.com/cs/attachments/109781535/G120_profinet.pdf",
        size: "5.8 MB",
        language: "EN",
        icon: "FileText",
      },
      {
        title: "CAD/CAE Macro's",
        type: "ZIP",
        category: "Technische documenten",
        downloadUrl: "https://support.industry.siemens.com/cs/attachments/109781535/G120_cad_macros.zip",
        size: "8.9 MB",
        language: "Universeel",
        icon: "FileText",
      },
    ],
    specifications: {
      key: [
        { label: "Vermogen", value: "7.5 kW", icon: "Zap" },
        { label: "Spanning", value: "380-480V", icon: "Activity" },
        { label: "Bescherming", value: "IP20", icon: "Shield" },
        { label: "Communicatie", value: "PROFINET", icon: "Wifi" },
      ],
      categories: [
        {
          name: "Elektrische specificaties",
          specs: [
            { label: "Nominaal vermogen", value: "7.5 kW" },
            { label: "Ingangsspanning", value: "380-480V 3AC" },
            { label: "Uitgangsstroom", value: "15.5 A" },
            { label: "Frequentiebereik", value: "0-650 Hz" },
          ],
        },
        {
          name: "Fysieke specificaties",
          specs: [
            { label: "Afmetingen (H×B×D)", value: "370 × 140 × 203 mm" },
            { label: "Gewicht", value: "7.2 kg" },
            { label: "Beschermingsklasse", value: "IP20" },
            { label: "Frame size", value: "FSC" },
          ],
        },
        {
          name: "Communicatie",
          specs: [
            { label: "Standaard", value: "PROFINET IRT" },
            { label: "Optioneel", value: "PROFIBUS, CANopen" },
            { label: "Engineering", value: "TIA Portal, STARTER" },
          ],
        },
      ],
    },
    replacementParts: [
      {
        id: "siemens-fan",
        name: "Koelventilator",
        partNumber: "6SL3162-0AF00-0AA0",
        category: "Koeling",
        quantity: 1,
        unit: "stuks",
        lifespan: "5 jaar",
        description: "Vervangende ventilator voor G120 FSC frame",
        specifications: [
          { label: "Frame", value: "FSC" },
          { label: "Spanning", value: "24V DC" },
        ],
      },
      {
        id: "siemens-cu",
        name: "Control Unit CU250S-2",
        partNumber: "6SL3246-0BA22-1PA0",
        category: "Control",
        quantity: 1,
        unit: "stuks",
        description: "Control Unit voor SINAMICS G120",
        specifications: [
          { label: "Type", value: "CU250S-2 PN" },
          { label: "Interface", value: "PROFINET" },
        ],
      },
    ],
    optionalProducts: [
      {
        id: "siemens-bop2",
        name: "Basic Operator Panel BOP-2",
        partNumber: "6SL3255-0AA00-4CA1",
        category: "HMI",
        description: "Bedieningspaneel met LCD display",
        specifications: [
          { label: "Display", value: "LCD 2-line" },
          { label: "Montage", value: "Deur/front" },
        ],
      },
      {
        id: "siemens-filter",
        name: "EMC Filter klasse A",
        partNumber: "6SL3203-0CJ24-5AA0",
        category: "EMC",
        description: "EMC-filter voor reductie netwerkstoringen",
        specifications: [
          { label: "Klasse", value: "A" },
          { label: "Geschikt voor", value: "7.5 kW" },
        ],
      },
      {
        id: "siemens-rem",
        name: "Remweerstand",
        partNumber: "6SE6400-4BD16-5CA0",
        category: "Remmen",
        description: "Externe remweerstand voor regeneratief remmen",
        specifications: [
          { label: "Vermogen", value: "1.5 kW" },
          { label: "Weerstand", value: "100 Ω" },
        ],
      },
    ],
    maintenance: {
      history: [
        {
          date: "2024-08-20",
          type: "Inbedrijfstelling",
          description: "Installatie en parametrering via TIA Portal",
          technician: "Siemens Service Engineer",
          partsUsed: [],
          nextService: "2025-08-20",
        },
      ],
      upcoming: [
        {
          date: "2025-08-20",
          type: "Preventief onderhoud",
          description: "Jaarlijkse controle en firmware update",
          priority: "medium",
        },
      ],
    },
    sustainability: {
      co2Footprint: "65 kg CO₂e",
      recyclability: "90%",
      materials: [
        { name: "Aluminium", percentage: 40, recyclable: true },
        { name: "Staal", percentage: 30, recyclable: true },
        { name: "Kunststof", percentage: 18, recyclable: true },
        { name: "Koper", percentage: 10, recyclable: true },
        { name: "Elektronica", percentage: 2, recyclable: false },
      ],
      certifications: ["CE", "UL", "cULus", "RoHS", "REACH"],
      energySavingFeatures: [
        "Hoog rendement (97%)",
        "Energiebesparingsmodus (ECO)",
        "Regeneratief remmen mogelijk",
        "Slaapstand bij inactiviteit",
      ],
    },
    certifications: [
      {
        name: "CE Conformiteit",
        issuer: "TÜV SÜD",
        validUntil: "2028-12-31",
        number: "CE-2024-SIEMENS-G120",
      },
      {
        name: "UL Listed",
        issuer: "Underwriters Laboratories",
        validUntil: "2027-06-30",
        number: "UL-508C-2024-5678",
      },
    ],
    ownership: {
      current: {
        company: "Productie BV",
        contact: "Engineering Afdeling",
        email: "engineering@productie.be",
        since: "2024-03-15",
        verified: true,
      },
      history: [
        {
          company: "Siemens België",
          from: "2024-02-10",
          to: "2024-03-15",
          type: "Fabrikant",
        },
      ],
    },
  },

  // PHILIPS HUE - Smart Electronics
  {
    id: "philips-hue-a60",
    sector: "Elektronica",
    sectorIcon: "Lightbulb",
    brand: {
      name: "Philips Hue",
      logo: "/images/philips-hue-logo.png",
      color: {
        hue: 280,
        primary: "oklch(0.55 0.2 280)",
        primaryForeground: "oklch(0.985 0 0)",
        secondary: "oklch(0.96 0.04 280)",
        muted: "oklch(0.92 0.03 280)",
      },
    },
    product: {
      name: "White and Color Ambiance",
      series: "Hue",
      model: "A60 E27 800lm",
      description: "Slimme LED-lamp met 16 miljoen kleuren en app-bediening",
      image: "/images/hue-20white-20-26-20color-20ambiance-20a60.webp",
      serialNumber: "PH-2024-HUE-A60-12345",
      upc: "8719514328365",
      manufactureDate: "2024-05-01",
      warrantyUntil: "2026-05-01",
      status: "warranty",
    },
    documentation: [
      {
        title: "Hue App Gebruikershandleiding",
        type: "Web",
        category: "Handleidingen",
        url: "https://www.philips-hue.com/nl-be/support/app-handleiding",
        language: "NL",
        icon: "Book",
      },
      {
        title: "Installatiegids",
        type: "PDF",
        category: "Handleidingen",
        downloadUrl: "https://www.assets.signify.com/is/content/Signify/hue-installation-guide-nl.pdf",
        size: "1.2 MB",
        language: "NL",
        icon: "Wrench",
      },
      {
        title: "Hue Bridge Handleiding",
        type: "PDF",
        category: "Handleidingen",
        url: "https://www.philips-hue.com/nl-be/support/bridge",
        downloadUrl: "https://www.assets.signify.com/is/content/Signify/hue-bridge-manual-nl.pdf",
        size: "2.4 MB",
        language: "NL",
        icon: "FileText",
      },
      {
        title: "Philips Hue Developer API",
        type: "Web",
        category: "Technische documenten",
        url: "https://developers.meethue.com/",
        language: "EN",
        icon: "FileText",
      },
      {
        title: "Matter Integratie Gids",
        type: "Web",
        category: "Technische documenten",
        url: "https://www.philips-hue.com/nl-be/explore-hue/works-with/matter",
        language: "NL",
        icon: "FileText",
      },
      {
        title: "EU Energie Label",
        type: "PDF",
        category: "Technische documenten",
        downloadUrl: "https://www.assets.signify.com/is/content/Signify/energy-label-hue-a60.pdf",
        size: "0.3 MB",
        language: "EU",
        icon: "FileText",
      },
    ],
    specifications: {
      key: [
        { label: "Lichtopbrengst", value: "800 lumen", icon: "Sun" },
        { label: "Vermogen", value: "9W", icon: "Zap" },
        { label: "Fitting", value: "E27", icon: "Lightbulb" },
        { label: "Kleuren", value: "16 miljoen", icon: "Palette" },
      ],
      categories: [
        {
          name: "Lichtspecificaties",
          specs: [
            { label: "Lichtstroom", value: "800 lumen" },
            { label: "Kleurtemperatuur", value: "2000-6500K" },
            { label: "Kleurbereik", value: "16 miljoen kleuren" },
            { label: "CRI", value: ">80" },
            { label: "Dimbaar", value: "Ja, via app" },
          ],
        },
        {
          name: "Elektrisch",
          specs: [
            { label: "Vermogen", value: "9W" },
            { label: "Spanning", value: "220-240V" },
            { label: "Energielabel", value: "F" },
            { label: "Levensduur", value: "25.000 uur" },
          ],
        },
        {
          name: "Connectiviteit",
          specs: [
            { label: "Protocol", value: "Zigbee 3.0" },
            { label: "Hue Bridge", value: "Vereist" },
            { label: "Matter", value: "Ondersteund" },
            { label: "Voice control", value: "Alexa, Google, Siri" },
          ],
        },
        {
          name: "Fysiek",
          specs: [
            { label: "Fitting", value: "E27" },
            { label: "Vorm", value: "A60 (standaard)" },
            { label: "Afmetingen", value: "110 × 61 mm" },
            { label: "Gewicht", value: "68 gram" },
          ],
        },
      ],
    },
    replacementParts: [],
    optionalProducts: [
      {
        id: "hue-bridge",
        name: "Hue Bridge",
        partNumber: "8719514342620",
        category: "Hub",
        description: "Centrale hub voor Philips Hue systeem - vereist voor volledige functionaliteit",
        specifications: [
          { label: "Max. lampen", value: "50" },
          { label: "Connectiviteit", value: "Ethernet, Zigbee" },
        ],
      },
      {
        id: "hue-dimmer",
        name: "Hue Dimmer Switch",
        partNumber: "8719514274617",
        category: "Accessoire",
        description: "Draadloze dimmer voor Hue lampen",
        specifications: [
          { label: "Batterij", value: "CR2450" },
          { label: "Bereik", value: "12 meter" },
        ],
      },
      {
        id: "hue-motion",
        name: "Hue Motion Sensor",
        partNumber: "8719514342125",
        category: "Sensor",
        description: "Bewegingssensor voor automatische verlichting",
        specifications: [
          { label: "Detectiehoek", value: "100°" },
          { label: "Bereik", value: "5 meter" },
        ],
      },
    ],
    maintenance: {
      history: [],
      upcoming: [],
    },
    sustainability: {
      energyLabel: "F",
      co2Footprint: "8.5 kg CO₂e",
      recyclability: "75%",
      materials: [
        { name: "Kunststof", percentage: 45, recyclable: true },
        { name: "Glas", percentage: 25, recyclable: true },
        { name: "Aluminium", percentage: 15, recyclable: true },
        { name: "Elektronica", percentage: 15, recyclable: false },
      ],
      certifications: ["CE", "EAC", "FCC", "IC"],
      energySavingFeatures: [
        "LED technologie - 80% zuiniger dan gloeilampen",
        "Automatische uitschakeling via app",
        "Bewegingssensor integratie",
        "25.000 uur levensduur",
      ],
    },
    certifications: [
      {
        name: "CE Conformiteit",
        issuer: "Signify",
        validUntil: "2029-12-31",
        number: "CE-2024-SIGNIFY-HUE",
      },
      {
        name: "Zigbee Certified",
        issuer: "Connectivity Standards Alliance",
        validUntil: "2027-12-31",
        number: "ZIG-2024-HUE-A60",
      },
    ],
    ownership: {
      current: {
        company: "Smart Home User",
        contact: "Thomas De Smet",
        email: "thomas.desmet@email.be",
        since: "2024-06-10",
        verified: true,
      },
      history: [
        {
          company: "MediaMarkt België",
          from: "2024-05-15",
          to: "2024-06-10",
          type: "Retailer",
        },
        {
          company: "Signify Netherlands",
          from: "2024-05-01",
          to: "2024-05-15",
          type: "Fabrikant",
        },
      ],
    },
  },

  // PATAGONIA - R1 Ultralight Fleece Hoody
  {
    id: "patagonia-r1-ultralight-hoody",
    sector: "Kledij",
    sectorIcon: "Shirt",
    brand: {
      name: "Patagonia",
      logo: "/images/patagonia-logo.svg",
      color: {
        hue: 55,
        primary: "oklch(0.55 0.12 55)",
        primaryForeground: "oklch(0.98 0 0)",
        secondary: "oklch(0.94 0.04 55)",
        muted: "oklch(0.90 0.06 55)",
      },
    },
    product: {
      name: "R1 Ultralight Fleece Hoody",
      series: "R1 Ultralight",
      model: "40035-BCBN",
      description: "Warme en ademende technische fleece hoodie, essentieel voor pro-atleten en toegewijde klimmers. Bijna zo licht als je favoriete basislaag, met een glad, slijtvast buitenoppervlak. Onderdeel van de Free Wall Kit, ontworpen voor veeleisende multipitch routes. Gemaakt in een Fair Trade Certified fabriek.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/40035_BCBN-gGC50LKaF1LilXS155nMW6xjxsrusw.webp",
      serialNumber: "PAT-2025-R1U-40035",
      upc: "195699401234",
      manufactureDate: "2025-01-15",
      warrantyUntil: "Levenslange garantie",
      status: "active",
    },
    documentation: [
      {
        title: "Verzorgingsinstructies",
        type: "PDF",
        category: "Handleidingen",
        url: "https://eu.patagonia.com/be/en/product/mens-r1-ultralight-fleece-hoody/40035.html",
        size: "0.5 MB",
        language: "NL",
        icon: "Book",
      },
      {
        title: "Reparatiegids",
        type: "PDF",
        category: "Handleidingen",
        url: "https://www.patagonia.com/repairs/",
        downloadUrl: "https://www.patagonia.com/on/demandware.static/-/Library-Sites-PatagoniaShared/default/repair-guide.pdf",
        size: "2.3 MB",
        language: "EN",
        icon: "Wrench",
      },
      {
        title: "Ironclad Guarantee",
        type: "Web",
        category: "Garantie",
        url: "https://eu.patagonia.com/be/en/ironclad-guarantee.html",
        language: "EN",
        icon: "Shield",
      },
      {
        title: "Fair Trade Certificaat",
        type: "PDF",
        category: "Certificaten",
        downloadUrl: "https://www.patagonia.com/on/demandware.static/-/Library-Sites-PatagoniaShared/default/fair-trade-cert.pdf",
        size: "0.8 MB",
        language: "EN",
        icon: "Award",
      },
    ],
    specifications: {
      key: [
        { label: "Materiaal", value: "100% Recycled Polyester", icon: "Recycle" },
        { label: "Gewicht", value: "280g", icon: "Scale" },
        { label: "Maat", value: "M", icon: "Ruler" },
        { label: "Kleur", value: "Bobcat Brown", icon: "Palette" },
      ],
      categories: [
        {
          name: "Materiaalsamenstelling",
          specs: [
            { label: "Stof", value: "4.6-oz 100% gerecycled polyester" },
            { label: "Type", value: "Flat-faced double knit" },
            { label: "Buitenzijde", value: "Glad, slijtvast oppervlak" },
            { label: "Productie", value: "Fair Trade Certified fabriek" },
          ],
        },
        {
          name: "Afmetingen (Maat M)",
          specs: [
            { label: "Gewicht", value: "280 g" },
            { label: "Pasvorm", value: "Slim fit" },
            { label: "Herkomst", value: "Made in Vietnam" },
            { label: "Stijlnummer", value: "40035" },
          ],
        },
        {
          name: "Kenmerken",
          specs: [
            { label: "Capuchon", value: "Helm-compatibel design" },
            { label: "Rits", value: "Diepe center-front rits voor ventilatie" },
            { label: "Schouders", value: "Naadloze single-panel mouwconstructie" },
            { label: "Zakken", value: "2 verticale borstzakken met rits" },
          ],
        },
        {
          name: "Verzorging",
          specs: [
            { label: "Wassen", value: "Machine was warm" },
            { label: "Bleken", value: "Niet bleken" },
            { label: "Drogen", value: "Tumbeldrogen laag" },
            { label: "Strijken", value: "Koel strijken indien nodig" },
          ],
        },
      ],
    },
    replacementParts: [
      {
        id: "pat-zipper-r1",
        name: "Vervangende Center Rits",
        partNumber: "PAT-R1-ZIP-001",
        category: "Reparatie",
        quantity: 1,
        unit: "stuks",
        lifespan: "Levenslang",
        description: "Originele YKK vervangende rits voor R1 Ultralight Hoody",
        specifications: [
          { label: "Type", value: "YKK Vislon" },
          { label: "Lengte", value: "Volledige front" },
        ],
      },
      {
        id: "pat-cord",
        name: "Capuchon Koord",
        partNumber: "PAT-R1-CORD-001",
        category: "Accessoires",
        quantity: 1,
        unit: "set",
        lifespan: "5+ jaar",
        description: "Vervangende capuchon aanpaskoorden",
        specifications: [
          { label: "Materiaal", value: "Elastisch koord" },
          { label: "Kleur", value: "Bijpassend" },
        ],
      },
    ],
    optionalProducts: [
      {
        id: "pat-nano-puff",
        name: "Nano Puff Jacket",
        partNumber: "84212-BLK",
        category: "Buitenlaag",
        description: "Lichtgewicht isolerende jas voor extra warmte over de R1",
        specifications: [
          { label: "Isolatie", value: "60g PrimaLoft Gold" },
          { label: "Gewicht", value: "337g" },
        ],
      },
      {
        id: "pat-cap-cool",
        name: "Capilene Cool Daily Hoody",
        partNumber: "45310-WHI",
        category: "Basislaag",
        description: "Lichtgewicht zonbeschermende basislaag onder de R1",
        specifications: [
          { label: "UPF", value: "50+" },
          { label: "Materiaal", value: "Recycled Polyester" },
        ],
      },
      {
        id: "pat-torrent",
        name: "Torrentshell 3L Jacket",
        partNumber: "85240-BLK",
        category: "Beschermlaag",
        description: "Waterdichte buitenlaag voor natte condities",
        specifications: [
          { label: "Membraan", value: "H2No Performance" },
          { label: "Waterkolom", value: "20.000 mm" },
        ],
      },
    ],
    maintenance: {
      history: [],
      upcoming: [],
    },
    sustainability: {
      co2Footprint: "8.2 kg CO2e",
      recyclability: "92%",
      repairabilityScore: 9,
      materials: [
        { name: "Gerecycled Polyester", percentage: 100, recyclable: true },
      ],
      certifications: ["Fair Trade Certified", "1% for the Planet"],
      energySavingFeatures: [
        "100% gerecycled polyester - verminderde CO2 uitstoot",
        "Fair Trade Certified fabriek - eerlijke lonen voor arbeiders",
        "Ironclad Guarantee - levenslange garantie verlengt levensduur",
        "Worn Wear reparatieprogramma - professionele reparaties",
        "Lichtgewicht design (280g) - minder materiaalgebruik",
      ],
    },
    certifications: [
      {
        name: "Fair Trade Certified",
        issuer: "Fair Trade USA",
        validUntil: "2027-12-31",
        number: "FT-2025-PAT-40035",
      },
      {
        name: "1% for the Planet",
        issuer: "1% for the Planet",
        validUntil: "2026-12-31",
        number: "1FTP-PAT-2025",
      },
      {
        name: "Ironclad Guarantee",
        issuer: "Patagonia",
        validUntil: "Levenslang",
        number: "ICG-PAT-40035",
      },
    ],
    ownership: {
      current: {
        company: "Particulier",
        contact: "Thomas Janssen",
        email: "thomas.janssen@email.be",
        since: "2025-02-01",
        verified: true,
      },
      history: [
        {
          company: "Patagonia Store Antwerpen",
          from: "2025-01-20",
          to: "2025-02-01",
          type: "Retailer",
        },
        {
          company: "Patagonia Europe",
          from: "2025-01-15",
          to: "2025-01-20",
          type: "Fabrikant",
        },
      ],
    },
  },
]

export const sectors = [
  { id: "all", label: "Alle sectoren", icon: "Grid3x3" },
  { id: "Industrie", label: "Industrie", icon: "Factory" },
  { id: "Witgoed", label: "Witgoed", icon: "Waves" },
  { id: "Voeding", label: "Voeding", icon: "Utensils" },
  { id: "Machines", label: "Machines", icon: "Cog" },
  { id: "Elektronica", label: "Elektronica", icon: "Lightbulb" },
  { id: "Kledij", label: "Kledij", icon: "Shirt" },
]
