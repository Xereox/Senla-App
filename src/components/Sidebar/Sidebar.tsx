import React, {ReactElement} from 'react'
import styled from 'styled-components'
import SidebarItem from './SidebarItem'
import 'antd/dist/antd.css';
import { Menu } from 'antd';

import {
  CreditCardOutlined,
  AppstoreOutlined,
  SettingOutlined,
  FolderOutlined,
  HistoryOutlined,
  QuestionOutlined
} from '@ant-design/icons';

import { connect } from 'react-redux';
import {GlobalStoreType} from "../../Redux/store";
import {MenuTheme} from "antd/lib/menu/MenuContext";
import ThemeSetting from "../../pages/Settings/ThemeSetting";
import {Theme} from "@emotion/react";

const StyledSidebar = styled.div`
    grid-area: nav;
`

type SidebarPropsType = {
    selected: number
    theme: string
    children: string
}
const Sidebar: React.FC<SidebarPropsType> = ({selected, theme}) => {
    const data = [
        {
            path: '/',
            title: 'Главная',
            icon: AppstoreOutlined
        },
        {
            path: '/Payments',
            title: 'Счета',
            icon: CreditCardOutlined 
        },
        {
            path: '/Category',
            title: 'Категории',
            icon: FolderOutlined 
        },
        {
            path: '/Details',
            title: 'Обзор',
            icon: HistoryOutlined 
        },
        {
            path: '/Settings',
            title: 'Настройки',
            icon: SettingOutlined
        },
        {
            path: '/About',
            title: 'О нас',
            icon: QuestionOutlined 
        },
    ]
    const content = data.map( (item, key) => {
        return <Menu.Item key={key} icon={<item.icon/>}>
            <SidebarItem key={key} path={item.path} title={item.title}></SidebarItem>
        </Menu.Item>
    })


    const style = {
        fontSize: 14,
        height: '100%',
        paddingTop: '7%',
    }

    return (
    <StyledSidebar>
        <Menu
            style={style}
            defaultSelectedKeys={[`${selected}`]}
            mode={'inline'}
            theme={theme as MenuTheme}
        >
            {content}
        </Menu>
      </StyledSidebar>
    );
}

const mapStateToProps = (state: GlobalStoreType) => {
    return {
        theme: state.settings.theme
    }
}
export default connect(mapStateToProps)(Sidebar)

