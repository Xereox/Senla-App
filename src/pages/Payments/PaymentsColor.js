import React, { useState } from 'react'
import styled from 'styled-components'
import addColorImg from '../../assets/Images/addColor.png'

const Container = styled.div`
    display: flex;
    max-width: 360px;
    flex-wrap: wrap;
    align-content: flex-start;
    margin-bottom: 10px;
    & div:not(:last-child) {
        margin-right: 5px;
        margin-bottom: 5px;
    }
`

const ColorAddContainer = styled.div`
    position:relative;
`

const ColorAdd = styled.label`
    display: block;
    width: ${props => setRadius(props)};
    height: ${props => setRadius(props)};
    border-radius: 50%;
    overflow: hidden;
    margin-right: 15px;
    position: relative;
    background: white url(${addColorImg}) center no-repeat;
    background-size: 8px;
`

const ColorInput = styled.input`
    position: absolute;
    top: 15px;
    left: 15px;
    background: none;
    border: none;
    display: block;
    width: 0;
    height: 0;
    font-size: 0;
    outline: none;
`

const PaymentsColor = ({setCardColor, cardColor}) => {
    const DefaultColors = ['#E27D60', '#E8A87C', '#C38D9E', '#41B3A3', '#242582',
     '#553D67', '#99783E', '#2F2FA2', '#8D8741', '#659DBD', '#DAAD86', '#FBEEC1', 
     '#5CDB95', '#8EE4AF', '#EDF5E1', '#F64C72', '#AFD275', '#EE4C7C', '#D79922', '#F13C20']
    !DefaultColors.find(color => color === cardColor) && DefaultColors.push(cardColor)
    const radius = 17;

    const [colors, setColors] = useState(DefaultColors)
    
    const onClickHandler = (x) => {
        setCardColor(x)
    }

    let content = colors.map((x, key) => {
        return <Color color={x} radius={radius} key={key}
            onClick={onClickHandler}
            active={cardColor === x}
        ></Color>
    })

    const AddColor = (e) =>  !colors.includes(e.target.value) && setColors([...colors, e.target.value]) 
    

    return (
        <Container>
             {content}
            <ColorAddContainer>
                <ColorAdd radius={radius}>
                    <ColorInput type='color' onBlur={AddColor}></ColorInput>
                </ColorAdd>
            </ColorAddContainer>
        </Container>
    )
}

export default PaymentsColor


const setRadius = props => {
    let defaultRadius = 15;
    return props.radius ? props.radius*2 + 'px' : defaultRadius*2 + 'px';
}

const RoundColor = styled.div`
    width: ${props => setRadius(props)};
    height: ${props => setRadius(props)};
    border-radius: 50%;
    background-color: ${props => props.color || `white`};
    position: relative;
    &::after {
        content: '';
        width: 100%;
        height: 1px;
        border-radius: 5px;
        background: red;
        bottom: -1px;
        left: 0%;
        display: ${props => props.active ? 'block' : 'none'};
        position: absolute;
    }
`

export const Color = ({color, radius, active, onClick}) => {
    const clickHandler = () => onClick(color)
    return (
        <RoundColor onClick={clickHandler} active={active} color={color} radius={radius}></RoundColor>
    )
}
