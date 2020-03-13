
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2dyNDcyc3VwZXJhd2Vzb21lY29vbGdyb3VwIiwiYSI6ImNrN250cm1seTAyODIzZmptcW9iazZ5OXYifQ.OlkcC2IwNkLMVEuzloHkAA';
var map = new mapboxgl.Map({
  container: 'map', //container id in HTML
  style: 'mapbox://styles/ggr472superawesomecoolgroup/ck7ntu49g0v0u1iqpcjg77w0m', //stylesheet location
  center: [-79.3753, 43.71555], // starting point, longitude/latitude
  zoom: 10.5 // starting zoom level
});


map.on('load', ()=> {
  map.addSource('neighbourhoodsToronto', {
    'type': 'vector',
    'url': 'mapbox://ggr472superawesomecoolgroup.4fne8bjm'
  });

  map.addLayer({
    'id': 'neighbourhoodsFill',
    'type': 'fill',
    'source': 'neighbourhoodsToronto',
    'layout': {},
    'paint': {
      'fill-color': 'white',
      'fill-opacity': 0,
    },
    'source-layer': 'Neighbourhoods-40wgft'
  });

  map.addLayer({
    'id': 'neighbourhoodsLine',
    'type': 'line',
    'source': 'neighbourhoodsToronto',
    'layout': {},
    'paint': {
      'line-color': 'white'
    },
    'source-layer': 'Neighbourhoods-40wgft'
  });

});

map.on('click', 'neighbourhoodsFill', (e)=> {
  let neighbourhoodName = e.features[0].properties.AREA_NAME
  console.log(e.features[0].properties)
  neighbourhoodName = neighbourhoodName.toString();
  let indexToSlice = neighbourhoodName.indexOf('(')
  neighbourhoodName = neighbourhoodName.slice(0, indexToSlice)
  console.log(neighbourhoodName)

  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML("<strong>" + neighbourhoodName + '</strong>')
    .addTo(map);
});

map.on('mouseenter', 'neighbourhoodsFill', function() {
  map.getCanvas().style.cursor = 'pointer';
});

map.on('mouseleave', 'neighbourhoodsFill', function() {
  map.getCanvas().style.cursor = '';
});


var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');

map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);
