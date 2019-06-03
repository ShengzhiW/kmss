var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var firebase = require("firebase-admin");
var fs = require('fs');

var config = require('./config');

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
function grabHurricaneSeasonTweets() {
  var params = {
    q: '[hurricane, hurricane season, hurricane warning] since:2011-06-30 -filter:retweets',
    count: 5,
    result_type: 'recent',
    lang: 'en'
  }
  T.get('search/tweets', params, gotData)
}

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

var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://hurrycane-52d0c.firebaseio.com"
});

var db = firebase.database();
var factsRef = db.ref("hurricane-facts");
var checklistRef = db.ref("checklist");
var login = require('./routes/login');
var home = require('./routes/home');
var maps = require('./routes/maps');
var preparations = require('./routes/preparations');
var trending = require('./routes/trending');
var shelters = require('./routes/shelters');
var bodyParser = require('body-parser')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  partialsDir: path.join(__dirname, '/views/partials')
}));
app.set('view engine', 'handlebars');

app.get('/', login.view);
app.get('/home', home.view);
app.get('/maps', maps.view);
app.get('/preparations', preparations.view);
app.get('/trending', trending.view);
app.get('/shelters', shelters.view);
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

app.post('/checklist', (req, res) => {
<<<<<<< HEAD
    statusArr = req.body['items[]'];
    for (var i = 0; i < statusArr.length; i++) {
        var item = {
            id: i,
            aa: 'aaa',
            status: statusArr[i]
        };
        var updates = {};
        updates[item.id+'/status'] = item.status;

        // console.log(statusArr[i])
        checklistRef.update(updates);
    }
    //

    // var checklistRef
  // function updateChecklist(value, status) {
  //   var item = {
  //     value: id,
  //     status: 0
  //   };

  //   var updateItem = firebase.database().ref().child('checklist').push().key;

  //   var updates = {};
  //   updates['checklist/' + updateItem + '/status'] = item;

  //   return firebase.database().ref().update(updates);
  // };
=======
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
>>>>>>> 0e3eee0808094a9377ea1c4f09064dd3849093ef
});

app.listen(3000);
module.exports = app;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}