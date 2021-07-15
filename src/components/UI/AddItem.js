import React from 'react'
import styled from 'styled-components';
import AddImage from '../../assets/Images/add.png'

const ImgContainer = styled.button`
    background: none;
    outline: none;
    border: none;
    display: flex;
    border-radius: 50%;
    flex-direction: center;
    align-items: center;
    & :hover {
        border: 0.5px dotted blue;
        border-radius: 50%;
    }
    & img {
        max-width: 100%;
    }
    max-width: 40px;
    align-self: center;
    justify-self: center;
`


const Additem = ({onClick}) => {
    return (
        <ImgContainer onClick={onClick}>
           <img alt='Добавить элемент' src={AddImage}></img>
        </ImgContainer>
    )
}

export default Additem;
