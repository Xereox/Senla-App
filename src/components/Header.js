import React from 'react'
import styled from 'styled-components'
import LogoutFromPage from '../lib/LogoutFromPage'
import Login from '../pages/Login'

const StyledHeader = styled.div`
    grid-area: head;
    background-color: green;
    display: flex;
    justify-content: space-between;
    padding: 0px 20px;
`

const HeaderTitle = styled.div`
    font-size: 16px;
`

const LoginInfo = styled.div`
    font-size: 16px;

`

const Header = (props) => {
    return (
        <StyledHeader>
            <HeaderTitle>{props.children}</HeaderTitle>
            <LoginInfo>
                <button onClick={LogoutFromPage}>Logout</button>
            </LoginInfo>
        </StyledHeader>
    )
}

export default Header
