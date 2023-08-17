import { useEffect, useState } from 'react'

import Title from './components/title'
import MainMenu from "./components/mainMenu.jsx";
import Footer from "./components/footer.jsx";
import Countdown from './components/countdown';
import Sequencer from "./components/sequencer.jsx";
import InGame from "./components/inGame.jsx";
import Verify from "./components/verify.jsx";

import { getImages } from "./models/image.js";
import { getGameConfig } from "./server/gameConfig.js";

import './styles/App.css'

function App() {
  const [difficulty, setDifficulty] = useState('Easy');
  const [stage, setStage] = useState(1);
  const [level, setLevel] = useState(1);

  const [imagesInGame, setImagesInGame] = useState([]);
  const [displayTime, setDisplayTime] = useState(3000);
  const [remainingTime, setRemainingTime] = useState(10000);
  const [remainingTimeState, setRemainingTimeState] = useState(10000);

  const [imagesSelected, setImagesSelected] = useState([]);
  const [display, setDisplay] = useState('counter');
  const [count, setCount] = useState(3)
  const [menu, setMenu] = useState(0)
  const [isCorrect, setIsCorrect] = useState(true);

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

  function getGameConfiguration(){
    getGameConfig(difficulty, stage, level).then( values => {
      setImagesInGame( getImages( values.images ) )
      setDisplayTime( values.display_time * 1000 )
      setRemainingTime( values.response_time * 1000 )
    })
  }

  useEffect(() => {
    if(display === 'counter'){
      getGameConfiguration()

      if(level === 5){
        setStage(stage + 1)
        setLevel(1)
      } else {
        setLevel(level + 1)
      }
    }
  }, [display]);

  useEffect(() => {
    if(display === 'counter'){
      getGameConfiguration()
    }
  }, [difficulty]);


  useEffect(() => {
    if(display === 'counter'){
      setRemainingTimeState(remainingTime)
    }
  }, [display, remainingTime]);

  useEffect(() => {
    if(display === 'playing'){
      const interval = setInterval( () => {
        setRemainingTimeState(remainingTimeState - 1000)
      }, 1000)

      if(remainingTimeState === 0){
        setCount(3)
        setDisplay('verify')
      }

      return () => clearInterval(interval)
    }
  }, [display, remainingTimeState]);

  return (
    <main className='container'>
      <Title />
      {
        menu === 0 ?
        (
          <MainMenu
            difficulty={difficulty}
            configureDifficulty={configureDifficulty}
            setMenu={setMenu}
            setDisplay={setDisplay}
          />
        ) :
        (
          <>
            <div className='information'>
              <p>Difficulty: {difficulty}</p>
              <p>Stage: {stage}</p>
              <p>Level: {stage === 1 ? level - 1 : level}</p>
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
                  images={imagesInGame}
                  displayTime={displayTime}
                  setDisplay={setDisplay}
                />
              }

              {
                display === 'playing' &&
                <InGame
                  remainingTime={remainingTime}
                  setDisplay={setDisplay}
                  setCount={setCount}
                  imagesSelected={imagesSelected}
                  setImagesSelected={setImagesSelected}
                  imagesInGame={imagesInGame}
                />
              }

              {
                display === 'verify' &&
                <Verify
                  isCorrect={isCorrect}
                  setIsCorrect={setIsCorrect}
                  setCount={setCount}
                  setDisplay={setDisplay}
                  imagesSelected={imagesSelected}
                  imagesInGame={imagesInGame}
                />
              }
            </div>

            <div className='actions'>
              <button className="button" onClick={ () => {
                  setMenu(0);
                  setCount(3)
                  setLevel(1);
                  setStage(1);
                  setImagesSelected([]);
                }
              }>
                Volver
              </button>

              <button className="button" onClick={ () => {
                  setCount(3);
                  setDisplay('counter');
                  setLevel(1);
                  setStage(1);
                  setImagesSelected([]);
                }
              }>
                Reiniciar juego
              </button>

              {
                display === 'playing' &&
                <button
                  className="button"
                  onClick={ () => {
                      setDisplay('verify')
                    }
                  }>
                  Comprobar
                </button>
              }

              {
                display === 'verify' && isCorrect &&
                <button
                  className="button"
                  onClick={ () => {
                      setCount(3);
                      setImagesSelected([]);
                      setDisplay('counter');
                    }
                  }>
                  Siguiente
                </button>
              }
            </div>
          </>
        )
      }
      <Footer />
    </main>
  )
}

export default App
