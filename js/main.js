import { geocode, SolarIrradiation, calcul, popUp } from "./function.js";
import { loads } from "./charge.js";

// Select DOM Elements
const form = document.getElementById("pv-form");
const locationInput = document.getElementById("location-input");
const dayInput = document.getElementById("number-day-input");

// Declare Variables
let day1;
let day2;
let orientation;
let location;

// Add Submit Event For FOrm
form.addEventListener("submit", (e) => PVSizer(e));

// Geocode Function
const PVSizer = async (e) => {
  e.preventDefault();

  // Check For Charges
  if (loads.childNodes.length === 0) {
    popUp(form);
  } else {
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
      const irradiation = await SolarIrradiation(day1, day2, lat, lng);

      // Get Data From Caculation Function
      const [sum, pvPower, battery] = await calcul(dayInput, irradiation);

      // Render Complete Address
      let addressOutput = `<h3><i class="fa fa-map-marker-alt" aria-hidden="true"></i> ${addressName}</h3>`;

      // Render Geometry
      let geomertyOutput = `<ul class="list-group">
                                  <li class="list-group-item"><strong><i class="fab fa-audible"></i> <p>Angle Of Inclination :</p> </strong>${angle}°</li>
                                  <li class="list-group-item"><strong><i class="fa fa-compass" aria-hidden="true"></i> <p>Orientation :</p> </strong>${orientation}°</li>
                            </ul>`;

      // Render Solar Irradiation
      let SolarOutput = `<ul class="list-group">
                              <li class="list-group-item"><strong><i class="fa fa-sun" aria-hidden="true"></i> <p>Solar Irradiance On The ${day1} :</p> </strong>${irradiation} Wh/m^2 </li>
                     </ul>`;

      // Render Daily Consomation PV Power & Battery Capacity
      let pv = `<ul class="list-group">
                     <li class="list-group-item"><strong><i class="fa fa-bolt" aria-hidden="true"></i> <p>Daily Consomation :</p> </strong>${sum} Wh/j </li>
                     <li class="list-group-item"><strong><i class="fas fa-border-all"></i> <p>PV Power :</p> </strong>${pvPower} Wc </li>
                     <li class="list-group-item"><strong><i class="fa fa-battery-three-quarters" aria-hidden="true"></i> <p>Battery Capacity :</p></strong>${battery} Ah </li>
            </ul>`;

      // Output Complete Address
      document.getElementById("address").innerHTML = addressOutput;

      // Output GeoMetry
      document.getElementById("geocode").innerHTML = geomertyOutput;

      // Output Irradiation
      document.getElementById("solar-irradiation").innerHTML = SolarOutput;

      // Output PV Sizing
      document.getElementById("pv-power").innerHTML = pv;

      console.log("yes");
    } catch (error) {
      console.error(error);
    }
  }
};
