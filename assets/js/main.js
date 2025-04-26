<<<<<<< HEAD
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
=======
class LayoutSystem {
  static async init() {
    await this.loadComponents();
    this.initHamburger();
    this.initNavbarFixed();
    this.initDarkMode();
    this.applyInitialTheme();
  }

  // Memuat komponen dinamis
  static async loadComponents() {
    try {
      const markers = document.querySelectorAll("[data-component]");
      for (const marker of markers) {
        const componentName = marker.getAttribute("data-component");
        const response = await fetch(`pages/${componentName}.html`);
        if (response.ok) {
          marker.outerHTML = await response.text();
        }
      }
    } catch (error) {
      console.error("Error loading components:", error);
    }
  }

  // Hamburger Menu
  static initHamburger() {
    const hamburger = document.querySelector("#hamburger");
    const navMenu = document.querySelector("#nav-menu");

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("hamburger-active");
      navMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("hamburger-active");
        navMenu.classList.add("hidden");
      }
    });
  }

  // Navbar Fixed on Scroll
  static initNavbarFixed() {
    const header = document.querySelector("header");
    const toTop = document.querySelector("#to-top");

    if (!header || !toTop) return;

    window.addEventListener("scroll", () => {
      const fixedNav = header.offsetTop;
      if (window.scrollY > fixedNav) {
        header.classList.add("navbar-fixed");
        toTop.classList.remove("hidden");
        toTop.classList.add("flex");
      } else {
        toTop.classList.remove("flex");
        toTop.classList.add("hidden");
        header.classList.remove("navbar-fixed");
      }
    });
  }

  // Dark Mode Toggle
  static initDarkMode() {
    const darkToggle = document.querySelector("#dark-toggle");
    if (!darkToggle) return;

    darkToggle.addEventListener("change", () => {
      document.documentElement.classList.toggle("dark", darkToggle.checked);
      localStorage.theme = darkToggle.checked ? "dark" : "light";
    });
>>>>>>> v1
  }
}

<<<<<<< HEAD
// Jalankan saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  LayoutSystem.loadComponents();
});

// Re-init saat navigasi hash (SPA-like)
window.addEventListener("hashchange", () => {
  LayoutSystem.loadComponents();
=======
  // Terapkan tema awal
  static applyInitialTheme() {
    const darkToggle = document.querySelector("#dark-toggle");
    if (!darkToggle) return;

    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    document.documentElement.classList.toggle("dark", isDark);
    darkToggle.checked = isDark;
  }
}

// Jalankan saat DOM siap
document.addEventListener("DOMContentLoaded", () => {
  LayoutSystem.init();
});

// Re-init komponen saat navigasi hash (untuk SPA)
window.addEventListener("hashchange", () => {
  LayoutSystem.init();
>>>>>>> v1
});
