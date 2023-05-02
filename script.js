var isResized = false;

function resizeBox() {
  if (isResized === false) {
    var myDiv = document.getElementById("box");
    myDiv.style.height = "1233px";
    setTimeout(function () {
      myDiv.style.overflow = "visible";
    }, 500);
    isResized = true;
    document.getElementById("show-more-btn").innerHTML = "Prikaži manje";
  } else {
    var myDiv = document.getElementById("box");
    myDiv.style.overflow = "hidden";
    myDiv.style.height = "398px";
    isResized = false;
    document.getElementById("show-more-btn").innerHTML = "Prikaži više";
    document.getElementById("more-projects-section").scrollIntoView();
  }
}

function toggleNavbar() {
  // otvoriti model preko cijelog uz možda animaciju prema dolje
}

$("#toggleBtn").click(function () {
  $(this).toggleClass("open");
  $(".sidebar").toggleClass("show-sidebar");
  $(".container").toggleClass("blur-effect");
  $("body").toggleClass("disable-scroll");
  $("nav").toggleClass("inherit-background");
});

$(".container").click(function () {
  $("#toggleBtn").removeClass("open");
  $(".sidebar").removeClass("show-sidebar");
  $(".container").removeClass("blur-effect");
  $("body").toggleClass("disable-scroll");
});
