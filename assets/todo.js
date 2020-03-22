//ajax with jquery
// this  script send response to server through post and delete req and wait
// for response
$(document).ready(function(){

  $('form').on('submit', function(e){
      e.preventDefault();
      var item = $('form input');
      console.log(item.val());
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data,status,xhr){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  
  $('#deleteIcon').on('click', function(e){
      var item = $('.item-text').text().replace(/ /g, "-");
      console.log(e);
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });
 
});
function handleClick(e){
  var item = e.replace(/ /g, "-");

  console.log(item);
  $.ajax({
    type: 'DELETE',
    url: '/todo/' + item,
    success: function(data){
      //do something with the data via front-end framework
      location.reload();
    }
  });
}