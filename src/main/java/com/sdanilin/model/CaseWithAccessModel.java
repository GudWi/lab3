package com.sdanilin.model;

import com.sdanilin.entities.User;

import java.util.Date;

public class CaseWithAccessModel {
    private int themeId;

    private String theme;

    private String category;

    private Date planeDate;

    private String priority;

    private Date createdDate;

    private String userName;

    private Boolean done;

    private Date completeDate;

    private String description;

    private Boolean access;

    private User user;

    /**
     * Empty constructor
     */
    public CaseWithAccessModel(){}

    /**
     * Constructor with parameter
     *
     *
     * @param theme     theme name
     * @param planeDate date of execution
     * @param userName  name of user
     */
    public CaseWithAccessModel(String theme, Date planeDate, String userName){
        this.theme = theme;
        this.planeDate = planeDate;
        this.createdDate = new Date();
        this.userName = userName;
    }

    /**
     * Getter date of creation
     */
    public Date getCreatedDate() {
        return createdDate;
    }

    /**
     * Getter planed Date of execution
     */
    public Date getPlaneDate() {
        return planeDate;
    }

    /**
     * Getter id
     */
    public int getThemeId() {
        return themeId;
    }

    public Boolean getAccess() {
        return access;
    }

    public void setAccess(Boolean access) {
        this.access = access;
    }

    /**
     * Setter themeId
     *
     *
     * @param themeId id of theme
     */
    public void setThemeId(int themeId) {
        this.themeId = themeId;
    }

    /**
     * Getter theme name
     */
    public String getTheme() {
        return theme;
    }

    /**
     * Getter user name
     */
    public String getUserName() {
        return userName;
    }

    /**
     * Setter date of creation
     */
    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    /**
     * Setter planed Date of execution
     */
    public void setPlaneDate(Date planeDate) {
        this.planeDate = planeDate;
    }

    /**
     * Setter id
     */
    public void setTheme(String theme) {
        this.theme = theme;
    }

    /**
     * Setter user name
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * Get owner user
     */
    public User getUser() {
        return user;
    }

    /**
     * Set owner user
     */
    public void setUser(User user) {
        this.user = user;
    }

    /**
     * Getter done
     */
    public Boolean getDone() {
        return done;
    }

    /**
     * Setter done
     */
    public void setDone(Boolean done) {
        this.done = done;
    }

    /**
     * Getter completeDate
     */
    public Date getCompleteDate() {
        return completeDate;
    }

    /**
     * Setter completeDate
     */
    public void setCompleteDate(Date completeDate) {
        this.completeDate = completeDate;
    }

    /**
     * Getter category
     */
    public String getCategory() {
        return category;
    }

    /**
     * Getter priority
     */
    public String getPriority() {
        return priority;
    }

    /**
     * Setter category
     */
    public void setCategory(String category) {
        this.category = category;
    }

    /**
     * Setter priority
     */
    public void setPriority(String priority) {
        this.priority = priority;
    }

    /**
     * Getter description
     */
    public String getDescription() {
        return description;
    }

    /**
     * Setter description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString(){
        return "Doing theme name= " + this.getTheme() +
                " plane date = " + this.getPlaneDate() +
                " created date = " + this.getCreatedDate() +
                " user name = " + this.getUserName() +
                " done = " + this.getDone();
    }
}
