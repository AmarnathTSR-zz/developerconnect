const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Load input validation

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load Validation
const validateProfileInput = require("../../validation/profile");

//  User model included
// Load Profile Model
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// include secret key

const keys = require("../../config/keys");

// Admin control -------------------------------------------------------------

// TASK No - 1 (Admin Can Add User)

// @route: /api/users/register
// Desc:   Registered new user Admin only
// Access:  Private -(ADMIN ONLY)

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

// Admin control -------------------------------------------------------------

// TASK No - 1 - EDIT USER (Admin Can Edit any user details)

// @route: /api/users/edit
// Desc:   EDIT USER BY GIVE ID
// Access: Private -(ADMIN ONLY)

router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
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

    // else user role is admin means edit the user with given id

    // Get fields
    const profileFields = {};
    profileFields.user = req.body.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    Profile.findOne({ user: req.body.id }).then(profile => {
      if (profile) {
        // Update
        Profile.findOneAndUpdate(
          { user: req.body.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create

        // Check if handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            res.status(400).json(errors);
          }

          // Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

// Admin control -------------------------------------------------------------

// TASK No - 1 - CHANGE PASSWORD (Admin Can Add User)

// @route: /api/users/register
// Desc:   Registered new user Admin only
// Access:  Private -(ADMIN ONLY)

router.post(
  "/password",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    const errors = {};

    // check authorization have admin user or not

    const role = req.user.role;

    // if user role is not admin throw error
    if (role != "admin") {
      res
        .status(400)
        .json({ errors: "admin only can able to  reset users password" });
    }

    // else user role is admin create new user

    User.findById({
      _id: req.body.id
    }).then(user => {
      if (!user) {
        errors.id = "User Does not exist";
        return res.status(404).json(errors);
      } else {
        const userFields = {};
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              console.log(err);
            }
            userFields.password = hash;
            // Update
            User.findOneAndUpdate(
              { id: req.body.id },
              { $set: userFields },
              { new: true }
            ).then(password =>
              res.json({ message: "password change success" })
            );
          });
        });
      }
    });
  }
);

// Admin control -------------------------------------------------------------

// TASK No - 1 - DELETE USER (Admin Can Delete User)

// @route   DELETE api/users
// @desc    DELETE USER AND PROFILE BY GIVEN ID
// @access   Private -(ADMIN ONLY)

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // check authorization have admin user or not

    const role = req.user.role;

    // if user role is not admin throw error
    if (role != "admin") {
      res
        .status(400)
        .json({ errors: "admin only can able to  register users" });
    }
    Profile.findOneAndRemove({ user: req.body.id }).then(() => {
      User.findOneAndRemove({ _id: req.body.id }).then(() =>
        res.json({ success: true })
      );
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
