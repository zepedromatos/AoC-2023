import { dayFiveInput as input } from "./inputs";

type Item =
    | "seed"
    | "soil"
    | "fertilizer"
    | "water"
    | "light"
    | "temperature"
    | "humidity"
    | "location";
const itemOrder: Item[] = [
    "seed",
    "soil",
    "fertilizer",
    "water",
    "light",
    "temperature",
    "humidity",
    "location"
];

interface Map {
    from: Item;
    to: Item;
    sources: number[];
    destinations: number[];
    ranges: number[];
}
const maps: Map[] = [];

function map(value: number, from: Item, to: Item): number {
    const mapping = maps.find((map) => map.from == from && map.to == to);
    if (!mapping) {
        console.log(`no mapping found for ${from} -> ${to}`);
        return -1;
    }

    for (let i = 0; i < mapping.sources.length; i++) {
        const source = mapping.sources[i];
        const destination = mapping.destinations[i];
        const range = mapping.ranges[i];

        if (
            (value < source && value < destination) ||
            (value > source + range && value > destination + range)
        ) {
            continue;
        }

        if (value >= source && value < source + range) {
            return destination + value - source;
        }
    }

    return value;
}

const mapsList = input.split("\n\n");
const seedsStr = mapsList.shift()!.split(" ");
seedsStr.shift();
const seeds: number[] = seedsStr.map((val) => parseInt(val));

for (let i = 0; i < mapsList.length; i++) {
    let mapStr = mapsList[i];
    const map: Map = {
        from: "seed",
        to: "soil",
        sources: [],
        destinations: [],
        ranges: []
    };

    const header = mapStr.split("\n")[0];

    map.from = header.split("-to-")[0] as Item;
    map.to = header.split("-to-")[1].replaceAll(" map:", "") as Item;

    const mappings = mapStr.split("\n");
    mappings.shift();

    mappings.forEach((mapping) => {
        const split = mapping.split(" ");

        map.destinations.push(parseInt(split[0]));
        map.sources.push(parseInt(split[1]));
        map.ranges.push(parseInt(split[2]));
    });

    maps.push(map);
}

const locations: number[] = [];
for (let i = 0; i < seeds.length; i++) {
    const seed = seeds[i];
    let val = seed;

    console.log("running seed", seed);
    for (let j = 0; j < itemOrder.length - 1; j++) {
        const item = itemOrder[j];
        const nextItem = itemOrder[j + 1];

        val = map(val, item, nextItem);
        console.log(item, "->", nextItem, "=", val);
        if (nextItem == "location") locations.push(val);
    }
}

console.log(locations);

let lowest = Number.MAX_VALUE;
for (let i = 0; i < locations.length; i++) {
    if (locations[i] < lowest) lowest = locations[i];
}

console.log("lowest:", lowest, "seeds:", seeds.length);

const part2 = (input) => {
    const lists = input.split(/[\n]*[a-z- ]*:[ ]*/g).filter((l) => l).map((l) => l.trim().split(/[\n]+/g).map((n) => n.split(/[\n ]/).map((m) => parseInt(m, 10))));
    const maxMap = lists[lists.length - 1].reduce((max, map) => Math.max(max, map[0] + map[2]), 0);
    let lowestPost;
    for (let pos = 0; pos < maxMap && isNaN(lowestPost); pos++) {
      let val = pos;
      for (let i = lists.length - 1; i > 0; i--) {
        const map = lists[i].find((m) => val >= m[0] && val < m[0] + m[2]);
        map && (val = val - map[0] + map[1]);
      }
      for(let i = 0; i < lists[0][0].length && isNaN(lowestPost); i += 2) {
        if(val >= lists[0][0][i] && val < lists[0][0][i] + lists[0][0][i + 1]) {
          lowestPost = pos
        }
      }
    }
  
    return lowestPost;
  };

  console.log(part2(input));