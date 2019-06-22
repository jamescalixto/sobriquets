// Define enums for card state.
const card_states = {
  DEFAULT: 'default',
  RED: 'red',
  BLUE: 'blue',
  BYSTANDER: 'bystander',
  ASSASSIN: 'assassin'
}

// Define default word list.
const word_list = ['AFRICA','AGENT','AIR','ALIEN','ALPS','AMAZON','AMBULANCE','AMERICA','ANGEL','ANTARCTICA','APPLE','ARM','ATLANTIS','AUSTRALIA','AZTEC','BACK','BALL','BAND','BANK','BAR','BARK','BAT','BATTERY','BEACH','BEAR','BEAT','BED','BEIJING','BELL','BELT','BERLIN','BERMUDA','BERRY','BILL','BLOCK','BOARD','BOLT','BOMB','BOND','BOOM','BOOT','BOTTLE','BOW','BOX','BRIDGE','BRUSH','BUCK','BUFFALO','BUG','BUGLE','BUTTON','CALF','CANADA','CAP','CAPITAL','CAR','CARD','CARROT','CASINO','CAST','CAT','CELL','CENTAUR','CENTER','CHAIR','CHANGE','CHARGE','CHECK','CHEST','CHICK','CHINA','CHOCOLATE','CHURCH','CIRCLE','CLIFF','CLOAK','CLUB','CODE','COLD','COMIC','COMPOUND','CONCERT','CONDUCTOR','CONTRACT','COOK','COPPER','COTTON','COURT','COVER','CRANE','CRASH','CRICKET','CROSS','CROWN','CYCLE','CZECH','DANCE','DATE','DAY','DEATH','DECK','DEGREE','DIAMOND','DICE','DINOSAUR','DISEASE','DOCTOR','DOG','DRAFT','DRAGON','DRESS','DRILL','DROP','DUCK','DWARF','EAGLE','EGYPT','EMBASSY','ENGINE','ENGLAND','EUROPE','EYE','FACE','FAIR','FALL','FAN','FENCE','FIELD','FIGHTER','FIGURE','FILE','FILM','FIRE','FISH','FLUTE','FLY','FOOT','FORCE','FOREST','FORK','FRANCE','GAME','GAS','GENIUS','GERMANY','GHOST','GIANT','GLASS','GLOVE','GOLD','GRACE','GRASS','GREECE','GREEN','GROUND','HAM','HAND','HAWK','HEAD','HEART','HELICOPTER','HIMALAYAS','HOLE','HOLLYWOOD','HONEY','HOOD','HOOK','HORN','HORSE','HORSESHOE','HOSPITAL','HOTEL','ICE','ICE CREAM','INDIA','IRON','IVORY','JACK','JAM','JET','JUPITER','KANGAROO','KETCHUP','KEY','KID','KING','KIWI','KNIFE','KNIGHT','LAB','LAP','LASER','LAWYER','LEAD','LEMON','LEPRECHAUN','LIFE','LIGHT','LIMOUSINE','LINE','LINK','LION','LITTER','LOCH NESS','LOCK','LOG','LONDON','LUCK','MAIL','MAMMOTH','MAPLE','MARBLE','MARCH','MASS','MATCH','MERCURY','MEXICO','MICROSCOPE','MILLIONAIRE','MINE','MINT','MISSILE','MODEL','MOLE','MOON','MOSCOW','MOUNT','MOUSE','MOUTH','MUG','NAIL','NEEDLE','NET','NEW YORK','NIGHT','NINJA','NOTE','NOVEL','NURSE','NUT','OCTOPUS','OIL','OLIVE','OLYMPUS','OPERA','ORANGE','ORGAN','PALM','PAN','PANTS','PAPER','PARACHUTE','PARK','PART','PASS','PASTE','PENGUIN','PHOENIX','PIANO','PIE','PILOT','PIN','PIPE','PIRATE','PISTOL','PIT','PITCH','PLANE','PLASTIC','PLATE','PLATYPUS','PLAY','PLOT','POINT','POISON','POLE','POLICE','POOL','PORT','POST','POUND','PRESS','PRINCESS','PUMPKIN','PUPIL','PYRAMID','QUEEN','RABBIT','RACKET','RAY','REVOLUTION','RING','ROBIN','ROBOT','ROCK','ROME','ROOT','ROSE','ROULETTE','ROUND','ROW','RULER','SATELLITE','SATURN','SCALE','SCHOOL','SCIENTIST','SCORPION','SCREEN','SCUBA DIVER','SEAL','SERVER','SHADOW','SHAKESPEARE','SHARK','SHIP','SHOE','SHOP','SHOT','SINK','SKYSCRAPER','SLIP','SLUG','SMUGGLER','SNOW','SNOWMAN','SOCK','SOLDIER','SOUL','SOUND','SPACE','SPELL','SPIDER','SPIKE','SPINE','SPOT','SPRING','SPY','SQUARE','STADIUM','STAFF','STAR','STATE','STICK','STOCK','STRAW','STREAM','STRIKE','STRING','SUB','SUIT','SUPERHERO','SWING','SWITCH','TABLE','TABLET','TAG','TAIL','TAP','TEACHER','TELESCOPE','TEMPLE','THEATER','THIEF','THUMB','TICK','TIE','TIME','TOKYO','TOOTH','TORCH','TOWER','TRACK','TRAIN','TRIANGLE','TRIP','TRUNK','TUBE','TURKEY','UNDERTAKER','UNICORN','VACUUM','VAN','VET','WAKE','WALL','WAR','WASHER','WASHINGTON','WATCH','WATER','WAVE','WEB','WELL','WHALE','WHIP','WIND','WITCH','WORM','YARD'];

// Given a number n, get k random numbers in the range
// [0,n) without repetition. Precondition that n >= k.
// Utilizes pseudorandom generator, with seed s.
function getRandomNumbersWithoutRepetition(s, n, k) {
  let random_numbers = [];
  let rng = new Math.seedrandom(s);
  while (random_numbers.length < k) {
    let i = Math.floor(rng() * n);
    if (random_numbers.indexOf(i) === -1) {
      random_numbers.push(i);
    }
  }
  return random_numbers;
}

// Given an array, gets n random elements without
// replacement.
function getRandomElements(n, arr) {
  let random_elements = [];
  let len = arr.length;
  let random_indices = getRandomNumbersWithoutRepetition(len, n);
  for (random_index of random_indices) {
    random_elements.push(arr[random_index]);
  }
  return random_elements;
}

// Function to test build.
function testBuild(word_list) {
  let NUM_CARDS = 25;
  let identity_array = getRandomNumbersWithoutRepetition(Math.random(), NUM_CARDS, NUM_CARDS);
  let word_array = getRandomNumbersWithoutRepetition(Math.random(), word_list.length, NUM_CARDS);
  
  let card_template = document.getElementById("card-template");
  for (let i = 0; i < NUM_CARDS; i++) {
    var clone = card_template.cloneNode(true); // Make copy.
    clone.style.display = "inline-flex"; // Make copy visible.

    // Set card state.
    if (identity_array[i] === 0) {
      clone.setAttribute("state", card_states.ASSASSIN);
    } else if (identity_array[i] < 10) {
      clone.setAttribute("state", card_states.RED);
    } else if (identity_array[i] < 18) {
      clone.setAttribute("state", card_states.BLUE);
    } else {
      clone.setAttribute("state", card_states.BYSTANDER);
    }

    // Set card format based on state.
    switch(clone.getAttribute("state")) {
      case card_states.ASSASSIN:
        clone.className += " styling-assassin";
        break;
      case card_states.RED:
        clone.className += " styling-red";
        break;        
      case card_states.BLUE:
          clone.className += " styling-blue";
          break;          
      case card_states.BYSTANDER:
          clone.className += " styling-bystander";
          break;          
      case card_states.DEFAULT:
          clone.className += " styling-default";
          break;
    }
    
    // Add word to card.
    clone.children.namedItem("card-label").textContent = word_list[word_array[i]];

    document.getElementById("board-container").appendChild(clone);
  }
}
