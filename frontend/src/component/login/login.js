import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './login.scss';
import Axapi from '../../context/Axapi';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            error: "",
            disabled: false
        }
    }

    login = async e => {
        e.preventDefault();
        const isValid = this.validate(this.state.username, this.state.password);
        if (isValid) {
            await Axapi.post("/auth/signin",
                {
                    username: this.state.username,
                    password: this.state.password
                }
            )
                .then(resp => {
                    if (resp.data.accesToken) {
                        localStorage.setItem("token", resp.data.accesToken);
                        this.props.history.push("/admin");
                    } else {
                        this.setState({ error: `*${resp.response.data.message}*` });
                    }
                }).catch(e => {
                    this.setState({ error: `*${e.response.data.message}*` });
                })
        }
    }
    validate = (name, password) => {
        if (!name || !password) {
            this.setState({ disabled: true });
            this.setState({ error: `*You have to fill all of the fields*` });
            return false;
        }
        return true;
    }

    handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ disabled: false });
        this.setState({ [name]: value });
    }


    render() {
        return (
            <div className={"login"}>
                <form className={"login__form"}>
                    <h1 className={"login__form--title"}>Welcome to the BookList</h1>
                    <input className={"login__form--input"}  name="username" onChange={this.handleInput.bind(this)} placeholder={"Username"}></input>
                    <input type={"password"} name="password" className={"login__form--input"} onChange={this.handleInput.bind(this)} placeholder={"Password"}></input>
                    <h3 className={"login__form--error"}>{this.state.error}</h3>
                    <button className={"login__form--button"} disabled={this.state.disabled} onClick={this.login.bind(this)}><p className={"login__form--button__text"}>Login</p></button>
                </form>
                <div className={"login__panel"}>
                    <div className={"login__panel--background"}></div>
                    <h1 className={"login__panel--title"}>New to booklist?</h1>
                    <h2 className={"login__panel--subtitle"}>Signup to discover the BookList!</h2>
                    <Link className={"login__panel--button"} to={"/register"}>Register</Link>
                </div>
            </div>
        );
    }
}

export default Login;
