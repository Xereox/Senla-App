import React from 'react'
import styled from 'styled-components'
import AppWrapper from './AppWrapper'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar/Sidebar'

const StyledMain = styled.div`
    grid-area: content;
`

const Main = (props) => {
    return (
<>
    <Header>Header</Header>
    <Sidebar>Sidebar</Sidebar> 
    <Footer>footer</Footer>
    <StyledMain>1</StyledMain>
</>
        
    )
}

export default Main
