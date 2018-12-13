var topics = [
"the office",
"michael scott", 
"dwight schrute", 
"jim halpert", 
"pam beesly", 
"kevin malone", 
"dunder mifflin",
]

function displayGIF() {
    var character = $(this).attr("data-name");
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=9vUSua8oJ9bi9oejRffjSEhZkRHevlw7&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response) {
        console.log(response);

        var paper = response.data;

        for (var i = 0; i < paper.length; i++) {

            var gifDiv = $("<div class = 'gif'>");

            var rated = paper[i].rating;

            var ratingText = $("<p>").text("Rating: " + rated);

            gifDiv.append(ratingText);

            var stillURL = paper[i].images.fixed_width_still.url;
            console.log(stillURL);

            var gif = $("<img>").attr("src", stillURL);
            
            gif.addClass("gifImage");

            gifDiv.append(gif);

            $("#gif-spot").prepend(gifDiv);

            var gifURL = response.data[i].images.fixed_width.url;

            $(".gifImage").attr("data-state", "still");
        };
        $(".gifImage").on("click", function() {
            var state = $(this).attr("data-state")
            if (state === "still") {
                $(this).attr("src", gifURL);
                $(this).attr("data-state", "animate")
            } else {
                $(this).attr("src", stillURL);
                $(this).attr("data-state", "still");
            }
        });
    });
}

function buttonRender() {
    $("#button-space").empty
    for (var i = 0; i < topics.length; i++) {
        var b = $("<button>");
        b.addClass("dunder-btn");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#button-space").append(b);
    }
}

$("#button-search").on("click", function(event) {
    event.preventDefault();
    var character = $("#add-gif").val().trim();
    character.push(topics);
    buttonRender();
})

$(document).on("click", ".dunder-btn", displayGIF);

buttonRender();