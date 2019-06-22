function testBuild() {
  NUM_CARDS = 25;
  let card_template = document.getElementById("card-template");
  for (let i = 0; i < NUM_CARDS; i++) {
    var clone = card_template.cloneNode(true); // Make copy.
    clone.style.display = "inline-flex"; // Make copy visible.
    document.getElementById("board-container").appendChild(clone);
  }
}
