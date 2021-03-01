import React from 'react'
import styled from 'styled-components'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar/Sidebar'

const StyledMain = styled.div`
    grid-area: content;
`


const Settings = (props) => {
    return (
        <>
        <Header>Header</Header>
        <Sidebar>Sidebar</Sidebar> 
        <Footer>footer</Footer>
        <StyledMain>2</StyledMain>
        </>
    )
}

export default Settings
