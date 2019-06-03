var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
      function linkify(text) {
          var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
          return text.replace(urlRegex, function(url) {
              return '<a href="' + url + '">' + url + '</a>';
          });
      }
      setInterval( function(){
            console.log("getting tweets");
            $.ajax({
                type: "GET",
                url: "/tweets",
                data: 'json',
                success: function(html){
                   console.log(html);
                   if (html.length == 0)
                      return;
      
                   $('.live-update').html('')
                   $("#live-tweets").addClass('live-tweets-height')
                   $("#live-tweets").html("");
      
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