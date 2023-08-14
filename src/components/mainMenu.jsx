export default function MainMenu ({ difficulty, configureDifficulty, setMenu, setDisplay }){
    return (
        <>
          <div className="menu">
            <button
              className="button inicio"
              onClick={ () => {
                  setMenu(1);
                  setDisplay('counter');
                }
              }>
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
    )
}
