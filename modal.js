$("#modal-close").click(function () {
  $("#modal").css("display", "none");
});

$(".modal-target").click(function (e) {
  var img = e.target;
  $("#modal").css("display", "block");
  $("#modal-content").attr("src", img.src);
});

$("#modal").click(function (e) {
  if (e.target === this) {
    this.style.display = "none";
  }
});
