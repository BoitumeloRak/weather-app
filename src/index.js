const apiKey = "b2a5adcct04b33178913oc335f405433";

// Format date/time for display
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;

  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

// Update weather data on the page
function refreshWeather(response) {
  const data = response.data;

  document.querySelector("#city").textContent = data.city;
  document.querySelector("#time").textContent = formatDate(new Date(data.time * 1000));
  document.querySelector("#description").textContent = data.condition.description;
  document.querySelector("#humidity").textContent = `${data.temperature.humidity}%`;
  document.querySelector("#wind-speed").textContent = `${data.wind.speed} km/h`;
  document.querySelector("#temperature").textContent = Math.round(data.temperature.current);
  document.querySelector("#icon").innerHTML = `<img src="${data.condition.icon_url}" class="weather-app-icon">`;
}

// Fetch weather from API for a given city
function searchCity(city) {
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl)
    .then(refreshWeather)
    .catch(() => alert("City not found!"));
}

// Handle form submission
function handleSearchSubmit(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

// Attach event listener to search form
document.querySelector("#search").addEventListener("submit", handleSearchSubmit);

// Load default city on page load
searchCity("Paris");