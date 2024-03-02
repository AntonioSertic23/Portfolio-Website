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

// TODO: It needs to be determined whether to re-enable the modal on all single project pages for images by adding `<script defer src="../modal.js"></script>` or to create a large slider.
