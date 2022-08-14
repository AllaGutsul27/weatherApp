   //----- Date ------//
let now = new Date();

let week = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday","Friday","Saturday"];
let day = week[now.getDay()];
let date = now.getDate();

let months = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[now.getMonth()];
let year = now.getFullYear();

let minutes = now.getMinutes();
if (minutes < 10) {
    minutes = "0" + minutes;
}
let hours = now.getHours();
if (hours < 10) {
    hours = "0" + hours;
}

let h4 = document.querySelector("h4");
h4.innerHTML = `${hours}:${minutes}, ${day} ${month} ${date}, ${year}`;
      


//----- Зміна міста (головного) і температури ------//

function showTemperature(response) {
    console.log(response);
    celsiusTemperature = Math.round(response.data.main.temp);
    let degrees = document.querySelector(".search-degrees");
    degrees.innerHTML = Math.round(celsiusTemperature);
    let humidity = document.querySelector(".humidity-value");
    humidity.innerHTML = response.data.main.humidity;
    let wind = document.querySelector(".wind-value");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `/images/${response.data.weather[0].icon}.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(event) {
    event.preventDefault();
    let inputSearch = document.querySelector("#input-search");
    let searchCity = document.querySelector(".search-city");
    let inputSearchValue = inputSearch.value;
    searchCity.innerHTML = inputSearchValue;

    let apiKey = "28b89a027ca36429077890b9084e664e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputSearchValue}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let formSearch = document.querySelector("#form-search");
formSearch.addEventListener("submit", search);



// //----- Температура за поточним місцем знаходження (кнопка Current) ------//
function showTemperatureCurrent(response) {
    let inputSearch = document.querySelector("#input-search");
    inputSearch.value = response.data.name;
    
    console.log(response)
    celsiusTemperature = Math.round(response.data.main.temp); 

    let degrees = document.querySelector(".search-degrees");
    degrees.innerHTML = Math.round(celsiusTemperature);


    let searchCity = document.querySelector(".search-city");
    searchCity.innerHTML = response.data.name;

    let wind = document.querySelector(".wind-value");
    wind.innerHTML = Math.round(response.data.wind.speed);
    let humidity = document.querySelector(".humidity-value");
    humidity.innerHTML = response.data.main.humidity;

    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `/images/${response.data.weather[0].icon}.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "28b89a027ca36429077890b9084e664e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperatureCurrent);
}

function getCurrentLocation(event) {
    event.preventDefault;
    navigator.geolocation.getCurrentPosition(showPosition);
}

let current = document.querySelector("#current");
current.addEventListener("click", getCurrentLocation);
    

//------Unit conversion-------//

function showTemperatureFahrenheit(event) {
    event.preventDefault();
    let degrees = document.querySelector(".search-degrees");
    let fahrenheitTemperature = Math.round(celsiusTemperature * 1.8 + 32);
    degrees.innerHTML = fahrenheitTemperature;
    fahrenheit.classList.add("active");
    celsius.classList.remove("active");
    
}

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", showTemperatureFahrenheit);

let celsiusTemperature;

function showTemperatureCelsius(event) {
    event.preventDefault();
    let degrees = document.querySelector(".search-degrees");
    degrees.innerHTML = celsiusTemperature;
    fahrenheit.classList.remove("active");
    celsius.classList.add("active");
}

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", showTemperatureCelsius);





