import styles from '../styles/LetterBox.module.css'

function LetterBox(props){

    return(
        <div>
            <button className={styles.letterBox}>{props.letter}</button>
        </div>
    )
}

export default LetterBox