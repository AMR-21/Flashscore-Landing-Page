"use strict";

// Building navigation
const navigation = document.querySelector(".main-nav");

function createNavItem(text, href = "#", id, className) {
  const listEl = document.createElement("li");
  listEl.innerHTML = `
  <a href="${href}" id="${id}" class="nav-link ${className}">
    <span class="nav-text">${text}</span>
  </a>
  `;
  navigation.append(listEl);
}

createNavItem("Home", undefined, "hero", "active");
createNavItem("Help", "#section-how", "how");
createNavItem("Features", "#section-features", "features");
createNavItem("Testimonials", "#section-testimonials", "testimonials");
createNavItem("Get The App", "#section-get", "get");

// Toggling active section
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let scrollPos = window.scrollY;
  for (const section of sections)
    if (
      scrollPos + 75 > section.offsetTop &&
      scrollPos + 75 < section.offsetTop + section.offsetHeight
    ) {
      console.log(section);
      document
        .querySelector(`#${section.getAttribute("name")}`)
        .classList.add("active");
    } else {
      document
        .querySelector(`#${section.getAttribute("name")}`)
        .classList.remove("active");
    }
});
