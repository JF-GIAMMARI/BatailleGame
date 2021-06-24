<script>
  export let cardPackageLength;

  let cardPackage = new Array();
  let playerOnePackage = new Array();
  let playerTwoPackage = new Array();
  let playerOneName = "Player 1";
  let playerTwoName = "Player 2";
  let message = "Waiting to start";

  /**
   * Card class with value and color
   */
  class card {
    constructor(value, color) {
      this.value = value;
      this.color = color;
    }
  }

  /**
   * Initialization sequence of the game
   */
  function Start() {
    fillPackage(cardPackage);
    shufflePackage(cardPackage);
    splitPackage(cardPackage, playerOnePackage, playerTwoPackage);
    console.log(playerOnePackage, playerTwoPackage);
    message = "Game Start";
  }

  /**
   * Display end game message according to the packages
   */
  function Stop() {
    let result = comparePackage(playerOnePackage, playerTwoPackage);
    if (result == 1) {
      message = playerOneName + " win the game !";
    } else if (result == -1) {
      message = playerTwoName + " win the game !";
    } else {
      message = "Equality !";
    }
  }

  function NextTurn() {}

  // UTILITIES FUNCTION

  /**
   * Fill the package with card according to the start configuration
   * @param {array} array The array to fill
   */
  function fillPackage(array) {
    let colors = ["hearts", "tiles", "clovers", "pikes"];
    let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    if (cardPackageLength != 52) {
      values = values.slice(5);
    }
    for (let i = 0; i < colors.length; i++) {
      for (let j = 0; j < values.length; j++) {
        let currentCard = new card(colors[i], values[j]);
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
		if(i < array.length/2){
			firstTarget.push(element)
		}else{
			secondTarget.push(element)
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
  <button on:click={Start}>Start</button>
  <button on:click={NextTurn}>Next Turn</button>
  <button on:click={Stop}>Stop</button>
</div>
