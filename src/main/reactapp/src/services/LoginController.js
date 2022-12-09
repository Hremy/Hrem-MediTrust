import React from 'react';

import {API_NODE_URL_LOGIN} from '../config'

class LoginController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        const token = window.localStorage.getItem("token");

        if(token) {
            window.location.replace("/dashboard");
            return;
        }

        document.querySelector("title").innerHTML = "Login | MediTrust - Remy";
    }

    static onSubmit(e) {
        e.preventDefault();

        const inputEmail = document.querySelector("input[name='email']");
        const inputPassword = document.querySelector("input[name='password']");
        const error = document.querySelector(".error.login");
        const errorEmail = document.querySelector(".error.email");
        const errorPassword = document.querySelector(".error.password");
        const loader = document.querySelector(".hrem-roller");

        const email = inputEmail.value;
        const password = inputPassword.value;

        let isValid = true;
        error.innerHTML = ".";
        error.classList.remove("active");

        if (!email) {
            errorEmail.classList.add("active")
            errorEmail.innerHTML = "Email is required";
            isValid = false;
        }

        const isValidateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        if (!isValidateEmail(email)) {
            errorEmail.classList.add("active")
            errorEmail.innerHTML = "Email is not valid";
            isValid = false;
        }
        if(isValid) {
            errorEmail.classList.remove("active")
            errorEmail.innerHTML = "";
        }

        if (!password) {
            errorPassword.classList.add("active")
            errorPassword.innerHTML = "Password is required";
            isValid = false;
        }
        if(isValid) {
            errorPassword.classList.remove("active")
            errorPassword.innerHTML = "";
        }


        if (isValid) {

            error.innerHTML = "";
            error.classList.remove("active");
            loader.classList.add("active");

            setTimeout(function () {

                const data = `email=${email}&password=${password}`;

                fetch(API_NODE_URL_LOGIN + "?" + data, {
                    method: 'GET',
                })
                    .then((response) => response.json())
                    .then(({data, token, success, message}) => {

                        if(success) {

                            error.classList.add("success")
                            error.innerHTML = message;

                            window.localStorage.setItem("user", data);
                            window.localStorage.setItem("token", token);

                            setTimeout(function () {

                                window.location.replace("/dashboard");

                            }, 1500);

                        }else {
                            error.classList.add("active")
                            error.innerHTML = message;
                        }

                    })
                    .finally(() => {
                        loader.classList.remove("active");
                    });


            }, 1000);

        }


    }

}

export default LoginController;
