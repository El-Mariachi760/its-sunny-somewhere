var userFormEl = document.querySelector("#user-form");
var cityNameInputEl = document.querySelector("#cityname");
var forecastContainerEl = document.querySelector("#forecast-list");
var historyBtnEl = document.querySelector("#search-history");

var cities = [];

const apiKey = "a6959ba338d5d0ca6b0761173a65f092";

var formSubmitHandler = function(event) {
    event.preventDefault();
  
    // get value from input element
    var cityName = cityNameInputEl.value;
  
    if (cityName) {
      getWeather(cityName);
      get5Day(cityName);
      cityNameInputEl.value = "";
    } else {
      alert("Please enter City Name")
    }
    saveCity(cityName);
    searchHistory(cityName);
};

var saveCity = function(cityName) {
  localStorage.setItem("cities", JSON.stringify(cityName));
};

var getWeather = function(cityName) {
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&q=${cityName}&appid=${apiKey}`
  console.log(apiURL);
  fetch(apiURL)
  .then(response => response.json())
  .then(data => {
      var nameValue = data['name'];
      var tempValue = data['main']['temp'];
      var descValue = data['weather'][0]['description']
      city.innerHTML = nameValue;
      temp.innerHTML = tempValue + " °F";
      desc.innerHTML = descValue;
      console.log(data.name)
  })
};



var get5Day = function(cityName) {
  console.log(cityName)
  var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`
  console.log(forecastURL);
  fetch(forecastURL)
  .then (function(response){
    response.json().then(function(data){
      displayForecast(data)
    })
  });
};

function displayForecast(weather) {
  forecastContainerEl.textContent = ''
  var forecast = weather.list;
   for (i=5; i < forecast.length; i=i+8) {
     var dailyForecast = forecast[i];
 
     var forecastEl=document.createElement("div");
      //  forecastEl.classList = "card col-lg-4 bg-primary text-light m-3";
       forecastEl.classList = "card col-lg-3.5 d-flex align-items-stretch bg-primary text-light m-1";
 
       console.log(dailyForecast)
 
       //create date element
       var forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);
 
       
       //create an image element
       var weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body text-center";
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  
 
       //append to forecast card
       forecastEl.appendChild(weatherIcon);
       
       //create temperature span
       var forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";
 
        //append to forecast card
        forecastEl.appendChild(forecastTempEl);
 
       var forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = "HMD: " + dailyForecast.main.humidity + "  %";
 
       //append to forecast card
       forecastEl.appendChild(forecastHumEl);
 
        // console.log(forecastEl);
       //append to five day container
        forecastContainerEl.appendChild(forecastEl);
      console.log(dailyForecast);
   }
};

var searchHistory = function(searchHistory) {

  historyContainerEl = document.createElement("button");
  historyContainerEl.textContent = searchHistory;
  historyContainerEl.classList = "d-flex w-100 btn-light border p-2";
  historyContainerEl.setAttribute("data-city",searchHistory)
  historyContainerEl.setAttribute("type", "submit");

  historyBtnEl.prepend(historyContainerEl);
};

var searchHistoryHandler = function(event) {
  var cityName = event.target.getAttribute("data-city")
  if(cityName) {
    getWeather(cityName);
    get5Day(cityName);
  }
};

var todayDate = moment().format('dddd, MMM Do YYYY');
$("#current-day").html(todayDate);
 
 
userFormEl.addEventListener("submit", formSubmitHandler);
historyBtnEl.addEventListener("click", searchHistoryHandler);

