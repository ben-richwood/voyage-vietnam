export let map;

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
					"IMAG0873.jpg",
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
				}
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
					"IMAG0873.jpg",
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
		}
	]
};