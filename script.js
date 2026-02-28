const apiKey = "0925d79f8fd7954586d3321d439c7b0f";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?";
const geoUrl = "https://api.openweathermap.org/geo/1.0/direct?";
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(lat, lon) {
    const response = await fetch(weatherUrl + `lat=${lat}` + `&lon=${lon}` + `&appid=${apiKey}` + `&units=metric` + `&lang=en`);

    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
    if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    }
    else if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    }
    else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    }
    else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    }

}


async function getCoordinates(city) {
    const response = await fetch(geoUrl + `q=${city}` + `&limit=1` + `&appid=${apiKey}`);
    var data = await response.json();

    lat = data[0].lat;
    lon = data[0].lon;

    checkWeather(lat, lon);

    //console.log(data);
}


searchButton.addEventListener("click", ()=>{
    getCoordinates(searchInput.value);
})

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getCoordinates(searchInput.value);
    }
});

window.addEventListener('load', () => {
    getCoordinates('Rome');
});