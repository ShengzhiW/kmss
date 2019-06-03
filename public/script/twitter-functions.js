/* 
 * This file is used to connect our Twitter API and Twitter node module to our trending page. Every 5 seconds it will grab new tweets
 * and display it on the page.
*/

// Parases the link from the text and wraps it all inside an <a> tag
var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      function linkify(text) {
          var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
          return text.replace(urlRegex, function(url) {
              return '<a href="' + url + '">' + url + '</a>';
          });
      }

      // Sets an interval and grabs tweets using an ajax request to grab tweets.
      setInterval( function(){
            console.log("getting tweets");
            $.ajax({
                type: "GET",
                url: "/tweets",
                data: 'json',
                success: function(html){
                   console.log(html);
                      
                   // If nothing
                   if (html.length == 0)
                      return;
                   
                   // Set up html elements
                   $('.live-update').html('')
                   $("#live-tweets").addClass('live-tweets-height')
                   $("#live-tweets").html("");
                  
                  // Set up each tweet
                  for (let i=0; i<html.length; i++) {
                      setTimeout( function timer(){
                         $("#live-tweets").append('<div class="tweet-ind"><img src="/images/twitter.png" style="width: 20px; margin-right:20px">'+linkify(html[i])+'</div>');
                      }, i*300 );
                  }
                },
                error: function (request, status, error) {
                  console.log(request.responseText);
                }
            });
      }, 5000);
