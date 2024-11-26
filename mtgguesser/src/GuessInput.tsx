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


    function editDistance(string1: string, string2: string): number {

        let dparr: Array<number[]> = [];

        for(let i = 0; i < string1.length + 1; i++) {
            dparr.push([]);
            for(let j = 0; j < string2.length + 1; j++) {
                if(i === 0) {dparr[i].push(j);}
                if(j === 0) {dparr[i].push(i);}
                else {dparr[i].push(-1);}
            }
        }

        let string1Arr = [...string1];
        let string2Arr = [...string2];

        for(let i = 1; i < string1.length + 1; i++) {
            for(let j = 1; j < string2.length + 1; j++) {
                dparr[i][j] = Math.min(dparr[i-1][j] + 1, dparr[i][j-1] + 1, string1Arr[i-1] === string2Arr[j-1] ? dparr[i-1][j-1] : dparr[i-1][j-1]);
            }
        }
        return dparr[string1.length][string2.length];

    } 

    function matchVals(input: string, checkVal: string): boolean {
        let editDist: number = editDistance(input.toLowerCase(), checkVal.toLowerCase());
        let closeEnough: boolean = checkVal.length > 10 ? editDist < 3 : editDist < 2;
        console.log(input.toLowerCase());
        console.log(checkVal.toLowerCase());
        return input.toLowerCase() === checkVal.toLowerCase() || closeEnough;
    }

    function checkSol(): boolean {
        if(guessType === "set" && data) {
            return text === data.set || matchVals(text, answer);
        }
        else {
            return matchVals(text, answer);
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