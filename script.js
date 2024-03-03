"use strict";

var isResized = false;

function resizeBox() {
  $("#box").toggleClass("show-full-box");

  if (isResized === false) {
    setTimeout(function () {
      $("#box").css("overflow", "visible");
    }, 500);
    isResized = true;
    $("#show-more-btn").html("Prikaži manje");
  } else {
    $("#box").css("overflow", "hidden");
    isResized = false;
    $("#show-more-btn").html("Prikaži više");
    $("#more-projects-section")[0].scrollIntoView();
  }
}

const modal = $("#resumeModal");

$("#open_resume_btn").click(() => {
  modal.css("display", "block");
});

$(".close").click(() => {
  modal.css("display", "none");
});

$(window).click((event) => {
  if (event.target == modal[0]) {
    modal.css("display", "none");
  }
});

$("#cancelModal").click(() => {
  modal.css("display", "none");
});

$("#openResume").click(() => {
  const selectedLanguage = $('input[name="language"]:checked').val();
  const selectedTheme = $('input[name="theme"]:checked').val();

  window.open(`./assets/resumes/CV-Antonio_Sertić-${selectedLanguage}_${selectedTheme}.pdf`, "_blank");
  modal.css("display", "none");
});
