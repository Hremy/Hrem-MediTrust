package com.hrem.meditrust.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.hrem.meditrust.core.Status;
import com.hrem.meditrust.core.User;
import com.hrem.meditrust.database.DataStore;
import com.hrem.meditrust.utils.Token;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet (name="login", value="/api/log-in")
public class APILogin extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.addHeader("Access-Control-Allow-Origin", "http://localhost:5000");

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        Gson gson = new Gson();
        JsonObject jsonResponse = new JsonObject();

        User user = User.initialize(email, password);

        Status status = user.login();

        if(status == Status.USER_NOT_FOUND) {

            jsonResponse.addProperty("success", false);
            jsonResponse.addProperty("message", "User Not Found!");

        }else if(status == Status.PASSWORD_DONT_MATCH) {

            jsonResponse.addProperty("success", false);
            jsonResponse.addProperty("message", "Password Doesn't Match!");

        }else if(status == Status.LOGIN_SUCCESSFULLY) {

            Token token = new Token(user);

            user = DataStore.getUser(user.getEmail());

            jsonResponse.addProperty("success", true);
            jsonResponse.addProperty("data", gson.toJson(user));
            jsonResponse.addProperty("token", token.getUserToken());
            jsonResponse.addProperty("message", "Login Successfully");

            HttpSession session = request.getSession(true);
            session.setAttribute("email" , email);
            session.setAttribute("token" , token.getUserToken());

        }

        response.setContentType("application/json");

        response.getWriter().println(jsonResponse);

    }

}