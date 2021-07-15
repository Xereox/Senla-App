import React from 'react'
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    &:hover {
        transform: scale(1.025)
    }
`
const ImgContainer = styled.div`
    width: ${props => props.size};
    height: ${props => props.size};
    display: flex;
    flex-direction: center;
    align-items: center;
    border-radius: 30%;
    background: ${props => props.color ? props.color : 'lightblue' } center no-repeat url(${props => props.img});
    background-size: cover;
    border: 1px solid ${props => props.theme === 'light' ? '#f7f7f7' : '#006064'};
    box-shadow: 0 3px 3px 1px rgba(0, 0, 0, 0.45);
    margin-bottom: 5px;
    position: relative;
    ${props => props.active && `border-bottom: 3px solid red`}
`
const ItemTitle = styled.span`
font-size: 16px;
  text-align: center;
margin-bottom: 5px;
color: ${ props => {
    if (props.active) {
        return '#ff5200'
    } else if (props.theme === 'light') {
        return ''
    } else return '#EFEBE9'
}};
  

font-family: 'Roboto'
`
const ItemPrice = styled.div`
font-size: 15px;
color: blue;
font-weigth: bold;
  
`

const CategoryItem = React.memo(({title, price, img, color, active, onClick, size = '100px', id='', theme = 'light' }) => {
    const onClickHandler = onClick ? () => onClick({title,img,color, id}) : null;
    return (
        <Container>
            <ItemTitle active={active} theme={theme}>{title}</ItemTitle>
            <ImgContainer data-test-id={'img'} size={size} img={img} color={color} active={active} onClick={onClickHandler} theme={theme}/>
            <ItemPrice theme={theme}>{price}</ItemPrice>
        </Container>
    )
})

export default CategoryItem;