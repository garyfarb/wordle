import { useState, useRef } from 'react'
import Row from './Row.jsx'
import Keyboard from './Keyboard.jsx'
import styles from '../styles/Board.module.css'

function Board({ targetWord }){
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

    const updateGuess = (letter) => {
        const updatedGuess = [...guesses]
        updatedGuess[currentRowRef.current][currentColRef.current].letter = letter
        return updatedGuess
    } 

    const handleEnter = () => {
        if (currentColRef.current === 5) {

            const letterMap = new Map()

            for (const targetLetter of targetWord) {
                letterMap.set(targetLetter, (letterMap.get(targetLetter) || 0) + 1)
            }

            const updatedRow = [...guesses[currentRowRef.current]]

            for (let i = 0; i < targetWord.length; i++) {
                if (updatedRow[i].letter === targetWord[i]) {
                    updatedRow[i] = {
                        ...updatedRow[i],
                        color: 'green',
                        isUpdated: true
                    }
                    letterMap.set(updatedRow[i].letter, letterMap.get(updatedRow[i].letter) - 1)
                }
            }


            for (let i = 0; i < targetWord.length; i++) {
                if (updatedRow[i].color !== 'green') {
                    if (targetWord.includes(updatedRow[i].letter) && letterMap.get(updatedRow[i].letter) > 0) {
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
        console.log(`letter: ${letter}, col: ${currentColRef.current}, row: ${currentRowRef.current}`)
    }

    const handleRestart = () => {
        const defaultColor = 'rgb(240, 238, 235)'

        const defaultGuesses = guesses.map((row) => 
            row.map(() => ({
                letter: '',
                color: defaultColor,
                isUpdated: false
            }))
        ) 

        setGuesses(defaultGuesses)
        currentRowRef.current = 0
        currentColRef.current = 0
    }

    return (
        <div>
            <div>
                <Row rowEntry={guesses[0]}/>
                <Row rowEntry={guesses[1]}/>
                <Row rowEntry={guesses[2]}/>
                <Row rowEntry={guesses[3]}/>
                <Row rowEntry={guesses[4]}/>
                <Row rowEntry={guesses[5]}/>
                <Keyboard onLetterClick={handleLetterClick} onEnter={handleEnter} onBackSpace={handleBackSpace}/>
            </div>
            <div className={styles.restartContainer}>
                <button className={styles.restartButton} onClick={handleRestart}>Restart</button>
            </div>
        </div>
    )
}

export default Board