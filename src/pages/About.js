import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar/Sidebar'
import AppWrapper from '../components/AppWrapper'
import { Redirect } from 'react-router-dom'
import isAuth from '../lib/isAuth'


const StyledMain = styled.div`
    grid-area: content;
`

const About = (props) => {
    if (!isAuth()) return <Redirect to={'/login'}/>
    return ( 
        <AppWrapper>
            <Header>Header</Header>
            <Sidebar>Sidebar</Sidebar> 
            <Footer>footer</Footer>
            <StyledMain>About content</StyledMain>
        </AppWrapper>
    )
}

export default About
