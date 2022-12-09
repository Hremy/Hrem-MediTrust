package com.hrem.meditrust.database;

import com.hrem.meditrust.core.User;
import java.util.LinkedHashMap;

public class DataStore {

    private static final LinkedHashMap<String, User> store = new LinkedHashMap<>();

    public static LinkedHashMap<String, User> getStore() {
        return store;
    }

    public static User getUser(String email){
        return store.get(email);
    }

}