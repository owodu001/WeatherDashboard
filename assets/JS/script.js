let city = "";

// add event listener to search button
const searchButton = document.getElementById("button");
searchButton.addEventListener("click", function(event) {
    event.preventDefault();


    city = document.getElementById("input").value.trim();
    const dataStr = localStorage.getItem("city") || "[]";
    // console.log(dataStr.length)
    let data = JSON.parse(dataStr);
    // console.log(data)
    data.push(city);
    localStorage.setItem("city", JSON.stringify(data));

    document.getElementById("buttons-view").innerHTML = "";
    // Looping through the array of cities
    for (let i = 0; i < data.length; i++) {
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=7a8635b4bf69d952fca178d66748f81f";

        // dynamicaly generating buttons for each city in the array.
        const a = document.createElement("button");
        // Adding a class
        a.classList.add("city");
        // Adding a data-attribute with a value of the city at index i
        a.setAttribute("data-name", data[i]);
        // Providing the button's text with a value of the city at index i
        a.innerHTML = data[i];
        // Adding the button to the HTML
        document.getElementById("one").append(a);
        // Function for displaying the city info
        a.addEventListener("click", function() {
            window.open(queryURL);
        });

    }



    function getWeather() {
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=7a8635b4bf69d952fca178d66748f81f";
        const apiKey = "7a8635b4bf69d952fca178d66748f81f";
        // const cityNames = ["houston", "minneapolis", "memphis", "las angeles", "raleigh"];
        // let i = 0;

        // const countryCode = ",us&mode=xml";
        // let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityNames + "&APPID=" + apiKey;

        // console.log(queryURL);


        axios.get(queryURL)
            // After the data comes back from the API
            .then(function(response) {
                // console.log(response)
                let image = response.data.weather[0].icon;
                let iconURL = "http://openweathermap.org/img/wn/" + image + "@2x.png";
                // console.log(iconURL)
                const imgEl = document.querySelector("img");
                // console.log(imgEl)
                let displayImage = imgEl.setAttribute("src", iconURL);
                // displayImage.innerText


                let lat = response.data.coord.lat;
                let lon = response.data.coord.lon;

                // console.log(lat);
                // console.log(lon);
                let queryURL3 = "http://api.openweathermap.org/data/2.5/uvi?appid=7a8635b4bf69d952fca178d66748f81f&lat=" + lat + "&lon=" + lon;
                axios.get(queryURL3)
                    .then(function(uvResponse) {
                        // console.log(uvResponse);
                        document.getElementById("uv").innerHTML = "UV Index: " + uvResponse.data.value;
                    })
                    // Storing an array of results in the results variable
                    // console.log(response);
                const results = response.data;
                const cityData = response.data.city;
                const forecastArray = response.data.list;
                const name = response.data.name;
                // console.log(results.name)
                //     // console.log(JSON.stringify(response.data));
                // console.log(response.data.wind.speed);
                // // console.log(response.data.list)
                // // const day1 = forecastArray[0];
                // console.log(response.data.main.temp);
                // console.log(response.data.main.humidity);
                // console.log(day1.wind.speed);
                // console.log(day1.dt_txt);

                // // Transfer content to HTML
                document.getElementById("city").innerHTML = "<h1>" + results.name + " Weather Details" + " " + moment().format('L') + "</h1>" + "<img src=" + iconURL + ">";

                document.getElementById("wind").innerHTML = "Wind Speed: " + response.data.wind.speed + " " + "MPH";
                document.getElementById("humidity").innerHTML = "Humidity: " + response.data.main.humidity + "%";
                document.getElementById("temp").innerHTML = "Temperature (F) " + response.data.main.temp;
            })

        let queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=7a8635b4bf69d952fca178d66748f81f";

        function k2f(K) {
            return (K - 273.15) * 1.80 + 32;
        }

        axios.get(queryURL2)
            .then(function(response) {
                // date, icon, temp, humidity
                const forecastArray = response.data.list;

                // DAY ONE OF FORECAST
                let day1 = forecastArray[3];
                let date1 = day1.dt_txt;
                let icon1 = day1.weather[0].icon;
                let temp1 = day1.main.temp;
                let humidity1 = day1.main.humidity;
                console.log(forecastArray);
                let array1 = date1.split(" ");

                let iconURL = "http://openweathermap.org/img/wn/" + icon1 + "@2x.png";

                document.getElementById("date1").innerHTML = array1[0] + "<img src=" + iconURL + ">";
                document.getElementById("temp1").innerHTML = "Temp (F) " + temp1;
                document.getElementById("humidity1").innerHTML = "Humidity: " + humidity1;


                // DAY TWO OF FORECAST
                let day2 = forecastArray[11];
                let date2 = day2.dt_txt;
                let icon2 = day2.weather[0].icon;
                let temp2 = day2.main.temp;
                let humidity2 = day2.main.humidity;
                console.log(forecastArray);
                let array2 = date2.split(" ");

                let iconURL2 = "http://openweathermap.org/img/wn/" + icon2 + "@2x.png";

                document.getElementById("date2").innerHTML = array2[0] + "<img src=" + iconURL2 + ">";
                document.getElementById("temp2").innerHTML = "Temp (F) " + temp2;
                document.getElementById("humidity2").innerHTML = "Humidity: " + humidity2;

                // DAY THREE OF FORECAST
                let day3 = forecastArray[19];
                let date3 = day3.dt_txt;
                let icon3 = day3.weather[0].icon;
                let temp3 = day3.main.temp;
                let humidity3 = day3.main.humidity;
                let array3 = date3.split(" ");

                let iconURL3 = "http://openweathermap.org/img/wn/" + icon3 + "@2x.png";

                document.getElementById("date3").innerHTML = array3[0] + "<img src=" + iconURL3 + ">";
                document.getElementById("temp3").innerHTML = "Temp (F) " + temp3;
                document.getElementById("humidity3").innerHTML = "Humidity: " + humidity3;

                // DAY FOUR OF FORECAST
                let day4 = forecastArray[27];
                let date4 = day4.dt_txt;
                let icon4 = day4.weather[0].icon;
                let temp4 = day4.main.temp;
                let humidity4 = day4.main.humidity;
                let array4 = date4.split(" ");

                let iconURL4 = "http://openweathermap.org/img/wn/" + icon4 + "@2x.png";

                document.getElementById("date4").innerHTML = array4[0] + "<img src=" + iconURL4 + ">";
                document.getElementById("temp4").innerHTML = "Temp (F) " + temp4;
                document.getElementById("humidity4").innerHTML = "Humidity: " + humidity4;

                // DAY FIVE OF FORECAST
                let day5 = forecastArray[35];
                let date5 = day5.dt_txt;
                let icon5 = day5.weather[0].icon;
                let temp5 = day5.main.temp;
                let humidity5 = day5.main.humidity;
                let array5 = date5.split(" ");

                let iconURL5 = "http://openweathermap.org/img/wn/" + icon5 + "@2x.png";

                document.getElementById("date5").innerHTML = array5[0] + "<img src=" + iconURL5 + ">";
                document.getElementById("temp5").innerHTML = "Temp (F) " + temp5;
                document.getElementById("humidity5").innerHTML = "Humidity: " + humidity5;

                // "2019-11-27 03:00:00".split(" ")
                // (2) ["2019-11-27", "03:00:00"]

                // document.getElementById("city").innerHTML = "<h1>" + results.name + " Weather Details</h1>";
                // document.getElementById("wind").innerHTML = "Wind Speed: " + response.data.wind.speed;
                // document.getElementById("humidity").innerHTML = "Humidity: " + response.data.main.humidity;
                // document.getElementById("temp").innerHTML = "Temperature (F) " + response.data.main.temp;
            })



        // // Log the data in the console as well
        // console.log("Wind Speed: " + response.data.wind.speed);
        // console.log("Humidity: " + response.data.main.humidity);
        // console.log("Temperature (F): " + response.data.main.temp);

    }
    getWeather();

});