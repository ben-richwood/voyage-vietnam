window.$ = window.jQuery = require('jquery');
require("./turn.min.js");
export let map;
const flipbook = document.querySelector(".flipbook");

export function goTo(p) {
  let currentPage = $(".flipbook").turn("page");
  let targetPage = parseInt(p);
  if (targetPage % 2 != 0) targetPage++;
  console.log("currentPage", currentPage, targetPage);
  $(".flipbook").turn('page', targetPage);
  let loc = locations.features.find(e => e.properties.id === targetPage)
  if (loc === undefined || loc.geometry === undefined) return
  let camera = {
    center: loc.geometry.coordinates,
    speed: 0.3,
    ...loc.properties.camera
  }
  map.flyTo(camera);
}

export function initMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoicmljaHdvb2QiLCJhIjoiY2lscGJwcjZlMDAzbnk2bTAydDk4bzQ5ayJ9.mkDGtvQvg1SKYi0xanRBXQ';
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
    if (marker.geometry) {
      let anchor = "center";
      // create a DOM element for the marker
      let el = document.createElement('div');
      let cityName = document.createElement('div');
      cityName.innerHTML = marker.properties.name
      let img = document.createElement('img');
      img.style.width = '40px';
      img.style.height = '30px';
      if (marker.properties.hasOwnProperty("class")){
        console.log(marker.properties.class);
      // if (marker.properties.class){
        el.className = 'marker ' + marker.properties.class;
        img.src = "./img/compass_marker_icon-01.svg"
        anchor = "left";
        img.style.width = '20px';
      } else {
        el.className = 'marker';
        img.src = "./img/city_marker.svg"
      }
      // el.className = 'marker';
      el.appendChild(img)
      el.appendChild(cityName)

      el.addEventListener('click', function() {
        goTo(marker.properties.id)
      });

      // add marker to map
      new mapboxgl.Marker({element: el, anchor: anchor})
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);
      }
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
				'id': 6,
				'name': "Hanoi",
				'camera': {
					'zoom': 12.21,
					'pitch': 50,
					'speed': 1.2
				},
				"photos": [
					"hanoi_streets.webp",
					"moto2.webp",
          "hanoi_scoot.webp"
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
				'name': "Golf de Hanoi",
        "class": "second"
			},
			'geometry': {
				'type': 'Point',
				'coordinates': [105.832618, 21.055812]
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 8,
				'name': "Ninh Binh",
				'camera': {
					'bearing': -8.9,
					'zoom': 11.68,
					'speed': 1.2
				},
				"photos": [
					"ninh_binh_edited.webp",
          "ninh_binh_hostel.webp"
				]
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [105.931002, 20.237875],
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 8,
				'name': "Ninh Binh Valley Homestay",
        "class": "second",
				'camera': {
					'bearing': -8.9,
					'zoom': 11.68,
					'speed': 1.2
				}
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [105.923385, 20.239708],
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 10,
				'name': "Sentier dans les montagnes",
				"photos": [
					"three_pic.webp",
          "route_gravier.webp",
          "route_gravier02.webp"
				]
			},
		}, {
			'type': 'Feature',
			'properties': {
				'id': 12,
				'name': "Ha Giang",
				'camera': {
					'bearing': 25.3,
					'zoom': 11.5,
					'speed': 1.2
				},
				"photos": [
					"HG_bus_edited.webp",
					"IMAG0875.jpg",
          "guidon_panorama.webp",
          "ha_giang_panorama.webp"
				]
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [104.985588, 22.82633],
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 16,
				'name': "Dong Van",
				'camera': {
					'bearing': 25.3,
					'zoom': 11.5,
					'speed': 1.2
				},
				"photos": [
					"IMAG0875.jpg",
					"IMAG0875.jpg",
          "dong_van.webp",
          "dong_van02.webp",
          "dam.webp",
          "dam02.webp"
				]
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [105.362378, 23.278154]
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 18,
				'name': "Lũng Cú",
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
				'id': 20,
				'name': "Bảo Lạc",
				'camera': {
					'bearing': 25.3,
					'zoom': 11.5,
					'speed': 1.2
				},
        "photos": [
          "bao_lac.webp",
          "road.webp"
        ]
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [106.25780541993414, 22.665810782850087]
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 22,
				'name': "Ban Gioc",
				'camera': {
					'bearing': 25.3,
					'zoom': 11.5,
					'speed': 1.2,
				},
        "photos": [
          "ban_gioc_waterfall.webp",
          "bambou.webp"
        ]
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [106.72411777939311, 22.855185127386065]
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 26,
				'name': "Ba Bể Lake",
				'camera': {
					'bearing': 25.3,
					'zoom': 11.5,
					'speed': 1.2
				},
        "photos": [
          "bebe_lake_tower_eidted.jpg",
          "bebe_lake_edited.webp",
          "to_ba_be.webp",
          "to_ba_be02.webp",
          "tower.webp"
        ]
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [105.62146872103307, 22.405574239499998]
			}
		}, {
      'type': 'Feature',
      'properties': {
        'id': 26,
        'name': "Temple Đền An Mạ",
        "class": "second"
      },
      "geometry": {
        'type': 'Point',
        'coordinates': [105.615299, 22.411860]
      }
    }, {
			'type': 'Feature',
			'properties': {
				'id': 30,
				'name': "Da Nang",
				'camera': {
					'bearing': 25.3,
					'zoom': 11.5,
					'speed': 1.2
				},
        "photos": [
          "Saigon_max.webp"
        ]
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [108.258376, 16.023243]
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 30,
				'name': "Panorama de la presqu'ile",
        "class": "second"
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [108.318558, 16.131846]
			}
		}, {
			'type': 'Feature',
			'properties': {
				'id': 32,
				'name': "Sanctuaire de My son",
				'camera': {
					'bearing': 25.3,
					'zoom': 11.5,
					'speed': 1.2
				}
			},
			"geometry": {
				'type': 'Point',
				'coordinates': [108.110358, 15.773791]
			}
		}
	]
};