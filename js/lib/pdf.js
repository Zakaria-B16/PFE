export const generatePDF = (ondPower, cableSection) => {
  const address = document.getElementById("address").innerHTML;
  const geocode = document.getElementById("geocode").innerHTML;
  const solar = document.getElementById("solar-irradiation").innerHTML;
  const chargePower = document.getElementById("charge-power").innerHTML;
  const sizing = document.getElementById("sizing").innerHTML;
  const pvNumber = document.getElementById("pv-number").innerHTML;
  const batteryNumber = document.getElementById("battery-number").innerHTML;
  const regulator = document.getElementById("regulator");
  const cable = document.getElementById("cable");

  let regulatorOutput = regulator.innerHTML;

  regulatorOutput = `<ul class="list-group">
  <li class="list-group-item">
    <strong
      ><i class="fas fa-wave-square"></i>
      <p>Inverter :</p> </strong
    > 12V/${ondPower}W
  </li>
  </ul>`;

  let cableOutput = cable.innerHTML;

  cableOutput = `<ul class="list-group">
  <li class="list-group-item">
    <strong
      ><i class="far fa-dot-circle"></i>
      <p>Cable Section :</p> </strong
    > ${cableSection}mm^2
  </li>
  </ul>`;

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
    cableOutput
  }
  </div>
</div>`;

  // Choose the element and save the PDF for our user.
  html2pdf().from(element).save("Sizing-Result");
};
