//Express provides methods to specify what function is called for a particular HTTP verb (GET, POST, SET, etc) and ULR pattern("Route"), and methods to specify what template ("view") engine is used, where template files are located, and what template to use to render a response.
//Express is a node js web application framework that provides broad features for building web and mobile applications. It is used to build singe/multipage and hybrid web application. 
const express = require("express");
const bodyParser = require("body-parser");

//What is the difference between request and http modules in node.js?
//The http package contains support for the raw HTTP protocol. While it can do everythingn, often it's a bit clumsy to use.
//The request module uses the http module and adds a lot of sugar too make it easier to digest: A lot of common cases can be handled with just a tiny but of code, it supports piping request data, forwarding requests to a different server, etc. 

//request is designed to be one of the simplest way possible to make http calls.
const request = require("request");

//requiring https allows you to make a request to a secure web server. 
const https = require("https");

//process.env.PORT is defined by heroku
//by including || we can both work simultaneously with heroku and our local server
const port = process.env.PORT || 3000;

const app = express();

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
 const firstName = req.body.fName;
 const lastName = req.body.lName;
 const email = req.body.email;
 
 //Mailchimp list, also known as your audience, is where you store and mangage all of your contacts.

 //Batch subscribe or unsubscribe list memmbers.

 //doing this allows us to group our data into a single variable 
 const data = {
  members: [
   {
    //email_address is the default naming property for email, with email being my declared variable. 
    email_address: email,

    //status is also the default naming property, with subscribed being one of the 5 strings options. 
    status: "subscribed",
    //merge fields allow you to save custom information about contacts.
    merge_fields: {
     //FNAME & LNAME are some of the preset names which can be modified.
     //firstName & lastName are my declared variables
     FNAME: firstName,
     LNAME: lastName
    }
   }
  ]
 }; 

 const jsonData = JSON.stringify(data);

 const url = "https://us10.api.mailchimp.com/3.0/lists/d8f9d5d4be"

 //look more into this
 const options = {
  method:"POST",
  auth: "alant1:a25e568b777cfbed730daff477a072b5-us10"
 }

 //$_GET: catches the data which is sent using GET method.
 //$_REQUEST: catches the data which is sent using both POST & GET methods.
 const request = https.request(url, options, response => {

  if (response.statusCode === 200) {
   res.sendFile(__dirname + "/success.html");
  } else {
   res.sendFile(__dirname + "/failure.html");
  }

  response.on("data", function(data){
   console.log(JSON.parse(data));
  })
 });

 request.write(jsonData);
 request.end();

});

app.post("/failure", (req, res) => {
 res.redirect("/")
})

app.listen(port, () => {
 console.log("Server is running on port 3000");
});

//API Key
//a25e568b777cfbed730daff477a072b5-us10

//List ID
//d8f9d5d4be