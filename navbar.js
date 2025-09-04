"use strict";

/**
 * ------------------------
 * NAVBAR HIDE ON SCROLL
 * ------------------------
 * Hides the navbar when scrolling down, and shows it again when scrolling up.
 */
let prevScrollPos = window.pageYOffset;

window.addEventListener("scroll", () => {
  const currentScrollPos = window.pageYOffset;
  $("#navbar").css({ top: prevScrollPos > currentScrollPos ? "0" : "-116px" });
  prevScrollPos = currentScrollPos;
});

/* ===================================================================
   THEME HANDLING
   =================================================================== */

/**
 * Applies the selected theme by setting the class on <html>.
 * @param {string} theme - Theme name (CSS class).
 */
const setTheme = (theme) => (document.documentElement.className = theme);

/**
 * Retrieves the theme from localStorage and applies it.
 */
const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (theme) {
    setTheme(theme);
    updateDropdownSelection("palette", theme);
  }
};

/* ===================================================================
   GENERIC DROPDOWN BUILDER
   =================================================================== */

/**
 * Converts a native <select> element into a custom dropdown UI.
 *
 * @param {string} baseClass - Base class name ("palette" or "language").
 * @param {Function} onSelect - Callback executed when an option is selected.
 *                              Receives the selected value as parameter.
 */
function initCustomDropdown(baseClass, onSelect) {
  const selectClass = `.${baseClass}-select`;
  const optionClass = `${baseClass}-option`;
  const triggerClass = `${baseClass}-select-trigger`;
  const wrapperClass = `${baseClass}-select-wrapper`;

  // Build custom dropdown HTML
  $(selectClass).each(function () {
    const classes = $(this).attr("class");
    let template = `<div class="${classes}">`;
    template += `<span class="${triggerClass}">${$(this).attr("placeholder")}</span>`;
    template += `<div class="${baseClass}-options">`;

    $(this)
      .find("option")
      .each(function () {
        template += `<span class="${optionClass} ${$(this).attr("class")}" data-value="${$(this).attr("value")}" data-localization-key="${$(this).attr("value")}">${$(this).html()}</span>`;
      });

    template += "</div></div>";

    $(this).wrap(`<div class="${wrapperClass}"></div>`);
    $(this).hide().after(template);
  });

  /**
   * Open/close dropdown.
   * Ensures only one dropdown can be open at a time.
   */
  $(`.${triggerClass}`).on("click", function (e) {
    $(".opened").removeClass("opened"); // close others
    $(this).parents(selectClass).toggleClass("opened"); // toggle current

    $("html").one("click", () => $(selectClass).removeClass("opened"));
    e.stopPropagation();
  });

  /**
   * Handle option selection.
   */
  $(`.${optionClass}`).on("click", function () {
    const value = $(this).data("value");
    const wrapper = $(this).parents(`.${wrapperClass}`);
    const trigger = $(this).parents(selectClass).find(`.${triggerClass}`);

    wrapper.find("select").val(value);
    $(this).siblings().removeClass(`${baseClass}-selection`);
    $(this).addClass(`${baseClass}-selection`);
    $(this).parents(selectClass).removeClass("opened");

    trigger.text($(this).text()).attr("data-localization-key", value);

    onSelect(value); // execute callback
  });
}

/**
 * Updates dropdown UI when value is loaded from storage.
 *
 * @param {string} baseClass - Base class name ("palette" or "language").
 * @param {string} value - The value to select.
 */
function updateDropdownSelection(baseClass, value) {
  const selectClass = `.${baseClass}-select`;
  const trigger = $(selectClass).find(`.${baseClass}-select-trigger`);

  $(`.${baseClass}-select-wrapper`).find("select").val(value);
  $(`.${baseClass}-options`).find(`[data-value='${value}']`).addClass(`${baseClass}-selection`);

  trigger.text($(`.${baseClass}-selection`).first().text()).attr("data-localization-key", value);
}

/* ===================================================================
   LANGUAGE HANDLING
   =================================================================== */

const localizationData = {};

/**
 * Loads localization data for a given language from JSON file.
 *
 * @param {string} language - Language code ("en", "hr", ...).
 * @returns {Promise<void>} Resolves when data is loaded.
 */
const loadLocalizationData = (language) =>
  fetch(`../assets/languages/${language}.json`)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load ${language} data`);
      return response.json();
    })
    .then((data) => (localizationData[language] = data));

/**
 * Updates all elements with data-localization-key to selected language.
 *
 * @param {string} language - Language code.
 */
const updateLocalization = (language) => {
  document.querySelectorAll("[data-localization-key]").forEach((el) => {
    const key = el.getAttribute("data-localization-key");
    if (localizationData[language]?.[key]) {
      el.innerHTML = localizationData[language][key];
    }
  });
};

/**
 * Sets the active language.
 *
 * @param {string} language - Language code.
 */
const setLanguage = (language) => {
  localStorage.setItem("language", language);
  updateLocalization(language);
  updateDropdownSelection("language", language);
};

/* ===================================================================
   INIT APP
   =================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Init theme dropdown
  initCustomDropdown("palette", (value) => {
    setTheme(value);
    localStorage.setItem("theme", value);
  });
  getTheme();

  // Init language dropdown
  Promise.all([loadLocalizationData("hr"), loadLocalizationData("en")])
    .then(() => {
      initCustomDropdown("language", (value) => setLanguage(value));
      const savedLang = localStorage.getItem("language");
      setLanguage(savedLang && localizationData[savedLang] ? savedLang : "en");
    })
    .catch(console.error);
});
