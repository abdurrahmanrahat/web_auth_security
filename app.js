const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user.model");
// const md5 = require("md5"); // for encryption.
const bcrypt = require("bcrypt");
const saltRounds = 10;

const port = process.env.PORT || 5000;
const app = express();
const dbUrl = process.env.DB_URL;

// connect with database
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Database atlas connected.");
  })
  .catch((err) => {
    console.log("Database Error", err);
    process.exit(1); // exit from the database
  });

app.use(cors());
app.use(express.urlencoded({ extended: true })); // for receiving body data.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

// register user route
app.post("/register", async (req, res) => {
  const user = req.body;

  try {
    const { email, password } = req.body;

    // use bcrypt npm to encryption, password secure.
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const newUser = new User({
        email,
        password: hash,
      });
      await newUser.save();
      res.status(201).json(newUser);
    });
  } catch (error) {
    res.status(500).json(error.message);
  }

  //   res.status(201).json({ email, password });
});

// login user route
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const existUser = await User.findOne({ email: email });

    if (existUser) {
      // Load hash from your password DB.
      bcrypt.compare(password, existUser.password, (err, result) => {
        if (result) {
          res.status(200).json({ status: "valid user" }); // we can send user to different page.
        }
      });
    } else {
      res.status(404).json({ status: "User not found." });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }

  //   res.status(200).json({ message: "user is login." });
});

// route not found error
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found.",
  });
});

// handling server error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "route not found.",
  });
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
