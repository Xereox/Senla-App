import React from 'react'
import withList from '../../Hoc/withList';

const CurrencySetting = ({List, Avatar, Select, Option, theme, setTheme }) => {
   
    const themes = [ {title: 'Светлая', value: 'light'}, {title: 'Темная', value: 'dark'}]
    const chooseTheme = (value) => setTheme(value)

    const options = themes.map( (item, key) => { 
        return (
            <Option 
                value={item.value}
                key={`${item}.${key}`}>
                {item.title}
            </Option> 
        )
    })
    
    let select = <Select 
        value={theme} 
        style={{ width: 300 }} 
        bordered={false} 
        showArrow={false}
        onChange={chooseTheme}>
        {options}
    </Select>

    return (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar src="https://cdn.worldvectorlogo.com/logos/mattermost.svg" />}
                title={<div>Тема</div>}
                description={select}
            />
        </List.Item>
    )
}

export default withList(CurrencySetting) 
