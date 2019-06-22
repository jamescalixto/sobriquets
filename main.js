// Define enums for card state.
const card_states = {
  DEFAULT: "default",
  RED: "red",
  BLUE: "blue",
  BYSTANDER: "bystander",
  ASSASSIN: "assassin"
};

// Define default number of cards.
const NUM_CARDS = 25;
const NUM_ASSASSIN_CARDS = 1;
const NUM_REGULAR_CARDS = 8; // First player gets 1 extra.


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
  return random_numbers;
}


// Check who goes first, based on the hash password.
// Guaranteed to sync given the same hash password.
function doesRedGoFirst(hash_password) {
  let rng = new alea(hash_password + hash_password);
  return rng() < 0.5;
}


// Delete existing cards.
function deleteExistingCards() {
  let board_container = document.getElementById("board-container");
  while (board_container.firstChild) {
    board_container.removeChild(board_container.firstChild);
  }
}

// Get number of red or blue cards.
function getNumRedCards(hash_password) {
  const redGoesFirst = doesRedGoFirst(hash_password);
  return NUM_REGULAR_CARDS + (redGoesFirst ? 1 : 0);
}
function getNumBlueCards(hash_password) {
  const redGoesFirst = doesRedGoFirst(hash_password);
  return NUM_REGULAR_CARDS + (redGoesFirst ? 0 : 1);
}


// Function to test build.
function buildNewBoard(hash_name, hash_password, word_list, isSpymaster) {
  // Remove the cards that already exist.
  deleteExistingCards();

  // Does red go first? Controls red (or blue) getting an
  // extra card. Define the extra card.
  const NUM_RED_CARDS = getNumRedCards(hash_password);
  const NUM_BLUE_CARDS = getNumBlueCards(hash_password);

  // Indices to words in the word list.
  const word_array = getRandomNumbersWithoutRepetition(
    hash_name,
    word_list.length,
    NUM_CARDS
  );

  // Identities of each card. Only used if isSpymaster is true.
  const identity_array = getRandomNumbersWithoutRepetition(
    hash_password,
    NUM_CARDS,
    NUM_CARDS
  );

  // Clone cards and build them.
  const card_template = document.getElementById("card-template");
  for (let i = 0; i < NUM_CARDS; i++) {
    const clone = card_template.cloneNode(true); // Make copy.
    clone.id = "card-" + i;
    clone.style.display = "inline-flex"; // Make copy visible.

    // Add word to card.
    clone.children.namedItem("card-label").textContent =
      word_list[word_array[i]];

    // Set card identity. Only called if the player is the spymaster.
    function setCardIdentity() {
      if (identity_array[i] < NUM_ASSASSIN_CARDS) {
        clone.setAttribute("state", card_states.ASSASSIN);
      } else if (identity_array[i] < NUM_ASSASSIN_CARDS + NUM_RED_CARDS) {
        clone.setAttribute("state", card_states.RED);
      } else if (
        identity_array[i] <
        NUM_ASSASSIN_CARDS + NUM_RED_CARDS + NUM_BLUE_CARDS
      ) {
        clone.setAttribute("state", card_states.BLUE);
      } else {
        clone.setAttribute("state", card_states.BYSTANDER);
      }
    }

    // If we are the spymaster: display card states and
    // set up the click callback to mark card as clicked.
    // Otherwise, set up the click callback to toggle card
    // state.
    if (isSpymaster) {
      setCardIdentity();
      setCardStyle(clone);
    } else {
      // Set state to default.
      clone.setAttribute("state", card_states.DEFAULT);

      // Add toggling for state.
      clone.addEventListener("click", function() {
        const current_state = clone.getAttribute("state");
        clone.classList.remove("styling-" + current_state);
        clone.setAttribute("state", cycleEnum(card_states, current_state));
        console.log(current_state, cycleEnum(card_states, current_state))
        setCardStyle(clone);
      })
    }

    document.getElementById("board-container").appendChild(clone);
  }
}


// Add card style based on state attribute.
function setCardStyle(clone) {
  const current_state = clone.getAttribute("state");
  clone.classList.add("styling-" + current_state);
}


// Given an enumerated type and one of its values,
// get the next value as defined. Loops around to
// the first value if necessary.
function cycleEnum(enum_var, value) {
  const enum_properties = [];
  for (property in enum_var) {
    enum_properties.push(property);
  }
  const enum_index =
    (Object.values(enum_var).indexOf(value) + 1) % enum_properties.length;
  return enum_var[enum_properties[enum_index]];
}