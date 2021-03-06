// Creating variables containing html elements.
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
searchContent.append(
    "<p>\"The Force is what gives a Jedi his power. It's an energy field created by all living things. It surrounds us and penetrates us. It binds the galaxy together.\" -Obi-Wan Kenobi; There is much to learn young padawan. Try searching below to learn about key Star Wars terms. You can search by Planets, People, Ships, Species and Films to educate yourself about all things Star Wars.</p>"
);
let searchContentUl = $("<ul class='contentUl'>");
const giphyKey = "gY3zrTqndTT0ezYrpQwRhwMMv1DTt6pF";
let planetsWav = new Audio("./assets/sound/planets.wav");
let peopleWav = new Audio("./assets/sound/people.wav");
let starshipsWav = new Audio("./assets/sound/starships.wav");
let speciesWav = new Audio("./assets/sound/species.wav");
let filmsWav = new Audio("./assets/sound/films.wav");
let offset = 0;

//Invoking function to get gifs from giphy.
getGiphy();

//Sets SWAPI data to the searchContent slider card.
function setSearchResults(response, endpoint, searchParam) {
    searchContent.empty();
    searchContentUl.empty();
    if(response.count) {
        searchContent.append(searchContentUl);
        delete response.results[0].created;
        delete response.results[0].edited;
        delete response.results[0].url;
        $.each(response.results[0], function(index,value) {
            if(!Array.isArray(value)) {
                searchContentUl.append($("<li>" + index + ": " + value + "</li>"));
            }
        });
    } else {
        //Creating modal and triggering on empty SWAPI response.results object.
        let modal = $("<div id='modal-close-outside' uk-modal>");
        modal.empty();
        let modalBody = $("<div class='uk-modal-dialog uk-modal-body'>");
        let modalBtn = $("<button class='uk-modal-close-outside' type='button' uk-close></button>");
        let modalTitle = $("<h2 class='uk-modal-title'>Force Disturbance</h2>");
        let modalGif = $("<img src='./assets/img/jedi-mind-trick.gif'/>");
        switch (endpoint) {
            case "planets":
                endpoint = "planet";
                break;
            case "people":
                endpoint = "person";
                break;
            case "starships":
                endpoint = "starship";
                break;
            case "species":
                endpoint = "species";
                break;              
            default:
                endpoint = "film";
                break;
        }
        let modalP = $("<p>This is not the " + endpoint + " you are looking for. " + searchParam.charAt(0).toUpperCase() + searchParam.slice(1) + " is not a " + endpoint + " in a galaxy far, far away.</p>");
        modal.append(modalBody);
        modalBody.append(modalBtn,modalTitle,modalGif,modalP);
        console.log(modal);
        UIkit.modal(modal).show();
    };
}
//Ajax call to get SWAPI data from form input.
function swapiUrl(event) {
    event.preventDefault();
    let baseUrl = "https://swapi.dev/api/";
    let endpoint = $(this).data().type;
    let searchParam = searchInput.val();
    let finalUrl = baseUrl + endpoint + "/?search=" + searchParam;
    $.ajax({
        url: finalUrl,
        method: "GET",
        success: function(response) {
            setSearchResults(response, endpoint, searchParam);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

//Randomly selects facts from facts.js
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

//Sets random quote to page header from quote api response.
function setRandQuote(response) {
   randQuote.append($("<h2>" + response.starWarsQuote + "</h2>").css("font-style", "italic"));
}

//Ajax call to get random quote from quote api.
function getRandQuote() {
    $.ajax({
        url: "https://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote",
        method: "GET"
    }).then(setRandQuote);
};
//Plays sounds respective to search button clicked.
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

//Running api call to get random quote.
getRandQuote();

//Updating factSection with random facts.
getRandomFacts();

//Listens for btn clicks to populate random facts section.
btnFacts.click(function(event) {
    event.preventDefault();
    getRandomFacts();
});
//Listens for search button click and fires off api call to get SWAPI data based on the type of button clicked.
$(document).on("click", ".uk-button-small", swapiUrl);
//Listening for search button click to fire off api call to get giphy images.
$(document).on("click", ".uk-button-small", getGiphy);
//Listening for search button click to invoke the playSound function to play the respective sounds based on the data for the button clicked.
$(document).on("click", ".uk-button-small", playSound);
//builds url for giphy api call.
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
//Ajax call to get giphy images related to star wars.
function getGiphy(event) {    
    const img = $(".slider-img img");
    const query = "star+wars";
    searchTerm = $(".uk-input").val();
    let cardTitle = $(".uk-card-title");
    searchTerm ? cardTitle.text(searchTerm) : cardTitle.text("Star Wars");
    url = giphyUrl(query,offset);
    
    $.ajax({
        url: url,
        method: "GET"
    }).then(function(response) {
        $.each(response.data, function(index,value) {
            $(img[index]).attr("src", value.images.fixed_height.url).css("border-radius", "10px");
            offset++;
        });
    });
}