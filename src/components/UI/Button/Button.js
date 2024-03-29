import React from 'react'
import './Button.css'

const Button = (props) => {
    return (
        <div className="button " >
            <button className="btn disabled" 
                onClick={props.onClick}
                disabled={props.disabled}
                type={props.type}
            >
                {props.children}     
            </button>
        </div>
    )
}

export default Button;