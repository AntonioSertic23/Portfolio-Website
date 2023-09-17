"use strict";

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    // TODO: tu je bilo prije "top" promjena i background colora jer se na modelu vidi iznad...
    $("#navbar").css({ top: "0" });
  } else {
    $("#navbar").css({ top: "-88px" });
  }
  prevScrollpos = currentScrollPos;
};

/* CHANGE THEME */

const setTheme = (theme) => (document.documentElement.className = theme);

/* PALETTE DROPDOWN */

$(".palette-select").each(function () {
  var classes = $(this).attr("class");
  var template = '<div class="' + classes + '">';
  template += '<span class="palette-select-trigger">' + $(this).attr("placeholder") + "</span>";
  template += '<div class="palette-options">';
  $(this)
    .find("option")
    .each(function () {
      template += '<span class="palette-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + "</span>";
    });
  template += "</div></div>";

  $(this).wrap('<div class="palette-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});
$(".palette-option:first-of-type").hover(
  function () {
    $(this).parents(".palette-options").addClass("option-hover");
  },
  function () {
    $(this).parents(".palette-options").removeClass("option-hover");
  }
);
$(".palette-select-trigger").on("click", function () {
  $("html").one("click", function () {
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
  $(this).parents(".palette-select").find(".palette-select-trigger").text($(this).text());

  setTheme($(this).data("value"));
  localStorage.setItem("theme", $(this).data("value"));
});

function getTheme() {
  const theme = localStorage.getItem("theme");
  if (theme) {
    setTheme(theme);
    $(".palette-select-wrapper").find("select").val(theme);
    $(".palette-options").find(`[data-value='${theme}']`).addClass("palette-selection");
    $(".palette-select").find(".palette-select-trigger").text($(".palette-selection").first().text());
  } else {
    $(".palette-options").find("span").first().addClass("palette-selection");
  }
}

getTheme();

/* CHANGE LANGUAGE */

const localizationData = {};

async function loadLocalizationData(language) {
  try {
    const response = await fetch(`./assets/languages/${language}.json`);
    const data = await response.json();
    localizationData[language] = data;
  } catch (error) {
    console.error(`Error loading localization data for ${language}: ${error}`);
  }
}

async function updateLocalization(language) {
  const elementsToUpdate = document.querySelectorAll("[data-localization-key]");

  elementsToUpdate.forEach((element) => {
    const key = element.getAttribute("data-localization-key");
    if (localizationData[language] && localizationData[language][key]) {
      element.innerHTML = localizationData[language][key];
    }
  });
}

loadLocalizationData("hr");

loadLocalizationData("en").then(() => {
  const theme = localStorage.getItem("language");
  if (theme) {
    updateLocalization(theme);
    $(".language-select-wrapper").find("select").val(theme);
    $(".language-options").find(`[data-value='${theme}']`).addClass("language-selection");
    $(".language-select").find(".language-select-trigger").text($(".language-selection").first().text());
  } else {
    $(".language-options").find("span").first().addClass("language-selection");
    updateLocalization("en");
  }
});

/* LANGUAGE DROPDOWN */

$(".language-select").each(function () {
  var classes = $(this).attr("class");
  var template = '<div class="' + classes + '">';
  template += '<span class="language-select-trigger">' + $(this).attr("placeholder") + "</span>";
  template += '<div class="language-options">';
  $(this)
    .find("option")
    .each(function () {
      template += '<span class="language-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + "</span>";
    });
  template += "</div></div>";

  $(this).wrap('<div class="language-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});
$(".language-option:first-of-type").hover(
  function () {
    $(this).parents(".language-options").addClass("option-hover");
  },
  function () {
    $(this).parents(".language-options").removeClass("option-hover");
  }
);
$(".language-select-trigger").on("click", function () {
  $("html").one("click", function () {
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
