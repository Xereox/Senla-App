import React from 'react'
import { connect } from 'react-redux'
import { changeSortDate, setCurrentPage, setPeriod } from '../../Redux/details-reducer'
import Details from './Details'

const DetailsContainer = (props) => {
    return (
      <Details {...props} />
    )
}

const mapStateToProps = (state) => {
    return {
        period: state.details.period,
        currentPage: state.details.currentPage,
        sortDate: state.details.sortDate,
        curSymbol: state.settings.symbol,
        theme: state.settings.theme,
        categoriesCosts: state.category.categoriesCosts,
        categoriesIncomes: state.category.categoriesIncomes,
        cards: state.payments.cards,
        costs: state.main.costs,
        income: state.main.income
    }
}

export default connect(mapStateToProps, 
    { setCurrentPage, setPeriod, changeSortDate }
)(DetailsContainer)