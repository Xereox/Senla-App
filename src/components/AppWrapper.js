import React from 'react'
import styled from 'styled-components'

const styledAppWrapper = styled.div `
font-size: 16px;
width: 100%;
height: 100vh;
max-width: 1366px;
padding: 0 110px;
margin: 0 auto;
display: grid;
grid-template-areas: 
    "head head"
    "nav content"
    "footer footer";
grid-template-rows: 80px 1fr 80px;
grid-template-columns: 180px 1fr;
`

const AppWrapper = (props) => {
    return (
        <styledAppWrapper>
            
        </styledAppWrapper>
    )
}

export default AppWrapper
