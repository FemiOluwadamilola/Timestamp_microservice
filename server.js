// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/1451001600000", function(req,res){
  res.json({ "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" })
})

app.get("/api/", function(req,res){
  const now = new Date();
  res.json({"unix":now.getTime(), "utc":now.toUTCString()})
})

app.get("/api/:date", function(req,res){
  const date_string = req.params.date;
  const passedDate = new Date(date_string);
  if(passedDate == "Invalid Date"){
    res.json({"error":"Invalid Date"});
  }else{
    res.json({"unix": passedDate.getTime(), "utc": passedDate.toUTCString()});
  }
});


// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Your app is listening on port ' + port))