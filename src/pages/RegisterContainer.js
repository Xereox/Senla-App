import React, { useEffect, useState } from "react";
import { Formik } from 'formik'
import * as yup from 'yup'
import { NavLink, Redirect, useHistory } from 'react-router-dom'
import { SubmitRegisterForm } from "../lib/Axios";
import Register from "./Register";

const validationsSchemaRegister = yup.object().shape({
    name: yup.string().typeError('Please, enter you name').min(2, 'Too Short').required('Required to fill'),
    surname: yup.string().typeError('Please, enter you surname').min(2, 'Too Short').required('Required to fill'),
    login: yup.string().typeError('Please, enter you login').required('Required to fill'),
    password: yup.string().typeError('Should be a string').min(6, 'Too Short').max(22, 'Too Long').required('Required to fill'),
    confirmPassword: yup.string().oneOf([ yup.ref('password') ], 'Passwords mismatch').required('Required to fill'), 
    email: yup.string().email('Please enter a valid email').required('Required to fill'),
    confirmEmail: yup.string().email('Please enter a valid email').oneOf([ yup.ref('email') ], 'Emails mismatch').required('Required to fill')
})
const initialValuesRegister = {
    name: '',
    surname: '',
    password: '',
    confirmPassword: '',
    login: '',
    email: '',
    confirmEmail: ''
}
const onSubmitRegister = (values) => {
    values.id=values.login
    SubmitRegisterForm(values)
}

const RegisterContainer = () => { 
    return (
        <div>
            <Formik 
                initialValues={initialValuesRegister}
                validateOnBlur //валидация при переходе на след поле
                onSubmit={onSubmitRegister} // вызов во время отправки формы
                validationSchema={validationsSchemaRegister}
            >
                { ({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit}) => (
                    <Register
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

export default RegisterContainer


