/* This file defines how the profile picture can be changed and saved 
* in the database. It will also tell the webpage to load an already 
* saved profile picture from the database upon load.
*/


// function to read the image uploaded and submit a post request to save
// it in the database 
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#falseinput').attr('src', e.target.result);
      $('#base').val(e.target.result);
      console.log(e.target.result);
      var picArr = { 'pic' : []};
      picArr['pic'].push(e.target.result);
      $.post("/profpic", picArr);
		};
    reader.readAsDataURL(input.files[0]);
  };
  getNewPic();
};


// load the profile picture on page load
$(document).ready(function(){
  getNewPic();

});


// fetch the newest profile picture
function getNewPic(){
  picBase=""
  $.ajax({
    type: "GET",
    url: "/newpic",
    data: 'json',
    success: function (image) {
      picBase = image["profpic"];
      $("#profpic").attr("src", picBase)
      console.log(picBase)
    }
  });

}