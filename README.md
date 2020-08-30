## Theater Ticket Booking System API 
*A REST Interface (API) For A Movie Theatre Booking System*

#### Contents
 * [Requirements](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#requirements)
 * [Steps to Set-Up](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#steps-to-set-up-the-api-at-your-location-machine)
 * [Using The API](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#using-the-api)
 * [Database Structure](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#database-structure)
 * [Logic]()
 * [Test Cases & Screenshots For All Endpoints]()

### Requirements
This API is built using Node.js & it uses MySQL as the database. Requirements are as follows :
* Node.js (Version: 12.16.3 or higher)
* npm (Version: 6.14.4 or higher)
* MySQL Server (Version: 8.0.21 or higher)

### Steps to Set-Up the API (At Your Location Machine)
 1. Setting up the MySQL database.
   * After logging into MySQL using shell, create database by writting: CREATE DATABASE ttbs_db;
   * Create a New User by writting: CREATE USER ttbs IDENTIFIED BY 'ttbs_password';
   * Use database ttbs by writting: USE ttbs_db; 
   * Provide Privileges by writting: 
      * GRANT ALL PRIVILEGES ON ttbs_db TO ttbs;
      * GRANT ALL PRIVILEGES ON ttbs_db.* TO ttbs;
      * FLUSH PRIVILEGES;
   * Exit Shell.
 2. Saving code & downloading required packages at your system.
   * Download this repository and save the entire code at any directory.
   * Open cmd at that directory and write following:
      * npm init .
      * npm install
 3. Running the Node application.
   * Open cmd in the same directory and write:
      * node server.js
   * Your Localhost Server would be started at *http://localhost:1611/* (Given you Don't Change the PORT Number in Server.js)
 
### Using the API
**Before checking out the API Methods, note these following points**
 * *Available Show Times (**Only HH Needed**) For Any Given Date Are 12 (for 12:00), 15 (for 15:00), 18 (for 18:00), 21 (for 21:00).*
 * *You Can Book Tickets For Any Above Show Times For Any Given Date In The Future.*

*List of all methods provided by this API and the way to use each of them is as follows:*
 1. Booking a Ticket (Using a user's name, phone number, show date & time) *[ENDPOINT - 1]*
  * Route -> /book_ticket/
  * HTTP Method -> POST
  * Parameters Needed In Request Body ->
    * name  : User Name
    * phone : User Phone Number
    * time  : Show Time (Only Hour (HH) Value Like, 12, 15, 18, 21)
    * date  : Show Date (YYYY-MM-DD)
 2. Updating a Ticket Timing (Using Ticket-Id, New Show Date & New Show Time) *[ENDPOINT - 2]*
  * Route -> /update_ticket/
  * HTTP Method -> POST
  * Parameters Needed In Request Body ->
    * ticket : Ticket Id for which time needs to be updated.
    * ndate  : New Show Date (YYYY-MM-DD)
    * ntime  : New Show Time (Only Hour (HH) Value)
 3. View All the Tickets for a Particular Time (Using Show Date & Time) *[ENDPOINT - 3]*
  * Route -> /view_tickets/
  * HTTP Method -> POST
  * Parameters Needed In Request Body ->
    * date  : Show Date (YYYY-MM-DD)
    * time  : Show Time (Only Hour (HH) Value)
 4. Delete a Particular Ticket (Using Ticket Id) *[ENDPOINT - 4]*
  * Route -> /delete_ticket/
  * HTTP Method -> DELETE
  * Parameters Needed In Request Body ->
    * ticket : Ticket Id for which Ticket Needs to be Deleted.
 5. View the User's Detail Based On Ticket Id *[ENDPOINT - 5]*
  * Route -> /view_user/
  * HTTP Method -> POST
  * Parameters Needed In Request Body ->
    * ticket : Ticket Id for which User Information is Needed.
 6. Registering New User (Using User Name & Phone Number) *[Just To Add A Little Verifaction Before Letting Anyone Use The API]*
  * Route -> /new_user/
  * HTTP Method -> POST
  * Parameters Needed In Request Body ->
    * name  : User Name
    * phone : User Phone Number
 7. Show All Registered Users [Only For Testing Purpose]
  * Route -> /all_users/
  * HTTP Method -> GET
 8. Show All Booked Tickets (Shows Ticket Id, Date, Time & User Id) [Only For Testing Purpose]
  * Route -> /all_tickets/
  * HTTP Method -> GET
 9. Show All Theatre Show Details (Shows Date, Time & Tickets Sold For The Show) [Only For Testing Purpose]
  * Route -> /all_users/
  * HTTP Method -> GET
  
### Database Structure
 * Table 1 : Show Details (name -> shows)
    * Column 1 : date -> Show Date (YYYY-MM-DD)
    * Column 2 : time -> Show Time (12 for 12:00, 15 for 15:00, 18 for 18:00, 21 for 21:00)
    * Column 3 : ticket_count -> Tickets Sold For This Show
 * Table 2 : Registered Users (name -> users)
    * Column 1 : user_id -> Unique User Id
    * Column 2 : name -> User's Name
    * Column 3 : phone -> User's Phone Number 
 * Table 3 : Tickets Sold (name -> tickets)
    * Column 1 : ticket_id -> Unique Ticket Id
    * Column 2 : date -> Show Date On The Ticket
    * Column 3 : time -> Show Time On The Ticket
    * Column 4 : user_id -> user_id Of The User Who Booked This Ticket

### Logic 

### Test Cases & Screenshots For All Endpoints
