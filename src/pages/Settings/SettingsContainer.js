import React from 'react'
import { connect } from 'react-redux'
import { chooseCurrency, setCurrency, setTheme } from '../../Redux/settings-reducer'
import Settings from './Settings'

const MainContainer = (props) => {
    return (
      <Settings {...props} />
    )
}

const mapStateToProps = (state) => {
    return {
        theme: state.settings.theme,
        currency: state.settings.currency
    }
}

export default connect(mapStateToProps, 
    { setTheme, setCurrency, chooseCurrency }
)(MainContainer)

