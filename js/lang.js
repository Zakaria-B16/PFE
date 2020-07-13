const langBtn = document.querySelectorAll(".lang-list li button");

langBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    langBtn.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");

    let lang = e.target.dataset.lang;
    let text = document.body.innerText;
  });
});

function googleTranslateElementInit(lang) {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: `${lang}`,
      autoDisplay: false,
    },
    "sizing"
  );
  var a = document.getElementById("sizing");
  a.selectedIndex = 1;
  a.dispatchEvent(new Event("change"));
}

const translate = async (lang, text) => {
  try {
    const response = await axios.get(
      "https://systran-systran-platform-for-language-processing-v1.p.rapidapi.com/translation/text/translate",
      {
        headers: {
          "content-type": "application/octet-stream",
          "x-rapidapi-host":
            "systran-systran-platform-for-language-processing-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "b59aed3692msh1c1f16c9b7fb44fp11a4e3jsn266455edca07",
          useQueryString: true,
        },
        params: {
          source: "auto",
          target: lang,
          input: text,
        },
      }
    );

    let result = response.data.outputs[0].output;
    console.log(result.split(/\n/));

    console.log(Array.from(document.body.getElementsByTagName("*")));
  } catch (error) {
    console.error(error);
  }
};
