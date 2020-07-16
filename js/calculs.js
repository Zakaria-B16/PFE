import { generatePDF } from "./lib/pdf.js";
import {
  calculTranslate,
  cableTranslate,
  pdfTranslate,
  exempleTranslate,
} from "./text.js";
//import { makePVSchema, makeBatterySchema } from "./schema.js";

// Calculation Function
export const startCalcul = async (dayInput, irradiation) => {
  let days = parseInt(dayInput.value);
  let energie = 0;
  let values = [];
  let total = [];
  let powers = [];
  let pvPower;
  let totalPower;
  let sum;
  let battery;
  let voltage;
  var number;
  var power;
  var time;

  document.querySelectorAll(".charge").forEach((charge) => {
    let elements = Array.from(charge.children);
    elements.forEach((element) => {
      values = [parseFloat(element.value), ...values];
      // Get Inputs Values
      time = values[0];
      power = values[1];
      number = values[2];

      // Calculate Energie For Each Charge
      energie = number * power * time;
    });

    powers = [power * number, ...powers];
    total = [...total, energie];
  });

  // Calculate Total Energie
  sum = total.reduce((a, b) => a + b);
  totalPower = powers.reduce((a, b) => a + b);
  totalPower = totalPower.toFixed(2);

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

  return [sum, totalPower, pvPower, voltage, battery];
};

// Installation Sizing Function
export const installtionSizing = async (
  exempleFrom,
  volt,
  pvPower,
  battery
) => {
  // Get Voltage
  const voltage = await volt;
  // Exemple Form
  exempleFrom.innerHTML = `<div class="input-group">
  <div class="input-group-prepend mb-2">
    <div class="input-group-text">
      <p class="d-block text-center mb-1 choose-1">Choose your PV module :</p>
      <div>
        <input
          id="pv-1"
          class="pv-check"
          type="radio"
          aria-label="Radio button for following text input"
          value="50"
          checked
        />
        <label for="pv-1">50W/12V</label>
      </div>
      <div>
        <input
          id="pv-2"
          class="pv-check"
          type="radio"
          aria-label="Radio button for following text input"
          value="100"
        />
        <label for="pv-2">100W/12V</label>
      </div>
      <div>
        <input
          id="pv-3"
          class="pv-check"
          type="radio"
          aria-label="Radio button for following text input"
          value="150"
        />
        <label for="pv-3">150W/12V</label>
      </div>
      <div>
        <input
          id="pv-4"
          class="pv-check"
          type="radio"
          aria-label="Radio button for following text input"
          value="200"
        />
        <label for="pv-4">200W/12V</label>
      </div>
      <div>
        <input
          id="pv-5"
          class="pv-check"
          type="radio"
          aria-label="Radio button for following text input"
          value="280"
        />
        <label for="pv-5">280W/12V</label>
      </div>
      <div>
        <input
          id="pv-6"
          class="pv-check"
          type="radio"
          aria-label="Radio button for following text input"
          value="335"
        />
        <label for="pv-6">335W/12V</label>
      </span>
    </div>
  </div>
  </div>
  <div class="input-group">
  <div class="input-group-prepend mb-2">
    <div class="input-group-text">
      <p class="d-block text-center mb-1 choose-2">Choose your battery model :</p>
      <div>
        <input
          id="battery-1"
          class="battery-check"
          type="radio"
          aria-label="Radio button for following text input"
          value="35"
          checked
        />
        <label for="battery-1">12V/35Ah</label>
      </div>
      <div>
        <input
          id="battery-2"
          name="battery"
          class="battery-check"
          type="radio"
          aria-label="Radio button for following text input"
          value="55"
        />
        <label for="battery-2">12V/55Ah</label>
      </div>
      <div>
        <input
          id="battery-3"
          name="battery"
          class="battery-check"
          type="radio"
          aria-label="Radio button for following text input"
          value="100"
        />
        <label for="battery-3">12V/100Ah</label>
      </div>
      <div>
        <input
          id="battery-4"
          name="battery"
          class="battery-check"
          type="radio"
          aria-label="Radio button for following text input"
          value="150"
        />
        <label for="battery-4">12V/150Ah</label>
      </div>
      <div>
        <input
          id="battery-5"
          name="battery"
          class="battery-check"
          type="radio"
          aria-label="Radio button for following text input"
          value="250"
        />
        <label for="battery-5">12V/250Ah</label>
      </div>
      <div>
        <input
          id="battery-6"
          name="battery"
          class="battery-check"
          type="radio"
          aria-label="Radio button for following text input"
          value="400"
        />
        <label for="battery-6">12V/400Ah</label>
      </span>
    </div>
  </div>
  </div>
  <button type="submit" class="btn submit btn-block choose-confirm">CONFIRM</button>`;

  exempleTranslate();
  // Scroll To Exemple Form
  exempleFrom.scrollIntoView({ block: "end", behavior: "smooth" });

  // Get Elements
  const pvCheck = document.querySelectorAll(".pv-check");
  const batteryCheck = document.querySelectorAll(".battery-check");

  // Check Only Choosed PV
  pvCheck.forEach((check) => {
    check.addEventListener("click", (e) => {
      pvCheck.forEach((element) => {
        element.checked = false;
      });

      // Select Element
      e.target.checked = true;
    });
  });

  // Check Only Choosed Battery
  batteryCheck.forEach((check) => {
    check.addEventListener("click", (e) => {
      batteryCheck.forEach((element) => {
        element.checked = false;
      });

      // Select Element
      e.target.checked = true;
    });
  });

  // Run PV & Battery Szing Function
  PVBatterySizing(
    exempleFrom,
    batteryCheck,
    pvCheck,
    pvPower,
    voltage,
    battery
  );
};

// PV & Battery Szing Function
const PVBatterySizing = (
  exempleFrom,
  batteryCheck,
  pvCheck,
  pvPower,
  voltage,
  battery
) => {
  exempleFrom.addEventListener("submit", (e) => calculateNumber(e));

  // Declare Variable
  let selectedPv;
  let selectedBattery;
  let pvNumber;
  let pvSerieNumber;
  let pvParalelNumber;
  let batteryNumber;
  let batterySerieNumber;
  let batteryParalelNumber;
  let ondPower;

  const calculateNumber = (e) => {
    e.preventDefault();

    // Get Value From Choosed PV
    pvCheck.forEach((element) => {
      if (element.checked) {
        selectedPv = parseInt(element.value);
      }
    });

    // Get Value From Choosed Battery
    batteryCheck.forEach((element) => {
      if (element.checked) {
        selectedBattery = parseInt(element.value);
      }
    });

    // Calculate PV Module
    pvNumber = Math.ceil(pvPower / selectedPv);
    pvSerieNumber = voltage / 12;
    pvParalelNumber = Math.ceil(pvNumber / pvSerieNumber);
    pvNumber = pvSerieNumber * pvParalelNumber;

    // Calculate Battery
    batterySerieNumber = voltage / 12 - 1;
    batteryParalelNumber = Math.ceil(battery / selectedBattery);
    batteryNumber = batterySerieNumber + batteryParalelNumber;

    // Calculate Inventer
    ondPower = Math.ceil(pvPower / (0.8 * 1000)) * 1000;

    // Render PV MOdules
    let pvNumberOutput = `<ul class="list-group">
    <li class="list-group-item">
      <strong
        ><i class="fas fa-align-justify"></i>
        <p class="pv-m-number">PV Module Number :</p> </strong
      > <span>${pvNumber}</span>
    </li>
    <li class="list-group-item">
      <strong
        ><i class="fas fa-align-justify"></i>
        <p class="pv-ms-number">PV Module Serie Number :</p></strong
      > <span>${pvSerieNumber}</span>
    </li>
    <li class="list-group-item">
      <strong
        ><i class="fas fa-align-justify"></i>
        <p class="pv-mp-number">PV Module Parallel Number :</p></strong
      > <span>${pvParalelNumber}</span>
    </li>
  </ul>`;

    // Render Batteries
    let batteryNumberOutput = `<ul class="list-group">
    <li class="list-group-item">
      <strong
        ><i class="fas fa-battery-full"></i>
        <p class="b-number">Battery Number :</p> </strong
      > <span>${batteryNumber}</span>
    </li>
    <li class="list-group-item">
      <strong
        ><i class="fas fa-battery-full"></i>
        <p class="b-s-number">Battery Serie Number :</p></strong
      > <span>${batterySerieNumber}</span>
    </li>
    <li class="list-group-item">
      <strong
        ><i class="fas fa-battery-full"></i>
        <p class="b-p-number">Battery Parallel Number :</p></strong
      > <span>${batteryParalelNumber}</span>
    </li>
    </ul>`;

    // Render Inventer
    let ondOutput = `<ul class="list-group mb-2">
    <li class="list-group-item">
      <strong
        ><i class="fas fa-wave-square"></i>
        <p class="ond">Inverter :</p> </strong
      > <span>12V/${ondPower}W</span>
    </li>
    </ul>
    <button id="cable-btn" class="btn submit btn-block mb-2 cable-btn">START CABLE SIZING</button>`;

    // Output PV MOdules
    document.getElementById("pv-number").innerHTML = pvNumberOutput;

    // Output Batteries
    document.getElementById("battery-number").innerHTML = batteryNumberOutput;

    // Output Inventer
    document.getElementById("regulator").innerHTML = ondOutput;

    calculTranslate();
    // Scrolll To Regulator
    document
      .getElementById("regulator")
      .scrollIntoView({ block: "end", behavior: "smooth" });

    // Start Cable Sizing Function
    cableSizingFunction(
      batterySerieNumber,
      batteryParalelNumber,
      pvSerieNumber,
      pvParalelNumber,
      selectedPv,
      voltage,
      ondPower
    );
  };
};

// Cable Sizing Function
const cableSizingFunction = (
  batterySerieNumber,
  batteryParalelNumber,
  pvSerieNumber,
  pvParalelNumber,
  selectedPv,
  voltage,
  ondPower
) => {
  document
    .getElementById("cable-btn")
    .addEventListener("click", () => cableSizing());

  const cableSizing = () => {
    // Render Cable Form
    let cableForm = `<div class="row justify-content-between">
          <input
            id="l"
            type="number"
            step="any"
            min="0"
            class="col-md-5 mb-2 cable-length"
            placeholder="Cable length in m"
            required
          />
          <button type="submit" class="btn add col-md-5 mb-2 size-cable">
            CABLE SIZING
          </button>
        </div>`;

    // Output Cable Form
    document.getElementById("cable-form").innerHTML = cableForm;

    // Scroll To Render Form
    document
      .getElementById("cable-form")
      .scrollIntoView({ block: "end", behavior: "smooth" });

    cableTranslate();
    document.getElementById("cable-form").addEventListener("submit", (e) => {
      e.preventDefault();

      // Get Cable Length Value
      let l = document.getElementById("l").value;

      // Calculate Courant
      let courant = (pvParalelNumber * selectedPv) / 12;

      // Calculate Cable Section
      let cableSection = Math.ceil((0.017 * l * courant) / (0.05 * voltage));

      // Render Cable Section
      let cableOUtput = `<ul class="list-group mb-2">
            <li class="list-group-item">
              <strong
                ><i class="far fa-dot-circle"></i>
                <p class="cable-section">Cable Section :</p> </strong
              > <span>${cableSection}mm^2</span>
            </li>
            </ul>
            <button id="PDF-btn" class="btn submit btn-block pdf-btn">
            GENERATE RESULTS AS A PDF FILE
            </button>
            `;

      // Output Cable Section
      document.getElementById("cable").innerHTML = cableOUtput;

      pdfTranslate();
      // Scroll To Cable Section
      document
        .getElementById("cable")
        .scrollIntoView({ block: "end", behavior: "smooth" });

      // document
      //   .getElementById("schema-btn")
      //   .addEventListener(
      //     "click",
      //     () => makePVSchema(pvSerieNumber, pvParalelNumber),
      //     makeBatterySchema(batterySerieNumber, batteryParalelNumber)
      //   );
      document
        .getElementById("PDF-btn")
        .addEventListener("click", () => generatePDF(ondPower, cableSection));
    });
  };
};
