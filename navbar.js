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

$(".custom-select").each(function () {
  var classes = $(this).attr("class");
  var template = '<div class="' + classes + '">';
  template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + "</span>";
  template += '<div class="custom-options">';
  $(this)
    .find("option")
    .each(function () {
      template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + "</span>";
    });
  template += "</div></div>";

  $(this).wrap('<div class="custom-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});
$(".custom-option:first-of-type").hover(
  function () {
    $(this).parents(".custom-options").addClass("option-hover");
  },
  function () {
    $(this).parents(".custom-options").removeClass("option-hover");
  }
);
$(".custom-select-trigger").on("click", function () {
  $("html").one("click", function () {
    $(".custom-select").removeClass("opened");
  });
  $(this).parents(".custom-select").toggleClass("opened");
  event.stopPropagation();
});
$(".custom-option").on("click", function () {
  $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
  $(this).addClass("selection");
  $(this).parents(".custom-select").removeClass("opened");
  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());

  setTheme($(this).data("value"));
  localStorage.setItem("theme", $(this).data("value"));
});

function getTheme() {
  const theme = localStorage.getItem("theme");
  if (theme) {
    setTheme(theme);
    $(".custom-select-wrapper").find("select").val(theme);
    $(".custom-options").find(`[data-value='${theme}']`).addClass("selection");
    $(".custom-select").find(".custom-select-trigger").text($(".selection").text());
  } else {
    $(".custom-options").find("span").first().addClass("selection");
  }
}

getTheme();
