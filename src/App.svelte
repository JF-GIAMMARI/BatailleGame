<script>
  import Game from "./Game.svelte";
  let cardPackageLength = 32; //16 / 32 / 52 (16 is dangerous)
  let playerOneName = "Player 1";
  let playerTwoName = "Player 2";
</script>

<main>
  <h1>La Bataille ({cardPackageLength} cartes)</h1>
  <Game {cardPackageLength} {playerOneName} {playerTwoName} />
</main>
