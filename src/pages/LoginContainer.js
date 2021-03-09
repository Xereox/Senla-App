import React, { useEffect, useState } from "react";
import { Formik } from 'formik'
import * as yup from 'yup'
import { NavLink, Redirect, useHistory } from 'react-router-dom'
import { SubmitLoginForm } from "../lib/Axios";
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
const onSubmitLogin = (values) => SubmitLoginForm(values)


const LoginContainer = () => { 
    if (isAuth()) return <Redirect to={'/'}/>
    return (
        <div>
            <Formik 
                initialValues={initialValuesLogin}
                validateOnBlur //валидация при переходе на след поле
                onSubmit={onSubmitLogin} // вызов во время отправки формы
                validationSchema={validationsSchemaLogin}
            >
                { ({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit}) => (
                    <Login 
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


