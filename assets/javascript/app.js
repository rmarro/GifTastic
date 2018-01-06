//=========================================================================================
// array of words
// loop through and make buttons of each, with word as a data-
// add event listener to all buttons on click
    // make the data- the search of the api request
        // (insert it into the queryURL)
    // make a bunch of images with the json returned
        // for each image it should have a data-animated and a data-still verison
            // and a data-status 
        // on click of image change the src and status to animated or still
// for form, push or prepend new word to array of words and call button maker function again
//===========================================================================================


var topics = ["Harry Potter", "Albus Dumbledore", "Hermione Granger", "Ron Weasley", "Quidditch"];

// Make a button for each item in topics array
function makeButtons() {
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.text(topics[i]);
        // Save the item as the data-word attribute
        newButton.attr("data-word", topics[i]);
        $(".buttons").append(newButton);
    }
};

makeButtons();

// When button is clicked
$(document).on("click", "button", function() {
    $(".gifs").empty();
    // Make queryURL with data-word attribute as search term
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Vo3yan4o4RtxSVlfIia2Zlsk8C7I5FP3&limit=10&q="
    + $(this).attr("data-word")

    // Make and ajax call via GET to the url
    $.ajax({
        url: queryURL,
        method: "GET"
    })

    // When ajax call complete create callback with parameter called response
    .done(function(response) {
        // For all 10 objects in the JSON
        for (var i = 0; i < 10; i++) {
            // Create a new div for the rating and the gif
            var newDiv = $("<div class=gif_div>");
            // Create a new image that has still and animated urls as attributes, set state as still
            var newGif = $("<img>");
            newGif.attr("data-still", response.data[i].images.fixed_height_still.url);
            newGif.attr("data-animate", response.data[i].images.fixed_height.url);
            newGif.attr("src", response.data[i].images.fixed_height_still.url);
            newGif.attr("data-state", "still");
            // create rating
            var rating = $("<p>");
            rating.text("Rated: " + response.data[i].rating);
            // append rating and gif to the new div; append new div to the gif div in DOM
            newDiv.append(rating);
            newDiv.append(newGif);
            $(".gifs").append(newDiv)
        }
    })
});

// When image is clicked
$(document).on("click", "img", function() {
    var state = $(this).attr("data-state");
    // If data-state is still, change img src to animate
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate")
    } 
    // If data-state is animate, change img src to still
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }
});


// When submit button of form is clicked
$("#add-button").on("click", function(event) {
    // prevent form from trying to submit/refresh the page
    event.preventDefault();
    // add textbox input to the array of topics
    topics.push($("#new-button").val().trim());
    // remake new buttons
    $(".buttons").empty();
    makeButtons();
})