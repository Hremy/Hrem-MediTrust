package com.hrem.meditrust.model;

import com.hrem.meditrust.core.User;
import com.hrem.meditrust.database.DataStore;

import java.util.ArrayList;

public class UserList {

    ArrayList <UserData> userList = new ArrayList<>();

    public UserList(){

        for (String email : DataStore.getStore().keySet()){
            User user = DataStore.getUser(email);

            String names = user.getFirstName() +" " + user.getLastName();
            String role = user.getRole();
            String gender = user.getGender();

            if (!user.getRole().equals("Admin")){
                UserData userData = new UserData(names, role, gender);
                userList.add(userData);
            }
        }

    }

    public ArrayList<UserData> getUserList() {return userList;}

}