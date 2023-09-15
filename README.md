# About the Task management app

This app with basic design lets the user create, edit, delete and mark tasks as completed or pending.
A task will have the following details

- Title
- Description
- Due Date
- Status
- Priority
  The task details are in a Accordion component which is inside (TaskView). Title, Due Date, Status, Checkbox to mark the status as complete or pending, Edit and Delete buttons are in Accordion Header component (TaskHeader). Task description in in Accordion body (TaskDescription).

## App flow

Once the user hits the app url, he will be redirected to Login Page (Login component). If the user is new, he will have to Register before signing in. Register component is with the name (Register). Register component is a Formik form with following fields

- Full Name
- Email
- Password (min 6 characters)
- Confirm Password
  Once the user Registers or Sign In successfully, he will be redirected to Landing page of the app (TaskManager) which has the task details inside Accordion component and the option to Add New tasks.
  On Add New and Edit tasks, user will be taken to a form page (Formik form) to add or edit the tasks (UpdateTaskForm). Once completed, he will redirect to landing page.
  There is an option to view completed tasks as well on click of a link.
  The tasks are set based on priority rankings.
  User can search for tasks based on title, status and description.

### Components

- Auth - for Login and Register
- Checkbox - to mark tasks as Complete/ Pending
- ErrorBoundary - for error handling
- Header- app Header with app name and Search option
- Loader
- TaskManager - to view the tasks, edit, add, delete, view completed tasks
- TaskDescription
- TaskHeader - title, due date, status, edit, delete
- UpdateTaskForm - to add or edit the task details

#### Packages

- React Bootstrap
- Firebase
- Formil
- i18next
- React Router Dom

##### Additional features

- User Authentication
  Implemented user authentication using a library Firebase Authentication.
  User can register, log in, and log out.
  Only authenticated users can access the task management features.
- Task Priority
  Introduced a priority level for tasks (Priority number).
  User can set the priority of each task.
- Data Persistence
  Storing task data on cloud database Firebase Firestore.
  Task data is synchronized across devices for the same user.
- Search:
  Search functionality to search for tasks by title, status, description.
- Internationalization (i18n):
  Support for couple of languages added by implementing internationalization.
