import React from 'react'
import styled from 'styled-components'
import img1 from '../../../assets/Images/Categories/costs/1.svg'
import img2 from '../../../assets/Images/Categories/costs/2.svg'
import img3 from '../../../assets/Images/Categories/costs/3.svg'
import img4 from '../../../assets/Images/Categories/costs/4.svg'
import img5 from '../../../assets/Images/Categories/costs/5.svg'
import img6 from '../../../assets/Images/Categories/costs/6.svg'
import img7 from '../../../assets/Images/Categories/costs/7.svg'
import img8 from '../../../assets/Images/Categories/costs/8.svg'
import img9 from '../../../assets/Images/Categories/costs/9.svg'
import img10 from '../../../assets/Images/Categories/costs/10.svg'
import img11 from '../../../assets/Images/Categories/costs/11.svg'
import img12 from '../../../assets/Images/Categories/costs/12.svg'
import img13 from '../../../assets/Images/Categories/costs/13.svg'
import img14 from '../../../assets/Images/Categories/costs/14.svg'
import img15 from '../../../assets/Images/Categories/costs/15.svg'
import img16 from '../../../assets/Images/Categories/costs/16.svg'
import img17 from '../../../assets/Images/Categories/costs/17.svg'
import img18 from '../../../assets/Images/Categories/costs/18.svg'
import img19 from '../../../assets/Images/Categories/costs/19.svg'
import img20 from '../../../assets/Images/Categories/costs/20.svg'

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20]

const StyledMain = styled.div`
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
    justify-content: center;
    align-content: flex-start;
    background-color: #151d42;
    margin-bottom: 10px;
`


const CardIcons = ({setCardImage, currentImg}) => {
   
    const iconsContent = images.map((img, key) => <Icon key={key} onClick={setCardImage} active={img === currentImg} img={img}></Icon>)
   
    return <StyledMain>{iconsContent}</StyledMain>
}

export default CardIcons


const StyledImg = styled.div`
    background-color: ${props => props.active ? '#9254de' : '#379683'};
    border-radius: 30%;
    width: 60px;
    & img {
        max-width: 100%;
    };
    &:hover {
        transform: scale(1.025)
    }
`

export const Icon = ({img, active, onClick}) => {
    const handlerClick = () => {
        onClick(img)
    }
    return (
        <StyledImg active={active} onClick={handlerClick}>
            <img alt='Иконка' src={img}></img>
        </StyledImg>
    )
}