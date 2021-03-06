function formatDate (timestamp){
let date  = new Date(timestamp);
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let day = days[date.getDay()];

    return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

function displayTemperature(response){

    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemp = response.data.main.temp;


    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response){
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = null;

for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
        <h3>
            ${formatHours(forecast.dt * 1000)}
        </h3>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="">
        <div class="weather-forecast-temperature">
            ${Math.round(forecast.main.temp_min)}º - ${Math.round(forecast.main.temp_max)}º
        </div>
    </div>
    `; 
}   
}

function search(city){
    let apiKey = "dffc8c427a5c5c2e6c671ca095897824";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function handleSubmit (event){
event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheitTemp(event){
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");

fahrenheitLink.classList.add("active");
celsiusLink.classList.remove("active");

let fahrenheitTemperature = Math.round((celsiusTemp * 9 / 50) + 32);
    temperatureElement.innerHTML = fahrenheitTemperature;

} 

 function displayCelsiusTemp(event){
 event.preventDefault();
     let temperatureElement = document.querySelector("#temperature");

     celsiusLink.classList.add("active");
     fahrenheitLink.classList.remove("active");

     temperatureElement.innerHTML = Math.round(celsiusTemp);
 }

let celsiusTemp = null;

let form= document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search ("Porto");

