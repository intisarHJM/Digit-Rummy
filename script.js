console.log("Hello sweetie")
const orange = document.querySelectorAll(".orange-tile")
const green = document.querySelectorAll(".green-tile")
const blue = document.querySelectorAll(".blue-tile")
const red = document.querySelectorAll(".red-tile")
const smileyJocker = document.querySelectorAll(".smiley-tile")
//const playerRacks = document.querySelectorAll(".player-rack")
const player1 = document.querySelectorAll(".p1-tiles")
const player2 = document.querySelectorAll(".p2-tiles")
const tileGroup = document.querySelectorAll(".tile-group")
const stockTile = document.querySelectorAll(".tile")
const p1Rack = document.querySelector("#player-1-rack .p1-tiles")
const p2Rack = document.querySelector("#player-2-rack .p2-tiles")
const mainBoard = document.querySelector(".main-board")

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
const randomOranges = () => {
  const randomId = Math.floor(Math.random() * orange.length)
  const randomCard = orange[randomId]

  // return `${randomCard.textContent} orange tile`
  return {
    number: randomCard.textContent,
    color: "orange",
  }
}

//-----------//

const randomRed = () => {
  const randomId = Math.floor(Math.random() * red.length)
  const randomCard = red[randomId]

  return {
    number: randomCard.textContent,
    color: "red",
  }
}

const randomGreen = () => {
  const randomId = Math.floor(Math.random() * green.length)
  const randomCard = green[randomId]

  return {
    number: randomCard.textContent,
    color: "green",
  }
}

const randomBlue = () => {
  const randomId = Math.floor(Math.random() * blue.length)
  const randomCard = blue[randomId]

  return {
    number: randomCard.textContent,
    color: "blue",
  }
}

const smileys = () => {
  const randomId = Math.floor(Math.random() * smileyJocker.length)
  const randomCard = smileyJocker[randomId]

  return {
    number: randomCard.textContent,
    color: "Joker",
  }
}

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
  // tile1.textContent = newArray[index1].number + ` ` + newArray[index1].color
})

player2.forEach((tile2, index2) => {
  tile2.classList.add(newArray2[index2].color) //newArray[index1].color
  //tile2.textContent = newArray2[index2].number + ` ` + newArray2[index2].color
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

//p1-tiles //p2-tiles

const players = ["p1", "p2"]

let currentPlayer = 0
const turnHead = document.querySelector("#turn-head") // Use "#" to select by ID

const turns = () => {
  if (currentPlayer === 0) {
    currentPlayer = 1
    turnHead.textContent = "Player 2's turn" // Added apostrophe for clarity
  } else {
    currentPlayer = 0
    turnHead.textContent = "Player 1's turn" // Added apostrophe for clarity
  }
}

//console.log(mainBoard)

let draggedObj = null // To store the object {number, color}
window.draggedElement = null // To store the actual HTML div element

newArray.forEach((item) => {
  const div = document.createElement("div")

  // classes of CSS applies the color
  div.classList.add("tile", `${item.color}-tile`)
  div.textContent = item.number === "joker" ? "☺" : item.number //if it's a joker give the smiley face if not just give the number instead
  div.draggable = true

  // Drag Start: Capture the element and the data
  div.addEventListener("dragstart", () => {
    draggedObj = item
    window.draggedElement = div // Store the <div> here
    div.classList.add("dragging")
  })
  for (let slot of player1) {
    if (slot.children.length === 0) {
      slot.appendChild(div)
      break
    }
  }

  //------------------------------------------------------------------p2
  newArray2.forEach((item) => {
    const div = document.createElement("div")

    div.classList.add("tile", `${item.color}-tile`)
    div.textContent = item.number === "joker" ? "☺" : item.number
    div.draggable = true

    // Drag Start: Capture the element and the data
    div.addEventListener("dragstart", () => {
      draggedObj = item
      window.draggedElement = div // Store the <div> here
      div.classList.add("dragging")
    })

    div.addEventListener("dragend", () => {
      div.classList.remove("dragging")
    })

    // Initial placement: Add to the first available player slot
    // Find the first slot that doesn't have a tile yet
    for (let slot of player2) {
      if (slot.children.length === 0) {
        slot.appendChild(div)
        break
      }
    }
  })

  //---------------------------------------------------------------------------
})
// 3. Drop Logic on the Main Board
mainBoard.addEventListener("dragover", (event) => {
  event.preventDefault() // Required to allow dropping
})

mainBoard.addEventListener("drop", (event) => {
  event.preventDefault()

  if (window.draggedElement) {
    // This MOVEs the element from the rack to the board automatically
    mainBoard.appendChild(window.draggedElement)

    console.log("Moved tile:", draggedObj)

    // this resets variables for the next drag
    window.draggedElement = null
    draggedObj = null
  }
})


