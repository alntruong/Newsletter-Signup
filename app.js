const express = require("express")

const bodyParser = require("body-parser")

const port = 3000

const app = express()

app.get("/", (req, res) => {
 res.sendFile(__dirname + "/signup.html")
})

app.listen(port, () => {
 console.log("server is running on port 3000");
})