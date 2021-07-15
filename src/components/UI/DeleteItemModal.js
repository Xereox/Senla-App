import React from 'react'
import { Modal } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { ExclamationCircleOutlined } from "@ant-design/icons";

const deleteItemModal = (submitHandler) => {
        const deleteHandler = () => submitHandler('del') 
        Modal.confirm({
            title: "Текущие данные будут удалены",
            icon: <ExclamationCircleOutlined />,
            content: "Вы уверены?",
            cancelText: "Отменить",
            okText: "Удалить",
            okType: 'danger',
            cancelType: 'primary',
            onOk: deleteHandler
          });
    }

export default deleteItemModal;
