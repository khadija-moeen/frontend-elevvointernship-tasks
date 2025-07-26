// // Select elements
// const btn = document.querySelector('.btn');
// const cityInput = document.querySelector('.cityName');
// const weatherText = document.querySelector('.weatherText');
// const weatherCondition = document.querySelector('.weatherCondition');
// const weatherIcon = document.querySelector('.weatherIcon');

// // Your API Key
// const API_KEY = "a61d788e04cd77344ebe1c6c17e762c5";

// // Event listener on button
// btn.addEventListener('click', async () => {
//   const city = cityInput.value.trim();

//   if (city === "") {
//     weatherText.textContent = "Please enter a city!";
//     weatherCondition.textContent = "";
//     weatherIcon.style.display = "none";
//     return;
//   }

//   // Dynamic URL using city input
//   const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

//   try {
//     // Fetch weather data using Axios
//     const response = await axios.get(URL);
//     const data = response.data;

//     // Show city and temperature
//     weatherText.textContent = `${data.name}: ${data.main.temp}°C`;

//     // Show condition (e.g., clear sky)
//     weatherCondition.textContent = data.weather[0].description;

//     // Show weather icon
//     const iconCode = data.weather[0].icon;
//     weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
//     weatherIcon.style.display = "block";

//   } catch (error) {
//     console.error(error.response ? error.response.data : error);
//     weatherText.textContent = error.response ? error.response.data.message : "Something went wrong!";
//     weatherCondition.textContent = "";
//     weatherIcon.style.display = "none";
//   }
// });
// Select elements
const btn = document.querySelector('.btn');
const cityInput = document.querySelector('.cityName');
const weatherText = document.querySelector('.weatherText');
const weatherCondition = document.querySelector('.weatherCondition');
const weatherIcon = document.querySelector('.weatherIcon');
const forecastContainer = document.querySelector('.forecast');

// Your API Key
const API_KEY = "a61d788e04cd77344ebe1c6c17e762c5";

// Event listener for button click
btn.addEventListener('click', async () => {
  const city = cityInput.value.trim();

  if (city === "") {
    weatherText.textContent = "Please enter a city!";
    weatherCondition.textContent = "";
    weatherIcon.style.display = "none";
    forecastContainer.innerHTML = "";
    return;
  }

  try {
    // Current Weather API
    const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const currentResponse = await axios.get(currentURL);
    const currentData = currentResponse.data;

    // Show current weather
    weatherText.textContent = `${currentData.name}: ${currentData.main.temp}°C`;
    weatherCondition.textContent = currentData.weather[0].description;
    const iconCode = currentData.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIcon.style.display = "block";

    // 5-Day Forecast API
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const forecastResponse = await axios.get(forecastURL);
    const forecastData = forecastResponse.data.list;

    // Filter only 12:00:00 data for each day
    const dailyForecast = forecastData.filter(item => item.dt_txt.includes("12:00:00"));

    // Clear old forecast
    forecastContainer.innerHTML = "";

    // Add forecast cards
    dailyForecast.forEach(day => {
      const date = new Date(day.dt_txt);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }); // Mon, Tue
      const temp = day.main.temp;
      const forecastIcon = day.weather[0].icon;

      const card = `
        <div class="forecast-card">
          <p>${dayName}</p>
          <img src="https://openweathermap.org/img/wn/${forecastIcon}@2x.png" alt="icon">
          <p>${temp}°C</p>
        </div>
      `;
      forecastContainer.innerHTML += card;
    });

  } catch (error) {
    console.error(error.response ? error.response.data : error);
    weatherText.textContent = "Error: " + (error.response ? error.response.data.message : "Something went wrong!");
    weatherCondition.textContent = "";
    weatherIcon.style.display = "none";
    forecastContainer.innerHTML = "";
  }
});
