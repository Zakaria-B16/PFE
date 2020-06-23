// Select DOM Elements
let locationForm = document.getElementById("location-form");
let locationInput = document.getElementById("location-input");

// Declare Variables
let day1;
let day2;

// Add Submit Event For FOrm
locationForm.addEventListener("submit", geocode);

// Geocode Function
async function geocode(e) {
  e.preventDefault();

  // Get Location From Form
  let location = locationInput.value;

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
    let lat = response.data[0].lat;
    let lng = response.data[0].lon;

    // Get Angle
    let angle = Math.abs(parseInt(lat)) + 10;

    // Choose The Day In term Of Latitude
    if (lat > 0) {
      day1 = "2019-12-21";
      day2 = "2019-12-22";
    } else {
      day1 = "2019-06-21";
      day2 = "2019-06-22";
    }

    // Sunrise Function
    async function sunData() {
      try {
        // Get Data From Sunrise API
        const response = await axios.get(
          " https://api.sunrise-sunset.org/json",
          {
            params: {
              lat: lat,
              lng: lng,
              date: day1,
            },
          }
        );

        // Get Day Length
        let dayLength = response.data.results.day_length;

        // Render Day Length
        let sunriseOutput = `<ul class="list-group">
                              <li class="list-group-item"><strong>Day Length On The ${day1} : </strong>${dayLength}</li>
                          </ul>`;

        // Output Day Length
        document.getElementById("sun-data").innerHTML = sunriseOutput;
      } catch (error) {
        console.error(error);
      }
    }

    sunData();

    // Solar Irradiation Function
    async function SolarIrradiation() {
      try {
        const response = await axios.get(
          "https://api.weatherbit.io/v2.0/history/daily",
          {
            params: {
              key: "b2c424f0030e4c1face1ee511232d4fd",
              start_date: day1,
              end_date: day2,
              city: location,
            },
          }
        );

        // Get Location Irradiation
        let irradiation = response.data.data[0].t_ghi;

        // Get Temperature
        let temperature = response.data.data[0].temp;

        let SolarOutput = `<ul class="list-group">
                               <li class="list-group-item"><strong>Solar Irradiance On The ${day1} : </strong>${irradiation} Wh/m^2 </li>
                               <li class="list-group-item"><strong>Avrrage Temperatue On The ${day1} : </strong>${temperature} °C </li>
                           </ul>`;

        document.getElementById("solar-irradiation").innerHTML = SolarOutput;
      } catch (error) {
        console.error(error);
      }
    }

    SolarIrradiation();

    // Render Geometry
    let geomertyOutput = `<ul class="list-group">
                                  <li class="list-group-item"><strong>Latitude : </strong>${lat}</li>
                                  <li class="list-group-item"><strong>Longitude : </strong>${lng}</li>
                                  <li class="list-group-item"><strong>Angle Of Inclination : </strong>${angle}°</li>
                            </ul>`;

    // Output GeoMetry
    document.getElementById("address").innerHTML = geomertyOutput;
  } catch (error) {
    console.error(error);
  }
}
