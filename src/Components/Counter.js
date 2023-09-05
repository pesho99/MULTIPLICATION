import { useEffect, useState } from "react";

export default function Counter({ started, maxtime, onFinished }) {
  const [timeleft, setTime] = useState(maxtime);

  useEffect(() => {
    if (started) {
      const newTim = setInterval(() => {
        setTime((t) => (t > 1000 ? (t -= 1000) : (t = 0)));
      }, 1000);
      setTimeout(() => Reset(newTim), maxtime);
    }
  }, [started, maxtime]);

  function Reset(timer) {
    clearInterval(timer);
    onFinished();
    setTime(maxtime);
  }

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
