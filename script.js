var isResized = false;

function resizeBox() {
  if (isResized === false) {
    var myDiv = document.getElementById("box");
    myDiv.style.height = "1005px";
    setTimeout(function () {
      myDiv.style.overflow = "visible";
    }, 500);
    isResized = true;
    document.getElementById("show-more-btn").innerHTML = "Prikaži manje";
  } else {
    var myDiv = document.getElementById("box");
    myDiv.style.overflow = "hidden";
    myDiv.style.height = "350px";
    isResized = false;
    document.getElementById("show-more-btn").innerHTML = "Prikaži više";
    document.getElementById("more-projects-section").scrollIntoView();
  }
}
