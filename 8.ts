import { dayEightInput as input } from "./inputs";

console.time("Day 8 part 1 exec time:");
const finalDestination = "ZZZ";
let firstLocation = "AAA";

const createDataStructure = (input: string) => {
	const lines = input.split("\n");

	const emptyLineIndex = lines.indexOf("");

	const locations = lines.slice(emptyLineIndex + 1).reduce((acc, line) => {
		const regex = /(\w{3}) = \((\w{3}), (\w{3})\)/g;

		const resultObject: Record<string, { L: string; R: string }> = {};

		let match;
		while ((match = regex.exec(line)) !== null) {
			const [, key, L, R] = match;
			resultObject[key] = { L, R };
            acc[key] = resultObject[key];
		}
		return acc;
	}, {});

	const resultArray = {
		instructions: lines.slice(0, emptyLineIndex).join("").split(""),
		locations,
	};

	return resultArray;
};

const dataStructure = createDataStructure(input);

const navigate = (dataStructure) => {
    let { instructions, locations } = dataStructure;

    let currentLocation = firstLocation;
    let counter = 0;

    while (currentLocation !== finalDestination) {
        if(!instructions[counter]) instructions = [...instructions, ...instructions];
        let side = instructions[counter];

        currentLocation = locations[currentLocation][side];

        counter++;
        if(currentLocation === finalDestination) break;
    };

    return counter;
};

console.log(navigate(dataStructure));
console.timeEnd("Day 8 part 1 exec time:");
