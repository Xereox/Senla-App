import React, { useState } from 'react'
import styled from 'styled-components'
import PortalPopup from '../../../components/UI/PortalPopup'

const CardsFilter = styled.div`
display: flex;
flex-direction: column;
width: 300px;
padding-top: 10%;
`
const CardFilterButton = styled.button`

`
const CardFilterButtonContainer = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 5px;
    background-color: #151d42;
`

const ChooseCard = styled.div`
    margin-bottom: 10px;
`
const ChooseCardTitle = styled.div`
    text-align: center;
    padding: 5px 10px;
    border-bottom: 3px solid lightgrey;
    font-size: 16px;
    color: grey;
`

const ModalPopupChooseCard = ({choosenCard, setChoosenCard, cards}) => {
    const [editMode, setEditMode] = useState(false)
    const enableEditMode = () => setEditMode(true)
    const disableEditMode = () => setEditMode(false)
    const cancelHandler = () => {
        setChoosenCard('');
        disableEditMode();
    }

    const cardsContent = cards.map((x, key) => <Card key={key} active={choosenCard.id === x.id} card={x} onClick={setChoosenCard}></Card>)

    return (    
       <ChooseCard>
            {editMode ? <PortalPopup>
                <CardsFilter>
                    {cardsContent}
                    <CardFilterButtonContainer>
                        <CardFilterButton onClick={cancelHandler}>Отмена</CardFilterButton>
                        <CardFilterButton onClick={disableEditMode}>Выбрать</CardFilterButton>
                    </CardFilterButtonContainer>
                </CardsFilter>
                </PortalPopup> :
                <ChooseCardTitle onClick={enableEditMode}>Счет</ChooseCardTitle>
            }
       </ChooseCard>
    )
}

export default ModalPopupChooseCard



const ItemToChoose = styled.div`
    padding: 8px;
    background: ${props => props.active ? '#3237a1' : 'white'};
`
const ItemInfo = styled.div`
    padding-left: 40px;
`

const ItemTitle = styled.div`
 color: ${props => props.active ? `white` : 'black'};
 font-size: 12px;
`
const ItemDeposit = styled.div`
 color: #13b0a0;
 font-size: 12px;
 padding-bottom: 5px;
 border-bottom: 2px solid lightgrey;
`

export const Card = ({active, onClick, card}) => {
    const {id, deposit, title, color} = card;
    const onClickHandler = () => onClick({id, color, title, deposit})
    return (
        <ItemToChoose active={active} onClick={onClickHandler}>
            <ItemInfo>
                <ItemTitle active={active}>{card.title}</ItemTitle>
                <ItemDeposit>{card.deposit}</ItemDeposit>
            </ItemInfo> 
        </ItemToChoose>
    )
}

