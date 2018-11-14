const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load input validation

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//  User model included
const User = require("../../models/User");

// include secret key

const keys = require("../../config/keys");

// @route: /api/users/register
// Desc:   Registered new user Admin only
// Access: Private

router.post(
  "/register",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // check authorization have admin user or not

    const role = req.user.role;

    // if user role is not admin throw error
    if (role != "admin") {
      res
        .status(400)
        .json({ errors: "admin only can able to  register users" });
    }

    // else user role is admin create new user

    User.findOne({
      email: req.body.email
    }).then(user => {
      if (user) {
        errors.email = "Email Already Exist";
        return res.status(404).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: 200,
          r: "pg",
          d: "mm"
        });

        const NewUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: avatar
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              console.log(err);
            }
            NewUser.password = hash;
            NewUser.save()
              .then(user => {
                res.json(user);
              })
              .catch(err => {
                console.log(err);
              });
          });
        });
      }
    });
  }
);

// @route: /api/users/login
// Desc:   Login user
// Access: Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({
    email
  }).then(user => {
    //check the user available or not
    if (!user) {
      errors.email = "User Not found";
      return res.status(404).json(errors);
    }

    // compare given password with password in database using bcrypt

    bcrypt.compare(password, user.password).then(isMatch => {
      // checking password is match
      if (isMatch) {
        // Password is match user login success and generate token

        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role
        };

        jwt.sign(
          payload,
          keys.secretOrkey,
          {
            expiresIn: 3600
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password is invalid";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route: /api/users/current
// Desc:   getting current users
// Access: Private

router.post(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    });
  }
);

module.exports = router;
