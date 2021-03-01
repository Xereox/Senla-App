import React from 'react'
import Button from '../components/UI/Button/Button'
import styled from 'styled-components'
import FormField from '../components/FormField/FormField'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const StyledLoginPage = styled.div`
    background: url("./loginBg.webp");
    background-size: cover;
    height: 100vh;
    & a {
        text-decoration: none;
    }
`

const StyledWrapper = styled.div`
    max-width: 1366px;
    width: 100%;
    margin: 0 auto;
    padding: 10% 30px 0 30px;
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
    font-size: 4rem;
    color: #333;
    line-height: 1.2;
    text-align: center;
    padding-bottom: 10%;

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
    padding-top: 12%;
    text-align: center;
`
const SignUpLink = styled.a`
    text-decoration: none;
    font-family: Poppins-Regular;
    font-size: 1.4rem;
    line-height: 1.5;
    color: #333;
    text-transform: uppercase;
`
//http://localhost:3004/users?login=xereoxxx

function SubmitForm(e) {   
    let login = document.getElementById('login').value
    let password = document.getElementById('password').value
    e.preventDefault();
    axios.get('http://localhost:3004/users').then(x => {
       let registerUser = x.data.find(user => user.login === login)
       if (registerUser && login) {
           if (registerUser.password === password) {
             window.location.href = '/'
           } else {
               alert('Password does not correct')
           }
       } else {
           alert('User does not exist')
       }    
    })
}


const Login = () => {
    return (
        <StyledLoginPage>
            <StyledWrapper>
                <StyledLogin>
                    <StyledTitle>Log in</StyledTitle>
                    <form action="#" method="post">
                        <FormField name="login" type="text" placeholder="Your login">Login</FormField>
                        <FormField name="password" type="password" placeholder="Your password">Password</FormField>
                        <ForgotWrapper className="form__forgot">
                            <StyledForgot href="#" className="form__forgot-link" title="Forgot password?">Forgot password?</StyledForgot>
                        </ForgotWrapper>
                        <Button onclick={SubmitForm}>Log in</Button>
                    </form>
                    <SignLinkWrapper>
                    <NavLink to='/register'>
                        <SignUpLink>Sign up</SignUpLink>
                    </NavLink>
                    </SignLinkWrapper>
                </StyledLogin>
            </StyledWrapper>
        </StyledLoginPage>
    )
}

export default Login


