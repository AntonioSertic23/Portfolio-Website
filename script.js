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
