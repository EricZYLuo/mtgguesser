
export interface cardObj {
    name: string;
    set: string;
    set_name: string;
    type_line: string;
    art_url: string;
    artist: string;
  }

type CardProp = {
    cardData?: cardObj;
}

export function CardDisplay({cardData}: CardProp) {

    return (
        <>
        <img src={cardData.art_url} alt="Loading"></img>
        </>
    )

}