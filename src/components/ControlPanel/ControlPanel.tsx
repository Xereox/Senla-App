import React from 'react'
import styled from 'styled-components'
import Main, {MainCategoryType} from "../../pages/Main/Main";

const Container = styled.div`
    display: flex;
    width: 300px;
    justify-content: space-around;
    padding-bottom: 20px;
`
const Control = styled.div<{active: boolean, theme: string}>`
    font-size: 18px;
    font-weight: bold;
    padding: 10px 20px;
    border-bottom: ${props => props.active ? '2px' : '0'} solid grey;
    color: ${props => props.theme === 'light' ? '' : '#BDBDBD'};
`

type ControlPanelTypes = {
    setCategory: (category: MainCategoryType) => void
    currentCategory: MainCategoryType
    setSpendCategory?: (category: Object) => void
    theme: string
}
const ControlPanel: React.FC<ControlPanelTypes> = ({setCategory, currentCategory, setSpendCategory, theme = 'light'}) => {
    const handleClick = (value: MainCategoryType) => {
        setCategory(value)
        if (setSpendCategory) {
            setSpendCategory({})
        }
    }
    const data = [{title: 'Расходы', value: 'costs'}, {title: 'Доходы', value: 'income'} ]
    const content = data.map( (element, key) => {
        return <Control 
            theme={theme}
            key={`element${key}`}
            active={currentCategory === element.value}
            onClick={ () => handleClick(element.value as MainCategoryType)}
            >{element.title}</Control>
    })
    return (
        <Container>
           {content}
        </Container>
    )
}

export default ControlPanel     