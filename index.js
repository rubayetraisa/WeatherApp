const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apikey= "2ffb98dd5c7279f539edddfc1b024582";

weatherForm.addEventListener("submit",async event=>{

    event.preventDefault();

    const city=cityInput.value;

    if(city){
        try{
            const weatherData= await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else
    {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {

    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response =await fetch(apiurl);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    const {name: city, 
           main:{temp, humidity}, 
           weather:[{description, id}]}=data;


    card.textContent="";
    card.style.display="flex";

    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const despDisplay=document.createElement("p");
    const WeatherEmoji=document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°C`;
    humidityDisplay.textContent=`Humidity: ${humidity}%`;
    despDisplay.textContent=description;
    WeatherEmoji.textContent=getWeatherEmoji(id);


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    despDisplay.classList.add("despDisplay");
    WeatherEmoji.classList.add("weatherEmoji");


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(despDisplay);
    card.appendChild(WeatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId>=200 && weatherId <300):
            return "⛈";
        case (weatherId>=300 && weatherId <400):
            return "🌧";
        case (weatherId>=400 && weatherId <500):
            return "🌧";
        case (weatherId>=500 && weatherId <600):
            return "🌧";
        case (weatherId>=600 && weatherId <700):
            return "❄";
        case (weatherId>=700 && weatherId <800):
            return "🌫";
        case (weatherId==800):
            return "☀";
        case (weatherId>=800 && weatherId <810):
            return "☁";
        default:
            return "⁉"
    }
}

function displayError(message){

    const errorDisplay=document.createElement("p");
    errorDisplay.textContent= message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errorDisplay);
}