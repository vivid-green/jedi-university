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
    delete response.results[0].created;
    delete response.results[0].edited;
    delete response.results[0].url;
    $.each(response.results[0], function(index,value) {
        if(!Array.isArray(value)) {

            searchContentUl.append($("<li>" + index + ": " + value + "</li>"));
            // console.log(index + ": " + value);
        }
    })
}

function swapiUrl(event) {
    event.preventDefault();
    let baseUrl = "https://swapi.dev/api/";
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
        url: "https://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote",
        method: "GET"
    }).then(setRandQuote);
};

//running api call to get random quote.
getRandQuote();

//updating factSection with random facts.
getRandomFacts();

btnFacts.click(function(event) {
    event.preventDefault();
    getRandomFacts();
});

$(document).on("click", ".uk-button-small", swapiUrl);

var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + searchInput + "&api_key=gY3zrTqndTT0ezYrpQwRhwMMv1DTt6pF" + "&limit=5";
    $.ajax({
        url: giphyURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        console.log(response.data[0].images.fixed_height.url);
        //   Depending on our approach... this could use this or a 'for' loop. 
        var imageFinal = (response.data[0].images.fixed_height.url);
        console.log("ImageFinal = " + imageFinal);
        var insertImg = $("#??whatever??");
        var image = $("<img>").attr("src", imageFinal);
        insertImg.append(image);
        console.log("Here is the link: " + giphyURL);
    });