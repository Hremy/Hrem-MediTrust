package com.hrem.meditrust.utils;

import com.hrem.meditrust.core.User;

import java.util.UUID;

public class Token {

    String token = "";
    String userToken = "";

    public Token(User user) {
        userToken= user.getEmail();
        token = generateToken(userToken);
    }

    public String generateToken(String user) {
        String token = UUID.nameUUIDFromBytes(user.getBytes()).toString();
        return token.toString();
    }

    public boolean validateToken(String user) {
        String token1 = UUID.nameUUIDFromBytes(token.getBytes()).toString();
        String token2 = UUID.nameUUIDFromBytes(user.getBytes()).toString();
        return token2.compareTo(token1) == 0;
    }

    public String getToken() {
        return token;
    }

    public String getUserToken() {
        return userToken;
    }

    @Override
    public String toString() {
        return token;
    }

}