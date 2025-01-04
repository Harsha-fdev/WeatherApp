//This block is for Usage Guide

document.getElementById("usage-guide-id").addEventListener('click' , function(event){
    event.preventDefault();//prevents default action of link

    // Check if the guide already exists
    let existingGuide = document.getElementById("usage-guide");
    if (!existingGuide) {
        // Create a new div element
        const guideDiv = document.createElement("div");
        guideDiv.id = "usage-guide";
        guideDiv.style.position = "absolute";
        guideDiv.style.top = "50px";
        guideDiv.style.left = "30px";
        guideDiv.style.padding = "15px";
        guideDiv.style.backgroundColor = "#f8f9fa";
        guideDiv.style.border = "1px solid #ddd";
        guideDiv.style.borderRadius = "8px";
        guideDiv.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.1)";
        guideDiv.style.zIndex = "1000";
        guideDiv.style.width = "300px";

        guideDiv.innerHTML = `
            <h5>How to Use the App</h5>
            <p>1. Select a city to view the weather details.</p>
            <p>2. Click the refresh button to update the weather.</p>
            <button id="close-guide" style="margin-top: 10px; padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 5px;">Close</button>
        `;

        document.body.appendChild(guideDiv);

        document.getElementById("close-guide").addEventListener("click", function () {
            guideDiv.remove();
        });
    }
});

//This block is for individual weather report
async function CheckWeather(city) {
    const API_KEY = "d7364c0a83b80d35ca6cee3b99bda60a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse the response as JSON

        document.getElementById('temp').innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
        document.getElementById('temp_min').innerHTML = `${(data.main.temp_min - 273.15).toFixed(1)}°C`;
        document.getElementById('temp_max').innerHTML = `${(data.main.temp_max - 273.15).toFixed(1)}°C`;
        document.getElementById('pressure').innerHTML = ` ${data.main.pressure} hPa`;
        document.getElementById('humidity').innerHTML = ` ${data.main.humidity}%`;
        document.getElementById('visibility').innerHTML = ` ${(data.visibility / 1000).toFixed(1)} km`;
        document.getElementById("feels_like").innerHTML = ` - ${(data.main.feels_like - 273.15).toFixed(1)}°C`;
        document.getElementById("wind_speed").innerHTML = ` - ${data.wind.speed} m/s`;
        document.getElementById("description").innerHTML = ` - ${data.weather[0].description}`;

    } catch (error) {
        console.error("Error fetching weather data:", error.message);
    }
}

//This is for search button functionality
document.getElementById("search_btn").addEventListener('click' , function(event){
    event.preventDefault();
    const city_input = document.getElementById("city_input").value.trim();

    if(city_input === ""){
        alert("please enter a city:");
    }
    else{
        document.getElementById("CITY").innerHTML = city_input;
        CheckWeather(city_input);
    }   
});

async function checkWeather(city) {
    const API_KEY = "d7364c0a83b80d35ca6cee3b99bda60a";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json(); // Parse the response as JSON

        document.getElementById(`${city}-temp`).innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
        document.getElementById(`${city}-temp_min`).innerHTML = `${(data.main.temp_min - 273.15).toFixed(1)}°C`;
        document.getElementById(`${city}-temp_max`).innerHTML = `${(data.main.temp_max - 273.15).toFixed(1)}°C`;
        document.getElementById(`${city}-pressure`).innerHTML = `${data.main.pressure} hPa`;
        document.getElementById(`${city}-humidity`).innerHTML = `${data.main.humidity}%`;
        document.getElementById(`${city}-visibility`).innerHTML = `${(data.visibility / 1000).toFixed(1)} km`;
        
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        // Fallback in case of error
        document.getElementById(`${city}-temp`).innerHTML = "N/A";
        document.getElementById(`${city}-temp_min`).innerHTML = "N/A";
        document.getElementById(`${city}-temp_max`).innerHTML = "N/A";
        document.getElementById(`${city}-pressure`).innerHTML = "N/A";
        document.getElementById(`${city}-humidity`).innerHTML = "N/A";
        document.getElementById(`${city}-visibility`).innerHTML = "N/A";
    }
}



// Array of cities
const cities = [
    "Lucknow", "New York", "Cairo", "London", "Mumbai", "Berlin"
];

// Function to update the table for all cities
function updateTable() {
    // Loop through each city and fetch the weather data
    cities.forEach(city => checkWeather(city));
}
//Tis block is for Refresh btn
document.getElementById("refresh-btn").addEventListener('click' , function(e){
    e.preventDefault();
    updateTable();
})