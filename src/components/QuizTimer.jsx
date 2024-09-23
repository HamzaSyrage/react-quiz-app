import { useEffect, useState } from "react";
export default function QuizTimer({ val, oneTimeEnd, status }) {
  const [remaining, setRemaining] = useState(val);
  useEffect(() => {
    const Timer = setTimeout(oneTimeEnd, val);
    if (status) {
      clearTimeout(Timer);
    }
    return () => {
      clearTimeout(Timer);
    };
  }, [status]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (status) {
        clearInterval(interval);
      }
      setRemaining((prev) => prev - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [status]);

  return (
    <progress
      value={remaining}
      className={status ? "answered" : null}
      max={val}
    ></progress>
  );
}
