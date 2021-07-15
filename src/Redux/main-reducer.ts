import { axioxPushItem, axiosUpdateItem, axiosDeleteItem } from '../lib/Axios'
import {ThunkAction} from "redux-thunk";
import {MainCategoryType, MainItemType, MainPeriodType} from "../pages/Main/Main";

let initialState = {
    category: 'costs' as MainCategoryType,
    costs: [] as Array<MainItemType>,
    income: [] as Array<MainItemType>,
    glue: true,
    popupVisible: false as MainItemType | boolean,
    period: {} as MainPeriodType,
    currentPage: 1
}

export type InitialStateType = typeof initialState

export const actions = {
    openPopup: () => ({type: 'MAIN-OPEN-POPUP'} as const),
    closePopup: () => ({type: 'MAIN-CLOSE-POPUP'} as const),
    toggleGlue: () => ({type: 'MAIN-TOGGLE-GLUE'} as const),
    setCurrentPage: (value: number) => ({type: 'MAIN-SET-CURRENTPAGE', value} as const),
    editItem: (itemInfo: MainItemType) => ({type: 'MAIN-EDIT-ITEM', itemInfo } as const),
    setCategory: (category: MainCategoryType) => ({type: 'MAIN-SET-CATEGORY', category} as const),
    setIncome: (content: Array<MainItemType>) => ({type: 'MAIN-SET-INCOME', content} as const),
    setCurrentContent: (content: Array<MainItemType>) => ({type: 'MAIN-SET-CURRENT_CONTENT', content} as const),
    setCosts: (content: Array<MainItemType>) => ({type: 'MAIN-SET-COSTS', content} as const),
    setPeriod: (period: MainPeriodType) => ({type: 'MAIN-SET-PERIOD', period} as const)
}

type InferActionsType<T> = T extends { [key: string]: (...args: any) => infer U } ? U : never
type ActionsType = InferActionsType<typeof actions>

const mainReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch(action.type) {
        case "MAIN-OPEN-POPUP": {
            return {...state, popupVisible: true}
        }
        case "MAIN-CLOSE-POPUP": {
            return {...state, popupVisible: false}
        }
        case "MAIN-SET-CURRENT_CONTENT": {
            return state.category === 'costs'
            ? {...state, costs : action.content}
            : {...state, income: action.content}
        }
        case "MAIN-TOGGLE-GLUE": {
            return {...state, glue: !state.glue}
        }
        case "MAIN-SET-CURRENTPAGE": {
            return {...state, currentPage: action.value}
        }
        case "MAIN-EDIT-ITEM": {
            return state.glue 
                ? state
                : {...state, popupVisible: action.itemInfo}
        }
        case "MAIN-SET-CATEGORY": {
            return {...state, category: action.category}
        }
        case "MAIN-SET-INCOME": {
            return {...state, income: action.content}
        }
        case "MAIN-SET-COSTS": {
            return {...state, costs: action.content}
        }
        case "MAIN-SET-PERIOD": {
            return {...state, period: action.period}
        }
        default: {
            return state;
        }
    }
}
export default mainReducer

type ThunkType<S = InitialStateType, A extends ActionsType = ActionsType > = ThunkAction<void, S, unknown, A>

export const addNewOperation = (operation: MainItemType, path: string, categoryContent: Array<MainItemType>):ThunkType => (dispatch) => {
    const newItemId = 1 + (categoryContent[categoryContent.length-1]?.id || 0)
    axioxPushItem(operation, path).then(resolve => {
        dispatch(actions.setCurrentContent([...categoryContent, {...operation, id: newItemId}]))
    })
}

export const updateOperation = (operation: MainItemType, path: string, categoryContent: Array<MainItemType>):ThunkType => (dispatch) => {
    const id = operation.id;
    axiosUpdateItem(id, path, operation).then(resolve => {
        let newContent = categoryContent.map( el => el.id === id ? operation : el)
        dispatch(actions.setCurrentContent(newContent))
    })
}

export const deleteOperation = (itemToDelete: MainItemType, path: string, categoryContent: Array<MainItemType>):ThunkType => (dispatch) => {
    const id = itemToDelete.id;
    axiosDeleteItem(id, path).then(resolve => {
        dispatch(actions.setCurrentContent(categoryContent.filter(item => item.id !== id)))
    })
}

