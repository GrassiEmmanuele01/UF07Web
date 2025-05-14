const weatherIcons = {
  0: "☀️", // Sereno
  1: "🌤️", // Parzialmente nuvoloso
  2: "☁️", // Nuvoloso
  3: "🌧️", // Pioggia leggera
  45: "🌫️", // Nebbia
  61: "🌧️", // Pioggia moderata
  80: "⛈️", // Temporale
  // Aggiungi altri codici meteo qui...
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchLocalWeather, handleError);
  } else {
    alert("Geolocalizzazione non supportata dal browser.");
  }
}

function handleError(error) {
  console.error("Errore di geolocalizzazione:", error.message);
  document.getElementById("weatherInfo").textContent =
    "Impossibile ottenere la posizione.";
}

async function fetchLocalWeather(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,rain,cloud_cover,wind_speed_10m,weather_code`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayLocalWeather(data);
  } catch (error) {
    console.error("Errore durante il recupero dei dati meteo:", error);
    document.getElementById("weatherInfo").textContent =
      "Impossibile recuperare i dati meteo.";
  }
}

function displayLocalWeather(data) {
  const current = data.current;
  const weatherCode = current.weather_code;
  const icon = weatherIcons[weatherCode] || "❓";

  const weatherInfo = `
      <div class="weather-icon">${icon}</div>
      Temperatura: ${current.temperature_2m}°C<br>
      Umidità: ${current.relative_humidity_2m}%<br>
      Precipitazioni: ${current.precipitation} mm<br>
      Pioggia: ${current.rain} mm<br>
      Copertura nuvole: ${current.cloud_cover}%<br>
      Velocità vento: ${current.wind_speed_10m} km/h<br>
      Codice meteo: ${current.weather_code}
    `;
  document.getElementById("weatherInfo").innerHTML = weatherInfo;
}
