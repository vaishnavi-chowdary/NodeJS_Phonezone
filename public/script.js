const nav = document.querySelector(".nav"),
navOpenBtn = document.querySelector(".navOpenBtn"),
navCloseBtn = document.querySelector(".navCloseBtn");
const logo = document.querySelector(".logo");

navOpenBtn.addEventListener("click", () => {
  nav.classList.toggle("openNav"); 
  nav.classList.remove("openSearch");
  searchIcon.classList.replace("uil-times", "uil-search");
  navOpenBtn.classList.toggle("active"); 
});
navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
  navOpenBtn.classList.remove("active");
});
logo.addEventListener("click", () => {
  nav.classList.remove("openNav");
  navOpenBtn.classList.remove("active");
});

