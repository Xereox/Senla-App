import React from 'react'
import styled from 'styled-components'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar/Sidebar'
import AppWrapper from '../../components/AppWrapper'
import Additem from '../../components/UI/AddItem'
import PaymentsPopup from './Popups/PaymentsPopup'

const StyledMain = styled.div`
    grid-area: content;
    background-color: ${props => props.theme === 'light' ? '#E0E7E9' : '#1F2933'}
`
const Container = styled.div`
    margin: 0 auto;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    aling-items: center;
`

const CardsTitle = styled.div`
    color: black;
    font-size: 14px;
    text-align: center;
    color: ${props => props.theme === 'light' ? '' : '#EFEBE9'};
`

const CardsTotal = styled.div`
    color: ${props => props.theme === 'light' ? '' : '#EFEBE9'};
    font-size: 18px;
    text-align: center;
    margin-bottom: 15px;
`

const Payments = (props) => {
    const { deleteCard, updateCardInfo, addNewCard, popupVisible, cards, openPopup, closePopup, editCard, theme, curSymbol } = props

    const allCardsDeposit = cards.reduce((total, x) => parseInt(x.deposit) + total, 0)

    const content = cards.map(card=> {
        return <PaymentsType 
            theme={theme}
            onClick={editCard}
            cardInfo={card}
            key={card.id} 
            symbol={curSymbol}
            ></PaymentsType>
        })

    return (
    <AppWrapper>
        {popupVisible && <PaymentsPopup 
            cardInfo={popupVisible}
            closePopup={closePopup}
            addNewCard={addNewCard}
            updateCardInfo={updateCardInfo}
            deleteCard={deleteCard}
            curSymbol={curSymbol}
        />}
        <Header>Header</Header>
        <Sidebar selected={1}>Sidebar</Sidebar> 
        <Footer>footer</Footer>
        <StyledMain theme={theme}>
            <Container>
                <CardsTitle theme={theme}>Итого</CardsTitle>
                <CardsTotal theme={theme}>{`${allCardsDeposit} ${curSymbol}`}</CardsTotal>
                {content}
                <Additem onClick={openPopup}></Additem>
            </Container>
        </StyledMain>
    </AppWrapper> 
    )
}

export default Payments


const TypeContainer = styled.div`  
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    border-radius: 25px;
    background-color: ${props => props.theme === 'light' ? '#151d42' : '#616E7C'};
    position: relative;
    &:hover {
        transform: scale(1.01)
    }
`
const TypeTitle = styled.div`
color: ${props => props.theme === 'light' ? '#E0E7E9' : '#EFEBE9'};
padding-left: 20px;
font-size: 16px;
`
const TypeDeposit = styled.div`
color: ${props => props.theme === 'light' ? '#8b98d9' : '#bcccdc'};
font-size: 16px;
`

const TypeImg = styled.div`
    width: 25px;
    height: 25px;
    position: absolute;
    background: url(${props => props.img}) no-repeat center;
    background-size: cover;
    border-radius: 50%;
    top: 8px;
    left: 8px;
`



export const PaymentsType = ({symbol, cardInfo, onClick, theme = 'light'}) => {
    const { img, title, deposit } = cardInfo;
    const onClickHandler = () => onClick(cardInfo)
    return (
        <TypeContainer onClick={onClickHandler}>
            <TypeImg img={img}></TypeImg>
            <TypeTitle>{title}</TypeTitle>
            <TypeDeposit>{`${deposit} ${symbol}`}</TypeDeposit>
        </TypeContainer>
    )
}