package com.hrem.meditrust.utils;

import com.hrem.meditrust.core.User;
import com.hrem.meditrust.database.DataStore;

public class Patient extends User {

    public Patient (String email, String passWord, String firstName, String lastName, String age, String gender, String role) {
        super(email, passWord, firstName, lastName, age, gender, role);
    }

    @Override
    public void signup(){
        DataStore.getStore().put(this.getEmail(), this);
    }

}