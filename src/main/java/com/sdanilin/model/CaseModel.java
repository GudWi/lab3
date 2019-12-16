package com.sdanilin.model;

import com.sdanilin.entities.Doing;

import java.util.List;

/**
 * Singleton for User class
 *
 *
 * @author SDanilin
 */
public class CaseModel {
    private static CaseModel instance = new CaseModel();

    private List<Doing> list;

    /**
     * instance access point
     */
    public static CaseModel getInstance() {
        return instance;
    }

    /**
     * Empty constructor
     */
    private CaseModel(){}

    /**
     * Getter fo user
     */
    public List<Doing> getCurrentUser() {
        return list;
    }
}
