import Box from './Box.jsx'
import styles from '../styles/Row.module.css'

function Row({ rowEntry }){

    return(
        <div className={styles.row}>
            {rowEntry.map((guess, index) => (
                <Box key={index} letter={guess.letter} status={guess.color} updated={guess.isUpdated}/>
            ))}
        </div>
    )
}

export default Row