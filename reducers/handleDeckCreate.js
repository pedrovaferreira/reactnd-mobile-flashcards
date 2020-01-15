import { DECK_CREATED, DECK_CREATED_REDIRECTED } from '../actions/handleDeckCreated'
export default function(state = {}, action) {
    switch (action.type) {
        case DECK_CREATED:
            return {
                redirect: action.id
            }
        case DECK_CREATED_REDIRECTED:
            return {}
        default:
            return state;
    }
        
}