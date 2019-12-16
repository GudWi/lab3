package com.sdanilin.producers;

import org.apache.log4j.Logger;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;

@ApplicationScoped
public class EntityManagerProducer {
    private static EntityManagerFactory entityManagerFactory;

    private static Logger logger = Logger.getLogger(EntityManagerProducer.class);

    @PersistenceContext
    private static EntityManagerFactory getEntityManagerFactory(){
        if (entityManagerFactory == null) {
            try {
                entityManagerFactory = Persistence.createEntityManagerFactory("FORM");
            } catch (Exception e) {
                logger.error(e);
            }

        }
        return entityManagerFactory;
    }

    @Produces
    public static EntityManager getEntityManager() {
        return getEntityManagerFactory().createEntityManager();
    }

}