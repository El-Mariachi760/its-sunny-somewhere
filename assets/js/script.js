var userFormEl = document.querySelector("#user-form");
var cityNameInputEl = document.querySelector("#cityname");
var forecastContainerEl = document.querySelector("#forecast-list");

const apiKey = "a6959ba338d5d0ca6b0761173a65f092";

var formSubmitHandler = function(event) {
    event.preventDefault();
  
    // get value from input element
    var cityName = cityNameInputEl.value;
  
    if (cityName) {
      getWeather(cityName);
      cityNameInputEl.value = "";
    } else {
      alert("Please enter City Name")
    }
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
      
      display5Day(data);
      console.log(data.name)
  })
};

// var get5Day = function(cityName){
//   debugger
//   var apiForcastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`

//   fetch(apiForcastURL)
//   .then(function(response){
//       response.json().then(function(data){
//          display5Day(data);
//       });
//   });
// };

var display5Day = function(weather) {
  debugger
  var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`
  fetch(forecastURL)
  .then (function(response){
    response.json().then(function(data){
      console.log(data)
    })
  })
  // console.log(weather)
  // var forecast = weather.list;
  //   console.log(forecast);

}



  userFormEl.addEventListener("submit", formSubmitHandler);