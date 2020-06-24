$(document).ready(function(){
    $("#cityBtn").click(function(){
      var city = $("#city").val();
      $.ajax({
          url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=a8374e0de97c592f69507a3830971ce8",
          method: "GET",
        }).then(function (response) {
          $("#temp").text(response.main.temp);

           console.log(response)


             var cityName= $("#city-name").text(city);
               
             $("#city-name").append(cityName);

             $("#humidity").text(response.main.humidity);

             $("#windspeed").text(response.wind.speed);

            



          city
        });
    });
  });