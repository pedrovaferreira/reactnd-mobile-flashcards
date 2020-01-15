
import { AsyncStorage } from 'react-native'

const DECKS = "flashcards:decks"

function generateId(){
    return Math.random().toString(36).substr(-8)
}

export async function addCardToDeck(id, card){
    const decks = await getDecks();
    decks[id].cards.push(card);
    await _saveDecks(decks)
}

export async function addDeck(deck){
    deck.id = generateId()
    const decks = await getDecks();
    decks[deck.id] = deck;
    await _saveDecks(decks)
    return deck
}


export async function addAnswerDeck(correct, id){
    const decks = await getDecks();
    const deck = decks[id]
    if(!deck.answered)
        deck.answered = 1;
    else 
        deck.answered += 1;

        
    if(!deck.correct)
        deck.correct = 0;
    deck.correct += correct ? 1 : 0;
    
    deck.percent = Math.floor((deck.correct/deck.answered ) * 100)


    await _saveDecks(decks)
    console.log(decks)
    return decks
}

export async function removeDeck(id){
    const decks = await getDecks();
    delete decks[id];
    await _saveDecks(decks)
}

function _saveDecks(decks){
   return AsyncStorage.setItem(DECKS, JSON.stringify(decks))
}

export function getDecks(){
    debugger;
    return AsyncStorage.getItem(DECKS)
    .then((results) => {
      const data = JSON.parse(results);
      return data || {}
    })
}