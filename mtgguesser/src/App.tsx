

import { SyntheticEvent, useState, useEffect } from 'react';
import './App.css'

import { StatsDisplay } from './StatsDisplay';
import { GuessInput } from './GuessInput';

function App() {

  const [score, setScore] = useState(0); 
  const [text, setText] = useState("");
  const [cardpool, setPool] = useState("all");




  const key = "abc";

  function handleChangeType(e:SyntheticEvent) {
    setPool(e.target.value);
  }

  function getCardData() {
    const searchLinkBase = "https://api.scryfall.com/cards/random";
    let searchLinkEnd = "";
    if(cardpool === "all") {
      searchLinkEnd = "";
    } 
    else if (cardpool === "standard") {
      searchLinkEnd = "f%3Astandard";
    }
    else if (cardpool === "modern") {
      searchLinkEnd = "f%3Amodern";
    }

    fetch(searchLinkBase+searchLinkEnd).then(
      response => response.json())
      .then(
        json => {
          console.log(json);
          console.log(json.name);
          console.log(json.set_name);
          console.log(json.type_line);
          console.log(json.image_uris.art_crop);
        }
      )
      .catch(error => console.error(error));

  }

  return (
    <>
      <div>
        <h1>MTG Guesser</h1>
        <label for="typeSelect">Choose Type</label>
        <select id="typeSelect" value={cardpool} onChange={handleChangeType}>
          <option value="all">All Cards</option>
          <option value="standard">Standard</option>
          <option value="modern">Modern</option>
        </select>
        <StatsDisplay score={score}></StatsDisplay>
        <div>

        </div>

        <GuessInput text={text} score={score} answer={key} setText={setText} setScore={setScore}></GuessInput>

        <button onClick={getCardData}>Test</button>

      </div>

    </>
  )
}

export default App
