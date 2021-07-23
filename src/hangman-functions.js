import puzzleEl from './index'

class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status='Playing'
        this.wrongLetters = []
    }
    get puzzle() {
        let puzzle = ''
        if(this.status === 'Playing') {
            this.word.forEach((letter) => {
                if(this.guessedLetters.includes(letter) || letter === ' ') {
                    puzzle += letter
                }
                else {
                    puzzle += '*'
                }
            })
        } else {
            this.word.forEach((letter) => {
                    puzzle += letter
            })
        }
        return puzzle
    }
    makeGuess(guess) {
        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes(guess)
        const isBadGuess = !this.word.includes(guess)
    
        if(this.status !== 'Playing') {
            return
        }
    
        if(isUnique) {
            this.guessedLetters.push(guess)
        }
    
        if(isUnique && isBadGuess) {
            this.remainingGuesses--
            this.wrongLetters.push(guess)
        }
    
        this.statusGame()
    }
    statusGame() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter=== ' ')
    
        if(this.remainingGuesses === 0) {
            this.status = 'Failed'
            puzzleEl.classList.add("puzzleLose")
        }
        else if(finished) {
            this.status = 'Finished'
            puzzleEl.classList.add("puzzleWin")
        }
        else {
            this.status = 'Playing'
        }
    }
}

export {Hangman as default}