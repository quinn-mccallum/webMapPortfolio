mapboxgl.baseApiUrl = 'https://api.mapbox.com';
mapboxgl.accessToken = 'pk.eyJ1IjoidHFtIiwiYSI6ImNrNTg4dTB3MTBjMnYzbm15OG5kbG9kdm0ifQ.nKjtxAoUjFg0TGiCbYaHfA';
var map = new mapboxgl.Map({
   container: 'map',  //container id in HTML
   style: 'mapbox://styles/tqm/ck62cw6e00xxj1ip4oqd8ppc7',  //stylesheet location
   center: [-79.3753, 43.65696],  // starting point, longitude/latitude
   zoom: 11 // starting zoom level
});

map.on('load', function(){

  map.addSource('supermarketsGeojsonData', {
    'type': 'geojson',
    'data': './supermarkets.geojson'
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
      'circle-color': 'pink',
      'circle-radius': 10
    }
  });

  map.addLayer({
    'id': 'routeToSchoolLayer',
    'type': 'line',
    'source': 'routeToSchoolGeojsonData',
    'layout': {},
    'paint': {
      'line-color': 'blue',
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
      'circle-color': 'blue',
      'circle-radius': 10,
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
