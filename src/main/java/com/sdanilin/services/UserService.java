package com.sdanilin.services;

import com.sdanilin.dao.PermissionsDAO;
import com.sdanilin.dao.UserDAO;
import com.sdanilin.entities.Doing;
import com.sdanilin.entities.User;
import org.apache.log4j.Logger;

import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Default;
import javax.inject.Inject;
import java.util.List;

/**
 * Business logic layer for user
 *
 *
 * @author SDanilin
 */
@Default
@Dependent
public class UserService {
    @Inject
    private UserDAO userDAO;

    @Inject
    private PermissionsDAO permissionsDAO;

    @Inject
    private Logger logger;

    /**
     * Check login and password of user
     *
     *
     * @param login    login of user
     * @param password password of user
     */
    public User loginUser(String login, String password){
        logger.debug("loginUser");
        return userDAO.login(login, password);
    }

    /**
     * Save user in database
     *
     *
     * @param user new user
     */
    public void saveUser(User user){
        logger.debug("saveUser");
        userDAO.save(user);
    }

    /**
     * Update user in database
     *
     *
     * @param user user needed to update
     */
    public void updateUser(User user){
        logger.debug("updateUser");
        userDAO.update(user);
    }

    /**
     * Delete user from database
     *
     *
     * @param user user needed to delete
     */
    public void deleteUser(User user){
        logger.debug("deleteUser");
        userDAO.delete(user);
    }

    /**
     * Check user in database
     *
     *
     * @param login login of user
     */
    public boolean userExist(String login){
        logger.debug("userExist");
        User user = userDAO.findById(login);
        boolean result = false;

        if(user != null){
            result = true;
        }

        return result;
    }


    public void updateCase(String login, Doing doing){
        logger.debug("updateCase");
        userDAO.updateCase(login, doing);
    }
    /**
     * Return user by login
     *
     *
     * @param login login of user
     */
    public User userByLogin(String login){
        logger.debug("userByLogin");
        return userDAO.findById(login);
    }

    /**
     * Return doing of user
     *
     *
     * @param user user
     */
    public List<Doing> findDoing(User user){
        logger.debug("findDoing");
        return userDAO.findDoing(user);
    }

    public List<User> getAllUsers(){
        logger.debug("findDoing");
        return userDAO.getAllUsers();
    }
}
