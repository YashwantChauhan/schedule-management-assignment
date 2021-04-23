# An API for Schedule Management

- Login, add, manage meetings.

## Tech Stack

- NodeJS, MongoDB, HTML, CSS

## API endpoints

1. GET  /     
   - Provides the home page
2. POST /api/create  
   - Creates a new user
   - Needs **username** as request's body
3. POST /api/auth 
   - **username** required as request's body
   - Checks if the user is created or not
   - If user is created and valid calls GET /api/:username
4. GET /api/:username 
   - Logs in the user to the dashboard
   - The username should be created first
   - Front-end on this displays a form to create a new meeting
5. GET /api/:username/create
   - gets automatically called if there are time clashes 
   - same as above and lets us to create a new meeting
5. POST /api/:username/create 
   - form data required : 
        1. date (yyyy-mm-dd)
        2. from (hh:mm)
        3. to (hh:mm)
        4. room (1-5)
        5. note (optional)
   -Creates new meeting if there are no clashes
6. GET /api/:username/list
    - Displays all saved meeting