import { START_QUIZ, ANSWER_QUIZ} from '../actions/quiz'
export default function(state = {}, action) {
    switch (action.type) {
        case START_QUIZ:
            return {
                deck: action.deck,
                currentCard: 0,
                correct: 0,
                finished: false
            }
        case ANSWER_QUIZ:
            return {
                ...state,
                currentCard: state.currentCard+ 1,
                correct: action.correct ? state.correct + 1 : state.correct,
                finished: state.currentCard >= state.deck.cards.length - 1
            }
        default:
            return state;
    }
        
}