"use strict";
////////////////////// NIVELL 1
const HEADERS = {
  headers: {
    Accept: "application/json",
  },
};
let currentJoke;
let callChuckNorris = false;
function getICanHazDadJoke() {
  fetch("https://icanhazdadjoke.com", HEADERS)
    .then((res) => res.json())
    .then((data) => {
      resetRating();
      currentJoke = data;
      document.getElementById("joke-text").innerHTML = `${data.joke}`;
      return data.joke;
    });
}
function getJoke() {
  if (callChuckNorris) {
    getJokeChuckNorris();
  } else {
    getICanHazDadJoke();
  }
  callChuckNorris = !callChuckNorris;
}
let reportJokes = [];
//To get the IdJoke
function reportSatisfaction(n) {
  reportJokes.push({ joke: currentJoke.id, score: n, date: new Date().toISOString() });
  console.log("ReportJokes:", reportJokes);
}
// To access the stars
let stars = document.getElementsByClassName("fa fa-star");
// Funtion to update rating
function rateJoke(n) {
  resetRating();
  for (let i = 0; i < n; i++) {
    if (i < n) {
      stars[i].classList.add("checked");
    }
  }
  reportSatisfaction(n);
}

// To remove the pre-applied styling
function resetRating() {
  let i = 0;
  while (i < 3) {
    stars[i].className = "fa fa-star";
    i++;
  }
}
////////////////////// NIVELL 2
function weatherForecastApi() {
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&current=temperature_2m,relative_humidity_2m,precipitation,rain,wind_speed_10m,wind_direction_10m",
    HEADERS
  )
    .then((res) => res.json())
    .then((data) => {
      createWeatherForecast(data);
    });
}
function createWeatherForecast(weather) {
  const currentWeather = weather.current;
  const currentUnitsWeather = weather.current_units;
  const weatherForecastContainer = document.getElementById("weatherForecastContainer");
  if (weatherForecastContainer) {
    weatherForecastContainer.textContent = `Temperatura d'avui: ${currentWeather.temperature_2m}${currentUnitsWeather.temperature_2m}`;
  }
}
weatherForecastApi();
function getJokeChuckNorris() {
  fetch("https://api.chucknorris.io/jokes/random", HEADERS)
    .then((res) => res.json())
    .then((data) => {
      resetRating();
      const joke = { id: data.id, joke: data.value };
      currentJoke = joke;
      document.getElementById("joke-text").innerHTML = `${data.value}`;
    });
}
