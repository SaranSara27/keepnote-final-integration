package com.stackroute.keepnote.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.service.NoteService;

/*
 * As in this assignment, we are working with creating RESTful web service, hence annotate
 * the class with @RestController annotation.A class annotated with @Controller annotation
 * has handler methods which returns a view. However, if we use @ResponseBody annotation along
 * with @Controller annotation, it will return the data directly in a serialized 
 * format. Starting from Spring 4 and above, we can use @RestController annotation which 
 * is equivalent to using @Controller and @ResposeBody annotation
 */
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/note")
public class NoteController {

	/*
	 * Autowiring should be implemented for the NoteService. (Use Constructor-based
	 * autowiring) Please note that we should not create any object using the new
	 * keyword
	 */

	@Autowired
	NoteService noteService;

	public NoteController(NoteService noteService) {
		this.noteService = noteService;
	}

	/*
	 * Define a handler method which will create a specific note by reading the
	 * Serialized object from request body and save the note details in the
	 * database.This handler method should return any one of the status messages
	 * basis on different situations: 
	 * 1. 201(CREATED) - If the note created successfully. 
	 * 2. 409(CONFLICT) - If the noteId conflicts with any existing user.
	 * 
	 * This handler method should map to the URL "/api/v1/note" using HTTP POST method
	 */
	@PostMapping()
	public ResponseEntity<?> addNote(@RequestBody Note note,HttpServletRequest request) {
		Map<String, String> map = new HashMap<>();
		note.setNoteCreatedBy((String) request.getSession().getAttribute("loggedInUserId"));
		if (noteService.createNote(note)) {
			map.put("status", "Success");
			return new ResponseEntity<>(map, HttpStatus.CREATED);
		} else {
			map.put("status", "Failure");
			return new ResponseEntity<>(map, HttpStatus.CONFLICT);
		}
	}

	/*
	 * Define a handler method which will delete a note from a database.
	 * This handler method should return any one of the status messages basis 
	 * on different situations: 
	 * 1. 200(OK) - If the note deleted successfully from database. 
	 * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
	 *
	 * This handler method should map to the URL "/api/v1/note/{userId}/{noteId}" using HTTP Delete
	 * method" where "id" should be replaced by a valid noteId without {}
	 */
	@DeleteMapping("/{userId}/{noteId}")
	public ResponseEntity<?> deleteNote(@PathVariable String userId, @PathVariable() int noteId) {
		Map<String, String> map = new HashMap<>();
		if (noteService.deleteNote(userId, noteId)) {
			map.put("status", "Success");
			return new ResponseEntity<>(map, HttpStatus.OK);
		} else {
			map.put("status", "Failure");
			return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/{userId}")
	public ResponseEntity<?> deleteAllNotes(@PathVariable() String userId) {
		Map<String, String> map = new HashMap<>();
		try {
			noteService.deleteAllNotes(userId);
			map.put("status", "Success");
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (NoteNotFoundExeption exception) {
			map.put("status", "Failure");
			return new ResponseEntity<>(map, HttpStatus.NOT_FOUND);
		}
	}

	/*
	 * Define a handler method which will update a specific note by reading the
	 * Serialized object from request body and save the updated note details in a
	 * database. 
	 * This handler method should return any one of the status messages
	 * basis on different situations: 
	 * 1. 200(OK) - If the note updated successfully.
	 * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/note/{userId}/{noteId}" using HTTP PUT method.
	 */
	@PutMapping("/{userId}/{noteId}")
	public ResponseEntity<?> updateNote(@PathVariable() String userId, @PathVariable() int noteId, @RequestBody Note note) {
		try {
			Note updatedNote = noteService.updateNote(note, noteId, userId);
			return new ResponseEntity<Note>(updatedNote, HttpStatus.OK);
		} catch (NoteNotFoundExeption e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}
	
	/*
	 * Define a handler method which will get us the all notes by a userId.
	 * This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the note found successfully. 
	 * 
	 * This handler method should map to the URL "/api/v1/note/{userId}" using HTTP GET method
	 */
	@GetMapping("/{userId}")
	public ResponseEntity<?> getAllNoteByUserId(@PathVariable() String userId) {
		List<Note>  noteList = noteService.getAllNoteByUserId(userId);
		return new ResponseEntity<>(noteList, HttpStatus.OK);
	}
	
	/*
	 * Define a handler method which will show details of a specific note created by specific 
	 * user. This handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 200(OK) - If the note found successfully. 
	 * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
	 * This handler method should map to the URL "/api/v1/note/{userId}/{noteId}" using HTTP GET method
	 * where "id" should be replaced by a valid reminderId without {}
	 * 
	 */
	@GetMapping("{userId}/{noteId}")
	public ResponseEntity<?> getNoteById(@PathVariable() String userId, @PathVariable() int noteId) {
		HttpHeaders headers = new HttpHeaders();
		try {
			Note note = noteService.getNoteByNoteId(userId, noteId);
			return new ResponseEntity<Note>(note, HttpStatus.OK);
		} catch (NoteNotFoundExeption exception) {
			return new ResponseEntity<String>(headers, HttpStatus.NOT_FOUND);
		}
	}


}
