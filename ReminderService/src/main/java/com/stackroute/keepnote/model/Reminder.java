package com.stackroute.keepnote.model;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/*
 * Please note that this class is annotated with @Document annotation
 * @Document identifies a domain object to be persisted to MongoDB.
 *  */
@Document
public class Reminder {

	/*
	 * This class should have six fields
	 * (reminderId,reminderName,reminderDescription,reminderType,
	 * reminderCreatedBy,reminderCreationDate). Out of these six fields, the field
	 * reminderId should be annotated with @Id. This class should also contain the
	 * getters and setters for the fields along with the no-arg , parameterized
	 * constructor and toString method. The value of reminderCreationDate should not
	 * be accepted from the user but should be always initialized with the system
	 * date.
	 */
	@Id
	private String reminderId;
	private String reminderName;
	private String reminderDescription;
	private String reminderType;
	private String reminderCreatedBy;
	private Date reminderCreationDate;
	
	
	
	
	public Reminder() {
		super();
	}

	public Reminder(String String, String string, String string1, String string2, String string3, 
			Date date) {
		this.reminderId = String;
		this.reminderName = string;
		this.reminderDescription = string1;
		this.reminderType = string2;
		this.reminderCreatedBy = string3;
		this.reminderCreationDate = date;
	}

	public String getReminderId() {
		return reminderId;

	}

	public void setReminderId(String String) {

		this.reminderId = String;
	}

	public String getReminderName() {
		return reminderName;
	}

	public void setReminderName(String string) {

		this.reminderName = string;
	}

	public String getReminderDescription() {
		return reminderDescription;
	}

	public void setReminderDescription(String string) {
		this.reminderDescription = string;

	}

	public String getReminderType() {
		return reminderType;
	}

	public void setReminderType(String string) {

		this.reminderType = string;
	}

	public Date getReminderCreationDate() {
		return reminderCreationDate;
	}

	public void setReminderCreationDate(Date date) {

		this.reminderCreationDate = date;
	}

	public String getReminderCreatedBy() {
		return reminderCreatedBy;
	}

	public void setReminderCreatedBy(String string) {

		this.reminderCreatedBy = string;
	}

	

	@Override
	public String toString() {
		return "Reminder [reminderId=" + reminderId + ", reminderName=" + reminderName + ", reminderDescription="
				+ reminderDescription + ", reminderType=" + reminderType + ", reminderCreatedBy=" + reminderCreatedBy
				+ ", reminderCreationDate=" + reminderCreationDate +  "]";
	}
}
