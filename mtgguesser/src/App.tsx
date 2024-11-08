

import { SyntheticEvent, useState, useEffect } from 'react';
import './App.css'

import { StatsDisplay } from './StatsDisplay';
import { GuessInput } from './GuessInput';
import { CardDisplay, cardObj } from './CardDisplay';


function App() {

  const [score, setScore] = useState(0); 
  const [cardpool, setPool] = useState("all");
  const [cardData, setData] = useState<cardObj | null>(null);


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
          let temp_art;
          if(Object.hasOwn(json, 'card_faces')) {
            console.log(json.card_faces[0].image_uris.art_crop);
            temp_art = json.card_faces[0].image_uris.art_crop;
          }
          else {
            console.log(json.image_uris.art_crop);
            temp_art = json.image_uris.art_crop;
          }
          

          setData({
            name: json.name,
            set: json.set,
            set_name: json.set_name,
            type_line: json.type_line,
            art_url: temp_art,
            artist: json.artist
          });

        }
      )
      .catch(error => console.error(error));

  }

  useEffect(() => getCardData(), []);

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
        
        {cardData ? <CardDisplay cardData={cardData}></CardDisplay> : <p class="placeholder">Loading...</p>}

        <GuessInput guessType="name" score={score} data={cardData} setScore={setScore}></GuessInput>
        <GuessInput guessType="set" score={score} data={cardData} setScore={setScore}></GuessInput>
        <GuessInput guessType="typeline" score={score} data={cardData} setScore={setScore}></GuessInput>

        <button onClick={getCardData}>Test</button>

      </div>

    </>
  )
}

export default App
