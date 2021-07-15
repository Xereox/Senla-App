import React from 'react'
import { connect } from 'react-redux'
import { addNewCard, closePopup, deleteCard, editCard, openPopup, setCards, updateCardInfo } from '../../Redux/payments-reducer'
import Payments from './Payments'

const PaymentsContainer = (props) => {
    return (
      <Payments {...props} />
    )
}

const mapStateToProps = (state) => {
    return {
        popupVisible: state.payments.popupVisible,
        cards: state.payments.cards,
        theme: state.settings.theme,
        curSymbol : state.settings.symbol
    }
}

export default connect(mapStateToProps, 
    { 
        openPopup, closePopup, editCard, setCards, 
        addNewCard, updateCardInfo, deleteCard
     }
)(PaymentsContainer)

