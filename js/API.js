export const geocode = async (location) => {
  try {
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

    // Get Complete Address
    let addressName = response.data[0].display_name;

    let inclinaison = Math.abs(parseInt(lat));
    let angle;
    if (inclinaison <= 9) {
      angle = 15;
    } else if (inclinaison > 10 && inclinaison <= 20) {
      angle = inclinaison + 5;
    } else if (inclinaison > 21 && inclinaison <= 45) {
      angle = inclinaison + 10;
    } else if (inclinaison > 46 && inclinaison <= 65) {
      angle = inclinaison + 15;
    } else {
      angle = 80;
    }
    console.log(response);
    return [lat, lng, addressName, angle];
  } catch (error) {
    console.error(error);
  }
};

// Reverse Geocoding Function
export const reverseGeo = async (lat, lon) => {
  try {
    const reponse = await axios.get(
      "https://us1.locationiq.com/v1/reverse.php",
      {
        params: {
          lat: lat,
          lon: lon,
          key: "18c74e41edef57",
          format: "json",
        },
      }
    );
    let nameArray = reponse.data.display_name.trim().split(",");

    return nameArray[1].toString();
  } catch (error) {}
};

// Solar Irradiation Function
export const SolarIrradiation = async (day1, day2, lat, lng) => {
  try {
    const response = await axios.get(
      "https://api.weatherbit.io/v2.0/history/daily",
      {
        params: {
          key: "547a6ba4fa5248e98b149c90fa2afb50",
          start_date: day1,
          end_date: day2,
          lat: lat,
          lon: lng,
        },
      }
    );

    // Get Solar Irradiation
    let irradiation = response.data.data[0].t_ghi;

    return irradiation;
  } catch {
    console.error(error);
  }
};
