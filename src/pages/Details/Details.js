import React, { useEffect } from 'react'
import styled from 'styled-components'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar/Sidebar'
import AppWrapper from '../../components/AppWrapper'
import Calendar from '../../components/Calendar/Calendar'
import 'antd/dist/antd.css';
import { Pagination, Select } from 'antd';

const { Option } = Select;

const Container = styled.div`
    background-color: ${props => props.theme === 'light' ? '#E0E7E9' : '#1F2933'};
    position: relative;
`
const DateSortContainer = styled.div`
    position: absolute;
    left: 10px;
`

const StyledMain = styled.div`
    padding-top: 5px;
    padding-bottom: 20px;
    grid-area: content;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 500px;
    margin: 0 auto;
    height: 100%;
`

const StatsContainer = styled.div`
    display: flex;
    width: 500px;
    flex-direction: column;
    align-items: center;
    padding-bottom: 8px;
`
const PaginationContainer = styled.div`
    margin-top: auto;  
    padding-top: 5px;  
`
const DateContainer = styled.div`
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const DateTitle = styled.div`
  align-self: flex-start;
  padding-left: 20px;
  font-size: 16px;
  color: ${props => props.theme === 'light' ? '#354649' : '#BDBDBD'};
  font-family: Roboto;
  font-weight: bold;
`

const itemRender = (current, type, originalElement ) => originalElement;
const pageSize = 10;

const Details = (props) => {
    const { curSymbol, setCurrentPage, setPeriod, changeSortDate, period, currentPage, sortDate, cards, costs, income, theme, categoriesCosts, categoriesIncomes} = props; 
    
    useEffect(() => {
        setCurrentPage(1)
    }, [period, cards, sortDate, setCurrentPage])


    const SynchroDataCreater = (data, category) => {
        if (!category[0]) {
            return []
        }
        return data.map( item => {
            const itemCategory = category.find(category => category.id === item.IDcategory) || []
            return {
                ...item,
                img: itemCategory.img,
                color: itemCategory.color,
                title: itemCategory.title
            }
        })
    }

    const allData = [
        ...SynchroDataCreater(costs, categoriesCosts),
        ...SynchroDataCreater(income.map( element => {
            return {...element, income: true}
        }), categoriesIncomes)
    ]

    const dateGrouper = (arr) => {
        return arr.reduce((result, item) => {
            result[item.date] = (result[item.date]) ? 
                [ ...result[item.date], item ] 
                : [item];
            return result;
        }, {})
    }

    const filterContent = (item) => {
        if (!cards[0] || !period.title) {
            return false
        }
        const cardId = cards.find(card => card.active === 'true')?.id || 'defaultCard'; 
        const itemDate = new Date(item.date);
        const areThisCard = cardId === 'defaultCard' || item.IDcard === cardId
        const areThisPeriod = ( itemDate >= new Date(period.date[0]) ) && ( itemDate <= new Date(period.date[1]) )  
        return areThisCard && areThisPeriod
    } 
    
    const filterByPage = (element, pos) => {
        const from = currentPage*pageSize-pageSize+1;
        const to = currentPage*pageSize
        pos++;
        return (pos >= from) && (pos <= to)
    }

    const dateBlocksCreator = (content) => {
        const dateGroupContent = dateGrouper(content)
        return Object.keys(dateGroupContent).map( (data, key) => {
            let dataContent = dateGroupContent[data]
            dataContent = dataContent.map( (item, key) => {
                return ( 
                    <PaymentsType
                        theme={theme}
                        symbol={curSymbol}
                        key={key} 
                        itemInfo={item}>
                    </PaymentsType>
                )
            })
            return <DateContainer key={`data${key}`}>
                        <DateTitle>{data}</DateTitle>
                        {dataContent}
                    </DateContainer>
        })
    }                 

    const contentSorter = (x,y) => sortDate * ( new Date(y.date) - new Date(x.date) )

    const contentCreator = () => {
        const content = allData.sort( contentSorter )
        const filteredContent = content.filter(filterContent).filter(filterByPage)
        return dateBlocksCreator(filteredContent)
    }

    const content = contentCreator();

    return (
        <AppWrapper>
            <Header>Header</Header> 
            <Sidebar selected={3}>Sidebar</Sidebar> 
            <Footer>footer</Footer>
            <Container theme={theme}> 
                <StyledMain>
                    <StatsContainer>
                        <Calendar period={period} setPeriod={setPeriod} />
                        <DateSortContainer>
                            <Select value={sortDate} onChange={changeSortDate}>
                                <Option value="1">По убыванию</Option>
                                <Option value="-1">По возрастанию</Option>
                            </Select>
                        </DateSortContainer>
                    </StatsContainer>
                    {content.length > 0 ? content : `Операции не найдены`}
                    <PaginationContainer>
                        <Pagination 
                            total={allData.filter(filterContent).length} 
                            itemRender={itemRender} 
                            hideOnSinglePage 
                            pageSize={pageSize} 
                            showSizeChanger={false} 
                            current={currentPage}
                            onChange={setCurrentPage}
                        />
                    </PaginationContainer>
                </StyledMain>
            </Container>
        </AppWrapper> 
    )
}

export default Details

const TypeContainer = styled.div`  
    margin-bottom: 7px;
    display: flex;
    flex-direction: column;
    padding: 5px 20px;
    padding-left: 12%;
    background-color: ${props => props.theme === 'light' ? '#F5F5F5' : '#616E7C'};
    border-radius: 10px;
    position: relative;
    width: 95%;
    height: 56px;
    overflow: hidden;
    &:hover,
    &:focus {
        box-shadow: 0 0 3px 1px rgba(0, 0, 0, 1);
        outline: none;
    };
    &:active {
        transform: scale(0.99);
        box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.4);
        outline: none;
    };
`
const TypeTitle = styled.div`
padding-left: 20px;
font-size: 15px;
position: absolute;
top: 2px;
right: 10px;
font-size: 16px;
color: ${props => props.theme === 'light' ? '#354649' : '#DCEDC8'};
font-family: Roboto;
font-weight: bold;
`
const TypeCommentary = styled.div`
color: #7CB342;
font-size: 14px;
flex: 1 1 15%;
`

const TypeDeposit = styled.div`
color: ${props => props.income ? '#00BFA5' : '#FF7043'};
font-size: 15px;
font-family: Roboto;
font-weight: bold;
`

const TypeImg = styled.div`
    width: 50px;
    height: 50px;
    background: url(${props => props.img}) no-repeat center ${props => props.color};
    background-size: cover;
    border-radius: 10px;
    position: absolute;
    bottom: 3px;
    left: 3px;
`

export const PaymentsType = ({itemInfo, symbol, onClick, theme = 'light'}) => {
    const {img, title, spending, color ='', commentary, income } = itemInfo;
    /**const onClickHandler = () => onClick(itemInfo) */
    const sign = income ? '+' : '-';
    return (
        <TypeContainer color={color} theme={theme}>
            <TypeImg color={color} img={img}></TypeImg>
            <TypeTitle theme={theme}>{title}</TypeTitle>
            <TypeDeposit income={income}>{`${sign}${spending} ${symbol}`}</TypeDeposit>
            <TypeCommentary>{`Комментарий: ${commentary}`}</TypeCommentary>
        </TypeContainer>
    )
}

