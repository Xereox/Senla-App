const SET_PERIOD = 'DETAILS-SET-PERIOD'
const SET_CURRENTPAGE = 'DETAILS-SET-CURRENTPAGE'
const CHANGE_SORT_DATE = 'DETAILS-CHANGE-SORT-DATE'

let initialState = {
    period: [],
    currentPage: 1,
    sortDate: '1'
}

const detailsReducer = (state = initialState, action) => {
    switch(action.type) {
    
        case SET_CURRENTPAGE: {
            return {...state, currentPage: action.value}
        }
            
        case SET_PERIOD: {
            return {...state, period: action.period}
        }

        case CHANGE_SORT_DATE: {
            return {...state, sortDate: `${state.sortDate*(-1)}`}
        }

        default: {
            return state;
        }
    }
}

export const setCurrentPage = (value) => ({type: SET_CURRENTPAGE, value})
export const setPeriod = (period) => ({type: SET_PERIOD, period})
export const changeSortDate = () => ({type: CHANGE_SORT_DATE})

export default detailsReducer