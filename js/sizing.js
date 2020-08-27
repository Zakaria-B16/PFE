import { geocode, SolarIrradiation, reverseGeo } from "./API.js";
import { startCalcul, installtionSizing } from "./calculs.js";
import { loads, ErrorPopup } from "./component.js";
import { mapboxFunction } from "./mapbox.js";
import { resultTranslater } from "./lang.js";

// Select DOM Elements
const form = document.getElementById("pv-form");
const locationInput = document.getElementById("location-input");
const dayInput = document.getElementById("number-day-input");
const exempleFrom = document.getElementById("exemple");
const gps = document.querySelector(".gps");

// Declare Variables
let day1;
let day2;
let orientation;
let location;

// Get Position With GPS
gps.addEventListener("click", async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      console.log(position.coords);

      let latitude = position.coords.latitude;
      let longititude = position.coords.longitude;
      location = await reverseGeo(latitude, longititude);
      locationInput.value = location;
      mapboxFunction(latitude, longititude);
    });
  } else {
    console.error("Geolocation is not supported by this browser!");
  }
});

// Add Submit Event For FOrm
form.addEventListener("submit", (e) => PVSizer(e));

// Geocode Function
const PVSizer = async (e) => {
  e.preventDefault();

  // Clear Complete Address
  document.getElementById("address").innerHTML = ``;

  // Clear GeoMetry
  document.getElementById("geocode").innerHTML = ``;

  // Clear Irradiation
  document.getElementById("solar-irradiation").innerHTML = ``;

  // Clear Charge
  document.getElementById("charge-power").innerHTML = ``;

  // Clear Sizing
  document.getElementById("sizing").innerHTML = ``;

  // Clear Example
  document.getElementById("exemple").innerHTML = ``;

  // Clear PV-Number
  document.getElementById("pv-number").innerHTML = ``;

  // Clear Battery-Number
  document.getElementById("battery-number").innerHTML = ``;

  // Clear Regulator
  document.getElementById("regulator").innerHTML = ``;

  // Clear Cable-Form
  document.getElementById("cable-form").innerHTML = ``;

  // Clear Cable
  document.getElementById("cable").innerHTML = ``;

  // Check For Charges
  if (loads.childNodes.length === 0) {
    ErrorPopup(form);
  } else {
    document.getElementById("geocode").innerHTML = `<div class="loading">
  <div class="obj"></div>
  <div class="obj"></div>
  <div class="obj"></div>
  <div class="obj"></div>
  <div class="obj"></div>
  <div class="obj"></div>
  <div class="obj"></div>
  <div class="obj"></div>
</div>`;
    // Get Location From Form
    location = locationInput.value;

    try {
      // Get Data From Geocode Function
      const [lat, lng, addressName, angle] = await geocode(location);

      // Choose The Day And OrientationIn term Of Latitude
      if (lat > 0) {
        day1 = "2019-12-21";
        day2 = "2019-12-22";

        orientation = "South";
      } else {
        day1 = "2019-06-21";
        day2 = "2019-06-22";

        orientation = "North";
      }

      // Get Data From Solar Irradiation Function
      const firstIrradiation = await SolarIrradiation(day1, day2, lat, lng);

      // Get Data From Caculation Function
      const [sum, totalPower, pvPower, voltage, battery] = await startCalcul(
        dayInput,
        firstIrradiation
      );

      mapboxFunction(lat, lng);
      // Render Complete Address
      let addressOutput = `<h3 class="text-center">
      <i class="fa fa-map-marker-alt" aria-hidden="true"></i> <span>${addressName}</span>
    </h3>`;

      // Render Geometry
      let geomertyOutput = `<ul class="list-group">
      <li class="list-group-item">
        <strong
          ><i class="fab fa-audible"></i>
          <p class="angle">Angle Of Inclination :</p> </strong
        ><span>${angle}°</span>
      </li>
      <li class="list-group-item">
        <strong
          ><i class="fa fa-compass" aria-hidden="true"></i>
          <p class="orientation">Orientation :</p> </strong
        ><span class="orientation-result">${orientation}</span>
      </li>
    </ul>`;

      // Render Solar Irradiation
      let SolarOutput = `<ul class="list-group">
      <li class="list-group-item">
        <strong
          ><i class="fa fa-sun" aria-hidden="true"></i>
          <p class="first-irradiance">Solar Irradiance On The </p><p class="day-variable">${day1} :</p> </strong
        ><span>${firstIrradiation} Wh/m^2</span>
      </li>
      
    </ul>`;

      // Render Daily Consomation PV Power & Battery Capacity
      let chargeOutput = `<ul class="list-group">
      <li class="list-group-item">
        <strong
          ><i class="fa fa-bolt" aria-hidden="true"></i>
          <p class="energy">Daily Energy Consomation :</p> </strong
        ><span>${sum} Wh/<span class="day-output">Day</span></span>
      </li>
      <li class="list-group-item">
        <strong
          ><i class="fas fa-plug" aria-hidden="true"></i>
          <p class="d-power">Daily Power Consomation :</p> </strong
        ><span>${totalPower} W/<span class="day-output">Day</span></span>
      </li>
    </ul>`;

      let sizingOutput = `<ul class="list-group">
      <li class="list-group-item">
        <strong
          ><i class="fas fa-border-all"></i>
          <p class="pv-power">PV Power :</p> </strong
        ><span> ${pvPower} Wc</span>
      </li>
      <li class="list-group-item">
        <strong
          ><i class="fas fa-car-battery" aria-hidden="true"></i>
          <p class="pv-battery">Battery Capacity :</p></strong
        ><span> ${battery} Ah</span>
      </li>
    </ul>`;

      // Output Complete Address
      document.getElementById("address").innerHTML = addressOutput;

      // Output GeoMetry
      document.getElementById("geocode").innerHTML = geomertyOutput;

      // Output Irradiation
      document.getElementById("solar-irradiation").innerHTML = SolarOutput;

      // Output Charge
      document.getElementById("charge-power").innerHTML = chargeOutput;

      // Output Sizing
      document.getElementById("sizing").innerHTML = sizingOutput;

      // Translate
      resultTranslater();

      // Scroll To Address After 3s
      setTimeout(() => {
        document
          .getElementById("address")
          .scrollIntoView({ block: "start", behavior: "smooth" });
      }, 1000);

      // Start Installation Sizing Function
      installtionSizing(exempleFrom, voltage, pvPower, battery);
    } catch (error) {
      console.error(error);
    }
  }
};
