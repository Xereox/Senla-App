import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar/Sidebar'
import AppWrapper from '../components/AppWrapper'

const StyledMain = styled.div`
    grid-area: content;
    background-color: ${props => props.theme === 'light' ? '#E0E7E9' : '#212121'}
`

const About = (props) => {
    return ( 
        <AppWrapper>
            <Header>Header</Header>
            <Sidebar selected={5}>Sidebar</Sidebar> 
            <Footer>footer</Footer>
            <StyledMain>Some text</StyledMain>
        </AppWrapper>
    )
}

export default About
