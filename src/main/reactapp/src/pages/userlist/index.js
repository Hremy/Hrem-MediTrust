import React from 'react';

import '../../assets/styles/index.css';
import '../../assets/styles/userlist.css';

import UserListController from '../../services/UserListController'

class UserList extends React.Component {

    controller;

    constructor(props) {
        super(props);
        this.state = {};

        this.controller = new UserListController();
    }

    render() {

        return (
            <div className="App">

                <div className="hrem-app-title">
                    MediTrust
                </div>

                <div className="hrem-profile">

                    <div className="hrem-profile-picture">
                        <img src="/images/user-male.png" alt=""/>
                        <div>
                            <span className="hrem-profile-name"></span>
                            <br/>
                            <span className="hrem-profile-role"></span>
                        </div>
                    </div>

                    <div className="hrem-profile-logo">
                        <img src="/images/meditrust.png" alt=""/>
                    </div>

                    <div className="hrem-profile-logout">
                        <div className="hrem-profile-menu">
                            <a href="/dashboard">
                                <i className="fa fa-dashboard"></i>
                                <span>Dashboard</span>
                            </a>
                        </div>
                        <div className="hrem-profile-menu" onClick={this.onLogout}>
                            <div className="hrem-roller small logout">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <a>
                                <i className="fa fa-sign-out"></i>
                                <span>Logout</span>
                            </a>
                        </div>
                    </div>

                </div>

                <div className="hrem-users">

                    <div className="hrem-title">
                        <div className="hrem-sort">
                            <i className="fa fa-bars"></i>
                        </div>

                        <span>Users</span>

                        <div className="hrem-search">
                            <input type="text" onChange={this.myFunction}/>
                            <i className="fa fa-search"></i>
                        </div>
                    </div>

                    <div className="hrem-user-list">

                    </div>

                    <div className="hrem-roller userlist">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    <div className="error userlist"></div>

                </div>

            </div>
        );
    }

    onLogout() {

        const loader = document.querySelector(".hrem-roller.logout");

        window.localStorage.removeItem("user");
        window.localStorage.removeItem("token");

        loader.classList.add("active");

        setTimeout(function () {

            loader.classList.add("active");

            window.location.replace("/login");

        }, 2000);

    }

    componentDidMount() {

        const user = JSON.parse(window.localStorage.getItem("user"));

        if(user) {
            document.querySelector(".hrem-profile-name").innerHTML = user.firstName + " " + user.lastName;
            document.querySelector(".hrem-profile-role").innerHTML = user.role + " • " + user.email;
        }

        this.controller.fetch();

    }

    myFunction() {

        let input, filter, list, data, n, r, i, name, role;
        input = document.querySelector('.hrem-search input');
        filter = input.value.toUpperCase();
        list = document.querySelector(".hrem-user-list");
        data = list.querySelectorAll('.hrem-user-data');

        for (i = 0; i < data.length; i++) {
            n = data[i].querySelector(".hrem-user-name");
            r = data[i].querySelector(".hrem-user-role");
            name = n.innerHTML;
            role = r.innerHTML;
            if (name.toUpperCase().indexOf(filter) > -1 || role.toUpperCase().indexOf(filter) > -1) {
                data[i].style.display = "";
            } else {
                data[i].style.display = "none";
            }
        }

    }

}

export default UserList;
