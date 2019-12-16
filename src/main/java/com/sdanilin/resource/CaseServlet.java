package com.sdanilin.resource;

import com.sdanilin.entities.Doing;
import com.sdanilin.model.PermisClientModel;
import com.sdanilin.services.CaseService;
import com.sdanilin.services.UserService;
import net.minidev.json.JSONObject;
import netscape.javascript.JSObject;
import org.apache.log4j.Logger;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/case")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CaseServlet {
    @Inject
    private CaseService caseService;

    @Inject
    private UserService userService;

    @Inject
    private Logger logger;

    @POST
    @Path("/getCases")
    public Response getCases(){
        logger.info("getCases");
        List<Doing> doings = caseService.getAllCases();

        if(doings != null){
            return Response.ok(doings).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @POST
    @Path("/addCase")
    public Response addCase(Doing doing){
        logger.info("addCase");
        userService.updateCase(doing.getUserName(), doing);

        return Response.ok().build();
    }

    @POST
    @Path("/getCase/{id}")
    public Response getCase(@PathParam("id") int id){
        logger.info("getCase");
        Doing doing = caseService.getCase(id);

        return Response.ok(doing).build();
    }

    @POST
    @Path("/deleteCase/{id}")
    public Response deleteCase(@PathParam("id") int id){
        logger.info("deleteCase");
        caseService.deleteCaseById(id);

        return Response.ok().build();
    }

    @POST
    @Path("/updateCase/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/json")
    public Response updateCase(@PathParam("id") int id, Doing doing){
        logger.info("updateCase");
        doing.setThemeId(id);
        caseService.updateCase(doing);

        return Response.ok().build();
    }

    @POST
    @Path("/checkAccess/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/json")
    public String checkAccess(@PathParam("id") int id, String login){
        logger.info("checkAccess");
        Boolean access = caseService.checkAccess(id, login);

        JSONObject result = new JSONObject();
        result.put("access", access);

        return result.toJSONString();
    }

    @POST
    @Path("/sendPermissions/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes("application/json")
    public Response sendPermissions(@PathParam("id") int id, List<PermisClientModel> permissions){
        logger.info("sendPermissions");
        caseService.savePermissions(permissions, id);

        return Response.ok().build();
    }
}
