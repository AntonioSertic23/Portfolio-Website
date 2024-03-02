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

// TODO: Add functionality for selecting options and create logic to retrieve a specific resume based on that.

var modal = $("#myModal");
var btn = $("#open_resume_btn");
var span = $(".close");

btn.click(function () {
  modal.css("display", "block");
});

span.click(function () {
  modal.css("display", "none");
});

$(window).click(function (event) {
  if (event.target == modal[0]) {
    modal.css("display", "none");
  }
});

$("#btnCancel").click(function () {
  modal.css("display", "none");
});

$("#btnOk").click(function () {
  // Do something when OK button is clicked
  modal.css("display", "none");
});

// TODO: Potentially fix the issue with the navbar. It should be closed or removed when the modal is opened, and scrolling should be disabled once it's opened.

// TODO: Create a resume in all possible formats.
