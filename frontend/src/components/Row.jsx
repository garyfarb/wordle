import Box from './Box.jsx'
import styles from '../styles/Row.module.css'

function Row(){

    return(
        <div className={styles.row}>
            <Box />
            <Box />
            <Box />
            <Box />
            <Box />
        </div>
    )
}

export default Row