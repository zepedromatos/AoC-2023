import { daySixInput as input } from "./inputs";

const transformInputString = (input: string): number[][] => {
	const lines: string[] = input.trim().split("\n");

	const timeNumbers: number[] = lines[0].match(/\d+/g)!.map(Number);
	const distanceNumbers: number[] = lines[1].match(/\d+/g)!.map(Number);

	const result: number[][] = timeNumbers.map((time, index) => [
		time,
		distanceNumbers[index],
	]);

	return result;
};

const transformInputStringPart2 = (input: string): number[] => {
	const lines: string[] = input.trim().split("\n");

	const timeNumbers = lines[0].match(/\d+/g)!.map(Number).join("");
	const distanceNumbers = lines[1].match(/\d+/g)!.map(Number).join("");

	return [Number(timeNumbers), Number(distanceNumbers)];
};

const dataArray: number[][] = transformInputString(input);
const dataArray2: number[] = transformInputStringPart2(input);

const calculateScenarioDistance = (buttonHoldTime: number, raceTime: number): number => {
    const usableRaceTime = raceTime - buttonHoldTime;
    const distance = usableRaceTime * buttonHoldTime;
    return distance;
}

const calculateRaceWinningScenarios = (raceInfo: number[]): number => {
    let count = 0;
    for(let i = 1; i < raceInfo[0]; i++) {
        if(calculateScenarioDistance(i, raceInfo[0]) > raceInfo[1]) count++;
    }
    return count;
};

const calculateTotalScore = (dataArray: number[][]): number => {
    let score = 1;
    dataArray.forEach((raceInfo) => {
        score *= calculateRaceWinningScenarios(raceInfo);
    });
    return score;
};

console.log(calculateTotalScore(dataArray));
console.log(calculateRaceWinningScenarios(dataArray2));