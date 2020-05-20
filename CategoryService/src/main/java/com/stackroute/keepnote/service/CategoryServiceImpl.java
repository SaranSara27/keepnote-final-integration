package com.stackroute.keepnote.service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.stackroute.keepnote.exception.CategoryDoesNoteExistsException;
import com.stackroute.keepnote.exception.CategoryNotCreatedException;
import com.stackroute.keepnote.exception.CategoryNotFoundException;
import com.stackroute.keepnote.model.Category;
import com.stackroute.keepnote.repository.CategoryRepository;

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
public class CategoryServiceImpl implements CategoryService {


	private CategoryRepository categoryRepository;

	public CategoryServiceImpl(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	public Category createCategory(Category category) throws CategoryNotCreatedException {
		category.setCategoryCreationDate(new Date());
		Category categoryValue = categoryRepository.insert(category);
		if (categoryValue == null) {
			throw new CategoryNotCreatedException("category is not created exception");
		} else {
			return categoryValue;
		}
	}

	/*
	 * This method should be used to delete an existing category.Call the
	 * corresponding method of Respository interface.
	 */
	public boolean deleteCategory(String categoryId) throws CategoryDoesNoteExistsException {
		categoryRepository.deleteById(categoryId);
		return true;
		
	}

	/*
	 * This method should be used to update a existing category.Call the
	 * corresponding method of Respository interface.
	 */
	public Category updateCategory(Category category, String categoryId) {

		try {
			Category category1 = getCategoryById(categoryId);
			if (category1.getId() == category.getId()) {
				categoryRepository.save(category);
			}
		} catch (CategoryNotFoundException e) {
			e.printStackTrace();
		}

		return category;
	}

	public Category getCategoryById(String categoryId) throws CategoryNotFoundException {
		Category Category = new Category();
		try {
			Category = categoryRepository.findById(categoryId).get();
		} catch (NoSuchElementException e) {
			System.out.println("NoSuchElementException");
			Category = null;
		}
		if (Category == null) {
			throw new CategoryNotFoundException("CategoryNotFoundException");
		} else {
			return Category;
		}

	}

	public List<Category> getAllCategoryByUserId(String userId) {

		List<Category> categories = categoryRepository.findAllCategoryByCategoryCreatedBy(userId);
		return categories;
	}


}
