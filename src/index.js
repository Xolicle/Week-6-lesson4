let apiKey = "9cb72bec958f8fb02391985ed7b219d2";
let date = new Date();
let  currentDate = date.toDateString();
let time = date.toLocaleTimeString();

function dateAndTime(){
    let day = document.querySelector('#current-date');
    day.innerHTML = `${currentDate} ${time}`;
}

function searchCity(){
    let city = document.querySelector('#city');
    let citySearch = document.querySelector('#city-search');
    city.innerHTML = citySearch.value;
    searchLoc();
    
}

// function celsiusToFahrenheit(){
//     let fahrenheitDegree = (19 * 9/5)+32;
//     fahrenheitDegree = Math.round(fahrenheitDegree);
//     let temperatureF = document.querySelector('#temp');
//     temperatureF.innerHTML =`${fahrenheitDegree}`;
//     let deleteCelsius = document.querySelector('#celsius');
//     deleteCelsius.innerHTML = '';
// }
// function fahrenheitToCelsius(){
//     let celsiusDegree = (66 - 32) *5/9;
//     celsiusDegree = Math.round(celsiusDegree);
//     let temperatureC = document.querySelector('#temp');
//     temperatureC.innerHTML =`${celsiusDegree}`;
//     let deleteFahrenheit = document.querySelector('#farenheit');
//     deleteFahrenheit.innerHTML = '';
// }
function displayWeather(response){
    let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector('#temp');
    temp.innerHTML = `${temperature}°C`;
    let currentDec = response.data.weather[0].description;
    let dec = document.querySelector('#weather-description');
    let weatherIcon = response.data.weather[0].icon;
    dec.innerHTML =`<img src="https://openweathermap.org/img/wn/${weatherIcon}.png" >${currentDec}`;

}
function searchLoc(){
    let citySearch = document.querySelector('#city-search');
    let city = citySearch.value;
    let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(cityUrl).then(displayWeather);
}
function currentLocation(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(displayWeather);
}
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(currentLocation);
    } else {
        alert("Your browser doesn't support this feature");
    }
}
dateAndTime();
let cityBtn = document.querySelector('.search-btn');
cityBtn.addEventListener("click", searchCity);
let currentBtn = document.querySelector('.current-btn');
currentBtn.addEventListener("click", getLocation);
// let fahrenheitBtn = document.querySelector('#farenheit');
// fahrenheitBtn.addEventListener("click", celsiusToFahrenheit);
// let celsiusBtn = document.querySelector('#celsius');
// celsiusBtn.addEventListener("click", fahrenheitToCelsius);