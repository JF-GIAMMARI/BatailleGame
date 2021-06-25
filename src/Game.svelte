<script>
  export let cardPackageLength;
  export let playerOneName;
  export let playerTwoName;

  /**
   * Card class with value and color
   */
  class Card {
    constructor(value, color) {
      this.value = value;
      this.color = color;
    }
  }

  let cardPackage = new Array();
  let playerOnePackage = new Array();
  let playerTwoPackage = new Array();
  let currentPlayerOneCards = new Array();
  let currentPlayerTwoCards = new Array();
  let message = "Waiting to start";
  let turnCount = 0;

  /**
   * Initialization sequence of the game
   */
  function start() {
	playerOnePackage = [];
    playerTwoPackage = [];
    cardPackage = [];
	turnCount = 0
	if (cardPackage.length == 0) {
      fillPackage(cardPackage);
      shufflePackage(cardPackage);
      splitPackage(cardPackage, playerOnePackage, playerTwoPackage);
      updateDOM();
      message = "Game Start";
    } else {
      message = "Game already start";
    }
  }

  /**
   * Display end game message according to the packages
   */
  function stop() {
    let result = comparePackage(playerOnePackage, playerTwoPackage);
    if (result == 1) {
      message = playerOneName + " win the game !";
    } else if (result == -1) {
      message = playerTwoName + " win the game !";
    } else {
      message = "Equality !";
    }

  }

  function nextTurn() {
    turnCount++;
    presentCards(
      playerOnePackage,
      playerTwoPackage,
      currentPlayerOneCards,
      currentPlayerTwoCards
    );

    if (currentPlayerOneCards.length != 1 && currentPlayerTwoCards != 1) {
      presentCards(
        playerOnePackage,
        playerTwoPackage,
        currentPlayerOneCards,
        currentPlayerTwoCards
      );
    }

    let referee = compareCard(
      currentPlayerOneCards[currentPlayerOneCards.length - 1],
      currentPlayerTwoCards[currentPlayerTwoCards.length - 1]
    );

    if (referee == 1) {
      giveCards(playerOnePackage);
    } else if (referee == 0) {
      nextTurn();
    } else {
      giveCards(playerTwoPackage);
    }
    updateDOM();
  }

  function presentCards(
    firstPackage,
    secondPackage,
    firstBuffer,
    secondBuffer
  ) {
	   checkPackage()
      firstBuffer.push(new Card(firstPackage[0].value, firstPackage[0].color));
      firstPackage.shift();
	  checkPackage()
      secondBuffer.push(new Card(secondPackage[0].value, secondPackage[0].color)
      );
      secondPackage.shift();
	
  }

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

  // UTILITIES FUNCTION

  /**
   * Self-Assign global array for update SvelteJS DOM
   */
  function updateDOM() {
    playerOnePackage = playerOnePackage;
    playerTwoPackage = playerTwoPackage;
  }

  /**
   * Fill the package with card according to the start configuration
   * @param {array} array The array to fill
   */
  function fillPackage(array) {
    let colors = ["hearts", "tiles", "clovers", "pikes"];
    let values = [2, 3, 4]; //[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    if (cardPackageLength != 52) {
      values = values.slice(5);
    }
    for (let i = 0; i < colors.length; i++) {
      for (let j = 0; j < values.length; j++) {
        let currentCard = new Card(values[j], colors[i]);
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
    } else if (firstCard.value == secondCard.value) {
      return 0;
    } else {
      return -1;
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
  <button on:click={start}>Start</button>
  <button on:click={nextTurn}>Next Turn</button>
  <button on:click={stop}>Stop</button>
  <p>{turnCount}</p>
</div>
