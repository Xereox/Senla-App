import React from 'react'
import styled from 'styled-components'

const ItemToChoose = styled.div`
    padding: 8px;
    background: ${props => {
        if (props.active) {
            return (props.theme === 'light') ? '#3237a1' : '#018786'
        } else {
            return (props.theme === 'light') ? '#E0E7E9' : '#282846'
        }
    }};
    max-height: 60px;
    position: relative;
    cursor: pointer;
    &:hover {
        background-color: ${props => {
            if (!props.active) {
                return (props.theme === 'light') ? 'lightblue' : '#616161'
            } 
        }}
    }
`
const ItemInfo = styled.div`
    padding-left: 40px;
`

const ItemTitle = styled.div`
color: ${props => {
    if (props.active) {
        return (props.theme === 'light') ? '#E0E7E9' : '#ffc93c'
    } else {
        return (props.theme === 'light') ? 'black' : '#EFEBE9'
    }
}};
font-size: 12px;
`
const ItemDeposit = styled.div`
 color: #13b0a0;
 font-size: 12px;
 padding-bottom: 5px;
 border-bottom: 2px solid lightgrey;
`

const CardImg = styled.div`
width: 35px;
height: 35px;
position: absolute;
background: url(${props => props.img}) no-repeat center;
background-size: cover;
border-radius: 50%;
top: 10px;
left: 8px;
`

const CardType = ({title, deposit, active, onClick, id, img, theme}) => {
    const onClickHandler = () => {
        onClick(id)
    }
    return (
        <ItemToChoose active={active} onClick={onClickHandler} theme={theme}>
            <ItemInfo>
                <CardImg img={img}></CardImg>
                <ItemTitle active={active} theme={theme}>{title}</ItemTitle>
                <ItemDeposit>{deposit}</ItemDeposit>
            </ItemInfo> 
        </ItemToChoose>
    )
}

export default CardType