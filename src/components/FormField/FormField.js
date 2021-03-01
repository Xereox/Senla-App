import React from 'react'
import styled from 'styled-components'

const StyledField = styled.section`
    display: flex;
    flex-direction: column;
    border-bottom: 2px solid #d9d9d9;
    margin-bottom: 20px;
    position: relative;
    &:before {
        content: "";
        left: 5px;
        bottom: 20px;
        position: absolute;
        width: 20px;
        height: 20px;
        background: url("./LoginBefore.png") center no-repeat;
        background-size: cover;
    }
`
const StyledLabel = styled.label`
    font-family: Poppins-Regular;
    font-size: 1.4rem;
    color: #333;
    line-height: 1.5;
    padding-left: 7px;
`
const StyledInput = styled.input`
    border: none;
    font-size: 1.6rem;
    color: #333;
    height: 55px;
    padding-left: 30px;
    line-height: 1.2;
`

const FormField = (props) => {
    return (
        <StyledField>
            <StyledLabel for={props.name}>{props.children}</StyledLabel>
            <StyledInput 
                placeholder={props.placeholder}
                type={props.type}
                name={props.name} 
                id={props.name}
                ></StyledInput>
        </StyledField>
    )
}

export default FormField;









