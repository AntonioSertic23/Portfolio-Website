"use strict";

/* ===================================================================
   TOGGLE EXPANDABLE BOX
   =================================================================== */
let isResized = false;

/**
 * Expands or collapses the project box.
 * - Expands with overflow visible after animation.
 * - Collapses with overflow hidden and scrolls into view.
 */
function toggleBox() {
  $("#box").toggleClass("show-full-box");

  if (!isResized) {
    setTimeout(() => $("#box").css("overflow", "visible"), 500);
    isResized = true;
    $("#show-more-btn").html("Show Less");
  } else {
    $("#box").css("overflow", "hidden");
    isResized = false;
    $("#show-more-btn").html("Show More");
    document.querySelector("#more-projects-section").scrollIntoView();
  }
}

// Bind Show More/Less button
$("#show-more-btn").on("click", toggleBox);

/* ===================================================================
   MODAL HANDLING
   =================================================================== */
const $modal = $("#resumeModal");

/**
 * Opens the resume modal.
 */
const openModal = () => $modal.css("display", "block");

/**
 * Closes the resume modal.
 */
const closeModal = () => $modal.css("display", "none");

// Open/close modal events
$("#open_resume_btn").on("click", openModal);
$(".close, #cancelModal").on("click", closeModal);

// Close modal on outside click
$(window).on("click", (event) => {
  if (event.target === $modal[0]) closeModal();
});

// Open selected resume PDF
$("#openResume").on("click", () => {
  const selectedLanguage = $('input[name="language"]:checked').val();
  const selectedTheme = $('input[name="theme"]:checked').val();

  window.open(`./assets/resumes/CV-Antonio_Sertić-${selectedLanguage}_${selectedTheme}.pdf`, "_blank");
  closeModal();
});

/* ===================================================================
   LAZY LOADING IMAGES
   =================================================================== */
const imgTargets = $("img[data-src]");

/**
 * Loads images lazily when they enter the viewport.
 *
 * @param {IntersectionObserverEntry[]} entries - Observed entries.
 * @param {IntersectionObserver} observer - The observer instance.
 */
const loadImg = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const $img = $(entry.target);
    $img.attr("src", $img.attr("data-src"));

    $img.on("load", () => $img.removeClass("lazy-img"));

    observer.unobserve(entry.target);
  });
};

// Observer for lazy-loading images
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});

// Attach observer to each image
imgTargets.each(function () {
  imgObserver.observe(this);
});

/* ===================================================================
   REVEAL SECTIONS ON SCROLL
   =================================================================== */
const allSections = document.querySelectorAll(".section");

/**
 * Reveals hidden sections when they enter the viewport.
 *
 * @param {IntersectionObserverEntry[]} entries - Observed entries.
 * @param {IntersectionObserver} observer - The observer instance.
 */
const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

// Observer for revealing sections
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// Attach observer to all sections
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
