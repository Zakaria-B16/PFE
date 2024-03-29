export const geocode = async (location, lang) => {
  try {
    const response = await axios.get(
      "https://us1.locationiq.com/v1/search.php",
      {
        params: {
          q: location,
          key: "18c74e41edef57",
          format: "json",
          "accept-language": lang,
          normalizeaddress: 0,
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
export const reverseGeo = async (lat, lon, lang) => {
  try {
    const response = await axios.get(
      "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse",
      {
        params: {
          lat: lat,
          lon: lon,
          format: "json",
          "accept-language": lang,
          polygon_threshold: "0.0",
        },
        headers: {
          "x-rapidapi-key":
            "b59aed3692msh1c1f16c9b7fb44fp11a4e3jsn266455edca07",
          "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com",
        },
      }
    );
    console.log(response.data);
    return response.data.address.town;
  } catch (error) {
    console.error(error);
  }
};

// Solar Irradiation Function
export const SolarIrradiation = async (day1, day2, lat, lng) => {
  try {
    const response = await axios.get(
      "https://api.weatherbit.io/v2.0/history/daily",
      {
        params: {
          key: "5ce02f8695fe4c22a904ebb7b5688056",
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
