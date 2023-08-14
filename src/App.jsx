import {useEffect, useState} from 'react'

import Title from './components/title'
import Footer from "./components/footer.jsx";
import Countdown from './components/countdown';
import Sequencer from "./components/sequencer.jsx";
import InGame from "./components/inGame.jsx";
import Verify from "./components/verify.jsx";

import {getRandomImages, TestImages} from "./models/image.js";

import './styles/App.css'
import MainMenu from "./components/mainMenu.jsx";
import {getGameConfig} from "./helpers/gameConfig.js";




function App() {
  const [difficulty, setDifficulty] = useState('Easy');
  const [stage, setStage] = useState(1);
  const [level, setLevel] = useState(1);

  const [imagesInGame, setImagesInGame] = useState(getRandomImages(4));
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

  useEffect(() => {
    function getGameConfiguration(){
      getGameConfig(difficulty, stage, level).then( values => {
        setImagesInGame( getRandomImages( values.num_images ) )
        setDisplayTime( values.display_time * 1000 )
        setRemainingTime( values.response_time * 1000 )

        if(level === 5){
          setStage(stage + 1)
          setLevel(1)
        } else {
          setLevel(level + 1)
        }
      })
    }

    if(display === 'counter'){
      getGameConfiguration()
    }
  }, [display]);

  useEffect(() => {
    setRemainingTimeState(remainingTime)

    const interval = setInterval( () => {
      setRemainingTimeState(remainingTimeState - 1000)
    }, 1000)

    if( remainingTimeState === 0 ) {
      setRemainingTimeState(10000)
      return;
    }

    return () => clearInterval(interval)
  }, [remainingTime]);

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
              <p>Level: {level-1}</p>
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
                  remainingTimeState={remainingTimeState}
                  setRemainingTimeState={setRemainingTimeState}
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
                  setMenu(0)
                  setLevel(1)
                  setStage(1)
                }
              }>
                Volver
              </button>

              <button className="button" onClick={ () => {
                  setImagesSelected([]);
                  setCount(3)
                  setDisplay('counter');
                  setLevel(1)
                  setStage(1)
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
                display === 'verify' && isCorrect === true &&
                <button
                  className="button"
                  onClick={ () => {
                      setDisplay('counter');
                      setImagesSelected([])
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
