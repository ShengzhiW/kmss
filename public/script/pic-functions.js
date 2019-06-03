function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#falseinput').attr('src', e.target.result);
      $('#base').val(e.target.result);
      console.log(e.target.result);
      $.post("/profpic", e.target.result);
		};
    reader.readAsDataURL(input.files[0]);
  };

};
