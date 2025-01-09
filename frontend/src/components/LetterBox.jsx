import styles from '../styles/LetterBox.module.css'

function LetterBox({ letter, onClickFunc, color }){
    const isSpecialKey = letter === 'ENTER' || letter === 'BKSPC'

    return(
        <div>
            <button 
                className={`${styles.letterBox} ${isSpecialKey ? styles.specialKey : ''}`}
                onClick={() => onClickFunc(letter)}
                style={{ backgroundColor: color || 'hsl(0, 0%, 83%)' }}
            >
                {letter}
            </button>
        </div>
    )
}

export default LetterBox