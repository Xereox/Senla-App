import React, { Component } from 'react'
import Register from '../../../pages/Register';
import './Button.css'

const Button = (props) => {
    return (
        <div className="button" >
            <button className="btn" onClick={props.onclick}>{props.children}</button>
        </div>
    )
}

export default Button;