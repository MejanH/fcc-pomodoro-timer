import Head from "next/head";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [second, setSecond] = useState(sessionLength * 60);
  const [boolSession, setBoolSession] = useState(true);
  const [player, setPlayer] = useState(false);

  const id = useRef(null);
  // let min = Math.floor(second / 60);
  // let currSec = second - min * 60;

  let result = new Date(new Date().setHours(0, 0, second, 0));

  function startTimer() {
    setIsRunning(true);
  }

  useEffect(() => {
    if (isRunning === true) {
      id.current = setInterval(() => {
        setSecond(second - 1);
      }, 1000);
    }
    return clearIntervalID;
  }, [isRunning, second]);

  function clearIntervalID() {
    clearInterval(id.current);
  }
  useEffect(() => {
    if (second === 0) {
      if (boolSession === true) {
        setSecond(breakLength * 60);
        setBoolSession(false);
      }
      if (boolSession === false) {
        setSecond(sessionLength * 60);
        setBoolSession(true);
      }

      setPlayer(true);
    }
  }, [second]);

  function stopTimer() {
    setIsRunning(false);
  }

  function incrBl() {
    if (breakLength < 60) {
      if (!isRunning) {
        setBreakLength(breakLength + 1);
      }
      if (!isRunning && !boolSession) {
        setSecond((breakLength + 1) * 60);
      }
    }
  }
  function dcrBl() {
    if (breakLength > 1) {
      if (!isRunning) {
        setBreakLength(breakLength - 1);
      }
      if (!isRunning && !boolSession) {
        setSecond((breakLength - 1) * 60);
      }
    }
  }
  function slIncr() {
    if (sessionLength < 60) {
      if (!isRunning) {
        setSessionLength(sessionLength + 1);
      }
      if (!isRunning && boolSession) {
        setSecond((sessionLength + 1) * 60);
      }
    }
  }
  function slDcr() {
    if (sessionLength > 1) {
      if (!isRunning) {
        setSessionLength(sessionLength - 1);
      }
      if (!isRunning && boolSession) {
        setSecond((sessionLength - 1) * 60);
      }
    }
  }
  const beep = useRef(null);
  useEffect(() => {
    beep.current = document.getElementById("beep") as HTMLMediaElement;
    if (player === true) {
      beep.current.play();
    }
  }, [player]);

  function reset() {
    setIsRunning(false);
    setSecond(25 * 60);
    setSessionLength(25);
    setBreakLength(5);
    setBoolSession(true);
    setPlayer(false);
    beep.current.pause();
    beep.current.currentTime = 0;
  }

  console.log(second);

  console.log(player);

  return (
    <div>
      <Head>
        <title>FCC Pomodor Timer Clock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="main-title">Pomodoro Timer</h1>
        <div className="timer">
          <div className="header">
            <div className="group1">
              <div id="break-label" className="bl">
                <h1>Break Length</h1>
                <div className="values">
                  <div id="break-increment" onClick={incrBl}>
                    <img src="./up.svg" />
                  </div>
                  <h1 id="break-length">{breakLength}</h1>
                  <div id="break-decrement" onClick={dcrBl}>
                    <img src="./down.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div className="group2">
              <div id="session-label" className="sl">
                <h1>Session Length</h1>
                <div className="values">
                  <div id="session-increment" onClick={slIncr}>
                    <img src="./up.svg" />
                  </div>
                  <h1 id="session-length">{sessionLength}</h1>
                  <div id="session-decrement" onClick={slDcr}>
                    <img src="./down.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="group3">
            <h1 className="title" id="timer-label">
              {boolSession === true ? "Session" : "Break"}
            </h1>
            <h1 className="time" id="time-left">
              {/* {min}:{currSec} */}
              {result.getHours() === 1
                ? `60:00`
                : result.toISOString().substr(14, 5)}
            </h1>
          </div>
          <div className="controls">
            {!isRunning ? (
              <div id="start_stop" className="playPause" onClick={startTimer}>
                <img src="./play.svg" />
              </div>
            ) : (
              <div id="start_stop" className="playPause" onClick={stopTimer}>
                <img src="./pause.svg" />
              </div>
            )}
            <div id="reset" className="reset" onClick={reset}>
              <img src="./reset.svg" />
            </div>
          </div>
        </div>

        <audio src="./water_message.mp3" preload="auto" id="beep" />
      </main>

      <footer className="footer">
        <p className="footer-text">
          by <strong>Muhammad Mejanul Haque</strong>
        </p>
      </footer>
    </div>
  );
}
