// Sistem Layouting
class LayoutSystem {
  static async loadComponents() {
    const markers = document.querySelectorAll("[data-component]");

    for (const marker of markers) {
      const componentName = marker.getAttribute("data-component");
      try {
        const response = await fetch(`pages/${componentName}.html`);
      } catch (error) {
        console.error(`Error loading ${componentName}:`, error);
      }
    }

    // Inisialisasi semua fungsi setelah komponen dimuat
    this.initFunctions();
  }

  static initFunctions() {
    // Hamburger Toggle
    this.initHamburger();

    // Navbar Fixed on Scroll
    this.initNavbarFixed();

    // Dark Mode Toggle
    this.initDarkMode();
  }

  static initHamburger() {
    const hamburger = document.querySelector("#hamburger");
    const navMenu = document.querySelector("#nav-menu");

    if (hamburger && navMenu) {
      // Hamburger Click
      hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("hamburger-active");
        navMenu.classList.toggle("hidden");
      });

      // Click Outside
      document.addEventListener("click", function (e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
          hamburger.classList.remove("hamburger-active");
          navMenu.classList.add("hidden");
        }
      });
    }
  }

  static initNavbarFixed() {
    const header = document.querySelector("header");
    const toTop = document.querySelector("#to-top");

    if (header && toTop) {
      window.onscroll = function () {
        const fixedNav = header.offsetTop;

        if (window.pageYOffset > fixedNav) {
          header.classList.add("navbar-fixed");
          toTop.classList.remove("hidden");
          toTop.classList.add("flex");
        } else {
          toTop.classList.remove("flex");
          toTop.classList.add("hidden");
          header.classList.remove("navbar-fixed");
        }
      };
    }
  }

  static initDarkMode() {
    const themeToggle = document.getElementById("theme-button");
    const html = document.documentElement;

    if (themeToggle) {
      // Apply saved theme
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        html.classList.add("dark");
        themeToggle.innerHTML = "☀️ Light Mode";
      } else {
        html.classList.remove("dark");
        themeToggle.innerHTML = "🌙 Dark Mode";
      }

      // Toggle handler
      themeToggle.addEventListener("click", () => {
        html.classList.toggle("dark");

        if (html.classList.contains("dark")) {
          localStorage.theme = "dark";
          themeToggle.innerHTML = "☀️ Light Mode";
        } else {
          localStorage.theme = "light";
          themeToggle.innerHTML = "🌙 Dark Mode";
        }
      });
    }
  }
}

// Jalankan saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  LayoutSystem.loadComponents();
});

// Re-init saat navigasi hash (SPA-like)
window.addEventListener("hashchange", () => {
  LayoutSystem.loadComponents();
});
