const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/user.model");

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
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }

  //   res.status(201).json({ email, password });
});

// login user route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email: email });

    if (existUser && existUser.password === password) {
      res.status(200).json({ status: "valid user" }); // we can send user to different page.
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
