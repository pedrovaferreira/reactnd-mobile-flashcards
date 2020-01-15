export const CREATE_DECK = "CREATE_DECK"
export const SET_DECKS = "SET_DECKS"
export const REMOVE_DECK = "REMOVE_DECK"
export const ADD_CARD = "ADD_CARD"

import { addDeck, removeDeck, addCardToDeck } from '../utils/api'
import { deckCreated } from './handleDeckCreated'
export function setDecks(decks){
    return {
        type: SET_DECKS,
        decks
    }
} 

function createDeck(deck){
    return {
        type: CREATE_DECK,
        deck
    }
}

function deleteDeck(id){
    return {
        type: REMOVE_DECK,
        id
    }
}
function addCardDeck(id, card){
    return {
        type: ADD_CARD,
        id,
        card
    }
}

export function handleCreateDeck(name){
    return (dispatch) => {
        const deck = {
            name,
            cards: []
        }
        return addDeck(deck)
                .then(d => {
                    dispatch(createDeck(d))
                    dispatch(deckCreated(d.id))
                })
        
    }
}
export function handleDeleteDeck(id){
    return (dispatch) => {
        return removeDeck(id)
            .then(dispatch(deleteDeck(id)))
        
    }
}

export function handleAddCardToDeck(id, card){
    return (dispatch) => {
        return addCardToDeck(id, card)
            .then(dispatch(addCardDeck(id, card)))
    }
}
// export function removeDeck(id){
//     return type {
//         id:
//     }
// }