import React from 'react'
import styled from 'styled-components'
import img1 from '../../../assets/Images/CardImages/1.png'
import img2 from '../../../assets/Images/CardImages/2.png'
import img3 from '../../../assets/Images/CardImages/3.png'
import img4 from '../../../assets/Images/CardImages/4.png'
import img5 from '../../../assets/Images/CardImages/5.png'
import img6 from '../../../assets/Images/CardImages/6.png'
import img7 from '../../../assets/Images/CardImages/7.png'
import img8 from '../../../assets/Images/CardImages/8.png'
import img9 from '../../../assets/Images/CardImages/9.png'
import img10 from '../../../assets/Images/CardImages/10.png'
import img11 from '../../../assets/Images/CardImages/11.png'
import img12 from '../../../assets/Images/CardImages/12.png'
import img13 from '../../../assets/Images/CardImages/13.png'
import img14 from '../../../assets/Images/CardImages/14.png'
import img15 from '../../../assets/Images/CardImages/15.png'
import img16 from '../../../assets/Images/CardImages/17.png'
import img17 from '../../../assets/Images/CardImages/18.png'
import img18 from '../../../assets/Images/CardImages/19.png'
import img19 from '../../../assets/Images/CardImages/20.png'
import img20 from '../../../assets/Images/CardImages/21.png'



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

const images=[img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14,img15,img16,img17,img18,img19,img20]

const CardIcons = ({setCardImage, currentImg}) => {
    const iconsContent = images.map((img, key) => <Icon onClick={setCardImage} active={img === currentImg} img={img} key={key}></Icon>)
   
    return <StyledMain>{iconsContent}</StyledMain>
}

export default CardIcons


const StyledImg = styled.div`

width: 60px;
 & img {
    max-width: 100%;
    ${props => props.active && `border-bottom: 1px solid red`}
 }
`

export const Icon = ({img, active, onClick}) => {
    const handlerClick = () => {
        onClick(img)
    }
    return (
        <StyledImg active={active} onClick={handlerClick}>
            <img src={img} alt='img'></img>
        </StyledImg>
    )
}