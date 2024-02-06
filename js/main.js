// today variables 
let todayName = document.getElementById("today_date_day_name")
let todayNumber = document.getElementById("today_date_day_number")
let todayMonth = document.getElementById("today_date_month")
let todayLocation = document.getElementById("today_location")
let todayTemp = document.getElementById("today_temp")
let todayConditionImg = document.getElementById("today_condition_img")
let todayConditionText = document.getElementById("today_condition_text")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("wind_direction")
let weatherDate

// next date 
let nextDay = document.getElementsByClassName("next_day_name")
let nextMaxTemp = document.getElementsByClassName("next_max_temp")
let nextMinTemp = document.getElementsByClassName("next_min_temp")
let nextConditionImg = document.getElementsByClassName("next_condition_img")    
let nextConditionText = document.getElementsByClassName("next_condition_text")

// search input
let searchInput = document.getElementById("search")

let date = new Date("2023-06-26")
// console.log(date.getDate());
// console.log(date.toLocaleDateString("en-US",{weekday:"long"}));
// console.log(date.toLocaleDateString("en-US",{month:"long"}));


// fetch api data 
async function getWeatherData (cityName){
    let weatherResponse = await fetch (`https://api.weatherapi.com/v1/forecast.json?key=f384da4e439249f7878211649242701&q=${cityName}&days=7`)
    let weatherData = await weatherResponse.json()
    return weatherData
}


// display today data
function displayTodayData(data){

    let todayDate = new Date()
    todayName.innerHTML = todayDate.toLocaleDateString("en-US",{weekday:"long"})
    todayNumber.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US",{month:"long"})



    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c
    todayConditionImg.setAttribute("src",data.current.condition.icon)
    todayConditionText.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity+"%"
    wind.innerHTML = data.current.wind_kph+"km/h"
    windDirection.innerHTML = data.current.wind_dir

}


// display next days data  
function displayNextData(data){

    let forecastData = data.forecast.forecastday

    for (let i = 0; i < 2 ; i++) {

        let nextDate = new Date(forecastData[i+1].data)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US",{weekday:"long"})
        nextMaxTemp[i].innerHTML = forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML = forecastData[i+1].day.mintemp_c
        nextConditionImg[i].setAttribute("src",forecastData[i+1].day.condition.icon)
        nextConditionText[i].innerHTML = forecastData[i+1].day.condition.text
    }

}



// start app
async function startApp(city="cairo"){
    let weatherData = await getWeatherData(city)

    if(!weatherData.error){
        displayTodayData(weatherData)
        displayNextData(weatherData)
    }
}
startApp()


searchInput.addEventListener("input", function(){
    startApp(searchInput.value)

})  