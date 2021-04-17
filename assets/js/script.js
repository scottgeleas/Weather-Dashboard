let searchBtn = $("#searchBtn");
let searchBox = $("#searchBox");
let cityName = $("#cityName");
let cityDetails = $("#cityDetails");
let apiKey = "6aab536680d25358aa622219c8452f38"
let list = $(".list");
let cities = (localStorage.getItem("search")) ? JSON.parse(localStorage.getItem("search")) : [];

savedCities();


function savedCities() {
    // create button for each item and append to container
    list.empty()
    for (let i = 0; i < cities.length; i++) {
        let city = $("<button>");
        city.text(cities[i]);
        city.addClass("clickSearch");
        list.append(city);
    }
};

$(".clickSearch").on("click", function (event) {
    renderPage($(event.target).text());
});

searchBtn.on("click", function () {
    cities.push(searchBox.val())
    localStorage.setItem("search", JSON.stringify(cities));
    savedCities();
    let cityText = searchBox.val();
    renderPage(cityText);
});

function renderPage(cityText) {
    let currentWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityText + "&appid=" + apiKey;
    fetch(currentWeatherAPI)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            cityName.text(data.name);
            let temperature = $("<h3>");
            let convertedValue = ((data.main.temp - 273.15) * 9 / 5 + 32).toFixed() + ("°F");
            temperature.text(convertedValue);
            let humidity = $("<h3>");
            humidity.text(data.main.humidity + "% Humidity");
            let wind = $("<h3>");
            wind.text("Wind Speed: " + data.wind.speed + " m/s");
            let lat = data.coord.lat;
            let lon = data.coord.lat;
            cityDetails.empty();
            cityDetails.append(temperature);
            cityDetails.append(humidity);
            cityDetails.append(wind);

            let weatherAPI = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
            fetch(weatherAPI)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    let uv = $("<h3>");
                    uv.addClass("uv")
                    uv.text("UV Index: " + data.current.uvi);
                    if (data.current.uvi >= 0 && data.current.uvi <= 2) {
                        uv.addClass("low");
                    } else if (data.current.uvi > 2 && data.current.uvi <= 4) {
                        uv.addClass("moderate");
                    } else {
                        uv.addClass("severe");
                    }

                    cityDetails.append(uv)
                    $(".cardContainer").empty()
                    $(data.daily).each(function (i, forecast) {

                        if (i > 0 && i < 6) {
                            let weatherData =
                                $(`<div class="card" style="width: 18rem;">
                                        <div class="card-header">
                                            Day of Week
                                        </div>
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item"></li>
                                            <li class="list-group-item">A second item</li>
                                            <li class="list-group-item">A third item</li>
                                            <li class="list-group-item">A fourth item</li>
                                        </ul>
                                    </div>`);
                            let imgEl = document.createElement('img');
                            imgEl.setAttribute('src', `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`);
                            let year = new Date(forecast.dt * 1000).getFullYear();
                            let month = new Date(forecast.dt * 1000).getMonth();
                            let day = new Date(forecast.dt * 1000).getDate();
                            weatherData.find(".card-header").text(month + "/" + day + "/" + year);
                            weatherData.find(".list-group-item:nth(0)").append(imgEl);
                            weatherData.find(".list-group-item:nth(1)").text(forecast.temp.day.toFixed() + ("°F"));
                            weatherData.find(".list-group-item:nth(2)").text(forecast.humidity + "% Humidity");
                            weatherData.find(".list-group-item:nth(3)").text(forecast.wind_speed + " m/s");
                            $(".cardContainer").append(weatherData);
                        }
                    });
                })
        });
};







