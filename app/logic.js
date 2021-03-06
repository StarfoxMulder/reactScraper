var React = require("react");
var ReactDOM = require("react-dom");

// Grabs the Routes
var routes = require("./config/routes");

// Renders the contents according to the route page.
ReactDOM.render(routes, document.getElementById("app"));


var currentArticle = "placeHolder";

$(document).on("click", ".noteBtn", function() {

  // Save the id from the 'notes' button
  var thisId = $(this).attr("data-id");

  // $("#submitNote").data("id") = thisId;
  currentArticle = thisId;

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(found) {
      $("#notesUL").empty();
      if(found.length == 0) {
        $("#notesUL").append("Be the first to comment on this article!");
      } else {
        for (var i = 0; i < found.length; i++) {
          // The title of the article
          $("#notesUL").append("<li class='note'><div class='media noteMedia'><div class='media-body'><p class='noteText'>"+found[i].body+"</p></div><div class='media-right'><button type='button' class='btn btn-danger btn-sm' data-id='"+found[i]._id+"' href='/delete/"+found[i]._id+"'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button></div></div></li>");
        };
      };
    });
    return false;
});

$(document).on("click", "#submitNote", function() {
  // Save id from the submit note; from above it should be same as article id
  var thisId = $(this).attr("data-id");
  console.log(thisId);

  // making an ajax call for the Article
  $.ajax({
    method: "POST",
    url: "/"+currentArticle,
    data: {
      body: $("#noteBody").val(),
      scrapeDate: Date.now()
    }
  })
  .done(function(data) {
  });
  $("#noteBody").val("");
  // return false;
})

$(document).on("click", ".btn-danger", function(){

  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/delete/"+thisId,
  })
  .then(function(err, data) {
    if(err) {
      console.log("ajax delete error: ", err);
    } else {
      console.log("data returned after delete post finished: ", data);
    }
  });
  // return false;

});
