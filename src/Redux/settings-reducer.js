import { axiosUpdateCurrency } from "../lib/Axios"

const SET_THEME = 'SETTINGS-SET-THEME'
const SET_CURRENCY = 'SETTINGS-SET-CURRENCY'

let initialState = {
    theme: 'light',
    currency: [ {
        "title": "Белорусский рубль",
        "symbol": "BYN",
        "active": "true",
        "id": "1"
      }],
    symbol: ''
}

const settingsReducer = (state = initialState, action) => {
    switch(action.type) {

        case SET_THEME: {
            return {...state, theme: action.theme}
        }

        case SET_CURRENCY: {
            const curSymbol = action.content.find(currency => currency.active === 'true')?.symbol || ''
            return {...state, currency: action.content, symbol: curSymbol}
        }
            
        default: {
            return state;
        }
    }
}

export const setTheme = (theme) => ({type: SET_THEME, theme })
export const setCurrency = (content) => ( {type: SET_CURRENCY, content })

export const chooseCurrency = (id, currency) => (dispatch) => {
    const newData = currency.map(currency => {
        if (currency.id === id) {
            currency.active = 'true'
        } else {
            currency.active = 'false'
        }
        return currency
    })
    axiosUpdateCurrency(newData).then(resolve => dispatch(setCurrency(newData)))
}
export default settingsReducer

