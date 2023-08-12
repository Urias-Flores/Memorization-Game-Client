import { useState } from 'react'
import Title from './components/title'
import Footer from "./components/footer.jsx";
import Countdown from './components/countdown'
import GridImagesAnswer from "./components/gridImagesAnswer.jsx";
import './styles/App.css'
import GridImagesSelection from "./components/gridImagesSelection.jsx";



function App() {
  const [difficulty, setDifficulty] = useState('Easy')
  const [stage, setStage] = useState(1)
  const [level, setLevel] = useState(1)

  const [imagesSelected, setImagesSelected] = useState([])
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
            </div>

            {
              count > 0 &&
              <div className="game-zone">
                <Countdown
                  count={count}
                  setCount={setCount}
                />
              </div>

            }


            {
              count === 0 &&
              <div className='game-zone'>
                <GridImagesAnswer
                  numberImages={6}
                  images={imagesSelected}
                  setImages={setImagesSelected}
                />

                <GridImagesSelection
                  imagesSelected={imagesSelected}
                  setImagesSelected={setImagesSelected}
                />
              </div>

            }

            <div className='actions'>
              <button className="button" onClick={ () => { setCount(3); setMenu(0) } }>
                Volver
              </button>

              <button className="button" onClick={ () => { setCount(3); setImagesSelected([]) } }>
                Reiniciar juego
              </button>

              <button className="button" onClick={ () => { setCount(3) } }>
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
