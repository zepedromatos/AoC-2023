import { dayFourInput as input } from "./inputs";

const cardsArray = input.split("\n");

const scores = cardsArray.map((card) => {
	const match = card.match(
		/Card\s+(\d+):\s*(\d+(?:\s+\d+)*)\s*\|\s*(\d+(?:\s+\d+)*)/
	);

	const [, , winningNumbersStr, myNumbersStr] = match;

	const winningNumbers = winningNumbersStr.split(/\s+/).filter(Boolean).map(Number);
	const myNumbers = myNumbersStr.split(/\s+/).filter(Boolean).map(Number);

	const myWinningNumbers = myNumbers.filter(num => winningNumbers.includes(num)).length;

    const score = myWinningNumbers === 0 ? 0 : Math.pow(2, myWinningNumbers - 1);
    return score;   
});

const totalScore = scores.reduce((acc, score) => acc + score, 0);

console.log(totalScore);