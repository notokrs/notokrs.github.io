const base_url = window.location.origin;
const theme = localStorage.getItem("theme");
const systemInitiatedDark = window.matchMedia("(prefers-color-scheme: dark)");
const favicon = document.querySelector("link[rel='icon']");

if (theme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
} else {
  document.documentElement.setAttribute("data-theme", "light");
}

if (theme === null && systemInitiatedDark.matches) {
  document.documentElement.setAttribute("data-theme", "dark");
} else if (theme === null && systemInitiatedDark.matches === false) {
  document.documentElement.setAttribute("data-theme", "light");
}

document.addEventListener("DOMContentLoaded", () => {
  if (theme === "dark") {
    favicon.setAttribute(
      "href",
      base_url + "/assets/img/static/favicon-dark.png",
    );
    setIcon("light");
  } else {
    favicon.setAttribute(
      "href",
      base_url + "/assets/img/static/favicon-light.png",
    );
    setIcon("dark");
  }

  if (theme === null && systemInitiatedDark.matches) {
    favicon.setAttribute(
      "href",
      base_url + "/assets/img/static/favicon-dark.png",
    );
    setIcon("light");
  } else if (theme === null && systemInitiatedDark.matches === false) {
    favicon.setAttribute(
      "href",
      base_url + "/assets/img/static/favicon-light.png",
    );
    setIcon("dark");
  }
});

function themeToggle() {
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");

    setIcon("dark");
  } else if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");

    setIcon("light");
  } else if (systemInitiatedDark.matches) {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");

    setIcon("dark");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");

    setIcon("light");
  }
}

function goTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function menuToggle() {
  const mobileNav = document.getElementById("nav-mobile");
  const backdrop = document.getElementById("nav-mobile-backdrop");

  if (mobileNav.classList.contains("show-nav-mobile")) {
    mobileNav.classList.remove("show-nav-mobile");
    backdrop.style.display = "none";
  } else {
    mobileNav.classList.add("show-nav-mobile");
    backdrop.style.display = "block";
  }
}

function setIcon(type) {
  const themeIcons = document.getElementsByClassName("theme-toggle");
  if (type === "dark") {
    [...themeIcons].forEach(
      (el) => (el.innerHTML = '<i class="fa-regular fa-moon"></i>'),
    );
  } else if (type === "light") {
    [...themeIcons].forEach(
      (el) => (el.innerHTML = '<i class="fa-regular fa-sun"></i>'),
    );
  }
}
