import LetterBox from "./LetterBox.jsx";
import styles from '../styles/Keyboard.module.css'

function KeyboardRow(){
    const firstRowLetters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    const secondRowLetters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
    const thirdRowLetters = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BKSPC']


    return(
        <div className={styles.keyboard}>
            <div className={styles.keyboardRow}>
                {firstRowLetters.map((l, index) => (
                    <LetterBox key={index} letter={l}/>
                ))}
            </div>
            <div className={styles.keyboardRow}>
                {secondRowLetters.map((l, index) => (
                    <LetterBox key={index} letter={l}/>
                ))}
            </div>
            <div className={styles.keyboardRow}>
                {thirdRowLetters.map((l, index) => (
                    <LetterBox key={index} letter={l}/>
                ))}
            </div>

            
        </div>
    )
}

export default KeyboardRow