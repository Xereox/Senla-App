import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.div`
    grid-area: footer;  
    background-color: green;
`


const Footer = (props) => {
    return (
        <StyledFooter>{props.children}</StyledFooter>
    )
}

export default Footer
