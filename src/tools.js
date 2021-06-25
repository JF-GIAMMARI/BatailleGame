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
 * Fill the package with card according to the start configuration
 * @param {array} array The array to fill
 */
function fillPackage(array, length) {
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

	if (length == 32) {
		values = values.slice(5);
		names = names.slice(5);
	}

	if (length == 16) {
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

export { Card, splitPackage, shufflePackage, presentCards, compareCard, comparePackage, fillPackage }