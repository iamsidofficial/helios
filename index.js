let latText = document.getElementById('latitude');
let longText = document.getElementById('longitude');
let speedText = document.getElementById('speed');
let timeText = document.getElementById('time');
let altitudeText = document.getElementById('altitude');
let visibilityText = document.getElementById('visibility');
let lat = 51.505;
let long = -0.09;
let zoomLevel = 2;

const icon = L.icon({
    iconUrl: './space2.png',
    iconSize: [80, 60],
    iconAnchor: [25, 94],
    popupAnchor: [20, -86]
  });

const map = L.map('map-div',  { attributionControl:false }).setView([lat, long], zoomLevel);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 30,
  id: 'siddharthraj/ckgp7gke825el19odvceegd3o',
  tileSize: 512,
  zoomOffset: -1,
  noWrap: false,

  accessToken: 'pk.eyJ1Ijoic2lkZGhhcnRocmFqIiwiYSI6ImNrZ3A2bDR6ejA3NmsyeHRkc2lwb3h5Nm4ifQ.RchD-9rj9iRPiHgO9w_ZEA'
}).addTo(map);

const marker = L.marker([lat, long], { icon: icon }).addTo(map);

function updateInfo() {

    fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then(res => res.json())
    .then(character => {
        
        lat = character.longitude.toFixed(2);
        long = character.latitude.toFixed(2);
        latText.innerHTML = `<p> ${character.latitude.toFixed(2)} </p>`
        longText.innerHTML = `<p> ${character.longitude.toFixed(2)} </p>`
        timeText.innerHTML = `<p>${new Date(character.timestamp * 1000).toUTCString()}</p>`
        altitudeText.innerHTML = `<p> ${character.altitude.toFixed(2)} </p>`
        visibilityText.innerHTML = `<p> ${character.visibility} </p>`
        speedText.innerHTML = `<p> ${character.velocity.toFixed(2)} km/hr</p>`

        marker.setLatLng([lat, long]);
        map.setView([lat, long]);
    })
}

updateInfo();

setInterval(function(){ updateInfo(); }, 3000);