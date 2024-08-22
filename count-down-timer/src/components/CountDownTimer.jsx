import { useEffect, useState } from "react";

export default function CountDownTimer() {
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });

  const [isrunning, setIsrunning] = useState(false);

  const handleChange = (e, field) => {
    const value = parseInt(e.target.value, 10) || 0;

    const copyTime = { ...time };
    copyTime[field] = value;
    copyTime["minute"] += Math.floor(copyTime["second"] / 60);
    copyTime["second"] = copyTime["second"] % 60;
    copyTime["hour"] += Math.floor(copyTime["minute"] / 60);
    copyTime["minute"] = copyTime["minute"] % 60;
    setTime(copyTime);

    console.log(value, field);
  };

  const handleStart = () => {
    setIsrunning(!isrunning);
  };

  const handleReset = () => {
    setIsrunning(false);
    setTime({
      hour: 0,
      minute: 0,
      second: 0,
    });
  };

  useEffect(() => {
    let id;

    if (isrunning) {
      if (time.hour == 0 && time.minute == 0 && time.second == 0) {
        setIsrunning(false);
        return;
      }
      id = setInterval(() => {
        setTime((prevTime) => {
          // console.log("ho");
          copyTime = { ...prevTime };
          copyTime.second--;
          if (copyTime.second < 0) {
            copyTime.minute--;
            copyTime.second = 59;
            if (copyTime.minute < 0) {
              copyTime.hour--;
              copyTime.minute = 59;
              if (copyTime.hour < 0) {
                clearInterval(id);
                return { hour: 0, minute: 0, second: 0 };
              }
            }
          }
          return copyTime;
        });
      }, 100);
    }

    return () => {
      clearInterval(id);
    };
  }, [isrunning]);

  return (
    <div className="container">
      <div className="time_container">
        <input
          disabled={isrunning}
          value={time.hour}
          onChange={(e) => handleChange(e, "hour")}
          type="text"
          placeholder="HH"
        />
        :
        <input
          disabled={isrunning}
          value={time.minute}
          onChange={(e) => handleChange(e, "minute")}
          type="text"
          placeholder="MM"
        />
        :
        <input
          disabled={isrunning}
          value={time.second}
          onChange={(e) => handleChange(e, "second")}
          type="text"
          placeholder="SS"
        />
      </div>
      <div className="btn_container">
        <button onClick={handleStart}>{isrunning ? "pause" : "start"}</button>
        <button onClick={handleReset}>reset</button>
      </div>
    </div>
  );
}
