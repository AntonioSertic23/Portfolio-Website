"use strict";

let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    $("#navbar").css({ top: "0" });
  } else {
    $("#navbar").css({ top: "-116px" });
  }
  prevScrollpos = currentScrollPos;
};

/* CHANGE THEME */

const setTheme = (theme) => (document.documentElement.className = theme);

/* PALETTE DROPDOWN */

$(".palette-select").each(function () {
  const classes = $(this).attr("class");
  let template = `<div class="${classes}">`;
  template += `<span class="palette-select-trigger">${$(this).attr("placeholder")}</span>`;
  template += '<div class="palette-options">';
  let counter = 0;
  $(this)
    .find("option")
    .each(function () {
      template += `<span class="palette-option ${$(this).attr("class")}" data-value="${$(this).attr("value")}" data-localization-key="${$(this).attr("value")}">${$(this).html()}</span>`;
    });
  template += "</div></div>";

  $(this).wrap('<div class="palette-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});

$(".palette-option:first-of-type").hover(
  () => {
    $(this).parents(".palette-options").addClass("option-hover");
  },
  () => {
    $(this).parents(".palette-options").removeClass("option-hover");
  }
);

$(".palette-select-trigger").on("click", function () {
  $("html").one("click", () => {
    $(".palette-select").removeClass("opened");
  });
  $(this).parents(".palette-select").toggleClass("opened");
  event.stopPropagation();
});

$(".palette-option").on("click", function () {
  $(this).parents(".palette-select-wrapper").find("select").val($(this).data("value"));
  $(this).parents(".palette-options").find(".palette-option").removeClass("palette-selection");
  $(this).addClass("palette-selection");
  $(this).parents(".palette-select").removeClass("opened");
  $(this).parents(".palette-select").find(".palette-select-trigger").text($(this).text()).attr("data-localization-key", $(this).data("value"));

  setTheme($(this).data("value"));
  localStorage.setItem("theme", $(this).data("value"));
});

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme) {
    setTheme(theme);
    $(".palette-select-wrapper").find("select").val(theme);
    $(".palette-options").find(`[data-value='${theme}']`).addClass("palette-selection");
    $(".palette-select").find(".palette-select-trigger").text($(".palette-selection").first().text()).attr("data-localization-key", theme);
  } else {
    $(".palette-options").find("span").first().addClass("palette-selection");
  }
};

getTheme();

/* CHANGE LANGUAGE */

const localizationData = {};

const loadLocalizationData = (language) => {
  return new Promise((resolve, reject) => {
    fetch(`../assets/languages/${language}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error loading localization data for ${language}: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        localizationData[language] = data;
        resolve();
      })
      .catch((error) => {
        reject(`Error loading localization data for ${language}: ${error}`);
      });
  });
};

const updateLocalization = (language) => {
  const elementsToUpdate = document.querySelectorAll("[data-localization-key]");
  elementsToUpdate.forEach((element) => {
    const key = element.getAttribute("data-localization-key");
    if (localizationData[language] && localizationData[language][key]) {
      element.innerHTML = localizationData[language][key];
    }
  });
};

const setLanguage = (language) => {
  localStorage.setItem("language", language);
  updateLocalization(language);
  $(".language-select-wrapper").find("select").val(language);
  $(".language-options").find(`[data-value='${language}']`).addClass("language-selection");
  $(".language-select").find(".language-select-trigger").text($(".language-selection").first().text());
};

Promise.all([loadLocalizationData("hr"), loadLocalizationData("en")])
  .then(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && localizationData[savedLanguage]) {
      setLanguage(savedLanguage);
    } else {
      setLanguage("en");
    }
  })
  .catch((error) => {
    console.error(error);
  });

/* LANGUAGE DROPDOWN */

$(".language-select").each(function () {
  const classes = $(this).attr("class");
  let template = `<div class="${classes}">`;
  template += `<span class="language-select-trigger">${$(this).attr("placeholder")}</span>`;
  template += '<div class="language-options">';
  $(this)
    .find("option")
    .each(function () {
      template += `<span class="language-option ${$(this).attr("class")}" data-value="${$(this).attr("value")}">${$(this).html()}</span>`;
    });
  template += "</div></div>";

  $(this).wrap('<div class="language-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});

$(".language-option:first-of-type").hover(
  () => {
    $(this).parents(".language-options").addClass("option-hover");
  },
  () => {
    $(this).parents(".language-options").removeClass("option-hover");
  }
);

$(".language-select-trigger").on("click", function () {
  $("html").one("click", () => {
    $(".language-select").removeClass("opened");
  });
  $(this).parents(".language-select").toggleClass("opened");
  event.stopPropagation();
});

$(".language-option").on("click", function () {
  $(this).parents(".language-select-wrapper").find("select").val($(this).data("value"));
  $(this).parents(".language-options").find(".language-option").removeClass("language-selection");
  $(this).addClass("language-selection");
  $(this).parents(".language-select").removeClass("opened");
  $(this).parents(".language-select").find(".language-select-trigger").text($(this).text());

  updateLocalization($(this).data("value"));
  localStorage.setItem("language", $(this).data("value"));
});
