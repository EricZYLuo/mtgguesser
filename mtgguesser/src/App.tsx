

import { SyntheticEvent, useState } from 'react';
import './App.css'

import { StatsDisplay } from './StatsDisplay';
import { GuessInput } from './GuessInput';

function App() {

  const [score, setScore] = useState(0); 
  const [text, setText] = useState("");

  const key = "abc";

  function handleSubmit(e: SyntheticEvent) { 
    e.preventDefault();
    if(text === key) {
      setScore(score + 1);
    }
    else {
      console.log(text);
    }
    
  }

  return (
    <>
      <div>
        <h1>MTG Guesser</h1>
        <StatsDisplay score={score}></StatsDisplay>
        <div>

        </div>

        <GuessInput text={text} score={score} answer={key} setText={setText} setScore={setScore}></GuessInput>
      </div>

    </>
  )
}

export default App
