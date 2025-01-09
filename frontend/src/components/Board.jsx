import { useState, useRef } from 'react'
import Row from './Row.jsx'
import Keyboard from './Keyboard.jsx'
import styles from '../styles/Board.module.css'
import Modal from './Modal.jsx'
import { getRandomWord } from '../utils/wordSelector.js'

function Board({ wordle }){
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

    const resetKeyBoardState = () => {
        const letters = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('')
        const keyDefaultColor = 'hsl(0, 0%, 83%)'
        const initialState = {}
        letters.forEach(letter => {
            initialState[letter] = keyDefaultColor
        })
        return initialState
    }

    const [keyboardState, setKeyboardState] = useState({})

    const targetWordRef = useRef(wordle)
    const isCompleteRef = useRef(0) // 0 -> currently playing, 1 -> game won, 2 -> game lost
    const currentRowRef = useRef(0)  // current row
    const currentColRef = useRef(0)  // current coloumn

    const [openModal, setOpenModal] = useState(false)

    const updateGuess = (letter) => {
        const updatedGuess = [...guesses]
        updatedGuess[currentRowRef.current][currentColRef.current].letter = letter
        return updatedGuess
    } 

    const handleEnter = () => {
        if (currentColRef.current === 5 && isCompleteRef.current === 0) {  // can only enter once the row has been filled out

            const letterMap = new Map()  //count of each letter in the target word 
            let countGreen = 0
            const updatedKeyboardState = { ...keyboardState }

            for (const targetLetter of targetWordRef.current) {
                letterMap.set(targetLetter, (letterMap.get(targetLetter) || 0) + 1)
            }

            const updatedRow = [...guesses[currentRowRef.current]]

            // first pass: check for all green letters
            for (let i = 0; i < targetWordRef.current.length; i++) {
                if (updatedRow[i].letter === targetWordRef.current[i]) {
                    updatedRow[i] = {
                        ...updatedRow[i],
                        color: 'green',
                        isUpdated: true
                    }
                    updatedKeyboardState[updatedRow[i].letter] = 'hsl(110, 40.70%, 50.40%)'
                    countGreen += 1
                    // update letter map for number of green positions for a letter remaining
                    letterMap.set(updatedRow[i].letter, letterMap.get(updatedRow[i].letter) - 1)
                }
            }

            // check if game is won by counting number of greens
            if (countGreen === 5) {
                isCompleteRef.current = 1
                setOpenModal(true)
                console.log('Game has been won')
            }

            // check for any yellow letters
            for (let i = 0; i < targetWordRef.current.length; i++) {
                if (updatedRow[i].color !== 'green') {
                    // account for any repeated yellow letters
                    if (targetWordRef.current.includes(updatedRow[i].letter) && letterMap.get(updatedRow[i].letter) > 0) {
                        letterMap.set(updatedRow[i].letter, letterMap.get(updatedRow[i].letter) - 1)
                        updatedRow[i] = {
                            ...updatedRow[i],
                            color: 'yellow',
                            isUpdated: true
                        }
                        if (updatedKeyboardState[updatedRow[i].letter] !== 'hsl(110, 40.70%, 50.40%)') {
                            updatedKeyboardState[updatedRow[i].letter] = 'rgb(240, 191, 76)'
                        }
                    }
                    else{
                        updatedRow[i] = {
                            ...updatedRow[i],
                            color: 'grey',
                            isUpdated: true
                        }
                        if (!updatedKeyboardState[updatedRow[i].letter]) {
                            updatedKeyboardState[updatedRow[i].letter] = 'hsl(0, 0%, 63%)'
                        }
                    }
                }
            }
    
            const updatedGuesses = [...guesses]
            updatedGuesses[currentRowRef.current] = updatedRow
            setGuesses(updatedGuesses)
            setKeyboardState(updatedKeyboardState)

            currentRowRef.current += 1
            currentColRef.current = 0
        }
        
        if (currentRowRef.current === 6 && isCompleteRef !== 1) {
            console.log('Game has been lost')
            isCompleteRef.current = 2
            setOpenModal(true)
        }
    }

    const handleBackSpace = () => {
        if (currentColRef.current > 0 && currentRowRef.current < 6 && isCompleteRef.current === 0) {
            currentColRef.current -= 1
            const updatedGuess = updateGuess('')
            setGuesses(updatedGuess)
        } 
    }

    const handleLetterClick = (letter) => {
        if (currentColRef.current < 5 && currentRowRef.current < 6 && letter.length === 1 && isCompleteRef.current === 0) {
            const updatedGuess = updateGuess(letter)
            setGuesses(updatedGuess)
            currentColRef.current += 1
            console.log(`letter: ${letter}, col: ${currentColRef.current}, row: ${currentRowRef.current}`)
        }
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
        setKeyboardState({})
        currentRowRef.current = 0
        currentColRef.current = 0
        isCompleteRef.current = 0
        targetWordRef.current = Array.from(getRandomWord().toUpperCase())
        console.log(`New Wordle: ${targetWordRef.current}`)
        setOpenModal(false)
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
                <Keyboard onLetterClick={handleLetterClick} onEnter={handleEnter} onBackSpace={handleBackSpace} keyboardState={keyboardState}/>
            </div>
            <div className={styles.restartContainer}>
                <button className={styles.restartButton} onClick={handleRestart}>New Game</button>
            </div>
            <Modal showModal={openModal} onClose={() => setOpenModal(false)} completion={isCompleteRef.current} numGuesses={currentRowRef.current} onPlayAgain={handleRestart} wordle={targetWordRef.current}/>
        </div>
    )
}

export default Board