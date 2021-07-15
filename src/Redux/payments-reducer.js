import { axiosUpdateCards } from "../lib/Axios"

const OPEN_POPUP = 'PAYMENTS-OPEN-POPUP'
const CLOSE_POPUP = 'PAYMENTS-CLOSE-POPUP'
const EDIT_CARD = 'PAYMENTS-EDIT-CARD'
const SET_CARDS = 'PAYMENTS-SET_CARDS'

let initialState = {
    popupVisible: false,
    cards: []
}

const paymentsReducer = (state = initialState, action) => {
    switch(action.type) {

        case OPEN_POPUP: {
            return {...state, popupVisible: true}
        }

        case CLOSE_POPUP: {
            return {...state, popupVisible: false}
        }
            
        case EDIT_CARD: {
            return {...state, popupVisible: action.cardInfo}
        }

        case SET_CARDS: {
            return {...state, cards: action.cards} 
        }
        
        default: {
            return state
        }
    }
}

export const openPopup = () => ({type: OPEN_POPUP})
export const closePopup = () => ({type: CLOSE_POPUP})
export const editCard = (cardInfo) => ({type: EDIT_CARD, cardInfo})
export const setCards = (cards) => ({type: SET_CARDS, cards})

export const setCardFromServer = (content) => (dispatch) => {
    return axiosUpdateCards(content)
        .then(resolve => dispatch(setCards(content))) 
}

export const addNewCard = (newCard) => (dispatch, getState) => {
    const cards = getState().payments.cards
    const newCardId = +(cards[cards.length-1]?.id || 0) + 1;
    const newCardData = [...cards, {...newCard, id: newCardId} ]
    axiosUpdateCards(newCardData).then(resolve => dispatch(setCards(newCardData)))
}

export const updateCardInfo = (newCard) => (dispatch, getState) => {
    const cards = getState().payments.cards
    let newCardsData = cards.map( el => el.id === newCard.id ? newCard : el)
    axiosUpdateCards(newCardsData).then(resolve => dispatch(setCards(newCardsData)))
}

export const deleteCard = (cardToDelete) => (dispatch, getState) => {
    const cards = getState().payments.cards
    const newCardsData = [...cards].filter(card => card.id !== cardToDelete.id)
    axiosUpdateCards(newCardsData).then(resolve => dispatch(setCards(newCardsData)))
}


export default paymentsReducer
