Rest API

## User Route RestAPI

## Register New User API

http://localhost:5000/api/users/register

Method : POST

Require Fields

IN BODY

name, email, password

Production URL: http://139.59.76.24:5000/api/users/register

## Login Existing User API

http://localhost:5000/api/users/login

Method : POST

Require Fields

IN BODY

email, password

Production URL: http://139.59.76.24:5000/api/users/login

## Getting Current Login User using Bearer Token Authorisation

http://localhost:5000/api/users/current

Method : POST

Require Fields

IN HEADER

Authorization : Bearer token (this token getting from login)

Production URL: http://139.59.76.24:5000/api/users/current

## Profile Route RestAPI

## Get current current user profile

http://localhost:5000/api/profile

Method : GET

Require Fields

IN HEADER

Authorization : Bearer token (this token getting from login)

Production URL: http://139.59.76.24:5000/api/profile

## Create & Update Profile for current login user

http://localhost:5000/api/profile

Method : POST

Require Fields

IN HEADER

Authorization : Bearer token (this token getting from login)

IN BODY

handle, company, website, location, bio, githubusername

Production URL: http://139.59.76.24:5000/api/profile

## Get All user profile

http://localhost:5000/api/profile/user/:user_id

Method : GET

Production URL: http://139.59.76.24:5000/api/profile/all

## Get user profile using handle

http://localhost:5000/api/profile/handle/:handle

Method : GET

Production URL: http://139.59.76.24:5000/api/profile/handle/amarnath

## Get user profile using user_id

http://localhost:5000/api/profile/user/:user_id

Method : GET

Production URL: http://139.59.76.24:5000/api/profile/user/5beaef46698c993f055f60c3

## Delete current Login user profile

http://localhost:5000/api/profile

Method : DELETE

Require Fields

IN HEADER

Authorization : Bearer token (this token getting from login)

Production URL: http://139.59.76.24:5000/api/profile
