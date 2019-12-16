package com.sdanilin.entities;

import javax.persistence.*;

@Entity
@NamedQueries({
        @NamedQuery(name = "Permissions.getByCaseId", query = "Select p from Permissions p " +
                "where p.caseId = :caseId"),
        @NamedQuery(name = "Permissions.getAll", query = "Select p from Permissions p"),
})
@Table(name = "permissions")
public class Permissions {
    @Id
    @Column(name = "id", updatable = false, nullable = false)
    private int id;

    @Column(name = "accessibleuser")
    private String accessibleUser;

    @Column(name = "caseid")
    private int caseId;

    public Permissions(){

    }

    public Permissions(String accessibleUser, int id, int caseId){
        this.id = id;
        this.caseId = caseId;
        this.accessibleUser = accessibleUser;
    }

    public int getCaseId() {
        return caseId;
    }

    public void setCaseId(int caseId) {
        this.caseId = caseId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAccessibleUser() {
        return accessibleUser;
    }

    public void setAccessibleUser(String accessibleUser) {
        this.accessibleUser = accessibleUser;
    }
}
