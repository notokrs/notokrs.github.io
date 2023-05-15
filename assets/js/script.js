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
      base_url + "/assets/img/static/favicon-dark.png"
    );
    document.getElementById("theme-toggle").innerHTML =
      '<i class="fa-regular fa-sun"></i>';
  } else {
    favicon.setAttribute(
      "href",
      base_url + "/assets/img/static/favicon-light.png"
    );
    document.getElementById("theme-toggle").innerHTML =
      '<i class="fa-regular fa-moon"></i>';
  }

  if (theme === null && systemInitiatedDark.matches) {
    favicon.setAttribute(
      "href",
      base_url + "/assets/img/static/favicon-dark.png"
    );
    document.getElementById("theme-toggle").innerHTML =
      '<i class="fa-regular fa-sun"></i>';
  } else if (theme === null && systemInitiatedDark.matches === false) {
    favicon.setAttribute(
      "href",
      base_url + "/assets/img/static/favicon-light.png"
    );
    document.getElementById("theme-toggle").innerHTML =
      '<i class="fa-regular fa-moon"></i>';
  }
});

function themeToggle() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    document.getElementById("theme-toggle").innerHTML =
      '<i class="fa-regular fa-moon"></i>';
  } else if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    document.getElementById("theme-toggle").innerHTML =
      '<i class="fa-regular fa-sun"></i>';
  } else if (systemInitiatedDark.matches) {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    document.getElementById("theme-toggle").innerHTML =
      '<i class="fa-regular fa-moon"></i>';
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    document.getElementById("theme-toggle").innerHTML =
      '<i class="fa-regular fa-sun"></i>';
  }
}

function goTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
