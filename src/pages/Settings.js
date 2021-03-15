import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar/Sidebar'
import AppWrapper from '../components/AppWrapper'

const StyledMain = styled.div`
    grid-area: content;
`

const Settings = (props) => {
    return (
        <AppWrapper>
                <Header>Header</Header>
                <Sidebar>Sidebar</Sidebar> 
                <Footer>footer</Footer>
                <StyledMain>Settings content</StyledMain>
        </AppWrapper>
    )
}

export default Settings
