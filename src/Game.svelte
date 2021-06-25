<script>
  export let cardPackageLength;
  export let playerOneName;
  export let playerTwoName;

  let cardPackage = new Array();
  let playerOnePackage = new Array();
  let playerTwoPackage = new Array();
  let currentPlayerOneCards = new Array();
  let currentPlayerTwoCards = new Array();
  let message = "Waiting to start";
  let finalMessage = "";

  let turnCount = 0;
  let isStarted = false;
  let isPlaced = false;
  let isAutoPlay = undefined;

  /**
   * Card class with power value, color and name
   */
  class Card {
    constructor(value, color, name) {
      this.value = value;
      this.color = color;
      this.name = name;
    }
  }

  /**
   * Initialization sequence of the game
   */
  function start() {
    reset();
    isStarted = true;
    fillPackage(cardPackage);
    shufflePackage(cardPackage);
    splitPackage(cardPackage, playerOnePackage, playerTwoPackage);
    updateDOM();
    message = "Game Start";
  }

  /**
   * Place cards on waiting zone for the next turn
   */
  function nextTurn() {
    turnCount++;
    presentCards(
      playerOnePackage,
      playerTwoPackage,
      currentPlayerOneCards,
      currentPlayerTwoCards
    );
    updateDOM();
    isPlaced = true;
  }

  /**
   * Compare current cards played in waiting zone and define the action of the players
   */
  function compareCurrent() {
    let referee = compareCard(
      currentPlayerOneCards[currentPlayerOneCards.length - 1],
      currentPlayerTwoCards[currentPlayerTwoCards.length - 1]
    );

    let waitingCardsNb = currentPlayerOneCards.length + currentPlayerTwoCards.length

    if (referee == 1) {
      giveCards(playerOnePackage);
      checkPackage();
      message = playerOneName + " take cards (+"+waitingCardsNb+")";
    } else if (referee == 0) {
      message = "Bataille";
      presentCards(
        playerOnePackage,
        playerTwoPackage,
        currentPlayerOneCards,
        currentPlayerTwoCards
      );
      updateDOM();
    } else {
      giveCards(playerTwoPackage);
      checkPackage();
      message = playerTwoName + " takes card (+"+waitingCardsNb+")";
    }
    updateDOM();
    isPlaced = false;
  }

  /**
   * Display end game message according to the packages
   */
  function stop() {
    clearInterval(isAutoPlay);
    isStarted = false;
    let result = comparePackage(playerOnePackage, playerTwoPackage);
    if (result == 1) {
      finalMessage = playerOneName + " win the game !";
    } else if (result == -1) {
      finalMessage = playerTwoName + " win the game !";
    } else {
      finalMessage = "Equality !";
    }
    updateDOM();
  }

  // UTILITIES FUNCTION

  /**
   * High speed game simulation
   */
  function autoPlay() {
    if (isAutoPlay == undefined) {
      isAutoPlay = setInterval(function () {
        if (isStarted) {
          nextTurn();
          compareCurrent();
        }
      }, 10);
    } else {
      clearInterval(isAutoPlay);
      isAutoPlay = undefined;
    }
  }

  /**
   * Self-Assign global array for update SvelteJS DOM
   */
  function updateDOM() {
    playerOnePackage = playerOnePackage;
    playerTwoPackage = playerTwoPackage;
    currentPlayerOneCards = currentPlayerOneCards;
    currentPlayerTwoCards = currentPlayerTwoCards;
    message = message;
    finalMessage = finalMessage;
  }

  // GAMES FUNCTIONS

  /**
   * Reset game package & values
   */
  function reset() {
    cardPackage = new Array();
    playerOnePackage = new Array();
    playerTwoPackage = new Array();
    currentPlayerOneCards = new Array();
    currentPlayerTwoCards = new Array();
    message = "Waiting to start";
    finalMessage = "";
    turnCount = 0;
    isStarted = false;
    isPlaced = false;
    isAutoPlay = undefined;
  }

  /**
   * Check if all player can continue to play according to the number of cards
   */
  function checkPackage() {
    if (
      playerOnePackage.length >= cardPackage.length ||
      playerTwoPackage.length >= cardPackage.length ||
      playerOnePackage.length <= 0 ||
      playerTwoPackage.length <= 0
    ) {
      stop();
    }
  }

  /**
   * Fill the package with card according to the start configuration
   * @param {array} array The array to fill
   */
  function fillPackage(array) {
    let colors = ["hearts", "tiles", "clovers", "pikes"];
    let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    let names = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
      "Ace",
    ];

    if (cardPackageLength == 32) {
      values = values.slice(5);
      names = names.slice(5);
    }

    if (cardPackageLength == 16) {
      values = values.slice(9);
      names = names.slice(9);
    }

    for (let i = 0; i < colors.length; i++) {
      for (let j = 0; j < values.length; j++) {
        let currentCard = new Card(values[j], colors[i], names[j]);
        array.push(currentCard);
      }
    }
  }

  /**
   * Randomly mix an package
   * @param {array} array The package to mix
   */
  function shufflePackage(array) {
    array.sort(() => Math.random() - 0.5);
  }

  /**
   * Divide a package into two equal packages (Deep Copy)
   * @param {array} array The original package
   * @param {array} firtTarget The first part new package
   * @param {array} secondTarget The second part new package
   */
  function splitPackage(array, firstTarget, secondTarget) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (i < array.length / 2) {
        firstTarget.push(element);
      } else {
        secondTarget.push(element);
      }
    }
  }

  /**
   * Compare the size of one package to another
   * @param {array} firstArray
   * @param {array} secondArray
   * @returns {number} 1/0/-1 with larger/equal/smaller
   */
  function comparePackage(firstArray, secondArray) {
    if (firstArray.length > secondArray.length) {
      return 1;
    } else if (firstArray.length == secondArray.length) {
      return 0;
    } else {
      return -1;
    }
  }

  /**
   * Compare the value of one card to another
   * @param {array} firstCard
   * @param {array} secondCard
   * @returns {number} 1/0/-1 with larger/equal/smaller
   */
  function compareCard(firstCard, secondCard) {
    if (firstCard.value > secondCard.value) {
      return 1;
    }
    if (firstCard.value == secondCard.value) {
      return 0;
    }
    return -1;
  }

  /**
   * Take cards of two packages in the waiting area
   * @param {array} firstPackage The first origin package
   * @param {array} secondPackage The second origin package
   * @param {array} firstBuffer The first waiting zone
   * @param {array} secondBuffer The second waiting zone
   */
  function presentCards(
    firstPackage,
    secondPackage,
    firstBuffer,
    secondBuffer
  ) {
    if (firstPackage[0] != undefined) {
      firstBuffer.push(
        new Card(
          firstPackage[0].value,
          firstPackage[0].color,
          firstPackage[0].name
        )
      );
      firstPackage.shift();
    }
    if (secondPackage[0] != undefined) {
      secondBuffer.push(
        new Card(
          secondPackage[0].value,
          secondPackage[0].color,
          secondPackage[0].name
        )
      );
      secondPackage.shift();
    }
  }

  /**
   * Give all played cards to a package
   * @param {array} targetPackage The package
   */
  function giveCards(targetPackage) {
    currentPlayerOneCards.forEach((element) => {
      targetPackage.push(element);
    });
    currentPlayerTwoCards.forEach((element) => {
      targetPackage.push(element);
    });
    currentPlayerOneCards = new Array();
    currentPlayerTwoCards = new Array();
  }
</script>

<p>{message}</p>
<div class="card">
  <div class="playerZone">
    <h5>{playerOneName}</h5>
    <p>{playerOnePackage.length} cards</p>
  </div>
  <div class="playerZone">
    <h5>{playerTwoName}</h5>
    <p>{playerTwoPackage.length} cards</p>
  </div>
</div>

<div class="buttons">
  <button on:click={start} disabled={isStarted}>Start</button>
  <button on:click={nextTurn} disabled={!isStarted || isPlaced}>Place</button>
  <button on:click={compareCurrent} disabled={!isStarted || !isPlaced}>
    Compare
  </button>
  <button on:click={stop} disabled={!isStarted}>Stop</button>
  <button on:click={autoPlay} disabled={!isStarted}>Auto</button>
  <p>{turnCount}</p>
</div>
<h1>{finalMessage}</h1>

<div class="card">
  {#if currentPlayerOneCards[currentPlayerOneCards.length - 1] != undefined}
    <div
      class="cardZone {currentPlayerOneCards[currentPlayerOneCards.length - 1]
        .color}"
    >
      {#if currentPlayerOneCards.length % 2 === 0}
        Hidden card
      {:else}
        {currentPlayerOneCards[currentPlayerOneCards.length - 1].color}
        <br />
        {currentPlayerOneCards[currentPlayerOneCards.length - 1].name}
      {/if}
    </div>
  {/if}
  {#if currentPlayerTwoCards[currentPlayerTwoCards.length - 1] != undefined}
    <div
      class="cardZone {currentPlayerTwoCards[currentPlayerTwoCards.length - 1]
        .color}"
    >
      {#if currentPlayerTwoCards.length % 2 === 0}
        Hidden card
      {:else}
        {currentPlayerTwoCards[currentPlayerTwoCards.length - 1].color}
        <br />
        {currentPlayerTwoCards[currentPlayerTwoCards.length - 1].name}
      {/if}
    </div>
  {/if}
</div>
