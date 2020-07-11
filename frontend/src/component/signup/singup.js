import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './signup.scss';
import Axapi from '../../context/Axapi';

class Signup extends Component {

    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            error: [],
            secondpass: "",
            disabled: true
        }
    }

    validatePassword = (name, value) => {

        let msg = [];
        if (name !== "password") return;
        var regex = new RegExp("[A-Z]+");
        if (!regex.test(value)) {
            msg.push("Password must contain at least one uppercase character!");

        }
        regex = new RegExp("[0-9]+");
        if (!regex.test(value)) {
            msg.push("Password must contain at least one number!");
        }
        regex = new RegExp("[a-z]+");
        if (!regex.test(value)) {
            msg.push(" Password must contain at least one lowercase character!");
        }
        return msg;

    }

    validateSignup = async e => {
        e.preventDefault();
        let msg = [];
        if (this.state.password === this.state.secondpass) {
            await Axapi.post("/auth/signup",
                {
                    username: this.state.username,
                    password: this.state.password
                }
            )
                .then(resp => {
                    if (resp.status === 200) {
                        this.props.history.push("/");
                    } else {
                        msg.push(`Error : ${resp.response.data.message}`);

                    }
                }).catch(e => {
                    msg.push(`Error : ${e.response.data.message}`);
                })

            if (msg.length > 0) this.setState({ error: msg });

        } else {
            msg.push("The password did not match!");
            this.setState({ error: msg });
        }

    }
    handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const error = this.validatePassword(name, value);

        if (name === "password") {
            this.setState({ disabled: (!error || error.length > 0) })
        }
        this.setState({ error: error });
        this.setState({ [name]: value });
    }



    render() {
        let counter = 0;
        return (
            <div className={"signup"}>
                <form className={"signup__form"}>
                    <h1 className={"signup__form--title"}>Signup to acces Booklist</h1>
                    <input className={"signup__form--input"} name={"username"}
                        onChange={this.handleInput.bind(this)} placeholder={"Username"}></input>
                    <input type={"password"} className={"signup__form--input"} name={"password"}
                        onChange={this.handleInput.bind(this)} placeholder={"Password"}></input>
                    <input type={"password"} className={"signup__form--input"} name={"secondpass"}
                        onChange={this.handleInput.bind(this)} disabled={this.state.disabled}
                         placeholder={"Repeat password"}></input>
                    <button className={"signup__form--button"} disabled={this.state.disabled}
                        onClick={this.validateSignup.bind(this)}><p className={"login__form--button__text"}>Register</p></button>
                    <div className={"signup__form--error"}>{this.state.error && this.state.error.map(element => (
                        <h1 key={counter++} className={"signup__form--error__text"}>{element}</h1>
                    ))}</div>
                    <div className={"signup__form--footer"}>
                        <h3 className={"signup__form--subtitle"}>Back to</h3>
                        <Link className={"signup__form--link"} to={"/"}>home</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default Signup;