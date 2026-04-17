const questions = {
  A: [
    { text: "What fruit keeps the doctor away?", options: ["Banana", "Orange", "Apple", "Mango"], correct: 2 },
    { text: "What continent contains the Sahara Desert?", options: ["Asia", "Africa", "South America", "Europe"], correct: 1 },
    { text: "Which chemical element has the symbol 'Ar'?", options: ["Arsenic", "Argon", "Actinium", "Americium"], correct: 1 }
  ],
  B: [
    { text: "What is the capital of Germany?", options: ["Brussels", "Berlin", "Budapest", "Bern"], correct: 1 },
    { text: "Which large mammal is known for eating bamboo?", options: ["Bear", "Baboon", "Bison", "Bamboo Lemur"], correct: 0 },
    { text: "What is the largest organ in the human body?", options: ["Brain", "Blood", "Bones", "Body Skin"], correct: 3 }
  ],
  C: [
    { text: "What is the largest country in North America by land area?", options: ["Cuba", "Canada", "Costa Rica", "Colombia"], correct: 1 },
    { text: "Which element is diamond made of?", options: ["Calcium", "Chlorine", "Carbon", "Copper"], correct: 2 },
    { text: "What animal is known as the 'ship of the desert'?", options: ["Cheetah", "Crocodile", "Camel", "Chimpanzee"], correct: 2 }
  ],
  D: [
    { text: "What is the capital of Ireland?", options: ["Dakar", "Dublin", "Denver", "Delhi"], correct: 1 },
    { text: "What is the main currency used in the US?", options: ["Dirham", "Dinar", "Dollar", "Dong"], correct: 2 },
    { text: "Which dog breed is known for having spots?", options: ["Dachshund", "Doberman", "Dalmatian", "Dingo"], correct: 2 }
  ],
  E: [
    { text: "Which continent is France located in?", options: ["Europe", "Earth", "Eurasia", "Equator"], correct: 0 },
    { text: "What is the tallest animal in the world?", options: ["Eagle", "Elephant", "Emu", "Elk"], correct: 1 },
    { text: "What natural phenomenon is measured by the Richter scale?", options: ["Eclipse", "Erosion", "Earthquake", "Eruption"], correct: 2 }
  ],
  F: [
    { text: "Which country is famous for the Eiffel Tower?", options: ["Finland", "Fiji", "France", "Faroe Islands"], correct: 2 },
    { text: "What is the chemical symbol for Iron?", options: ["Fe", "Fr", "Fl", "Fm"], correct: 0 },
    { text: "What is the fastest land animal?", options: ["Fox", "Falcon", "Ferrets", "Fast Cheetah"], correct: 3 }
  ],
  G: [
    { text: "Which European country has Berlin as its capital?", options: ["Greece", "Germany", "Georgia", "Greenland"], correct: 1 },
    { text: "What is the largest planet in our solar system?", options: ["Gas Giant", "Giant Mars", "Globe", "Giant Jupiter"], correct: 3 },
    { text: "What metal is symbol 'Au' on the periodic table?", options: ["Gallium", "Gold", "Germanium", "Gadolinium"], correct: 1 }
  ],
  H: [
    { text: "What is the most abundant element in the universe?", options: ["Helium", "Hafnium", "Hydrogen", "Holmium"], correct: 2 },
    { text: "Which instrument is typically played by blowing into it and uses a slider?", options: ["Horn", "Harp", "Harmonica", "Harpsichord"], correct: 2 },
    { text: "What is the capital of Cuba?", options: ["Hanoi", "Harare", "Havana", "Helsinki"], correct: 2 }
  ],
  I: [
    { text: "What country is shaped like a boot?", options: ["Iran", "Ireland", "Italy", "Iceland"], correct: 2 },
    { text: "Which chemical element has the symbol 'I'?", options: ["Iridium", "Indium", "Iron", "Iodine"], correct: 3 },
    { text: "What is the freezing point of water called?", options: ["Ice", "Igloo", "Icicle", "Iceberg"], correct: 0 }
  ],
  J: [
    { text: "Which country's capital is Tokyo?", options: ["Jordan", "Jamaica", "Japan", "Jersey"], correct: 2 },
    { text: "What is the largest planet in our solar system?", options: ["Jupiter", "Juno", "Jovian", "Janus"], correct: 0 },
    { text: "Which animal is a large, spotted wild cat found in the Americas?", options: ["Jackal", "Jaguar", "Jackrabbit", "Jellyfish"], correct: 1 }
  ],
  K: [
    { text: "What is the capital of Afghanistan?", options: ["Kampala", "Kuwait City", "Kabul", "Kiev"], correct: 2 },
    { text: "Which animal is known for carrying its young in a pouch and hopping?", options: ["Koala", "Kangaroo", "Kiwi", "Komodo Dragon"], correct: 1 },
    { text: "What is the SI base unit of temperature?", options: ["Knot", "Kilo", "Kilogram", "Kelvin"], correct: 3 }
  ],
  L: [
    { text: "What is the capital of the United Kingdom?", options: ["Lima", "Lisbon", "London", "Luxembourg"], correct: 2 },
    { text: "What is the king of the jungle?", options: ["Leopard", "Lion", "Lemur", "Llama"], correct: 1 },
    { text: "Which metal is liquid at room temperature?", options: ["Lead", "Lithium", "Lutetium", "Liquid Mercury"], correct: 3 }
  ],
  M: [
    { text: "What is the capital of Spain?", options: ["Manila", "Monaco", "Madrid", "Moscow"], correct: 2 },
    { text: "What is the closest planet to the sun?", options: ["Mars", "Mercury", "Moon", "Meteor"], correct: 1 },
    { text: "Which mathematical operation is represented by the 'x' symbol?", options: ["Minus", "Modulo", "Multiplication", "Mean"], correct: 2 }
  ],
  N: [
    { text: "What is the capital of Kenya?", options: ["Nassau", "Niamey", "Nairobi", "New Delhi"], correct: 2 },
    { text: "Which element makes up about 78% of the Earth's atmosphere?", options: ["Neon", "Nickel", "Nitrogen", "Nobelium"], correct: 2 },
    { text: "What is the longest river in the world?", options: ["Niger", "Nile", "Neva", "Nelson"], correct: 1 }
  ],
  O: [
    { text: "What is the capital of Canada?", options: ["Oslo", "Ottawa", "Ouagadougou", "Oman"], correct: 1 },
    { text: "Which chemical element is essential for human respiration?", options: ["Osmium", "Ozone", "Oxygen", "Oganesson"], correct: 2 },
    { text: "What is the largest ocean on Earth?", options: ["Oceania", "Okhotsk", "Oasis", "Ocean Pacific"], correct: 3 }
  ],
  P: [
    { text: "What is the capital of France?", options: ["Prague", "Pretoria", "Paris", "Pyongyang"], correct: 2 },
    { text: "Which planet was reclassified as a dwarf planet in 2006?", options: ["Pluto", "Phobos", "Pallas", "Planet X"], correct: 0 },
    { text: "What is the most populous country in the world?", options: ["Pakistan", "Philippines", "Peru", "Population China"], correct: 3 }
  ],
  Q: [
    { text: "What is the capital of Ecuador?", options: ["Qingdao", "Quebec", "Quito", "Qazvin"], correct: 2 },
    { text: "What bird is known for its distinctive call that sounds like its name?", options: ["Quail", "Quetzal", "Quaker Parrot", "Quill"], correct: 0 },
    { text: "Which physical quantity is measured in Coulombs?", options: ["Quantum", "Quark", "Quantity", "Q (Charge)"], correct: 3 }
  ],
  R: [
    { text: "What is the capital of Italy?", options: ["Riga", "Rome", "Riyadh", "Reykjavik"], correct: 1 },
    { text: "What is the chemical symbol for the radioactive element discovered by Marie Curie?", options: ["Radon", "Radium", "Rhenium", "Rubidium"], correct: 1 },
    { text: "What is the color of rubies?", options: ["Red", "Rose", "Rust", "Ruby"], correct: 0 }
  ],
  S: [
    { text: "What is the capital of South Korea?", options: ["Sofia", "Stockholm", "Seoul", "Santiago"], correct: 2 },
    { text: "What is the largest planet in our solar system?", options: ["Saturn", "Sun", "Sirius", "Solar"], correct: 0 },
    { text: "Which country is home to the Kangaroo?", options: ["Scotland", "Sweden", "Switzerland", "Sydney"], correct: 3 }
  ],
  T: [
    { text: "What is the capital of Japan?", options: ["Tehran", "Taipei", "Tokyo", "Tunis"], correct: 2 },
    { text: "What is the hardest natural substance on Earth?", options: ["Topaz", "Titanium", "Tungsten", "Tough Diamond"], correct: 3 },
    { text: "Which large feline is known for its stripes?", options: ["Tiger", "Tabby", "Tarsier", "Tasmanian Devil"], correct: 0 }
  ],
  U: [
    { text: "Which country is located north of Mexico?", options: ["Uganda", "Ukraine", "Uruguay", "United States"], correct: 3 },
    { text: "Which planet is seventh from the Sun?", options: ["Uranus", "Universe", "Umbra", "Ursa Major"], correct: 0 },
    { text: "What is the chemical symbol for the element used as nuclear fuel?", options: ["U", "Un", "Ur", "Us"], correct: 0 }
  ],
  V: [
    { text: "What is the capital of Austria?", options: ["Vilnius", "Victoria", "Vienna", "Valletta"], correct: 2 },
    { text: "Which planet is known as the Earth's 'sister planet'?", options: ["Venus", "Vega", "Vesta", "Voyager"], correct: 0 },
    { text: "What is the name of the fluid that flows in our veins?", options: ["Venom", "Vinegar", "Vaccine", "Vascular Blood"], correct: 3 }
  ],
  W: [
    { text: "What is the capital of the United States?", options: ["Warsaw", "Wellington", "Washington D.C.", "Windhoek"], correct: 2 },
    { text: "What is the heaviest animal in the world?", options: ["Walrus", "Whale", "Wombat", "Wolf"], correct: 1 },
    { text: "What liquid is essential for all known forms of life?", options: ["Water", "Wine", "Whiskey", "Whey"], correct: 0 }
  ],
  X: [
    { text: "Which noble gas is used in high-intensity lamps and flashes?", options: ["Xylene", "Xenon", "Xanthine", "Xylose"], correct: 1 },
    { text: "What type of electromagnetic radiation is used for medical imaging of bones?", options: ["X-Rays", "X-Band", "X-Waves", "X-Beams"], correct: 0 },
    { text: "What is a common instrument with wooden bars struck by mallets?", options: ["Xylophone", "Xalam", "Xiao", "Xerox"], correct: 0 }
  ],
  Y: [
    { text: "What is the capital of Yemen?", options: ["Yangon", "Yaounde", "Yamoussoukro", "Yemen City (Sanaa)"], correct: 3 },
    { text: "What yellow part of an egg is rich in nutrients?", options: ["Yeast", "Yogurt", "Yolk", "Yam"], correct: 2 },
    { text: "Which chemical element has the symbol 'Y'?", options: ["Yttrium", "Ytterbium", "Yellowstone", "Yttria"], correct: 0 }
  ],
  Z: [
    { text: "What is the capital of Croatia?", options: ["Zambia", "Zagreb", "Zurich", "Zaragoza"], correct: 1 },
    { text: "Which element has the symbol 'Zn'?", options: ["Zirconium", "Zeolites", "Zinc", "Zymase"], correct: 2 },
    { text: "What black and white striped animal is native to Africa?", options: ["Zebra", "Zebu", "Zorilla", "Zokor"], correct: 0 }
  ]
};

module.exports = questions;
