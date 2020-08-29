// var searchInput = $("#searchInput");
// var btnPlanet = $("#btnPlanet");
// var btnPeople = $("#btnPeople");
// var btnShips = $("#btnShips");
// var btnSpecies = $("#btnSpecies");
// var btnMovies = $("#btnMovies");
// var btnFacts = $("#btnFacts");
// var randFacts = $("#btnFacts");
var randQuote = $("#randQuote");

// console.log(randQuotes);

$.ajax({
    url: "http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote",
    method: "GET"
}).then(function(response) {
    console.log(response);
});

// $.ajax({
//     url: weatherUrl,
//     method: "GET"
// }).then(getForecast);