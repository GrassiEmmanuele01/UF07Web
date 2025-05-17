// Coordinate iniziali - puoi cambiarle quando vuoi
const latitude = 46.0679; // Trento
const longitude = 11.1211;

// Funzione per ottenere il meteo e il nome della città
async function fetchWeather() {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,rain,cloud_cover,wind_speed_10m`;

  try {
    const city = await reverseGeocode(latitude, longitude);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Errore HTTP: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    displayWeather(data, city);
  } catch (error) {
    console.error("Errore durante il recupero dei dati:", error);
    document.getElementById("weatherInfo").innerHTML = `
      <p style="color: red;">Si è verificato un errore: ${error.message}</p>
    `;
  }
}

// Funzione per recuperare il nome della città usando OpenStreetMap Nominatim
async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "MeteoApp/1.0" },
    });
    const data = await response.json();

    return (
      data.address.city ||
      data.address.town ||
      data.address.village ||
      "Località sconosciuta"
    );
  } catch (error) {
    console.error("Errore nel reverse geocoding:", error);
    return "Non disponibile";
  }
}

// Funzione per visualizzare i dati del meteo + nome della città
function displayWeather(data, city) {
  const current = data.current;

  const weatherInfo = `
    <h2>Meteo a <em>${city}</em></h2>
    <p><strong>Temperatura:</strong> ${current.temperature_2m}°C</p>
    <p><strong>Umidità:</strong> ${current.relative_humidity_2m}%</p>
    <p><strong>Precipitazioni:</strong> ${current.precipitation} mm</p>
    <p><strong>Pioggia:</strong> ${current.rain} mm</p>
    <p><strong>Copertura Nuvole:</strong> ${current.cloud_cover}%</p>
    <p><strong>Velocità Vento:</strong> ${current.wind_speed_10m} km/h</p>
  `;

  document.getElementById("weatherInfo").innerHTML = weatherInfo;
}
