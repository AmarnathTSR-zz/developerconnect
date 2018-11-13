Rest API

## User Route RestAPI

## Register New User API

http://localhost:5000/api/users/register

Method : POST

Require Fields

name, email, password

## Login Existing User API

http://localhost:5000/api/users/login

Method : POST

Require Fields

email, password

## Getting Current Login User using Bearer Token Authorisation

http://localhost:5000/api/users/current

Method : POST

Require Fields

Authorization : Bearer token (which we get when using login)
