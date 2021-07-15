import React from "react";
import styled from 'styled-components'
import CardType from './../CardType'
import {axiosUpdateCards } from "../../lib/Axios";
import defaultCardImg from '../../assets/Images/defaultCard.svg'

const Container = styled.div`
    z-index: 2;
    height: 100%;
`

const CurrentType = styled.div`
    Color: white;
    font-family: Roboto;
    font-size: 14px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CardsMenuContainer = styled.div`
    display: none;
    position: absolute;
    width: 250px;
    left: -20px;
`

const CardsFilter = styled.div`
    height: 100%;
    position: relative;
    &:hover ${CardsMenuContainer} {
        display: block;
    };
`

const HeaderChoosePay = ( { cards, setCards, curSymbol, theme }) => {
    
    const activeCardTitle =() => { 
        const activeCard = cards.find(card => card.active === 'true') || {title: 'Все счета'} 
        return activeCard.title[0].toLowerCase()+ activeCard.title.slice(1)
    }

    const allCardsDeposit = cards.reduce((total, card) => total + parseInt(card.deposit), 0)

    const chooseCard = (id) => { 
        const newCardData = cards.map(card => {
            if (card.id === id) {
                card.active = 'true'
            } else {
                card.active = 'false'
            }
            return card
        })
        axiosUpdateCards(newCardData).then(resolve => setCards(newCardData))
    }

    const content = cards.map(card => {
        return <CardType 
            theme={theme}
            key={card.id}
            onClick={chooseCard} 
            id={card.id} 
            active={card.active === 'true'} 
            img={card.img} 
            title={card.title} 
            deposit={`${card.deposit} ${curSymbol}`}
            ></CardType>
    })


    const defaultCardActiveCheck = cards.find(card => card.active === 'true') === undefined; // дефолтная карта активна тогда, когда остальные неактивны
    const defaultCard =  <CardType 
        theme={theme}
        title='Все счета' 
        active={defaultCardActiveCheck} 
        img={defaultCardImg} 
        deposit={`${allCardsDeposit} ${curSymbol}`} 
        onClick={chooseCard} 
        id={'defaultCard'}>
    </CardType>
    
    return (
        <Container>
            <CardsFilter>
                <CurrentType>
                    Текущий счёт: {activeCardTitle()} 
                </CurrentType>
                <CardsMenuContainer>
                    {defaultCard}
                    {content}
                </CardsMenuContainer>   
            </CardsFilter>
        </Container>
    )
}

export default HeaderChoosePay

