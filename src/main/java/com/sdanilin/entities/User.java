package com.sdanilin.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

/**
 * Entity class of table users of database
 *
 *
 * @author SDanilin
 */
@Entity
@NamedQueries({
        @NamedQuery(name = "User.getAllUser", query = "Select d from User d"),
        @NamedQuery(name = "User.returnDoingsOfUser", query = "select d from Doing d where d.user = :userLogin"),
        @NamedQuery(name = "User.getUserById", query = "Select us from User us where us.login = :id")
})
@Table(name = "users")
public class User {

    @Id
    private String login;
    private String password;
    private String name;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Doing> doings;

    /**
     * Empty constructor
     */
    public User(){ }

    /**
     * Constructor with parameter
     *
     *
     * @param login    login of user
     * @param password password of user
     * @param name     name of user
     */
    public User(String login, String password, String name){
        this.login = login;
        this.password = password;
        this.name = name;
    }

    /**
     * Getter login
     */
    public String getLogin() {
        return login;
    }

    /**
     * Getter password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Setter login
     */
    public void setLogin(String login) {
        this.login = login;
    }

    /**
     * Setter password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Getter name
     */
    public String getName() {
        return name;
    }

    /**
     * Setter name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Add case to list of doings
     */
    public void addDoing(Doing doing){
        doing.setUser(this);
        doings.add(doing);
    }

    /**
     * Get doings of user
     */
    public List<Doing> getDoings() {
        return doings;
    }

    /**
     * Set doings for user
     */
    public void setDoings(List<Doing> doings) {
        this.doings = doings;
    }

    @Override
    public String toString(){
        return "User name = " + this.getName() +
                " login = " + this.login;
    }
}