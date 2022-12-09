import React, { Component } from 'react';

import '../../assets/styles/index.css';
import '../../assets/styles/login.css';
import '../../assets/styles/signup.css';
import '../../assets/styles/signup.css';
import '../../assets/styles/userlist.css';
import '../../assets/styles/dashboard.css';

import SignUpController from "../../services/SignUpController";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        new SignUpController();
    }

    render() {
        return (
            <div className="App">

                <div className="hrem-signup">

                    <div className="hrem-title">
                        Welcome to MediTrust
                    </div>

                    <div className="hrem-hint">
                        Already signed up? <a href="/login">Log in</a>
                    </div>

                    <form className="hrem-form" method="POST" onSubmit={SignUpController.onSubmit} autoComplete="off">

                        <div className="hrem-form-input">
                            <div className="hrem-form-input-group">
                                <div className="hrem-form-input radio">
                                    <input id="male" type="radio" name="gender" value="Male" autoComplete="off"/>
                                    <label htmlFor="male">Male</label>
                                </div>
                                <div className="hrem-form-input radio">
                                    <input id="female" type="radio" name="gender" value="Female" autoComplete="off"/>
                                    <label htmlFor="female">Female</label>
                                </div>
                            </div>
                            <label className="error gender"></label>
                        </div>
                        <div className="hrem-form-input">
                            <input type="text" name="firstname" placeholder="Your first name" autoComplete="off"/>
                            <label className="error firstname"></label>
                        </div>
                        <div className="hrem-form-input">
                            <input type="text" name="lastname" placeholder="Your last name" autoComplete="off"/>
                            <label className="error lastname"></label>
                        </div>
                        <div className="hrem-form-input">
                            <input type="email" name="email" placeholder="Your email address" autoComplete="off"/>
                            <label className="error email"></label>
                        </div>
                        <div className="hrem-form-input">
                            <input type="password" name="password" placeholder="Create a password" autoComplete="off"/>
                            <label className="error password"></label>
                        </div>
                        <div className="hrem-form-input">
                            <input type="number" name="age" placeholder="Your age" autoComplete="off"/>
                            <label className="error age"></label>
                        </div>
                        <div className="hrem-form-select">
                            <label>Role</label>
                            <select name="role" autoComplete="off">
                                <option value=""></option>
                                <option value="Patient">Patient</option>
                                <option value="Pharmacist">Pharmacist</option>
                                <option value="Physician">Physician</option>
                                <option value="Admin">Admin</option>
                            </select>
                            <span className="error role"></span>
                        </div>
                        <div className="hrem-form-submit">
                            <button type="submit">
                                <i className="fa fa-lock"></i>
                                Sign up
                            </button>
                        </div>

                        <div className="hrem-roller">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>

                        <div className="error signup"></div>

                    </form>

                </div>

            </div>
        );
    }

}

export default SignUp;