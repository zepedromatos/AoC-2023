import { daySevenInput as input } from "./inputs";

const part1 = (input: string) => {
    const rankedCards = {
      A: "a",
      K: "b",
      Q: "c",
      J: "d",
      T: "e",
      "9": "f",
      "8": "g",
      "7": "h",
      "6": "i",
      "5": "j",
      "4": "k",
      "3": "l",
      "2": "m",
    }
  
    const games = {
      five_of_a_kind: [],
      four_of_a_kind: [],
      full_house: [],
      three_of_a_kind: [],
      two_pair: [],
      one_pair: [],
      high_card: [],
    }
  
    const biddings = {}
  
    input.split(/\n/).forEach((line) => {
      const [hand, bid] = line.split(/\s/)
  
      const cards = hand.split("").map((card) => rankedCards[card])
      biddings[cards.join("")] = Number(bid)
  
      const paired = {}
  
      cards.forEach((card) => {
        paired[card] = paired[card] ? [...paired[card], card] : [card]
      })
  
      const occurences = Object.values(paired)
        .map((pair: string[]) => pair.length)
        .sort()
        .reverse()
  
      let type = "high_card"
  
      if (occurences[0] === 5) type = "five_of_a_kind"
      if (occurences[0] === 4) type = "four_of_a_kind"
      if (occurences[0] === 3 && occurences[1] === 2) type = "full_house"
      if (occurences[0] === 3 && occurences[1] === 1) type = "three_of_a_kind"
      if (occurences[0] === 2 && occurences[1] === 2) type = "two_pair"
      if (occurences[0] === 2 && occurences[1] === 1) type = "one_pair"
  
      games[type].push(cards.join(""))
    })
  
    const keys = Object.keys(games)
  
    const ranks = []
    for (let key of keys) {
      ranks.push(...games[key].sort().map((card) => biddings[card]))
    }
  
    return ranks.reverse().reduce((acc, bid, idx) => acc + bid * (idx + 1), 0)
  }
  
  const part2 = (input: string) => {
    const rankedCards = {
      A: "a",
      K: "b",
      Q: "c",
      T: "d",
      "9": "e",
      "8": "f",
      "7": "g",
      "6": "h",
      "5": "i",
      "4": "j",
      "3": "k",
      "2": "l",
      J: "m",
    }
  
    const games = {
      five_of_a_kind: [],
      four_of_a_kind: [],
      full_house: [],
      three_of_a_kind: [],
      two_pair: [],
      one_pair: [],
      high_card: [],
    }
  
    const biddings = {}
  
    input.split(/\n/).forEach((line, idx) => {
      const [hand, bid] = line.split(/\s/)
  
      const cards = hand.split("").map((card) => rankedCards[card])
      biddings[cards.join("")] = Number(bid)
  
      const paired = {}
  
      cards.forEach((card) => {
        const cardKey = card === "m" ? "JOKER" : card
        paired[cardKey] = paired[cardKey]
          ? [...paired[cardKey], cardKey]
          : [cardKey]
      })
  
      const jokers = Object.values(paired)
        .filter(([first]: string[]) => first === "JOKER")
        .flat().length
  
      const occurences = Object.values(paired)
        .filter(([first]: string[]) => first !== "JOKER")
        .map((pair: string[]) => pair.length)
        .sort()
        .reverse()
  
      if (occurences.length === 0) occurences[0] = 0
  
      occurences[0] += jokers
  
      let type = "high_card"
  
      if (occurences[0] === 5) type = "five_of_a_kind"
      if (occurences[0] === 4) type = "four_of_a_kind"
      if (occurences[0] === 3 && occurences[1] === 2) type = "full_house"
      if (occurences[0] === 3 && occurences[1] === 1) type = "three_of_a_kind"
      if (occurences[0] === 2 && occurences[1] === 2) type = "two_pair"
      if (occurences[0] === 2 && occurences[1] === 1) type = "one_pair"
  
      games[type].push(cards.join(""))
    })
  
    const keys = Object.keys(games)
  
    const ranks = []
    for (let key of keys)
      ranks.push(...games[key].sort().map((card) => biddings[card]))
  
    return ranks.reverse().reduce((acc, bid, idx) => acc + bid * (idx + 1), 0)
  }
  
  console.time("Time")
  const result1 = part1(input)
  const result2 = part2(input)
  console.timeEnd("Time")
  
  console.log("Solution to part 1:", result1)
  console.log("Solution to part 2:", result2)