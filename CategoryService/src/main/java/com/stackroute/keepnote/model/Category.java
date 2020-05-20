package com.stackroute.keepnote.model;

import java.util.Date;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

/*
 * Please note that this class is annotated with @Document annotation
 * @Document identifies a domain object to be persisted to MongoDB.
 *  */

@Document
public class Category {

	/*
	 * This class should have five fields
	 * (categoryId,categoryName,categoryDescription,
	 * categoryCreatedBy,categoryCreationDate). Out of these five fields, the field
	 * categoryId should be annotated with @Id. This class should also contain the
	 * getters and setters for the fields along with the no-arg , parameterized
	 * constructor and toString method. The value of categoryCreationDate should not
	 * be accepted from the user but should be always initialized with the system
	 * date. 
	 */
	

	@Id
	private String id;
	private String categoryName;
	private String categoryDescription;
	private String categoryCreatedBy;
	private Date categoryCreationDate;
	
	
	

	public Category() {
		super();
	}

	public Category(String String, String string, String string1, Date date, String string2) {

		this.id = String;
		this.categoryName = string;
		this.categoryDescription = string1;
		this.categoryCreationDate = date;
		this.categoryCreatedBy = string2;
	}

	public void setId(String string) {

		this.id = string;
	}

	public String getId() {
		return id;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String string) {

		this.categoryName = string;
	}

	public String getCategoryDescription() {
		return categoryDescription;
	}

	public void setCategoryDescription(String string) {

		this.categoryDescription = string;
	}

	public Date getCategoryCreationDate() {
		return categoryCreationDate;
	}

	public void setCategoryCreationDate(Date date) {
		this.categoryCreationDate = date;

	}

	public String getCategoryCreatedBy() {
		return categoryCreatedBy;
	}

	public void setCategoryCreatedBy(String string) {

		this.categoryCreatedBy = string;
	}

	

	@Override
	public String toString() {
		return "Category [categoryId=" + id + ", categoryName=" + categoryName + ", categoryDescription="
				+ categoryDescription + ", categoryCreatedBy=" + categoryCreatedBy + ", categoryCreationDate="
				+ categoryCreationDate + ", notes=" + "]";
	}



}
