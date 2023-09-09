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

/* CHANGING THEME */

const setTheme = (theme) => (document.documentElement.className = theme);

function getTheme() {
  const theme = localStorage.getItem("theme");
  if (theme) {
    setTheme(theme);
    // postaviti vrijednost selecta na vrijednost izabranog
    $(".custom-select-wrapper").find("select").val(theme);

    // dodati selection na novoizabrani
    $(".custom-options").find(`[data-value='${theme}']`).addClass("selection");

    // postaviti text u selectu
    $(".custom-select").find(".custom-select-trigger").text($(".selection").text());
  }
}

getTheme();

/* CUSTOM DROPDOWN */

$(".custom-select").each(function () {
  var classes = $(this).attr("class"),
    id = $(this).attr("id"),
    name = $(this).attr("name");
  var template = '<div class="' + classes + '">';
  template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + "</span>";
  template += '<div class="custom-options">';
  $(this)
    .find("option")
    .each(function () {
      template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + "</span>";
    });
  template += "</div></div>";

  $(this).wrap('<div class="custom-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});
$(".custom-option:first-of-type").hover(
  function () {
    $(this).parents(".custom-options").addClass("option-hover");
  },
  function () {
    $(this).parents(".custom-options").removeClass("option-hover");
  }
);
$(".custom-select-trigger").on("click", function () {
  $("html").one("click", function () {
    $(".custom-select").removeClass("opened");
  });
  $(this).parents(".custom-select").toggleClass("opened");
  event.stopPropagation();
});
$(".custom-option").on("click", function () {
  // postaviti vrijednost selecta na vrijednost izabranog
  $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
  // ukoliniti klasu selection sa prijašnjeg
  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
  // dodati selection na novoizabrani
  $(this).addClass("selection");
  // zatvoriti dropdown
  $(this).parents(".custom-select").removeClass("opened");
  // postaviti text u selectu
  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());

  // postavi temu i spremi ju
  setTheme($(this).data("value"));
  localStorage.setItem("theme", $(this).data("value"));
});
