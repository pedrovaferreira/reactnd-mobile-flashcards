import { combineReducers } from 'redux'
import decks from './deck'
import quiz from './quiz'
import handleDeckCreated from './handleDeckCreate'

export default combineReducers({
    decks,
    quiz,
    handleDeckCreated
})
