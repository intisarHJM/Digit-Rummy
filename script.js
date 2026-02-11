const orange = document.querySelectorAll(".orange-tile")
const green = document.querySelectorAll(".green-tile")
const blue = document.querySelectorAll(".blue-tile")
const red = document.querySelectorAll(".red-tile")
const smileyJocker = document.querySelectorAll(".smiley-tile")
//const playerRacks = document.querySelectorAll(".player-rack")
const player1 = document.querySelectorAll(".p1-tiles")
const player2 = document.querySelectorAll(".p2-tiles")
const tileGroup = document.querySelector(".tile-group")
const stockTile = document.querySelectorAll(".tile")
const p1Rack = document.querySelector("#player-1-rack .p1-tiles")
const p2Rack = document.querySelector("#player-2-rack .p2-tiles")
const containerOfSets = document.querySelector(".container")
const sets = document.querySelectorAll(".sets")

//console.log(sets)

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
    number: Number(randomCard.textContent),
    color: "orange",
  }
}

//-----------//

const randomRed = () => {
  const randomId = Math.floor(Math.random() * red.length)
  const randomCard = red[randomId]

  return {
    number: Number(randomCard.textContent),
    color: "red",
  }
}

const randomGreen = () => {
  const randomId = Math.floor(Math.random() * green.length)
  const randomCard = green[randomId]

  return {
    number: Number(randomCard.textContent),
    color: "green",
  }
}

const randomBlue = () => {
  const randomId = Math.floor(Math.random() * blue.length)
  const randomCard = blue[randomId]

  return {
    number: Number(randomCard.textContent),
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

//console.log(newArray)
//console.log(newArray2)

//p1-tiles //p2-tiles

const players = ["p1", "p2"]

let currentPlayer = 0

const turnHead = document.querySelector("#turn-head")
let isMoveValid = false

const turns = () => {
  if (!hasMadeValidSet) {
    alert(
      "You must place a valid set of at least 3 tiles before ending your turn!"
    )
    return
  }

  hasMadeValidSet = false
  if (currentPlayer === 0) {
    currentPlayer = 1
    player2_turn()
    turnHead.textContent = `Player 2 turn`
  } else {
    currentPlayer = 0
    player1_turn()
    turnHead.textContent = `Player 1 turn`
  }
  player1.forEach((rack) => {
    if (rack.children.length > 0) {
      let tile = rack.children[0]
      if (currentPlayer === 0) {
        tile.style.display = "block"
      } else {
        tile.style.display = "none"
      }
    }
  })

  player2.forEach((rack) => {
    if (rack.children.length > 0) {
      let tile = rack.children[0]
      if (currentPlayer === 1) {
        // Show if it's Player 2's turn
        tile.style.display = "block"
      } else {
        tile.style.display = "none"
      }
    }
  })
  hasMadeValidSet = false
}

//console.log(sets)

let draggedObj = null // To store the object {number, color}
window.draggedElement = null // To store the actual HTML div element
let originalOwner = null //who is the owner of the rejected tile

const player1_turn = () => {
  newArray.forEach((item) => {
    const div = document.createElement("div")
    div.setAttribute

    // classes of CSS applies the color
    div.classList.add("tile", `${item.color}-tile`)
    div.textContent = item.number === "joker" ? "☺" : item.number //if it's a joker give the smiley face if not just give the number instead
    div.draggable = true

    for (let card of player1) {
      if (card.children.length === 0) {
        card.appendChild(div)
        break
      }
    }

    // Drag Start: Capture the element and the data
    div.addEventListener("dragstart", () => {
      if (currentPlayer !== 0) {
        e.preventDefault() // Stop the drag
        alert("It's not your turn, Player 1!")
        return
      }

      draggedObj = item
      window.draggedElement = div // Store the <div> here
      originalOwner = 0 //the tile belongs to p1
      div.classList.add("dragging")
    })
  })
  for (let card of player1) {
    if (card.children.length === 0) {
      card.appendChild(div)
      break
    }
  }
}

//------------------------------------------------------------------p2
const player2_turn = () => {
  newArray2.forEach((item) => {
    const div = document.createElement("div")

    div.classList.add("tile", `${item.color}-tile`)
    div.textContent = item.number === "joker" ? "☺" : item.number
    div.draggable = true

    // Drag Start: Capture the element and the data
    div.addEventListener("dragstart", () => {
      if (currentPlayer !== 1) {
        e.preventDefault() // Stop the drag
        alert("It's not your turn, Player 2!")
        return
      }
      draggedObj = item
      window.draggedElement = div // Store the <div> here
      originalOwner = 1 //the tile belongs to p2
      div.classList.add("dragging")
    })

    div.addEventListener("dragend", () => {
      div.classList.remove("dragging")
    })

    // Initial placement: Add to the first available player card
    // Find the first card that doesn't have a tile yet
    for (let card of player2) {
      if (card.children.length === 0) {
        card.appendChild(div)
        break
      }
    }
  })
}

//---------------------------------------------------------------------------

// 3. Drop Logic on the divs that are inside the container inside the main boards
sets.forEach((setSlot) => {
  setSlot.addEventListener("dragover", (e) => e.preventDefault())

  setSlot.addEventListener("drop", (event) => {
    event.preventDefault()

    if (window.draggedElement && draggedObj) {
      // 1. Move the tile into this specific box
      setSlot.appendChild(window.draggedElement)

      // 2. Get all tiles currently inside THIS box
      const tilesInThisSet = Array.from(setSlot.children)

      // 3. Validation: Only check if there are 2 or more tiles
      if (tilesInThisSet.length >= 2) {
        const currentTileEl = window.draggedElement
        const prevTileEl = tilesInThisSet[tilesInThisSet.length - 2]

        // Get values for comparison
        const currentNum = Number(currentTileEl.textContent)
        const prevNum = Number(prevTileEl.textContent)

        // Helper to find the color class (e.g., "orange-tile")
        const getColor = (el) => {
          if (el.classList.contains("orange-tile")) return "orange"
          if (el.classList.contains("green-tile")) return "green"
          if (el.classList.contains("blue-tile")) return "blue"
          if (el.classList.contains("red-tile")) return "red"
          return "joker"
        }

        const currentColor = getColor(currentTileEl)
        const prevColor = getColor(prevTileEl)

        // Rummy Rules
        const isConsecutive = currentNum === prevNum + 1
        const isSameColor = currentColor === prevColor
        const isSameNumber = currentNum === prevNum
        const isDiffColor = currentColor !== prevColor
        const isJoker =
          currentTileEl.textContent === "☺" || prevTileEl.textContent === "☺"

        // A move is valid if it's a sequence (Same color + Consecutive)
        // OR a group (Same number + Different colors) OR a Joker is used
        let isMoveValid =
          (isSameColor && isConsecutive) ||
          (isSameNumber && isDiffColor) ||
          isJoker

        if (!isMoveValid) {
          alert(
            "Invalid Move! Tiles in a set must be consecutive same-color OR same-number different-color"
          )

          // Send back to the correct player rack
          let ownerRack = originalOwner === 0 ? player1 : player2

          let placedBack = false
          ownerRack.forEach((slot) => {
            if (!placedBack && slot.children.length === 0) {
              slot.appendChild(window.draggedElement)
              placedBack = true
            }
          })
        } else {
          console.log("Valid addition to set")
          // If set has 3+ tiles, mark as complete turn possible
          if (tilesInThisSet.length >= 3) {
            hasMadeValidSet = true
            setSlot.style.border = "2px solid green"
          }
        }
      }

      window.draggedElement = null
      draggedObj = null
    }
  })
})
//after the tile is placed player can change their minds

// Combine both player racks into one list to apply listeners
const both_players_array = [...player1, ...player2]

both_players_array.forEach((rack) => {
  // Tell the browser this slot is a valid place to drop things
  rack.addEventListener("dragover", (e) => {
    e.preventDefault()
  })

  // 2. Handle the actual drop
  rack.addEventListener("drop", (e) => {
    e.preventDefault()

    if (window.draggedElement) {
      // Check if the slot is already taken

      if (rack.children.length > 0) {
        alert("This slot is already full!")
        return
      }

      // Check which rack this slot belongs to
      const isP1Rack = Array.from(player1).includes(rack)
      const isP2Rack = Array.from(player2).includes(rack)

      //  Only allow the current player to take tiles back
      if (currentPlayer === 0 && isP1Rack) {
        rack.appendChild(window.draggedElement)
      } else if (currentPlayer === 1 && isP2Rack) {
        rack.appendChild(window.draggedElement)
      } else {
        alert("You can only take tiles back into your own rack!")
      }
    }
  })
})
/* const startButton = document.createElement('button')

startButton.textContent ='START'
startButton.classList.add('buttons')
console.log(startButton) */
/*if the game starts randomize the cards
player 1 starts if he have 10-11-12 with same colours*/

/*  console.log(tiles[1].color)
console.log(newArray[1].color) */

//for loop that takes one of the players tails compare it with all the tails in the stock and remove it if they have same color and number
//removing the tails after they are distributed on the players
const startGame = () => {
  player1_turn()
  player2_turn()

  player1.forEach((rack) => {
    if (rack.children.length > 0) rack.style.display = "block"
  })

  player2.forEach((rack) => {
    if (rack.children.length > 0) rack.style.display = "none"
  })

  turnHead.textContent = "Player 1 turn"
  currentPlayer = 0

  newArray.forEach((player1_tile, i) => {
    let currentTiles = newArray[i]
    tiles.forEach((stock_tail, index) => {
      let remainingTailes = tiles[index]
      if (
        player1_tile.color === stock_tail.color &&
        player1_tile.number === stock_tail.number
      ) {
        tiles.length--
        tiles.splice(index, 1)
      }
    })
  })
  console.log(tiles)

  //player 2 cards remove
  newArray2.forEach((player1_tile, i) => {
    let currentTiles2 = newArray2[i]
    tiles.forEach((stock_tail, index) => {
      let remainingTailes = tiles[index]
      if (
        player1_tile.color === stock_tail.color &&
        player1_tile.number === stock_tail.number
      ) {
        //tiles.length--
        tiles.splice(index, 1)
      }
    })
  })
  console.log(tiles)
  display_stockpile()
}

const display_stockpile = () => {
  const tileGroup = document.querySelector(".tile-group")

  if (!tileGroup) {
    console.error("Could not find the .tile-group element!")
    return
  }

  //Clear the screen
  tileGroup.innerHTML = ""

  tiles.forEach((tileObject) => {
    const div = document.createElement("div")

    div.classList.add("tile", `${tileObject.color}-tile`)
    div.textContent = tileObject.number === "joker" ? "☺" : tileObject.number

    div.draggable = true

    tileGroup.appendChild(div)
  })
}

const checkWinner = () => {
  // We check the player racks to see if they are empty
  const player1Left = Array.from(player1).some(
    (slot) => slot.children.length > 0
  )
  const p2TilesLeft = Array.from(player2).some(
    (slot) => slot.children.length > 0
  )

  const screen = document.querySelector("#winner-screen")
  const winText = document.querySelector("#winner-text")

  if (!player1Left) {
    winText.textContent = "PLAYER 1 WINS!"
    screen.style.display = "flex"
    document.querySelector(".game").style.opacity = "0.3" // Decrease opacity of background
  } else if (!p2TilesLeft) {
    winText.textContent = "PLAYER 2 WINS!"
    screen.style.display = "flex"
    document.querySelector(".game").style.opacity = "0.3"
  }
}

const restart = document.querySelector("#restarter")
restart.addEventListener("mouseenter", () => {
  restart.innerHTML.style.color
})

const next_button = document.getElementById("show")
next_button.addEventListener("click", () => {
  turns()
})

const draw = document.querySelector("#draw-button")
draw.addEventListener("click", () => {
  if (tiles.length === 0) {
    console.log("stock is empty")
    return
  }

  let currentRack

  if (currentPlayer === 0) {
    currentRack = player1
  } else {
    currentRack = player2
  }

  const emptySlot = currentRack.find((slot) => slot.children.length === 0) //Find the first empty slot in that rack

  if (emptySlot) {
    const randomIndex = Math.floor(Math.random() * tiles.length)

    const drawnTile = tiles.splice(randomIndex, 1)[0]

    const div = document.createElement("div")
    div.classList.add("tile", `${drawnTile.color}-tile`)
    div.textContent = drawnTile.number === "joker" ? "☺" : drawnTile.number
    div.draggable = true

    div.addEventListener("dragstart", (event) => {
      window.draggedElement = event.target
    })

    emptySlot.appendChild(div)
    display_stockpile()

    console.log(
      `Drew a ${drawnTile.color} ${drawnTile.number}. Tiles left: ${tiles.length}`
    )
  } else {
    alert("Your rack is full!")
  }
})

startGame()
