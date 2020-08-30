import { finalTranslater } from "../lang.js";

export const generatePDF = (ondPower, cableSection, l) => {
  const address = document.getElementById("address").innerHTML;
  const geocode = document.getElementById("geocode").innerHTML;
  const solar = document.getElementById("solar-irradiation").innerHTML;
  const chargePower = document.getElementById("charge-power").innerHTML;
  const sizing = document.getElementById("sizing").innerHTML;
  const pvNumber = document.getElementById("pv-number").innerHTML;
  const batteryNumber = document.getElementById("battery-number").innerHTML;
  const enventer = document.querySelector(".enventer").innerHTML;
  const section = document.querySelector(".section").innerHTML;
  const regulator = document.getElementById("regulator");
  const cable = document.getElementById("cable");

  let regulatorOutput = regulator.innerHTML;

  regulatorOutput = `<div class="card-block">
  <ul class="list-group">
  <li class="list-group-item">${enventer}</li>
  </ul>
  </div>`;

  let cableOutput = cable.innerHTML;

  cableOutput = `<ul class="list-group">
  <li class="list-group-item">${section}</li>
  </ul>`;

  let bg = `<div class="bg">
  <img src="img/favicon.png" alt="">
  </div>`;

  let pub = `<h4>PV Sizer <span>www.pvsizer.ml</span></h4>`;

  const element = `<div id="pdf">
  <div class="container">
  ${
    address +
    geocode +
    solar +
    chargePower +
    sizing +
    pvNumber +
    batteryNumber +
    regulatorOutput +
    cableOutput +
    bg +
    pub
  }
  </div>
</div>`;
  // finalTranslater();
  // Choose the element and save the PDF for our user.
  html2pdf().from(element).save("Sizing-Result");
};
