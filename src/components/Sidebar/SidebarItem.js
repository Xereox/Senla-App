import React from 'react'
import { NavLink } from 'react-router-dom'

const SidebarItem = (props) => {
    return (
       <NavLink to={props.path}>
          {props.title}
       </NavLink>
    )
}

export default SidebarItem
