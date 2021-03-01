import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.div`
    grid-area: head;
    background-color: green;
`


const Header = (props) => {
    return (
        <StyledHeader>{props.children}</StyledHeader>
    )
}

export default Header
