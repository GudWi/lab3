package com.sdanilin.dao;

import com.sdanilin.entities.Doing;
import com.sdanilin.entities.User;
import org.apache.log4j.Logger;

import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Default;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;

/**
 * Data access object for User, have implementation of database interaction
 *
 *
 * @author SDanilin
 *
 * @version 1.0
 */
@Default
@Dependent
public class UserDAO{
    @Inject
    private Logger logger;

    @Inject
    private EntityManager em;

    /**
     * Check database and return user if this exist and password is right
     *
     *
     * @param login    login of user
     * @param password password of user
     */
    public User login(String login, String password){
        logger.debug("login");
        List<User> users = em.createNamedQuery("User.getUserById", User.class)
                .setParameter("id",login)
                .getResultList();

        if(!users.isEmpty()){
            if(users.get(0).getPassword().equals(password)){
                return users.get(0);
            }
        }

        logger.info("wrong login/password");
        return null;
    }

    /**
     * Check database and return user if this exist
     *
     *
     * @param login login of user
     */
    public User findById(String login){
        logger.debug("findDoingById");
        List<User> users = em.createNamedQuery("User.getUserById", User.class)
                .setParameter("id",login)
                .getResultList();

        return users.isEmpty() ? null : users.get(0);
    }

    /**
     * Save user to database
     *
     *
     * @param user user needed to save
     */
    public void save(User user){
        logger.debug("save");
        em.getTransaction().begin();
        em.persist(user);
        em.getTransaction().commit();
    }

    /**
     * Replace user in database
     *
     *
     * @param user user needed to update
     */
    public void update(User user){
        logger.debug("update");
        em.getTransaction().begin();
        em.merge(user);
        em.getTransaction().commit();
    }

    public void updateCase(String login, Doing doing){
        logger.debug("updateCase");
        List<User> users = em.createNamedQuery("User.getUserById", User.class)
                .setParameter("id",login)
                .getResultList();

        if(!users.isEmpty()) {
            User user = users.get(0);

            if (doing.getUserName() == null) doing.setUserName(user.getName());
            if (doing.getDone() == null) doing.setDone(false);
            if (doing.getCompleteDate() == null)doing.setCompleteDate(null);
            if (doing.getCreatedDate() == null) doing.setCreatedDate(new Date());
            doing.setUser(user);

            user.addDoing(doing);
            em.getTransaction().begin();
            em.merge(user);
            em.getTransaction().commit();
        }
    }

    /**
     * Delete user from database
     *
     *
     * @param user user needed to delete
     */
    public void delete(User user){
        logger.debug("delete");
        em.getTransaction().begin();
        em.remove(user);
        em.getTransaction().commit();
    }

    /**
     * Return all doings of user
     *
     *
     * @param user user
     */
    public List<Doing> findDoing(User user){
        logger.debug("findDoing");
        List<Doing> userDoing = em.createNamedQuery("User.returnDoingsOfUser", Doing.class)
                .setParameter("userLogin", user).getResultList();

        return userDoing;
    }

    public List<User> getAllUsers(){
        List<User> users = em.createNamedQuery("User.getAllUser", User.class)
                .getResultList();

        return users;
    }
}
