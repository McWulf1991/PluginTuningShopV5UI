export const Shops = [
    0,
    1,
    2,
    3,
    4,
].sort((a, b) => a - b);

export const ShopsNames = [
  'Performance',
  'Stance',
  'Optics',
  'Interior',
  'Wheels',
]

export const Optics = [
    "Spoiler",
    "Frontstoßstange",
    "Heckstoßstange",
    "Seitenschweller",
    "Auspuff",
    "Rahmen",
    "Kühlergrill",
    "Motorhaube",
    "Linker Flügel",
    "Rechter Flügel",
    "Dach",
    "Hupen",
    "Kennzeichenhalter (horizontal)",
    "Kennzeichenhalter (vertikal)",
    "Hydraulik",
    "Streben",
    "Antenne",
    "Außenspiegel",
    "Aufkleber",
    "Kennzeichen",
    "Fenstertönung",
]

export const Interior = [
    "Verkleidungsdesign",
    "Ornamente",
    "Wahlscheiben-Design",
    "Innentür",
    "Sitze",
    "Lenkrad",
    "Schalthebel",
    "Plaketten",
    "Motorabdeckung",
    "Luftfilter",
    "Radkastenverkleidung",
    "Tank",
    "Tür",
    "Radhausverkleidung",
]

export const StanceCleaned = [
  {0: 'Radsturz'},
  {1: 'Radhöhe'},
  {2: 'Felgenradius'},
  {3: 'Spurbreite'},
  {4: 'Reifendurchmesser'},
  {5: 'Reifenbreite'},
].sort();

export const Stance = [
    "Radsturz",
    "Radhöhe",
    "Felgenradius",
    "Spurbreite",
    "Reifendurchmesser",
    "Reifenbreite",
]

export const Performance = [
    "Motor",
    "Bremsen",
    "Getriebe",
    "Federung",
    "Panzerung",
    "Turbo",
    "Xenon-Licht",
]

export const OpticsString = {
  0: "Spoiler",
  1: "Frontstoßstange",
  2: "Heckstoßstange",
  3: "Seitenschweller",
  4: "Auspuff",
  5: "Rahmen",
  6: "Kühlergrill",
  7: "Motorhaube",
  8: "Linker Flügel",
  9: "Rechter Flügel",
  10: "Dach",
  11: "Hupen",
  12: "Kennzeichenhalter (horizontal)",
  13: "Kennzeichenhalter (vertikal)",
  14: "Hydraulik",
  15: "Streben",
  16: "Antenne",
  17: "Außenspiegel",
  18: "Aufkleber",
  19: "Kennzeichen",
  20: "Fenstertönung",
};

export const InteriorString = {
  27: "Verkleidungsdesign",
  28: "Ornamente",
  30: "Wahlscheiben-Design",
  31: "Innentür",
  32: "Sitze",
  33: "Lenkrad",
  34: "Schalthebel",
  35: "Plaketten",
  39: "Motorabdeckung",
  40: "Luftfilter",
  42: "Radkastenverkleidung",
  45: "Tank",
  46: "Tür",
  47: "Radhausverkleidung",
};

export const StanceString = {
  0: "Radsturz",
  1: "Radhöhe",
  2: "Felgenradius",
  3: "Spurbreite",
  4: "Reifendurchmesser",
  5: "Reifenbreite",
};

export const PerformanceString = {
  11: "Motor",
  12: "Bremsen",
  13: "Getriebe",
  15: "Federung",
  16: "Panzerung",
  18: "Turbo",
  22: "Xenon-Licht",
};

export const WheelsString = {
  0: "Felgentyp",
  1: "Felgen-ID",
};

export const OpticsNameID = [
  { id: 0, name: "Spoiler" },
  { id: 1, name: "Frontstoßstange" },
  { id: 2, name: "Heckstoßstange" },
  { id: 3, name: "Seitenschweller" },
  { id: 4, name: "Auspuff" },
  { id: 5, name: "Rahmen" },
  { id: 6, name: "Kühlergrill" },
  { id: 7, name: "Motorhaube" },
  { id: 8, name: "Linker Flügel" },
  { id: 9, name: "Rechter Flügel" },
  { id: 10, name: "Dach" },
  { id: 14, name: "Hupen" },
  { id: 12, name: "Kennzeichenhalter (horizontal)" },
  { id: 13, name: "Kennzeichenhalter (vertikal)" },
  { id: 14, name: "Hydraulik" },
  { id: 15, name: "Streben" },
  { id: 16, name: "Antenne" },
  { id: 17, name: "Außenspiegel" },
  { id: 18, name: "Aufkleber" },
  { id: 19, name: "Kennzeichen" },
  { id: 20, name: "Fenstertönung" }
].sort();

export const InteriorNameID = [
  { id: 27, name: "Verkleidungsdesign" },
  { id: 28, name: "Ornamente" },
  { id: 30, name: "Wahlscheiben-Design" },
  { id: 31, name: "Innentür" },
  { id: 32, name: "Sitze" },
  { id: 33, name: "Lenkrad" },
  { id: 34, name: "Schalthebel" },
  { id: 35, name: "Plaketten" },
  { id: 39, name: "Motorabdeckung" },
  { id: 40, name: "Luftfilter" },
  { id: 42, name: "Radkastenverkleidung" },
  { id: 45, name: "Tank" },
  { id: 46, name: "Tür" },
  { id: 47, name: "Radhausverkleidung" }
].sort();

export const StanceNameID = [
  { id: 0, name: "Radsturz" },
  { id: 1, name: "Radhöhe" },
  { id: 2, name: "Felgenradius" },
  { id: 3, name: "Spurbreite" },
  { id: 4, name: "Reifendurchmesser" },
  { id: 5, name: "Reifenbreite" }
].sort();

export const PerformanceNameID = [
  { id: 11, name: "Motor"},
  { id: 12, name: "Bremsen"},
  { id: 13, name: "Getriebe"},
  { id: 15, name: "Federung"},
  { id: 16, name: "Panzerung"},
  { id: 18, name: "Turbo"},
  { id: 22, name: "Xenon-Licht"}
].sort();

export const WheelsNameID = [
  { id: 0, name: "Felgentyp"},
  { id: 1, name: "Felgen-ID"}
].sort();

export const OpticsJustID = [
  0,
  1,
  2,
  3,
  4,
  5,
  6, 
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
].sort((a, b) => a - b);

export const InteriorJustID = [
  27,
  28,
  30,
  31,
  32,
  33,
  34,
  35,
  39,
  40,
  42,
  45,
  46,
  47,
].sort((a, b) => a - b);

export const StanceJustID = [
  0,
  1,
  2,
  3,
  4,
  5,
].sort((a, b) => a - b);

export const PerformanceJustID = [
  11,
  12,
  13,
  15,
  16,
  18,
  22,
].sort((a, b) => a - b);

export const WheelsJustID = [
  0,
  1,
].sort((a, b) => a - b);

export const wheelList = [
  {
      name: "Sport",
      category: "Kategorie0",
      count: 50,
      veh: "normal"
  },
  {
      name: "Tuner",
      category: "Kategorie1",
      count: 36,
      veh: "normal"
  },
  {
      name: "Lowrider",
      category: "Kategorie2",
      count: 30,
      veh: "normal"
  },
  {
      name: "Luxus",
      category: "Kategorie3",
      count: 38,
      veh: "normal"
  },
  {
      name: "Offroad",
      category: "Kategorie4",
      count: 35,
      veh: "normal"
  },
  {
      name: "Cat5",
      category: "Kategorie5",
      count: 48,
      veh: "normal"
  },
  {
      name: "Motorrad",
      category: "Kategorie6",
      count: 144,
      veh: "bike"
  },
  {
      name: "High - End",
      category: "Kategorie7",
      count: 40,
      veh: "normal"
  },
  {
      name: "Bennys Tuner",
      category: "Kategorie8",
      count: 217,
      veh: "normal"
  },
  {
      name: "Bennys Original",
      category: "Kategorie9",
      count: 217,
      veh: "normal"
  },
  {
      name: "Formel1",
      category: "Kategorie10",
      count: 140,
      veh: "openwheel"
  },
  {
      name: "Custom",
      category: "Kategorie11",
      count: 210,
      veh: "normal"
  },
  {
      name: "Stance Andreas",
      category: "Kategorie12",
      count: 210,
      veh: "normal"
  }
]

export const wheelListName = [
    "Sport",
    "Tuner",
    "Lowrider",
    "Luxus",
    "Offroad",
    "Cat5",
    "Motorrad",
    "High - End",
    "Bennys Tuner",
    "Bennys Original",
    "Formel1",
    "Custom",
    "Stance Andreas",
]

export const wheelListCounts = [
  {
    Sport: 50,
  },
  {
    Tuner: 36,
  },
  {
    Lowrider: 30,
  },
  {
    Luxus: 38,
  },
  {
    Offroad: 35,
  },
  {
    Cat5: 48,
  },
  {
    Motorrad: 144,
  },
  {
    HighEnd: 40,
  },
  {
    Bennys: 217,
  },
  {
    BennysOriginal: 217,
  },
  {
    Formel1: 140,
  },
  {
    Custom: 210,
  },
  {
    StanceAndreas: 210,
  }
]


// Motor
// Bremsen
// Getriebe
// Federung
// Panzerung
// Turbo
// Xenon-Licht
// Radsturz
// Radhöhe
// Felgenradius
// Spurbreite
// Reifendurchmesser
// Reifenbreite
// Spoiler
// Frontstoßstange
// Heckstoßstange
// Seitenschweller
// Auspuff
// Rahmen
// Kühlergrill
// Motorhaube
// Linker Flügel
// Rechter Flügel
// Dach
// Hupen
// Kennzeichenhalter (horizontal)
// Kennzeichenhalter (vertikal)
// Hydraulik
// Streben
// Antenne
// Außenspiegel
// Aufkleber
// Kennzeichen
// Fenstertönung
// Verkleidungsdesign
// Ornamente
// Wahlscheiben-Design
// Innentür
// Sitze
// Lenkrad
// Schalthebel
// Plaketten
// Motorabdeckung
// Luftfilter
// Radkastenverkleidung
// Tank
// Tür
// Radhausverkleidung
// Sport
// Tuner
// Lowrider
// Luxus
// Offroad
// Cat5
// Motorrad
// High - End
// Bennys Tuner
// Bennys Original
// Formel1
// Custom
// Stance Andreas