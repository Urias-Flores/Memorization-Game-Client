import { useEffect } from 'react'

export default function Countdown({ count, setCount }) {

    useEffect(() => {
      if (count === 0) return;

      const interval = setInterval(() => {
        setCount(count - 1);
      }, 1000);

      return () => clearInterval(interval);
    }, [count]);

    return (
      <div className="countdown">
        { count > 0 ? <p>{count}</p> : <p></p> }

        {
        count === 0 &&
          <p>Cargando imagenes</p>
        }
      </div>
    );
  }
