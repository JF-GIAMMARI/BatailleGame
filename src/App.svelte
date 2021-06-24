<script>
  import Game from "./Game.svelte";
  let cardPackageLength = 52;
  let playerOneName = "Player 1";
  let playerTwoName = "Player 2";
</script>

<main>
  <h1>La Bataille</h1>
  <Game {cardPackageLength} {playerOneName} {playerTwoName} />
</main>
