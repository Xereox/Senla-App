import React, { useState } from 'react'
import styled from 'styled-components';
import PortalPopup from './PortalPopup';
import { DatePicker, Alert, Button  } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const Container = styled.div`
    position: relative;
    padding-top: 10%;
    color: red;
    display:flex;
    flex-direction: column;
`

const { RangePicker } = DatePicker;

const DateRange = ({onSubmit, period, closePopup}) => {
    const [value, setValue] = useState(null)
    const onSubmitHandler = () => onSubmit([ value[0].format('YYYY-MM-DD'), value[1].format('YYYY-MM-DD') ])
    return (
        <PortalPopup> 
            <Container> 
                <RangePicker autoFocus={true} onChange={setValue}/>
                <Alert description={value ? `Выбран период: с ${value[0].format('YYYY-MM-DD')} по ${value[1].format('YYYY-MM-DD')}` : 'Период не выбран'}></Alert>
                <Button type="primary" block onClick={onSubmitHandler} disabled={!value}>
                    Выбрать
                </Button>
                <Button type="primary" danger block onClick={closePopup}>
                    Отмена
                </Button>
            </Container>
        </PortalPopup>
    )
}

export default DateRange;