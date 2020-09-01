// var searchInput = $("#searchInput");
// var btnPlanet = $("#btnPlanet");
// var btnPeople = $("#btnPeople");
// var btnShips = $("#btnShips");
// var btnSpecies = $("#btnSpecies");
// var btnMovies = $("#btnMovies");
// var btnFacts = $("#btnFacts");
var randFacts = $("#btnFacts");
var randQuote = $("#randQuote");

// console.log(facts);

getRandomFacts();

//randomly selects facts from facts.js
function getRandomFacts() {
    
    for (let index = 0; index < 5; index++) {
        let randomNumber = Math.floor(Math.random() * 30);
        console.log(facts[randomNumber]);
    }
};

//setRandQuote to append random quote string to DOM.
function setRandQuote(response) {
//    console.log(response.starWarsQuote);
   randQuote.append($("<h1>" + response.starWarsQuote + "</h1>"));
}

//getRandQuote api call
function getRandQuote() {
    $.ajax({
        url: "http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote",
        method: "GET"
    }).then(setRandQuote);
};

//running api call to get random quote.
getRandQuote();
