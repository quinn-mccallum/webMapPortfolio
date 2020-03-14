mapboxgl.baseApiUrl = 'https://api.mapbox.com';
mapboxgl.accessToken = 'pk.eyJ1IjoidHFtIiwiYSI6ImNrNTg4dTB3MTBjMnYzbm15OG5kbG9kdm0ifQ.nKjtxAoUjFg0TGiCbYaHfA';
var map = new mapboxgl.Map({
   container: 'map',  //container id in HTML
   style: 'mapbox://styles/tqm/ck7qvubgf1mjg1iqxczqs19et',  //stylesheet location
   center: [-79.3753, 43.7],  // starting point, longitude/latitude
   zoom: 11 // starting zoom level
});

map.on('load', function(){

  map.addSource('supermarketsGeojsonData', {
    'type': 'vector',
    'url': 'mapbox://tqm.9cvovxov'
  });

  map.addSource('routeToSchoolGeojsonData', {
    'type': 'vector',
    'url': 'mapbox://tqm.468fbb9q'
  });

  map.addSource('homeAndSchoolPoints', {
    'type': 'vector',
    'url': 'mapbox://tqm.ah9mgrhx'
  });

  map.addLayer({
    'id': 'supermarketsLayer',
    'type': 'circle',
    'source': 'supermarketsGeojsonData',
    'layout': {},
    'paint': {
      'circle-color': 'black',
      'circle-radius': 5
    },
    'source-layer': 'supermarkets-1xu504'
  });

  map.addLayer({
    'id': 'routeToSchoolLayer',
    'type': 'line',
    'source': 'routeToSchoolGeojsonData',
    'layout': {},
    'paint': {
      'line-color': '#ffcc00',
      'line-width': 2,
      'line-opacity': 0.9
    },
    'source-layer': 'routeToSchool-3kbbiy'
  });

  map.addLayer({
    'id': 'routeToSchoolPoints',
    'type': 'circle',
    'source': 'homeAndSchoolPoints',
    'layout': {},
    'paint': {
      'circle-color': '#ffcc00',
      'circle-radius': 5,
    },
    'source-layer': 'routeToSchool-6wo722'
  })

});

map.on('click', )

map.addControl(new mapboxgl.NavigationControl());
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);
