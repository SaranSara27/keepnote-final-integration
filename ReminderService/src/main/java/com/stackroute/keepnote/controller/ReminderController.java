package com.stackroute.keepnote.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.ReminderNotCreatedException;
import com.stackroute.keepnote.exception.ReminderNotFoundException;
import com.stackroute.keepnote.model.Reminder;
import com.stackroute.keepnote.service.ReminderService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
/*
 * As in this assignment, we are working with creating RESTful web service, hence annotate
 * the class with @RestController annotation.A class annotated with @Controller annotation
 * has handler methods which returns a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */
@RestController
@Api
@CrossOrigin(origins = "*")
public class ReminderController {
	/*
	 * From the problem statement, we can understand that the application requires
	 * us to implement five functionalities regarding reminder. They are as
	 * following:
	 * 
	 * 1. Create a reminder 
	 * 2. Delete a reminder 
	 * 3. Update a reminder 
	 * 4. Get all reminders by userId 
	 * 5. Get a specific reminder by id.
	 * 
	 */
	/*
	 * Autowiring should be implemented for the ReminderService. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword
	 */
	ReminderService reminderService;
	
	@Autowired
	public ReminderController(ReminderService reminderService) {
		this.reminderService = reminderService;
	}
	
	
	/*
	 * Define a handler method which will create a reminder by reading the
	 * Serialized reminder object from request body and save the reminder in
	 * database. Please note that the reminderId has to be unique. This handler
	 * method should return any one of the status messages basis on different
	 * situations: 
	 * 1. 201(CREATED - In case of successful creation of the reminder
	 * 2. 409(CONFLICT) - In case of duplicate reminder ID
	 *
	 * This handler method should map to the URL "/api/v1/reminder" using HTTP POST
	 * method".
	 */
	
	@ApiOperation(value="createReminder")
	@PostMapping("/api/v1/reminder")
	public ResponseEntity<Reminder>addReminder(@RequestBody Reminder reminder){
		/*String loggedInUserId = (String) session.getAttribute("loggedInUserId");
		if(loggedInUserId!=null) {
			reminder.setReminderCreatedBy(loggedInUserId);*/
			
			Reminder r=null;
			try {
				r = reminderService.createReminder(reminder);
			} catch (ReminderNotCreatedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if(r!=null)
				return new ResponseEntity<Reminder>(reminder, HttpStatus.CREATED);
			else
				return new ResponseEntity<Reminder>( HttpStatus.CONFLICT);
			
		/*}else {
			return new ResponseEntity<Reminder>(reminder, HttpStatus.UNAUTHORIZED);
		}*/
	}
	/*
	 * Define a handler method which will delete a reminder from a database.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the reminder deleted successfully from database. 
	 * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/reminder/{id}" using HTTP Delete
	 * method" where "id" should be replaced by a valid reminderId without {}
	 */
	@ApiOperation(value="deleteReminder")
	@DeleteMapping("/api/v1/reminder/{id}")
	public ResponseEntity<Reminder>deleteReminder(@PathVariable String id){
		/*String loggedInUserId = (String) session.getAttribute("loggedInUserId");
		if(session!=null &&loggedInUserId!=null) {*/
			boolean flag=false;
			try {
				flag = reminderService.deleteReminder(id);
			} catch (ReminderNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if(flag)
				return new ResponseEntity<Reminder>(HttpStatus.OK);
			else
				return new ResponseEntity<Reminder>( HttpStatus.NOT_FOUND);
			
		/*}else {
			return new ResponseEntity<Reminder>( HttpStatus.UNAUTHORIZED);
		}*/
	}
	
	/*
	 * Define a handler method which will update a specific reminder by reading the
	 * Serialized object from request body and save the updated reminder details in
	 * a database. This handler method should return any one of the status messages
	 * basis on different situations: 
	 * 1. 200(OK) - If the reminder updated successfully. 
	 * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found. 
	 * 
	 * This handler method should map to the URL "/api/v1/reminder/{id}" using HTTP PUT
	 * method.
	 */
	@ApiOperation(value="updateReminder")
	@PutMapping("/api/v1/reminder/{id}")
	public ResponseEntity<Reminder> update(@PathVariable("id") String id ,@RequestBody Reminder reminder) {
		/*try {
		String loggedInUserId = (String) session.getAttribute("loggedInUserId");
		
		if(loggedInUserId!=null&&session.getAttribute("loggedInUserId").equals(reminder.getReminderCreatedBy())) {
				if(reminderService.updateReminder(reminder, reminder.getReminderId())==null)
					throw new ReminderNotFoundException("not found");
				return new ResponseEntity<Reminder>(reminder, HttpStatus.OK);
			}
			else {
				return new ResponseEntity<Reminder>( HttpStatus.UNAUTHORIZED);
			}
		} catch(ReminderNotFoundException e) {
			return new ResponseEntity<Reminder>( HttpStatus.NOT_FOUND);
		}*/
		
		Reminder reminderUpdate=null;
		try {
			reminderUpdate = reminderService.updateReminder(reminder, id);
		} catch (ReminderNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        if (reminderUpdate != null)
            return new ResponseEntity<Reminder>(reminder, HttpStatus.OK);
        else
            return new ResponseEntity<Reminder>(HttpStatus.NOT_FOUND);
	}
	
	/*
	 * Define a handler method which will show details of a specific reminder. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the reminder found successfully. 
	 * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found. 
	 * 
	 * This handler method should map to the URL "/api/v1/reminder/{id}" using HTTP GET method
	 * where "id" should be replaced by a valid reminderId without {}
	 */
	@ApiOperation(value="getReminderById")
	@GetMapping("/api/v1/reminder/{id}")
	public ResponseEntity<Reminder> getReminderById(@PathVariable("id") String id) {
		//if (session!=null && session.getAttribute("loggedInUserId") != null) {
				try {
					Reminder reminder = reminderService.getReminderById(id);
					if(reminder==null) {
						return new ResponseEntity<Reminder>(HttpStatus.NOT_FOUND);
					} else {
						return new ResponseEntity<Reminder>(reminder, HttpStatus.OK);
					}
				} catch (ReminderNotFoundException e) {
					return new ResponseEntity<Reminder>( HttpStatus.NOT_FOUND);
				}
		/*} else {
			return new ResponseEntity<Reminder>(HttpStatus.UNAUTHORIZED);
		}*/
	}
	
	/*
	 * Define a handler method which will get us the all reminders.
	 * This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the reminder found successfully. 
	 * 2. 404(NOT FOUND) - If the reminder with specified reminderId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/reminder" using HTTP GET method
	 */
	@ApiOperation(value="getReminders")
	@GetMapping("/api/v1/reminder")
    public ResponseEntity<List<Reminder>> getReminders() {
		/*String loggedInUserId= (String) session.getAttribute("loggedInUserId");
        if(loggedInUserId==null) {
            return new ResponseEntity<List<Reminder>>(HttpStatus.UNAUTHORIZED);
        }*/
        
        List<Reminder> list = reminderService.getAllReminders();
        if(list==null) {
        	return new ResponseEntity<List<Reminder>>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Reminder>>(list,HttpStatus.OK);
    }
}