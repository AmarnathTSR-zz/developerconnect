Need a website with Angular 5 front end + NODE JS back end server code.

(Angular 5 WITH nodejs API backend code with MongoDB / MySQL)

Requirements:

---

1. Login logout components.

2. JSON WEB Token type autentication.

3. Two type of user (admin and user).

Admin:

---

When admin logs in to the login portal,

1. he should able to add user, edit user, remove user, change user password. – Completed

a) Add user -POST (http://139.59.76.24:5000/api/users/register)

b) Edit user - POST (http://139.59.76.24:5000/api/users/edit)

c) Remove User - POST (http://139.59.76.24:5000/api/users)

d) Change Password - POST (http://139.59.76.24:5000/api/users/password)

2. admin can edit his personal information – Completed

edit his personal information – POST ( http://139.59.76.24:5000/api/profile )

user:

---

When User logs in to the portal,

1. he should able to edit his personal information – Completed

User Edit personal info – POST - ( http://139.59.76.24:5000/api/profile )

Constraints :

---

1. Must use angular redux/redux routes concepts.

2. Basic Clean UI.

3. Code should be clean.

## Documentation ----------------------------------------------------------------

Creating Rest API using Node.js , Express and MongoDB for my interview purpose

I have deploy production environment in digitalocean server IP address http://139.59.76.24:5000 for interview purpose.

Below i have created two routes. one is for user registration and Login and another one for create, update, access current user profile and access all user profile and then delete the current login users

## Admin and user roles updated

## Admin Login

email: tsr.amarnath@gmail.com
password:1234567890

## Kindly use the postman to check my rest API

## ADMIN ------------------------------------------------------------------------------------

1. he should able to add user, edit user, remove user, change user password. – Completed

## a) Add user by admin - POST METHOD

http://localhost:5000/api/users/register

Method : POST

Require Fields

IN HEADER

Authorization : Use above admin login's Bearer token (this token getting from login)

IN BODY

name, email, password

Production URL: http://139.59.76.24:5000/api/users/register

## b) EDIT user by admin - POST METHOD

http://localhost:5000/api/users/edit

Method : POST

Require Fields

IN HEADER

Authorization : Use above admin login's Bearer token (this token getting from login)

IN BODY

id, handle, company, website, location, bio, githubusername

Production URL: http://139.59.76.24:5000/api/users/edit

## c) admin can delete the user

http://localhost:5000/api/users

Method : DELETE

Require Fields

IN HEADER

Authorization : Use above admin login Bearer token (this token getting from login)

IN BODY

id - (user id which you want to delete the user)

Production URL: http://139.59.76.24:5000/api/users

## d) RESET USER PASSWORD by admin - POST METHOD

http://localhost:5000/api/users/password

Method : POST

Require Fields

IN HEADER

Authorization : Use above admin login's Bearer token (this token getting from login)

IN BODY

id, password

Production URL: http://139.59.76.24:5000/api/users/password

## 2) admin can edit his personal information

http://localhost:5000/api/profile

Method : POST

Require Fields

IN HEADER

Authorization : Bearer token (this token getting from login)

IN BODY

handle, company, website, location, bio, githubusername

Production URL: http://139.59.76.24:5000/api/profile

## Users ----------------------------------------------------------------------------------------

## Login Existing User API

http://localhost:5000/api/users/login

Method : POST

Require Fields

IN BODY

email, password

Production URL: http://139.59.76.24:5000/api/users/login

## a) Create & Update Profile for current login user

http://localhost:5000/api/profile

Method : POST

Require Fields

IN HEADER

Authorization : Bearer token (this token getting from login)

IN BODY

handle, company, website, location, bio, githubusername

Production URL: http://139.59.76.24:5000/api/profile

##---------------------------------- END FOR INTERVIEW -------------------------------------------

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
