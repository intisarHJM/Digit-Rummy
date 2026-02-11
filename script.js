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

const turns = () => {
  if (currentPlayer === 0) {
    currentPlayer = 1
    player2_turn()
    turnHead.textContent = `Player 2 turn`
  } else {
    currentPlayer = 0
    player1_turn()
    turnHead.textContent = `Player 1 turn`
  }
}

//console.log(sets)

let draggedObj = null // To store the object {number, color}
window.draggedElement = null // To store the actual HTML div element
let originalOwner = null; //who is the owner of the rejected tile

const player1_turn = () => {
  newArray.forEach((item) => {
    const div = document.createElement("div")
    div.setAttribute

    // classes of CSS applies the color
    div.classList.add("tile", `${item.color}-tile`)
    div.textContent = item.number === "joker" ? "☺" : item.number //if it's a joker give the smiley face if not just give the number instead
    div.draggable = true

    // Drag Start: Capture the element and the data
    div.addEventListener("dragstart", () => {
      draggedObj = item
      window.draggedElement = div // Store the <div> here
      originalOwner=0  //the tile belongs to p1
      div.classList.add("dragging")
    })

    for (let card of player1) {
      if (card.children.length === 0) {
        card.appendChild(div)
        break
      }
    }
  })
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
      draggedObj = item
      window.draggedElement = div // Store the <div> here
      originalOwner=1 //the tile belongs to p2
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

// 3. Drop Logic on the Main Board
sets.forEach((setSlot) => {
  setSlot.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  setSlot.addEventListener("drop", (event) => {
    event.preventDefault();

    if (window.draggedElement && draggedObj) {
      // 1. Put the tile in the box
      setSlot.appendChild(window.draggedElement);

      // 2. Get all tiles in THIS box to check them
      const tilesInThisSet = Array.from(setSlot.children);

      // 3. If there's more than one tile, check if the new one matches the last one
      if (tilesInThisSet.length >= 3) {
        const currentTileEl = window.draggedElement;
        const prevTileEl = tilesInThisSet[tilesInThisSet.length - 2];

        // Get numbers from the text inside the div
        const currentNum = Number(currentTileEl.textContent);
        const prevNum = Number(prevTileEl.textContent);

        // Get colors by checking the classList
        const getCurrentColor = () => {
            if (currentTileEl.classList.contains("orange-tile")) return "orange";
            if (currentTileEl.classList.contains("green-tile")) return "green";
            if (currentTileEl.classList.contains("blue-tile")) return "blue";
            if (currentTileEl.classList.contains("red-tile")) return "red";
        };
        const getPrevColor = () => {
            if (prevTileEl.classList.contains("orange-tile")) return "orange";
            if (prevTileEl.classList.contains("green-tile")) return "green";
            if (prevTileEl.classList.contains("blue-tile")) return "blue";
            if (prevTileEl.classList.contains("red-tile")) return "red";
        };

        const isConsecutive = currentNum === prevNum + 1;
        const isSameColor = getCurrentColor() === getPrevColor();
        const isSameNumber = currentNum === prevNum;
        const isDiffColor = getCurrentColor() !== getPrevColor();

        // The Rummy Rule
        let isMoveValid = (isSameColor && isConsecutive) || (isSameNumber && isDiffColor);

        if (!isMoveValid) {
          alert("Invalid Move!");

          // Use our memory variable to find the right rack
          let ownerRack = (originalOwner === 0) ? player1 : player2;

          for (let slot of ownerRack) {
            if (slot.children.length === 0) {
              slot.appendChild(window.draggedElement);
              break;
            }
          }
        }
      }

      // Clear memory for next drag
      window.draggedElement = null;
      draggedObj = null;
    }
  });
});

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
  //console.log(tiles)
}

//startGame()
