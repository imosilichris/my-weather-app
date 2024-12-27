document.getElementById("getWeather").addEventListener("click", async () => {
  const city = document.getElementById("city").value.trim();
  const apiKey = "36ada95c2dbf4b2d80690106242712";
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;

  console.log("Requesting URL: ", url); // Log the request URL

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    console.log("API Response: ", data); // Log the API response
    displayWeather(data);
  } catch (error) {
    console.error("Error: ", error);
    document.getElementById("weatherResults").innerText =
      "Error: " + error.message;
  }
});

function displayWeather(data) {
  const weatherResults = document.getElementById("weatherResults");
  weatherResults.innerHTML = ""; // Clear previous results

  if (data && data.forecast && data.forecast.forecastday) {
    data.forecast.forecastday.forEach((day) => {
      const date = new Date(day.date).toLocaleDateString();
      const temp = day.day.avgtemp_c; // Average temperature in Celsius
      const condition = day.day.condition.text; // Weather condition text

      const weatherCard = `  
                <div class="weather-card">  
                    <h3>${date}</h3>  
                    <p>Temperature: ${temp}°C</p>  
                    <p>Condition: ${condition}</p>  
                </div>  
            `;
      weatherResults.innerHTML += weatherCard;
    });
  } else {
    weatherResults.innerHTML = "<p>No weather data available.</p>";
  }
}
