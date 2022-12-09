import {BrowserRouter, Route, Routes} from "react-router-dom";

import Login from "../pages/login";
import Signup from "../pages/signup";
import Dashboard from "../pages/dashboard";
import UserList from "../pages/userlist";


export default function Route_Controller() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="login" element={<Login/>} />
                <Route path="signup" element={<Signup/>} />
                <Route path="dashboard" element={<Dashboard/>} />
                <Route path="users" element={<UserList/>} />
            </Routes>
        </BrowserRouter>
    );
}
