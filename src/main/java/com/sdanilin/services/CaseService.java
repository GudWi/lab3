package com.sdanilin.services;

import com.sdanilin.dao.CaseDAO;
import com.sdanilin.dao.PermissionsDAO;
import com.sdanilin.entities.Doing;
import com.sdanilin.entities.Permissions;
import com.sdanilin.entities.User;
import com.sdanilin.model.CaseWithAccessModel;
import com.sdanilin.model.PermisClientModel;
import org.apache.log4j.Logger;

import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Default;
import javax.inject.Inject;
import java.util.List;

@Default
@Dependent
public class CaseService {
    @Inject
    private CaseDAO caseDAO;

    @Inject
    private PermissionsDAO permissionsDAO;

    @Inject
    private Logger logger;

    public void saveCase(Doing doing){
        logger.debug("saveCase");
        caseDAO.save(doing);
    }

    public void updateCase(Doing doing){
        logger.debug("updateCase");
        caseDAO.update(doing);
    }

    public void deleteCase(Doing doing){
        logger.debug("deleteCase");
        caseDAO.delete(doing);
    }

    public void deleteCaseById(int id){
        logger.debug("deleteCaseById");
        caseDAO.deleteById(id);
    }

    public Doing getCase(int id){
        logger.debug("getCase");
        return caseDAO.findDoingById(id);
    }

    public List<Doing> getAllCases(){
        logger.debug("getAllCases");
        return caseDAO.getAllCases();
    }

    public Boolean checkAccess(int id, String login){
        Boolean access = false;
        Doing doing = caseDAO.findDoingById(id);
        User userHost = doing.getUser();
        List<Permissions> allowed = permissionsDAO.getByCaseId(id);

        if(userHost.getLogin().equals(login)){
            return true;
        } else {
            if (allowed != null) {
                for (Permissions permissions : allowed) {
                    if (permissions.getCaseId() == id && permissions.getAccessibleUser().equals(login)) {
                        access = true;
                        break;
                    }
                }
            }
        }

        return access;
    }

    public void savePermissions(List<PermisClientModel> permissions, int caseId){
        List<Permissions> oldPerms = permissionsDAO.getByCaseId(caseId);

        for(Permissions p : oldPerms){
            permissionsDAO.delete(p);
        }

        for(PermisClientModel model : permissions){
            if(model.getAccess()){
                int id = permissionsDAO.getMaxId() + 1;
                Permissions p = new Permissions(model.getLogin(), id, caseId);
                permissionsDAO.save(p);
            }
        }
    }
}
