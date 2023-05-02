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
  $("body").removeClass("disable-scroll");
  $("nav").removeClass("inherit-background");
});

$(".sidebar a").click(function () {
  $("#toggleBtn").removeClass("open");
  $(".sidebar").removeClass("show-sidebar");
  $(".container").removeClass("blur-effect");
  $("body").removeClass("disable-scroll");
  $("nav").removeClass("inherit-background");
});
