import React, { Component } from 'react'
import './Login.css'
import Button from './../../components/UI/Button/Button'

export default class Login extends Component {
    render() {
        return (
            <div className="login-page">
                <div className="wrapper">
                    <div className="login">
                        <h1 className="login__title">Login</h1>
                        <form action="#" method="post" class="login__form form">
                            <section className="form__field">
                                <label className="form__label" for="name">Username</label>
                                <input className="form__input" placeholder="Your username" type="text" name="name" id="name"/>
                            </section>
                            <section className="form__field">
                                <label className="form__label" for="password">Password</label>
                                <input className="form__input" placeholder="Your password" type="password" name="password" id="password"/>
                            </section>
                            <section className="form__forgot">
                                <a href="#" className="form__forgot-link" title="Forgot password?">Forgot password?</a>
                            </section>
                            <Button/>
                        </form>
                        <section className="login__sign-up sign-up">
                            <a href="#" title="Sign-up" className="sign-up__link">Sign up</a>
                        </section>
                    </div>
                </div>
             </div>
        )
    }
}
