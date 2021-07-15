import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { axiosGetItems, axiosUpdatePeriod } from '../../lib/Axios'
import DateRange from '../UI/DateRange'

const Container = styled.div`
    display: flex;
    width: 95%;
    justify-content: space-around;
    padding-bottom: 10px;
    margin-bottom: 10px;
    background-color: ${props => props.theme === 'light' ? '#354649' : '#37474F'};
    border-radius: 15px;
`
const Control = styled.div`
    cursor: pointer;
    font-size: 15px;
    color: ${props => props.theme === 'light' ? '#E0E7E9' : '#EFEBE9'};
    padding: 8px 15px;
    border-bottom: ${props => props.active ? '2px' : '0'} solid #FBEAEB;
`
const today = new Date();
//ниже пару функций для форматирования дат
const getDay = date => ('0' + date.getDate()).slice(-2) // возвращает день в формате DD
const getMonth = date => ('0' + (date.getMonth() + 1)).slice(-2) // возвращает месяц в формате MM
const getYear = date => date.getFullYear() // ВОЗВРАЩАЕТ ГОД в формате YYYY
const dateFormatter = (date) => `${getYear(date)}-${getMonth(date)}-${getDay(date)}`

const week = () => new Date(new Date().setDate(today.getDate()-7)); //Возвращает дату, которая была неделю назад
const month = () => {
    let newDate = new Date(getYear(today), getMonth(today)-2, getDay(today))
    if (getDay(newDate) !== getDay(today)) { 
        newDate = new Date(new Date().setDate(1))
    } 
    return newDate // возвращает дату, которая была мес назад
}
const year = () => new Date(getYear(today)-1, getMonth(today)-1, getDay(today)) // возвращает день, который был год наа

const dates = {
    day: [dateFormatter(today), dateFormatter(today)],
    month: [dateFormatter(month()), dateFormatter(today)],
    year: [dateFormatter(year()), dateFormatter(today)],
    week: [dateFormatter(week()), dateFormatter(today)]
}

const content = [
    {title:'День', date: dates.day},
    {title: 'Неделя', date: dates.week}, 
    {title: 'Месяц', date: dates.month}, 
    {title: 'Год', date:dates.year}, 
    {title: 'Период', date: 's'}
] 

const Calendar = ({period, setPeriod, theme = 'light'}) => {
    const [popupVisible, setPopupVisible] = useState(false)
    useEffect( () => {
        axiosGetItems('period').then(period => {
            let choosenPeriod = period[0];
            let actualPeriod = content.find(period => period.title === choosenPeriod.title)
            if (actualPeriod.title === 'Период') actualPeriod.date = choosenPeriod.date;
            setPeriod(actualPeriod)            
        })
    },[setPeriod])

    const togglePopup = () => setPopupVisible(!popupVisible)

    const setPeriodHadler = (period) => {
        axiosUpdatePeriod(period).then( resolve => {
            setPeriod(period)
        })
    } 

    const updatePeriodFromModal = (value) => {
        content[4] = {...content[4], date: value}
        axiosUpdatePeriod(content[4]).then( resolve => {
            togglePopup();
            setPeriod(content[4])
        })
    }

    const calendarData = content.map(x => {
        return <CurrentData 
            theme={theme}
            key={x.title} 
            active={period === x} 
            onClick={(x.title !== 'Период') ? setPeriodHadler : togglePopup} 
            data={x}
        />
    })

    return (
        <Container theme={theme}>
            {popupVisible && <DateRange onSubmit={updatePeriodFromModal} closePopup={togglePopup}></DateRange>}
            {calendarData}
        </Container>
    )
}

export default Calendar


export const CurrentData = ({onClick, active, data, theme}) => {
    const onClickHandler = () => onClick(data)
    return <Control active={active} onClick={onClickHandler} theme={theme}>{data.title}</Control>
}

