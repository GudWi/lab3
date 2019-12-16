package com.sdanilin.resource.filters;

import org.apache.log4j.Logger;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;


@Path("/echo")
@Produces({ MediaType.TEXT_PLAIN })
public class EchoAPI {
    private static final Logger log = Logger.getLogger(EchoAPI.class);

    @Context
    protected SecurityContext securityContext;

    /**
     * A sample GET request to demonstrate {@link JWTRequestFilter}
     *
     * @param message The query parameter
     * @return echos back the query parameter
     */
    @GET
    @JWTSecured
    @RolesAllowed("USER") // just for demonstration, check JWTRequestFilter to see what roles are injected to security context
    public Response echo(@QueryParam("message") String message) {
        JWTRequestFilter.JWTPrincipal p = (JWTRequestFilter.JWTPrincipal) securityContext.getUserPrincipal();
        return Response.ok().entity(message).build();
    }
}
