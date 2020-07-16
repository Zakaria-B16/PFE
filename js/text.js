const text = {
  en: {
    "landing-heading": "Welcome To PV Sizer",
    "landing-text": `Proper sizing of an installation is an essential step to master, for this, we created a web app to make a pv system sizing just by inserting your location and desired charges and you, easy to use with precise results`,
    "start-btn": `Start Sizing`,
    "about-btn": `About Our Work`,
    "about-heading": "Our Work",
    "about-text": `Our work consists in realizing an interface for the dimensioning of the autonomous photovoltaic installations in any place in the world, we used HTML as a rendering language and JavaScript to receive and manage the data and do the calculations. The customer must enter the location where he wants to install perform his installation, the number of days of autonomy and its charges with their powers, the time of daily use. Then we used an API (Application Programming Interface) to retrieve the latitude and longitude of the place entered with which we will have the daily global sunshine from another API also specialized in this field.`,
    "code-btn": "See The Code",
    made: "Made By Zakaria BOURENANE & Yanis BENMEZIANE",
    copy: `ALL RIGHTS RESERVED 2020 <i class="fa fa-copyright" aria-hidden="true"></i>`,
    location: "Enter your location",
    "location-input": "Location",
    days: "Enter number day of autonomy",
    "days-input": "Days",
    add: "ADD A CHARGE",
    del: "DELETE A CHARGE",
    submit: "START",
    number: "Number (ex : 2)",
    power: "Load Power in Watt (ex : 120)",
    time: "Use Time In Hours (ex : 3)",
    angle: "Angle Of Inclination :",
    orientation: "Orientation :",
    "first-irradiance": "Solar Irradiance On The",
    "second-irradiance": "Solar Irradiance On The",
    energy: "Daily Energy Consomation :",
    "d-power": "Daily Power Consomation :",
    "pv-power": "PV Power :",
    "pv-battery": "Battery Capacity :",
    "choose-1": "Choose your PV module :",
    "choose-2": "Choose your battery model :",
    "choose-confirm": "CONFIRM",
    "pv-m-number": "PV Module Number :",
    "pv-ms-number": "PV Module Serie Number :",
    "pv-mp-number": "PV Module Parallel Number :",
    "b-number": "Battery Number :",
    "b-s-number": "Battery Serie Number :",
    "b-p-number": "Battery Parallel Number :",
    ond: "Inverter :",
    "cable-length": "Cable length in m",
    "cable-btn": "START CABLE SIZING",
    "size-cable": "CABLE SIZING",
    "cable-section": "Cable Section :",
    "pdf-btn": "GENERATE RESULTS AS A PDF FILE",
  },
  fr: {
    "landing-heading": "Bienvenue à PV Sizer",
    "landing-text": `Le dimensionnement correct d'une installation est une étape essentielle à maîtriser, pour cela, nous avons créé une application web pour réaliser un dimensionnement de système PV simplement en insérant votre emplacement et les charges souhaitées et vous, facile à utiliser avec des résultats précis`,
    "start-btn": `Commencer Le Dimensionnement`,
    "about-btn": `A Propos De Notre Travail`,
    "about-heading": "Notre Travail",
    "about-text": `Notre travail consiste à réaliser une interface pour le dimensionnement des installations photovoltaïque autonomes dans n'importe quel lieu au monde, on a utilisé le HTML comme langage de rendu et le JavaScript pour recevoir et gérer les données et faire les calculs.
    Le client doit introduire la localisation où il veut installer réaliser son installation, le nombre de jours d’autonomie et ses charges avec leurs puissances, le temps d’utilisation journalière.
    Après on a utilisé un API (Application Programming Interface) pour récupérer la latitude et la longitude du lieu introduit avec lesquelles on aura l’ensoleillement global journalier de la part d’un autre API aussi spécialisé dans ce domaine.`,
    "code-btn": "Voir Le Code",
    made: "Realisé par Zakaria BOURENANE & Yanis BENMEZIANE",
    copy: `TOUT LES DROITS SONT RESERVES 2020 <i class="fa fa-copyright" aria-hidden="true"></i>`,
    location: "Indroduire votre localisation",
    "location-input": "Localisation",
    days: "Introduire nombre de jours d'autonomie",
    "days-input": "Jours",
    add: "AJOUTER UNE CHARGE",
    del: "SUPPRIMER UNE CHARGE",
    submit: "COMMENCER",
    number: "Nombre (ex : 2)",
    power: "Puissance D'une Charge en Watt (ex : 120)",
    time: "Durée D'utilisation (ex : 3)",
    angle: "Angle D'Inclination :",
    orientation: "Orientation :",
    "first-irradiance": "Irradiation Solaire Le",
    "second-irradiance": "Irradiation Solaire Le",
    energy: "Energie Consomée D'une journée :",
    "d-power": "Puissance Consomée D'une journée :",
    "pv-power": "Puissance Crete :",
    "pv-battery": "Capacité Des Batteries :",
    "choose-1": "Choisissez votre module PV :",
    "choose-2": "Choisissez votre modele de batterie :",
    "choose-confirm": "CONFIRMER",
    "pv-m-number": "Nombre De Module PV :",
    "pv-ms-number": "Nombre De Module PV En Serie :",
    "pv-mp-number": "Nombre De Module PV En parallele :",
    "b-number": "Nombre De Batteries :",
    "b-s-number": "Nombre De Batteries En serie :",
    "b-p-number": "Nombre De Batteries En Parallele :",
    ond: "Onduleur :",
    "cable-length": "Longueur d'un cable en m",
    "cable-btn": "COMMENCER LE DIMENSIONNEMENT DES CABLES",
    "size-cable": "DIMENSIONNEMENT DES CABLES",
    "cable-section": "Section De Cable :",
    "pdf-btn": "GENERER LES RESULTATS COMME FICHER PDF",
  },
};

const landingHeading = document.querySelector(".landing-heading");
const landingText = document.querySelector(".landing-text");
const startBtn = document.querySelector(".start-btn");
const aboutBtn = document.querySelector(".about-btn");
const aboutHeading = document.querySelector(".about-heading");
const aboutText = document.querySelector(".about-text");
const codeBtn = document.querySelector(".code-btn");
const sizingBtn = document.querySelector(".sizing-btn");
const made = document.querySelector(".made");
const copy = document.querySelector(".copy");
const location = document.querySelector(".location");
const days = document.querySelector(".days");
const add = document.querySelector(".add");
const del = document.querySelector(".delete");
const submit = document.querySelector(".submit");
const langBtn = document.querySelectorAll(".lang-list button");

var lang;
export function choosed() {
  langBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      langBtn.forEach((element) => {
        element.classList.remove("active");
      });
      e.target.classList.add("active");

      lang = e.target.dataset.lang;

      pvFormTranslater();
      loadTranslater();
      continueTranslating();
      exempleTranslate();
      calculTranslate();
      cableTranslate();
      pdfTranslate();
      console.clear();
    });
  });
}

choosed();

export const homeTranslate = (lang) => {
  if (lang === "fr") {
    landingHeading.innerText = text.fr["landing-heading"];
    landingText.innerText = text.fr["landing-text"];
    startBtn.innerText = text.fr["start-btn"];
    aboutBtn.innerText = text.fr["about-btn"];
    aboutHeading.innerText = text.fr["about-heading"];
    aboutText.innerText = text.fr["about-text"];
    sizingBtn.innerText = text.fr["start-btn"];
    codeBtn.innerText = text.fr["code-btn"];
    made.innerText = text.fr["made"];
    copy.innerHTML = text.fr["copy"];
  } else {
    landingHeading.innerText = text.en["landing-heading"];
    landingText.innerText = text.en["landing-text"];
    startBtn.innerText = text.en["start-btn"];
    aboutBtn.innerText = text.en["about-btn"];
    aboutHeading.innerText = text.en["about-heading"];
    aboutText.innerText = text.en["about-text"];
    sizingBtn.innerText = text.en["start-btn"];
    codeBtn.innerText = text.en["code-btn"];
    made.innerText = text.en["made"];
    copy.innerHTML = text.en["copy"];
  }
};

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

export const continueTranslating = () => {
  if (lang === "fr") {
    document.querySelector(".angle").innerText = text.fr["angle"];
    document.querySelector(".orientation").innerText = text.fr["orientation"];
    document.querySelector(".first-irradiance").innerText =
      text.fr["first-irradiance"];
    document.querySelector(".second-irradiance").innerText =
      text.fr["second-irradiance"];
    document.querySelector(".energy").innerText = text.fr["energy"];
    document.querySelector(".d-power").innerText = text.fr["d-power"];
    document.querySelector(".pv-power").innerText = text.fr["pv-power"];
    document.querySelector(".pv-battery").innerText = text.fr["pv-battery"];
  } else {
    document.querySelector(".angle").innerText = text.en["angle"];
    document.querySelector(".orientation").innerText = text.en["orientation"];
    document.querySelector(".first-irradiance").innerText =
      text.en["first-irradiance"];
    document.querySelector(".second-irradiance").innerText =
      text.en["second-irradiance"];
    document.querySelector(".energy").innerText = text.en["energy"];
    document.querySelector(".d-power").innerText = text.en["d-power"];
    document.querySelector(".pv-power").innerText = text.en["pv-power"];
    document.querySelector(".pv-battery").innerText = text.fr["pv-battery"];
  }
};

export const exempleTranslate = () => {
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

export const calculTranslate = () => {
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

export const cableTranslate = () => {
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

export const pdfTranslate = () => {
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
