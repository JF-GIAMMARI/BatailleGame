<script>
  import {Card, fillPackage, splitPackage,shufflePackage,presentCards,compareCard,comparePackage,giveCards} from './tools.js'
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


  /**
   * Initialization sequence of the game
   */
  function start() {
    reset();
    isStarted = true;
    fillPackage(cardPackage, cardPackageLength);
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
        X
      {:else}
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
        {currentPlayerTwoCards[currentPlayerTwoCards.length - 1].name}
      {/if}
    </div>
  {/if}
</div>
