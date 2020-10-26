let latText = document.getElementById('latitude');
let longText = document.getElementById('longitude');
let speedText = document.getElementById('speed');
let timeText = document.getElementById('time');
let altitudeText = document.getElementById('altitude');
let visibilityText = document.getElementById('visibility');

function updateInfo() {

    fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then(res => res.json())
    .then(character => {
        latText.innerHTML = `<p> ${character.latitude.toFixed(2)} </p>`
        longText.innerHTML = `<p> ${character.longitude.toFixed(2)} </p>`
        timeText.innerHTML = `<p>${new Date(character.timestamp * 1000).toUTCString()}</p>`
        altitudeText.innerHTML = `<p> ${character.altitude.toFixed(2)} </p>`
        visibilityText.innerHTML = `<p> ${character.visibility} </p>`
        speedText.innerHTML = `<p> ${character.velocity.toFixed(2)} km/hr</p>`
    })
}

updateInfo();
setInterval(function(){ updateInfo(); }, 2000);
