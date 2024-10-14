import React, { SyntheticEvent, useState } from "react";

type GuessProps = {
    text: string;
    score: number;
    answer: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    setScore: React.Dispatch<React.SetStateAction<number>>;
}


export function GuessInput({text, score, answer, setText, setScore}: GuessProps) {

    const [isRevealed, setRevealed] = useState(false);

    function handleSubmit(e: SyntheticEvent) { 
        e.preventDefault();
        if(!isRevealed) {
            if(text === answer) {
                setScore(score + 1);
              }
              else {
                console.log(text);
              }
        }
    }
    function handleHint(e:SyntheticEvent) {
        e.preventDefault();
        if(!isRevealed) {
            setText(answer);
            setRevealed(true);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
          <label for="guessText">Guess: </label>
          <input id="guessText" name="guessText" type="text" disabled={isRevealed} value={text} onChange={(e) => setText(e.target.value)}></input>
          <input type="submit" disabled={isRevealed}></input>
          <button disabled={isRevealed} onClick={handleHint}>Reveal Hint</button>
        </form>
    )
}