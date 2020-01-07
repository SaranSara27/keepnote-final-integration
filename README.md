
# KeepNote Application - Final Integration

## Problem Statement

Build the KeepNote application with Angular as the frontend using APIs developed through Spring Boot.
Angular Step 3 and Spring step 6 code can be reused and enhanced for this Step.


## Requirements:

1. On launching the application the user should get the login page. The login page should have a link for registration using which the user should be able to register. On successful registration the user should be taken to the login page. Upon login, the user should be taken to the Note Dashboard page.
    - Proper navigation links for all the pages should be available within pages.
    - Error handling should be implemented across pages. Appropriate messages should be displayed for the same. Success messages should be displayed for all the create,update and Delete operations
    - Logout feature should be implemented.

2. User can create,view,update and delete Note in the Note Dashboard page
    - User should be able to add notes with and without categories and reminders

3. A page to perform CRUD operations for Categories should be provided
    - Deleting categories should remove categories from the Notes,if associated

4. A page to perform CRUD operation for Reminders should be provided
    - Deleting categories should remove Reminders from the Notes,if associated

5. Application should be responsive.

6. Angular material should be used for the UI

7. Unit Tests should be created for the Components and Services (Angular)

8. E2E scripts using protractor should be created for the new functional flows and modified / enhanced for the existing flows.

9. Implement CI - continuous Integration ( use .gitlab-ci.yml)

10. Dockerize the frontend and Backend (create/reuse dockerfile, docker-compose.yml and get it executed through docker compose)

### Note: 

Completed Code should be checkedin to a **NEW**  gitlab repo and shared with the mentor before the Final demo (UI and code walkthrough). You should **NOT** push your final code into the existing Angular step3 and Spring step 6 repos.


