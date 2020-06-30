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

    let angle = Math.abs(parseInt(lat)) + 10;
    return [lat, lng, addressName, angle];
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
          key: "b2c424f0030e4c1face1ee511232d4fd",
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

// Calculation Function
export const calcul = async (dayInput, irradiation) => {
  let days = parseInt(dayInput.value);
  let energie = 0;
  let values = [];
  let total = [];
  let pvPower;
  let sum;
  let battery;
  let voltage;

  document.querySelectorAll(".charge").forEach((charge) => {
    let elements = Array.from(charge.children);
    elements.forEach((element) => {
      values = [parseFloat(element.value), ...values];
      // Get Inputs Values
      let number = values[0];
      let power = values[1];
      let time = values[2];

      // Calculate Energie For Each Charge
      energie = number * power * time;
    });

    total = [...total, energie];
  });

  // Calculate Total Energie
  sum = total.reduce((a, b) => a + b);

  // Calculate PV Power
  pvPower = (sum * 1000) / ((await irradiation) * 0.65);
  pvPower = pvPower.toFixed(2);

  // Check For Voltage
  if (pvPower < 500) {
    voltage = 12;
  } else if (500 <= pvPower < 2000) {
    voltage = 24;
  } else {
    voltage = 48;
  }

  // Calculate Battery Capacity
  battery = (days * sum) / (0.8 * voltage);
  battery = battery.toFixed(2);

  return [sum, pvPower, battery];
};

export const popUp = (form) => {
  if (form.childNodes.length === 9) {
    // Create A Popup
    let popup = document.createElement("div");
    popup.classList = "popup";
    // Render Popup
    popup.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
  Please add at least one charge
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>`;

    form.appendChild(popup);

    // Wait Before Delete Popup
    setTimeout(() => {
      popup.style.opacity = 1;
    }, 250);
    setTimeout(() => {
      popup.style.opacity = 0;
      setTimeout(() => {
        popup.style.display = "none";
        form.lastChild.remove();
      }, 1000);
    }, 5000);
  }
};
