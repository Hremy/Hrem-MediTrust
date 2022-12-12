import React from 'react';

import {API_NODE_URL_SIGNUP} from '../config'

import {isValidateEmail} from '../utils/index';

class SignUpController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        document.querySelector("title").innerHTML= "SignUp | MediTrust - Remy";
    }

    static onSubmit(e) {
        e.preventDefault();

        const inputEmail = document.querySelector("input[name='email']");
        const inputPassword = document.querySelector("input[name='password']");
        const inputRole = document.querySelector("select[name='role']");
        const inputFirstName = document.querySelector("input[name='firstname']");
        const inputLastName = document.querySelector("input[name='lastname']");
        const inputGender = document.querySelector("input[name='gender']:checked");
        const inputAge = document.querySelector("input[name='age']");
        const error = document.querySelector(".error.signup");
        const errorEmail = document.querySelector(".error.email");
        const errorPassword = document.querySelector(".error.password");
        const errorRole = document.querySelector(".error.role");
        const errorFirstName = document.querySelector(".error.firstname");
        const errorLastName = document.querySelector(".error.lastname");
        const errorGender = document.querySelector(".error.gender");
        const errorAge = document.querySelector(".error.age");
        const loader = document.querySelector(".hrem-roller");

        const email = inputEmail.value;
        const password = inputPassword.value;
        const role = inputRole.value;
        const gender = inputGender ? inputGender.value : "";
        const firstName = inputFirstName.value;
        const lastName = inputLastName.value;
        const age = inputAge.value;

        let isValid = true;
        error.innerHTML = ".";
        error.classList.remove("active");

        if (!email) {
            errorEmail.classList.add("active")
            errorEmail.innerHTML = "Email is required";
            isValid = false;
        }

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
        }else {
            errorPassword.classList.remove("active")
            errorPassword.innerHTML = "";
        }

        if (!role) {
            errorRole.classList.add("active")
            errorRole.innerHTML = "Role is required";
            isValid = false;
        }else {
            errorRole.classList.remove("active")
            errorRole.innerHTML = "";
        }

        if (!firstName) {
            errorFirstName.classList.add("active")
            errorFirstName.innerHTML = "First name is required";
            isValid = false;
        }else {
            errorFirstName.classList.remove("active")
            errorFirstName.innerHTML = "";
        }

        if (!lastName) {
            errorLastName.classList.add("active")
            errorLastName.innerHTML = "Last name is required";
            isValid = false;
        }else {
            errorLastName.classList.remove("active")
            errorLastName.innerHTML = "";
        }

        if (!gender) {
            errorGender.classList.add("active")
            errorGender.innerHTML = "Gender is required";
            isValid = false;
        }else {
            errorGender.classList.remove("active")
            errorGender.innerHTML = "";
        }

        if (!age) {
            errorAge.classList.add("active")
            errorAge.innerHTML = "Age is required";
            isValid = false;
        }else {
            errorAge.classList.remove("active")
            errorAge.innerHTML = "";
        }


        if (isValid) {

            error.innerHTML = "";
            error.classList.remove("active");
            loader.classList.add("active");

            setTimeout(function () {

                const data =
                    {
                        email:email,
                        password:password,
                        role:role,
                        gender:gender,
                        firstname:firstName,
                        lastname:lastName,
                        age:age,
                    };

                const ajaxFetch = new XMLHttpRequest();

                ajaxFetch.open('POST', API_NODE_URL_SIGNUP, true);

                ajaxFetch.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                ajaxFetch.onload = function () {

                    const response = JSON.parse(this.responseText);

                    if(response.success) {

                        error.classList.add("success")
                        error.innerHTML = response.message;

                        setTimeout(function () {

                            window.location.replace("/login");

                        }, 1500);

                    }else {
                        error.classList.add("active")
                        error.innerHTML = response.message;
                    }

                    loader.classList.remove("active");

                };

                ajaxFetch.send(JSON.stringify(data));
                console.log(JSON.stringify(data));

            }, 1000);

        }


    }

}

export default SignUpController;
