import { dayThreeInput as input } from "./inputs";

/* function isDigit(str: string) {
    return !Number.isNaN(parseInt(str));
}
const grid: string[] = input.split("\n");

function getNeighbors(x: number, y: number): string[] {
    let out: string[] = [];
    // top row
    // X x x
    if (y > 0 && x > 0) out.push(grid[y - 1][x - 1]);
    // x X x
    if (y > 0) out.push(grid[y - 1][x]);
    // x x X
    if (y > 0 && x < grid[y].length - 1) out.push(grid[y - 1][x + 1]);

    // right col
    if (x < grid[y].length - 1) out.push(grid[y][x + 1]);
    if (y < grid.length - 1 && x < grid[y].length - 1) out.push(grid[y + 1][x + 1]);

    // left col
    if (x > 0) out.push(grid[y][x - 1]);
    if (y < grid.length - 1 && x > 0) out.push(grid[y + 1][x - 1]);

    // bottom
    if (y < grid.length - 1) out.push(grid[y + 1][x]);

    out = out.filter(val => val != undefined);

    return out;
}

let sum = 0;
for (let y = 0; y < grid.length; y++) {
    grid[y] += ".";

    let currentNum = "";
    let hasSymbolNeighbor = false;

    for (let x = 0; x < grid[y].length; x++) {
        const char = grid[y][x];

        if (isDigit(char)) {
            currentNum += char;
            getNeighbors(x, y).forEach(val => {
                if (val != "." && !/\d/g.test(val)) {
                    hasSymbolNeighbor = true;
                }
            });
        } else if (currentNum != "") {
            if (hasSymbolNeighbor) sum += parseInt(currentNum);
            console.log(currentNum, hasSymbolNeighbor);
            currentNum = "";
            hasSymbolNeighbor = false;
        }
    }
}
console.log(sum); */

function isDigit(str: string) {
    return !Number.isNaN(parseInt(str));
}

const grid: string[] = input.split("\n");

function getNeighbors(x: number, y: number): { char: string; x: number; y: number; }[] {
    let out: { char: string; x: number; y: number; }[] = [];
    // top row
    // X x x
    if (y > 0 && x > 0) out.push({ char: grid[y - 1][x - 1], x: x - 1, y: y - 1 });
    // x X x
    if (y > 0) out.push({ char: grid[y - 1][x], x, y: y - 1 });
    // x x X
    if (y > 0 && x < grid[y].length - 1) out.push({ char: grid[y - 1][x + 1], x: x + 1, y: y - 1 });

    // right col
    if (x < grid[y].length - 1) out.push({ char: grid[y][x + 1], x: x + 1, y });
    if (y < grid.length - 1 && x < grid[y].length - 1) out.push({ char: grid[y + 1][x + 1], x: x + 1, y: y + 1 });

    // left col
    if (x > 0) out.push({ char: grid[y][x - 1], x: x - 1, y });
    if (y < grid.length - 1 && x > 0) out.push({ char: grid[y + 1][x - 1], x: x - 1, y: y + 1 });

    // bottom
    if (y < grid.length - 1) out.push({ char: grid[y + 1][x], x, y: y + 1 });

    out = out.filter(val => val != undefined);

    return out;
}

let sum = 0;
let gears: {
    x: number;
    y: number;
    num: string;
}[] = [];
for (let y = 0; y < grid.length; y++) {
    grid[y] += ".";

    let currentNum = "";
    let currentGear = {
        x: 0,
        y: 0,
        found: false
    };
    for (let x = 0; x < grid[y].length; x++) {
        const char = grid[y][x];

        if (isDigit(char)) {
            currentNum += char;
            getNeighbors(x, y).forEach(val => {
                if (val.char == "*") {
                    if (currentGear.x == val.x && currentGear.y == val.y) return;
                    currentGear = {
                        x: val.x,
                        y: val.y,
                        found: true
                    };
                }
            });
        } else {
            if (currentGear.found) {
                const gearsAtPos = gears.filter(gear => gear.x == currentGear.x && gear.y == currentGear.y);
                if (gearsAtPos.length > 0) {
                    sum += parseInt(gearsAtPos[0].num) * parseInt(currentNum);
                } else {
                    gears.push({
                        x: currentGear.x,
                        y: currentGear.y,
                        num: currentNum
                    });
                }

                currentGear = {
                    found: false,
                    x: 0,
                    y: 0
                };
            }

            currentNum = "";
        }
    }
}
console.log(sum);