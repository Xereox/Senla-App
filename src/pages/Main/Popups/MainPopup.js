import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import ControlPanel from '../../../components/ControlPanel/ControlPanel'
import PortalPopup from '../../../components/UI/PortalPopup'
import ModalPopupChooseCard from './MainPopupChooseCard'
import ModapPopupCategory from './ModalPopupCategory'
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import deleteItemModal from '../../../components/UI/DeleteItemModal'

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
const Commentary = styled.input`
    border: none;
    font-size: 1.2rem;
    color: #333;
    line-height: 1.2;
    border-bottom: 2px solid white;
    outline: none;
    text-align: center; 
    margin-bottom: 10px;
    padding: 5px;
`

const CommentaryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
`

const StyledDate = styled.div`
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
    font-family: 'Roboto';
    & div {
        color: #8b98d9;
        font-size: 16px;
    }
`

const Close = styled.button`
    align-self: flex-end;
`

const СhoosenCardTitle = styled.label`
    color: #14B5A1;
    font-size: 16px;
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

const getDay = date => ('0' + date.getDate()).slice(-2) // возвращает день в формате DD
const getMonth = date => ('0' + (date.getMonth() + 1)).slice(-2) // возвращает месяц в формате MM
const getYear = date => date.getFullYear() // ВОЗВРАЩАЕТ ГОД в формате YYYY
const dateFormatter = (date) => `${getYear(date)}-${getMonth(date)}-${getDay(date)}`

const MainPopup = ({ categoriesCosts, categoriesIncomes, closePopup, updateContent, setCategory, currentCategory, symbol, itemInfo, cards }) => {
    const {title, img, IDcategory, spending, commentary, IDcard = '', date: itemDate, id} = itemInfo;
    const itemCard = cards.find( card => card.id === IDcard )
    const isEdit = !!id;
    const [cardSpending, setcardSpending] = useState(spending || '')
    const [spendCategory, setSpendCategory] = useState({id: IDcategory, title, img})
    const [choosenCard, setChoosenCard] = useState(itemCard || '')
    const [comment, setComment] = useState(commentary || '')
    const [date, setDate] = useState(itemDate || dateFormatter(new Date()));
    const [displayErrors, setDisplayErrors] = useState(false)
    const commentHandler = (e) => setComment(e.target.value) 
    const spendingHandler = (e) => setcardSpending(e.target.value)

    const newOperation = {
        IDcategory: spendCategory.id,
        spending: +cardSpending,
        commentary: comment,
        IDcard: choosenCard.id,
        date: date,
        id: id
    }
    
    const enoughtMoney = () => {
        const rentMoney = (isEdit) ? (cardSpending - spending) : cardSpending;
        const availableMoney = cards.find( card => card.id === choosenCard.id )?.deposit
        if (!rentMoney || availableMoney === undefined) {
            return true
        }
        return (availableMoney - rentMoney) >= 0;
    }

    const errorMessages = () => {
        let errors = [];
        if (currentCategory === 'costs' && !enoughtMoney() ) {
            errors.push('Не хватает денег для операции')
        }
        (!newOperation.IDcategory) && errors.push('Категория не выбрана');
        (!newOperation.spending || newOperation.spending <= 0) && errors.push('Введите корректную сумму');
        (!newOperation.IDcard) && errors.push('Счёт не выбран');
        (!newOperation.date) && errors.push('Дата не выбрана');
        return errors.map( ( error, num ) => <div key={`error${num}`}>{`${num+1}. ${error}`}</div> ) 
    } 
    const errors = errorMessages()
    
    if (errors.length === 0 && displayErrors) {
        setDisplayErrors(false)
    }
    const submitHandler = (del) => {
        del = (del === 'del')
        const specialInfo = !isEdit ? false : {
            cardChanged: IDcard !== choosenCard.id,
            previousCard: IDcard,
            previousSum: spending
        } 
        if (del || errors.length === 0) {
            updateContent(newOperation, del, specialInfo);
            closePopup();
        } else if (!displayErrors){
            setDisplayErrors(true)
        }
    }
  
    const setDateHandler = (e) => setDate(e.target.value)

    const deleteModalOpen = () => deleteItemModal(submitHandler)

    return (
        <PortalPopup>
            <Container>
                <Close onClick={closePopup}>X</Close>
                {!isEdit && <ControlPanel 
                    setSpendCategory={setSpendCategory}
                    setCategory={setCategory} 
                    currentCategory={currentCategory}>
                </ControlPanel>}
                <div>
                    <StyledInput type="text" value={cardSpending} onChange={spendingHandler}></StyledInput> {symbol}
                </div>
                    <ModalPopupChooseCard choosenCard={choosenCard} setChoosenCard={setChoosenCard} cards={cards}></ModalPopupChooseCard>
                    <СhoosenCardTitle>
                        {choosenCard ? `${choosenCard.title} (${choosenCard.deposit} ${symbol})` : 'Не задан'}
                    </СhoosenCardTitle>
                <ModapPopupCategory 
                    categoriesCosts={categoriesCosts}
                    categoriesIncomes={categoriesIncomes} 
                    currentCategory={currentCategory} 
                    spendCategory={spendCategory} 
                    setSpendCategory={setSpendCategory}>
                </ModapPopupCategory>
                <StyledDate setDateHandler={setDateHandler}>
                    <input type="date" value={date} onChange={setDateHandler}></input>
                </StyledDate>
                <CommentaryContainer>Комментарий
                    <div>
                        <Commentary
                            value={comment} onChange={commentHandler}
                            placeholder='Комментарий'
                            type="text">
                        </Commentary>
                    </div>
                </CommentaryContainer>
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

export default MainPopup