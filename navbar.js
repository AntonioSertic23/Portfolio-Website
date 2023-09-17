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

/* CHANGING THEME */

const setTheme = (theme) => (document.documentElement.className = theme);

/* CUSTOM DROPDOWN */

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
  $(this).parents(".palette-options").find(".palette-option").removeClass("selection");
  $(this).addClass("selection");
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
    $(".palette-options").find(`[data-value='${theme}']`).addClass("selection");
    $(".palette-select").find(".palette-select-trigger").text($(".selection").first().text());
  } else {
    $(".palette-options").find("span").first().addClass("selection");
  }
}

getTheme();
