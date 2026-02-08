console.log("Hello sweaty")
const orange = document.querySelectorAll(".orange-tile")
const green = document.querySelectorAll(".green-tile")
const blue = document.querySelectorAll(".blue-tile")
const red = document.querySelectorAll(".red-tile")

console.log(orange)
console.log(green)
console.log(blue)
console.log(red)

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

    console.log(`Current element: ${randomCard.textContent} orange tile`)
  }

  //-----------//
  const randomRed = () => {
    const randomId = Math.floor(Math.random() * red.length)
    const randomCard = red[randomId]

    console.log(`Current element: ${randomCard.textContent} red tile`)
  }

  const randomGreen = () => {
    const randomId = Math.floor(Math.random() * green.length)
    const randomCard = green[randomId]

    console.log(`Current element: ${randomCard.textContent} green tile`)
  }

  const randomBlue = () => {
    const randomId = Math.floor(Math.random() * blue.length)
    const randomCard = blue[randomId]

    console.log(`Current element: ${randomCard.textContent} blue tile`)
  }

  for (let index = 0; index < 3; index++) {
    randomOranges()
    randomRed()
    randomGreen()
    randomBlue()
  }
} //end of randomize function for each tile

const firstPlayerRack = []
const secondPlayerRack = []

randomize()
