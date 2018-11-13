Rest API

## User Route RestAPI

## Register New User API

http://localhost:5000/api/users/register

Method : POST

Require Fields

IN BODY

name, email, password

## Login Existing User API

http://localhost:5000/api/users/login

Method : POST

Require Fields

IN BODY

email, password

## Getting Current Login User using Bearer Token Authorisation

http://localhost:5000/api/users/current

Method : POST

Require Fields

IN HEADER

Authorization : Bearer token (this token getting from login)

## Profile Route RestAPI

## Get current current user profile

http://localhost:5000/api/profile

Method : GET

Require Fields

IN HEADER

Authorization : Bearer token (this token getting from login)

## Create Profile for current login user

http://localhost:5000/api/profile

Method : POST

Require Fields

IN HEADER

Authorization : Bearer token (this token getting from login)

IN BODY

handle, company, website, location, bio, githubusername

## Get current current user profile using handle

http://localhost:5000/api/profile/handle/:handle

Method : GET

## Get current current user profile using user_id

http://localhost:5000/api/profile/user/:user_id

Method : GET

## Get current current user profile

http://localhost:5000/api/profile

Method : DELETE

Require Fields

IN HEADER

Authorization : Bearer token (this token getting from login)
