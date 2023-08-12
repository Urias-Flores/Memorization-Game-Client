import { useEffect, useState } from 'react'
import Title from './components/title'
import Countdown from './components/countdown'
import './styles/App.css'

function App() {
  const [difficulty, setDifficulty] = useState('Easy')
  const [stage, setStage] = useState(1)
  const [level, setLevel] = useState(1)

  const [time, setTime] = useState(3)

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

  useEffect(() => {
    if(menu === 1){
      
    }
  }, [menu])

  return (
    <>
      {
        menu === 0 ?
        (
          <>
            <Title />

            <div class="buttons">
              <button class="button" onClick={ () => { setMenu(1) } }>
                Play
              </button>

              <button class="button" onClick={ () => configureDifficulty() }>
                Difficulty: {difficulty}
              </button>

              <a class="button" href='https://github.com/Urias-Flores/Memorization-Game-Server'>Go to repository</a>
            </div>
          </>
        ) : 
        (
          <>
            <Title />
            
           

            <div className='information'>
              <p>Difficulty: {difficulty}</p>
              <p>Stage: {stage}</p>
              <p>Level: {level}</p>
            </div>

            <Countdown />

            <button class="button" onClick={ () => { setMenu(0) } }>
                  Volver
            </button>
          </>
        )
      }
      
    </>
    
  )
}

export default App
