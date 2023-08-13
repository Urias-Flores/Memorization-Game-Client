import { useState, useEffect } from 'react'

import Title from './components/title'
import Footer from "./components/footer.jsx";
import Countdown from './components/countdown'
import InGame from "./components/inGame.jsx";
import Sequencer from "./components/sequencer.jsx";

import {TestImages} from "./models/image.js";

import './styles/App.css'




function App() {
  const [difficulty, setDifficulty] = useState('Easy');
  const [stage, setStage] = useState(1);
  const [level, setLevel] = useState(1);
  const [remainingTime, setRemainingTime] = useState(10000);
  const [remainingTimeState, setRemainingTimeState] = useState(10000);

  const [imagesSelected, setImagesSelected] = useState([]);
  const [display, setDisplay] = useState('counter');
  const [count, setCount] = useState(3)


  const [menu, setMenu] = useState(0)

  const configureDifficulty = () => {
    switch(difficulty){
      case 'Easy':
        setDifficulty('Medium')
        break;
      case 'Medium':
        setDifficulty('Hard')
        break;
      case 'Hard':
        setDifficulty('Easy')
        break;
    }
  }

  return (
    <main className='container'>
      <Title />
      {
        menu === 0 ?
        (
          <>


            <div className="menu">
              <button className="button inicio" onClick={ () => { setMenu(1) } }>
                Play
              </button>

              <button className="button inicio" onClick={ () => configureDifficulty() }>
                Difficulty: {difficulty}
              </button>

              <a
                className="button inicio"
                href='https://github.com/Urias-Flores/Memorization-Game-Server'
              >
                Go to repository
              </a>
            </div>
          </>
        ) :
        (
          <>
            <div className='information'>
              <p>Difficulty: {difficulty}</p>
              <p>Stage: {stage}</p>
              <p>Level: {level}</p>
              <p>Remaining time: { remainingTimeState / 1000 }</p>
            </div>

            <div className='game-zone'>
              {
                display === 'counter' &&
                <Countdown
                  count={count}
                  setCount={setCount}
                  setDisplay={setDisplay}
                />
              }

              {
                display === 'sequence' &&
                <Sequencer
                  images={TestImages}
                  displayTime={3000}
                  setDisplay={setDisplay}
                />
              }

              {
                display === 'playing' &&
                <InGame
                  remainingTime={remainingTime}
                  setDisplay={setDisplay}
                  remainingTimeState={remainingTimeState}
                  setRemainingTimeState={setRemainingTimeState}
                  setCount={setCount}
                  imagesSelected={imagesSelected}
                  setImagesSelected={setImagesSelected}
                />
              }
            </div>

            <div className='actions'>
              <button className="button" onClick={ () => { setMenu(0) } }>
                Volver
              </button>

              <button className="button" onClick={ () => {
                  setImagesSelected([]);
                  setCount(3)
                  setDisplay('counter');
                }
              }>
                Reiniciar juego
              </button>

              <button className="button" onClick={ () => {  } }>
                Comprobar
              </button>
            </div>
          </>
        )
      }

      <Footer />
    </main>
  )
}

export default App
