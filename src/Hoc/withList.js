import React from 'react'
import 'antd/dist/antd.css';
import { List, Avatar, Select } from 'antd';
const { Option } = Select;

const withList = (Component) => {
    const ContainerComponent = (props) => {
        return (
            <Component 
                {...props} 
                List={List} 
                Avatar={Avatar} 
                Select={Select}
                Option={Option}
            />
        )
    }

    return ContainerComponent
}

export default withList
