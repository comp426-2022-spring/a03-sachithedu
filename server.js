// Require Express.js
const express = require('express');
const app = express();

const args = require("minimist")(process.argv.slice(2))
args["port"]
const port = args.port || process.env.PORT || 5000

// Start an app server
const server = app.listen(port, () => {
  console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

// Check endpoint
app.get('/app/', (req, res) => {
  // Respond with status 200
  res.statusCode = 200;
  // Respond with status message "OK"
  res.statusMessage = 'OK';
  res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
  res.end(res.statusCode+ ' ' +res.statusMessage)
});

// Multiple flips endpoint
app.get('/app/flip/call/heads', (req, res) => {
  const result = flipACoin('heads');
  res.status(200).json({
      result
  })
});

app.get('/app/flip/call/tails', (req, res) => {
  const result = flipACoin('tails');
  res.status(200).json({
      result
  })
});

// Flip Enpoints
app.get('/app/flips/:number', (req, res) => {
  var num = req.params.number;
  const flips = coinFlips(num);
  const results = countFlips(flips);
  res.status(200).json({
      "raw": flips,
      "summary": results
  })
});
app.get('/app/flip/', (req, res) => {
  var result = coinFlip();
  res.status(200).json({
      "flip": result
  })
});

// Default 
app.use(function(req, res){
  res.status(404).send('404 NOT FOUND')
});

function coinFlip() {
    return Math.floor(Math.random() * 2) == 0 ? "heads" : "tails"
  }

function coinFlips(flips) {
    const resultArr = new Array(flips);
    for(var i = 0; i < flips; i++) {
      resultArr[i] = coinFlip();
    }
    return resultArr;
}  

function countFlips(array) {
    let heads = 0;
    let tails = 0;
  
    for (let i = 0; i < array.length; i++) {
      if (array[i] == "heads") {
        heads++;
      } else {
        tails++;
      }
    }

    return "{ heads: " + heads + ", tails: " + tails + " }";
  }

function flipACoin(call) {
    var flip = coinFlip();
    return {call: call, flip: flip, result: flip == call ? "win" : "lose" }
}
