import React, { Component } from 'react';

import '../../assets/styles/index.css';
import '../../assets/styles/dashboard.css';

import DashboardController from "../../services/DashboardController";

class Dashboard extends React.Component {

    controller;

    constructor(props) {
        super(props);
        this.state = {};

        this.controller = new DashboardController();
    }

    render() {

        return (
            <div className="App">

                <div className="hrem-app-title">
                    Dashboard
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
                        <div className="hrem-profile-menu users">
                            <a href="/users">
                                <i className="fa fa-users"></i>
                                <span>Users</span>
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

                <div className="hrem-dashboard">

                    <div className="hrem-title sheet-title">

                    </div>

                    <div className="hrem-tools">
                        <button className="hrem-dashboard-sheet sheet-1">
                            <a>
                                <i className="fa fa-arrow-circle-o-down"></i>
                                Sheet 1
                            </a>
                        </button>
                        <button className="hrem-dashboard-sheet sheet-2">
                            <a>
                                <i className="fa fa-arrow-circle-o-down"></i>
                                Sheet 2
                            </a>
                        </button>
                        <button className="hrem-dashboard-sheet sheet-3">
                            <a>
                                <i className="fa fa-arrow-circle-o-down"></i>
                                Sheet 3
                            </a>
                        </button>
                    </div>

                    <table className="hrem-dashboard-data-table">

                    </table>

                    <div className="hrem-roller dashboard">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    <div className="error dashboard"></div>

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

            if (user.role !== "Admin") {
                document.querySelector(".hrem-profile-menu.users").style.display = "none";
            }
        }

        this.controller.setup();

    }

}

export default Dashboard;
