let latText = document.getElementById('latitude');
let longText = document.getElementById('longitude');
let speedText = document.getElementById('speed');
let timeText = document.getElementById('time');
let altitudeText = document.getElementById('altitude');
let visibilityText = document.getElementById('visibility');
let lat = 48.505;
let long = 2.09;
let zoomLevel = 4;

let json1 = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [0.0, 10.1]
    },
    "properties": {
      "name": "Dinagat Islands"
    }
  };

mapboxgl.accessToken = 'pk.eyJ1Ijoic2lkZGhhcnRocmFqIiwiYSI6ImNrZ3A2bDR6ejA3NmsyeHRkc2lwb3h5Nm4ifQ.RchD-9rj9iRPiHgO9w_ZEA';
var map = new mapboxgl.Map({
container: 'map-div',
style: 'mapbox://styles/mapbox/dark-v10',
center: [lat, long],
zoom: 5
});


var url = 'https://api.wheretheiss.at/v1/satellites/25544';
map.on('load', function () {
var request = new XMLHttpRequest();
window.setInterval(function () {
// make a GET request to parse the GeoJSON at the url
request.open('GET', url, true);
request.onload = function () {
if (this.status >= 200 && this.status < 400) {
// retrieve the JSON from the response
var character = JSON.parse(this.response);
lat = character.longitude.toFixed(2);
long = character.latitude.toFixed(2);
latText.innerHTML = `<p> ${character.latitude.toFixed(2)} </p>`
longText.innerHTML = `<p> ${character.longitude.toFixed(2)} </p>`
timeText.innerHTML = `<p>${new Date(character.timestamp * 1000).toUTCString()}</p>`
altitudeText.innerHTML = `<p> ${character.altitude.toFixed(2)} </p>`
visibilityText.innerHTML = `<p> ${character.visibility} </p>`
speedText.innerHTML = `<p> ${character.velocity.toFixed(2)} km/hr</p>`
var json1 = {"geometry": {"type": "Point", "coordinates": [149.3293629818572, -49.10781621585451]}, "type": "Feature", "properties": {}};

json1.geometry.coordinates = [lat,long]
// update the drone symbol's location on the map
map.getSource('drone').setData(json1);
 
// fly the map to the drone's current location
map.flyTo({
center: json1.geometry.coordinates,
speed: 0.5
});
}
};
request.send();
}, 3000);
 
map.addSource('drone', { type: 'geojson', data: {"geometry": {"type": "Point", "coordinates": [48.3293629818572, 2.10781621585451]}, "type": "Feature", "properties": {}}
});
map.addLayer({
'id': 'drone',
'type': 'symbol',
'source': 'drone',
'layout': {
'icon-image': 'rocket-15'
}
});
});

