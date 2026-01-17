const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 50);
});


const menuToggle = document.getElementById("menuToggle");
const navBar = document.getElementById("navBar");

menuToggle.addEventListener("click", () => {
    navBar.classList.toggle("open");
});

window.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".section-animate");
  section.classList.add("show");
});
