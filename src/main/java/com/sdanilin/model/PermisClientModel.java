package com.sdanilin.model;

public class PermisClientModel {
    private String login;
    private Boolean access;

    public void setAccess(Boolean access) {
        this.access = access;
    }

    public Boolean getAccess() {
        return access;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getLogin() {
        return login;
    }
}
