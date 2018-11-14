Creating Rest API using Node.js , Express and MongoDB for my interview purpose

I have deploy production environment in digitalocean server IP address http://139.59.76.24:5000 for interview purpose.

Below i have created two routes. one is for user registration and Login and another one for create, update, access current user profile and access all user profile and then delete the current login users

## Admin and user roles updated

## Admin Login

email: tsr.amarnath@gmail.com
password:1234567890

## Kindly use the postman to check my rest API

## User Route RestAPI

## Register New User API

http://localhost:5000/api/users/register

Method : POST

Require Fields

IN HEADER

Authorization : Use above admin login Bearer token (this token getting from login)

IN BODY

name, email, password

Production URL: http://139.59.76.24:5000/api/users/register

## only admin can delete the user

http://localhost:5000/api/users

Method : DELETE

Require Fields

IN HEADER

Authorization : Use above admin login Bearer token (this token getting from login)

IN BODY

id - (user id which you want to delete the user)

Production URL: http://139.59.76.24:5000/api/users

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

Thanks
TSR.Amarnath
www.amarnath.xyz

Thanks for providing oportunity to show my work in node js
