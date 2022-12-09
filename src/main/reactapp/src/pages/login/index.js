import React from 'react';

import '../../assets/styles/index.css';
import '../../assets/styles/login.css';

import LoginController from '../../services/LoginController'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        new LoginController();
    }

    render() {

        return <>
            <div className="App">

                <div className="hrem-login">

                    <div className="hrem-title">
                        Welcome to MediTrust
                    </div>

                    <div className="hrem-hint">
                        Not registered? <a href="/signup">Sign up</a>
                    </div>

                    <form className="hrem-form" method="GET" onSubmit={LoginController.onSubmit} autoComplete="off">
                        <div className="hrem-form-input">
                            <input type="text" name="email" placeholder="Your email address" autoComplete="off"/>
                            <label className="error email"></label>
                        </div>
                        <div className="hrem-form-input">
                            <input type="password" name="password" placeholder="Your password" autoComplete="off"/>
                            <label className="error password"></label>
                        </div>
                        <div className="hrem-form-submit">
                            <button type="submit">
                                <i className="fa fa-lock"></i>
                                <span>Log in</span>
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

                        <div className="error login"></div>

                    </form>

                </div>

            </div>
        </>;
    }

}

export default Login;
