import { text } from "./text.js";

localStorage.getItem("language");

// Select DOM Elements
const landingHeading = document.querySelector(".landing-heading");
const landingText = document.querySelector(".landing-text");
const startBtn = document.querySelectorAll(".start-btn");
const aboutBtn = document.querySelector(".about-btn");
const aboutHeading = document.querySelector(".about-heading");
const aboutText = document.querySelector(".about-text");
const codeBtn = document.querySelector(".code-btn");
const made = document.querySelector(".made");
const copy = document.querySelector(".copy");
const location = document.querySelector(".location");
const days = document.querySelector(".days");
const add = document.querySelector(".add");
const del = document.querySelector(".delete");
const submit = document.querySelector(".submit");
const langBtn = document.querySelectorAll(".lang-list button");
const loader = document.getElementById("loader");

// Set Localstorage
let language = localStorage.getItem("language");

// Declare Varibales
var lang = language;

window.addEventListener("load", () => {
  loader.classList.add("remove");
});

window.addEventListener("beforeunload", () => {
  loader.classList.remove("remove");
  loader.classList.add("move");
});

// Get Langage From localstorage
const localStorageLang = () => {
  if (language !== null) {
    langBtn.forEach((element) => {
      element.classList.remove("active");

      if (element.dataset.lang === language) {
        element.classList.add("active");
      }
      landingHeading !== null ? homeTranslater() : null;
      location !== null ? pvFormTranslater() : null;
      document.querySelector("popup") !== null ? errorTrans() : null;
      document.querySelectorAll(".number") !== null ? loadTranslater() : null;
      document.querySelector(".pv-power") !== null ? resultTranslater() : null;
      document.querySelector(".choose-1") !== null ? exempleTranslater() : null;
      document.querySelector(".pv-m-number") !== null
        ? calculTranslater()
        : null;
      document.querySelector(".cable-length") !== null
        ? cableTranslater()
        : null;
      document.querySelector(".cable-section") !== null
        ? pdfTranslater()
        : null;
    });
  }
};

// Choose Langage Function
const chooseLang = () => {
  langBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      langBtn.forEach((element) => {
        element.classList.remove("active");
      });
      e.target.classList.add("active");

      lang = e.target.dataset.lang;
      localStorage.setItem("language", lang);

      landingHeading !== null ? homeTranslater() : null;
      location !== null ? pvFormTranslater() : null;
      document.querySelector("popup") !== null ? errorTrans() : null;
      document.querySelectorAll(".number") !== null ? loadTranslater() : null;
      document.querySelector(".pv-power") !== null ? resultTranslater() : null;
      document.querySelector(".choose-1") !== null ? exempleTranslater() : null;
      document.querySelector(".pv-m-number") !== null
        ? calculTranslater()
        : null;
      document.querySelector(".cable-length") !== null
        ? cableTranslater()
        : null;
      document.querySelector(".cable-section") !== null
        ? pdfTranslater()
        : null;
      languageFunction();
    });
  });
};

chooseLang();
document.querySelector("alert") !== null ? errorTrans() : null;

// Home Page Translate Function
export const homeTranslater = () => {
  if (lang === "fr") {
    landingHeading.innerText = text.fr["landing-heading"];
    landingText.innerText = text.fr["landing-text"];
    startBtn.forEach((btn) => {
      btn.innerText = text.fr["start-btn"];
    });
    aboutBtn.innerText = text.fr["about-btn"];
    aboutHeading.innerText = text.fr["about-heading"];
    aboutText.innerText = text.fr["about-text"];
    codeBtn.innerText = text.fr["code-btn"];
    made.innerText = text.fr["made"];
    copy.innerHTML = text.fr["copy"];
  } else {
    landingHeading.innerText = text.en["landing-heading"];
    landingText.innerText = text.en["landing-text"];
    startBtn.forEach((btn) => {
      btn.innerText = text.en["start-btn"];
    });
    aboutBtn.innerText = text.en["about-btn"];
    aboutHeading.innerText = text.en["about-heading"];
    aboutText.innerText = text.en["about-text"];
    codeBtn.innerText = text.en["code-btn"];
    made.innerText = text.en["made"];
    copy.innerHTML = text.en["copy"];
  }
};

// PV Form Translate Function
const pvFormTranslater = () => {
  if (lang === "fr") {
    made.innerText = text.fr["made"];
    copy.innerHTML = text.fr["copy"];
    location.innerText = text.fr["location"];
    document.getElementById("location-input").placeholder =
      text.fr["location-input"];
    days.innerText = text.fr["days"];
    document.getElementById("number-day-input").placeholder =
      text.fr["days-input"];
    add.innerText = text.fr["add"];
    del.innerText = text.fr["del"];
    submit.innerText = text.fr["submit"];
  } else {
    made.innerText = text.en["made"];
    copy.innerHTML = text.en["copy"];
    location.innerText = text.en["location"];
    location.innerText = text.en["location"];
    document.getElementById("location-input").placeholder =
      text.en["location-input"];
    days.innerText = text.en["days"];
    document.getElementById("number-day-input").placeholder =
      text.en["days-input"];
    add.innerText = text.en["add"];
    del.innerText = text.en["del"];
    submit.innerText = text.en["submit"];
  }
};

export const errorTrans = () => {
  if (lang === "fr") {
    let message = text.fr["error"];
    return message;
  } else {
    let message = text.en["error"];
    return message;
  }
};

// Loads
export const loadTranslater = () => {
  if (lang === "fr") {
    document.querySelectorAll(".number").forEach((element) => {
      element.placeholder = text.fr["number"];
    });
    document.querySelectorAll(".power").forEach((element) => {
      element.placeholder = text.fr["power"];
    });
    document.querySelectorAll(".time").forEach((element) => {
      element.placeholder = text.fr["time"];
    });
  } else {
    document.querySelectorAll(".number").forEach((element) => {
      element.placeholder = text.en["number"];
    });
    document.querySelectorAll(".power").forEach((element) => {
      element.placeholder = text.en["power"];
    });
    document.querySelectorAll(".time").forEach((element) => {
      element.placeholder = text.en["time"];
    });
  }
};

// Results
export const resultTranslater = () => {
  if (lang === "fr") {
    document.querySelector(".angle").innerText = text.fr["angle"];
    document.querySelector(".orientation").innerText = text.fr["orientation"];
    document.querySelector(".first-irradiance").innerText =
      text.fr["first-irradiance"];

    document.querySelector(".energy").innerText = text.fr["energy"];
    document.querySelector(".d-power").innerText = text.fr["d-power"];
    document.querySelectorAll(".day-output").forEach((element) => {
      element.innerText = text.fr["day-output"];
    });
    document.querySelector(".pv-power").innerText = text.fr["pv-power"];
    document.querySelector(".pv-battery").innerText = text.fr["pv-battery"];

    if (document.querySelector(".orientation-result").innerText === "South") {
      document.querySelector(".orientation-result").innerText =
        text.fr["orientation-result-south"];
    } else if (
      document.querySelector(".orientation-result").innerText === "North"
    ) {
      document.querySelector(".orientation-result").innerText =
        text.fr["orientation-result-north"];
    }
  } else {
    document.querySelector(".angle").innerText = text.en["angle"];
    document.querySelector(".orientation").innerText = text.en["orientation"];
    document.querySelector(".first-irradiance").innerText =
      text.en["first-irradiance"];

    document.querySelector(".energy").innerText = text.en["energy"];
    document.querySelector(".d-power").innerText = text.en["d-power"];
    document.querySelectorAll(".day-output").forEach((element) => {
      element.innerText = text.en["day-output"];
    });
    document.querySelector(".pv-power").innerText = text.en["pv-power"];
    document.querySelector(".pv-battery").innerText = text.en["pv-battery"];

    if (document.querySelector(".orientation-result").innerText === "Sud") {
      document.querySelector(".orientation-result").innerText =
        text.en["orientation-result-south"];
    } else if (
      document.querySelector(".orientation-result").innerText === "Nord"
    ) {
      document.querySelector(".orientation-result").innerText =
        text.en["orientation-result-north"];
    }
  }
};

// Exemple
export const exempleTranslater = () => {
  if (lang === "fr") {
    document.querySelector(".choose-1").innerText = text.fr["choose-1"];
    document.querySelector(".choose-2").innerText = text.fr["choose-2"];
    document.querySelector(".choose-confirm").innerText =
      text.fr["choose-confirm"];
  } else {
    document.querySelector(".choose-1").innerText = text.en["choose-1"];
    document.querySelector(".choose-2").innerText = text.en["choose-2"];
    document.querySelector(".choose-confirm").innerText =
      text.en["choose-confirm"];
  }
};

// Calculs
export const calculTranslater = () => {
  if (lang === "fr") {
    document.querySelector(".pv-m-number").innerText = text.fr["pv-m-number"];
    document.querySelector(".pv-ms-number").innerText = text.fr["pv-ms-number"];
    document.querySelector(".pv-mp-number").innerText = text.fr["pv-mp-number"];
    document.querySelector(".b-number").innerText = text.fr["b-number"];
    document.querySelector(".b-s-number").innerText = text.fr["b-s-number"];
    document.querySelector(".b-p-number").innerText = text.fr["b-p-number"];
    document.querySelector(".ond").innerText = text.fr["ond"];
    document.querySelector(".cable-btn").innerText = text.fr["cable-btn"];
  } else {
    document.querySelector(".pv-m-number").innerText = text.en["pv-m-number"];
    document.querySelector(".pv-ms-number").innerText = text.en["pv-ms-number"];
    document.querySelector(".pv-mp-number").innerText = text.en["pv-mp-number"];
    document.querySelector(".b-number").innerText = text.en["b-number"];
    document.querySelector(".b-s-number").innerText = text.en["b-s-number"];
    document.querySelector(".b-p-number").innerText = text.en["b-p-number"];
    document.querySelector(".ond").innerText = text.en["ond"];
    document.querySelector(".cable-btn").innerText = text.en["cable-btn"];
  }
};

// Cable Form
export const cableTranslater = () => {
  if (lang === "fr") {
    document.querySelector(".cable-length").placeholder =
      text.fr["cable-length"];
    document.querySelector(".size-cable").innerText = text.fr["size-cable"];
  } else {
    document.querySelector(".cable-length").placeholder =
      text.en["cable-length"];
    document.querySelector(".size-cable").innerText = text.en["size-cable"];
  }
};

// PDF
export const pdfTranslater = () => {
  if (lang === "fr") {
    document.querySelector(".cable-section").innerText =
      text.fr["cable-section"];
    document.querySelector(".pdf-btn").innerText = text.fr["pdf-btn"];
  } else {
    document.querySelector(".cable-section").innerText =
      text.en["cable-section"];
    document.querySelector(".pdf-btn").innerText = text.en["pdf-btn"];
  }
};
document.onload = localStorageLang();

export const finalTranslater = () => {
  let ond;
  let sec;
  if (lang === "fr") {
    ond = document.querySelector(".ond-pdf").innerText = text.fr["ond"];
    sec = document.querySelector(".cable-section-pdf").innerText =
      text.fr["cable-section"];
  } else {
    ond = document.querySelector(".ond-pdf").innerText = text.en["ond"];
    sec = document.querySelector(".cable-section-pdf").innerText =
      text.en["cable-section"];
  }
  return [ond, sec];
};

export const languageFunction = () => {
  if (lang === "fr") {
    return lang;
  } else {
    return lang;
  }
};
