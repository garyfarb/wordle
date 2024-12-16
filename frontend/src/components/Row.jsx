import Box from './Box.jsx'
import styles from '../styles/Row.module.css'

function Row({ rowLetters }){

    return(
        <div className={styles.row}>
            {rowLetters.map((letter, index) => (
                <Box key={index} letter={letter}/>
            ))}
        </div>
    )
}

export default Row