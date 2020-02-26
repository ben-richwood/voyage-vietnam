window.$ = window.jQuery = require('jquery');
require("./turn.min.js");
export let map;
const flipbook = document.querySelector(".flipbook");

export function goTo(p) {
  // flipbook.turn('page', p);
  $(".flipbook").turn('page', p);
  let loc = locations.features.find(e => e.properties.id === p)
  if (loc === undefined) return
  let camera = {
    center: loc.geometry.coordinates,
    speed: 0.3,
    ...loc.properties.camera
  }
  map.flyTo(camera);
}

export function initMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoicmljaHdvb2QiLCJhIjoiY2p0eWlzdG9oMDE3cDRlcDlqOWVxbmU1MiJ9.Xx8OH5XyqXiTgUNGnsn1Qg';
  map = new mapboxgl.Map({
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
    // playback(0);
  });
}

export const locations = {
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
					"hanoi_streets.jpg",
					"IMAG0875.jpg"
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
					"ninh_binh_edited.jpg"
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
					"HG_bus_edited.jpg",
					"IMAG0875.jpg"
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
					"IMAG0875.jpg",
					"IMAG0875.jpg"
				]
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [105.362378, 23.278154]
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 16,
				'name': "Lung Cu",
				'camera': {
					'bearing': 25.3,
					'zoom': 11.5,
					'speed': 1.2
				}
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [105.316085, 23.362381]
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 18,
				'name': "Bảo Lạc",
				'camera': {
					'bearing': 25.3,
					'zoom': 11.5,
					'speed': 1.2
				}
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [106.25780541993414, 22.665810782850087]
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 20,
				'name': "Ban Gioc",
				'camera': {
					'bearing': 25.3,
					'zoom': 11.5,
					'speed': 1.2
				}
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [106.72411777939311, 22.855185127386065]
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 24,
				'name': "Ba Bể Lake",
				'camera': {
					'bearing': 25.3,
					'zoom': 11.5,
					'speed': 1.2
				}
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [105.62146872103307, 22.405574239499998]
			}
		}
	]
};