package com.sdanilin.model;

import com.sdanilin.entities.User;

/**
 * Singleton for User class
 *
 *
 * @author SDanilin
 */
public class UserModel {
    private static UserModel instance = new UserModel();

    private User currentUser;

    /**
     * instance access point
     */
    public static UserModel getInstance() {
        return instance;
    }

    /**
     * Empty constructor
     */
    private UserModel(){}

    /**
     * Initialize user
     * @param user user
     */
    public void addUser(User user){
        currentUser = user;
    }

    /**
     * Getter fo user
     */
    public User getCurrentUser() {
        return currentUser;
    }
}
