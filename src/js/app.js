import gsap from "gsap";
window.$ = window.jQuery = require('jquery');
// require('jquery-ui/ui/widgets/draggable');
import displace from 'displacejs';

require("./turn.min.js");

require("./particle.js");
import { map, initMap, locations } from "./map.js"

const blackScreen = document.getElementById("blackScreen");
const cardDeck = document.getElementById("cardDeck");
const width = window.innerWidth;
blackScreen.addEventListener("click", function(){
	console.log("listen");
	blackScreen.style.display = "none";
}, false);

let intervalListener;

function loadApp() {
	$('.flipbook').turn({
			width:922,
			height:700,
			elevation: 200,
			inclination: 50,
			duration: 1200,
			page: 2, // initial page
			pages: 14,
			gradients: true,
			autoCenter: false
	});

}

function goTo(p) {
	$('.flipbook').turn('page', p);
	let loc = locations.features.find(e => e.properties.id === p)
	if (loc === undefined) return
	let camera = {
		center: loc.geometry.coordinates,
		...loc.properties.camera
	}
	map.flyTo(camera);
}

const nextPageButton = document.getElementById("next-page");
const prevPageButton = document.getElementById("prev-page");
const tocPageButton = document.getElementById("toc-page");
const closeCardButton = document.querySelector("#close-card button");

nextPageButton.addEventListener('click', nextPage, false);
prevPageButton.addEventListener('click', prevPage, false);
tocPageButton.addEventListener('click', function(){
  goTo(3);
}, false);

// Autoloading function to add the listeners:
var elem = document.getElementsByClassName("button-images");

////////////////////////////////////////////////////////////////////////////////
// EVENT LISTENERS
////////////////////////////////////////////////////////////////////////////////

for (var i = 0; i < elem.length; i++) {
    (function () {
      var cardNumber = elem[i].getAttribute("data-card");
      elem[i].addEventListener("click", function() { spreadPhotos(cardNumber); }, false);
    }()); // immediate invocation
}

closeCardButton.addEventListener('click', closeCardDeck, false);

// Get the element, add a click listener...
document.getElementById("page-list").addEventListener("click", function(e) {
	// e.target is the clicked element!
	// If it was a list item
	if(e.target && e.target.nodeName == "LI") {
		// List item found!  Output the ID!
    var pageNumber = e.target.getAttribute("data-page");
		console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
    goTo(pageNumber);
	}
});

function closeCardDeck () {
	blackScreen.style.display = "none";
	cardDeck.style.display = "none";
}

function nextPage() {
	// $(".flipbook").turn("next");
	let currentPage = $(".flipbook").turn("page");
	if (currentPage % 2 != 0) currentPage++;
	goTo(currentPage + 2)
}
function prevPage() {
	let currentPage = $(".flipbook").turn("page")
	if (currentPage % 2 != 0) currentPage--;
	if (currentPage > 4) goTo(currentPage - 2)
	// $(".flipbook").turn("previous");
}

function backToTOC(){
	$('.flipbook').turn('page', 1);
}

function spreadPhotos (f) {
	blackScreen.style.display = "block";
	cardDeck.style.display = "block";
	stopMapAnimation();
	let loc = locations.features.find(e => e.properties.id == parseInt(f, 10));
	// console.log(parseInt(f, 10), f);
	// console.log("loc", parseInt(f), loc);
  if (loc === undefined) return;
	const photos = [...loc.properties.photos];

	let allCards = cardDeck.querySelectorAll(".card");
	// console.log("cardDeck.children", cardDeck.children);
	for (let i = 0, j = allCards.length ; i<j ; i++) {
		console.log("cardDeck.firstChild", allCards[i]);
		if (allCards[i] && allCards[i].className === "card"){
	    cardDeck.removeChild(allCards[i]);
		}
  }
	photos.forEach(function(photo){
		const card = document.createElement( 'div' );
		card.className = 'card';
		const img = document.createElement( 'img' );
		img.src = "./img/pics/" + photo
		card.appendChild( img );
		cardDeck.appendChild(card);
    displace(card);
	})
	var tl = new gsap.timeline(),
    elements = $(".card"),
    randomGap = .2, //use whatever you want here to space things out more/less
    i;
	for (i = 0; i < elements.length; i++) {
	    tl.to(elements[i], 1, {
				duration: .5,
				opacity: 1,
				left: width - (Math.random() * 400) - 300,
				top: Math.random() * 300,
				rotation: (Math.random() * 40) - 20,
				stagger: 0.2,
				force3D: true
			}, Math.random() * randomGap);
	}
}

	$(document).keydown(function(e){
		var previous = 37, next = 39;
		switch (e.keyCode) {
			case previous:
				$('.flipbook').turn('previous');
				break;
			case next:
				$('.flipbook').turn('next');
				break;
		}
	});

// Load the HTML4 version if there's not CSS transform

/*
yepnope({
	test : modernizr.csstransforms,
	yep: ['./js/turn.min.js'],
	nope: ['./js/turn.html4.min.js'],
	both: ['./css/basic.css'],
	complete: loadApp
});
*/

loadApp();

function loadMap(){
  initMap();
}

function changeLoadingText(index) {
	if (index + 1 < locations.length){
		index++;
		playback(index);
	}
	window.clearInterval(intervalListener);
}

function stopMapAnimation(){
	window.clearInterval(intervalListener);
}

function highlightBorough(code) {
	// Only show the polygon feature that cooresponds to `borocode` in the data
	map.setFilter('highlight', ['==', 'borocode', code]);
}

function playback(index) {
	// $('.flipbook').turn('next');
	// highlightBorough(locations[index].id ? locations[index].id : '');
	let camera = {
		center: locations.features[index].geometry.coordinates,
		...locations.features[index].properties.camera
	}
	map.flyTo(camera);

	/*
	map.once('moveend', function() {
		// Duration the slide is on screen after interaction
		intervalListener = self.setInterval(function(){
			changeLoadingText(index)
		}, 5000);
	});
	*/
}
