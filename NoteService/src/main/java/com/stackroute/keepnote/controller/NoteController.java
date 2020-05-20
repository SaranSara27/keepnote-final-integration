package com.stackroute.keepnote.controller;
import java.util.Date;
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
import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.service.NoteService;
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
public class NoteController {
	/*
	 * Autowiring should be implemented for the NoteService. (Use Constructor-based
	 * autowiring) Please note that we should not create any object using the new
	 * keyword
	 */
	NoteService noteService;
	@Autowired
	public NoteController(NoteService noteService) {
		this.noteService = noteService;
	}
	
	/*
	 * Define a handler method which will create a specific note by reading the
	 * Serialized object from request body and save the note details in the
	 * database.This handler method should return any one of the status messages
	 * basis on different situations: 1. 201(CREATED) - If the note created
	 * successfully. 2. 409(CONFLICT) - If the noteId conflicts with any existing
	 * user.
	 * 
	 * This handler method should map to the URL "/api/v1/note" using HTTP POST
	 * method
	 */
	
	@ApiOperation(value="createNote")
	@PostMapping("/api/v1/note")
	public ResponseEntity<Note> createNote(@RequestBody Note note) {
		System.out.println("Inside createNote");
		int noteId = (int) (Math.random() * 10000);
		System.out.println("noteId:"+noteId);
		note.setNoteId(noteId);
		note.setNoteCreationDate(new Date());
		boolean resultStatus = noteService.createNote(note);
	
		if (resultStatus) {
			return new ResponseEntity<Note>(note,HttpStatus.CREATED);
		} else {
			return  new ResponseEntity<Note>(HttpStatus.CONFLICT);
		}
		
	}
	/*
	 * Define a handler method which will delete a note from a database. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the note deleted successfully from
	 * database. 2. 404(NOT FOUND) - If the note with specified noteId is not found.
	 *
	 * This handler method should map to the URL "/api/v1/note/{userId}/{noteId}"
	 * using HTTP Delete method" where "id" should be replaced by a valid noteId
	 * without {}
	 */
	
	@ApiOperation(value="deleteNoteByNoteId")
	@DeleteMapping("/api/v1/note/{userId}/{noteId}")
	public ResponseEntity<Note> deleteNoteByNoteId(@PathVariable("userId") String userId,
			@PathVariable("noteId") int noteId) {
		
		boolean resultStatus = noteService.deleteNote(userId, noteId);
		if (resultStatus) {
			return new ResponseEntity<Note>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
		}
		
	}
	/*
	 * Define a handler method which will delete all note from a database. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the note deleted successfully from
	 * database. 2. 404(NOT FOUND) - If the note with specified noteId is not found.
	 *
	 * This handler method should map to the URL "/api/v1/note/{userId}" using HTTP
	 * Delete method" where "id" should be replaced by a valid noteId without {}
	 */
	
	@ApiOperation(value="deleteAllNote")
	@DeleteMapping("/api/v1/note/{userId}")
	public ResponseEntity<Note> deleteAllNote(@PathVariable("userId") String userId) {
		
		boolean resultStatus = false;
		try {
			resultStatus = noteService.deleteAllNotes(userId);
		} catch (NoteNotFoundExeption e) {
			System.out.println("Note Not Found");
		}
		if (resultStatus) {
			return new ResponseEntity<Note>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
		}
		
	}
	/*
	 * Define a handler method which will update a specific note by reading the
	 * Serialized object from request body and save the updated note details in a
	 * database. This handler method should return any one of the status messages
	 * basis on different situations: 1. 200(OK) - If the note updated successfully.
	 * 2. 404(NOT FOUND) - If the note with specified noteId is not found.
	 * 
	 * This handler method should map to the URL "/api/v1/note/{userId}/{noteId}"
	 * using HTTP PUT method.
	 */
	@ApiOperation(value="updateNote")
	@PutMapping("/api/v1/note/{userId}/{noteId}")
	public ResponseEntity<Note> updateNote(@PathVariable("userId") String userId, @PathVariable("noteId") int noteId,
			@RequestBody Note note) {
		
		Note resultNote = new Note();
		try {
			resultNote = noteService.updateNote(note, noteId, userId);
		} catch (NoteNotFoundExeption e) {
			System.out.println("Note Not Found");
			resultNote = null;
		}
		if (resultNote != null) {
			return new ResponseEntity<Note>(HttpStatus.OK);
		} else {
			return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
		}
		
	}
	/*
	 * Define a handler method which will get us the all notes by a userId. This
	 * handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the note found successfully.
	 * 
	 * This handler method should map to the URL "/api/v1/note/{userId}" using HTTP
	 * GET method
	 */
	
	@ApiOperation(value="getAllNotesByUserId")
	@GetMapping("/api/v1/note/{userId}")
	public ResponseEntity<List<Note>> getAllNotesByUserId(@PathVariable("userId") String userId) {
		
		List<Note> note = null;
		note = noteService.getAllNoteByUserId(userId);
		return  new ResponseEntity<List<Note>>(note, HttpStatus.OK);
		
	}
	/*
	 * Define a handler method which will show details of a specific note created by
	 * specific user. This handler method should return any one of the status
	 * messages basis on different situations: 1. 200(OK) - If the note found
	 * successfully. 2. 404(NOT FOUND) - If the note with specified noteId is not
	 * found. This handler method should map to the URL
	 * "/api/v1/note/{userId}/{noteId}" using HTTP GET method where "id" should be
	 * replaced by a valid reminderId without {}
	 * 
	 */
	@GetMapping("/api/v1/note/{userId}/{noteId}")
	public ResponseEntity<Note> getNoteByNoteId(@PathVariable("userId") String userId,
			@PathVariable("noteId") int noteId) {
		
		Note note = null;
		try {
			note = noteService.getNoteByNoteId(userId, noteId);
		} catch (NoteNotFoundExeption e) {
			System.out.println("NoteNotFoundExeption : Note Not Found");
		}
		if (note == null) {
			return new ResponseEntity<Note>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<Note>(note, HttpStatus.OK);
		}
		
	}
}