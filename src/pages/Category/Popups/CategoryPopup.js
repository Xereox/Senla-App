import React, { useState } from 'react'
import styled from 'styled-components'
import PaymentsColor from '../../Payments/PaymentsColor'
import CardIcons from './CardIcons'
import CardChooseCategory from './CategoryChooseRadio'
import PortalPopup from '../../../components/UI/PortalPopup'
import { Button  } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import deleteItemModal from '../../../components/UI/DeleteItemModal'
import { DeleteOutlined } from '@ant-design/icons';

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


const CategoryPopup = ({closePopup, updateContent, currentCategory, setCategory, itemInfo}) => {
    const {title, img, id, color} = itemInfo;
    const isEdit = !!id;
    const [cardTitle, setCardTitle] = useState(title || '')
    const [cardColor, setCardColor] = useState(color)
    const [cardImage, setCardImage] = useState(img)
    const [displayErrors, setDisplayErrors] = useState(false)
    const newCard = {
        img: cardImage,
        title: cardTitle,
        color: cardColor,
        id: id
    }
    
    const errorMessages = () => {
        let errors = [];
        (!newCard.title) && errors.push('Введите название категории');
        (!newCard.img) && errors.push('Логотип категории не выбран');
        (!newCard.color) && errors.push('Цвет не выбран');
        return errors.map( ( error, num ) => <div key={`error${num}`}>{`${num+1}. ${error}`}</div> ) 
    } 

    const errors = errorMessages()
    if (errors.length === 0 && displayErrors) {
        setDisplayErrors(false)
    }

    const submitHandler = (del) => {
        del = (del === 'del') 
        if (errors.length === 0 ) {
            updateContent(newCard, del)
            closePopup()
        } else {
            setDisplayErrors(true)
        }
    }

    const openModalHandler = () => deleteItemModal(submitHandler)

    return (
        <PortalPopup>
            <Container>
                <Close onClick={closePopup}>X</Close>
                <CardName>
                    <CardNameInput value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} type="text" placeholder="Название категории" ></CardNameInput> 
                </CardName>
                { !isEdit && <CardChooseCategory currentCategory={currentCategory} setCategory={setCategory}></CardChooseCategory> }
                <CardIcons setCardImage={setCardImage} currentImg={cardImage}></CardIcons>
                <PaymentsColor cardColor={cardColor} setCardColor={setCardColor}></PaymentsColor>
                {isEdit && 
                    <DeleteButtonContainer>
                        <Button type="text" icon={<DeleteOutlined/>} shape={'round'} danger onClick={openModalHandler}>УДАЛИТЬ</Button>
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

export default CategoryPopup