var isResized = false;

function resizeBox() {
  $("#box").toggleClass("show-full-box");

  if (isResized === false) {
    var myDiv = document.getElementById("box");
    setTimeout(function () {
      myDiv.style.overflow = "visible";
    }, 500);
    isResized = true;
    document.getElementById("show-more-btn").innerHTML = "Prikaži manje";
  } else {
    var myDiv = document.getElementById("box");
    myDiv.style.overflow = "hidden";
    isResized = false;
    document.getElementById("show-more-btn").innerHTML = "Prikaži više";
    document.getElementById("more-projects-section").scrollIntoView();
  }
}
