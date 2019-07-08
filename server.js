// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

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

app.get("/api/timestamp/:date_string?", (req, res) => {
  let unix, utc, d = new Date();
  const utcFormatRegex = new RegExp(/\d{4}-\d{2}-\d{2}/);
  if(req.params.date_string) {
    const isUtcDate = utcFormatRegex.test(req.params.date_string);
    
    if(isUtcDate) {
      d = new Date(req.params.date_string);
    } else {
      d = new Date(parseInt(req.params.date_string));
    }
        
    let dStr = d.toString();
    if(dStr == 'Invalid Date') {
      console.log('invalid', dStr);
      res.json({error: dStr});
      return;
    }
  }
  unix = d.getTime();
  utc = d.toUTCString();
  res.json({unix, utc})
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});