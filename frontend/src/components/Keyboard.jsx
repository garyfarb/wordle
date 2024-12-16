import LetterBox from "./LetterBox.jsx";
import styles from '../styles/Keyboard.module.css'

function KeyboardRow( {onLetterClick, onEnter, onBackSpace} ){
    const firstRowLetters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const secondRowLetters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const thirdRowLetters = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']


    return(
        <div className={styles.keyboard}>
            <div className={styles.keyboardRow}>
                {firstRowLetters.map((l, index) => (
                    <LetterBox key={index} letter={l} onClickFunc={onLetterClick}/>
                ))}
            </div>
            <div className={styles.keyboardRow}>
                {secondRowLetters.map((l, index) => (
                    <LetterBox key={index} letter={l} onClickFunc={onLetterClick}/>
                ))}
            </div>
            <div className={styles.keyboardRow}>
                <LetterBox letter='ENTER' onClickFunc={onEnter}/>
                {thirdRowLetters.map((l, index) => (
                    <LetterBox key={index} letter={l} onClickFunc={onLetterClick}/>
                ))}
                <LetterBox letter='BKSPC' onClickFunc={onBackSpace} />
            </div>            
        </div>
    )
}

export default KeyboardRow