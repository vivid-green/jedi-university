let searchInput = $(".uk-input");
let btnPlanet = $("#btnPlanet");
    btnPlanet.data("type", "planets");
let btnPeople = $("#btnPeople");
    btnPeople.data("type", "people");
let btnShips = $("#btnShips");
    btnShips.data("type", "starships");
let btnSpecies = $("#btnSpecies");
    btnSpecies.data("type", "species");
let btnMovies = $("#btnMovies");
    btnMovies.data("type", "films");
let randQuote = $("#randQuote");
let randFacts = $("#factSection");
let btnFacts = $("#btnFacts");
let factsUl = $("<ul class='factsUl'>");
let searchForm = $("form");
let searchContent = $(".searchContent");
let searchContentUl = $("<ul class='contentUl'>");
const giphyKey = "gY3zrTqndTT0ezYrpQwRhwMMv1DTt6pF";
let planetsWav = new Audio("./assets/sound/planets.wav");
let peopleWav = new Audio("./assets/sound/people.wav");
let starshipsWav = new Audio("./assets/sound/starships.wav");
let speciesWav = new Audio("./assets/sound/species.wav");
let filmsWav = new Audio("./assets/sound/films.wav");
let offset = 0;



getGiphy();

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
   randQuote.append($("<h2>" + response.starWarsQuote + "</h2>").css("font-style", "italic"));
}

//getRandQuote api call
function getRandQuote() {
    $.ajax({
        url: "https://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote",
        method: "GET"
    }).then(setRandQuote);
};

function playSound(event) {
    let btn = $(this).data().type;
    switch (btn) {
        case "planets":
            planetsWav.play();
            planetsWav.currentTime=0;
            break;

        case "people":
            peopleWav.play();
            peopleWav.currentTime=0;
            break;

        case "starships":
            starshipsWav.play();
            starshipsWav.currentTime=0;
            break;

        case "species":
            speciesWav.play();
            speciesWav.currentTime=0;
            break; 

        case "films":
            filmsWav.play();
            filmsWav.currentTime=0;
            break; 
        default:
            break;
    };
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

$(document).on("click", ".uk-button-small", getGiphy);

$(document).on("click", ".uk-button-small", playSound);

function giphyUrl(query, offset) {
    let baseUrl = "https://api.giphy.com/v1/gifs/search?";
    let params = {
        api_key: giphyKey,
        q: query,
        limit: 5,
        offset: offset
    };
    let url = baseUrl + $.param(params);
    return url;
}

function getGiphy(event) {    
    const img = $(".slider-img img");
    const query = "star+wars";
    searchTerm = $(".uk-input").val();
    let cardTitle = $(".uk-card-title");
    console.log(searchTerm);
    searchTerm ? cardTitle.text(searchTerm) : cardTitle.text("Star Wars");
    url = giphyUrl(query,offset);
    
    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $.each(response.data, function(index,value) {
            $(img[index]).attr("src", value.images.fixed_height.url).css("border-radius", "10px");
            offset++;
        });
    });
}

