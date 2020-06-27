// Select DOM Elements
export const form = document.getElementById("pv-form");
const locationInput = document.getElementById("location-input");
const dayInput = document.getElementById("number-day-input");

// Declare Variables
let day1;
let day2;
let orientation;
let lat;
let lng;
let location;
var irradiation;
export var rad;

// Add Submit Event For FOrm
form.addEventListener("submit", geocode);

// Geocode Function
async function geocode(e) {
  e.preventDefault();

  // Get Location From Form
  location = locationInput.value;

  try {
    // Get Data From Geocoding API
    const response = await axios.get(
      "https://us1.locationiq.com/v1/search.php",
      {
        params: {
          q: location,
          key: "18c74e41edef57",
          format: "json",
        },
      }
    );

    // Get Latitude And Longitude
    lat = response.data[0].lat;
    lng = response.data[0].lon;

    // Get Angle
    let angle = Math.abs(parseInt(lat)) + 10;

    // Get Complete Address
    let addressName = response.data[0].display_name;

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

    SolarIrradiation();

    // Render Complete Address
    let addressOutput = `<h3>${addressName}</h3>`;

    // Output Complete Address
    document.getElementById("address").innerHTML = addressOutput;

    // Render Geometry
    let geomertyOutput = `<ul class="list-group">
                                  <li class="list-group-item"><strong>Angle Of Inclination : </strong>${angle}°</li>
                                  <li class="list-group-item"><strong>Orientation : </strong>${orientation}°</li>
                            </ul>`;

    // Output GeoMetry
    document.getElementById("geocode").innerHTML = geomertyOutput;
  } catch (error) {
    console.error(error);
  }
}

// Solar Irradiation Function
export const SolarIrradiation = async () => {
  try {
    const response = await axios.get(
      "https://api.weatherbit.io/v2.0/history/daily",
      {
        params: {
          key: "b2c424f0030e4c1face1ee511232d4fd",
          start_date: day1,
          end_date: day2,
          lat: lat,
          lon: lng,
        },
      }
    );

    // Get Location Irradiation
    irradiation = response.data.data[0].t_ghi;

    let SolarOutput = `<ul class="list-group">
    <li class="list-group-item"><strong>Solar Irradiance On The ${day1} : </strong>${irradiation} Wh/m^2 </li>
    </ul>`;

    document.getElementById("solar-irradiation").innerHTML = SolarOutput;
    collect();
    return irradiation;
  } catch (error) {
    console.error(error);
  }
};

async function collect() {
  let days = parseInt(dayInput.value);
  let energie = 0;
  let values = [];
  let total = [];
  let pvPower;
  let sum;
  let battery;
  try {
    let sol = await irradiation;
    document.querySelectorAll(".charge").forEach((charge) => {
      let elements = Array.from(charge.children);
      elements.forEach((element) => {
        values = [element.value, ...values];
        let number = parseFloat(values[0]);
        let power = parseFloat(values[1]);
        let time = parseFloat(values[2]);
        energie = number * power * time;
      });

      total = [...total, energie];
    });
    sum = total.reduce((a, b) => a + b);
    pvPower = (sum * 1000) / (sol * 0.6);
    pvPower = pvPower.toFixed(2);
    battery = (days * pvPower) / (0.6 * 12);
    battery = battery.toFixed(2);

    let pv = `<ul class="list-group">
    <li class="list-group-item"><strong> PV Power : </strong>${pvPower} Wc </li>
    <li class="list-group-item"><strong> Battery Capacity : </strong>${battery} Ah </li>
    </ul>`;
    document.getElementById("pv-power").innerHTML = pv;
  } catch {
    console.error(error);
  }
}
