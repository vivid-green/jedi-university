var searchInput = $(".uk-input");
var btnPlanet = $("#btnPlanet");
    btnPlanet.data("type", "planets");
var btnPeople = $("#btnPeople");
    btnPeople.data("type", "people");
var btnShips = $("#btnShips");
    btnShips.data("type", "starships");
var btnSpecies = $("#btnSpecies");
    btnSpecies.data("type", "species");
var btnMovies = $("#btnMovies");
    btnMovies.data("type", "films");
var randQuote = $("#randQuote");
var randFacts = $("#factSection");
var btnFacts = $("#btnFacts");
let factsUl = $("<ul class='factsUl'>");
let searchForm = $("form");
let searchContent = $(".searchContent");
let searchContentUl = $("<ul class='contentUl'>");

function setSearchResults(response) {
    searchContentUl.empty();
    searchContent.append(searchContentUl);
    $.each(response.results[0], function(index,value) {
        if(!Array.isArray(value)) {
            searchContentUl.append($("<li>" + index + ": " + value + "</li>"));
            // console.log(index + ": " + value);
        }
    })
}

function swapiUrl(event) {
    event.preventDefault();
    let baseUrl = "http://swapi.dev/api/";
    let endpoint = $(this).data().type;
    let searchParam = searchInput.val();
    let finalUrl = baseUrl + endpoint + "/?search=" + searchParam;
    $.ajax({
        url: finalUrl,
        method: "GET"
    }).then(setSearchResults);
}

//randomly selects facts from facts.js
function getRandomFacts() {
    factsUl.empty();
    let randomChoices = [];
    for(i = 0; i < 5; i++) {
        let randomChoice = Math.floor(Math.random() * facts.length);
        while(randomChoices.includes(randomChoice)) {

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

$(document).on("click", ".uk-button-small", swapiUrl);

