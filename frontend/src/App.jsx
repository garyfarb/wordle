import Row from './components/Row.jsx'
import Keyboard from './components/Keyboard.jsx'
import Board from './components/Board.jsx'

function App() {
  const wordle = ['A', 'D', 'E', 'L', 'E']

  return(
    <div>
      <div className='header'>
        <h1>WORDLE</h1> 
      </div>
      <hr></hr>
      <div>
        <Board targetWord={wordle}/>
      </div>
    </div> 
  )

}

export default App
