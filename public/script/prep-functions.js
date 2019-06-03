$(document).ready(function() {
    fillChecklist();
    checklistChange();
});

function checklistChange(){
    $("body").on("change", ".form-check-input", function(){
        var checklistArr = { 'items' : []};
        $('input[type=checkbox]').each(function () {
            checklistArr['items'].push($(this).is(":checked"));
        });
        console.log(checklistArr)
        $.post("/checklist", checklistArr);
    });
}

function fillChecklist(){
    $.ajax({
      type: "GET",
      url: "/buildchecklist",
      data: 'json',
      success: function(json){

         for(var i=0; i < json.length; i++) {

          if (json[i].status == 'false')
            var newhtml = '<div class="form-check"><input type="checkbox" class="form-check-input" id="materialUnchecked-'+i+'"><label class="form-check-label" for="materialUnchecked-'+i+'">'+json[i].item+'</label></div>'
          else 
            var newhtml = '<div class="form-check"><input type="checkbox" class="form-check-input" id="materialUnchecked-'+i+'" checked><label class="form-check-label" for="materialUnchecked-'+i+'">'+json[i].item+'</label></div>'

           if(i<7) {
             $("#food-list").append(newhtml)
           }
           else if(i<10) {
             $("#water-list").append(newhtml)
           }
           else if(i<17) {
             $("#kit-list").append(newhtml)
           }
           else if (i<22) {
             $("#drugs-list").append(newhtml)
           }
           else if (i<52) {
             $("#tools-list").append(newhtml)
           }
           else if (i<60) {
             $("#sanitation-list").append(newhtml)
           }
           else if (i<66) {
             $("#clothing-list").append(newhtml)
           }
           else if (i<71) {
             $("#baby-list").append(newhtml)
           }
           else if (i<77) {
             $("#adults-list").append(newhtml)
           }
           else if (i<78) {
             $("#entertain-list").append(newhtml)
           }
           else if (i<86) {
             $("#pets-list").append(newhtml)
           }
           else if (i<90) {
             $("#docs-list").append(newhtml)
           }
           else if (i<98) {
             $("#possess-list").append(newhtml)
           }
         }
      }
  });
}