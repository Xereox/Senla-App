import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import LogoutFromPage from '../lib/LogoutFromPage'

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
    const history = useHistory();
    return (
        <StyledHeader>
            <HeaderTitle>{props.children}</HeaderTitle>
            <LoginInfo>
                <button onClick={ () => LogoutFromPage(history) }>Logout</button>
            </LoginInfo>
        </StyledHeader>
    )
}

export default Header
