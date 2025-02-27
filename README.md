## Theater Ticket Booking System API 
*A REST Interface (API) For A Movie Theatre Booking System*

#### Contents
 * [Requirements](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#requirements)
 * [Steps to Set-Up](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#steps-to-set-up-the-api-at-your-location-machine)
 * [Using The API](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#using-the-api)
 * [Database Structure](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#database-structure)
 * [Logic](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#logic)
 * [Test Cases & Screenshots For All Endpoints](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#test-cases--screenshots-for-all-endpoints)
    * [Adding A New User](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#1-adding-new-user)
    * [Book A Ticket : Endpoint-1](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#2-book-a-ticket-endpoint---1)
    * [Update A Ticket : Endpoint-2](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#3-update-a-ticket-endpoint---2)
    * [View All Tickets For A Particular Time : Endpoint-3](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#4-view-all-tickets-for-a-particular-time-endpoint---3)
    * [Delete A Particular Ticket : Endpoint-4](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#5-delete-a-particular-ticket-endpoint---4)
    * [View User Based On Ticket Id : Endpoint-5](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#6-view-users-detail-based-on-ticket-id-endpoint---5)
    * [Max 20 Tickets For A Particular Show Date & Time : Note](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#7-maximum-20-tickets-can-be-booked-for-a-particular-time-note)
    * [Automatically Delete Expired Tickets : Plus Point](https://github.com/the-stranded-alien/TTBS/blob/master/README.md#8-automatically-delete-expired-8-hours-old-tickets)

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
   
![Database Set-Up Help](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/SettingUpDatabase.png)

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

### Logic (For Some Important Methods)
1. Booking a Ticket
   1. Check whether the user is registered or not, if Yes fetch his 'user_id' and move to Step-2, else send error message that user is not registered.
   2. Check whether the show exists, if Yes, increase count in 'Show Details' else create a new show with ticket_count as 1.
   3. Also check for limit of 20 tickets per show, if ticket_count >= 20 return error message that show is already full, else ticket can be booked.
   4. If everything is fine add the ticket to 'Tickets Sold' with date, time, and user_id. 
   
2. Update a Ticket Time
   1. If ticket_id exists, check if the Time & Date are valid. If yes continue to Step-2 else, send error message.
   2. Check if tickets for that show are available, if so update Time & Date in 'Ticket Sold'.
   3. Also adjust the ticket_count accordingly in show_details. 

3. Auto-Delete 8 or More Hours Old Ticket's Information
   1. Check at every hour (At times like HH:00:00) using a Scheduled Job.
   2. If current hour (HH) is 8 Hours ahead of our 4 show times (12:00, 15:00, 18:00, 21:00) i.e. it have values (20:00, 23:00, 02:00, 05:00), delete enteries from database keeping in mind the current date.

### Test Cases & Screenshots For All Endpoints
**Few Test Cases Covering Various Methods & Situations Are Shown Below With Help Of Screenshots. Covering All Possible Test Cases Would Have Created A Mess, So Picked A Few From Each Type. All Other Test Cases Have Been Kept In Mind And All Code Is Done Keeping In Mind All Possible Scenarios.**
#### 1. Adding New User

* Added new user with name 'Sahil' & phone number 7249999056.
![Adding First User](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/Adding_New_User.png)

* Added two more new users.
![Adding Two More Users](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/After_Adding_2_More_Users.png)

#### 2. Book a Ticket (Endpoint - 1)

* Booking The First Ticket
![Booking First Ticket](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/Booking_First_Ticket.png)

* Booking Few More Tickets
![Booking Few More Tickets](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/Booking_Few_More.png)

* Booking Ticket With A Date From Past (Error Message Shown)
![Invalid Booking - Wrong Date](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/Invalid_Booking_Past.png)

* Booking Ticket With A Wrong Show Time (Error Message Shown)
![Invalid Booking - Wrong Time](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/Invalid_Booking_WrongTime.png)

* Booking Ticket With Unregistered User (Error Message Shown)
![Invalid Booking - Unregistered User](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/Invalid_Booking_Reg.png)

#### 3. Update a Ticket (Endpoint - 2)

* Updating A Ticket (Query Made & Output Screen Before Refreshing) [**Time & Date For Ticket With Id 2 Changed**]
![Update Before Refresh](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/Update_Before_Refresh.png)

* Updating A Ticket (Query Made & Output Screen After Refreshing) [**Time & Date For Ticket With Id 2 Changed**]
![Update After Refresh](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/Update_After_Refresh.png)

* Updating A Ticket (Query Made & Output Screen After Refreshing) [**Time & Date For Ticket With Id 3 Changed**]
![Another Update](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/Another_Update.png)

#### 4. View All Tickets For a Particular Time (Endpoint - 3)

* Out Of All Tickets (Shown On Left - Browser) Only Ticket With Given Date & Time In Request Is Visible In Postman Body.
![View Tickets](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/View_Tickets.png)

#### 5. Delete a Particular Ticket (Endpoint - 4)

* Deleting Ticket With Id 2 (Left Window Before Refreshing)
![Delete Before Refresh](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/Delete_Before_Refresh.png)

* Deleting Ticket With Id 2 (Left Window After Refreshing)
![Delete After Refresh](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/Delete_After_Refresh.png)

#### 6. View User's Detail Based On Ticket Id (Endpoint - 5)

* Viewing User Information For Ticket Id 3 (Shown In Postman Body)
![View User](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/View_User.png)

#### 7. Maximum 20 Tickets Can Be Booked For a Particular Time (Note)

* 20 Tickets Already Existed For Show At 15:00 On 2020-08-31
![Max Before](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/Max_20_Before.png)

* So Making Another Booking For That Slot, Gave A Error Visible In Postman Window
![Max After](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/Max_20_After.png)

#### 8. Automatically Delete Expired (8 Hours Old) Tickets

*Although We Are Deleting Automatically At Exactly Time Difference Of 08:00:00 But For The Purpose Of Taking Screenshots We Have Changed Auto-Delete Time Difference To 08:40:00 For A While.*

* At 05:39, Ticket Ids 23, 24, 25 Exists In All Tickets Table. Show Date : 2020-08-30 & Time : 21:00.
![Auto-Delete Before](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/Auto_Delete_Before.png)

* According To Time Difference Of 08:40:00 (Only Taken To Ease Up Screenshoting Time) Tickets Of 21:00 on 30th Aug Should Be Deleted At 31st Aug 05:40. And At Exact 05:40, Ticket With Ids 23, 24, 25 Got Deleted Automatically. (Focus On Bottom-Right For Clock)
![Auto-Delete After](https://github.com/the-stranded-alien/TTBS/blob/master/Screenshots/Auto_Delete_After.png)
