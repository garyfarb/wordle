import { useState, useEffect, useRef } from 'react'
import Row from './Row.jsx'
import Keyboard from './Keyboard.jsx'

function Board(){
    const [guesses, setGuesses] = useState([
                                            ['', '', '', '', ''],
                                            ['', '', '', '', ''],
                                            ['', '', '', '', ''],
                                            ['', '', '', '', ''],
                                            ['', '', '', '', ''],
                                            ['', '', '', '', '']
                                            ])
    const currentRowRef = useRef(0)
    const currentColRef = useRef(0)

    const updateGuess = (letter) => {
        const updatedGuess = [...guesses]
        updatedGuess[currentRowRef.current][currentColRef.current] = letter
        return updatedGuess
    } 

    const handleEnter = () => {
        if (currentColRef.current === 5){
            currentRowRef.current += 1
            currentColRef.current = 0
        }
    }

    const handleBackSpace = () => {
        if (currentColRef.current > 0 && currentRowRef.current < 5) {
            currentColRef.current -= 1
            const updatedGuess = updateGuess('')
            setGuesses(updatedGuess)
        } 
    }

    const handleLetterClick = (letter) => {
        if (currentColRef.current < 5 && currentRowRef.current < 6 && letter.length === 1) {
            const updatedGuess = updateGuess(letter)
            setGuesses(updatedGuess)
            currentColRef.current += 1
        }
        console.log(`letter: ${letter}, length: ${letter.length}, col: ${currentColRef.current}, row: ${currentRowRef.current}`)
    }

    return (
        <div>
            <Row rowLetters={guesses[0]}/>
            <Row rowLetters={guesses[1]}/>
            <Row rowLetters={guesses[2]}/>
            <Row rowLetters={guesses[3]}/>
            <Row rowLetters={guesses[4]}/>
            <Row rowLetters={guesses[5]}/>
            <Keyboard onLetterClick={handleLetterClick} onEnter={handleEnter} onBackSpace={handleBackSpace}/>
        </div>
    )
}

export default Board