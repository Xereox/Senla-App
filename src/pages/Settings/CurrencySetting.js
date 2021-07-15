import React from 'react'
import withList from '../../Hoc/withList';

const CurrencySetting = ({List, Avatar, Select, Option, theme = 'light', chooseCurrency, setCurrency, currency}) => {

    const chooseCurrencyHandler = (value) => chooseCurrency(value, currency)
    const active = currency.find(item => item.active === 'true')?.id || '';

    const options = currency.map( (item, key) => { 
        return (
            <Option 
                value={item.id}
                key={`${item}.${key}`}>
                {item.title}
            </Option> 
        )
    })
    
    let select = <Select 
        value={active} 
        style={{ width: 300 }} 
        bordered={false} 
        showArrow={false}
        onChange={chooseCurrencyHandler}>
        {options}
    </Select>

    return (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Check_green_icon.svg/1200px-Check_green_icon.svg.png" />}
                title={<div>Выбор валюты</div>}
                description={select}
            />
        </List.Item>
    )
}

export default withList(CurrencySetting)
