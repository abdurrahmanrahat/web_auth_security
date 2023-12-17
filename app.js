const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true })); // for receiving body data.
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running")
})

app.listen(port, () => {
    console.log(`Server is running on PORT: ${port}`);
})