package com.stackroute.keepnote.service;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.NoteNotFoundExeption;
import com.stackroute.keepnote.model.Note;
import com.stackroute.keepnote.model.NoteUser;
import com.stackroute.keepnote.repository.NoteRepository;
/*
* Service classes are used here to implement additional business logic/validation 
* This class has to be annotated with @Service annotation.
* @Service - It is a specialization of the component annotation. It doesn't currently 
* provide any additional behavior over the @Component annotation, but it's a good idea 
* to use @Service over @Component in service-layer classes because it specifies intent 
* better. Additionally, tool support and additional behavior might rely on it in the 
* future.
* */
@Service
public class NoteServiceImpl implements NoteService{
	/*
	 * Autowiring should be implemented for the NoteRepository and MongoOperation.
	 * (Use Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword.
	 */
	
	NoteRepository noteRepository;
	MongoOperations mongoOperations;
	
	@Autowired
	public NoteServiceImpl(NoteRepository noteRepository,MongoOperations mongoOperations) {
		this.noteRepository=noteRepository;
		this.mongoOperations=mongoOperations;
	}
	
	/*
	 * This method should be used to save a new note.
	 */
	
	public boolean createNote(Note note) {
		String userId = note.getNoteCreatedBy();
		NoteUser object = null;
		boolean status = false;
		try{
			object = this.noteRepository.findById(userId).get();
			List<Note> list = object.getNotes();
			status = list.add(note); // status set as true
			object.setNotes(list);
			this.noteRepository.save(object);
		} catch(NoSuchElementException e) {
			NoteUser ns = null;
			List<Note> list = new ArrayList<>();
			list.add(note);
			object = new NoteUser(note.getNoteCreatedBy(), list);
			ns = this.noteRepository.insert(object);
			if(ns != null) {
				status = true;
			}
		}
		return status;
	}
	
	/* This method should be used to delete an existing note. */
	
	public boolean deleteNote(String userId, int noteId) {
		
		boolean result = false;
		List<Note> notelist = new ArrayList<>();
		NoteUser noteuser = new NoteUser();
		if (userId != null && noteId != 0) {
			try {
				noteuser = noteRepository.findById(userId).get();
			} catch (NoSuchElementException e) {
				e.printStackTrace();
				noteuser = null;
			}
			if (noteuser != null) {
				notelist = noteuser.getNotes();
				int notecount = 0;
				boolean isNoteExists = false;
				for (Note note : notelist) {
					if (noteId == note.getNoteId()) {
						isNoteExists = true;
						break;
					}
					notecount++;
				}
				if (isNoteExists && notelist.size() > 1) {
					noteuser.getNotes().remove(notecount);
					noteRepository.save(noteuser);
					result = true;
				} else {
					noteRepository.delete(noteuser);
					result = true;
				}
			}
		}
		return result;
	}
	
	/* This method should be used to delete all notes with specific userId. */
	
	public boolean deleteAllNotes(String userId) {
		boolean result = false;
		NoteUser noteuser = new NoteUser();
		if (userId != null) {
			try {
				noteuser = noteRepository.findById(userId).get();
			} catch (NoSuchElementException e) {
				System.out.println("NoSuchElementException Occured");
				noteuser = null;
			}
			if (noteuser != null) {
				noteRepository.delete(noteuser);
				result = true;
			}
		}
		return result;
	}
	/*
	 * This method should be used to update a existing note.
	 */
	public Note updateNote(Note note, int id, String userId) throws NoteNotFoundExeption {
		Note resultnote = new Note();
		NoteUser noteuser = new NoteUser();
		List<Note> notelist = new ArrayList<>();
		if (userId != null && id != 0 && note != null) {
			try {
				noteuser = noteRepository.findById(userId).get();
			} catch (NoSuchElementException e) {
				System.out.println("NoSuchElementException Occured");
				noteuser = null;
			}
			if (noteuser != null) {
				notelist = noteuser.getNotes();
				int noteIndex = 0;
				for (Note fetchedNote : notelist) {
					if (id == fetchedNote.getNoteId()) {
						note.setNoteId(fetchedNote.getNoteId());
						note.setNoteCreatedBy(fetchedNote.getNoteCreatedBy());
						note.setNoteCreationDate(fetchedNote.getNoteCreationDate());
						break;
					}
					noteIndex++;
				}
				notelist.remove(noteIndex);
				notelist.add(note);
				noteuser.setNotes(notelist);
				noteRepository.save(noteuser);
				resultnote = note;
			} else {
				throw new NoteNotFoundExeption("Note Not Found");
			}
			
		}
		return resultnote;
	}
	/*
	 * This method should be used to get a note by noteId created by specific user
	 */
	public Note getNoteByNoteId(String userId, int noteId) throws NoteNotFoundExeption {
		
		Note resultnote = new Note();
		List<Note> notelist = new ArrayList<>();
		NoteUser noteuser = new NoteUser();
		if (userId != null && noteId != 0) {
			try {
				noteuser = noteRepository.findById(userId).get();
			} catch (NoSuchElementException e) {
				System.out.println("NoSuchElementException Occured");
				noteuser = null;
			}
			if (noteuser != null) {
				notelist = noteuser.getNotes();
				for (Note note : notelist) {
					if (noteId == note.getNoteId()) {
						resultnote = note;
					}
				}
			} else {
				throw new NoteNotFoundExeption("Note Not Found");
			}
		}
		return resultnote;
	}
	/*
	 * This method should be used to get all notes with specific userId.
	 */
	public List<Note> getAllNoteByUserId(String userId) {
		List<Note> noteslist = new ArrayList<>();
		NoteUser noteuser = new NoteUser();
		if (userId != null) {
			try {
				noteuser = noteRepository.findById(userId).get();
			} catch (NoSuchElementException e) {
				System.out.println("NoSuchElementException Occured");
				noteuser = null;
			}
			if (noteuser != null) {
				noteslist = noteuser.getNotes();
			}
		}
		return noteslist;
	}
}