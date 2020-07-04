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
  type="number"
  placeholder="Number (ex : 2)"
  required
/>

<input
  id="power"
  class="power col-md-4 mb-1 mt-1 form-control"
  type="number"
  placeholder="Load Power in Watt (ex : 120)"
  required
/>

<input
  id="time"
  class="time col-md-4 mb-1 mt-1 form-control"
  type="number"
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
        form.lastChild.remove();
      }, 1000);
    }, 5000);
  }
};
