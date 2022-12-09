
const Route = require("express");

const controller = require("../countrollers/index");

const route = Route();


route.post("/api/sign-up", controller.signUp);
route.get("/api/log-in", controller.login);
route.get("/api/user-list", controller.userList);
route.get("/api/excel-data-view", controller.excelDataView);


module.exports = route;
