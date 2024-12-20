import styles from '../styles/Box.module.css'

function Box({ letter, status, updated }){
    const getBackgroundColor = () => {
        switch (status) {
            case 'green': return 'hsl(110, 40.70%, 50.40%)'
            case 'yellow': return 'rgb(240, 191, 76)'
            case 'grey': return 'hsl(0, 0.00%, 74.10%)'
            default: return 'rgb(240, 238, 235)'
        }
    }

    return(
        <div 
            className={styles.box}
            style={{ 
                backgroundColor: getBackgroundColor(), 
                border: updated ? `2px solid ${getBackgroundColor()}` :  '2px solid hsl(0, 1%, 73%)',
                color: updated ? 'white' : 'black'
                }}
            >
            <p>{letter}</p>
        </div>
    )
}

export default Box