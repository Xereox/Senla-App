import React from 'react'
import styled from 'styled-components'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar/Sidebar'
import AppWrapper from '../../components/AppWrapper'
import 'antd/dist/antd.css';
import { List } from 'antd';
import CurrencySetting from './CurrencySetting'
import ThemeSetting from './ThemeSetting'

const StyledSettings = styled.div`
    grid-area: content;
    padding: 10px;
    background-color: ${props => props.theme === 'light' ? '#E0E7E9' : '#1F2933'};
    & div {
        font-family: Roboto;    
        font-size: 15px;
        color:  ${props => props.theme === 'light' ? '' : '#EFEBE9'};
    }
`

const Settings = ({theme, currency, setTheme, setCurrency, chooseCurrency}) => {
    return (
        <AppWrapper>
            <Header>Header</Header>
            <Sidebar selected={4}>Sidebar</Sidebar>
            <Footer>footer</Footer>
            <StyledSettings theme={theme}>
            <List 
                header={<div>Настройки</div>}
                itemLayout="horizontal"
            >
                <CurrencySetting theme={theme} currency={currency} setCurrency={setCurrency} chooseCurrency={chooseCurrency} />
                <ThemeSetting theme={theme} setTheme={setTheme} />
            </List>
            </StyledSettings>
        </AppWrapper>
    )
}

export default Settings
