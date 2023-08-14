import { useEffect } from 'react'

export default function Countdown({ count, setCount, setDisplay }) {
    useEffect(() => {
      if (count === 0) {
        setDisplay('sequence')
        return
      }

      const interval = setInterval(() => {
        setCount(count - 1);
      }, 1000);

      return () => clearInterval(interval);
    }, [count]);

    return (
      <div className="countdown">
        { count > 0 ? <p>{count}</p> : <p></p> }
      </div>
    );
  }
