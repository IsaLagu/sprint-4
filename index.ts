////////////////////// NIVELL 1
const HEADERS = {
  headers: {
    Accept: "application/json",
  },
};

interface Joke {
  id: string;
  joke: string;
}

let currentJoke: Joke;
let callChuckNorris: boolean = false;

function getICanHazDadJoke(): void {
  fetch("https://icanhazdadjoke.com", HEADERS)
  .then((res: Response) => res.json())
  .then((data: Joke) => {
    resetRating();
    currentJoke = data;
    document.getElementById("joke-text")!.innerHTML = `${data.joke}`;
    return data.joke;
  });
}

function getJoke(): void {
  if(callChuckNorris) {
    getJokeChuckNorris();
  } else {
    getICanHazDadJoke();
  }

  callChuckNorris = !callChuckNorris;
}

interface ReportJoke {
  joke: string;
  score: number;
  date: string;
}

let reportJokes: ReportJoke[] = [];

//To get the IdJoke
function reportSatisfaction(n: number): void {
  reportJokes.push({joke: currentJoke.id, score: n, date: (new Date()).toISOString()});
  console.log('ReportJokes:', reportJokes);
}

// To access the stars
let stars = document.getElementsByClassName("fa fa-star") as HTMLCollectionOf<HTMLElement>;

// Funtion to update rating
function rateJoke(n: number): void {
  resetRating();
  for (let i = 0; i < n; i++) {
    if (i < n) {
      stars[i].classList.add("checked");
    }
  }
  reportSatisfaction(n);
}
console.log(`$rating {rating}`)

// To remove the pre-applied styling
function resetRating(): void {
  let i = 0;
  while (i < 3) {
    stars[i].className = "fa fa-star";
    i++;
  }
}

////////////////////// NIVELL 2
function weatherForecastApi(): void {
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=2.159&current=temperature_2m,relative_humidity_2m,precipitation,rain,wind_speed_10m,wind_direction_10m",
    HEADERS
  )
    .then((res: Response) => res.json())
    .then((data: any) => {
      createWeatherForecast(data);
    });
}

function createWeatherForecast(weather: any): void {
  const currentWeather = weather.current;
  const currentUnitsWeather = weather.current_units;
  const weatherForecastContainer = document.getElementById("weatherForecastContainer");
  if(weatherForecastContainer) {
    weatherForecastContainer.textContent = `Temperatura d'avui: ${currentWeather.temperature_2m}${currentUnitsWeather.temperature_2m}`;
  }
}
weatherForecastApi();

function getJokeChuckNorris(): void {
  fetch("https://api.chucknorris.io/jokes/random", HEADERS)
    .then((res: Response) => res.json())
    .then((data: any) => {
      resetRating();
      const joke: Joke = {id: data.id, joke: data.value};
      currentJoke = joke;
      document.getElementById("joke-text")!.innerHTML = `${data.value}`;
    });
}


