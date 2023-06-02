
let currentCollection = 1;
let cardId = -1; //changed from 1 to -1

function addCard() {
    cardId++;
    const title = document.getElementById('cardTitleInput').value;
    const content = document.getElementById('cardContentInput').value;

    createCardElement(title, content);

    document.getElementById('cardTitleInput').value = '';
    document.getElementById('cardContentInput').value = '';


}

function createCardElement(title, content) {
    console.log(cardId);
    var iteneraryCardsParent = $(`#Itenerary2Cards`); //change collection
    var cardContainer = $(`<div class="dropdown-content cardContainer${cardId}"></div>`);
    iteneraryCardsParent.append(cardContainer);

    var IteneraryCardDiv = $(`<div id="IteneraryCard${cardId}" class="dropdown-item IteneraryCardsBtn card is-flex-direction-column"></div>`);
    cardContainer.append(IteneraryCardDiv);

    var cardTitle = $(`<h3 class="title">${title}</h3>`);
    IteneraryCardDiv.append(cardTitle);

    var cardP = $(`<p class="paragraph">${content}</p>`);
    IteneraryCardDiv.append(cardP);

    var buttonContainer = $('<div class="buttons has-addons"></div>');
    IteneraryCardDiv.append(buttonContainer);

    var editButton = $('<button class="button">Edit</button>');
    editButton.on('click', () => editCard(`IteneraryCard${cardId}`));
    buttonContainer.append(editButton);

    var deleteButton = $('<button class="button">Delete</button>');
    deleteButton.on('click', () => deleteCard(`cardContainer${cardId}`));
    buttonContainer.append(deleteButton);


    //this search bar has a value of the location name
    //when search button clicked, will call the google map api and wiki api with its value as a parameter
    var cardSearch = $('<button class="button">Search</button>');
    // cardSearch.on('click', () => deleteCard(card.id));
    buttonContainer.append(cardSearch);

    return iteneraryCardsParent;
}

function editCard(cardId) {
    const card = document.getElementById(cardId);
    const titleElement = card.querySelector('h3');
    const contentElement = card.querySelector('p');

    const newTitle = prompt('Enter a new title:', titleElement.textContent);
    const newContent = prompt('Enter new content:', contentElement.textContent);

    titleElement.textContent = newTitle;
    contentElement.textContent = newContent;
}

function deleteCard(cardsId) {
    const card = $(`.${cardsId}`);
    console.log(card);
    card.remove();
    cardId--;
    console.log(cardId);
    console.log(card);
}

function saveCollection() {
    const collectionSelect = document.getElementById('collectionSelect');
    const selectedCollection = collectionSelect.value;

    // Code to save the collection goes here...
    alert(`Collection ${selectedCollection} saved!`);
}

function changeCollection() {
    const collectionSelect = document.getElementById('collectionSelect');
    const selectedCollection = collectionSelect.value;

    // Code to switch to the selected collection goes here...
    alert(`Switched to Collection ${selectedCollection}!`);
}

//when function is called, another itenerary div will be dynamically added
//the value of an option is the id of the itenerary div
var IteneraryNum = 1;
function addItenerary() {
    IteneraryNum++;
    var collectionSelect = $('#collectionSelect');
    var newOption = $(`<option>Itenerary ${IteneraryNum}</option>`);
    newOption.val(`Itenerary${IteneraryNum}Cards`);
    collectionSelect.append(newOption);

    //creates a new Itenerary div
    var dropdownDiv = $('<div></div>').addClass(`dropdown Itenerary Itenerary${IteneraryNum}`);
    $('aside').append(dropdownDiv);

    var dropdownTriggerDiv = $('<div></div>').addClass('dropdown-trigger');
    dropdownDiv.append(dropdownTriggerDiv);

    var button = $('<button></button>').addClass(`button  Itenerary${IteneraryNum}`);
    dropdownTriggerDiv.append(button);

    var titleSpan = $('<span></span>').attr('id', `Itenerary${IteneraryNum}Title`).text(`Itenerary ${IteneraryNum}`);
    button.append(titleSpan);

    var iconSpan = $('<span></span>').addClass('icon');
    button.append(iconSpan);

    var icon = $('<i></i>').addClass('fas fa-angle-down');
    iconSpan.append(icon);

    var dropdownMenuDiv = $('<div></div>').addClass('dropdown-menu IteneraryCards').attr('id', `Itenerary${IteneraryNum}Cards`);
    dropdownTriggerDiv.append(dropdownMenuDiv);

    var dropdownContentDiv = $('<div></div>').addClass(`dropdown-content cardContainer${IteneraryNum}`);
    dropdownMenuDiv.append(dropdownContentDiv);






}

// Working search bar, that interacts with the google API (Carlos)
// -location is picked. and information can be pulled
var searchedCity = $('.input');
var screenMap = $('#map-container');
var carlosKey = 'AIzaSyBfijwlDdGDJ2LiGaA6IL5b1wOf0a1PPsE';

var map;
var service;

window.searchPlace = function (city) {
    var geocodeApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${carlosKey}&address=${city}`;    //api url to search for a location's latlng
    var placeLat;
    var placeLon;

    fetch(geocodeApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status} occurred while fetching data.`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'OK') { //only if the input is a valid location address, its latitude and longitude will be stored in variable
                placeLat = data.results[0].geometry.location.lat;
                placeLon = data.results[0].geometry.location.lng;
                test(placeLat, placeLon);
            }
        })
        .catch(error => console.error(error));
};

function test(placeLat, placeLon) {
    var cityLatLng = new google.maps.LatLng(placeLat, placeLon);
    console.log(placeLat);
    console.log(placeLon);

    map = new google.maps.Map(document.getElementById('map-container'), { center: cityLatLng, zoom: 15 });    //creates a new Map object, and displayed in #map-container in html

    var request = {
        location: cityLatLng,
        radius: '500',     //radius of location in m
        types: ['tourist_attraction'] //enter a specified type of location. visit https://developers.google.com/maps/documentation/javascript/supported_types to see a list of supported place types.
    };
    service = new google.maps.places.PlacesService(map);

    //  creates a new instance of the PlacesService object provided by the Google Maps Places library, and associating it with the map
    service.nearbySearch(request, callback);    // calls 'nearbySearch' method on the 'PlacesService' instance
}



function callback(results, status) {

    //If the status of the Places API request is OK, it logs the name of each place in the console. If the status is not OK, it logs a message saying that no results were returned.
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var place = results[i];

        }
        console.log(place[1]);
    } else {
        console.log('Place search did not return any results.');
    }
}

$('.search').on('click', () => {
    searchPlace(searchedCity[0].value);
})


$(document).ready(function () {

    // Assigns an on click event to the dropdown button
    $(document).on('click', '.Itenerary .dropdown-trigger button', function (event) {
        event.stopPropagation();

        var allActiveIteneraries = $(".Itenerary.is-active");   // stores all active Itenerary elements in variable
        var currentItenerary = $(this).closest('.Itenerary');   // goes through clicked element's parents that matches 'Itenerary'

        // Remove 'is-active' class from all active Iteneraries that aren't the current one]
        allActiveIteneraries.each(function () {  //.each() loops all active itenerary queries
            if (!$(this).is(currentItenerary)) {    // checks if if the 'currentItenerary' is not the same as the element in current iteration
                $(this).removeClass('is-active');
            }
        });

        currentItenerary.toggleClass('is-active'); // Toggle the current dropdown
    });
});



