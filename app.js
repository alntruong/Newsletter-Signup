const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")

const port = 3000

const app = express()

//our image and css did not appear because they are stored in a local location, making them a static page.
//in order for our server to serve up static file(s), then we need to use a special function of express called static.
//app.use(express.static("name_of_folder")) provides the path of our static file(s).
//the path of the file(s) should be relative to the folder created (public).
app.use(express.static("public"));

//standard setting to enable body-parser
app.use(bodyParser.urlencoded({extended: true}));

//app.get is when the user request to GET the homepage, which in this case, sends back signup.html
app.get("/", (req, res) => {
 res.sendFile(__dirname + "/signup.html")
})

//app.post is set up so that when the user requests to POST data, the server can go retrieve that data
app.post("/", (req,res) => {
 //the app utilizes body-parser to identify the location of the data
 var firstName = req.body.fName;
 var lastName = req.body.lName;
 var email = req.body.email;
 console.log(firstName, lastName, email);
})

app.listen(port, () => {
 console.log("Server is running on port 3000");
})

