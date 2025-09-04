// Close the sidebar and reset related UI effects
function closeSidebar() {
  $("#toggleBtn").removeClass("open");
  $(".sidebar").removeClass("show-sidebar");
  $(".container").removeClass("blur-effect");
  $("body").removeClass("disable-scroll");
  $("nav").removeClass("inherit-background");
}

// Toggle sidebar and UI effects when the toggle button is clicked
$("#toggleBtn").click(function () {
  $(this).toggleClass("open");
  $(".sidebar").toggleClass("show-sidebar");
  $(".container").toggleClass("blur-effect");
  $("body").toggleClass("disable-scroll");
  $("nav").toggleClass("inherit-background");
});

// Close sidebar when clicking outside (container) or on a sidebar link
$(".container, .sidebar a").click(closeSidebar);
