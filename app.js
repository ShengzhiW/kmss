var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');
var firebase = require("firebase-admin");
var fs = require('fs');
var Twit = require('twit')

var T = new Twit({
    consumer_key: 'RUCao1GFyFBYTgMrIKT54lgvf',
    consumer_secret: '8ffCY1gaG8RehObBTWMrJxo5C3fCSg7kwhLTHcQCOM7oyVbt1B',
    access_token: '1127724845750374400-Akjmfoy0bZgwTsF1Kwg0vF92czNpwL',
    access_token_secret: 'dDO2MN3wmbsmSFzWZqemKh5E3Fc2E1xhtmJlhbDuWYWoI',
    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
    strictSSL: true, // optional - requires SSL certificates to be valid.
});

var tweetsArr = [];

function grabHurricaneSeasonTweets() {
    var params = {
        q: '[ hurricane season, hurricane warning] since:2011-06-30 -filter:retweets',
        count: 10,
        result_type: 'recent',
        lang: 'en'
    }
    T.get('search/tweets', params, gotData)
}

function gotData(err, data, respon) {
    let tweets = data.statuses;
    console.log("new");

    tweetsArr = [];
    if (tweets) {
        // console.log(tweets);
        tweets.map((items) => {
            console.log(items.text);
            tweetsArr.push(items.text);
        })
    } else {
        console.log("no tweets");
    }

    console.log(tweetsArr);

}
// setInterval(grabHurricaneSeasonTweets, 3000);


var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://hurrycane-52d0c.firebaseio.com"
});


var db = firebase.database();
// var ref = db.ref("restricted_access/secret_document");
var ref = db.ref("hurricane-facts");


// var usersRef = ref.child("users");
// usersRef.set({
//   alanisawesome: {
//     date_of_birth: "June 23, 1912",
//     full_name: "Alan Turing"
//   },
//   gracehop: {
//     date_of_birth: "December 9, 1906",
//     full_name: "Grace Hopper"
//   }
// });

// var usersRef = ref.child("facts");
// usersRef.set({
//   fact1: 'A tropical cyclone is a rapidly rotating storm system characterized by a low-pressure center, a closed low-level atmospheric circulation, strong winds, and a spiral arrangement of thunderstorms that produce heavy rain. Depending on its location and strength, a tropical cyclone is referred to by different names, including hurricane (/ˈhʌrɪkən, -keɪn/),[1][2][3] typhoon (/taɪˈfuːn/), tropical storm, cyclonic storm, tropical depression, and simply cyclone.[4] A hurricane is a tropical cyclone that occurs in the Atlantic Ocean and northeastern Pacific Ocean, and a typhoon occurs in the northwestern Pacific Ocean; in the south Pacific or Indian Ocean, comparable storms are referred to simply as "tropical cyclones" or "severe cyclonic storms".[4]',
//   fact2: '"Tropical" refers to the geographical origin of these systems, which form almost exclusively over tropical seas. "Cyclone" refers to their winds moving in a circle,[5] whirling round their central clear eye, with their winds blowing counterclockwise in the Northern Hemisphere and clockwise in the Southern Hemisphere. The opposite direction of circulation is due to the Coriolis effect. Tropical cyclones typically form over large bodies of relatively warm water. They derive their energy through the evaporation of water from the ocean surface, which ultimately recondenses into clouds and rain when moist air rises and cools to saturation. This energy source differs from that of mid-latitude cyclonic storms, such as noreasters and European windstorms, which are fueled primarily by horizontal temperature contrasts. Tropical cyclones are typically between 100 and 2000 km in diameter.'
// });


var login = require('./routes/login');
var home = require('./routes/home');
var maps = require('./routes/maps');
var preparations = require('./routes/preparations');
var trending = require('./routes/trending');


var app = express();


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

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


app.get('/facts', (req, res) => {
    ref.once("value", function (snapshot) {
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

app.listen(3000);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};


//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
