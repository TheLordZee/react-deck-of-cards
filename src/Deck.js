import Card from "./Card";
import "./Deck.css"
import React, {useState, useEffect} from "react";
import axios from "axios";


const Deck = () => {
    const BASE_URL = 'https://deckofcardsapi.com/api/deck/'
    const [deck, setDeck] = useState([])
    const [deckId, setDeckId] = useState()
    const [cardsRemaining, setCardsRemaining] = useState(true)
    useEffect(function getDeck(){
        async function fetchDeck(){
            const res = await axios.get(BASE_URL + 'new/shuffle/?deck_count=1')
            console.log(res.data)
            setDeckId(res.data.deck_id)
        }
        fetchDeck()
    }, [])

    const drawCard = async () => {
        if(deck.length < 52){
            let res = await axios.get(`${BASE_URL}/${deckId}/draw`)
            let card = res.data.cards[0]
            card.rot = Math.floor(Math.random() * 360)
            let newDeck = [...deck, card]
            setDeck(newDeck)
        }else{
            setCardsRemaining(false)
            console.log("ERROR: NO CARDS REMAING!")
        }
    }

    return(
        <>
        {(cardsRemaining) ? <button className="Deck-btn" onClick={drawCard}>Draw Card</button> : ""}
        
        <div className="Deck-stack">
        {deck.map(c => (<Card 
                suit={c.suit}
                value={c.value}
                key={c.code} 
                img={c.image} 
                rot={c.rot}
            />)
        )}
        </div>
        </>
    )
}

export default Deck;