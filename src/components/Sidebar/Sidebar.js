import React from 'react'
import styled from 'styled-components'
import SidebarItem from './SidebarItem'

const StyledSidebar = styled.div`
    grid-area: nav;
    background-color: grey;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px 30px;
    & a {
        font-size: 16px;
        text-decoration: none;
        color: white;
    }
    & a.active {
        color: gold;
    }
`

const Sidebar = (props) => {
    return (
        <StyledSidebar>
            <SidebarItem path='/Main'>Main</SidebarItem>
            <SidebarItem path='/Categories'>Categories</SidebarItem>
            <SidebarItem path='/Currency'>Сurrency</SidebarItem>
            <SidebarItem path='/Settings'>Settings</SidebarItem>
            <SidebarItem path='/About'>About</SidebarItem>
        </StyledSidebar>
    )
}

export default Sidebar
