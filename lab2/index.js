mapboxgl.accessToken = 'pk.eyJ1IjoidHFtIiwiYSI6ImNrNTg4dTB3MTBjMnYzbm15OG5kbG9kdm0ifQ.nKjtxAoUjFg0TGiCbYaHfA';
var map = new mapboxgl.Map({
  container: 'map', //container id in HTML
  style: 'mapbox://styles/tqm/ck7qtpv8l1jzp1io1ni5q2b56', //stylesheet location
  center: [-79.3753, 43.71777], // starting point, longitude/latitude
  zoom: 10.25 // starting zoom level
});

map.on('load', function() {

  map.addSource('policeStationsToronto', {
    'type': 'geojson',
    'data': 'https://opendata.arcgis.com/datasets/d8ad1ca539bd451cb15c99fb487d2bdf_0.geojson'
  });

  map.addSource('neighbourhoodCrimeRatesToronto', {
    'type': 'vector',
    'url': 'mapbox://tqm.9wlv155e'
  });

  map.addSource('neighbourhoodCrimeStats', {
    'type': 'geojson',
    'data': 'https://opendata.arcgis.com/datasets/af500b5abb7240399853b35a2362d0c0_0.geojson'
  })

  map.addSource('policeDivisionsToronto', {
    'type': 'geojson',
    'data': 'https://opendata.arcgis.com/datasets/43ef8c93684f44a78eade66b3350ce9f_0.geojson'
  });

  map.addLayer({
    'id': 'crimeRatesFill',
    'type': 'fill',
    'source': 'neighbourhoodCrimeRatesToronto',
    'layout': {},
    'paint': {
      'fill-color': {
        property: 'Breakand_5',
        stops: [
          [22, '#ffffff'],
          [44, '#ececec'],
          [66, '#c8c8c8'],
          [88, '#a2a2a2'],
          [110, '#898989'],
          [132, '#7d7d7c'],
          [154, '#717171'],
          [176, '#656565'],
          [198, '#595959'],
          [220, '#4e4e4e']
        ]
      },
      'fill-opacity': 0.8
    },
    'source-layer': 'Neighbourhood_Crime_Rates_Bou-4sx3fc'
  });

  map.addLayer({
    'id': 'crimeRatesBorders',
    'type': 'line',
    'source': 'neighbourhoodCrimeRatesToronto',
    'layout': {},
    'paint': {
      'line-color': 'black',
      'line-width': 2
    },
    'source-layer': 'Neighbourhood_Crime_Rates_Bou-4sx3fc'
  });

  map.addLayer({
    'id': 'policeDivisions',
    'type': 'line',
    'source': 'policeDivisionsToronto',
    'layout': {},
    'paint': {
      'line-color': '#ffd52e',
      'line-width': 3
    }
  });

  map.addLayer({
    'id': 'stats',
    'type': 'fill',
    'source': 'neighbourhoodCrimeStats',
    'layout': {},
    'paint': {
      'fill-color': '#fff',
      'fill-opacity': 0,
    }
  });

  map.addLayer({
    'id': 'policeStations',
    'type': 'circle',
    'source': 'policeStationsToronto',
    'layout': {},
    'paint': {
      'circle-color': '#ffd52e',
      'circle-radius': 7,
      'circle-stroke-color': 'black',
      'circle-stroke-width': 2
    }
  });

  map.on('click', 'stats', function(e){
    console.log(e.features[0].properties)
    let shorty = e.features[0].properties
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML('Neighbourhood: ' + shorty.Neighbourhood + '. <br/> ' + 'Avg Break and Enters, 2014-18: '+ shorty.BreakandEnter_AVG)
      .addTo(map);
  });

  map.on('mouseenter', 'stats', function() {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'stats', function() {
    map.getCanvas().style.cursor = '';
  });


});

map.addControl(new mapboxgl.NavigationControl());
