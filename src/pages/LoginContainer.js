import React, { useEffect, useState } from "react";
import { Formik } from 'formik'
import * as yup from 'yup'
import { NavLink, Redirect, useHistory } from 'react-router-dom'
import { formGetData } from "../lib/Axios";
import isAuth from '../lib/isAuth'
import Login from "./Login";

const validationsSchemaLogin = yup.object().shape({
    login: yup.string().typeError('Please, enter you login').required('Required to fill'),
    password: yup.string().typeError('Should be a string').min(6, 'Too Short').max(22, 'Too Long').required('Required to fill'),
})
const initialValuesLogin = {
    password: '',
    login: '',
}               
const onSubmitLogin = (values, history, setWarning) => {
    setWarning('')
    formGetData(values)
    .then( resolve => {
        if (resolve.length !== 0) {
            if (values.password === resolve[0].password) {
                localStorage.setItem('IsLogin', true);
                history.push('/')
            } else {
                setWarning('Wrong password')
            }
      } else {
        setWarning('User does not exist')
      }
    }).catch( x => { 
        setWarning('Connection error. Please, try again')
    })
   
}

const LoginContainer = (props) => { 
    const history = useHistory();
    const [warning, setWarning] = useState('')
    if (isAuth()) return <Redirect to={'/'}/>
    return (
        <div>
            <Formik 
                initialValues={initialValuesLogin}
                validateOnBlur //валидация при переходе на след поле
                onSubmit={ (values) => onSubmitLogin(values, history, setWarning)} // вызов во время отправки формы
                validationSchema={validationsSchemaLogin}
            >
                { ({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit}) => (
                    <Login 
                        warning={warning}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        isValid={isValid}
                        handleSubmit={handleSubmit}
                    />
                ) }  
            </Formik>
        </div>
        
    )
}

export default LoginContainer


