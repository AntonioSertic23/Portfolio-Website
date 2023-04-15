var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.backgroundColor = "#faf9f9";
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.backgroundColor = "inherit";
    document.getElementById("navbar").style.top = "-85px";
  }
  prevScrollpos = currentScrollPos;
};
