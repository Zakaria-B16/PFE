export const loads = document.querySelector(".loads");
const add = document.querySelector(".add");
const del = document.querySelector(".delete");

add.addEventListener("click", (e) => {
  e.preventDefault();
  let container = document.createElement("div");
  container.classList = "container";
  let newCharge = `<div class="charge row justify-content-between">
  <input
  id="number"
  class="number col-md-3 mb-1 mt-1 form-control"
  type="text"
  placeholder="Number (ex : 2)"
  required
/>

<input
  id="power"
  class="power col-md-4 mb-1 mt-1 form-control"
  type="text"
  placeholder="Load Power in Watt (ex : 120)"
  required
/>

<input
  id="time"
  class="time col-md-4 mb-1 mt-1 form-control"
  type="text"
  placeholder="Use Time In Hours (ex : 3)"
  required
/>
  </div>`;
  container.innerHTML += newCharge;
  loads.appendChild(container);
});

del.addEventListener("click", (e) => {
  e.preventDefault();
  loads.lastChild.remove();
});

export const addModel = async (exempleFrom, volt, pvPower, battery) => {
  const voltage = await volt;
  exempleFrom.innerHTML = `<div class="input-group">
<div class="input-group-prepend mb-2">
  <div class="input-group-text">
    <p class="col-12 mb-1">Choose your PV module :</p>
    <div>
      <input
        id="first-pv"
        class="pv-check"
        type="radio"
        aria-label="Radio button for following text input"
        value="50"
      />
      <label for="first-pv">50W/12V</label>
    </div>
    <div>
      <input
        id="first-pv"
        class="pv-check"
        type="radio"
        aria-label="Radio button for following text input"
        value="100"
      />
      <label for="first-pv">100W/12V</label>
    </div>
    <div>
      <input
        id="first-pv"
        class="pv-check"
        type="radio"
        aria-label="Radio button for following text input"
        value="150"
      />
      <label for="first-pv">150W/12V</label>
    </div>
    <div>
      <input
        id="first-pv"
        class="pv-check"
        type="radio"
        aria-label="Radio button for following text input"
        value="200"
      />
      <label for="first-pv">200W/12V</label>
    </div>
    <div>
      <input
        id="first-pv"
        class="pv-check"
        type="radio"
        aria-label="Radio button for following text input"
        value="280"
      />
      <label for="first-pv">280W/12V</label>
    </div>
    <div>
      <input
        id="first-pv"
        class="pv-check"
        type="radio"
        aria-label="Radio button for following text input"
        value="335"
      />
      <label for="first-pv">335W/12V</label>
    </span>
  </div>
</div>
</div>
<div class="input-group">
<div class="input-group-prepend mb-2">
  <div class="input-group-text">
    <p class="col-12 mb-1">Choose your battery model :</p>
    <div>
      <input
        id="first-pv"
        class="battery-check"
        type="radio"
        aria-label="Radio button for following text input"
        value="12"
      />
      <label for="first-pv">12V/12Ah</label>
    </div>
    <div>
      <input
        id="first-pv"
        name="battery"
        class="battery-check"
        type="radio"
        aria-label="Radio button for following text input"
        value="35"
      />
      <label for="first-pv">12V/35Ah</label>
    </div>
    <div>
      <input
        id="first-pv"
        name="battery"
        class="battery-check"
        type="radio"
        aria-label="Radio button for following text input"
        value="55"
      />
      <label for="first-pv">12V/55Ah</label>
    </div>
    <div>
      <input
        id="first-pv"
        name="battery"
        class="battery-check"
        type="radio"
        aria-label="Radio button for following text input"
        value="100"
      />
      <label for="first-pv">12V/100Ah</label>
    </div>
    <div>
      <input
        id="first-pv"
        name="battery"
        class="battery-check"
        type="radio"
        aria-label="Radio button for following text input"
        value="150"
      />
      <label for="first-pv">12V/150Ah</label>
    </div>
    <div>
      <input
        id="first-pv"
        name="battery"
        class="battery-check"
        type="radio"
        aria-label="Radio button for following text input"
        value="250"
      />
      <label for="first-pv">12V/250Ah</label>
    </span>
  </div>
</div>
</div>
<button type="submit" class="btn btn-info btn-block">CONFIRM</button>`;

  exempleFrom.scrollIntoView({ block: "end", behavior: "smooth" });

  const pvCheck = document.querySelectorAll(".pv-check");
  const batteryCheck = document.querySelectorAll(".battery-check");

  pvCheck.forEach((check) => {
    check.addEventListener("click", (e) => {
      pvCheck.forEach((element) => {
        element.checked = false;
      });

      // Select Element
      e.target.checked = true;
    });
  });

  batteryCheck.forEach((check) => {
    check.addEventListener("click", (e) => {
      batteryCheck.forEach((element) => {
        element.checked = false;
      });

      // Select Element
      e.target.checked = true;
    });
  });

  exempleFrom.addEventListener("submit", (e) => calculateNumber(e));

  var selectedPv;
  var selectedBattery;
  var pvNumber;
  var pvSerieNumber;
  var pvParalelNumber;
  var batteryNumber;
  var batterySerieNumber;
  var batteryParalelNumber;
  var ondPower;
  var condition1 = true;
  var condition2 = true;

  const calculateNumber = (e) => {
    e.preventDefault();

    batteryCheck.forEach((element) => {
      if (element.checked) {
        selectedBattery = parseInt(element.value);
        condition1 = false;
      }
    });
    pvCheck.forEach((element) => {
      if (element.checked) {
        selectedPv = parseInt(element.value);
        condition2 = false;
      }
    });

    if (condition1 && condition2) {
      if (exempleFrom.childNodes.length === 1) {
        // Create A Popup
        let popup = document.createElement("div");
        popup.classList = "popup";
        // Render Popup
        popup.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
      Please choose a PV model and a battery
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`;

        exempleFrom.appendChild(popup);
        exempleFrom.scrollIntoView({ block: "end", behavior: "smooth" });

        // Wait Before Delete Popup
        setTimeout(() => {
          popup.style.opacity = 1;
        }, 250);
        setTimeout(() => {
          popup.style.opacity = 0;
          setTimeout(() => {
            popup.style.display = "none";
            exempleFrom.lastChild.remove();
          }, 1000);
        }, 5000);
      }

      return;
    }

    pvNumber = Math.ceil(pvPower / selectedPv);
    pvSerieNumber = voltage / 12;
    pvParalelNumber = Math.ceil(pvNumber / pvSerieNumber);
    pvNumber = pvSerieNumber * pvParalelNumber;

    batterySerieNumber = voltage / 12 - 1;
    batteryParalelNumber = Math.ceil(battery / selectedBattery);
    batteryNumber = batterySerieNumber + batteryParalelNumber;

    ondPower = Math.ceil(pvPower / (0.8 * 1000)) * 1000;

    let pvNumberOutput = `<ul class="list-group">
    <li class="list-group-item">
      <strong
        ><i class="fas fa-align-justify"></i>
        <p>PV Module Number :</p> </strong
      > ${pvNumber}
    </li>
    <li class="list-group-item">
      <strong
        ><i class="fas fa-align-justify"></i>
        <p>PV Module Serie Number :</p></strong
      > ${pvSerieNumber}
    </li>
    <li class="list-group-item">
      <strong
        ><i class="fas fa-align-justify"></i>
        <p>PV Module Parallel Number :</p></strong
      > ${pvParalelNumber}
    </li>
  </ul>`;

    let batteryNumberOutput = `<ul class="list-group">
    <li class="list-group-item">
      <strong
        ><i class="fas fa-battery-full"></i>
        <p>Battery Number :</p> </strong
      > ${batteryNumber}
    </li>
    <li class="list-group-item">
      <strong
        ><i class="fas fa-battery-full"></i>
        <p>Battery Serie Number :</p></strong
      > ${batterySerieNumber}
    </li>
    <li class="list-group-item">
      <strong
        ><i class="fas fa-battery-full"></i>
        <p>Battery Parallel Number :</p></strong
      > ${batteryParalelNumber}
    </li>
    </ul>`;

    let ondOutput = `<ul class="list-group mb-2">
    <li class="list-group-item">
      <strong
        ><i class="fas fa-wave-square"></i>
        <p>Inverter :</p> </strong
      > 12V/${ondPower}W
    </li>
    </ul>
    <button id="cable-btn" class="btn btn-dark btn-block mb-2">START CABLE SIZING</button>`;

    document.getElementById("pv-number").innerHTML = pvNumberOutput;

    document.getElementById("battery-number").innerHTML = batteryNumberOutput;

    document.getElementById("regulator").innerHTML = ondOutput;

    document
      .getElementById("regulator")
      .scrollIntoView({ block: "end", behavior: "smooth" });

    document
      .getElementById("cable-btn")
      .addEventListener("click", () => cableSizing());

    const cableSizing = () => {
      let cableForm = `<div class="row justify-content-between">
        <input
          id="l"
          type="text"
          class="col-md-5 form-control mb-2"
          placeholder="Cable length in m"
          required
        />
        <button id="cable-btn" type="submit" class="btn btn-warning col-md-5 mb-2">
          CABLE SIZING
        </button>
      </div>`;
      document.getElementById("cable-form").innerHTML = cableForm;
      document
        .getElementById("cable-form")
        .scrollIntoView({ block: "end", behavior: "smooth" });

      document.getElementById("cable-form").addEventListener("submit", (e) => {
        e.preventDefault();
        let l = document.getElementById("l").value;

        let courant = (pvParalelNumber * selectedPv) / 12;
        let cableSection = Math.ceil((0.017 * l * courant) / (0.05 * voltage));

        let cableOUtput = `<ul class="list-group">
          <li class="list-group-item">
            <strong
              ><i class="far fa-dot-circle"></i>
              <p>Cable Section :</p> </strong
            > ${cableSection}mm^2
          </li>
          </ul>`;

        document.getElementById("cable").innerHTML = cableOUtput;
        document
          .getElementById("cable")
          .scrollIntoView({ block: "end", behavior: "smooth" });
      });
    };
  };
};
