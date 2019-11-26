let city = "";

// add event listener to search button
const searchButton = document.getElementById("button");
searchButton.addEventListener("click", function(event) {
    event.preventDefault();
    // Grab text the user typed into the search input, add to the queryParams object

    city = document.getElementById("input").value.trim();
    const dataStr = localStorage.getItem("city") || "[]";
    // console.log(dataStr.length)
    let data = JSON.parse(dataStr);
    // console.log(data)
    data.push(city);
    localStorage.setItem("city", JSON.stringify(data));


    // Looping through the array of cities
    for (let i = 0; i < data.length; i++) {
        // console.log(city);
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
    }

    // The city from the textbox is then added to the array
    // city.push(inputEl);



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

                document.getElementById("wind").innerHTML = "Wind Speed: " + response.data.wind.speed;
                document.getElementById("humidity").innerHTML = "Humidity: " + response.data.main.humidity;
                document.getElementById("temp").innerHTML = "Temperature (F) " + response.data.main.temp;
            })

        let queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=7a8635b4bf69d952fca178d66748f81f";

        axios.get(queryURL2)
            .then(function(response) {
                // date, icon, temp, humidity
                const forecastArray = response.data.list;
                // console.log(response);
                let day1 = forecastArray[0];
                let date1 = day1.dt_txt;
                let icon1 = day1.weather[0].icon;
                let temp1 = day1.main.temp;
                let humidity1 = day1.main.humidity;

                let array1 = date1.split(" ");

                let iconURL = "http://openweathermap.org/img/wn/" + icon1 + "@2x.png";

                document.getElementById("date1").innerHTML = array1[0] + "<img src=" + iconURL + ">";
                document.getElementById("temp1").innerHTML = "Humidity: " + temp1;
                document.getElementById("humidity1").innerHTML = "Temp (F) " + humidity1;
                console.log(icon1)
                    // console.log(forecastArray[8].weather[0].icon);
                let day2 = forecastArray[8];
                let day3 = forecastArray[16];
                let day4 = forecastArray[24];
                let day5 = forecastArray[32];
                console.log(day1);
                console.log(day2);


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




        // Task List:
        // add event listener to search button X
        // capture input box X
        // hook up input box to display search results in right hand container
        // display city, current date, temp, humidity, wind speed, and uv index
        // display 5 day forecast for searched city below
        // each day must include:
        // date, img of weather type ->sunny, cloudy, etc., temp, and humidity
        // when search happens, button below the search field must be created for 
        // the searched city
        // when button is clicked, same results must display as they would
        // if city were typed and searched
    }
    getWeather();
});