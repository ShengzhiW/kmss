var Twit = require('twit')

var T = new Twit({
  consumer_key:         'RUCao1GFyFBYTgMrIKT54lgvf',
  consumer_secret:      '8ffCY1gaG8RehObBTWMrJxo5C3fCSg7kwhLTHcQCOM7oyVbt1B',
  access_token:         '1127724845750374400-Akjmfoy0bZgwTsF1Kwg0vF92czNpwL',
  access_token_secret:  'dDO2MN3wmbsmSFzWZqemKh5E3Fc2E1xhtmJlhbDuWYWoI',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

setInterval(grabHurricaneSeasonTweets, 100000);

grabHurricaneSeasonTweets()

function grabHurricaneSeasonTweets() {
  var params = {
    q: '[ hurricane season, hurricane warning ] since:2011-07-11 -filter:retweets',
    count: 1,
    result_type: 'recent',
    lang: 'en'
  }

  T.get('search/tweets', params, gotData)

  function gotData(err, data, respon) {
    var tweets = data.statuses;
    console.log(tweets);
    //tweets.map((item) => console.log(item));
    if(!err) {
    }
    else {
      console.log("Unable to pull tweets :c");
    }
  }
}
