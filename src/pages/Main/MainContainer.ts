import React from 'react'
import { connect } from 'react-redux'
import {actions, deleteOperation, updateOperation, addNewOperation} from '../../Redux/main-reducer'
import { setCardFromServer } from '../../Redux/payments-reducer'
import {GlobalStoreType} from "../../Redux/store";
import MainPage from "./Main";

const mapStateToProps = (state: GlobalStoreType) => {
    return {
        main: state.main,
        categoriesCosts: state.category.categoriesCosts,
        categoriesIncomes: state.category.categoriesIncomes,
        theme: state.settings.theme,
        curSymbol : state.settings.symbol,
        cards: state.payments.cards
    }
}

export default connect(mapStateToProps, 
    { 
        ...actions, deleteOperation,
        updateOperation, addNewOperation, setCardFromServer
    })(MainPage)

