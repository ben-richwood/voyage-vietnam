import gsap from "gsap";
import $ from "jquery";
// require("imports-loader?$=jquery!./example.js");
// var modernizr = require("modernizr");
// var modernizr = require('./modernizr.2.5.3.min.js');
// var modernizr = require("imports-loader?this=>window!./modernizr.2.5.3.min.js");
// var modernizr = require("imports-loader?this=>window!modernizr");
window.$=window.jQuery= $;
require("./turn.min.js");
// require("./turn.html4.min.js");

const blackScreen = document.getElementById("blackScreen");
const cardDeck = document.getElementById("cardDeck");
const width = window.innerWidth;
blackScreen.addEventListener("click", function(){
	console.log("listen");
	blackScreen.style.display = "none";
}, false);

const locations = {
	'type': 'FeatureCollection',
	'features': [
		{
			'type': 'Feature',
			'properties': {
				'id': 4,
				'name': "Hanoi",
				'camera': {
					'zoom': 12.21,
					'pitch': 50,
					'speed': 1.2
				},
				"photos": [
					"1.jpg",
					"2.jpg"
				]
			},
			'geometry': {
				'type': 'Point',
				'coordinates': [105.854504, 21.033133]
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 6,
				'name': "Ninh Binh",
				'camera': {
					'bearing': -8.9,
					'zoom': 11.68,
					'speed': 1.2
				},
				"photos": [
					"1.jpg",
					"2.jpg"
				]
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [105.931002, 20.237875],
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 10,
				'name': "Ha Giang",
				'camera': {
					'bearing': 25.3,
					'zoom': 11.5,
					'speed': 1.2
				},
				"photos": [
					"1.jpg",
					"2.jpg"
				]
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [104.985588, 22.82633],
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 14,
				'name': "Dong Van",
				'camera': {
					'bearing': 25.3,
					'zoom': 11.5,
					'speed': 1.2
				},
				"photos": [
					"1.jpg",
					"2.jpg"
				]
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [105.362378, 23.278154]
			}
		}
	]
};


let intervalListener;

function loadApp() {
	// Create the flipbook
	$('.flipbook').turn({
			width:922,
			height:700,
			elevation: 200,
			inclination: 90,
			duration: 1200,
			page: 2, // initial page
			pages: 14,
			// Enable gradients
			gradients: true,
			// Auto center this flipbook
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

nextPageButton.addEventListener('click', nextPage, false);
prevPageButton.addEventListener('click', prevPage, false);
tocPageButton.addEventListener('click', function(){
  goTo(3);
}, false);

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

function nextPage() {
	// $(".flipbook").turn("next");
	let currentPage = $(".flipbook").turn("page");
	if (currentPage % 2 != 0) currentPage++;
	goTo(currentPage + 2)
}
function prevPage() {
	let currentPage = $(".flipbook").turn("page")
	if (currentPage % 2 != 0) currentPage++;
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
	let loc = locations.features.find(e => e.properties.id === f);
	console.log("loc", loc);
	const photos = [...loc.properties.photos];
	while (cardDeck.firstChild) {
    cardDeck.removeChild(cardDeck.firstChild);
  }
	photos.forEach(function(photo){
		const card = document.createElement( 'div' );
		card.className = 'card';
		const img = document.createElement( 'img' );
		img.src = "./pages/" + photo
		card.appendChild( img );
		cardDeck.appendChild(card);
	})
	var tl = new gsap.TimelineLite(),
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
	$( function() {
		 $( ".card" ).draggable();
	 } );
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

	mapboxgl.accessToken = 'pk.eyJ1IjoicmljaHdvb2QiLCJhIjoiY2p0eWlzdG9oMDE3cDRlcDlqOWVxbmU1MiJ9.Xx8OH5XyqXiTgUNGnsn1Qg';
	var map = new mapboxgl.Map({
	container: 'map',
	// style: 'mapbox://styles/richwood/cjcrz5zbq1tkl2rpdctydxeqf',
	style: 'mapbox://styles/richwood/cjl2gj54g0zdg2sqn56voruef',
	center: [105.854504, 21.033133],
	maxZoom: 16,
	pitch: 30,
	minZoom: 7,
	zoom: 9.68
	});

	map["keyboard"].disable();
	map["dragRotate"].disable();
	map["doubleClickZoom"].disable();

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

	// add markers to map
	locations.features.forEach(function(marker) {
		console.log(marker);
		// create a DOM element for the marker
		let el = document.createElement('div');
		let cityName = document.createElement('div');
		cityName.innerHTML = marker.properties.name
		el.className = 'marker';
		let img = document.createElement('img');
		img.style.width = '40px';
		img.style.height = '30px';
		img.src = "./img/city_marker.svg"
		el.appendChild(img)
		el.appendChild(cityName)

		el.addEventListener('click', function() {
			// window.alert(marker.properties.message);
			// map.flyTo(marker.camera)
			goTo(marker.properties.id)
		});

		// add marker to map
		new mapboxgl.Marker(el)
		.setLngLat(marker.geometry.coordinates)
		.addTo(map);
	});

	map.on('load', function() {
		playback(0);
	});
	// 	map.addLayer(
	// 	{
	// 	'id': 'highlight',
	// 	'type': 'fill',
	// 	'source': {
	// 	'type': 'vector',
	// 	'url': 'mapbox://mapbox.8ibmsn6u'
	// 	},
	// 	'source-layer': 'original',
	// 	'paint': {
	// 	'fill-color': '#fd6b50',
	// 	'fill-opacity': 0.25
	// 	},
	// 	'filter': ['==', 'borocode', '']
	// 	},
	// 	'settlement-subdivision-label'
	// 	); // Place polygon under the neighborhood labels.
	//
	// 	// Start the playback animation for each borough
	// 	playback(0);
	// });