async function fetchAndDisplayWeather() {
    const cityInput = document.getElementById('city').value.trim();
    const weatherDataElement = document.getElementById('weather-data');
    const errorMessageElement = document.getElementById('error-message');


    clearResults(weatherDataElement, errorMessageElement);


    if (!cityInput) {
        displayError(errorMessageElement, "Please enter a city name.");
        return;
    }

    try {
        const weatherData = await fetchWeather(cityInput);
        displayWeather(weatherData, weatherDataElement);
    } catch (error) {
        displayError(errorMessageElement, error.message);
    }
}


async function fetchWeather(city) {
    const apiKey = "f3978f267e48df8f5b474b70d7347473";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("City not found or API error.");
    }

    const data = await response.json();


    if (!data.main || !data.weather) {
        throw new Error("Incomplete weather data received.");
    }

    return data;
}


function displayWeather(data, element) {
    element.innerHTML = `
        <strong>City:</strong> ${data.name || "Unknown"}<br>
        <strong>Temperature:</strong> ${data.main.temp}°C<br>
        <strong>Humidity:</strong> ${data.main.humidity}%<br>
        <strong>Weather:</strong> ${data.weather[0].description}<br>
    `;
}


function displayError(element, message) {
    element.textContent = message;
}


function clearResults(weatherDataElement, errorMessageElement) {
    weatherDataElement.textContent = '';
    errorMessageElement.textContent = '';
}
