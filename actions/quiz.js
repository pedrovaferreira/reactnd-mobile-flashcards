export const START_QUIZ = 'START_QUIZ'
export const ANSWER_QUIZ = 'ANSWER_QUIZ'

import { clearAndSetNewLocalNotification } from '../utils/notification'

export function startQuiz(deck){
    clearAndSetNewLocalNotification();
    return {
        type: START_QUIZ,
        deck
    }
}

export function answerQuiz(correct){
    return {
        type: ANSWER_QUIZ,
        correct
    }
}
