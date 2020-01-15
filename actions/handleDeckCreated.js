export const DECK_CREATED = 'DECK_CREATED'
export const DECK_CREATED_REDIRECTED = 'DECK_CREATED_REDIRECTED'

export function deckCreated(id){
    return {
         type: DECK_CREATED,
         id
    }
}
export function deckCreatedRedirected(){
    return {
        type: DECK_CREATED_REDIRECTED
    }
}