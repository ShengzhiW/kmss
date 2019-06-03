/*
 * This file manages how the a new fact is laoded and how the user's location is
 * recorded in local storage and displayed.
 */

/* functions that gets a new random fact when the user clicks
* on the appropriate button. It uses a get request to get
* a new fact
*/
$("#new-fact").click(function () {
  $.ajax({
    type: "GET",
    url: "/facts",
    data: 'json',
    success: function (html) {
      $("#hur-fact").hide().html(html).fadeIn();

      console.log(html)
    }
  });
});
 

// Displays the the user's location
window.cb = function cb(json) {
  $("#home-city").html('Your Location:<br>' + json.address.road + ', ' + json.address.city + '<br>' + json.address.country);
}


// get the user's location and store it in cookies
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
