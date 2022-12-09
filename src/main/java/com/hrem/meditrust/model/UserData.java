package com.hrem.meditrust.model;

public class UserData {

    String names;
    String role;
    String gender;

    public UserData(String names, String role, String gender){
        this.names = names;
        this.role = role;
        this.gender = gender;
    }

    public String getNames() {return names;}

    public String getRole() {return role;}

    public String getGender() {
        return gender;
    }

}