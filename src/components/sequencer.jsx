import { useEffect, useState } from "react";

export default function Sequencer ({ images = [], displayTime, setDisplay}){
  const [urlState, setUrlState] = useState('');
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter === images.length) {
        setDisplay('playing')
        return
      }

      setUrlState( images[counter].url )
      setCounter(counter + 1);
    }, displayTime);

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <div className='sequencer'>
      {
        urlState.length === 0
        ?
          <div className="countdown">
            <p>¡Inicio!</p>
          </div>

        :
          <img src={urlState} alt="sequecer"/>
      }
    </div>
  )
}
