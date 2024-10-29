import React, { SyntheticEvent, useState } from "react";
import { cardObj } from "./CardDisplay";

type GuessProps = {
    guessType: string;
    score: number;
    data: cardObj;
    setScore: React.Dispatch<React.SetStateAction<number>>;
}


export function GuessInput({guessType, score, data, setScore}: GuessProps) {

    const [isRevealed, setRevealed] = useState(false);
    const [text, setText] = useState("");

    function handleSubmit(e: SyntheticEvent) { 
        e.preventDefault();
        if(!isRevealed) {
            if(guessType === "name") {
                if(text === data.name) {
                    setScore(score + 3);
                    setRevealed(true);
                }
                else {
                console.log(text);
                }
            }
            if(guessType === "set") {
                if(text === data.set || text === data.set_name) {
                    setScore(score + 1);
                    setRevealed(true);
                }
                else {
                console.log(text);
                }
            }
            if(guessType === "typeline") {
                if(text === data.type_line) {
                    setScore(score + 1);
                    setRevealed(true);
                }
                else {
                console.log(text);
                }
            }
            
        }
    }
    function handleHint(e:SyntheticEvent) {
        e.preventDefault();
        if(!isRevealed) {
            if(guessType === "name") {
                setText(data.name);
            }
            if(guessType === "set") {
                setText(data.set_name);
            }
            if(guessType === "typeline") {
                setText(data.type_line);
            }
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