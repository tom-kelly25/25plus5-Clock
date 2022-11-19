import "./App.css";

import React from "react";

function App() {
  const [displayTime, setDisplayTime] = React.useState(25 * 60);
  const [breakTime, setBreakTime] = React.useState(5 * 60);
  const [sessionTime, setsessionTime] = React.useState(25 * 60);
  const [timerOn, setTimerOn] = React.useState(false);
  const [onBreak, setOnBreak] = React.useState(false);
  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };
  const changeTime = (amount, type) => {
    if (type == "break") {
      if (breakTime <= 60 && amount < 0) {
        return;
      }
      setBreakTime((prev) => prev + amount);
    } else {
      if (sessionTime <= 60 && amount < 0) {
        return;
      }
      setsessionTime((prev) => prev + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  };
  const controlTime = () => {
    let breake = onBreak;

    if (!timerOn) {
      let interval = setInterval(() => {
        setDisplayTime((prev) => {
          if (prev <= 0 && !breake) {
            breake = true;
            setOnBreak(true);
            return breakTime;
          } else if (prev <= 0 && breake) {
            breake = false;
            setOnBreak(false);
            return sessionTime;
          }
          return prev - 1;
        });
      }, 1000);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (timerOn) {
      clearInterval(localStorage.getItem("interval-id"));
    }

    setTimerOn(!timerOn);
  };
  const restTime = () => {
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setsessionTime(25 * 60);
  };
  return (
    <div className="center-align">
      <h1>Pomodro Clock</h1>
      <div className="double_container">
        <Length
          title={"Break length"}
          changeTime={changeTime}
          type={"break"}
          time={breakTime}
          formatTime={formatTime}
        />
        <Length
          title={"Session length"}
          changeTime={changeTime}
          type={"session"}
          time={sessionTime}
          formatTime={formatTime}
        />
      </div>
      <h3>{onBreak ? "Break" : "Session"}</h3>
      <h1>{formatTime(displayTime)}</h1>
      <button className="btn-large deep-purple lighten-2" onClick={controlTime}>
        {timerOn ? (
          <i className="material-icons">pause_circle_filled</i>
        ) : (
          <i className="material-icons">play_circle_filled</i>
        )}
      </button>
      <button className="btn-large deep-purple lighten-2">
        <i className="material-icons" onClick={restTime}>
          autorenew
        </i>
      </button>
    </div>
  );
}
function Length({ title, changeTime, type, time, formatTime }) {
  return (
    <div>
      <h3>{title}</h3>
      <div className="time-sets">
        <button
          className="btn-small deep-purple lighten-2"
          onClick={() => changeTime(-60, type)}
        >
          <i className="material-icons">arrow_downward</i>
        </button>
        <h3>{formatTime(time)}</h3>
        <button
          className="btn-small deep-purple lighten-2"
          onClick={() => changeTime(60, type)}
        >
          <i className="material-icons">arrow_upward</i>
        </button>
      </div>
    </div>
  );
}

export default App;
