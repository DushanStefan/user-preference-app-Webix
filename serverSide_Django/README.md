pip install djangorestframework
pip install djangorestframework-simplejwt
python -m pip install Django

<!-- del db.sqlite3 -->

python manage.py migrate

python manage.py runserver

Testing the Register Endpoint (POST /api/accounts/register/)

1. Open Postman
   Set Method to POST

Enter the URL:

http://127.0.0.1:8000/api/accounts/register/
Go to the Body tab → Select raw → Change type to JSON

Enter the following JSON:

{
"username": "testuser",
"email": "test@example.com",
"password": "testpassword123",
"full_name": "jason mike"
}

Click Send

Expected Response (201 Created):

{
"message": "User registered successfully"
}

Testing the Login Endpoint (POST /api/accounts/login/)

1. Open Postman
   Set Method to POST

Enter the URL:

http://127.0.0.1:8000/api/accounts/login/
Go to Body → Select raw → Change type to JSON

Enter:

{
"username": "testuser",
"password": "testpassword123"
}

Click Send

Expected Response (200 OK):

{
'message': 'Login successful',
"refresh": "your_refresh_token_here",
"access": "your_access_token_here"
}

2. Get Account Details
   Request Type: GET
   URL: http://127.0.0.1:8000/api/account_details/
   Authorization: Add the access token from the login response to the Authorization tab in Postman:

Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQzNDA1NTQyLCJpYXQiOjE3NDM0MDQwNDIsImp0aSI6ImRmYjU3YzIwMDU4YTQ0NTViMjdkNjc0NjJhMGExMjhlIiwidXNlcl9pZCI6MX0.1If7_1A1HLX1IljcE9aH2822YkCeKXMxraxsAtFNuW8

Response Example:

{
"full_name": "jason mike",
"username": "testuser",
"password": "testpassword123",
"email": "test@example.com"
}

3. Update Full Name
   Request Type: POST
   URL: http://127.0.0.1:8000/api/update_full_name/
   Authorization: Add the same access token from the login response as a Bearer Token.

Request Body:

{
"full_name": "john doe"
}

Response Example:

{
"message": "Full name updated successfully"
}
To verify:
You can now call the account_details endpoint again to see if the full name is updated.

4. Update Username
   Request Type: POST
   URL: http://127.0.0.1:8000/api/update_username/
   Authorization: Add the same access token from the login response as a Bearer Token.

Request Body:
{
"username": "newusername"
}

Response Example:
{
"message": "Username updated successfully"
}
To verify:
Call the account_details endpoint again to verify the username has been updated.

5. Update Email
   Request Type: POST
   URL: http://127.0.0.1:8000/api/update_email/
   Authorization: Add the same access token from the login response as a Bearer Token.

Request Body:
{
"email": "newemail@example.com"
}

Response Example:

{
"message": "Email updated successfully"
}

To verify:
Call the account_details endpoint again to verify the email has been updated.

6. Update Password
   Request Type: POST
   URL: http://127.0.0.1:8000/api/update_password/
   Authorization: Add the same access token from the login response as a Bearer Token.

Request Body:
{
"new_password": "newpassword123"
}

Response Example:
{
"message": "Password updated successfully"
}
To verify:
You can attempt to log in with the new password to ensure the password update worked:

URL: http://127.0.0.1:8000/api/login/

Body:
{
"username": "newusername",
"password": "newpassword123"
}
You should get a successful login response with a new access token.

python -m http.server
