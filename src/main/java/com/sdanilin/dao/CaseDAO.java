package com.sdanilin.dao;

import com.sdanilin.entities.Doing;
import com.sdanilin.entities.Permissions;
import com.sdanilin.entities.User;
import org.apache.log4j.Logger;

import javax.enterprise.context.Dependent;
import javax.enterprise.inject.Default;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;

@Default
@Dependent
public class CaseDAO {
    @Inject
    private EntityManager em;

    @Inject
    private Logger logger;

    public void save(Doing doing){
        em.getTransaction().begin();
        em.persist(doing);
        em.getTransaction().commit();
    }

    /**
     * Replace doing in database
     *
     *
     * @param doing user needed to update
     */
    public void update(Doing doing){
        logger.debug("update");

        List<Doing> doings = em.createNamedQuery("Doing.getDoingById", Doing.class)
                .setParameter("id", doing.getThemeId())
                .getResultList();

        Doing interDoing = doings.isEmpty() ? null : doings.get(0);


        if(interDoing != null) {
            List<User> users = em.createNamedQuery("User.getUserById", User.class)
                    .setParameter("id",interDoing.getUser().getLogin())
                    .getResultList();

            if(!users.isEmpty()) {
                User user = users.get(0);

                if (doing.getCreatedDate() == null) doing.setCreatedDate(new Date());
                if (doing.getPlaneDate() == null) doing.setPlaneDate(null);
                if (doing.getCompleteDate() == null)doing.setCompleteDate(null);

                doing.setUserName(user.getName());
                doing.setUser(interDoing.getUser());

                em.getTransaction().begin();
                em.merge(doing);
                em.getTransaction().commit();
            }
        }
    }

    /**
     * Delete doing from database
     *
     *
     * @param doing user needed to delete
     */
    public void delete(Doing doing){
        logger.debug("delete");
        em.getTransaction().begin();
        em.remove(doing);
        em.getTransaction().commit();
    }

    public List<Doing> getAllCases(){
        logger.debug("getAllCases");
        List<Doing> cases = em.createNamedQuery("Doing.returnDoings", Doing.class).getResultList();

        return cases;
    }

    /**
     * Return doing by id
     *
     *
     * @param id id of doing
     */

    public Doing findDoingById(int id){
        logger.debug("findDoingById");
        List<Doing> doings = em.createNamedQuery("Doing.getDoingById", Doing.class)
                .setParameter("id",id)
                .getResultList();

        return doings.isEmpty() ? null : doings.get(0);
    }

    public void deleteById(int id){
        logger.debug("deleteById");
        List<Doing> doings = em.createNamedQuery("Doing.getDoingById", Doing.class)
                .setParameter("id",id)
                .getResultList();

        if(!doings.isEmpty()){
            Doing doing = doings.get(0);
            em.getTransaction().begin();
            em.remove(doing);
            em.getTransaction().commit();
        }
    }

    public List<Permissions> getByUserHost(String userHost){
        logger.debug("delete");
        em.getTransaction().begin();
        List<Permissions> result = em.createNamedQuery("Permissions.returnPermissions", Permissions.class)
                .setParameter("id", userHost)
                .getResultList();
        em.getTransaction().commit();

        return result;
    }
}
