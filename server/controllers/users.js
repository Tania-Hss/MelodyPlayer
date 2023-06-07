const express = require("express");
const bcrypt = require("bcrypt");

const { getAllUsers, createUser, getUserByEmail } = require("../models/user");

const router = express.Router();

router.get("/users", (req, res) => {
  return getAllUsers()
    .then((result) => res.json(result))
    .catch((error) => {
      console.error(error);
    });
});

router.post("/users", (req, res, next) => {
  console.log("started createUser");
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    const customError = new Error(
      "Name, email and password fields are required"
    );
    customError.status = 400;
    return next(customError);
  }

  if (password.length < 8) {
    const customError = new Error(
      "Password must be at least 8 characters long"
    );
    customError.status = 400;
    return next(customError);
  }

  if (
    !/[a-z]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/\d/.test(password) ||
    !/[!@#$%^&*]/.test(password)
  ) {
    const customError = new Error(
      "Password must contain at least one uppercase and lowecase letter, a number and one special character."
    );
    customError.status = 400;
    return next(customError);
  }

  console.log("recieved body :", { username, email, password });

  return getUserByEmail(email)
    .then((user) => {
      if (user) {
        const customError = new Error("Email already exists");
        customError.status = 409;
        next(customError);
      } else {
        const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        return createUser(username, email, passwordHash)
          .then((result) => {
            console.log(result);
            res.status(201).json({
              id: result.id,
              username,
              email,
            });
          })
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
