import React from 'react'
import styled from 'styled-components'


const StyledAppWrapper = styled.div`
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
grid-template-rows: 60px 1fr auto;
grid-template-columns: 200px 1fr;
position: relative;
`
  
const AppWrapper = (props) => {
    return (
       <StyledAppWrapper>{props.children}</StyledAppWrapper>
    )
}

export default AppWrapper
