import React from 'react';

import {API_NODE_URL_USER_LIST} from '../config'

class UserListController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        const token = window.localStorage.getItem("token");

        if(!token) {
            window.location.replace("/login");
            return;
        }

        document.querySelector("title").innerHTML = "UserList | MediTrust - Remy";
    }

    fetch() {

        const userList = document.querySelector(".hrem-user-list");
        const loader = document.querySelector(".hrem-roller.userlist");
        const error = document.querySelector(".error.userlist");

        loader.classList.add("active");

        error.classList.remove("active")
        error.innerHTML = "";

        setTimeout(function () {

            const token = window.localStorage.getItem("token");

            const data = `token=${token}`;

            fetch(API_NODE_URL_USER_LIST +"?"+ data, {
                method: 'GET',
            })
                .then((response) => response.json())
                .then(({data, success, message}) => {

                    if(success) {

                        userList.innerHTML += JSON.parse(data).map(user =>
                            `
                            <div class="hrem-user-data">
                                <div class="hrem-user-image">
                                    <img src="/images/user-${user.gender.toLowerCase()}.png" alt=""/>
                                </div>
                                <div class="hrem-user-info">
                                    <div class="hrem-user-name">
                                        ${user.names}
                                    </div>
                                    <div class="hrem-user-role">
                                        ${user.role}
                                    </div>
                                </div>
                            </div>
                        `
                        ).join("");

                    }else {
                        error.classList.add("active")
                        error.innerHTML = message;
                    }

                }).finally(() => {
                    loader.classList.remove("active");
                });


        }, 1000);

    }

}

export default UserListController
