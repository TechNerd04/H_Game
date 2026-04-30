const questions = {
  A: [
    { text: "What is the capital of Greece?", options: ["Athens", "Ankara", "Amman", "Algiers"], correct: 0 },
    { text: "Which fruit is commonly red or green and grows on trees?", options: ["Apricot", "Apple", "Avocado", "Almond"], correct: 1 },
    { text: "Which continent is the largest by land area?", options: ["Africa", "Asia", "Australia", "Antarctica"], correct: 1 },
    { text: "Which animal has a long trunk?", options: ["Antelope", "Elephant", "Alligator", "Ape"], correct: 1 },
    { text: "What is the first letter of the English alphabet?", options: ["A", "B", "C", "D"], correct: 0 },
    { text: "Which gas is most needed by humans for breathing?", options: ["Argon", "Oxygen", "Ammonia", "Helium"], correct: 1 }
  ],

  B: [
    { text: "What is the capital of Thailand?", options: ["Beijing", "Bangkok", "Brussels", "Bern"], correct: 1 },
    { text: "Which insect makes honey?", options: ["Butterfly", "Bee", "Beetle", "Moth"], correct: 1 },
    { text: "What color is the sky on a clear day?", options: ["Black", "Blue", "Brown", "Pink"], correct: 1 },
    { text: "Which sport uses a bat and ball?", options: ["Basketball", "Boxing", "Baseball", "Swimming"], correct: 2 },
    { text: "Which organ pumps blood through the body?", options: ["Brain", "Heart", "Bone", "Lung"], correct: 1 },
    { text: "Which country is famous for Rio de Janeiro?", options: ["Brazil", "Belgium", "Bolivia", "Bulgaria"], correct: 0 }
  ],

  C: [
    { text: "What is the capital of Egypt?", options: ["Cairo", "Canberra", "Cardiff", "Caracas"], correct: 0 },
    { text: "Which animal says meow?", options: ["Cow", "Cat", "Camel", "Crocodile"], correct: 1 },
    { text: "What is the main ingredient in cheese?", options: ["Corn", "Carrot", "Milk", "Chicken"], correct: 2 },
    { text: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Neptune"], correct: 1 },
    { text: "Which shape has no corners?", options: ["Square", "Circle", "Triangle", "Rectangle"], correct: 1 },
    { text: "What do we call frozen water?", options: ["Cloud", "Ice", "Steam", "Rain"], correct: 1 }
  ],

  D: [
    { text: "What is the capital of Bangladesh?", options: ["Doha", "Dhaka", "Dubai", "Dublin"], correct: 1 },
    { text: "Which animal is known as man's best friend?", options: ["Duck", "Deer", "Dog", "Donkey"], correct: 2 },
    { text: "How many days are in a normal year?", options: ["360", "365", "366", "300"], correct: 1 },
    { text: "Which organ helps digest food?", options: ["Ear", "Stomach", "Lung", "Eye"], correct: 1 },
    { text: "What is the opposite of night?", options: ["Dark", "Day", "Dream", "Sleep"], correct: 1 },
    { text: "Which device is used to take photos?", options: ["Camera", "Drill", "Printer", "Speaker"], correct: 0 }
  ],

  E: [
    { text: "What is the capital of the UAE?", options: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"], correct: 1 },
    { text: "Which animal is the largest land animal?", options: ["Eagle", "Elephant", "Emu", "Elk"], correct: 1 },
    { text: "What do plants need from the sun?", options: ["Electricity", "Light", "Soil", "Water"], correct: 1 },
    { text: "Which continent is Germany located in?", options: ["Europe", "Asia", "Africa", "Australia"], correct: 0 },
    { text: "What is used to erase pencil marks?", options: ["Envelope", "Eraser", "Engine", "Egg"], correct: 1 },
    { text: "Which sense uses the eyes?", options: ["Hearing", "Taste", "Sight", "Touch"], correct: 2 }
  ],

  F: [
    { text: "What is the capital of Italy?", options: ["Florence", "Rome", "Frankfurt", "Fes"], correct: 1 },
    { text: "Which animal is a bird that can fly?", options: ["Fish", "Frog", "Falcon", "Fox"], correct: 2 },
    { text: "What do we call water falling from clouds?", options: ["Fog", "Rain", "Fire", "Smoke"], correct: 1 },
    { text: "Which body part is used to walk?", options: ["Fingers", "Feet", "Face", "Forehead"], correct: 1 },
    { text: "What is the opposite of slow?", options: ["Fast", "Flat", "Full", "Far"], correct: 0 },
    { text: "Which meal is usually eaten in the morning?", options: ["Snack", "Breakfast", "Dinner", "Lunch"], correct: 1 }
  ],

  G: [
    { text: "What is the capital of Ghana?", options: ["Geneva", "Accra", "Gaborone", "Georgetown"], correct: 1 },
    { text: "Which color is made by mixing blue and yellow?", options: ["Gold", "Green", "Gray", "Black"], correct: 1 },
    { text: "Which animal can give milk to humans?", options: ["Goat", "Gorilla", "Giraffe", "Gecko"], correct: 0 },
    { text: "What is the planet we live on?", options: ["Mars", "Earth", "Jupiter", "Saturn"], correct: 1 },
    { text: "Which sport commonly has goalkeepers?", options: ["Golf", "Football", "Tennis", "Running"], correct: 1 },
    { text: "What do we wear to protect hands in cold weather?", options: ["Gloves", "Glass", "Glue", "Gold"], correct: 0 }
  ],

  H: [
    { text: "What is the capital of Vietnam?", options: ["Hanoi", "Havana", "Helsinki", "Harare"], correct: 0 },
    { text: "Which organ controls the body?", options: ["Heart", "Brain", "Hand", "Heel"], correct: 1 },
    { text: "What sweet food do bees produce?", options: ["Honey", "Ham", "Bread", "Rice"], correct: 0 },
    { text: "Which animal is known for a laughing sound?", options: ["Horse", "Hyena", "Hamster", "Hawk"], correct: 1 },
    { text: "What is the opposite of cold?", options: ["Hard", "Hot", "Heavy", "High"], correct: 1 },
    { text: "Which body part do we use to hear?", options: ["Hands", "Ears", "Hair", "Head"], correct: 1 }
  ],

  I: [
    { text: "What is the capital of India?", options: ["Islamabad", "New Delhi", "Istanbul", "Izmir"], correct: 1 },
    { text: "Which dessert is frozen and sweet?", options: ["Ice cream", "Ink", "Iron", "Iceberg"], correct: 0 },
    { text: "Which insect makes silk?", options: ["Ant", "Silkworm", "Bee", "Fly"], correct: 1 },
    { text: "What liquid is used in many pens?", options: ["Ink", "Ice", "Iron", "Oil"], correct: 0 },
    { text: "Which country has Rome as its capital?", options: ["India", "Italy", "Iran", "Iraq"], correct: 1 },
    { text: "Which element has the chemical symbol I?", options: ["Iron", "Iodine", "Indium", "Iridium"], correct: 1 }
  ],

  J: [
    { text: "What is the capital of Jordan?", options: ["Jeddah", "Amman", "Jakarta", "Juba"], correct: 1 },
    { text: "Which planet is the largest in the solar system?", options: ["Jupiter", "Mars", "Venus", "Earth"], correct: 0 },
    { text: "Which animal has a pouch and jumps?", options: ["Jaguar", "Kangaroo", "Jackal", "Jellyfish"], correct: 1 },
    { text: "What do we call a person who decides cases in court?", options: ["Judge", "Joker", "Jockey", "Journalist"], correct: 0 },
    { text: "Which country has Tokyo as its capital?", options: ["Japan", "Jordan", "Jamaica", "Jersey"], correct: 0 },
    { text: "What sweet spread is often made from fruit?", options: ["Jam", "Juice", "Milk", "Butter"], correct: 0 }
  ],

  K: [
    { text: "What is the capital of Kuwait?", options: ["Kabul", "Kuwait City", "Kingston", "Kathmandu"], correct: 1 },
    { text: "Which animal jumps and carries babies in a pouch?", options: ["Koala", "Kangaroo", "Kiwi", "Komodo Dragon"], correct: 1 },
    { text: "What is used to open a locked door?", options: ["Key", "Kite", "Knife", "Kettle"], correct: 0 },
    { text: "Which unit is used to measure temperature in science?", options: ["Kilogram", "Kelvin", "Kilometer", "Knot"], correct: 1 },
    { text: "Which bird is a symbol of New Zealand?", options: ["Kiwi", "Kingfisher", "Kestrel", "Kookaburra"], correct: 0 },
    { text: "What do we call a young cat?", options: ["Kid", "Kitten", "Kangaroo", "Koala"], correct: 1 }
  ],

  L: [
    { text: "What is the capital of Portugal?", options: ["London", "Lisbon", "Lima", "Luxor"], correct: 1 },
    { text: "Which animal is called the king of the jungle?", options: ["Lion", "Lizard", "Lemur", "Leopard"], correct: 0 },
    { text: "Which organ helps humans breathe?", options: ["Liver", "Lung", "Leg", "Lip"], correct: 1 },
    { text: "Which object gives Earth light during the day?", options: ["Lamp", "Sun", "Laser", "Candle"], correct: 1 },
    { text: "What is the opposite of heavy?", options: ["Large", "Light", "Long", "Late"], correct: 1 },
    { text: "Which language is spoken in Brazil?", options: ["Spanish", "Portuguese", "French", "Arabic"], correct: 1 }
  ],

  M: [
    { text: "What is the capital of Russia?", options: ["Madrid", "Moscow", "Manila", "Muscat"], correct: 1 },
    { text: "Which planet is closest to the Sun?", options: ["Mars", "Mercury", "Earth", "Venus"], correct: 1 },
    { text: "What do we use to see our reflection?", options: ["Mirror", "Map", "Magnet", "Marker"], correct: 0 },
    { text: "Which animal says moo?", options: ["Monkey", "Cow", "Mouse", "Mule"], correct: 1 },
    { text: "What is 5 + 5?", options: ["8", "9", "10", "11"], correct: 2 },
    { text: "Which material is attracted to magnets?", options: ["Wood", "Iron", "Plastic", "Glass"], correct: 1 }
  ],

  N: [
    { text: "What is the capital of Norway?", options: ["Nairobi", "Oslo", "Nassau", "Niamey"], correct: 1 },
    { text: "Which gas is most common in Earth's atmosphere?", options: ["Neon", "Nitrogen", "Oxygen", "Hydrogen"], correct: 1 },
    { text: "What is the opposite of yes?", options: ["No", "Now", "Near", "New"], correct: 0 },
    { text: "Which body part is used for smelling?", options: ["Neck", "Nose", "Nail", "Knee"], correct: 1 },
    { text: "What number comes after 9?", options: ["8", "10", "11", "7"], correct: 1 },
    { text: "Which direction is opposite of south?", options: ["North", "East", "West", "Down"], correct: 0 }
  ],

  O: [
    { text: "What is the capital of Oman?", options: ["Ottawa", "Oslo", "Muscat", "Oxford"], correct: 2 },
    { text: "Which gas do humans breathe in to survive?", options: ["Oxygen", "Ozone", "Osmium", "Oil"], correct: 0 },
    { text: "Which fruit is also the name of a color?", options: ["Olive", "Orange", "Onion", "Oat"], correct: 1 },
    { text: "What is the opposite of closed?", options: ["Old", "Open", "Outer", "Only"], correct: 1 },
    { text: "Which sea animal has eight arms?", options: ["Otter", "Octopus", "Owl", "Ox"], correct: 1 },
    { text: "Which body part helps us see?", options: ["Ear", "Eye", "Arm", "Leg"], correct: 1 }
  ],

  P: [
    { text: "What is the capital of France?", options: ["Paris", "Prague", "Perth", "Pisa"], correct: 0 },
    { text: "Which animal is black and white and eats bamboo?", options: ["Penguin", "Panda", "Parrot", "Panther"], correct: 1 },
    { text: "Which planet is famous for its rings?", options: ["Pluto", "Saturn", "Venus", "Mars"], correct: 1 },
    { text: "What do we use to write on paper?", options: ["Pen", "Plate", "Pillow", "Phone"], correct: 0 },
    { text: "Which food is made with dough, sauce, and cheese?", options: ["Pasta", "Pizza", "Pancake", "Pie"], correct: 1 },
    { text: "What is the opposite of future?", options: ["Past", "Place", "Point", "Power"], correct: 0 }
  ],

  Q: [
    { text: "What is the capital of Qatar?", options: ["Quito", "Doha", "Quebec", "Qom"], correct: 1 },
    { text: "Which word means a short test with questions?", options: ["Quiz", "Queue", "Quest", "Quote"], correct: 0 },
    { text: "Which bird is small and often lives on the ground?", options: ["Quail", "Eagle", "Penguin", "Ostrich"], correct: 0 },
    { text: "What symbol is used at the end of a question?", options: ["Question mark", "Comma", "Period", "Slash"], correct: 0 },
    { text: "Which animal is a small Australian marsupial?", options: ["Quokka", "Lion", "Tiger", "Bear"], correct: 0 },
    { text: "What do we call a line of people waiting?", options: ["Queue", "Quiz", "Quilt", "Quote"], correct: 0 }
  ],

  R: [
    { text: "What is the capital of Saudi Arabia?", options: ["Riyadh", "Rome", "Rabat", "Riga"], correct: 0 },
    { text: "Which color are ripe strawberries usually?", options: ["Red", "Blue", "Green", "Black"], correct: 0 },
    { text: "Which animal is known for long ears and hopping?", options: ["Rabbit", "Rhino", "Rat", "Raven"], correct: 0 },
    { text: "What do we call water falling from clouds?", options: ["Rain", "Rock", "River", "Road"], correct: 0 },
    { text: "Which organ pumps blood?", options: ["Rib", "Heart", "Retina", "Root"], correct: 1 },
    { text: "Which object is used to give light in a dark room?", options: ["Radio", "Lamp", "Rope", "Ring"], correct: 1 }
  ],

  S: [
    { text: "What is the capital of Sweden?", options: ["Seoul", "Stockholm", "Sofia", "Sydney"], correct: 1 },
    { text: "Which star gives Earth heat and light?", options: ["Sun", "Sirius", "Polaris", "Vega"], correct: 0 },
    { text: "Which animal has a hard shell?", options: ["Snake", "Turtle", "Sheep", "Shark"], correct: 1 },
    { text: "What do we use to cut paper?", options: ["Spoon", "Scissors", "Sock", "Stone"], correct: 1 },
    { text: "Which season is usually the hottest?", options: ["Spring", "Summer", "Winter", "Autumn"], correct: 1 },
    { text: "What is the opposite of small?", options: ["Short", "Big", "Soft", "Slow"], correct: 1 }
  ],

  T: [
    { text: "What is the capital of Turkey?", options: ["Tokyo", "Tehran", "Ankara", "Tunis"], correct: 2 },
    { text: "Which big cat has stripes?", options: ["Tiger", "Lion", "Leopard", "Cheetah"], correct: 0 },
    { text: "What do we use to tell time?", options: ["Table", "Clock", "Tree", "Train"], correct: 1 },
    { text: "Which drink is made from leaves and hot water?", options: ["Tea", "Milk", "Juice", "Coffee"], correct: 0 },
    { text: "What is the opposite of short?", options: ["Tiny", "Tall", "Thin", "Tired"], correct: 1 },
    { text: "Which shape has three sides?", options: ["Triangle", "Square", "Circle", "Rectangle"], correct: 0 }
  ],

  U: [
    { text: "What is the capital of Uganda?", options: ["Ulaanbaatar", "Kampala", "Ur", "Utrecht"], correct: 1 },
    { text: "Which planet is seventh from the Sun?", options: ["Uranus", "Earth", "Mars", "Venus"], correct: 0 },
    { text: "What do we use when it rains to stay dry?", options: ["Umbrella", "Uniform", "Utensil", "USB"], correct: 0 },
    { text: "What is the opposite of down?", options: ["Under", "Up", "Upper", "Undo"], correct: 1 },
    { text: "Which country has London as its capital?", options: ["United Kingdom", "Ukraine", "Uganda", "Uruguay"], correct: 0 },
    { text: "Which element has the chemical symbol U?", options: ["Uranium", "Oxygen", "Iron", "Carbon"], correct: 0 }
  ],

  V: [
    { text: "What is the capital of Austria?", options: ["Vienna", "Valletta", "Vilnius", "Victoria"], correct: 0 },
    { text: "Which planet is called Earth's sister planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 0 },
    { text: "Which fluid flows through veins?", options: ["Venom", "Blood", "Vinegar", "Vanilla"], correct: 1 },
    { text: "Which instrument is played with a bow?", options: ["Violin", "Drum", "Piano", "Trumpet"], correct: 0 },
    { text: "What do we call a person who does not eat meat?", options: ["Visitor", "Vegetarian", "Veteran", "Vendor"], correct: 1 },
    { text: "Which word means very large?", options: ["Vast", "Vague", "Valid", "Visible"], correct: 0 }
  ],

  W: [
    { text: "What is the capital of New Zealand?", options: ["Warsaw", "Wellington", "Washington D.C.", "Windhoek"], correct: 1 },
    { text: "Which liquid is essential for life?", options: ["Water", "Wax", "Oil", "Paint"], correct: 0 },
    { text: "Which animal is the largest in the world?", options: ["Wolf", "Blue Whale", "Walrus", "Wombat"], correct: 1 },
    { text: "What do we wear on the wrist to tell time?", options: ["Watch", "Wallet", "Wheel", "Window"], correct: 0 },
    { text: "Which season is usually the coldest?", options: ["Winter", "Spring", "Summer", "Autumn"], correct: 0 },
    { text: "Which direction is opposite of east?", options: ["West", "North", "South", "Up"], correct: 0 }
  ],

  X: [
    { text: "Which gas is used in some bright lamps?", options: ["Xenon", "Oxygen", "Nitrogen", "Carbon"], correct: 0 },
    { text: "Which medical imaging is used to see bones?", options: ["X-ray", "Camera", "Microscope", "Telescope"], correct: 0 },
    { text: "Which instrument has wooden bars hit with mallets?", options: ["Xylophone", "Guitar", "Violin", "Flute"], correct: 0 },
    { text: "Which letter comes after W?", options: ["X", "Y", "Z", "V"], correct: 0 },
    { text: "Which word is commonly used for a photocopy?", options: ["Xerox", "Xenon", "Xylem", "X-ray"], correct: 0 },
    { text: "Which part of a plant carries water upward?", options: ["Xylem", "Flower", "Leaf", "Seed"], correct: 0 }
  ],

  Y: [
    { text: "What is the capital of Yemen?", options: ["Sanaa", "Yangon", "Yaounde", "Yamoussoukro"], correct: 0 },
    { text: "Which part of an egg is yellow?", options: ["Yolk", "Shell", "White", "Carton"], correct: 0 },
    { text: "What color are ripe bananas usually?", options: ["Yellow", "Blue", "Red", "Purple"], correct: 0 },
    { text: "Which word means 12 months?", options: ["Year", "Yard", "Yacht", "Yield"], correct: 0 },
    { text: "What word do we say to agree?", options: ["Yes", "No", "Maybe", "Never"], correct: 0 },
    { text: "Which dairy food is often eaten with fruit?", options: ["Yogurt", "Yam", "Yeast", "Yolk"], correct: 0 }
  ],

  Z: [
    { text: "What is the capital of Croatia?", options: ["Zagreb", "Zurich", "Zanzibar", "Zambia"], correct: 0 },
    { text: "Which black and white striped animal is native to Africa?", options: ["Zebra", "Zebu", "Zorilla", "Zokor"], correct: 0 },
    { text: "Which element has the chemical symbol Zn?", options: ["Zinc", "Zirconium", "Oxygen", "Iron"], correct: 0 },
    { text: "Which place keeps animals for visitors to see?", options: ["Zoo", "Zone", "Zip", "Zero"], correct: 0 },
    { text: "What number means nothing?", options: ["Zero", "One", "Two", "Ten"], correct: 0 },
    { text: "Which fastener opens and closes clothes or bags?", options: ["Zipper", "Button", "Needle", "Thread"], correct: 0 }
  ]
};

module.exports = questions;