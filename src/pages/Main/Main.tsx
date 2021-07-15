import React, {ImgHTMLAttributes, ReactElement, useEffect, useState} from 'react'
import styled from 'styled-components'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar/Sidebar'
import AppWrapper from '../../components/AppWrapper'
import StatsMain from '../../components/UI/StatsMain'
import ControlPanel from '../../components/ControlPanel/ControlPanel'
import Calendar from '../../components/Calendar/Calendar'
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import MainPopup from './Popups/MainPopup'
import 'antd/dist/antd.css';
import {Switch, Pagination, Image} from 'antd';
import { InitialStateType } from "../../Redux/main-reducer";
import Main from "./MainContainer";
import {MenuTheme} from "antd/lib/menu/MenuContext";

const HookTest = styled.div`
`
const Container = styled.div`
    background-color: ${props => props.theme === 'light' ? '#E0E7E9' : '#1F2933'};
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
    position: relative;
    padding-bottom: 15px;
`
const AddItemContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    align-self: flex-end;
`
const SwitchGlueContainer = styled.div`
    position: absolute;
    left: 3%;
    top: 50px;
`
const PaginationContainer = styled.div`
    margin-top: auto;  
    padding-top: 5px;  
`

type AntRenderType = 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next'
const itemRender = (current: number, type: AntRenderType, originalElement: ReactElement) => originalElement;
const pageSize = 8;

export type MainCategoryType = 'costs' | 'income'
export type MainPeriodType = {
    title: string,
    date: Array<string>
    id: number
}
export type CardType = {
    img: string
    title: string
    deposit: number
    color: string
    active: string
    id: string
}
export type CategoryItemType = {
    img: string
    title: string
    color: string
    id: number
}
export type MainItemType = {
    title: string
    img: string
    IDcategory: number
    spending: number
    commentary: string
    IDcard: string
    date: string
    id: number
    color: string
}
export type SpecialInfoType = {
    cardChanged: boolean,
    previousCard: string,
    previousSum: number
}

type OperationsType = (itemToDelete: MainItemType, path: string, categoryContent: Array<MainItemType>) => void
type MainPropsType = {
    main: InitialStateType,
    categoriesCosts: Array<CategoryItemType>,
    categoriesIncomes: Array<CategoryItemType>,
    theme: string,
    curSymbol : string,
    cards: Array<CardType>
    openPopup: () => void,
    closePopup: () => void,
    toggleGlue: () => void,
    setCurrentPage: (currentPage: number) => void
    editItem: (item: MainItemType) => void
    setCategory: (category: MainCategoryType) => void
    setPeriod: (period: MainPeriodType) => void
    setCardFromServer:  (cards: Array<CardType>) => Promise<string>
    deleteOperation: OperationsType
    updateOperation: OperationsType
    addNewOperation: OperationsType
}


const MainPage: React.FC<MainPropsType> = (props) => {

    const { main, openPopup, closePopup, toggleGlue, 
        setCurrentPage, editItem, setCategory,
        setPeriod, deleteOperation, updateOperation, addNewOperation, 
        categoriesCosts, categoriesIncomes, theme, curSymbol, cards, setCardFromServer
    } = props
    const {category, costs, income, glue, popupVisible, period, currentPage} = main
    
    useEffect(() => { 
        setCurrentPage(1)
    }, [ category, glue, period, setCurrentPage ])

    const contentWithCategoriesSynchro = (): Array<MainItemType>  => {
        let content = (category === 'costs') ? costs : income;
        let categoryContent = (category === 'costs') ? categoriesCosts : categoriesIncomes;
        if (!categoryContent[0]) {
            return []
        }
        return content.map( item => {
            const itemCategory = categoryContent.find(category => category.id === item.IDcategory)
            return !itemCategory
                ? item
                : {
                    ...item,
                    img: itemCategory?.img,
                    color: itemCategory?.color,
                    title: itemCategory?.title
                }
        })
    }

    const filterContent = (item: MainItemType ): boolean => {
        if (!cards[0] || !period.title ) {
            return false
        }
        const cardId = cards.find(card => card.active === 'true')?.id || 'defaultCard'; 
        const itemDate = new Date(item.date);
        const areThisCard = cardId === 'defaultCard' || item.IDcard === cardId
        const areThisPeriod = ( itemDate >= new Date(period.date[0]) ) && ( itemDate <= new Date(period.date[1]) )  
        return areThisCard && areThisPeriod
    } 

    type GlueType = { [key: string ]: MainItemType}
    const glueFilter = (arr: Array<MainItemType> ) => {
        const filterObj = arr.reduce((result: GlueType, item) => {
            result[item.title] = (result[item.title]) ?
                {
                    ...result[item.title], 
                    spending: +result[item.title].spending + +item.spending 
                } 
                : item;
            return result;
        }, {})
        return Object.values(filterObj) 
    }

    const costsSum = costs.filter(filterContent).reduce((total, x) => x.spending + total, 0)
    const incomeSum = income.filter(filterContent).reduce((total, x) => x.spending + total, 0)
    
    const updateCardBalance = (cardID: string, sum: number, del: boolean, specialInfo: SpecialInfoType): Promise<string> => {
        let newCardsData = [...cards]
        const sign = (category === 'costs') ? 1 : -1;
        const changeCardBalance = (id: string, sum: number) => {
            newCardsData = newCardsData.map( card => {
                return (card.id === id) ? {...card, deposit: card.deposit + sum} : card
            })
        }
        if ( (category === 'costs' && !del ) || (category === 'income' && del ) ) {
            sum = -sum
        } 
        if (specialInfo && !del) {
            if (!specialInfo.cardChanged) {
                sum += specialInfo.previousSum*sign
            } else {
                changeCardBalance(specialInfo.previousCard, specialInfo.previousSum*sign)
            }
        }   
        changeCardBalance(cardID, sum)
        return setCardFromServer(newCardsData)
    }

    const updateContent = (operation: MainItemType, del: boolean, specialInfo: SpecialInfoType): void => {
        const isEdit = !!popupVisible
        const path = (category === 'costs') ? 'maincosts' : 'mainincome';
        const categoryContent = (category === 'costs') ? costs : income;
        updateCardBalance(operation.IDcard, operation.spending, del, specialInfo)
            .then( resolve => { 
                if (del) {
                    deleteOperation(operation, path, categoryContent)
                } else if (isEdit) {
                    updateOperation(operation, path, categoryContent)
                } else {
                    addNewOperation(operation, path, categoryContent)
                }
        })
    }

    const getPercent = (sum: number): string => {
        const allSpend = (category === 'costs') ? costsSum : incomeSum;
        return Math.round((sum / allSpend) * 100) + '%'
    }
    
    const filterByPage = (element: ReactElement, pos: number): boolean => {
        const from = currentPage*pageSize-pageSize+1;
        const to = currentPage*pageSize
        pos++;
        return (pos >= from) && (pos <= to)
    }
    
    const contentCreator = (): Array<ReactElement> => {
        let content = contentWithCategoriesSynchro().filter(filterContent)
        if (glue) {
            content = glueFilter(content as Array<MainItemType>);
        }
        return content
            .map( (item, key) => {
                return (
                    <PaymentsType
                        theme={theme}
                        onClick={editItem}
                        symbol={curSymbol}
                        key={key}
                        percent={getPercent(item?.spending as number)}
                        itemInfo={item}>
                    </PaymentsType>
            )
        })
    }

    const useTimer = () => {
        const [value, setValue] = useState(0)
        useEffect(() => {
            let a = setInterval(() => setValue(x => ++x ) , 1000)
            return () => clearInterval(a)
        })
        return value
    }

    return (
        <AppWrapper>
            {popupVisible && <MainPopup
                categoriesCosts={categoriesCosts}
                categoriesIncomes={categoriesIncomes}
                cards={cards}
                itemInfo={popupVisible}
                symbol={curSymbol}
                updateContent={updateContent} 
                closePopup={closePopup}
                currentCategory={category}
                setCategory={setCategory}
            />}
            <Header>Header</Header> 
            <Sidebar selected={0}>Sidebar</Sidebar>
            <Footer>footer</Footer>
            <Container theme={theme}> 
                <StyledMain>
                    <HookTest>Вы находитесь на странице {useTimer()} секунд</HookTest>
                    <ControlPanel setCategory={setCategory} currentCategory={category} theme={theme}/>  
                    <StatsContainer>
                        <SwitchGlueContainer>
                            <Switch checkedChildren="Uniq" unCheckedChildren="All" checked={glue} onChange={toggleGlue} size='small'/>
                        </SwitchGlueContainer>
                        <Calendar period={period} setPeriod={setPeriod} theme={theme}/>
                        <StatsMain 
                            theme={theme}
                            symbol={curSymbol}
                            period={period}
                            title={category === 'costs' ? 'Расходы' : 'Доходы'} 
                            costs={costsSum} 
                            deposit={incomeSum} 
                            info={glueFilter(contentWithCategoriesSynchro().filter(filterContent))}
                        /> 
                        <AddItemContainer>
                            <IconButton onClick={openPopup} aria-label="delete">
                                <AddBoxIcon fontSize="large"/>
                            </IconButton>
                        </AddItemContainer> 
                    </StatsContainer>
                        {contentCreator().filter(filterByPage)}
                    <PaginationContainer>
                        <Pagination 
                            total={contentCreator().length} 
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

export default MainPage


const TypeContainer = styled.div`  
    margin-bottom: 7px;
    display: flex;
    padding: 10px 20px;
    padding-right: 5%;
    border-radius: 25px;
    background-color: ${props => props.theme === 'light' ? '#151d42' : '#616E7C'};
    position: relative;
    width: 95%;
    overflow: hidden;
    &:hover,
    &:focus {
        box-shadow:  0 0 3px 1px ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 225, 250, 1)'};
        outline: none;
    };
    &:active {
        transform: scale(0.99);
        box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.4);
        outline: none;
    };
    &::after {
        content: '';
        width: 4%;
        height: 100%;
        display: block;
        position: absolute;
        background: ${props => props.color ? props.color : "none"};
        bottom: 0;
        right: 0;
    }
`
const TypeTitle = styled.div`
color: ${props => props.theme === 'light' ? '#E0E7E9' : '#EFEBE9'};
padding-left: 20px;
font-size: 15px;
flex: 0 1 60%;
`
const TypePercent = styled.div`
color: ${props => props.theme === 'light' ? '#8b98d9' : '#bcccdc'};
font-size: 15px;
flex: 1 1 15%;
`

const TypeDeposit = styled.div`
color: #ff5722;
font-size: 15px;
font-family: Roboto;
`

const TypeImg = styled.div<{img: string}>`
    width: 30px;
    height: 30px;
    background: url(${props => props.img}) no-repeat center ${props => props.color};
    background-size: cover;
    border-radius: 50%;
    position: absolute;
    top: 6px;
    left: 6px;
`

type PaymentsTypePropsType = {
    itemInfo: MainItemType
    percent: string
    symbol: string
    onClick: (item: MainItemType) => void
    theme: string
}
export const PaymentsType: React.FC<PaymentsTypePropsType> = ({itemInfo, percent, symbol, onClick, theme = 'light'}) => {
    const {img, title, spending, color =''} = itemInfo;
    const onClickHandler = () => onClick(itemInfo)
    return (
        <TypeContainer color={color} onClick={onClickHandler} theme={theme}>
            <TypeImg color={color} img={img}></TypeImg>
            <TypeTitle theme={theme}>{title}</TypeTitle>
            <TypePercent theme={theme}>{percent}</TypePercent>
            <TypeDeposit theme={theme}>{`${spending} ${symbol}`}</TypeDeposit>
        </TypeContainer>
    )
}


