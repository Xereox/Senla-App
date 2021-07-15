import React, { useState } from 'react'
import styled from 'styled-components'
import PaymentsColor from '../PaymentsColor'
import CardIcons from './CardIcons'
import PortalPopup from '../../../components/UI/PortalPopup'
import { Button } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import deleteItemModal from '../../../components/UI/DeleteItemModal'
import { DeleteOutlined } from '@ant-design/icons';

const StyledInput = styled.input`
    border: none;
    font-size: 1.2rem;
    color: #333;
    width: 80px;
    line-height: 1.2;
    background: none;
    border-bottom: 2px solid white;
    color: white;
    outline: none;
    text-align: center; 
    margin-bottom: 10px;
`

const Container = styled.div`
    margin-top: 50px;
    padding: 50px;
    background-color: #151d42;
    display: flex;
    max-width: 800px;
    width: 70%;
    min-height: 80%;
    flex-direction: column;
    align-items: center;
    & div {
        color: #8b98d9;
        font-size: 16px;
    }
`

const Close = styled.button`
    align-self: flex-end;
`

const CardName = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    width: 50%;
`
const CardNameTitle = styled.div`
    margin-right: 5px;
`
const CardNameInput = styled.input`
    border: none;
    font-size: 1.2rem;
    color: #333;
    line-height: 1.2;
    background: none;
    border-bottom: 2px solid white;
    color: white;
    outline: none;
    margin-bottom: 10px;
`
const ButtonsContainer = styled.div`
`
const DeleteButtonContainer = styled.div`
    margin-bottom: 50px;
`
const ErrorContainer = styled.span`
    display: ${props => props.show ? 'block' : 'none'};
    border: 1px solid white;
    background-color: #e8eaf6;
    margin-top: 15px;
    padding: 15px;
    border-radius: 10px;
    & div {
        color: #d32f2f;
        font-size: 16px;
        font-family: Roboto;
    }
`


const PaymentsPopup = ({ closePopup, addNewCard, updateCardInfo, deleteCard, curSymbol, cardInfo }) => {
    const {title, id, img, deposit, color, active} = cardInfo;
    const isEdit = !!id;
    const [cardDeposit, setCarddDeposit] = useState(isNaN(deposit) ? '' : deposit)
    const [cardTitle, setCardTitle] = useState(title || '')
    const [cardColor, setCardColor] = useState(color)
    const [cardImage, setCardImage] = useState(img)
    const [displayErrors, setDisplayErrors] = useState(false)
    const setDepositHandler = (e) => setCarddDeposit(e.target.value)

    const newCard = {
        img: cardImage,
        title: cardTitle,
        deposit: +cardDeposit,
        color: cardColor,
        active: active || 'false',
        id: id
    }

    const errorMessages = () => {
        let errors = [];
        (!newCard.deposit || newCard.deposit < 0) && errors.push('Введите корректную сумму');
        (!newCard.title) && errors.push('Введите название карты');
        (!newCard.img) && errors.push('Логотип карты не выбран');
        (!newCard.color) && errors.push('Цвет не выбран');
        return errors.map( ( error, num ) => <div key={`error${num}`}>{`${num+1}. ${error}`}</div> ) 
    } 

    const errors = errorMessages()
    if (errors.length === 0 && displayErrors) {
        setDisplayErrors(false)
    }

    const submitHandler = (del) => {
        del = (del === 'del')
        if (del) {
            deleteCard(newCard)
            closePopup()
        } else if (errors.length === 0) {
            isEdit ? updateCardInfo(newCard)
            : addNewCard(newCard)
            closePopup()
        } else {
            setDisplayErrors(true)
        }
    }
   
    const deleteModalOpen = () => deleteItemModal(submitHandler)

    

    return (
        <PortalPopup>
            <Container>
                <Close onClick={closePopup}>X</Close>
                <div>
                    <StyledInput 
                        type="text"
                        value={cardDeposit} 
                        onChange={setDepositHandler}></StyledInput> {curSymbol}
                </div>
                <CardName>
                    <CardNameTitle>Имя счёта</CardNameTitle>
                    <CardNameInput 
                        value={cardTitle} 
                        onChange={(e) => setCardTitle(e.target.value)} 
                        type="text" placeholder="Введите имя счёта" >
                    </CardNameInput>
                </CardName>
                <CardIcons setCardImage={setCardImage} currentImg={cardImage}></CardIcons>
                <PaymentsColor cardColor={cardColor} setCardColor={setCardColor}></PaymentsColor>
                {isEdit && 
                    <DeleteButtonContainer>
                        <Button type="text" icon={<DeleteOutlined/>} shape={'round'} danger onClick={deleteModalOpen}>УДАЛИТЬ</Button>
                    </DeleteButtonContainer>
                }
                <ButtonsContainer>
                    <Button type="primary" block onClick={submitHandler} shape={'round'}>
                        {isEdit ? 'Сохранить' : 'Добавить'}
                    </Button>
                </ButtonsContainer>
                <ErrorContainer show={displayErrors}>{errorMessages()}</ErrorContainer> 
            </Container>
        </PortalPopup>
    )
}

export default PaymentsPopup