

const API_TOMCAT_URL = "http://localhost:8080/MediTrust_war_exploded";

const API_TOMCAT_URL_LOGIN = API_TOMCAT_URL + "/api/log-in";

const API_TOMCAT_URL_SIGNUP = API_TOMCAT_URL + "/api/sign-up";

const API_TOMCAT_URL_USER_LIST = API_TOMCAT_URL + "/api/user-list";

const API_TOMCAT_URL_DASHBOARD = API_TOMCAT_URL + "/api/excel-data-view";


module.exports.login = async (req, res) => {

    const params = `?email=${req.query.email}&password=${req.query.password}`;

    const response = await fetch(API_TOMCAT_URL_LOGIN + params, {method: 'GET'});
    const data = await response.json();

    res.send(data);
};


module.exports.signUp = async (req, res) => {

    let params = JSON.stringify(req.body);
    params = params.replace("{\"", "");
    params = params.replace("\":\"\"}", "");
    params = params.replaceAll("\\", "");

    const response = await fetch(API_TOMCAT_URL_SIGNUP, {method: 'POST', body: params});
    const data = await response.json();

    res.send(data);
};


module.exports.userList = async (req, res) => {

    const params = `?token=${req.query.token}`;

    const response = await fetch(API_TOMCAT_URL_USER_LIST + params, {method: 'GET'});
    const data = await response.json();

    res.send(data);
};


module.exports.excelDataView = async (req, res) => {

    const params = `?token=${req.query.token}`;

    const response = await fetch(API_TOMCAT_URL_DASHBOARD + params, {method: 'GET'});
    const data = await response.json();

    res.send(data);
};
