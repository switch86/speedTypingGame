import React from 'react'
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(60)
  const [text, setText] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  
  const textboxReference = React.useRef(null)
  
  React.useEffect(() => {
      if (isPlaying && time > 0) {
          setTimeout(() => {
            setTime(prevTime => prevTime -1)
          }, 1000)
      } else if (time === 0) {
        setIsPlaying(false)
      }
    }, [time, isPlaying])

  React.useEffect(() => {
      if (isPlaying) {
        textboxReference.current.focus();
  }}, [isPlaying])

  function handleChange(event) {
    if (time > 0 && isPlaying) {
      setText(event.target.value)
      setCount(WordCount(text))
    }
  }

  function WordCount(str) { 
    return str.trim().split(" ").filter(word => word !== "").length;
  }

  function handleClickStart(e) {
      e.preventDefault()
      console.log(time)
      setText("")
      setCount(0)
      setIsPlaying(true)
  }

  function notPlaying() {
    console.log("not playing")
  }
  function handleClickStop(e) {
    e.preventDefault()
    setIsPlaying(false)
  }
  function changeTime(event) {
    if (event.target.value >= 0) {
      setTime(event.target.value)
    } else if (event.target.value < 0) {
      event.target.value = 0
    }
  }
  
  return (
    <div className="App">
            <h1>How fast do you type?</h1>
            <form>
              <label htmlFor="timeSelected">Length of Test: </label>
              {/* <NumericInput min={0} max={2000} value={60} /> */}
              <input type="number"  onChange={isPlaying? notPlaying : changeTime} name="timeSelected" value={time}></input> 
              <h4>Time remaining: {time}</h4>
              <textarea 
                onChange={isPlaying ? handleChange : notPlaying}
                name="typedInput"
                value={text}
                ref={textboxReference}
                disabled={!isPlaying}/>
                <div className="buttons">
                  <button className="start" onClick={handleClickStart}>Start</button>
                  <button className="stop" onClick={handleClickStop}>Stop</button>
                </div>
            </form>
            <h1>Word count: {count}</h1>
    </div>
  )
}

export default App