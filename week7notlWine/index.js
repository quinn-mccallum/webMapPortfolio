mapboxgl.accessToken = 'pk.eyJ1IjoidHFtIiwiYSI6ImNrNTg4dTB3MTBjMnYzbm15OG5kbG9kdm0ifQ.nKjtxAoUjFg0TGiCbYaHfA';
var map = new mapboxgl.Map({
  container: 'map', //container id in HTML
  style: 'mapbox://styles/tqm/ck76a7as10eof1ipcvyvy67w6', //stylesheet location
  center: [-79.2904789, 43.057688], // starting point, longitude/latitude
  zoom: 9.5 // starting zoom level
});

let hoveredStateId = null;

map.on('load', function() {

  map.addSource('wineries', {
    'type': 'vector',
    'url': 'mapbox://tqm.9645w8h1'
  });

  map.addLayer({
    'id': 'wineriesNotl',
    'type': 'circle',
    'source': 'wineries',
    'layout': {},
    'paint': {
      'circle-color': 'red',
      'circle-radius': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        12,
        6
      ],
    },
    'source-layer': "notl_wineries-9szuqi"
  });


});


map.on('mouseenter', 'wineriesNotl', function(e) {
  console.log(e.features)

  map.getCanvas().style.cursor = 'pointer';

  if(e.features.length > 0) {
    if(hoveredStateId) {
      map.setFeatureState(
        { source: 'wineries', id: hoveredStateId, sourceLayer: 'notl_wineries-9szuqi' },
        { hover: false }
      );
    }
    hoveredStateId = e.features[0].id;
    map.setFeatureState(
      { source: 'wineries', id: hoveredStateId, sourceLayer: 'notl_wineries-9szuqi' },
      { hover: true }
    );
  }
});

map.on('mouseleave', 'wineriesNotl', (e) => {
  map.getCanvas().style.cursor = '';

  if(hoveredStateId) {
    map.setFeatureState(
      { source: 'wineries', id: hoveredStateId, sourceLayer: 'notl_wineries-9szuqi' },
      { hover: false }
    );
  }
  hoveredStateId = null;
});

map.on('click', 'wineriesNotl', (e) => {
  console.log(e.features[0]);

  let name = e.features[0].properties.Wineries
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(name)
      .addTo(map);
});

var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');
