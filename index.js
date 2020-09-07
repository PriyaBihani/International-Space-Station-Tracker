 //First it is going to make a map with a blank grey box in the line 2 then next line onwards it will start making tiles only when it is connected to the leaflet.js library through internet 
 // TO avoid the default marker icon we are gonna create a default marker icon in line 12th onwards. Then we are gonna set initial marker lat lon and icon and add to map and store it in a variable  
 const mymap = L.map('issMap').setView([0, 0], 1);
// Getting the map from leaflert api and setting tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

//Making a marker with a icon
var issIcon = L.icon({
    iconUrl: 'iss200.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});

const marker =  L.marker([0, 0],{icon: issIcon}).addTo(mymap);// just telling the marker where it is going to be placed in the map
 
//ISS is obviously a fake api but great for learning. Here we grab the data from this api and set the lat lon on the map
// Fetch will fetch the data from the url and convert it to readable format and set the view and display lat lon
// Respective function has been set to control the zoom level of map when it loads for the first time and others 
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'
let firstTime= true

async function getData(){

   const response = await fetch(api_url)// fetching data from an api
   const data = await response.json()// converting into a readable format
   const {latitude, longitude} = data 
   if (firstTime){
   mymap.setView([latitude,longitude], 2)
     firstTime = false
   }
   marker.setLatLng([latitude,longitude])
   document.getElementById('lat').textContent= latitude.toFixed(2)
   document.getElementById('lon').textContent= longitude.toFixed(2)
 
}
 getData()
 setInterval(getData,2000)
