
// =========================================
// MOBILE NAVIGATION
// =========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


// =========================================
// CLOSE MOBILE MENU AFTER CLICKING A LINK
// =========================================

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


// =========================================
// DARK / LIGHT THEME
// =========================================

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    updateThemeIcon();
    saveTheme();

});


// =========================================
// UPDATE THEME ICON
// =========================================

function updateThemeIcon() {

    if (document.body.classList.contains("light-theme")) {

        themeToggle.textContent = "☾";

    } else {

        themeToggle.textContent = "☀";

    }

}


// =========================================
// SAVE THEME
// =========================================

function saveTheme() {

    const isLightMode =
        document.body.classList.contains("light-theme");

    localStorage.setItem(
        "theme",
        isLightMode ? "light" : "dark"
    );

}


// =========================================
// LOAD SAVED THEME
// =========================================

function loadTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-theme");

    }

    updateThemeIcon();

}


// =========================================
// INITIALIZE
// =========================================

loadTheme();

// =========================================
// SCROLL REVEAL
// =========================================

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});

