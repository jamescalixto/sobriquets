// Define enums for card state.
const card_states = {
  DEFAULT: "default",
  RED: "red",
  BLUE: "blue",
  BYSTANDER: "bystander",
  ASSASSIN: "assassin"
};

// Given a number n, get k random numbers in the range
// [0,n) without repetition. Precondition that n >= k.
// Utilizes pseudorandom generator, with seed s.
function getRandomNumbersWithoutRepetition(s, n, k) {
  let random_numbers = [];
  let rng = new alea(s);
  while (random_numbers.length < k) {
    let i = Math.floor(rng() * n);
    if (random_numbers.indexOf(i) === -1) {
      random_numbers.push(i);
    }
  }
  console.log(random_numbers);
  return random_numbers;
}

// Get 

// Function to test build.
function buildNewBoard(hash_name, hash_password, word_list, isSpymaster) {
  // Remove the cards that already exist.
  deleteExistingCards();

  // Default to 5x5 grid.
  const NUM_CARDS = 25;

  // Indices to words in the word list.
  let word_array = getRandomNumbersWithoutRepetition(
    hash_name,
    word_list.length,
    NUM_CARDS
  );

  // Identities of each card. Only used if isSpymaster is true.
  let identity_array = getRandomNumbersWithoutRepetition(
    hash_password,
    NUM_CARDS,
    NUM_CARDS
  );

  // Clone cards and build them.
  let card_template = document.getElementById("card-template");
  for (let i = 0; i < NUM_CARDS; i++) {
    var clone = card_template.cloneNode(true); // Make copy.
    clone.style.display = "inline-flex"; // Make copy visible.

    // Add word to card.
    clone.children.namedItem("card-label").textContent =
      word_list[word_array[i]];

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

    // If we are the spymaster: display card states and
    // set up the click callback to mark card as clicked.
    // Otherwise, set up the click callback to toggle card
    // state.
    if (isSpymaster) {
      addCardStyle(clone);
    } else {

    }

    document.getElementById("board-container").appendChild(clone);
  }
}

// Add card style based on state attribute.
function addCardStyle(clone) {
  // Set card format based on state.
  switch (clone.getAttribute("state")) {
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
}

// Delete existing cards.
function deleteExistingCards() {
  let board_container = document.getElementById("board-container");
  while (board_container.firstChild) {
    board_container.removeChild(board_container.firstChild);
  }
}
