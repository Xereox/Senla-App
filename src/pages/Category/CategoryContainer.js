import React from 'react'
import { connect } from 'react-redux'
import { closePopup, editCategory, openPopup, setCategoriesCosts, setCurrentCategory, setCategoriesIncomes, updateContent } from '../../Redux/category-reducer'
import Category from './Category'

const CategoryContainer = (props) => {
    return (
      <Category {...props} />
    )
}

const mapStateToProps = (state) => {
    return {
        categoriesCosts: state.category.categoriesCosts,
        categoriesIncomes: state.category.categoriesIncomes,
        popupVisible: state.category.popupVisible,
        currentCategory: state.category.currentCategory,
        theme: state.settings.theme,
    }
}

export default connect(mapStateToProps, 
    {  openPopup, closePopup, editCategory, setCurrentCategory, setCategoriesIncomes, setCategoriesCosts, updateContent }
)(CategoryContainer)

