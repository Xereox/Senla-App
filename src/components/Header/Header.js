import React from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import LogoutFromPage from '../../lib/LogoutFromPage'
import HeaderChoosePay from './HeaderChoosePay'
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { LogoutOutlined  } from '@ant-design/icons';
import { setCards } from '../../Redux/payments-reducer'
import { connect } from 'react-redux'

const StyledHeader = styled.div`
    max-height: 80px;
    grid-area: head;
    background-color: ${props => props.theme === 'light' ? '#6C7A89' : '#263238'};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`   

const ButtonContainer = styled.div`
`   
const Header = ({cards, curSymbol, theme, setCards}) => {
    const history = useHistory();
    const logoutHandler = () => LogoutFromPage(history) 
    return (
        <StyledHeader theme={theme}>  
            <HeaderChoosePay theme={theme} setCards={setCards} cards={cards} curSymbol={curSymbol}></HeaderChoosePay>
            <ButtonContainer>
                <Button shape="round" icon={<LogoutOutlined />} onClick={logoutHandler}>Logout</Button>
            </ButtonContainer>   
        </StyledHeader>
    )
}

const mapStateToProps = (state) => {
    return {
        cards: state.payments.cards,
        curSymbol : state.settings.symbol,
        theme: state.settings.theme
    }
    
}

export default connect(mapStateToProps, {setCards})(Header)


