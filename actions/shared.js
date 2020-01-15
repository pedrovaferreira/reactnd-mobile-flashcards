import { getDecks, addAnswerDeck} from '../utils/api'
import { setDecks } from './deck'
import { answerQuiz } from './quiz'

export function handleInitData(){
    return async (dispatch) =>{
        const decks = await getDecks()
        dispatch(setDecks(decks))
    }
}


export function handleAnswerQuiz(correct, deck){
    return (dispatch) => {
        return addAnswerDeck(correct, deck.id)
                .then(decks => dispatch(setDecks(decks)))
                .then(dispatch(answerQuiz(correct)))
    }
}
