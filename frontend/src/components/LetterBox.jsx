import styles from '../styles/LetterBox.module.css'

function LetterBox({ letter, onClickFunc }){
    const isSpecialKey = letter === 'ENTER' || letter === 'BKSPC'

    return(
        <div>
            <button 
                className={`${styles.letterBox} ${isSpecialKey ? styles.specialKey : ''}`}
                onClick={() => onClickFunc(letter)}
            >
                {letter}
            </button>
        </div>
    )
}

export default LetterBox