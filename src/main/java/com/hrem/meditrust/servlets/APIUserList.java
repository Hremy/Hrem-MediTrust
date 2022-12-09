package com.hrem.meditrust.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.hrem.meditrust.core.User;
import com.hrem.meditrust.database.DataStore;
import com.hrem.meditrust.model.UserList;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet (name="userList", value="/api/user-list")
public class APIUserList extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.addHeader("Access-Control-Allow-Origin", "http://localhost:5000");

        JsonObject jsonResponse = new JsonObject();
        HttpSession session = request.getSession(false);

        String userToken = null;

        if(session != null) {
            userToken = (String) session.getAttribute("token");
        }

        if(userToken == null || userToken.length() == 0) {
            userToken = request.getParameter("token");
        }

        User user = DataStore.getUser(userToken);

        if (user != null && user.getRole().equals("Admin")){

            UserList userList = new UserList();
            Gson gson = new Gson();
            jsonResponse.addProperty("success", true);
            jsonResponse.addProperty("data", gson.toJson(userList.getUserList()));

        }else {
            jsonResponse.addProperty("success", false);
            jsonResponse.addProperty("message", "You don't have Admin rights");
        }

        response.setContentType("application/json");

        response.getWriter().println(jsonResponse);
    }

}