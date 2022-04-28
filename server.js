// Require Express.js
const express = require("express");
const app = express();
const args = require("minimist")(process.argv.slice(2));
args["port"];
const port = args.port || process.env.PORT || 5555;

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port));
});

// Default response for any other request
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});

// Check endpoint
app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead(res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
});

// Multiple flips endpoint
app.get('/app/flips/:number', (req, res) => {
    let num = parseInt(req.params.number);
    let flips = coinFlips(num);
    let count = countFlips(flips);
    let out = {raw: flips, summary: count};

    res.status(200).json(out);
});

// Single flip endpoint
app.get('/app/flip/', (req, res) => {
	const result = coinFlip();
    const out = {flip: result};

    res.status(200).json(out);
});

// Guess flip endpoint
app.get('/app/flip/call/:call', (req, res) => {
    const call = req.params.call;
    const out = flipACoin(call);

    res.status(200).json(out);
});

// Coin funcs
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
