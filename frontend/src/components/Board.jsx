import { useState, useEffect, useRef } from 'react'
import Row from './Row.jsx'
import Keyboard from './Keyboard.jsx'

function Board(){
    const [guesses, setGuesses] = useState([
        [
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false}
        ],
        [
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false}
        ],
        [
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false}
        ],
        [
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false}
        ],
        [
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false}
        ],
        [
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false},
            {letter: '', color: 'rgb(240, 238, 235)', isUpdated: false}
        ]
    ])
    const currentRowRef = useRef(0)
    const currentColRef = useRef(0)

    const TARGET = ['A', 'B', 'B', 'A', 'C']

    const updateGuess = (letter) => {
        const updatedGuess = [...guesses]
        updatedGuess[currentRowRef.current][currentColRef.current].letter = letter
        return updatedGuess
    } 

    const handleEnter = () => {
        if (currentColRef.current === 5) {

            const letterMap = new Map()

            for (const targetLetter of TARGET) {
                letterMap.set(targetLetter, (letterMap.get(targetLetter) || 0) + 1)
            }

            const updatedRow = [...guesses[currentRowRef.current]]

            for (let i = 0; i < TARGET.length; i++) {
                if (updatedRow[i].letter === TARGET[i]) {
                    updatedRow[i] = {
                        ...updatedRow[i],
                        color: 'green',
                        isUpdated: true
                    }
                    letterMap.set(updatedRow[i].letter, letterMap.get(updatedRow[i].letter) - 1)
                }
            }


            for (let i = 0; i < TARGET.length; i++) {
                if (updatedRow[i].color !== 'green') {
                    if (TARGET.includes(updatedRow[i].letter) && letterMap.get(updatedRow[i].letter) > 0) {
                        letterMap.set(updatedRow[i].letter, letterMap.get(updatedRow[i].letter) - 1)
                        updatedRow[i] = {
                            ...updatedRow[i],
                            color: 'yellow',
                            isUpdated: true
                        }
                    }
                    else{
                        updatedRow[i] = {
                            ...updatedRow[i],
                            color: 'grey',
                            isUpdated: true
                        }
                    }
                }
            }
    
            const updatedGuesses = [...guesses]
            updatedGuesses[currentRowRef.current] = updatedRow
            setGuesses(updatedGuesses)

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
            <Row rowEntry={guesses[0]}/>
            <Row rowEntry={guesses[1]}/>
            <Row rowEntry={guesses[2]}/>
            <Row rowEntry={guesses[3]}/>
            <Row rowEntry={guesses[4]}/>
            <Row rowEntry={guesses[5]}/>
            <Keyboard onLetterClick={handleLetterClick} onEnter={handleEnter} onBackSpace={handleBackSpace}/>
        </div>
    )
}

export default Board