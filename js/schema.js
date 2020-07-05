const schemaPV = document.getElementById("schema-pv");
const schemaBattery = document.getElementById("schema-battery");
var c;

export const makePVSchema = (rows, cols) => {
  schemaPV.style.setProperty("--rows", rows);
  schemaPV.style.setProperty("--colums", cols);
  for (c = 0; c < rows * cols; c++) {
    let cell = document.createElement("div");
    let image = document.createElement("img");
    image.src = "pv.svg";
    cell.appendChild(image);
    schemaPV.appendChild(cell).className = "grid-item";
  }
};

export const makeBatterySchema = (rows, cols) => {
  schemaBattery.style.setProperty("--rows", rows);
  schemaBattery.style.setProperty("--colums", cols);
  for (c = 0; c < rows + cols; c++) {
    let cell = document.createElement("div");
    let image = document.createElement("img");
    image.src = "battery.svg";
    cell.appendChild(image);
    schemaBattery.appendChild(cell).className = "grid-item";
  }
};
