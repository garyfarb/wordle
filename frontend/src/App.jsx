import Row from './components/Row.jsx'
import Keyboard from './components/Keyboard.jsx'

function App() {

  return(
    <div>
      <div className='header'>
        <h1>WORDLE</h1> 
      </div>
      <hr></hr>
      <div>
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
      <div className='keyboard-container'>
        <Keyboard />
      </div>
    </div> 
  )

}

export default App
