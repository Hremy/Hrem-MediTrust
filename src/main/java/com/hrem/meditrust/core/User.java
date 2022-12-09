package com.hrem.meditrust.core;

import com.hrem.meditrust.database.DataStore;

public abstract class User implements UserLogin {

    String email;
    String password;
    String firstName;
    String lastName;
    String age;
    String gender;
    String role;


    public User(String email, String password, String firstName, String lastName, String age, String gender, String role) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.role = role;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }


    public abstract void signup();


    public String getEmail() {return email;}

    public String getPassword() {return password;}

    public String getFirstName() {return firstName;}

    public String getLastName() {return lastName;}

    public String getAge() {return age;}

    public String getGender() {return gender;}

    public String getRole() {return role;}


    @Override
    public Status login() {

        if (DataStore.getStore().containsKey(email)) {

            User user = DataStore.getStore().get(email);

            if(user.getPassword().equals(password)) {

                return Status.LOGIN_SUCCESSFULLY;

            } else {
                return Status.PASSWORD_DONT_MATCH;
            }

        } else {
            return Status.USER_NOT_FOUND;
        }

    }

    public static User initialize(String email, String password) {
        User user = new User(email, password) {
            @Override
            public void signup() {}
        };
        return user;
    }

}