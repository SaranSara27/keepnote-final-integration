package com.stackroute.keepnote.jwtfilter;


import org.springframework.web.filter.GenericFilterBean;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import java.io.IOException;



/* This class implements the custom filter by extending org.springframework.web.filter.GenericFilterBean.  
 * Override the doFilter method with ServletRequest, ServletResponse and FilterChain.
 * This is used to authorize the API access for the application.
 */


public class JwtFilter extends GenericFilterBean {

	
	
	

	/*
	 * Override the doFilter method of GenericFilterBean.
     * Retrieve the "authorization" header from the HttpServletRequest object.
     * Retrieve the "Bearer" token from "authorization" header.
     * If authorization header is invalid, throw Exception with message. 
     * Parse the JWT token and get claims from the token using the secret key
     * Set the request attribute with the retrieved claims
     * Call FilterChain object's doFilter() method */
	
	
    @Override
    public void doFilter(ServletRequest req, ServletResponse response, FilterChain chain) throws IOException, ServletException {
    	final HttpServletRequest request = (HttpServletRequest) req;

        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer")) {
            throw new ServletException("Missing or invalid Authorization header.");
        }

        final String compactJws = authHeader.substring(7); // The part after "Bearer "

        try {
            Claims claims = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(compactJws).getBody();
            request.setAttribute("claims", claims);
            logger.info("claims :: "+claims);
            logger.info("claims.getSubject() :: "+claims.getSubject());
            request.getSession().setAttribute("loggedInUserId", claims.getSubject());
          
        }
        catch (SignatureException e) {
            throw new ServletException("Invalid token.");
        }catch(MalformedJwtException jwtException)
        {
        	throw new ServletException("JWT is malformed.");
        }

        chain.doFilter(request, response);
    }
}