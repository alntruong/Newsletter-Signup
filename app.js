const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")

const port = 3000

const app = express()

app.get("/", (req, res) => {
 res.sendFile(__dirname + "/signup.html")
})

app.listen(port, () => {
 console.log("Server is running on port 3000");
})