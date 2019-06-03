/* 
 * This file is what is run to start our application. It connects our Firebase database, our Twitter API,
 * and node package modules that is used in our handlebar files. Additionally, it connects our pages together
 * so that they can be navigated from the navigation bar. This file also processes the get and post requested
 * needed to perform ajax actions.
 */


// initialize the required packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var firebase = require("firebase-admin");
var fs = require('fs');
var config = require('./config');

// initialize the twitter API
var Twit = require('twit')
var T = new Twit({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token: config.access_token,
  access_token_secret: config.access_token_secret,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});
var tweetsArr = [];

// function to get hurricane related tags 
function grabHurricaneSeasonTweets() {
  var params = {
    q: '[hurricane, hurricane season, hurricane warning] since:2011-06-30 -filter:retweets',
    count: 5,
    result_type: 'recent',
    lang: 'en'
  }
  T.get('search/tweets', params, gotData)
}

// function to push each tweet into a array to be passed back
function gotData(err, data, respon) {
  let tweets = data.statuses;
  console.log("Getting tweets...");

  tweetsArr = [];
  if (tweets) {
    tweets.map((items) => {
      console.log(items.text);
      tweetsArr.push(items.text);
    })
  } else {
    console.log("No Tweets :(");
  }
  console.log(tweetsArr);
}

// get API keys
var serviceAccount = require("./serviceAccountKey.json");

// initialize firebase
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://hurrycane-52d0c.firebaseio.com"
});

// firebase database references
var db = firebase.database();
var factsRef = db.ref("hurricane-facts");
var checklistRef = db.ref("checklist");
var picRef = db.ref("profile-pic");

// get the javascript files that are used to render each page
var login = require('./routes/login');
var home = require('./routes/home');
var maps = require('./routes/maps');
var preparations = require('./routes/preparations');
var trending = require('./routes/trending');
var shelters = require('./routes/shelters');
var bodyParser = require('body-parser');


// initializd parsers that is used by express
var app = express();
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  partialsDir: path.join(__dirname, '/views/partials')
}));
app.set('view engine', 'handlebars');

// rules to render each view of the app
app.get('/', login.view);
app.get('/home', home.view);
app.get('/maps', maps.view);
app.get('/preparations', preparations.view);
app.get('/trending', trending.view);
app.get('/shelters', shelters.view);

// sets the rules for what to return for each get request 
app.get('/facts', (req, res) => {
  factsRef.once("value", function (snapshot) {
    let i = getRandomInt(19);
    var data = snapshot.val()[i]
    console.log(i);
    res.send(data)
  });
});
app.get('/tweets', (req, res) => {
  grabHurricaneSeasonTweets();
  res.send(tweetsArr);
});
app.get('/buildchecklist', (req, res) => {
  db.ref('checklist').once("value", function (snapshot) {
    var data = snapshot.val()
    res.send(data)
  });
});
app.get('/newpic', (req, res) => {
  db.ref('profile-pic').once("value", function (snapshot) {
    var data = snapshot.val()
    res.send(data)
  });
});

// sets the rules for what to return for each post request 
app.post('/checklist', (req, res) => {
  statusArr = req.body['items[]'];
  for (var i = 0; i < statusArr.length; i++) {
    var item = {
      id: i,
      aa: 'aaa',
      status: statusArr[i]
    };
    var updates = {};
    updates[item.id + '/status'] = item.status;
    checklistRef.update(updates);
  }
});
app.post('/profpic', (req, res) => {
  var update = {};
  update['profpic'] = req.body['pic[]'];
  picRef.update(update)
});


app.listen(3000);
module.exports = app;

// generate a random int for get random fact
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
