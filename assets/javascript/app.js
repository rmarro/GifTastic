// array of words
// loop through and make buttons of each, with word as a data-something
// add event listener to all buttons on click
    // make the data- the search of the api request
        // (insert it into the queryURL)
    // make all a bunch of images with the json returned
        // for each image it should have a data-animated and a data-still verison
            // and a data-status 
        // on click of image change the status to animated or still
// for form, push or prepend new word to array of words and call button maker function again

var topics = ["Harry Potter", "Dumbledore", "Hermione", "Ron"];

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
$("button").on("click", function() {
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
            // Create a new image that has still and animated urls as attributes
            var newGif = $("<img>");
            newGif.attr("data-still", response.data[i].images.fixed_width_still.url);
            newGif.attr("data-animate", response.data[i].images.fixed_width.url);
            newGif.attr("src", response.data[i].images.fixed_width_still.url);
            $(".gifs").prepend(newGif)
        }
    })
})


// TO DO
// add data-state
// add onclick image to change src based on state
// add rating div to display rating
// add form (make sure button click push only applies to form button)