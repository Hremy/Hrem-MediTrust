package com.hrem.meditrust.servlets;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.hrem.meditrust.database.DataStore;
import com.hrem.meditrust.utils.Admin;
import com.hrem.meditrust.utils.Patient;
import com.hrem.meditrust.utils.Pharmacist;
import com.hrem.meditrust.utils.Physician;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;

@WebServlet (name="signUp", value="/api/sign-up")
public class APISignup extends HttpServlet{

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        response.addHeader("Access-Control-Allow-Origin", "http://localhost:5000");
        response.addHeader("Access-Control-Allow-Methods", "POST");

        HashMap<String, String> parameter = getParameters(request);

        String email = parameter.get("email");
        String passWord = parameter.get("password");
        String firstName = parameter.get("firstname");
        String lastName = parameter.get("lastname");
        String age = parameter.get("age");
        String gender = parameter.get("gender");
        String role = parameter.get("role");

        JsonObject jsonResponse = new JsonObject();

        if (DataStore.getStore().containsKey(email)) {

            jsonResponse.addProperty("success", false);
            jsonResponse.addProperty("message", "Email is already registered!");

        } else {
            switch (role) {
                case "Pharmacist":
                    if (passWord.length() == 4) {

                        Pharmacist pharmacist = new Pharmacist(email, passWord, firstName, lastName, age, gender, role);
                        pharmacist.signup();

                        jsonResponse.addProperty("success", true);
                        jsonResponse.addProperty("message", "Registration Successful");

                    } else {
                        jsonResponse.addProperty("success", false);
                        jsonResponse.addProperty("message", "Password should be 4 digits!");
                    }

                    break;
                case "Patient":
                    if (passWord.length() == 6) {

                        Patient patient = new Patient(email, passWord, firstName, lastName, age, gender, role);
                        patient.signup();

                        jsonResponse.addProperty("success", true);
                        jsonResponse.addProperty("message", "Registration Successful");

                    } else {
                        jsonResponse.addProperty("success", false);
                        jsonResponse.addProperty("message", "Password should be 6 digits!");
                    }

                    break;
                case "Physician":
                    if (passWord.length() == 8) {

                        Physician physician = new Physician(email, passWord, firstName, lastName, age, gender, role);
                        physician.signup();

                        jsonResponse.addProperty("success", true);
                        jsonResponse.addProperty("message", "Registration Successful");

                    } else {
                        jsonResponse.addProperty("success", false);
                        jsonResponse.addProperty("message", "Password should be 8 digits!");
                    }

                    break;
                case "Admin":
                    if (passWord.length() == 10) {

                        Admin admin = new Admin(email, passWord, firstName, lastName, age, gender, role);
                        admin.signup();

                        jsonResponse.addProperty("success", true);
                        jsonResponse.addProperty("message", "Registration Successful");

                    } else {
                        jsonResponse.addProperty("success", false);
                        jsonResponse.addProperty("message", "Password should be 10 digits!");
                    }
                    break;
            }
        }


        response.setContentType("application/json");

        response.getWriter().println(jsonResponse);

    }

    public HashMap<String, String> getParameters(HttpServletRequest request) throws IOException {
        StringBuilder stringBuilder = new StringBuilder();
        try(BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(request.getInputStream()))) {
            char[] charBuffer = new char[1024];
            int bytesRead;
            while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                stringBuilder.append(charBuffer, 0, bytesRead);
            }
        }
        return new Gson().fromJson(stringBuilder.toString(), HashMap.class);
    }

}