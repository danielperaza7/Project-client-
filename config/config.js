export const CURRENT_DOMAIN = process.env.NODE_ENV === "production"
  ? process.env.RAZZLE_ENV_CURRENT_DOMAIN
  : "http://localhost:8080";
export const HIDDEN_FIGURE_URL = process.env.NODE_ENV === "production"
  ? process.env.RAZZLE_ENV_HIDDEN_FIGURE_URL
  : "http://localhost:3001/api";

export const SURVEY_LIST = {
  Age: ["under 18", "18-24", "25-34", "35-44", "45-54", "over 54"],
  Gender: ["Male", "Female", "Other"],
  Skin_type: ["Dry skin", "Oily skin", "Combination", "Sensitive"],
  Skin_concern: [
    "Anti-aging",
    "Pores",
    "Dryness",
    "Acne & Blemishes",
    "Dark Spots",
    "Fine Lines & Wrinkles",
    "Dullness",
    "Hyperpigmentation",
  ],
  Style_type: ["Chic", "Classic", "Trendy", "Glamorous", "Sporty"],
  Band_Size: ["32", "34", "36", "38", "40", "42", "44"],
  Cup_Size: ["A", "B", "C", "D", "DD", "DDD", "DDDD"],
  Panty_Size: ["S", "M", "L", "XL", "2XL", "3XL", "4XL"],
};

export const COUNTRIES_DEFAULT = [
  {
    id: "0",
    code: "US",
    name: "United States",
  },
];

export const COUNTRIES = [
  {
    id: "0",
    code: "US",
    dial: "+1",
    name: "United States",
  },
  {
    id: "1",
    code: "CN",
    dial: "+86",
    name: "China",
  },
  {
    id: "2",
    code: "CA",
    dial: "+1",
    name: "Canada",
  },
  {
    id: "3",
    code: "MX",
    dial: "+52",
    name: "Mexico",
  },
  {
    id: "4",
    code: "HK",
    dial: "+852",
    name: "Hong Kong SAR China",
  },
  {
    id: "5",
    code: "TW",
    dial: "+886",
    name: "Taiwan",
  },
  {
    id: "6",
    code: "SG",
    dial: "+65",
    name: "Singapore",
  },
  {
    id: "7",
    code: "AU",
    dial: "+61",
    name: "Australia",
  },
  {
    id: "8",
    code: "BS",
    dial: "+1242",
    name: "Bahamas",
  },
  {
    id: "9",
    code: "MO",
    dial: "+853",
    name: "Macau SAR China",
  },
  {
    id: "10",
    code: "CO",
    dial: "+57",
    name: "Colombia",
  },
  {
    id: "11",
    code: "FR",
    dial: "+33",
    name: "France",
  },
  {
    id: "12",
    code: "IS",
    dial: "+353",
    name: "Ireland",
  },
  {
    id: "13",
    code: "IL",
    dial: "+972",
    name: "Israel",
  },
  {
    id: "14",
    code: "JP",
    dial: "+81",
    name: "Japan",
  },
  {
    id: "15",
    code: "MC",
    dial: "+377",
    name: "Monaco",
  },
  {
    id: "16",
    code: "NL",
    dial: "+1",
    name: "Netherlands",
  },
  {
    id: "17",
    code: "NZ",
    dial: "+31",
    name: "New Zealand",
  },
  // {
  //   'id':
  //   'code': 'PR',
  //   'name':'Puerto Rico'
  // },
  {
    id: "18",
    code: "RU",
    dial: "+7",
    name: "Russia",
  },
  {
    id: "19",
    code: "ZA",
    dial: "+27",
    name: "South Africa",
  },
  {
    id: "20",
    code: "CH",
    dial: "+41",
    name: "Switzerland",
  },
  {
    id: "21",
    code: "TH",
    dial: "+66",
    name: "Thailand",
  },
  {
    id: "22",
    code: "GB",
    dial: "+44",
    name: "United Kingdom",
  },
  {
    id: "23",
    code: "AE",
    dial: "+971",
    name: "United Arab Emirates",
  },
  {
    id: "24",
    code: "UNKNOWN",
    dial: "",
    name: "Please select a supported country.",
  },
];

export const MASKS = {
  global: "global",
};

export const COUNTRY_TO_STATES = {
  US: [
    {
      id: "1",
      code: "AL",
      name: "Alabama",
    },
    {
      id: "2",
      code: "AK",
      name: "Alaska",
    },
    {
      id: "3",
      code: "AS",
      name: "American Samoa",
    },
    {
      id: "4",
      code: "AZ",
      name: "Arizona",
    },
    {
      id: "5",
      code: "AR",
      name: "Arkansas",
    },
    {
      id: "12",
      code: "CA",
      name: "California",
    },
    {
      id: "13",
      code: "CO",
      name: "Colorado",
    },
    {
      id: "14",
      code: "CT",
      name: "Connecticut",
    },
    {
      id: "15",
      code: "DE",
      name: "Delaware",
    },
    {
      id: "16",
      code: "DC",
      name: "District of Columbia",
    },
    {
      id: "17",
      code: "FM",
      name: "Federated States Of Micronesia",
    },
    {
      id: "18",
      code: "FL",
      name: "Florida",
    },
    {
      id: "19",
      code: "GA",
      name: "Georgia",
    },
    {
      id: "20",
      code: "GU",
      name: "Guam",
    },
    {
      id: "21",
      code: "HI",
      name: "Hawaii",
    },
    {
      id: "22",
      code: "ID",
      name: "Idaho",
    },
    {
      id: "23",
      code: "IL",
      name: "Illinois",
    },
    {
      id: "24",
      code: "IN",
      name: "Indiana",
    },
    {
      id: "25",
      code: "IA",
      name: "Iowa",
    },
    {
      id: "26",
      code: "KS",
      name: "Kansas",
    },
    {
      id: "27",
      code: "KY",
      name: "Kentucky",
    },
    {
      id: "28",
      code: "LA",
      name: "Louisiana",
    },
    {
      id: "29",
      code: "ME",
      name: "Maine",
    },
    {
      id: "30",
      code: "MH",
      name: "Marshall Islands",
    },
    {
      id: "31",
      code: "MD",
      name: "Maryland",
    },
    {
      id: "32",
      code: "MA",
      name: "Massachusetts",
    },
    {
      id: "33",
      code: "MI",
      name: "Michigan",
    },
    {
      id: "34",
      code: "MN",
      name: "Minnesota",
    },
    {
      id: "35",
      code: "MS",
      name: "Mississippi",
    },
    {
      id: "36",
      code: "MO",
      name: "Missouri",
    },
    {
      id: "37",
      code: "MT",
      name: "Montana",
    },
    {
      id: "38",
      code: "NE",
      name: "Nebraska",
    },
    {
      id: "39",
      code: "NV",
      name: "Nevada",
    },
    {
      id: "40",
      code: "NH",
      name: "New Hampshire",
    },
    {
      id: "41",
      code: "NJ",
      name: "New Jersey",
    },
    {
      id: "42",
      code: "NM",
      name: "New Mexico",
    },
    {
      id: "43",
      code: "NY",
      name: "New York",
    },
    {
      id: "44",
      code: "NC",
      name: "North Carolina",
    },
    {
      id: "45",
      code: "ND",
      name: "North Dakota",
    },
    {
      id: "46",
      code: "MP",
      name: "Northern Mariana Islands",
    },
    {
      id: "47",
      code: "OH",
      name: "Ohio",
    },
    {
      id: "48",
      code: "OK",
      name: "Oklahoma",
    },
    {
      id: "49",
      code: "OR",
      name: "Oregon",
    },
    {
      id: "50",
      code: "PW",
      name: "Palau",
    },
    {
      id: "51",
      code: "PA",
      name: "Pennsylvania",
    },
    {
      id: "52",
      code: "PR",
      name: "Puerto Rico",
    },
    {
      id: "53",
      code: "RI",
      name: "Rhode Island",
    },
    {
      id: "54",
      code: "SC",
      name: "South Carolina",
    },
    {
      id: "55",
      code: "SD",
      name: "South Dakota",
    },
    {
      id: "56",
      code: "TN",
      name: "Tennessee",
    },
    {
      id: "57",
      code: "TX",
      name: "Texas",
    },
    {
      id: "58",
      code: "UT",
      name: "Utah",
    },
    {
      id: "59",
      code: "VT",
      name: "Vermont",
    },
    {
      id: "60",
      code: "VI",
      name: "Virgin Islands",
    },
    {
      id: "61",
      code: "VA",
      name: "Virginia",
    },
    {
      id: "62",
      code: "WA",
      name: "Washington",
    },
    {
      id: "63",
      code: "WV",
      name: "West Virginia",
    },
    {
      id: "64",
      code: "WI",
      name: "Wisconsin",
    },
    {
      id: "65",
      code: "WY",
      name: "Wyoming",
    },

    // {
    //   "id": "6",
    //   "code": "AE",
    //   "name": "Armed Forces Africa"
    // },
    {
      id: "7",
      code: "AA",
      name: "Armed Forces Americas",
    },
    // {
    //   "id": "8",
    //   "code": "AE",
    //   "name": "Armed Forces Canada"
    // },
    {
      id: "9",
      code: "AE",
      name: "Armed Forces Europe",
    },
    // {
    //   "id": "10",
    //   "code": "AE",
    //   "name": "Armed Forces Middle East"
    // },
    {
      id: "11",
      code: "AP",
      name: "Armed Forces Pacific",
    },
  ],
  CA: [
    {
      id: "66",
      code: "AB",
      name: "Alberta",
    },
    {
      id: "67",
      code: "BC",
      name: "British Columbia",
    },
    {
      id: "68",
      code: "MB",
      name: "Manitoba",
    },
    {
      id: "69",
      code: "NL",
      name: "Newfoundland and Labrador",
    },
    {
      id: "70",
      code: "NB",
      name: "New Brunswick",
    },
    {
      id: "71",
      code: "NS",
      name: "Nova Scotia",
    },
    {
      id: "72",
      code: "NT",
      name: "Northwest Territories",
    },
    {
      id: "73",
      code: "NU",
      name: "Nunavut",
    },
    {
      id: "74",
      code: "ON",
      name: "Ontario",
    },
    {
      id: "75",
      code: "PE",
      name: "Prince Edward Island",
    },
    {
      id: "76",
      code: "QC",
      name: "Quebec",
    },
    {
      id: "77",
      code: "SK",
      name: "Saskatchewan",
    },
    {
      id: "78",
      code: "YT",
      name: "Yukon Territory",
    },
  ],
  DE: [
    {
      id: "79",
      code: "NDS",
      name: "Niedersachsen",
    },
    {
      id: "80",
      code: "BAW",
      name: "Baden-Württemberg",
    },
    {
      id: "81",
      code: "BAY",
      name: "Bayern",
    },
    {
      id: "82",
      code: "BER",
      name: "Berlin",
    },
    {
      id: "83",
      code: "BRG",
      name: "Brandenburg",
    },
    {
      id: "84",
      code: "BRE",
      name: "Bremen",
    },
    {
      id: "85",
      code: "HAM",
      name: "Hamburg",
    },
    {
      id: "86",
      code: "HES",
      name: "Hessen",
    },
    {
      id: "87",
      code: "MEC",
      name: "Mecklenburg-Vorpommern",
    },
    {
      id: "88",
      code: "NRW",
      name: "Nordrhein-Westfalen",
    },
    {
      id: "89",
      code: "RHE",
      name: "Rheinland-Pfalz",
    },
    {
      id: "90",
      code: "SAR",
      name: "Saarland",
    },
    {
      id: "91",
      code: "SAS",
      name: "Sachsen",
    },
    {
      id: "92",
      code: "SAC",
      name: "Sachsen-Anhalt",
    },
    {
      id: "93",
      code: "SCN",
      name: "Schleswig-Holstein",
    },
    {
      id: "94",
      code: "THE",
      name: "Thüringen",
    },
  ],
  AT: [
    {
      id: "95",
      code: "WI",
      name: "Wien",
    },
    {
      id: "96",
      code: "NO",
      name: "Niederösterreich",
    },
    {
      id: "97",
      code: "OO",
      name: "Oberösterreich",
    },
    {
      id: "98",
      code: "SB",
      name: "Salzburg",
    },
    {
      id: "99",
      code: "KN",
      name: "Kärnten",
    },
    {
      id: "100",
      code: "ST",
      name: "Steiermark",
    },
    {
      id: "101",
      code: "TI",
      name: "Tirol",
    },
    {
      id: "102",
      code: "BL",
      name: "Burgenland",
    },
    {
      id: "103",
      code: "VB",
      name: "Vorarlberg",
    },
  ],
  CH: [
    {
      id: "104",
      code: "AG",
      name: "Aargau",
    },
    {
      id: "105",
      code: "AI",
      name: "Appenzell Innerrhoden",
    },
    {
      id: "106",
      code: "AR",
      name: "Appenzell Ausserrhoden",
    },
    {
      id: "107",
      code: "BE",
      name: "Bern",
    },
    {
      id: "108",
      code: "BL",
      name: "Basel-Landschaft",
    },
    {
      id: "109",
      code: "BS",
      name: "Basel-Stadt",
    },
    {
      id: "110",
      code: "FR",
      name: "Freiburg",
    },
    {
      id: "111",
      code: "GE",
      name: "Genf",
    },
    {
      id: "112",
      code: "GL",
      name: "Glarus",
    },
    {
      id: "113",
      code: "GR",
      name: "Graubünden",
    },
    {
      id: "114",
      code: "JU",
      name: "Jura",
    },
    {
      id: "115",
      code: "LU",
      name: "Luzern",
    },
    {
      id: "116",
      code: "NE",
      name: "Neuenburg",
    },
    {
      id: "117",
      code: "NW",
      name: "Nidwalden",
    },
    {
      id: "118",
      code: "OW",
      name: "Obwalden",
    },
    {
      id: "119",
      code: "SG",
      name: "St. Gallen",
    },
    {
      id: "120",
      code: "SH",
      name: "Schaffhausen",
    },
    {
      id: "121",
      code: "SO",
      name: "Solothurn",
    },
    {
      id: "122",
      code: "SZ",
      name: "Schwyz",
    },
    {
      id: "123",
      code: "TG",
      name: "Thurgau",
    },
    {
      id: "124",
      code: "TI",
      name: "Tessin",
    },
    {
      id: "125",
      code: "UR",
      name: "Uri",
    },
    {
      id: "126",
      code: "VD",
      name: "Waadt",
    },
    {
      id: "127",
      code: "VS",
      name: "Wallis",
    },
    {
      id: "128",
      code: "ZG",
      name: "Zug",
    },
    {
      id: "129",
      code: "ZH",
      name: "Zürich",
    },
  ],
  ES: [
    {
      id: "130",
      code: "A Coruсa",
      name: "A Coruña",
    },
    {
      id: "131",
      code: "Alava",
      name: "Alava",
    },
    {
      id: "132",
      code: "Albacete",
      name: "Albacete",
    },
    {
      id: "133",
      code: "Alicante",
      name: "Alicante",
    },
    {
      id: "134",
      code: "Almeria",
      name: "Almeria",
    },
    {
      id: "135",
      code: "Asturias",
      name: "Asturias",
    },
    {
      id: "136",
      code: "Avila",
      name: "Avila",
    },
    {
      id: "137",
      code: "Badajoz",
      name: "Badajoz",
    },
    {
      id: "138",
      code: "Baleares",
      name: "Baleares",
    },
    {
      id: "139",
      code: "Barcelona",
      name: "Barcelona",
    },
    {
      id: "140",
      code: "Burgos",
      name: "Burgos",
    },
    {
      id: "141",
      code: "Caceres",
      name: "Caceres",
    },
    {
      id: "142",
      code: "Cadiz",
      name: "Cadiz",
    },
    {
      id: "143",
      code: "Cantabria",
      name: "Cantabria",
    },
    {
      id: "144",
      code: "Castellon",
      name: "Castellon",
    },
    {
      id: "145",
      code: "Ceuta",
      name: "Ceuta",
    },
    {
      id: "146",
      code: "Ciudad Real",
      name: "Ciudad Real",
    },
    {
      id: "147",
      code: "Cordoba",
      name: "Cordoba",
    },
    {
      id: "148",
      code: "Cuenca",
      name: "Cuenca",
    },
    {
      id: "149",
      code: "Girona",
      name: "Girona",
    },
    {
      id: "150",
      code: "Granada",
      name: "Granada",
    },
    {
      id: "151",
      code: "Guadalajara",
      name: "Guadalajara",
    },
    {
      id: "152",
      code: "Guipuzcoa",
      name: "Guipuzcoa",
    },
    {
      id: "153",
      code: "Huelva",
      name: "Huelva",
    },
    {
      id: "154",
      code: "Huesca",
      name: "Huesca",
    },
    {
      id: "155",
      code: "Jaen",
      name: "Jaen",
    },
    {
      id: "156",
      code: "La Rioja",
      name: "La Rioja",
    },
    {
      id: "157",
      code: "Las Palmas",
      name: "Las Palmas",
    },
    {
      id: "158",
      code: "Leon",
      name: "Leon",
    },
    {
      id: "159",
      code: "Lleida",
      name: "Lleida",
    },
    {
      id: "160",
      code: "Lugo",
      name: "Lugo",
    },
    {
      id: "161",
      code: "Madrid",
      name: "Madrid",
    },
    {
      id: "162",
      code: "Malaga",
      name: "Malaga",
    },
    {
      id: "163",
      code: "Melilla",
      name: "Melilla",
    },
    {
      id: "164",
      code: "Murcia",
      name: "Murcia",
    },
    {
      id: "165",
      code: "Navarra",
      name: "Navarra",
    },
    {
      id: "166",
      code: "Ourense",
      name: "Ourense",
    },
    {
      id: "167",
      code: "Palencia",
      name: "Palencia",
    },
    {
      id: "168",
      code: "Pontevedra",
      name: "Pontevedra",
    },
    {
      id: "169",
      code: "Salamanca",
      name: "Salamanca",
    },
    {
      id: "170",
      code: "Santa Cruz de Tenerife",
      name: "Santa Cruz de Tenerife",
    },
    {
      id: "171",
      code: "Segovia",
      name: "Segovia",
    },
    {
      id: "172",
      code: "Sevilla",
      name: "Sevilla",
    },
    {
      id: "173",
      code: "Soria",
      name: "Soria",
    },
    {
      id: "174",
      code: "Tarragona",
      name: "Tarragona",
    },
    {
      id: "175",
      code: "Teruel",
      name: "Teruel",
    },
    {
      id: "176",
      code: "Toledo",
      name: "Toledo",
    },
    {
      id: "177",
      code: "Valencia",
      name: "Valencia",
    },
    {
      id: "178",
      code: "Valladolid",
      name: "Valladolid",
    },
    {
      id: "179",
      code: "Vizcaya",
      name: "Vizcaya",
    },
    {
      id: "180",
      code: "Zamora",
      name: "Zamora",
    },
    {
      id: "181",
      code: "Zaragoza",
      name: "Zaragoza",
    },
  ],
  FR: [
    {
      id: "182",
      code: "1",
      name: "Grand Est",
    },
    {
      id: "183",
      code: "2",
      name: "Nouvelle-Aquitaine",
    },
    {
      id: "184",
      code: "3",
      name: "Auvergne-Rhône-Alpes",
    },
    {
      id: "185",
      code: "4",
      name: "Bourgogne-Franche-Comté",
    },
    {
      id: "186",
      code: "5",
      name: "Brittany",
    },
    {
      id: "187",
      code: "6",
      name: "Centre-Val de Loire",
    },
    {
      id: "188",
      code: "7",
      name: "Île-de-France",
    },
    {
      id: "189",
      code: "8",
      name: "Occitanie",
    },
    {
      id: "190",
      code: "9",
      name: "Hauts-de-France",
    },
    {
      id: "191",
      code: "10",
      name: "Normandy",
    },
    {
      id: "192",
      code: "11",
      name: "Pays de la Loire",
    },
    {
      id: "193",
      code: "12",
      name: "Provence-Alpes-Côte d'Azur",
    },
    {
      id: "194",
      code: "13",
      name: "Corsica",
    },
    {
      id: "195",
      code: "14",
      name: "Calvados",
    },
    {
      id: "196",
      code: "15",
      name: "Cantal",
    },
  ],
  RO: [
    {
      id: "278",
      code: "AB",
      name: "Alba",
    },
    {
      id: "279",
      code: "AR",
      name: "Arad",
    },
    {
      id: "280",
      code: "AG",
      name: "Argeş",
    },
    {
      id: "281",
      code: "BC",
      name: "Bacău",
    },
    {
      id: "282",
      code: "BH",
      name: "Bihor",
    },
    {
      id: "283",
      code: "BN",
      name: "Bistriţa-Năsăud",
    },
    {
      id: "284",
      code: "BT",
      name: "Botoşani",
    },
    {
      id: "285",
      code: "BV",
      name: "Braşov",
    },
    {
      id: "286",
      code: "BR",
      name: "Brăila",
    },
    {
      id: "287",
      code: "B",
      name: "Bucureşti",
    },
    {
      id: "288",
      code: "BZ",
      name: "Buzău",
    },
    {
      id: "289",
      code: "CS",
      name: "Caraş-Severin",
    },
    {
      id: "290",
      code: "CL",
      name: "Călăraşi",
    },
    {
      id: "291",
      code: "CJ",
      name: "Cluj",
    },
    {
      id: "292",
      code: "CT",
      name: "Constanţa",
    },
    {
      id: "293",
      code: "CV",
      name: "Covasna",
    },
    {
      id: "294",
      code: "DB",
      name: "Dâmboviţa",
    },
    {
      id: "295",
      code: "DJ",
      name: "Dolj",
    },
    {
      id: "296",
      code: "GL",
      name: "Galaţi",
    },
    {
      id: "297",
      code: "GR",
      name: "Giurgiu",
    },
    {
      id: "298",
      code: "GJ",
      name: "Gorj",
    },
    {
      id: "299",
      code: "HR",
      name: "Harghita",
    },
    {
      id: "300",
      code: "HD",
      name: "Hunedoara",
    },
    {
      id: "301",
      code: "IL",
      name: "Ialomiţa",
    },
    {
      id: "302",
      code: "IS",
      name: "Iaşi",
    },
    {
      id: "303",
      code: "IF",
      name: "Ilfov",
    },
    {
      id: "304",
      code: "MM",
      name: "Maramureş",
    },
    {
      id: "305",
      code: "MH",
      name: "Mehedinţi",
    },
    {
      id: "306",
      code: "MS",
      name: "Mureş",
    },
    {
      id: "307",
      code: "NT",
      name: "Neamţ",
    },
    {
      id: "308",
      code: "OT",
      name: "Olt",
    },
    {
      id: "309",
      code: "PH",
      name: "Prahova",
    },
    {
      id: "310",
      code: "SM",
      name: "Satu-Mare",
    },
    {
      id: "311",
      code: "SJ",
      name: "Sălaj",
    },
    {
      id: "312",
      code: "SB",
      name: "Sibiu",
    },
    {
      id: "313",
      code: "SV",
      name: "Suceava",
    },
    {
      id: "314",
      code: "TR",
      name: "Teleorman",
    },
    {
      id: "315",
      code: "TM",
      name: "Timiş",
    },
    {
      id: "316",
      code: "TL",
      name: "Tulcea",
    },
    {
      id: "317",
      code: "VS",
      name: "Vaslui",
    },
    {
      id: "318",
      code: "VL",
      name: "Vâlcea",
    },
    {
      id: "319",
      code: "VN",
      name: "Vrancea",
    },
  ],
  FI: [
    {
      id: "320",
      code: "Lappi",
      name: "Lappi",
    },
    {
      id: "321",
      code: "Pohjois-Pohjanmaa",
      name: "Pohjois-Pohjanmaa",
    },
    {
      id: "322",
      code: "Kainuu",
      name: "Kainuu",
    },
    {
      id: "323",
      code: "Pohjois-Karjala",
      name: "Pohjois-Karjala",
    },
    {
      id: "324",
      code: "Pohjois-Savo",
      name: "Pohjois-Savo",
    },
    {
      id: "325",
      code: "Etelä-Savo",
      name: "Etelä-Savo",
    },
    {
      id: "326",
      code: "Etelä-Pohjanmaa",
      name: "Etelä-Pohjanmaa",
    },
    {
      id: "327",
      code: "Pohjanmaa",
      name: "Pohjanmaa",
    },
    {
      id: "328",
      code: "Pirkanmaa",
      name: "Pirkanmaa",
    },
    {
      id: "329",
      code: "Satakunta",
      name: "Satakunta",
    },
    {
      id: "330",
      code: "Keski-Pohjanmaa",
      name: "Keski-Pohjanmaa",
    },
    {
      id: "331",
      code: "Keski-Suomi",
      name: "Keski-Suomi",
    },
    {
      id: "332",
      code: "Varsinais-Suomi",
      name: "Varsinais-Suomi",
    },
    {
      id: "333",
      code: "Etelä-Karjala",
      name: "Etelä-Karjala",
    },
    {
      id: "334",
      code: "Päijät-Häme",
      name: "Päijät-Häme",
    },
    {
      id: "335",
      code: "Kanta-Häme",
      name: "Kanta-Häme",
    },
    {
      id: "336",
      code: "Uusimaa",
      name: "Uusimaa",
    },
    {
      id: "337",
      code: "Itä-Uusimaa",
      name: "Itä-Uusimaa",
    },
    {
      id: "338",
      code: "Kymenlaakso",
      name: "Kymenlaakso",
    },
    {
      id: "339",
      code: "Ahvenanmaa",
      name: "Ahvenanmaa",
    },
  ],
  EE: [
    {
      id: "340",
      code: "EE-37",
      name: "Harjumaa",
    },
    {
      id: "341",
      code: "EE-39",
      name: "Hiiumaa",
    },
    {
      id: "342",
      code: "EE-44",
      name: "Ida-Virumaa",
    },
    {
      id: "343",
      code: "EE-49",
      name: "Jõgevamaa",
    },
    {
      id: "344",
      code: "EE-51",
      name: "Järvamaa",
    },
    {
      id: "345",
      code: "EE-57",
      name: "Läänemaa",
    },
    {
      id: "346",
      code: "EE-59",
      name: "Lääne-Virumaa",
    },
    {
      id: "347",
      code: "EE-65",
      name: "Põlvamaa",
    },
    {
      id: "348",
      code: "EE-67",
      name: "Pärnumaa",
    },
    {
      id: "349",
      code: "EE-70",
      name: "Raplamaa",
    },
    {
      id: "350",
      code: "EE-74",
      name: "Saaremaa",
    },
    {
      id: "351",
      code: "EE-78",
      name: "Tartumaa",
    },
    {
      id: "352",
      code: "EE-82",
      name: "Valgamaa",
    },
    {
      id: "353",
      code: "EE-84",
      name: "Viljandimaa",
    },
    {
      id: "354",
      code: "EE-86",
      name: "Võrumaa",
    },
  ],
  LV: [
    {
      id: "355",
      code: "LV-DGV",
      name: "Daugavpils",
    },
    {
      id: "356",
      code: "LV-JEL",
      name: "Jelgava",
    },
    {
      id: "357",
      code: "Jēkabpils",
      name: "Jēkabpils",
    },
    {
      id: "358",
      code: "LV-JUR",
      name: "Jūrmala",
    },
    {
      id: "359",
      code: "LV-LPX",
      name: "Liepāja",
    },
    {
      id: "360",
      code: "LV-LE",
      name: "Liepājas novads",
    },
    {
      id: "361",
      code: "LV-REZ",
      name: "Rēzekne",
    },
    {
      id: "362",
      code: "LV-RIX",
      name: "Rīga",
    },
    {
      id: "363",
      code: "LV-RI",
      name: "Rīgas novads",
    },
    {
      id: "364",
      code: "Valmiera",
      name: "Valmiera",
    },
    {
      id: "365",
      code: "LV-VEN",
      name: "Ventspils",
    },
    {
      id: "366",
      code: "Aglonas novads",
      name: "Aglonas novads",
    },
    {
      id: "367",
      code: "LV-AI",
      name: "Aizkraukles novads",
    },
    {
      id: "368",
      code: "Aizputes novads",
      name: "Aizputes novads",
    },
    {
      id: "369",
      code: "Aknīstes novads",
      name: "Aknīstes novads",
    },
    {
      id: "370",
      code: "Alojas novads",
      name: "Alojas novads",
    },
    {
      id: "371",
      code: "Alsungas novads",
      name: "Alsungas novads",
    },
    {
      id: "372",
      code: "LV-AL",
      name: "Alūksnes novads",
    },
    {
      id: "373",
      code: "Amatas novads",
      name: "Amatas novads",
    },
    {
      id: "374",
      code: "Apes novads",
      name: "Apes novads",
    },
    {
      id: "375",
      code: "Auces novads",
      name: "Auces novads",
    },
    {
      id: "376",
      code: "Babītes novads",
      name: "Babītes novads",
    },
    {
      id: "377",
      code: "Baldones novads",
      name: "Baldones novads",
    },
    {
      id: "378",
      code: "Baltinavas novads",
      name: "Baltinavas novads",
    },
    {
      id: "379",
      code: "LV-BL",
      name: "Balvu novads",
    },
    {
      id: "380",
      code: "LV-BU",
      name: "Bauskas novads",
    },
    {
      id: "381",
      code: "Beverīnas novads",
      name: "Beverīnas novads",
    },
    {
      id: "382",
      code: "Brocēnu novads",
      name: "Brocēnu novads",
    },
    {
      id: "383",
      code: "Burtnieku novads",
      name: "Burtnieku novads",
    },
    {
      id: "384",
      code: "Carnikavas novads",
      name: "Carnikavas novads",
    },
    {
      id: "385",
      code: "Cesvaines novads",
      name: "Cesvaines novads",
    },
    {
      id: "386",
      code: "Ciblas novads",
      name: "Ciblas novads",
    },
    {
      id: "387",
      code: "LV-CE",
      name: "Cēsu novads",
    },
    {
      id: "388",
      code: "Dagdas novads",
      name: "Dagdas novads",
    },
    {
      id: "389",
      code: "LV-DA",
      name: "Daugavpils novads",
    },
    {
      id: "390",
      code: "LV-DO",
      name: "Dobeles novads",
    },
    {
      id: "391",
      code: "Dundagas novads",
      name: "Dundagas novads",
    },
    {
      id: "392",
      code: "Durbes novads",
      name: "Durbes novads",
    },
    {
      id: "393",
      code: "Engures novads",
      name: "Engures novads",
    },
    {
      id: "394",
      code: "Garkalnes novads",
      name: "Garkalnes novads",
    },
    {
      id: "395",
      code: "Grobiņas novads",
      name: "Grobiņas novads",
    },
    {
      id: "396",
      code: "LV-GU",
      name: "Gulbenes novads",
    },
    {
      id: "397",
      code: "Iecavas novads",
      name: "Iecavas novads",
    },
    {
      id: "398",
      code: "Ikšķiles novads",
      name: "Ikšķiles novads",
    },
    {
      id: "399",
      code: "Ilūkstes novads",
      name: "Ilūkstes novads",
    },
    {
      id: "400",
      code: "Inčukalna novads",
      name: "Inčukalna novads",
    },
    {
      id: "401",
      code: "Jaunjelgavas novads",
      name: "Jaunjelgavas novads",
    },
    {
      id: "402",
      code: "Jaunpiebalgas novads",
      name: "Jaunpiebalgas novads",
    },
    {
      id: "403",
      code: "Jaunpils novads",
      name: "Jaunpils novads",
    },
    {
      id: "404",
      code: "LV-JL",
      name: "Jelgavas novads",
    },
    {
      id: "405",
      code: "LV-JK",
      name: "Jēkabpils novads",
    },
    {
      id: "406",
      code: "Kandavas novads",
      name: "Kandavas novads",
    },
    {
      id: "407",
      code: "Kokneses novads",
      name: "Kokneses novads",
    },
    {
      id: "408",
      code: "Krimuldas novads",
      name: "Krimuldas novads",
    },
    {
      id: "409",
      code: "Krustpils novads",
      name: "Krustpils novads",
    },
    {
      id: "410",
      code: "LV-KR",
      name: "Krāslavas novads",
    },
    {
      id: "411",
      code: "LV-KU",
      name: "Kuldīgas novads",
    },
    {
      id: "412",
      code: "Kārsavas novads",
      name: "Kārsavas novads",
    },
    {
      id: "413",
      code: "Lielvārdes novads",
      name: "Lielvārdes novads",
    },
    {
      id: "414",
      code: "LV-LM",
      name: "Limbažu novads",
    },
    {
      id: "415",
      code: "Lubānas novads",
      name: "Lubānas novads",
    },
    {
      id: "416",
      code: "LV-LU",
      name: "Ludzas novads",
    },
    {
      id: "417",
      code: "Līgatnes novads",
      name: "Līgatnes novads",
    },
    {
      id: "418",
      code: "Līvānu novads",
      name: "Līvānu novads",
    },
    {
      id: "419",
      code: "LV-MA",
      name: "Madonas novads",
    },
    {
      id: "420",
      code: "Mazsalacas novads",
      name: "Mazsalacas novads",
    },
    {
      id: "421",
      code: "Mālpils novads",
      name: "Mālpils novads",
    },
    {
      id: "422",
      code: "Mārupes novads",
      name: "Mārupes novads",
    },
    {
      id: "423",
      code: "Naukšēnu novads",
      name: "Naukšēnu novads",
    },
    {
      id: "424",
      code: "Neretas novads",
      name: "Neretas novads",
    },
    {
      id: "425",
      code: "Nīcas novads",
      name: "Nīcas novads",
    },
    {
      id: "426",
      code: "LV-OG",
      name: "Ogres novads",
    },
    {
      id: "427",
      code: "Olaines novads",
      name: "Olaines novads",
    },
    {
      id: "428",
      code: "Ozolnieku novads",
      name: "Ozolnieku novads",
    },
    {
      id: "429",
      code: "LV-PR",
      name: "Preiļu novads",
    },
    {
      id: "430",
      code: "Priekules novads",
      name: "Priekules novads",
    },
    {
      id: "431",
      code: "Priekuļu novads",
      name: "Priekuļu novads",
    },
    {
      id: "432",
      code: "Pārgaujas novads",
      name: "Pārgaujas novads",
    },
    {
      id: "433",
      code: "Pāvilostas novads",
      name: "Pāvilostas novads",
    },
    {
      id: "434",
      code: "Pļaviņu novads",
      name: "Pļaviņu novads",
    },
    {
      id: "435",
      code: "Raunas novads",
      name: "Raunas novads",
    },
    {
      id: "436",
      code: "Riebiņu novads",
      name: "Riebiņu novads",
    },
    {
      id: "437",
      code: "Rojas novads",
      name: "Rojas novads",
    },
    {
      id: "438",
      code: "Ropažu novads",
      name: "Ropažu novads",
    },
    {
      id: "439",
      code: "Rucavas novads",
      name: "Rucavas novads",
    },
    {
      id: "440",
      code: "Rugāju novads",
      name: "Rugāju novads",
    },
    {
      id: "441",
      code: "Rundāles novads",
      name: "Rundāles novads",
    },
    {
      id: "442",
      code: "LV-RE",
      name: "Rēzeknes novads",
    },
    {
      id: "443",
      code: "Rūjienas novads",
      name: "Rūjienas novads",
    },
    {
      id: "444",
      code: "Salacgrīvas novads",
      name: "Salacgrīvas novads",
    },
    {
      id: "445",
      code: "Salas novads",
      name: "Salas novads",
    },
    {
      id: "446",
      code: "Salaspils novads",
      name: "Salaspils novads",
    },
    {
      id: "447",
      code: "LV-SA",
      name: "Saldus novads",
    },
    {
      id: "448",
      code: "Saulkrastu novads",
      name: "Saulkrastu novads",
    },
    {
      id: "449",
      code: "Siguldas novads",
      name: "Siguldas novads",
    },
    {
      id: "450",
      code: "Skrundas novads",
      name: "Skrundas novads",
    },
    {
      id: "451",
      code: "Skrīveru novads",
      name: "Skrīveru novads",
    },
    {
      id: "452",
      code: "Smiltenes novads",
      name: "Smiltenes novads",
    },
    {
      id: "453",
      code: "Stopiņu novads",
      name: "Stopiņu novads",
    },
    {
      id: "454",
      code: "Strenču novads",
      name: "Strenču novads",
    },
    {
      id: "455",
      code: "Sējas novads",
      name: "Sējas novads",
    },
    {
      id: "456",
      code: "LV-TA",
      name: "Talsu novads",
    },
    {
      id: "457",
      code: "LV-TU",
      name: "Tukuma novads",
    },
    {
      id: "458",
      code: "Tērvetes novads",
      name: "Tērvetes novads",
    },
    {
      id: "459",
      code: "Vaiņodes novads",
      name: "Vaiņodes novads",
    },
    {
      id: "460",
      code: "LV-VK",
      name: "Valkas novads",
    },
    {
      id: "461",
      code: "LV-VM",
      name: "Valmieras novads",
    },
    {
      id: "462",
      code: "Varakļānu novads",
      name: "Varakļānu novads",
    },
    {
      id: "463",
      code: "Vecpiebalgas novads",
      name: "Vecpiebalgas novads",
    },
    {
      id: "464",
      code: "Vecumnieku novads",
      name: "Vecumnieku novads",
    },
    {
      id: "465",
      code: "LV-VE",
      name: "Ventspils novads",
    },
    {
      id: "466",
      code: "Viesītes novads",
      name: "Viesītes novads",
    },
    {
      id: "467",
      code: "Viļakas novads",
      name: "Viļakas novads",
    },
    {
      id: "468",
      code: "Viļānu novads",
      name: "Viļānu novads",
    },
    {
      id: "469",
      code: "Vārkavas novads",
      name: "Vārkavas novads",
    },
    {
      id: "470",
      code: "Zilupes novads",
      name: "Zilupes novads",
    },
    {
      id: "471",
      code: "Ādažu novads",
      name: "Ādažu novads",
    },
    {
      id: "472",
      code: "Ērgļu novads",
      name: "Ērgļu novads",
    },
    {
      id: "473",
      code: "Ķeguma novads",
      name: "Ķeguma novads",
    },
    {
      id: "474",
      code: "Ķekavas novads",
      name: "Ķekavas novads",
    },
  ],
  LT: [
    {
      id: "475",
      code: "LT-AL",
      name: "Alytaus Apskritis",
    },
    {
      id: "476",
      code: "LT-KU",
      name: "Kauno Apskritis",
    },
    {
      id: "477",
      code: "LT-KL",
      name: "Klaipėdos Apskritis",
    },
    {
      id: "478",
      code: "LT-MR",
      name: "Marijampolės Apskritis",
    },
    {
      id: "479",
      code: "LT-PN",
      name: "Panevėžio Apskritis",
    },
    {
      id: "480",
      code: "LT-SA",
      name: "Šiaulių Apskritis",
    },
    {
      id: "481",
      code: "LT-TA",
      name: "Tauragės Apskritis",
    },
    {
      id: "482",
      code: "LT-TE",
      name: "Telšių Apskritis",
    },
    {
      id: "483",
      code: "LT-UT",
      name: "Utenos Apskritis",
    },
    {
      id: "484",
      code: "LT-VL",
      name: "Vilniaus Apskritis",
    },
  ],
  BR: [
    {
      id: "485",
      code: "AC",
      name: "Acre",
    },
    {
      id: "486",
      code: "AL",
      name: "Alagoas",
    },
    {
      id: "487",
      code: "AP",
      name: "Amapá",
    },
    {
      id: "488",
      code: "AM",
      name: "Amazonas",
    },
    {
      id: "489",
      code: "BA",
      name: "Bahia",
    },
    {
      id: "490",
      code: "CE",
      name: "Ceará",
    },
    {
      id: "491",
      code: "ES",
      name: "Espírito Santo",
    },
    {
      id: "492",
      code: "GO",
      name: "Goiás",
    },
    {
      id: "493",
      code: "MA",
      name: "Maranhão",
    },
    {
      id: "494",
      code: "MT",
      name: "Mato Grosso",
    },
    {
      id: "495",
      code: "MS",
      name: "Mato Grosso do Sul",
    },
    {
      id: "496",
      code: "MG",
      name: "Minas Gerais",
    },
    {
      id: "497",
      code: "PA",
      name: "Pará",
    },
    {
      id: "498",
      code: "PB",
      name: "Paraíba",
    },
    {
      id: "499",
      code: "PR",
      name: "Paraná",
    },
    {
      id: "500",
      code: "PE",
      name: "Pernambuco",
    },
    {
      id: "501",
      code: "PI",
      name: "Piauí",
    },
    {
      id: "502",
      code: "RJ",
      name: "Rio de Janeiro",
    },
    {
      id: "503",
      code: "RN",
      name: "Rio Grande do Norte",
    },
    {
      id: "504",
      code: "RS",
      name: "Rio Grande do Sul",
    },
    {
      id: "505",
      code: "RO",
      name: "Rondônia",
    },
    {
      id: "506",
      code: "RR",
      name: "Roraima",
    },
    {
      id: "507",
      code: "SC",
      name: "Santa Catarina",
    },
    {
      id: "508",
      code: "SP",
      name: "São Paulo",
    },
    {
      id: "509",
      code: "SE",
      name: "Sergipe",
    },
    {
      id: "510",
      code: "TO",
      name: "Tocantins",
    },
    {
      id: "511",
      code: "DF",
      name: "Distrito Federal",
    },
  ],
};

// http://developer.ean.com/general-info/valid-card-types/
export const CREDIT_CARD_CODE = {
  VI: "Visa",
  AX: "American Express",
  BC: "BC Card",
  CA: "MasterCard",
  DS: "Discover",
  DC: "Diners Club",
  T: "Carta Si",
  R: "Carte Bleue",
  E: "Visa Electron",
  JC: "Japan Credit Bureau",
  TO: "Maestro",
};

export const CURRENT_COUNTRY = process.env.RAZZLE_ENV_country ? process.env.RAZZLE_ENV_country : "US";

export const ITEM_QTY_MAX = 15;

export const SLICK_CAROUSEL_CSS = [
  {
    rel: "stylesheet",
    href:
      "https://hiddenfigure.evestemptation.com/FrontEndDependency/SlickCarousel/slick.min.css",
    // href:"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
  },
  {
    rel: "stylesheet",
    href:
      "https://hiddenfigure.evestemptation.com/FrontEndDependency/SlickCarousel/slick-theme.min.css",
    // href:"https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
  },
];

export const HFCODE = {
  /* Specials */
  LOGGING: "0LOG",
  ALLGOOD: "0000",

  /* Universal */
  SERVER_ERROR: "1000",
  AUTHENTICATION_ERROR: "10AE",
  MAGENTO_ERROR: "10ME",
  VALIDATION_ERROR: "10VE",
  REDIS_ERROR: "10RD",
  FIELD_MISSING: "10FM",
  INVALID_FIELD: "10IF",
  TOKEN_EXPIRED: "10TE",
  INVALID_TOKEN: "10IT",
  BODY_MISSING: "10BM",

  /* Category */
  FILTER_ERROR: "20FT",
  ADD_FILTER_ERROR: "21AF",
  APPLY_FILTER_ERROR: "22AP",
  SORT_ERROR: "23SP",
  CATEGORY_NOT_EXIST: "24NE",
  CATEGORY_CONTAINS_NOTHING: "25CN",

  /* Product */
  EXPORT_FORMAT_ERROR: "30EF",
  IMPORT_FORMAT_ERROR: "31IF",
  PRODUCTS_NOT_FOUND: "32NF",
  SPECIFICATION_INVALID: "33SI",

  /* Cart */
  GIFTCARD_INSUFFICIENT_BALANCE: "43IB",
  REWARDPOINTS_INSUFFICIENT: "44IB",
  INVALID_SHIPPING_METHOD: "45SM",
  GRAND_TOTAL_LESS_THAN_ZERO: "45LZ",
  GRAND_TOTALS_NOT_MATCH: "45NM",
  BRAINTREE_ERROR: "46BT",

  /* Data */
  DATA_RETRIVAL_ERROR: "50DR",
  ELASTIC_ERROR: "51EL",
  UNIDENTIFIED_ERROR: "52UD",
  DATA_PARSING_ERROR: "53DP",

  /* Customer */
  CUSTOMER_EMAIL_NOT_EXIST: "69NE",
  EMAIL_OR_PASSWORD_INVALID: "69IV",
  INVALID_GIFTCARD_CODE: "68GC",

  /* APP */
  MENU_NOT_EXIST: "70NE",

  /* ELASTIC */
  ELASTIC_NOT_AUTHORIZED: "80NA",
  SETTING_ERROR: "81SE",
  RETRIEVAL_ERROR: "81RE",
  UPLOAD_ERROR: "81UR",
};

export const NBCAM_GALLERY_IMAGES_THUMBNAIL = [
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/1.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/2.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/3.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/4.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/5.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/6.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/7.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/8.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/9.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/10.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/11.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/12.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/13.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/14.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/15.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/16.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/17.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/18.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/19.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/20.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/21.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/22.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/23.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/24.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/25.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/26.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/27.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/300x200/28.jpg",
];

export const NBCAM_GALLERY_IMAGES = [
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/1.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/2.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/3.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/4.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/5.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/6.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/7.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/8.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/9.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/10.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/11.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/12.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/13.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/14.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/15.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/16.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/17.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/18.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/19.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/20.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/21.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/22.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/23.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/24.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/25.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/26.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/27.jpg",
  "https://storage.googleapis.com/evesetus/all_event_photo_picks/1800x1200/28.jpg",
];

export const STOREPAGE_GALLERY_IMAGES_THUMBNAIL = [
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4465-01.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4478-01.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4495-01.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4500-01.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4522-01.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4528-01.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4533-01.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4567-01.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4601-01.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4624-01.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4645-01.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4661-01.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4665-01.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4689-01.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4702-01.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/300x200/IMG_4717-01.jpg",
];

export const STOREPAGE_GALLERY_IMAGES = [
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4465.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4478.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4495.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4500.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4522.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4528.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4533.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4567.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4601.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4624.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4645.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4661.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4665.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4689.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4702.jpg",
  "https://storage.googleapis.com/evesetus/Store%20photo/IMG_4717.jpg",
];
