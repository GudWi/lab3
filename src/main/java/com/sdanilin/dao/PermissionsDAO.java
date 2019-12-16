package com.sdanilin.dao;

import com.sdanilin.entities.Permissions;
import org.apache.log4j.Logger;

import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Default;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

@Default
@Dependent
public class PermissionsDAO {
    @Inject
    private EntityManager em;

    @Inject
    private Logger logger;

    public void save(Permissions permissions){
        logger.debug("save perm");
        em.getTransaction().begin();
        em.persist(permissions);
        em.getTransaction().commit();
    }

    public void delete(Permissions permissions){
        logger.debug("delete perms");
        em.getTransaction().begin();
        em.remove(permissions);
        em.getTransaction().commit();
    }

    public int getMaxId(){
        int result = 0;

        List<Permissions> permissions = em.createNamedQuery("Permissions.getAll", Permissions.class)
                .getResultList();

        if(permissions.size() != 0){
            for(Permissions p : permissions){
                if(p.getId() > result){
                    result = p.getId();
                }
            }
        }

        return result;
    }

    public List<Permissions> getByCaseId(int caseId){
        logger.debug("getByCaseId");
        em.getTransaction().begin();
        List<Permissions> result = em.createNamedQuery("Permissions.getByCaseId", Permissions.class)
                .setParameter("caseId", caseId)
                .getResultList();
        em.getTransaction().commit();

        return result;
    }
}
