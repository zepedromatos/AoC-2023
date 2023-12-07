import { dayFourInput as input } from "./inputs";

const cardsArray = input.split("\n");

const aux = [0];

const makeCopies = (currentCard: number, range: number, increment: number): void => {
    for (let i = currentCard; i < (currentCard + range) && (i < cardsArray.length ); i++) {
        aux[i] = (aux[i] || 0) + increment;
    }
};

const scores = cardsArray.map((card) => {
	const match = card.match(
		/Card\s+(\d+):\s*(\d+(?:\s+\d+)*)\s*\|\s*(\d+(?:\s+\d+)*)/
	);

	const [, cardNumber, winningNumbersStr, myNumbersStr] = match; 
    const currentCardCopies = aux[Number(cardNumber) - 1];

	const winningNumbers = winningNumbersStr.split(/\s+/).filter(Boolean).map(Number);
	const myNumbers = myNumbersStr.split(/\s+/).filter(Boolean).map(Number);

	const myWinningNumbers = myNumbers.filter(num => winningNumbers.includes(num)).length;

    if (myWinningNumbers) makeCopies(Number(cardNumber), myWinningNumbers, currentCardCopies? currentCardCopies + 1 : 1);
});

const amountOfCards = aux.reduce((acc, copies) => acc + copies, 0) + cardsArray.length;

console.log(amountOfCards);

