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

function makeButtons() {
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.text(topics[i]);
        newButton.attr("data-word", topics[i]);
        $(".buttons").prepend(newButton);
    }
};

// function makeGifs(){
//     for (var i = 0; i < 10; i++)
//        response.data[i]
// }



makeButtons();

$("button").on("click", function() {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Vo3yan4o4RtxSVlfIia2Zlsk8C7I5FP3&limit=10&q="
    + $(this).attr("data-word")

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    .done(function(response) {
        // makeGifs()
    })

})
