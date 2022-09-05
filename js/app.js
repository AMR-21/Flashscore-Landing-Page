"use strict";

const navigation = document.querySelector(".main-nav");
const navBtn = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector("#header");
const sections = document.querySelectorAll("section");
const current = document.querySelector(".current-section");
const homeSection = document.querySelector("#section-home");
const topBtn = document.querySelector(".btn-top");
const logo = document.querySelector(".main-logo");

// Building navigation dynamically

function buildNav() {
  const navFrag = document.createDocumentFragment();
  const items = navigation.textContent.trim().split(" ");

  for (const item of items) {
    // Creating list element
    const listEl = document.createElement("li");

    listEl.innerHTML = `
  <a href="#section-${item.toLowerCase()}" id=${item.toLowerCase()}  class="nav-link">
    <span class="nav-text">${item
      .toLowerCase()
      .replace(item[0], item[0].toUpperCase())}</span>
  </a>
  `;

    navFrag.append(listEl);
  }

  navigation.innerHTML = "";
  navigation.appendChild(navFrag);
}

buildNav();

// Setting main logo
function setLogo() {
  if (window.innerWidth <= 704) logo.src = "imgs/main-2.webp";
  else logo.src = "imgs/main-1.webp";
}

setLogo();
window.addEventListener("resize", setLogo);

// Implementing smooth scroll
const navLinks = document.querySelectorAll(".nav-link");
const ctaBtns = document.querySelectorAll(".cta");

// Smooth scroll function
function smoothScroll(target, e) {
  e.preventDefault();
  document
    .querySelector(`#section-${target}`)
    .scrollIntoView({ behavior: "smooth" });
}

// Adjusting scroll for nav links

for (const link of navLinks) {
  link.addEventListener(
    "click",
    smoothScroll.bind(null, link.getAttribute("id"))
  );
}

// Adjusting scroll for cta buttons
for (const btn of ctaBtns) {
  btn.addEventListener("click", smoothScroll.bind(null, "get"));
}

// For hero CTA button

// Toggling active section

window.addEventListener("scroll", (e) => {
  let scrollPos = window.scrollY;
  for (const section of sections) {
    // Selecting the link associated with the section in the nav bar
    const link = document.querySelector(`#${section.getAttribute("name")}`);
    if (
      // checking if the section is in the viewport with extra 80 pixels
      scrollPos + 100 > section.offsetTop &&
      scrollPos + 100 < section.offsetTop + section.offsetHeight
    ) {
      // Setting the active section in nav and mobile nav
      link && link.classList.add("active");
      current.href = `#section-${section.getAttribute("name")}`;
      current.textContent = section.getAttribute("data");
    } else {
      link && link.classList.remove("active");
    }
  }
});

// Mobile nav
// Function to disable scroll when nav is open
function disableScroll() {
  // Get the current page scroll position
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  // if any scroll is attempted, set this to the previous value
  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

function enableScroll() {
  window.onscroll = function () {};
}

// Button handler
navBtn.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
  // headerEl.classList.contains("nav-open") ? disableScroll() : enableScroll();
});

// Mobile nav links handler
headerEl.addEventListener("click", function (e) {
  if (
    headerEl.classList.contains("nav-open") &&
    (e.target.classList.contains("nav-text") ||
      e.target.getAttribute("name") === "arrow-down-outline")
  ) {
    headerEl.classList.remove("nav-open");
    enableScroll();
  }
});

// Scroll to top button

topBtn.addEventListener("click", function () {
  homeSection.scrollIntoView({ behavior: "smooth" });
});

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      topBtn.classList.remove("hidden");
    } else {
      topBtn.classList.add("hidden");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-150px",
  }
);

obs.observe(homeSection);
