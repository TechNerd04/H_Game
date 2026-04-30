const questions = {
  A: [
    { text: "What is the capital of Greece?", options: ["Athens", "Ankara", "Amman", "Algiers"], correct: 0 },
    { text: "Which fruit is commonly red or green and grows on trees?", options: ["Apple", "Apricot", "Avocado", "Atemoya"], correct: 0 },
    { text: "Which continent is the largest by land area?", options: ["Asia", "Africa", "Australia", "Antarctica"], correct: 0 },
    { text: "Which animal has a long trunk?", options: ["African elephant", "Antelope", "Ape", "Aardvark"], correct: 0 },
    { text: "What is the first letter of the English alphabet?", options: ["A", "Alpha", "Aleph", "Aye"], correct: 0 },
    { text: "Which nut is commonly eaten as a snack?", options: ["Almond", "Acorn", "Areca", "Araucaria"], correct: 0 }
  ],

  B: [
    { text: "What is the capital of Thailand?", options: ["Bangkok", "Beijing", "Brussels", "Bern"], correct: 0 },
    { text: "Which insect makes honey?", options: ["Bee", "Beetle", "Butterfly", "Bug"], correct: 0 },
    { text: "What color is the sky on a clear day?", options: ["Blue", "Black", "Brown", "Beige"], correct: 0 },
    { text: "Which sport uses a bat and ball?", options: ["Baseball", "Basketball", "Boxing", "Bowling"], correct: 0 },
    { text: "Which organ helps you think?", options: ["Brain", "Bone", "Belly", "Bladder"], correct: 0 },
    { text: "Which country is famous for Rio de Janeiro?", options: ["Brazil", "Bolivia", "Belgium", "Bulgaria"], correct: 0 }
  ],

  C: [
    { text: "What is the capital of Egypt?", options: ["Cairo", "Canberra", "Cardiff", "Caracas"], correct: 0 },
    { text: "Which animal says meow?", options: ["Cat", "Cow", "Camel", "Crocodile"], correct: 0 },
    { text: "What food is made from milk and often put on pizza?", options: ["Cheese", "Cream", "Curd", "Casein"], correct: 0 },
    { text: "Which shape has no corners?", options: ["Circle", "Curve", "Cone", "Cylinder"], correct: 0 },
    { text: "Which device is used to take photos?", options: ["Camera", "Compass", "Calculator", "Clock"], correct: 0 },
    { text: "Which grain is yellow and grows on a cob?", options: ["Corn", "Couscous", "Chia", "Cereal"], correct: 0 }
  ],

  D: [
    { text: "What is the capital of Bangladesh?", options: ["Dhaka", "Doha", "Dubai", "Dublin"], correct: 0 },
    { text: "Which animal is known as man's best friend?", options: ["Dog", "Duck", "Deer", "Donkey"], correct: 0 },
    { text: "What is the opposite of night?", options: ["Day", "Dark", "Dawn", "Dusk"], correct: 0 },
    { text: "Which bird quacks?", options: ["Duck", "Dove", "Drake", "Dunlin"], correct: 0 },
    { text: "Which doctor treats teeth?", options: ["Dentist", "Doctor", "Dermatologist", "Dietitian"], correct: 0 },
    { text: "Which sweet fruit grows on palm trees?", options: ["Date", "Damson", "Dragonfruit", "Durian"], correct: 0 }
  ],

  E: [
    { text: "What is the capital of Scotland?", options: ["Edinburgh", "Exeter", "Edmonton", "Esfahan"], correct: 0 },
    { text: "Which animal is the largest land animal?", options: ["Elephant", "Elk", "Emu", "Eagle"], correct: 0 },
    { text: "Which continent is Germany located in?", options: ["Europe", "Eurasia", "East Asia", "Earth"], correct: 0 },
    { text: "What is used to erase pencil marks?", options: ["Eraser", "Envelope", "Engine", "Easel"], correct: 0 },
    { text: "Which direction is opposite of west?", options: ["East", "Edgeward", "Equatorward", "Elsewhere"], correct: 0 },
    { text: "What powers many lights and machines?", options: ["Electricity", "Energy", "Ether", "Emission"], correct: 0 }
  ],

  F: [
    { text: "Which Italian city is famous for Renaissance art?", options: ["Florence", "Frankfurt", "Fes", "Fukuoka"], correct: 0 },
    { text: "Which bird is known for flying high and hunting prey?", options: ["Falcon", "Finch", "Flamingo", "Fowl"], correct: 0 },
    { text: "What is the opposite of slow?", options: ["Fast", "Far", "Flat", "Full"], correct: 0 },
    { text: "Which body parts help you walk?", options: ["Feet", "Fingers", "Forearms", "Face"], correct: 0 },
    { text: "Which tool with prongs is used for eating?", options: ["Fork", "Flask", "Fan", "Frame"], correct: 0 },
    { text: "Which small animal jumps and lives near ponds?", options: ["Frog", "Fox", "Fly", "Finch"], correct: 0 }
  ],

  G: [
    { text: "What is the capital of Guyana?", options: ["Georgetown", "Geneva", "Gaborone", "Guatemala City"], correct: 0 },
    { text: "Which color is made by mixing blue and yellow?", options: ["Green", "Gold", "Gray", "Garnet"], correct: 0 },
    { text: "Which farm animal can give milk?", options: ["Goat", "Goose", "Giraffe", "Gecko"], correct: 0 },
    { text: "What do we wear on our hands in cold weather?", options: ["Gloves", "Glasses", "Greaves", "Gaiters"], correct: 0 },
    { text: "Which valuable yellow metal is used in jewelry?", options: ["Gold", "Glass", "Granite", "Glue"], correct: 0 },
    { text: "What green plant covers many lawns and fields?", options: ["Grass", "Gravel", "Gum", "Glitter"], correct: 0 }
  ],

  H: [
    { text: "What is the capital of Cuba?", options: ["Havana", "Hanoi", "Harare", "Helsinki"], correct: 0 },
    { text: "Which organ pumps blood through the body?", options: ["Heart", "Hip", "Heel", "Hair"], correct: 0 },
    { text: "What sweet food do bees produce?", options: ["Honey", "Ham", "Hazelnut", "Hummus"], correct: 0 },
    { text: "What is the opposite of cold?", options: ["Hot", "Hard", "Heavy", "High"], correct: 0 },
    { text: "Which body part is on top of the neck?", options: ["Head", "Hand", "Heel", "Hip"], correct: 0 },
    { text: "Which tool is used to hit nails into wood?", options: ["Hammer", "Hook", "Harp", "Horn"], correct: 0 }
  ],

  I: [
    { text: "What is the capital of Pakistan?", options: ["Islamabad", "Istanbul", "Izmir", "Incheon"], correct: 0 },
    { text: "Which dessert is frozen and sweet?", options: ["Ice cream", "Icing", "Idli", "Infusion"], correct: 0 },
    { text: "What liquid is used in many pens?", options: ["Ink", "Indigo", "Iodine", "Icewater"], correct: 0 },
    { text: "Which country has Rome as its capital?", options: ["Italy", "India", "Iran", "Iraq"], correct: 0 },
    { text: "What do we call land surrounded by water?", options: ["Island", "Isthmus", "Inlet", "Iceberg"], correct: 0 },
    { text: "Which metal is attracted to magnets and can rust?", options: ["Iron", "Iridium", "Indium", "Iodine"], correct: 0 }
  ],

  J: [
    { text: "What is the capital of Indonesia?", options: ["Jakarta", "Jerusalem", "Juba", "Johannesburg"], correct: 0 },
    { text: "Which planet is the largest in the solar system?", options: ["Jupiter", "Juno", "Janus", "Jovia"], correct: 0 },
    { text: "What do we call a person who decides cases in court?", options: ["Judge", "Janitor", "Joker", "Jockey"], correct: 0 },
    { text: "Which clothing is worn in cool weather over a shirt?", options: ["Jacket", "Jersey", "Jeans", "Jumper"], correct: 0 },
    { text: "What action means pushing off the ground with your feet?", options: ["Jump", "Jog", "Jolt", "Jive"], correct: 0 },
    { text: "Which sweet fruit spread is often put on bread?", options: ["Jam", "Juice", "Jelly", "Julep"], correct: 0 }
  ],

  K: [
    { text: "What is the capital of Nepal?", options: ["Kathmandu", "Kabul", "Kigali", "Kingston"], correct: 0 },
    { text: "Which animal carries its baby in a pouch and jumps?", options: ["Kangaroo", "Koala", "Kiwi", "Komodo dragon"], correct: 0 },
    { text: "What is used to open a locked door?", options: ["Key", "Knife", "Kettle", "Kite"], correct: 0 },
    { text: "Which bird is a symbol of New Zealand?", options: ["Kiwi", "Kingfisher", "Kestrel", "Kookaburra"], correct: 0 },
    { text: "What do we call a young cat?", options: ["Kitten", "Kid", "Kit", "Koala"], correct: 0 },
    { text: "Which room in a house is mainly used for cooking?", options: ["Kitchen", "Kennel", "Keep", "Kingdom"], correct: 0 }
  ],

  L: [
    { text: "What is the capital of Portugal?", options: ["Lisbon", "London", "Lima", "Luxor"], correct: 0 },
    { text: "Which animal is called the king of the jungle?", options: ["Lion", "Lizard", "Lemur", "Leopard"], correct: 0 },
    { text: "Which organ helps humans breathe?", options: ["Lungs", "Liver", "Legs", "Lips"], correct: 0 },
    { text: "What is the opposite of heavy?", options: ["Light", "Large", "Long", "Late"], correct: 0 },
    { text: "Which object gives light in a room?", options: ["Lamp", "Ladder", "Latch", "Leaf"], correct: 0 },
    { text: "Which sour yellow citrus fruit is common in drinks?", options: ["Lemon", "Lime", "Lychee", "Loquat"], correct: 0 }
  ],

  M: [
    { text: "What is the capital of Russia?", options: ["Moscow", "Madrid", "Manila", "Muscat"], correct: 0 },
    { text: "Which planet is closest to the Sun?", options: ["Mercury", "Mars", "Moon", "Makemake"], correct: 0 },
    { text: "What do we use to see our reflection?", options: ["Mirror", "Map", "Magnet", "Marker"], correct: 0 },
    { text: "Which sound does a cow make?", options: ["Moo", "Meow", "Murmur", "Music"], correct: 0 },
    { text: "Which white drink comes from cows?", options: ["Milk", "Molasses", "Malt", "Mustard"], correct: 0 },
    { text: "What bright object do we often see in the sky at night?", options: ["Moon", "Meteor", "Mars", "Mist"], correct: 0 }
  ],

  N: [
    { text: "What is the capital of Cyprus?", options: ["Nicosia", "Nairobi", "Naples", "Nassau"], correct: 0 },
    { text: "Which gas is most common in Earth's atmosphere?", options: ["Nitrogen", "Neon", "Nitrous oxide", "Nectar"], correct: 0 },
    { text: "Which direction is opposite of south?", options: ["North", "Near", "Next", "Northeast"], correct: 0 },
    { text: "Which body part is used for smelling?", options: ["Nose", "Neck", "Nail", "Nerve"], correct: 0 },
    { text: "What number comes after 8?", options: ["Nine", "Nineteen", "Ninety", "Nil"], correct: 0 },
    { text: "What is the opposite of yes?", options: ["No", "Now", "Next", "New"], correct: 0 }
  ],

  O: [
    { text: "What is the capital of Canada?", options: ["Ottawa", "Oslo", "Oxford", "Odessa"], correct: 0 },
    { text: "Which gas do humans breathe in to survive?", options: ["Oxygen", "Ozone", "Oil", "Osmium"], correct: 0 },
    { text: "Which fruit is also the name of a color?", options: ["Orange", "Olive", "Onion", "Oat"], correct: 0 },
    { text: "What is the opposite of closed?", options: ["Open", "Old", "Outer", "Only"], correct: 0 },
    { text: "Which sea animal has eight arms?", options: ["Octopus", "Otter", "Oyster", "Orca"], correct: 0 },
    { text: "Which musical instrument has keys and is found in many churches?", options: ["Organ", "Oboe", "Oud", "Ocarina"], correct: 0 }
  ],

  P: [
    { text: "What is the capital of France?", options: ["Paris", "Prague", "Perth", "Pisa"], correct: 0 },
    { text: "Which animal is black and white and eats bamboo?", options: ["Panda", "Penguin", "Parrot", "Panther"], correct: 0 },
    { text: "What do we use to write on paper?", options: ["Pen", "Pencil", "Paintbrush", "Pointer"], correct: 0 },
    { text: "Which food is made with dough, sauce, and cheese?", options: ["Pizza", "Pasta", "Pie", "Pudding"], correct: 0 },
    { text: "What is the opposite of future?", options: ["Past", "Place", "Point", "Power"], correct: 0 },
    { text: "Which small green vegetable is round and often sweet?", options: ["Pea", "Pepper", "Potato", "Pumpkin"], correct: 0 }
  ],

  Q: [
    { text: "What is the capital of Ecuador?", options: ["Quito", "Qom", "Quezon City", "Quetta"], correct: 0 },
    { text: "Which word means a short test with questions?", options: ["Quiz", "Queue", "Quest", "Quote"], correct: 0 },
    { text: "Which bird is small and often lives on the ground?", options: ["Quail", "Quelea", "Quetzal", "Quaker parrot"], correct: 0 },
    { text: "What do we call a line of people waiting?", options: ["Queue", "Quest", "Quiver", "Quadrant"], correct: 0 },
    { text: "Which animal is a small Australian marsupial?", options: ["Quokka", "Quoll", "Quail", "Quelea"], correct: 0 },
    { text: "What do we call a warm cover made from stitched cloth?", options: ["Quilt", "Quarter", "Quartz", "Quince"], correct: 0 }
  ],

  R: [
    { text: "What is the capital of Latvia?", options: ["Riga", "Rome", "Rabat", "Riyadh"], correct: 0 },
    { text: "Which color are ripe strawberries usually?", options: ["Red", "Rose", "Ruby", "Rust"], correct: 0 },
    { text: "Which animal is known for long ears and hopping?", options: ["Rabbit", "Rhino", "Rat", "Raven"], correct: 0 },
    { text: "What do we call water falling from clouds?", options: ["Rain", "River", "Road", "Rock"], correct: 0 },
    { text: "Which object is a metal bar that trains run on?", options: ["Rail", "Road", "Ramp", "Roof"], correct: 0 },
    { text: "Which flower is known for fragrance and thorns?", options: ["Rose", "Reed", "Root", "Rice"], correct: 0 }
  ],

  S: [
    { text: "What is the capital of Sweden?", options: ["Stockholm", "Seoul", "Sofia", "Sydney"], correct: 0 },
    { text: "Which star gives Earth heat and light?", options: ["Sun", "Sirius", "Saturn", "Spark"], correct: 0 },
    { text: "Which animal has a hard shell and moves slowly?", options: ["Snail", "Snake", "Sheep", "Shark"], correct: 0 },
    { text: "What do we use to cut paper?", options: ["Scissors", "Spoon", "Sock", "Stone"], correct: 0 },
    { text: "Which season is usually the hottest?", options: ["Summer", "Spring", "Snowfall", "Stormtime"], correct: 0 },
    { text: "What is used to wash hands?", options: ["Soap", "Salt", "Sand", "Smoke"], correct: 0 }
  ],

  T: [
    { text: "What is the capital of Estonia?", options: ["Tallinn", "Tokyo", "Tunis", "Tbilisi"], correct: 0 },
    { text: "Which big cat has stripes?", options: ["Tiger", "Turtle", "Tapir", "Toad"], correct: 0 },
    { text: "What do we use to tell time?", options: ["Timer", "Tablet", "Tray", "Ticket"], correct: 0 },
    { text: "Which drink is made from leaves and hot water?", options: ["Tea", "Tonic", "Tar", "Tamarind juice"], correct: 0 },
    { text: "What is the opposite of short?", options: ["Tall", "Tiny", "Thin", "Tired"], correct: 0 },
    { text: "Which shape has three sides?", options: ["Triangle", "Trapezoid", "Tube", "Tile"], correct: 0 }
  ],

  U: [
    { text: "What is the capital of Mongolia?", options: ["Ulaanbaatar", "Utrecht", "Uppsala", "Urumqi"], correct: 0 },
    { text: "Which planet is seventh from the Sun?", options: ["Uranus", "Umbriel", "Utopia", "Ultima"], correct: 0 },
    { text: "What do we use when it rains to stay dry?", options: ["Umbrella", "Uniform", "Utensil", "USB"], correct: 0 },
    { text: "What is the opposite of down?", options: ["Up", "Under", "Upper", "Undo"], correct: 0 },
    { text: "Which country has London as its capital?", options: ["United Kingdom", "Ukraine", "Uganda", "Uruguay"], correct: 0 },
    { text: "Which element has the chemical symbol U?", options: ["Uranium", "Unnilhexium", "Ulexite", "Umbrium"], correct: 0 }
  ],

  V: [
    { text: "What is the capital of Austria?", options: ["Vienna", "Valletta", "Vilnius", "Victoria"], correct: 0 },
    { text: "Which planet is called Earth's sister planet?", options: ["Venus", "Vesta", "Vulcan", "Veridian"], correct: 0 },
    { text: "Which fluid flows through veins?", options: ["Venous blood", "Vinegar", "Vanilla", "Vapor"], correct: 0 },
    { text: "Which instrument is played with a bow?", options: ["Violin", "Vibraphone", "Veena", "Vuvuzela"], correct: 0 },
    { text: "What do we call a person who does not eat meat?", options: ["Vegetarian", "Visitor", "Vendor", "Veteran"], correct: 0 },
    { text: "Which word means very large?", options: ["Vast", "Vague", "Valid", "Visible"], correct: 0 }
  ],

  W: [
    { text: "What is the capital of New Zealand?", options: ["Wellington", "Warsaw", "Washington", "Windhoek"], correct: 0 },
    { text: "Which liquid is essential for life?", options: ["Water", "Wax", "Wine", "Whey"], correct: 0 },
    { text: "Which animal is the largest in the world?", options: ["Whale", "Wolf", "Walrus", "Wombat"], correct: 0 },
    { text: "What do we wear on the wrist to tell time?", options: ["Watch", "Wallet", "Wheel", "Window"], correct: 0 },
    { text: "Which season is usually the coldest?", options: ["Winter", "Wet season", "Windy season", "Warm season"], correct: 0 },
    { text: "Which direction is opposite of east?", options: ["West", "Wide", "Windward", "Wrong"], correct: 0 }
  ],

  X: [
    { text: "Which gas is used in some bright lamps?", options: ["Xenon", "Xylene", "Xylitol", "Xerogel"], correct: 0 },
    { text: "Which medical imaging is used to see bones?", options: ["X-ray", "Xerography", "Xyloscopy", "Xenography"], correct: 0 },
    { text: "Which instrument has wooden bars hit with mallets?", options: ["Xylophone", "Xyloharp", "Xylodrum", "Xylozither"], correct: 0 },
    { text: "Which letter comes after W?", options: ["X", "Xi", "Xen", "Ex"], correct: 0 },
    { text: "Which word is commonly used for a photocopy brand?", options: ["Xerox", "Xylan", "Xylose", "Xenolith"], correct: 0 },
    { text: "Which plant tissue carries water upward?", options: ["Xylem", "Xylose", "Xylan", "Xenium"], correct: 0 }
  ],

  Y: [
    { text: "What is the capital of Armenia?", options: ["Yerevan", "Yangon", "Yaounde", "Yamoussoukro"], correct: 0 },
    { text: "Which part of an egg is yellow?", options: ["Yolk", "Yeast", "Yam", "Yarn"], correct: 0 },
    { text: "What color are ripe bananas usually?", options: ["Yellow", "Young-green", "Yam-colored", "Yarrow"], correct: 0 },
    { text: "Which word means 12 months?", options: ["Year", "Yard", "Yawn", "Yield"], correct: 0 },
    { text: "What word do we say to agree?", options: ["Yes", "Yo", "Yup", "Yea"], correct: 0 },
    { text: "Which dairy food is often eaten with fruit?", options: ["Yogurt", "Yakult", "Yolk cream", "Yeast curd"], correct: 0 }
  ],

  Z: [
    { text: "What is the capital of Croatia?", options: ["Zagreb", "Zurich", "Zanzibar", "Zamboanga"], correct: 0 },
    { text: "Which black and white striped animal is native to Africa?", options: ["Zebra", "Zebu", "Zorilla", "Zokor"], correct: 0 },
    { text: "Which element has the chemical symbol Zn?", options: ["Zinc", "Zirconium", "Zeolite", "Zoisite"], correct: 0 },
    { text: "Which place keeps animals for visitors to see?", options: ["Zoo", "Zone", "Zip", "Zero"], correct: 0 },
    { text: "What number means nothing?", options: ["Zero", "Zillion", "Zenith", "Zed"], correct: 0 },
    { text: "Which fastener opens and closes clothes or bags?", options: ["Zipper", "Zip tie", "Zigzag clasp", "Zonal clip"], correct: 0 }
  ]
};

module.exports = questions;