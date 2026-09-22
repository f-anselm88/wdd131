// Static weather inputs (metric units). Week 05+ will replace these with a live API call.
const currentTemp = 7;    // degrees Celsius
const currentWind = 15;   // km/h

// Returns the wind chill factor for the given Celsius temperature and km/h wind speed.
function calculateWindChill(temp, wind) {
  return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

const windChillEl = document.querySelector('#windChill');

if (currentTemp <= 10 && currentWind > 4.8) {
  windChillEl.textContent = `${calculateWindChill(currentTemp, currentWind).toFixed(1)} \u00B0C`;
} else {
  windChillEl.textContent = 'N/A';
}

document.querySelector('#currentYear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = document.lastModified;
