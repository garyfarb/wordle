import Row from './components/Row.jsx'
import Keyboard from './components/Keyboard.jsx'
import Board from './components/Board.jsx'

function App() {

  return(
    <div>
      <div className='header'>
        <h1>WORDLE</h1> 
      </div>
      <hr></hr>
      <div>
        <Board />
      </div>
    </div> 
  )

}

export default App
