$("#new-fact").click(function () {
  // alert( "Handler for .click() called." );
  $.ajax({
    type: "GET",
    url: "/facts",
    data: 'json',
    success: function (html) {
      $("#hur-fact").hide().html(html).fadeIn();

      console.log(html)
      // alert(html);
    }
  });
});
 
window.cb = function cb(json) {
  //do what you want with the json
  $("#home-city").html('Your Location:<br>' + json.address.road + ', ' + json.address.city + '<br>' + json.address.country);
}

function getgeo() {

  $("#location-loading").toggleClass('hidden');
  console.log("getting location...")
  navigator.geolocation.getCurrentPosition(function (location) {

    console.log(location.coords.latitude);
    console.log(location.coords.longitude);
    console.log(location.coords.accuracy);

    var s = document.createElement('script');
    s.src = 'https://nominatim.openstreetmap.org/reverse?json_callback=cb&format=json&lat=' + location.coords.latitude + '&lon=' + location.coords.longitude + '&zoom=27&addressdetails=1';
    document.getElementsByTagName('head')[0].appendChild(s);

    //Set location cookie
    document.cookie = location.coords.latitude + "," + location.coords.longitude;
  });
}