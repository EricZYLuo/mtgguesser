import React, { SyntheticEvent, useEffect, useState } from "react";
import { cardObj } from "./CardDisplay";

type GuessProps = {
    guessType: string;
    score: number;
    data: cardObj;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    completion: number;
    setCompletion: React.Dispatch<React.SetStateAction<number>>
}


export function GuessInput({guessType, score, data, setScore, completion, setCompletion}: GuessProps) {


    const [text, setText] = useState("");
    const [isRevealed, setRevealed] = useState(false);
    let labelText = "Guess ";
    let scoreAmount = 1;
    let answer = "";
    if (guessType === "name" && data) {
        labelText += "card name:";
        scoreAmount = 3;
        answer = data.name;
    }
    else if (guessType === "set" && data) {
        labelText += "set:";
        answer = data.set_name;
    }
    else if (guessType === "typeline" && data) {
        labelText += "type line:"
        answer = data.type_line;
    }

    function checkSol(): boolean {
        if(guessType === "set" && data) {
            return text === data.set || text === answer;
        }
        else {
            return text === answer;
        }
        return false;
    }

    function handleSubmit(e: SyntheticEvent) { 
        e.preventDefault();
        if(!isRevealed) {
            if(checkSol()) {
                setScore(score + scoreAmount);
                setRevealed(true);
                setCompletion(completion + 1);
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
            setCompletion(completion + 1);
        }
    }

    useEffect(() => {
        setRevealed(false);
        setText("");
    }, [data]);

    return (
        <form onSubmit={handleSubmit}>
            <div class="inputForm">
                <label for="guessText"> {labelText} </label>
                <input id="guessText" name="guessText" type="text" disabled={isRevealed} value={text} onChange={(e) => setText(e.target.value)}></input>
                <input type="submit" disabled={isRevealed}></input>
                <button disabled={isRevealed} onClick={handleHint}>Reveal Hint</button>
            </div>
            
        </form>
        
    )
}