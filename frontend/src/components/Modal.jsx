import styles from '../styles/Modal.module.css'
import Confetti from 'react-confetti'


function Modal({ showModal, onClose, completion, numGuesses, onPlayAgain, wordle }){

    const formatTries = () => numGuesses > 1 ? 'tries' : 'try'

    if (!showModal) return null

    let content

    if (completion === 1) {
        content = (
            <>
                <Confetti width={450} height={350} recycle={false} />
                <div className={styles.header}>
                    <h2>🎉Congrats!🎉</h2>
                </div>
                <div className={styles.body}>
                    <p>You solved the Wordle in <b>{numGuesses}</b> {formatTries()}</p>
                </div>
            </>
        )
    }

    else {
        content = (
            <>
                <div className={styles.header}>
                    <h2>😞Sorry!</h2>
                </div>
                <div className={styles.body}>
                    <p>You were not able to solve the Wordle</p>
                    <p>The Wordle was: <b>{wordle.join("")}</b></p>
                </div>
            </>
        )
    }

    return(
        <div>
            <div className={styles.darkBG}>
                <div className={styles.modalContainer}>
                    <button onClick={onClose} className={styles.closeButton}> X </button>
                    <div className={styles.content}>
                        {content}
                    </div>
                    <button className={styles.playAgainButton} onClick={onPlayAgain}>Play Again</button>
                </div>
            </div>
        </div>
    )
}

export default Modal