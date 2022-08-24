"use strict";

const navigation = document.querySelector(".main-nav");
const navBtn = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector("#header");
const sections = document.querySelectorAll("section");
const current = document.querySelector(".current-section");

// Building navigation

// Function to append list item to the navigation
function createNavItem(text, href = "#", id, className) {
  const listEl = document.createElement("li");
  listEl.innerHTML = `
  <a href="${href}" id="${id}" class="nav-link ${className}">
    <span class="nav-text">${text}</span>
  </a>
  `;
  navigation.append(listEl);
}

// Appending the 4 nav items
createNavItem("Home", undefined, "hero", "active");
createNavItem("Help", "#section-how", "how");
createNavItem("Features", "#section-features", "features");
createNavItem("Testimonials", "#section-testimonials", "testimonials");

// Toggling active section

window.addEventListener("scroll", (e) => {
  let scrollPos = window.scrollY;
  for (const section of sections) {
    // Selecting the link associated with the section in the nav bar
    const link = document.querySelector(`#${section.getAttribute("name")}`);
    if (
      // checking if the section is in the viewport with extra 80 pixels
      scrollPos + 80 > section.offsetTop &&
      scrollPos + 80 < section.offsetTop + section.offsetHeight
    ) {
      // Setting the active section in nav and mobile nav
      link && link.classList.add("active");
      current.textContent = section.getAttribute("data");
    } else {
      link && link.classList.remove("active");
    }
  }
});

// Mobile nav

// Button handler
navBtn.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// Mobile nav links handler
headerEl.addEventListener("click", function (e) {
  if (
    headerEl.classList.contains("nav-open") &&
    (e.target.classList.contains("nav-text") ||
      e.target.getAttribute("name") === "arrow-down-outline")
  ) {
    headerEl.classList.remove("nav-open");
  }
});
