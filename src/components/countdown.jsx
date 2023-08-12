import { useEffect, useState } from 'react'

export default function Countdown() {
    const [count, setCount] = useState(3);
  
    useEffect(() => {
      if (count === 0) return;
  
      const interval = setInterval(() => {
        setCount(count - 1);
      }, 1000);
  
      return () => clearInterval(interval);
    }, [count]);
  
    return (
      <div className="countdown">
        {count > 0 ? count : '¡Tiempo fuera!'}
      </div>
    );
  }