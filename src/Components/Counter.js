import { useEffect, useState } from "react";

export default function Counter({ started, maxtime, onFinished }) {
  const [timeleft, setTime] = useState(maxtime);

  useEffect(() => {
    function Reset() {
      onFinished();
      setTime(maxtime);
    }
  
    if (started) {
      const newTim = setInterval(() => {
        setTime((t) => t > 1000 ?  t -= 1000 : Reset());
      }, 1000);
      return () => {
        clearInterval(newTim);
      }
    }
  }, [started, maxtime, onFinished]);


  return (
    <h3 className="col-md-6 text-right">
      TIME: <span className="text-info">{ToSeconds(timeleft)}</span>
    </h3>
  );

  function ToSeconds(time) {
    const date = new Date(time);
    return `${date.getMinutes()}:${String(date.getSeconds()).padStart(2, "0")}`;
  }
}
