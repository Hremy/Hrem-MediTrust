import React, { Component } from 'react';

import {API_NODE_URL_DASHBOARD} from '../config'

class DashboardController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        const token = window.localStorage.getItem("token");

        if(!token) {
            window.location.replace("/login");
            return;
        }

        document.querySelector("title").innerHTML = "Dashboard | MediTrust - Remy";
    }

    setup() {

        const btnSheet1 = document.querySelector(".hrem-dashboard-sheet.sheet-1");
        const btnSheet2 = document.querySelector(".hrem-dashboard-sheet.sheet-2");
        const btnSheet3 = document.querySelector(".hrem-dashboard-sheet.sheet-3");

        const _self = this;

        btnSheet1.addEventListener("click", function() {

            btnSheet1.classList.add("active");
            btnSheet2.classList.remove("active");
            btnSheet3.classList.remove("active");

            _self.fetch(1);

        });

        btnSheet2.addEventListener("click", function() {

            btnSheet1.classList.remove("active");
            btnSheet2.classList.add("active");
            btnSheet3.classList.remove("active");

            _self.fetch(2);

        });

        btnSheet3.addEventListener("click", function() {

            btnSheet1.classList.remove("active");
            btnSheet2.classList.remove("active");
            btnSheet3.classList.add("active");

            _self.fetch(3);

        });

        const user = JSON.parse(window.localStorage.getItem("user"));

        if(user) {
            if(user.role === "Patient") {

                btnSheet1.classList.add("show");
                _self.fetch(1);

            }else if(user.role === "Physician") {

                btnSheet2.classList.add("show");
                _self.fetch(2);

            }else if(user.role === "Pharmacist") {

                btnSheet3.classList.add("show");
                _self.fetch(3);

            }else if(user.role === "Admin") {

                btnSheet1.classList.add("show");
                btnSheet2.classList.add("show");
                btnSheet3.classList.add("show");
                _self.fetch(1);

            }
        }

    }

    fetch(sheet) {

        const dataTable = document.querySelector(".hrem-dashboard-data-table");
        const sheetTile = document.querySelector(".hrem-title.sheet-title");
        const loader = document.querySelector(".hrem-roller.dashboard");
        const error = document.querySelector(".error.dashboard");

        loader.classList.add("active");
        dataTable.innerHTML = "";
        sheetTile.innerHTML = "";
        error.classList.remove("active")
        error.innerHTML = "";

        setTimeout(function () {

            const token = window.localStorage.getItem("token");

            const data = `token=${token}`;

            fetch(API_NODE_URL_DASHBOARD +"?"+ data, {
                method: 'GET',
            })
                .then((response) => response.json())
                .then(({data1, data2, data3, title1, title2, title3, success, message}) => {

                    if(success) {

                        const data = sheet === 1 ? data1 : sheet === 2 ? data2 : sheet === 3 ? data3 : {};
                        const title = sheet === 1 ? title1 : sheet === 2 ? title2 : sheet === 3 ? title3 : "";

                        sheetTile.innerHTML = title || "";

                        if(data != null) {

                            dataTable.innerHTML = JSON.parse(data).map(function (data, index) {
                                    let row = '';
                                    for (let i = 0; i < data.length; i++) {
                                        let cell;
                                        if (index === 0) {
                                            cell = `<th>${data[i]}</th>`;
                                        } else {
                                            cell = `<td>${data[i]}</td>`;
                                        }
                                        row += cell;
                                    }
                                    return `
                                    <tr>
                                        ${row}
                                    </tr>
                                `;
                                }
                            ).join("");

                        }else {
                            error.classList.add("active")
                            error.innerHTML = message;
                        }

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

export default DashboardController