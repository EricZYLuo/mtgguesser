

import { SyntheticEvent, useState, useEffect } from 'react';
import './App.css'

import { StatsDisplay } from './StatsDisplay';
import { GuessInput } from './GuessInput';
import { CardDisplay, cardObj } from './CardDisplay';


function App() {

  const [score, setScore] = useState(0); 

  const [completion, setCompletion] = useState(0);
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
      searchLinkEnd = "?q=f%3Astandard";
    }
    else if (cardpool === "modern") {
      searchLinkEnd = "?q=f%3Amodern";
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

      setCompletion(0);

  }

  useEffect(() => getCardData(), []);

  return (
    <>
      <div class="appBody">
        <div class="headerSection">
          <div class="titleSection">
            <h1>MTG Guesser</h1>
            <StatsDisplay score={score}></StatsDisplay>
          </div>
          <div class="cardSelection">
            <label for="typeSelect">Choose Type</label>
            <select id="typeSelect" value={cardpool} onChange={handleChangeType}>
              <option value="all">All Cards</option>
              <option value="standard">Standard</option>
              <option value="modern">Modern</option>
            </select>
          </div>
        </div>

        {cardData ? <CardDisplay cardData={cardData}></CardDisplay> : <p class="placeholder">Loading...</p>}
        <div class="guessInputs">
          <GuessInput guessType="name" score={score} data={cardData} setScore={setScore} completion={completion} setCompletion={setCompletion}></GuessInput>
          <GuessInput guessType="set" score={score} data={cardData} setScore={setScore} completion={completion} setCompletion={setCompletion}></GuessInput>
          <GuessInput guessType="typeline" score={score} data={cardData} setScore={setScore} completion={completion} setCompletion={setCompletion}></GuessInput>
        </div>
        
        <button class="skipButton" onClick={getCardData}>{completion === 3 ? "Next Card" : "Skip Card"}</button>

      </div>

    </>
  )
}

export default App
