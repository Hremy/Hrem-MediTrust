package com.hrem.meditrust.utils;

import com.hrem.meditrust.core.User;
import com.hrem.meditrust.database.DataStore;

public class Pharmacist extends User {

    public Pharmacist (String email, String passWord, String firstName, String lastName, String age, String gender, String role) {
        super(email, passWord, firstName, lastName, age, gender, role);
    }

    @Override
    public void signup(){
        DataStore.getStore().put(this.getEmail(), this);
    }

}