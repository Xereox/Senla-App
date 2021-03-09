import React, { useEffect, useState } from "react";
import Button from '../components/UI/Button/Button'
import styled from 'styled-components'
import FormField from '../components/FormField/FormField'
import { NavLink, Redirect, useHistory } from 'react-router-dom'

const StyledLoginPage = styled.div`
    background: url("./loginBg.webp");
    background-size: cover;
    height: 100vh;
`
const StyledWrapper = styled.div`
    max-width: 1366px;
    width: 100%;
    margin: 0 auto;
    padding: 2% 30px 0 30px;
`
const StyledLogin = styled.div`
    border-radius: 20px;
    padding-left: 55px;
    padding-right: 55px;
    padding-bottom: 50px;
    padding-top: 40px;
    width: 500px;
    margin: 0 auto;
    border: 1px solid red;
    background-color: #fff;
    @media (max-width: 950px) {
        width: 450px;
        padding-left: 40px;
        padding-right: 40px;
        padding-bottom: 30px;
    }
    @media (max-width: 768px) {
        width: 400px;
        padding-left: 30px;
        padding-right: 30px;
    }
    @media (max-width: 600px) {
        width: 100%;
        max-width: 350px;
        padding-bottom: 20px;
    }
    @media (max-width: 370px) {
        padding-left: 15px;
        padding-right: 15px;
    }

`
const StyledTitle = styled.h1`
    font-weight: bold;
    font-size: 3rem;
    color: #333;
    line-height: 1.2;
    text-align: center;
    padding-bottom: 5%;

`
const ForgotWrapper = styled.section`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
`
const StyledForgot = styled.div`
    font-family: Poppins-Regular;
    font-size: 1.4rem;
    line-height: 1.7;
    color: #666;
    text-decoration: none;
`
const SignLinkWrapper = styled.section`
    padding-top: 10%;
    text-align: center;
    & a {
        text-decoration: none;
        font-family: Poppins-Regular;
        font-size: 1.4rem;
        line-height: 1.5;
        color: #333;
        text-transform: uppercase;
    }
`
const Login = (props) => { 
    return (
        <StyledLoginPage>
            <StyledWrapper>
                <StyledLogin>
                    <StyledTitle>Log in</StyledTitle>
                    <FormField 
                        type="text"
                        name="login"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.login}
                        placeholder="Login"
                        error={props.errors.login}
                        touched={props.touched.login}
                        >Login
                    </FormField> 
                    <FormField 
                        type="password"
                        name="password"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.password}
                        placeholder="Your password"
                        error={props.errors.password}
                        touched={props.touched.password}
                        >Password
                    </FormField> 
                    <ForgotWrapper className="form__forgot">
                        <StyledForgot href="#" className="form__forgot-link" title="Forgot password?">Forgot password?</StyledForgot>
                    </ForgotWrapper>
                    <Button
                        disabled={!props.isValid}
                        onClick={props.handleSubmit}
                        type='submit'
                    >Sign in</Button>  
                    <SignLinkWrapper>
                        <NavLink to='/register'>
                            Sign up
                        </NavLink>
                    </SignLinkWrapper>            
                </StyledLogin>
            </StyledWrapper>
        </StyledLoginPage>
    )
}

export default Login


