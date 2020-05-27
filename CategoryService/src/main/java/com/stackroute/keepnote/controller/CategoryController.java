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
import com.stackroute.keepnote.exception.CategoryDoesNoteExistsException;
import com.stackroute.keepnote.exception.CategoryNotCreatedException;
import com.stackroute.keepnote.exception.CategoryNotFoundException;
import com.stackroute.keepnote.model.Category;
import com.stackroute.keepnote.service.CategoryService;
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
public class CategoryController {
	/*
	 * Autowiring should be implemented for the CategoryService. (Use
	 * Constructor-based autowiring) Please note that we should not create any
	 * object using the new keyword
	 */
	
	CategoryService categoryService;
	@Autowired
	public CategoryController(CategoryService categoryService) {
		
		this.categoryService=categoryService;
	}
	
	@GetMapping("/")
    public String swaggerUi() {
        return "redirect:/swagger-ui.html";
    }
	
	/*
	 * Define a handler method which will create a category by reading the
	 * Serialized category object from request body and save the category in
	 * database. Please note that the careatorId has to be unique.This
	 * handler method should return any one of the status messages basis on
	 * different situations: 
	 * 1. 201(CREATED - In case of successful creation of the category
	 * 2. 409(CONFLICT) - In case of duplicate categoryId
	 *
	 * 
	 * This handler method should map to the URL "/api/v1/category" using HTTP POST
	 * method".
	 */
	@ApiOperation(value="CreateCategory")
	@PostMapping(value="/api/v1/category")
	public ResponseEntity<Category> createCategory(@RequestBody Category category) {
		
		
			Category c=null;
			try {
				c = categoryService.createCategory(category);
			} catch (CategoryNotCreatedException e) {
				e.printStackTrace();
			}
			 if(c!=null) {                        
                 return new ResponseEntity<Category>(category,HttpStatus.CREATED);
             }else {
                 return new ResponseEntity<Category>(HttpStatus.CONFLICT);
             }
			 
	}
	
	/*
	 * Define a handler method which will delete a category from a database.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the category deleted successfully from
	 * database. 2. 404(NOT FOUND) - If the category with specified categoryId is
	 * not found. 
	 * 
	 * This handler method should map to the URL "/api/v1/category/{id}" using HTTP Delete
	 * method" where "id" should be replaced by a valid categoryId without {}
	 */
	@ApiOperation(value="DeleteCategory")
	@DeleteMapping(value = "/api/v1/category/{id}")
	public ResponseEntity<Category> deleteCategory(@PathVariable String id) {
		
	
		boolean flag=false;
		try {
			flag = categoryService.deleteCategory(id);
		} catch (CategoryDoesNoteExistsException e) {
			e.printStackTrace();
		}
		 if(flag) {                        
	         return new ResponseEntity<Category>(HttpStatus.OK);
	     }else {
	         return new ResponseEntity<Category>(HttpStatus.NOT_FOUND);
	     } 
	
	}
	
	/*
	 * Define a handler method which will update a specific category by reading the
	 * Serialized object from request body and save the updated category details in
	 * database. This handler method should return any one of the status
	 * messages basis on different situations: 1. 200(OK) - If the category updated
	 * successfully. 2. 404(NOT FOUND) - If the category with specified categoryId
	 * is not found. 
	 * This handler method should map to the URL "/api/v1/category/{id}" using HTTP PUT
	 * method.
	 */
	@ApiOperation(value="UpdateCategory")
	@PutMapping("/api/v1/category/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("id") String id ,@RequestBody Category category) {
			
            Category categoryUpdate = categoryService.updateCategory(category, id);
            if (categoryUpdate != null)
                return new ResponseEntity<Category>(category, HttpStatus.OK);
            else
                return new ResponseEntity<Category>(HttpStatus.CONFLICT);
            
    }
	
	/*
	 * Define a handler method which will get us the category by a userId.
	 * 
	 * This handler method should return any one of the status messages basis on
	 * different situations: 1. 200(OK) - If the category found successfully. 
	 * 
	 * 
	 * This handler method should map to the URL "/api/v1/category" using HTTP GET method
	 */
	
	@ApiOperation(value="Get categoryById ")
	@GetMapping("/api/v1/category/{id}")
    public ResponseEntity<Category> categoryById(@PathVariable("id") String id) {
        
        
         Category category=null;
		try {
			category = categoryService.getCategoryById(id);
		} catch (CategoryNotFoundException e) {
			e.printStackTrace();
		}
		if(category!=null) {
			return new ResponseEntity<Category>(category,HttpStatus.OK);
		}
        
		else {
			 return new ResponseEntity<Category>( HttpStatus.NOT_FOUND);
		}
    }
	
	@GetMapping("/api/v1/category/user/{userId}")
	public ResponseEntity<List<Category>> getCategoryByUser(@PathVariable("userId") String userId) {
		ResponseEntity<List<Category>> result = null;
		List<Category> category = categoryService.getAllCategoryByUserId(userId);
		if (category == null) {
			return new ResponseEntity<List<Category>>(HttpStatus.NOT_FOUND);
		}
		result = new ResponseEntity<List<Category>>(category, HttpStatus.OK);
		return result;
	}
}