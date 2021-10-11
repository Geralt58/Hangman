import Hangman from "./hangman-functions"
import getPuzzle from "./requests"

const puzzleEl = document.querySelector("#puzzle")
const guessesEl = document.querySelector("#guesses")
const guessLettersEl = document.querySelector("#guess-letters")
const reminderEl = document.querySelector("#reminder")
let game

document.querySelector("#start").addEventListener("click", (e) => {
   let wordCount = document.querySelector("#word-count").value
   let difficulty = document.querySelector("#difficulty").value
   e.target.textContent = "Reset"
   e.target.classList.remove("start")
   e.target.classList.add("reset")

   startGame(wordCount, difficulty)

   window.addEventListener("keypress", (e) => {
      const guess = String.fromCharCode(e.charCode)
      game.makeGuess(guess)
      render()
   })
})

const render = () => {
   puzzleEl.innerHTML = ""
   guessesEl.innerHTML = ""
   guessLettersEl.innerHTML = ""
   reminderEl.innerHTML = ""
   guessesEl.textContent = `Guesses remaining: ${game.remainingGuesses}`
   if (game.guessedLetters.length > 0) {
      guessLettersEl.textContent =
         "Wrong Guesses: " + game.wrongLetters.join(" ")
   }
   game.puzzle.split("").forEach((letter) => {
      const letterEl = document.createElement("span")
      letterEl.textContent = letter
      puzzleEl.appendChild(letterEl)
   })
   if (game.guessedLetters.length === 0) {
      reminderEl.textContent = "(press any key to start guessing!)"
   }
}

const startGame = async (wordCount, difficulty) => {
   const puzzle = await getPuzzle(wordCount)
   game = new Hangman(puzzle, difficulty)
   render()
   puzzleEl.classList.remove("puzzleLose")
   puzzleEl.classList.remove("puzzleWin")
}

export { puzzleEl as default }
