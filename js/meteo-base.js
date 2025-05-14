async function fetchWeather() {
  const latitude = 46.0679;
  const longitude = 11.1211;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,rain,cloud_cover,wind_speed_10m`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Errore HTTP: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    console.error("Errore durante il recupero dei dati meteo:", error.message);
    document.getElementById(
      "weatherInfo"
    ).innerHTML = `<p style="color: red;">Impossibile recuperare i dati meteo. Riprova più tardi.</p>`;
  }
}

function displayWeather(data) {
  const current = data.current;

  const weatherInfo = `
      <h2>Condizioni Meteo Attuali</h2>
      <p><strong>Temperatura:</strong> ${current.temperature_2m}°C</p>
      <p><strong>Umidità:</strong> ${current.relative_humidity_2m}%</p>
      <p><strong>Precipitazioni:</strong> ${current.precipitation} mm</p>
      <p><strong>Pioggia:</strong> ${current.rain} mm</p>
      <p><strong>Copertura Nuvole:</strong> ${current.cloud_cover}%</p>
      <p><strong>Velocità Vento:</strong> ${current.wind_speed_10m} km/h</p>
    `;

  document.getElementById("weatherInfo").innerHTML = weatherInfo;
}
