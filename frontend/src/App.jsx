import Row from './components/Row.jsx'
import Keyboard from './components/Keyboard.jsx'
import Board from './components/Board.jsx'
import { getRandomWord } from './utils/wordSelector.js'

function App() {
  const targetWord = Array.from(getRandomWord().toUpperCase())
  
  console.log(`Selected Word: ${targetWord}`)

  return(
    <div>
      <div className='header'>
        <h1>WORDLE</h1> 
      </div>
      <hr></hr>
      <div>
        <Board wordle={targetWord}/>
      </div>
    </div> 
  )

}

export default App
