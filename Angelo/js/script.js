const navToggle = document.querySelector("#navToggle");
const navClose = document.querySelector("#navClose");
const navLinks = document.querySelector("#navLinks");
const navOverlay = document.querySelector("#navOverlay");

navToggle.addEventListener("click", function () {
  navLinks.classList.add("open");
  navOverlay.classList.add("open");
});

navClose.addEventListener("click", function () {
  navLinks.classList.remove("open");
  navOverlay.classList.remove("open");
});
