import { CREATE_DECK, SET_DECKS, REMOVE_DECK, ADD_CARD } from '../actions/deck'

export default function(state = {}, action) {
    switch (action.type) {
        case REMOVE_DECK:
            return Object.keys(state).filter(k => k != action.id)
                        .reduce((a,b) => ({
                            ...a,
                            [b]: state[b]
                        }), {})
        case CREATE_DECK:
            return {
                ...state,
                [action.deck.id] : action.deck,
            }
        case SET_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_CARD:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    cards: state[action.id].cards.concat([action.card])
                }
            }
        default:
            return state;
    }
        
}