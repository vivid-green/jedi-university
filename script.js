// var searchInput = $("#searchInput");
// var btnPlanet = $("#btnPlanet");
// var btnPeople = $("#btnPeople");
// var btnShips = $("#btnShips");
// var btnSpecies = $("#btnSpecies");
// var btnMovies = $("#btnMovies");
var randQuote = $("#randQuote");
var randFacts = $("#factSection");
var btnFacts = $("#btnFacts");
//hiding the button for facts from display.
// btnFacts.css("display", "none");



// console.log(facts);

getRandomFacts();

//randomly selects facts from facts.js
function getRandomFacts() {
    let factsUl = $("<ul>");
    let randomChoices = [];
    for(i = 0; i < 5; i++) {
        let randomChoice = Math.floor(Math.random() * facts.length);
        while(randomChoices.includes(randomChoice) || randomChoice === 5) {

            randomChoice = Math.floor(Math.random() * facts.length);
        }
        randomChoices.push(randomChoice);
        factsUl.append($("<li>" + facts[randomChoice] + "</li>"));
    }
    randFacts.append(factsUl);
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
