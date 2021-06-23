<script>
	export let cardPackageLength;

	let cardPackage = new Array()
	let playerOnePackage = new Array()
	let playerTwoPackage = new Array()
	let playerOneName = "Player 1"
	let playerTwoName = "Player 2"
	let message = 'Waiting to start'

	function Start(){
	message = "Game Start"
	}

	function Stop(){
	message = "Game is finish"
	}

	function NextTurn(){

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
		<p>{playerTwoPackage.length} cards </p>
	</div>
</div>


<div class="buttons">
	<button on:click={Start}>Start</button>
	<button on:click={NextTurn}>Next Turn</button>
	<button on:click={Stop}>Stop</button>
</div>