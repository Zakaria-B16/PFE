const loads = document.querySelector(".loads");
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
  placeholder="Number (ex:2)"
  required
/>

<input
  id="power"
  class="power col-md-4 mb-1 mt-1 form-control"
  type="text"
  placeholder="Load Power in Watt (ex:120)"
  required
/>

<input
  id="time"
  class="time col-md-4 mb-1 mt-1 form-control"
  type="text"
  placeholder="Use Time In Hours (ex:3)"
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
