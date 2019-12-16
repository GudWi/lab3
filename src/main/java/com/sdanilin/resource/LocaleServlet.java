package com.sdanilin.resource;

import com.sdanilin.model.VocabularyModel;
import com.sdanilin.producers.LocaleManager;
import org.apache.log4j.Logger;
import org.jboss.resteasy.spi.ResteasyProviderFactory;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("locale")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class LocaleServlet {
    @Inject
    private LocaleManager manager;

    @Inject
    private Logger logger;

    /**
     * Получить словарь с учетом локали пользователя
     *
     *
     * @return Словарь
     */
    @POST
    @Path("getLocale")
    public Response getLocale(){
        logger.info("getLocale start");
        String locale = ResteasyProviderFactory.getContextData(HttpServletRequest.class).getLocale().toString();
        List<VocabularyModel> localeStorage = manager.getLocalStorage(locale);

        if(localeStorage != null){
            logger.info("successful send");
        } else {
            logger.error("getLocale failed");
        }

        return Response.ok(localeStorage).build();
    }
}
