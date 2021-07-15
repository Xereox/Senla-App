import { axiosDeleteItem, axiosUpdateItem, axioxPushItem } from "../lib/Axios"

const OPEN_POPUP = 'CATEGORY-OPEN-POPUP'
const CLOSE_POPUP = 'CATEGORY-CLOSE-POPUP'
const EDIT_CATEGORY = 'CATEGORY-EDIT_CATEGORY'
const SET_CURRENT_CATEGORY = 'CATEGORY-SET_CURRENT_CATEGORY'
const SET_COSTS = 'CATEGORY-SET-COSTS'
const SET_INCOME = 'CATEGORY-SET-INCOME'

let initialState = {
    categoriesCosts: [],
    categoriesIncomes: [],
    popupVisible: false,
    currentCategory: 'costs'
}

const categoryReducer = (state = initialState, action) => {
    switch(action.type) {

        case OPEN_POPUP: {
            return {...state, popupVisible: true}
        }

        case CLOSE_POPUP: {
            return {...state, popupVisible: false}
        }
            
        case EDIT_CATEGORY: {
            return {...state, popupVisible: action.categoryInfo}
        }

        case SET_CURRENT_CATEGORY: {
            return {...state, currentCategory: action.category} 
        }

        case SET_INCOME: {
            return {...state, categoriesIncomes: action.content}
        }

        case SET_COSTS: {
            return {...state, categoriesCosts: action.content}
        }

        default: {
            return state;
        }
    }
}

export const openPopup = () => ({type: OPEN_POPUP})
export const closePopup = () => ({type: CLOSE_POPUP})
export const editCategory = (categoryInfo) => ({type: EDIT_CATEGORY, categoryInfo})
export const setCurrentCategory = (category) => ({type: SET_CURRENT_CATEGORY, category})
export const setCategoriesIncomes = (content) => ({type: SET_INCOME, content})
export const setCategoriesCosts = (content) => ({type: SET_COSTS, content})

export const addNewCategoryItem = (currentCategory, path, newCategoryItem, func) => (dispatch) => {
    const newItemId = 1 + (currentCategory[currentCategory.length-1]?.id || 0) 
    axioxPushItem(newCategoryItem, path).then( resolve => {
        dispatch(func([...currentCategory, {...newCategoryItem, id: newItemId}]))
    })
}

export const updateCategoryItem = (itemToUpdate, path, currentCategory, func) => (dispatch) => {
    const id = itemToUpdate.id;
    axiosUpdateItem(id, path, itemToUpdate).then(resolve => {
        let newContent = currentCategory.map( el => el.id === id ? itemToUpdate : el)
        dispatch(func(newContent))
    })
}

export const deleteCategoryItem = (itemToDelete, path, currentCategory, func) => (dispatch) => {
    const id = itemToDelete.id;
        axiosDeleteItem(id, path).then( resolve => {
            dispatch(func(currentCategory.filter(item => item.id !== id)))
        })
}

export const updateContent = (item, del, currentCategory, categoriesCosts, categoriesIncomes, popupVisible) => (dispatch) => {
    const path = (currentCategory === 'costs') ? 'categorycosts' : 'categoryincome';
        const categoryContent = (currentCategory === 'costs') ? categoriesCosts : categoriesIncomes;
        const categoryChanger = (currentCategory === 'costs') ? setCategoriesCosts : setCategoriesIncomes;
        const isEdit = !!popupVisible?.title
        if (del) {
            dispatch(deleteCategoryItem(item, path, categoryContent, categoryChanger))
        } else if (isEdit) {
            dispatch(updateCategoryItem(item, path, categoryContent, categoryChanger))
        } else {
            dispatch(addNewCategoryItem(categoryContent, path, item, categoryChanger))
        }
}




export default categoryReducer