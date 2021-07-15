import React, {useCallback, useMemo} from 'react'
import styled from 'styled-components'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar/Sidebar'
import AppWrapper from '../../components/AppWrapper'
import CategoryItem from '../../components/UI/CategoryItem'
import Additem from '../../components/UI/AddItem'
import ControlPanel from '../../components/ControlPanel/ControlPanel'
import CategoryPopup from './Popups/CategoryPopup'
import {editCategory} from "../../Redux/category-reducer";


const StyledMain = styled.div`
    padding: 30px;
    grid-area: content;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 15px;
    justify-content: space-around;
    align-content: flex-start;
  align-items: flex-end;
    background-color: ${props => props.theme === 'light' ? '#E0E7E9' : '#1F2933'}
`

const ControlContainer = styled.div`
    grid-area: 1 / 1 / 1 / 7;
    margin: 0 auto;
`

const Category = (props) => {

    const { updateContent, openPopup, closePopup, editCategory, setCurrentCategory, categoriesCosts, categoriesIncomes, popupVisible, currentCategory, theme} = props
    const contentCreator = () => {
        let content = (currentCategory === 'costs') ? categoriesCosts : categoriesIncomes;
        return content.map((item, key) => {
            return <Test key={key} render={ () => {
                return <CategoryItem
                    theme={theme}
                    title={item.title}
                    img={item.img}
                    color={item.color}
                    size={'120px'}
                    id={item.id}
                    onClick={editCategory}
                ></CategoryItem>
            }
            }/>
            })
    }
    
    const updateHandler = (item, del) => {
        updateContent(item, del, currentCategory, categoriesCosts, categoriesIncomes, popupVisible)
    }

    return (
        <AppWrapper>
            {popupVisible && <CategoryPopup updateContent={updateHandler}
                closePopup={closePopup}
                setCategory={setCurrentCategory}
                currentCategory={currentCategory} 
                itemInfo={popupVisible}
             />}
            <Header>Header</Header>
            <Sidebar selected={2}>Sidebar</Sidebar> 
            <Footer>footer</Footer>
            <StyledMain theme={theme}>
                <ControlContainer>
                    <ControlPanel setCategory={setCurrentCategory} currentCategory={currentCategory} theme={theme}></ControlPanel>
                </ControlContainer>
                { contentCreator() } 
            <Additem onClick={openPopup}></Additem>
            </StyledMain>
        </AppWrapper> 
    )
}

export default Category


export const Test = (props) => {
    return (
        <div>
            {props.render()}
        </div>
    )
}