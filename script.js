console.log("Hello sweaty")
const orange = document.querySelectorAll(".orange-tile")
const green = document.querySelectorAll(".green-tile")
const blue = document.querySelectorAll(".blue-tile")
const red = document.querySelectorAll(".red-tile")
const smileyJocker = document.querySelectorAll(".smiley-tile")
const playerRacks = document.querySelectorAll(".player-rack")
const player1 = document.querySelectorAll(".p1-tiles")
const player2 = document.querySelectorAll(".p2-tiles")

/* console.log(orange)
console.log(green)
console.log(blue)
console.log(red) */

//.player-rack -> #player-1-rack | #player-2-rack
//stockpile
//.tile-group
//main-board

const startButton = document.querySelectorAll("button")
console.log(startButton[1])

const start = startButton[1].textContent

//random the tiles then add them to an empty array distreputing them on the players

const randomize = () => {
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
console.log(newArray)


//newArray will return the randomized cards in objects array
player1.forEach((tile1, index1) => {
  tile1.classList.add(newArray[index1].color) //newArray[index1].color
  tile1.textContent = newArray[index1].number +` `+ newArray[index1].color
})

player2.forEach((tile2, index2) => {
  tile2.classList.add(newArray2[index2].color) //newArray[index1].color
  tile2.textContent = newArray2[index2].number +` `+ newArray2[index2].color
})
