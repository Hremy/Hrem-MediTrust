package com.hrem.meditrust.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.hrem.meditrust.core.User;
import com.hrem.meditrust.database.DataStore;
import com.hrem.meditrust.model.UserList;
import com.hrem.meditrust.utils.ReadExcel;

import javax.servlet.ServletContext;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet (name="excelDataView", value="/api/excel-data-view")
public class APIExcelDataView extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request , HttpServletResponse response) throws IOException {

        response.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
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

        ServletContext servletContext = getServletContext();

        ReadExcel readExcel = new ReadExcel(servletContext);

        Gson gson = new Gson();

        ArrayList<List<Object>> listData;

        String sheet1 = "Patient illnesses 2000 - 2002";
        String sheet2 = "Physicians missions 2000 - 2002";
        String sheet3 = "Most Bought Drugs 2000 - 2002";

        if(user != null) {

            switch (user.getRole()) {
                case "Patient":

                    listData = readExcel.parse(0, sheet1);
                    jsonResponse.addProperty("success", true);
                    jsonResponse.addProperty("title1", sheet1);
                    jsonResponse.addProperty("data1", gson.toJson(listData));

                    break;
                case "Physician":

                    listData = readExcel.parse(1, sheet2);
                    jsonResponse.addProperty("success", true);
                    jsonResponse.addProperty("title2", sheet2);
                    jsonResponse.addProperty("data2", gson.toJson(listData));

                    break;
                case "Pharmacist":

                    listData = readExcel.parse(2, sheet3);
                    jsonResponse.addProperty("success", true);
                    jsonResponse.addProperty("title3", sheet3);
                    jsonResponse.addProperty("data3", gson.toJson(listData));

                    break;
                case "Admin":

                    jsonResponse.addProperty("success", true);

                    listData = readExcel.parse(0, sheet1);
                    jsonResponse.addProperty("title1", sheet1);
                    jsonResponse.addProperty("data1", gson.toJson(listData));

                    listData = readExcel.parse(1, sheet2);
                    jsonResponse.addProperty("title2", sheet2);
                    jsonResponse.addProperty("data2", gson.toJson(listData));

                    listData = readExcel.parse(2, sheet3);
                    jsonResponse.addProperty("title3", sheet3);
                    jsonResponse.addProperty("data3", gson.toJson(listData));

                    break;
            }

        }else {
            jsonResponse.addProperty("success", false);
            jsonResponse.addProperty("message", "You don't have Admin rights");
        }

        response.setContentType("application/json");

        response.getWriter().println(jsonResponse);
    }

}