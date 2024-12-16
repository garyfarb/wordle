import styles from '../styles/Box.module.css'

function Box({ letter }){


    return(
        <div className={styles.box}>
            <p>{letter}</p>
        </div>
    )
}

export default Box