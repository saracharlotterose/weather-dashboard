var localStorage = window.localStorage;


function init() {
    // getting stored cities from local storage
    //parsing json strings into objects for array
    var storedCities = JSON.parse(localStorage.getItem("cities")); //retrieve array
    if(storedCities === null) { //if local storage is empty
        storedCities = [];
    }
    else {
        renderCities(storedCities);
    }

    var day1 = new Date();
    var day2 = new Date();
    day2.setDate(day1.getDate() + 1);
    var day3 = new Date();
    day3.setDate(day2.getDate() + 1);
    var day4 = new Date();
    day4.setDate(day3.getDate() + 1);
    var day5 = new Date();
    day5.setDate(day4.getDate() + 1);


    $("#firstday").text(day1.toLocaleDateString());
    $("#secondday").text(day2.toLocaleDateString());
    $("#thirdday").text(day3.toLocaleDateString());
    $("#fourthday").text(day4.toLocaleDateString());
    $("#fifthday").text(day5.toLocaleDateString());

    return storedCities;
}

function renderCities(storedCities) {
    $("#recentSearch").empty();
    for(var i=0; i < storedCities.length; i++){
        var city = storedCities[i]
        var li =$("<li class='list-group-item list-group-item-action' data-index='" + i + "'>").text(city);
        li.attr("data-index",i);
        $("#recentSearch").append(li);
    }
}



//storing function
function storeCities(){
    localStorage.setItem("city", JSON.stringify(city));
}

function renderWeather(cityString, storedCities) {
    var lat = 0;
    var lon = 0;

    //basic weather info call
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityString + "&units=imperial&appid=a8374e0de97c592f69507a3830971ce8",
        method: "GET",
    }).then(function (response) {
        lat = response.lat;
        lon = response.lon;

        $("#temp").text(response.main.temp);

        var cityName = $("#city-name").text(response.name);

        $("#city-name").append(cityName);

        $("#humidity").text(response.main.humidity);

        $("#windspeed").text(response.wind.speed);

        if(!storedCities.includes(response.name)) {
           storedCities.push(response.name);
           localStorage.setItem("cities", JSON.stringify(storedCities));
           renderCities(storedCities);
       }
       renderForecast(response.name);
       renderUV(response.coord.lat, response.coord.lon);

    }).catch(function() {
        alert("Invalid city -- 404 Not Found");
    });
}

function renderForecast(cityString) {
    //five day forecast call
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityString + "&units=imperial&appid=a8374e0de97c592f69507a3830971ce8",
        method: "GET",
    }).then(function (response) {

        console.log(response);
        $("#day1temp").text(response.list[0].main.temp)
        $("#day1humid").text(response.list[0].main.humidity)

        // if(response.list[0].weather[0].main == "Clear") {
        //     $("#day1icon").addclass
        // }



        $("#day2temp").text(response.list[9].main.temp)
        $("#day2humid").text(response.list[9].main.humidity)

        $("#day3temp").text(response.list[20].main.temp)
        $("#day3humid").text(response.list[20].main.humidity)

        $("#day4temp").text(response.list[29].main.temp)
        $("#day4humid").text(response.list[29].main.humidity)

        $("#day5temp").text(response.list[39].main.temp)
        $("#day5humid").text(response.list[39].main.humidity)
    }); 
}
    
function renderUV(lat, lon) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=a8374e0de97c592f69507a3830971ce8"+ "&lat=" + lat + "&lon=" + lon,
        method: 'GET',
    }).then(function(response) {
        $("#uvindex").html(response.value);
    });
}



$(document).ready(function () {
    var storedCities = init();
    
    $("#cityBtn").click(function () {
        var city = $("#city").val();    
        renderWeather(city, storedCities);
        $("#city").val("")
     });

     $("#city").keypress(function(event) {
         var key = event.which;
         if(key == 13) {
             $("#cityBtn").click();
             return false;
         }
     })

     $(".list-group-item").click(function() {
        var i = $(this).index();
        renderWeather(storedCities[i], storedCities);
     })
function seticon(){
    if (response.weather[i].main === "clouds"){
        $("#day1icon").class("fas fa-cloud-meatball" )
    } else if( response.weather[i].main === "clear"){
        $("#day1icon").class("fas fa-sun" )
    }else if( response.weather[i].main === "rain"){
        $("#day1icon").class('fas fa-cloud-rain' )
    }
    seticon()
}

 });







    