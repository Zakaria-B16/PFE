import { loadTranslater } from "./lang.js";
export const loads = document.querySelector(".loads");
const add = document.querySelector(".add");
const del = document.querySelector(".delete");

// Add Charge
add.addEventListener("click", (e) => {
  e.preventDefault();
  // Remove Error Popup
  if (document.querySelectorAll(".popup").length === 1) {
    document.querySelector(".popup").remove();
  }

  // Create Container
  let container = document.createElement("div");
  container.classList = "container mt-1 mb-2";

  // Create Charge
  let newCharge = `<div class="charge row justify-content-between mb-2">
  <input
  id="number"
  class="number col-md-3"
  type="number"
  step="any"
  min="0"
  placeholder="Number (ex : 2)"
  required
/>

<input
  id="power"
  class="power col-md-4"
  type="number"
  step="any"
  min="0"
  placeholder="Load Power in Watt (ex : 120)"
  required
/>

<input
  id="time"
  step="any"
  min="0"
  class="time col-md-4"
  type="number"
  placeholder="Use Time In Hours (ex : 3)"
  required
/>
  </div>`;

  // Add Charge To Container
  container.innerHTML += newCharge;

  // Render Container
  loads.appendChild(container);

  // Translate
  loadTranslater();
});

// Delete Charge
del.addEventListener("click", (e) => {
  e.preventDefault();
  loads.lastChild.remove();
});

// Error Popup FUnction
export const ErrorPopup = (form) => {
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
        popup.remove();
      }, 1000);
    }, 5000);
  }
};
