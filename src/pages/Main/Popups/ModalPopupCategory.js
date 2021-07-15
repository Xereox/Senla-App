import React from 'react'
import styled from 'styled-components'
import CategoryItem from '../../../components/UI/CategoryItem'

const StyledMain = styled.div`
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
    background-color: #151d42;
    margin-bottom: 10px;
`

const ModapPopupCategory = ({currentCategory, spendCategory, setSpendCategory, categoriesCosts, categoriesIncomes}) => {

    const contentCreator = () => {
        let content = currentCategory === 'costs' ? categoriesCosts : categoriesIncomes 
        return content.map((item,key) => {
            return <CategoryItem 
                key={key} 
                size={'80px'} 
                title={item.title} 
                img={item.img} 
                color={item.color} 
                id={item.id}
                active={item.title === spendCategory.title && item.img === spendCategory.img} 
                onClick={setSpendCategory}
                ></CategoryItem>
            }
        )
    }

    return (
        <StyledMain>
            { contentCreator() } 
        </StyledMain>
    )
}

export default ModapPopupCategory
