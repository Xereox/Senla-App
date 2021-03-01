import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'


const StyledItem = styled.div`
margin-bottom: 10px;
font-size: 14px;
`


const SidebarItem = (props) => {
    console.log(props)
    return (
       <NavLink to={props.path}>
           <StyledItem>{props.children}</StyledItem>
       </NavLink>
    )
}

export default SidebarItem
