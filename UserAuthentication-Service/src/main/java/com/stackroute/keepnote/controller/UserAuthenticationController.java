package com.stackroute.keepnote.controller;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.UserAlreadyExistsException;
import com.stackroute.keepnote.exception.UserNotFoundException;
import com.stackroute.keepnote.model.User;
import com.stackroute.keepnote.service.UserAuthenticationService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

/*
 * As in this assignment, we are working on creating RESTful web service, hence annotate
 * the class with @RestController annotation. A class annotated with the @Controller annotation
 * has handler methods which return a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */

@RestController
@Api
@CrossOrigin(origins = "*")
public class UserAuthenticationController {
	static final long EXPIRATIONTIME = 300000;
	Map<String, String> loginMap = new HashMap<>();
	/*
	 * Autowiring should be implemented for the UserAuthenticationService. (Use
	 * Constructor-based autowiring) Please note that we should not create an object
	 * using the new keyword
	 */
	UserAuthenticationService userAuthenticationService;
	@Autowired
	public UserAuthenticationController(UserAuthenticationService authicationService) {
		this.userAuthenticationService = authicationService;
	}
	
	/*
	 * Define a handler method which will create a specific user by reading the
	 * Serialized object from request body and save the user details in the
	 * database. This handler method should return any one of the status messages
	 * basis on different situations: 1. 201(CREATED) - If the user created
	 * successfully. 2. 409(CONFLICT) - If the userId conflicts with any existing
	 * user
	 * 
	 * This handler method should map to the URL "/api/v1/auth/register" using HTTP
	 * POST method
	 */
	@ApiOperation(value = "Create User")
	@PostMapping("/api/v1/auth/register")
	public ResponseEntity<User> createUser(@RequestBody User user) {
		ResponseEntity<User> result = null;
		try {
			userAuthenticationService.saveUser(user);
			result = new ResponseEntity<User>(user, HttpStatus.CREATED);
		} catch (UserAlreadyExistsException e) {
			System.out.println("UserAlreadyExistsException : User Already Exists");
			return new ResponseEntity<User>(HttpStatus.CONFLICT);
		}
		return result;
	}
	/*
	 * Define a handler method which will authenticate a user by reading the
	 * Serialized user object from request body containing the userid and
	 * password. The username and password should be validated before proceeding
	 * ahead with JWT token generation. The user credentials will be validated
	 * against the database entries. The error should be return if validation is not
	 * successful. If credentials are validated successfully, then JWT token will be
	 * generated. The token should be returned back to the caller along with the API
	 * response. This handler method should return any one of the status messages
	 * basis on different situations: 1. 200(OK) - If login is successful 2.
	 * 401(UNAUTHORIZED) - If login is not successful
	 * 
	 * This handler method should map to the URL "/api/v1/auth/login" using HTTP
	 * POST method
	 */
	@ApiOperation(value = "User Login")
	@PostMapping("/api/v1/auth/login")
	public ResponseEntity<?> login(@RequestBody User user) throws ServletException {
		String jwtToken = "";
		try {
			jwtToken = getToken(user.getUserId(), user.getUserPassword());
			loginMap.clear();
			loginMap.put("message", "user successfully logged in");
			loginMap.put("token", jwtToken);
			loginMap.put("UserId", user.getUserId());
		} catch (Exception e) {
			String exceptionMessage = e.getMessage();
			loginMap.clear();
			loginMap.put("token", null);
			loginMap.put("message", exceptionMessage);
			return new ResponseEntity<>(loginMap, HttpStatus.UNAUTHORIZED);
		}
		return new ResponseEntity<>(loginMap, HttpStatus.OK);
	}
	
	// Generate JWT token
	public String getToken(String userId, String password) throws Exception {
		User resultUser = null;
		if (userId == null || password == null) {
			throw new ServletException("Please fill in username and password");
		}
		try {
			resultUser = userAuthenticationService.findByUserIdAndPassword(userId, password);
		} catch (UserNotFoundException e) {
			System.out.println("UserNotFoundException : User Not Found");
		}
		if (resultUser == null) {
			throw new ServletException("Invalid credentials.");
		}
		String jwtToken = Jwts.builder().setSubject(userId).setIssuedAt(new Date())
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
				.signWith(SignatureAlgorithm.HS256, "secretkey").compact();
		return jwtToken;
	}
	
	@ApiOperation(value = "isAuthenticated")
	@PostMapping("/api/v1/auth/login/isAuthenticated")
	public  ResponseEntity<?> isAuthenticated(ServletRequest req) throws IOException, ServletException {
		final HttpServletRequest request = (HttpServletRequest) req;
		
		final String authHeader = request.getHeader("authorization");
			if (authHeader == null || !authHeader.startsWith("Bearer ")) {
				throw new ServletException("Missing or invalid Authorization header");
			}
			final String token = authHeader.substring(7);
			try {
			final Claims claims = Jwts.parser()
									  .setSigningKey("secretkey")
									  .parseClaimsJws(token)
									  .getBody();
			loginMap.clear();
			loginMap.put("isAuthenticated", "true");
			loginMap.put("message", "Vaild Token");
			return new ResponseEntity<>(loginMap, HttpStatus.OK);
			}catch(Exception e) {
				System.out.println("Invalid Token");
				loginMap.clear();
				loginMap.put("isAuthenticated", "false");
				loginMap.put("message", "Invalid Token");
				return new ResponseEntity<>(loginMap, HttpStatus.UNAUTHORIZED);
			}
    }
}
