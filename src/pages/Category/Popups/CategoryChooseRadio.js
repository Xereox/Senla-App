import React from 'react'
import styled from 'styled-components'

const StyledMain = styled.div`
    margin: 0 auto;
    padding: 5px;
    display: flex;
`
const StyledLabel = styled.label`
    padding-left: 5px;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    color: white;
    padding-right: 20px; 

`
const StyledRadio = styled.input`
    margin-right: 5px;
`


const CardChooseCategory = ({currentCategory, setCategory}) => {
    return (
        <StyledMain>
           <StyledLabel>
            <StyledRadio  
                        checked={currentCategory === 'costs'}
                        name="categoryType" type='radio'
                        onChange={() => setCategory('costs')}
                        ></StyledRadio>
                Расходы
           </StyledLabel>
           <StyledLabel>
            <StyledRadio 
            checked={currentCategory === 'income'}
            onChange={() => setCategory('income')} 
            name="categoryType" type='radio'></StyledRadio>
                Доходы
           </StyledLabel>
        </StyledMain>
    )
}

export default CardChooseCategory
