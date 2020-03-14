mapboxgl.accessToken = 'pk.eyJ1IjoidHFtIiwiYSI6ImNrNTg4dTB3MTBjMnYzbm15OG5kbG9kdm0ifQ.nKjtxAoUjFg0TGiCbYaHfA';
var map = new mapboxgl.Map({
  container: 'map', //container id in HTML
  style: 'mapbox://styles/tqm/ck7qshr2q0sme1imy7eycb1bh', //stylesheet location
  center: [-79.32, 43.72], // starting point, longitude/latitude
  zoom: 10.5 // starting zoom level
});

map.on('load', () => {

  map.addSource('popTor', {
    'type': 'vector',
    'url': 'mapbox://tqm.try-tiles'
  });

  map.addSource('denseTor', {
    'type': 'vector',
    'url': 'mapbox://tqm.hello-toronto-density'
  });

  map.addLayer({
    'id': 'pop',
    'type': 'fill',
    'source': 'popTor',
    'layout': {
      'visibility': 'visible'
    },
    'paint': {
      "fill-color": [
        'interpolate',
        ['linear'],
        ['to-number', ['get', 'EUhg3n3MSze_data_COL1'], 0], // get a number, but if provided with a non-number default to 0
        0, '#ffffff',
        423, '#fff9fe',
        508, '#ffebfc',
        609, '#ffcef8',
        888, '#ffaff4'
      ],
      "fill-opacity": 0.8,
      "fill-outline-color": 'white'
    },
    'source-layer': 'hello_world'
  });

  map.addLayer({
    'id': 'dense',
    'type': 'fill',
    'source': 'denseTor',
    'layout': {
      'visibility': 'none'
    },
    "paint": {
      "fill-color": [
        'interpolate',
      ['linear'],
      ['to-number', ['get', 'popDensityToronto_data_COL1'], 0],
      0, '#ffffff',
      3213, '#fff9fe',
      4929, '#ffebfc',
      7451, '#ffcef8',
      11170, '#ffaff4'
      ],
      'fill-opacity': 0.8,
      'fill-outline-color': '#fff'
    },
    'source-layer': 'hello-toronto-density'
  });


  map.on('click', 'pop', function(e){
    var features = map.queryRenderedFeatures(e.point);
    // console.log(features[0].geometry.coordinates[0])

    let shorty = e.features[0].properties
    let poly = turf.polygon([features[0].geometry.coordinates[0]])
    let area = turf.area(poly).toFixed(2)
    let areakm = (area / 1000000).toFixed(2)
    let popDense = shorty.EUhg3n3MSze_data_COL1 / (area / 1000000)
    let popDensity = (popDense).toFixed(1)
    let link =
    console.log(popDensity)

    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h1>Population of Dissemation Areas</h1><br/>' + '<strong>Dissemation Area ID: </strong>' + shorty.DAUID + ' <br/> ' + '<strong>Population: </strong>'+ shorty.EUhg3n3MSze_data_COL1 + ' <br/> ' + '<strong>Area</strong>: ' + areakm + ' km2 <br/> <strong>Population Density: </strong>' + popDensity + ' people/km2<br/><strong>Link: </strong>' + '<a href=http://google.ca>Google</a>')
      .addTo(map);
  });

  map.on('mouseenter', 'pop', function() {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'pop', function() {
    map.getCanvas().style.cursor = '';
  });

  map.on('click', 'dense', function(e){
    var features = map.queryRenderedFeatures(e.point);
    console.log(features)

    let shorty = e.features[0].properties
    let poly = turf.polygon([features[0].geometry.coordinates[0]])
    let area = turf.area(poly)
    let areakm = (area / 1000000)
    let pop = shorty.popDensityToronto_data_COL1 * (areakm)
    let totalPop = (pop).toFixed(0)


    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('<h1>Population of Dissemation Areas</h1><br/>' + '<strong>Dissemation Area ID: </strong>' + shorty.DAUID + ' <br/> ' + '<strong>Population: </strong>'+ totalPop + ' <br/> ' + '<strong>Area</strong>: ' + areakm.toFixed(2) + ' km2 <br/> <strong>Population Density: </strong>' + shorty.popDensityToronto_data_COL1 + ' people/km2<br/><strong>Link: </strong>' + '<a href=http://google.ca>Google</a>')
      .addTo(map);
  });

  map.on('mouseenter', 'dense', function() {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'dense', function() {
    map.getCanvas().style.cursor = '';
  });

});


var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');


function toggleMap(name) {
  if (name === 'pop') {
    map.setLayoutProperty('pop', 'visibility', 'visible');
    map.setLayoutProperty('dense', 'visibility', 'none');
    document.getElementById('popLegend').style.display = 'inline-block';
    document.getElementById('denseLegend').style.display = 'none';
  } else {
    map.setLayoutProperty('dense', 'visibility', 'visible');
    map.setLayoutProperty('pop', 'visibility', 'none');
    document.getElementById('popLegend').style.display = 'none';
    document.getElementById('denseLegend').style.display = 'inline-block';
  }
};
