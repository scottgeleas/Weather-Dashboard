let searchBtn = $("#searchBtn");
let searchBox = $("#searchBox");
let cityName = $("#cityName");
let cityDetails = $("#cityDetails");

searchBtn.on("click", function() {
    let currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + searchBox.val() + "&appid=6aab536680d25358aa622219c8452f38"
    fetch(currentWeatherAPI)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
            cityName.text(data.name);
            let temperature = $("<h3>");
            let convertedValue = ((data.main.temp - 273.15) * 9/5 + 32).toFixed() + ("°F");
            temperature.text(convertedValue);
            let humidity = $("<h3>");
            humidity.text(data.main.humidity + "% Humidity");
            let wind = $("<h3>");
            wind.text("Wind Speed: "+ data.wind.speed +" m/s")

            cityDetails.append(temperature);
            cityDetails.append(humidity);
            cityDetails.append(wind);
        });
});

let weatherAPI = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
"






