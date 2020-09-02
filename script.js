var searchInput = $(".uk-input");
var btnPlanet = $("#btnPlanet");
var btnPeople = $("#btnPeople");
var btnShips = $("#btnShips");
var btnSpecies = $("#btnSpecies");
var btnMovies = $("#btnMovies");
var randQuote = $("#randQuote");
var randFacts = $("#factSection");
var btnFacts = $("#btnFacts");
let factsUl = $("<ul class='factsUl'>");
let searchForm = $("form");

//https://swapi.dev/api/people/?search=r2

function swapiUrl(event) {
    event.preventDefault();
    console.log(this.id);
    console.log(searchInput.val());

    let baseUrl = "http://swapi.dev/api/";
    let endpoint = this.id.replace("btn", "").toLowerCase();
    let searchParam = searchInput.val();
    let finalUrl = baseUrl + endpoint + "s" + "/?search=" + searchParam;
    console.log(finalUrl);

    $.ajax({
        url: finalUrl,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    });
}

//randomly selects facts from facts.js
function getRandomFacts() {
    factsUl.empty();
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

//updating factSection with random facts.
getRandomFacts();

btnFacts.click(getRandomFacts);

// $(document).on("click",".prev-cities",searchPrev);

$(document).on("click", ".uk-button-small", swapiUrl);

