package com.sdanilin.resource;

import com.sdanilin.entities.Permissions;
import com.sdanilin.entities.User;
import com.sdanilin.services.CaseService;
import com.sdanilin.services.UserService;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;
import netscape.javascript.JSObject;
import org.apache.log4j.Logger;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


@Path("/user")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserServlet {
    @Inject
    private UserService service;

    @Inject
    private CaseService caseService;

    @Inject
    private Logger logger;

    private static final Logger log = Logger.getLogger(UserServlet.class);

    @POST
    @Path("/login")
    public Response login(User user){
        logger.info("login");
        User newUser = service.loginUser(user.getLogin(), user.getPassword());

        if(newUser != null){
            return Response.ok(newUser).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @POST
    @Path("/registration")
    public Response registration(User user){
        logger.info("registration");
        boolean mark = service.userExist(user.getLogin());

        if(mark){
            return Response.status(Response.Status.NOT_FOUND).build();
        } else {
            service.saveUser(user);
            return Response.ok(user).build();
        }
    }

    @POST
    @Path("/getAllUsers")
    public String getAllUsers(int id){
        JSONArray result = new JSONArray();

        List<User> users = service.getAllUsers();

        for(User user : users){
            JSONObject jsonUser = new JSONObject();

            jsonUser.put("login", user.getLogin());

            if(caseService.checkAccess(id, user.getLogin())){
                jsonUser.put("access", true);
            } else {
                jsonUser.put("access", false);
            }

            result.add(jsonUser);
        }

        return result.toJSONString();
    }
}
