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

// Lazy loading images

const imgTargets = $("img[data-src]");

const loadImg = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const $img = $(entry.target);
    $img.attr("src", $img.attr("data-src"));

    $img.on("load", function () {
      $img.removeClass("lazy-img");
    });

    observer.unobserve(entry.target);
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

imgTargets.each(function () {
  imgObserver.observe(this);
});
