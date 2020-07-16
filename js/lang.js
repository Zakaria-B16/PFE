import { homeTranslate } from "./text.js";
const langBtn = document.querySelectorAll(".lang-list button");

langBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    langBtn.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");

    let lang = e.target.dataset.lang;

    homeTranslate(lang);
  });
});
