
var apiUrl = "https://api.openweathermap.org/data/3.0/onecall?lat="
var apiZip = "https://www.zipcodeapi.com/rest/TX2J9Xnq3aYEfV3MDpEVbQCURlkdld2efsztiSBQwfJSziQ9nWWVQ2Om1NNC7AGp/info.json/"
var lat=""
var lng=""

document.getElementById("SubmitButton").onclick=function(){
    var zipcode = document.getElementById("entered_zipcode").value;
    apiZip=apiZip+zipcode+"/degrees";
    fetch(apiZip)
    .then( (data) => {
        if(data.ok){
            return data.json()
        }
        throw new Error('Response not ok.'); 
    })
    .then( weather => generateCoordinates(weather))
    .catch( error => console.error('Error:', error))
}
const generateCoordinates = (data) => {
    lat=lat+data.lat;
    lng=lng+data.lng;
    apiUrl=apiUrl+lat+"&lon="+lng+"&appid=f9413ca2bb5b3e83137ae93830860f29&units=imperial";
    fetch(apiUrl)
    .then( (data) => {
        if(data.ok){
            return data.json()
        }
        throw new Error('Response not ok.'); 
    })
    .then( weather => displayWeather(weather))
    .catch( error => console.error('Error:', error))
}
const displayWeather = (data) => {
    const html = `
        <div class="details">
            <span>Timezone: ${data.timezone}</span><br>
            <span>Current Temperature: ${data.current.temp}</span>
        </div>
    `
    const weatherDiv = document.querySelector('.weather')
    weatherDiv.innerHTML = html
}