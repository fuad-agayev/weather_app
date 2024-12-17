"use strict";
const input_search = document.getElementById("inputSearch");
const city_name = document.getElementById("cityName");
const weather_temperature = document.getElementById("weatherTemperature");
const wea_error = document.getElementById("weaErr");
const figcaption_span = document.getElementById("figcaptionSpan");
const _weatherdescriptions = document.getElementById("weatherDescriptions");
const _clouds = document.getElementById("clouds");
const _humidity = document.getElementById("humidity");
const _pressure = document.getElementById("pressure");
const _form = document.querySelector("form");
const weatherSearch = (city) => {
    const useApi = '7a732188ba61587258ee32127f9a3f8f';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${useApi}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        if (data.cod == 200) {
            const figcaption = city_name.querySelector('figcaption');
            const imj = city_name.querySelector('img');
            const tempeImj = weather_temperature.querySelector('img');
            figcaption.innerText = data.name;
            imj.src = `https://flagsapi.com/${data.sys.country}/flat/32.png`;
            tempeImj.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
            figcaption_span.innerText = data.main.temp.toFixed() + "°C";
            _weatherdescriptions.innerText = data.weather[0].description;
            _clouds.innerText = data.clouds.all;
            _humidity.innerText = data.main.humidity;
            _pressure.innerText = data.main.pressure;
        }
        else {
            wea_error.innerText = "City is not found !";
            console.log("Hata olusdu:");
        }
    });
};
_form.addEventListener("submit", (event) => {
    event.preventDefault();
    const citi = input_search.value.trim();
    if (citi !== "") {
        weatherSearch(citi);
        input_search.value = "";
        wea_error.innerText = "";
    }
    else {
        wea_error.innerText = "Please enter a city name !";
    }
});
const weatherEnd = () => {
    weatherSearch("Helsinki");
};
weatherEnd();
