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

};

$(document).ready(function(){
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


});
