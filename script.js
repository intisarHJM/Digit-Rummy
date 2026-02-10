console.log("Hello sweaty")
const orange = document.querySelectorAll(".orange-tile")
const green = document.querySelectorAll(".green-tile")
const blue = document.querySelectorAll(".blue-tile")
const red = document.querySelectorAll(".red-tile")
const smileyJocker = document.querySelectorAll(".smiley-tile")
const playerRacks = document.querySelectorAll(".player-rack")
const player1 = document.querySelectorAll(".p1-tiles")
const player2 = document.querySelectorAll(".p2-tiles")
const tileGroup = document.querySelectorAll(".tile-group")
const stockTile = document.querySelectorAll(".tile")

const tiles = Array.from(stockTile).map((tile) => {
  const [color, number] = tile.id.split("-") // e.g.["orange", "1"]

  return {
    id: tile.id, // "orange-1"
    color, // "orange"
    number: Number(number) || null, // 1..13, or null for jokers
    type: tile.classList.contains("smiley-tile") ? "joker" : "number",
    element: tile, // reference to the DOM element
  }
})

//console.log(tiles)

/* console.log(orange)
console.log(green)
console.log(blue)
console.log(red) */

//.player-rack -> #player-1-rack | #player-2-rack
//stockpile
//.tile-group
//main-board

//random the tiles then add them to an empty array distreputing them on the players

const randomize = () => {
  const rand = []
  const jokerChance = 0.2
  for (let index = 0; index < 3; index++) {
    rand.push(randomOranges())
    rand.push(randomGreen())
    rand.push(randomBlue())
    rand.push(randomRed())

    if (Math.random() < jokerChance) {
      rand.pop()
      rand.push(smileys())
    }
  }
  return rand
} //end of randomize function for each tile

//randomize()

const newArray = randomize()
const newArray2 = randomize()

//newArray will return the randomized cards in objects array
player1.forEach((tile1, index1) => {
  tile1.classList.add(newArray[index1].color) //newArray[index1].color
  tile1.textContent = newArray[index1].number + ` ` + newArray[index1].color
})

player2.forEach((tile2, index2) => {
  tile2.classList.add(newArray2[index2].color) //newArray[index1].color
  tile2.textContent = newArray2[index2].number + ` ` + newArray2[index2].color
})

//removing the tails after they are distributed on the players

//stockTileElement = stockTile[index] we bring the HTML element of the
// side Bar
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! doesn't work !!!!!!!!!!!!
newArray.forEach((item, index) => {
  const currentTile = stockTile[index]
  const isOrange = currentTile.id.startsWith("orange")
  stockTile.forEach((tile, idx) => {
    if (item.color === tile.color) {
      stockTile.splice(idx, 1)
    }
  })
})
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

console.log(newArray)
console.log(newArray2)

const players = [p1, p2]

let currentPlayer = 0

const turns = () => {
  if (currentPlayer === 0) {
    currentPlayer = 1
  } else {
    currentPlayer = 0
  }
}

const buttons = document.querySelectorAll(".buttons")
