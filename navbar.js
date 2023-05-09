var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    $("#navbar").css({ "background-color": "#faf9f9", top: "0" });
  } else {
    $("#navbar").css({ "background-color": "inherit", top: "-88px" });
  }
  prevScrollpos = currentScrollPos;
};
