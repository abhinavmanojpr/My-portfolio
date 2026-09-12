/* =========================================================
   ABHINAV M — PORTFOLIO JAVASCRIPT
========================================================= */


/* =========================================================
   DOM ELEMENTS
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function openMenu() {

    if (!navLinks || !menuToggle) return;

    navLinks.classList.add("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Close navigation"
    );

    menuToggle.textContent = "×";
}


function closeMenu() {

    if (!navLinks || !menuToggle) return;

    navLinks.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open navigation"
    );

    menuToggle.textContent = "☰";
}


function toggleMenu() {

    if (!navLinks) return;

    const isOpen =
        navLinks.classList.contains("active");

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }

}


/* Menu button */

if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        toggleMenu
    );

}


/* Close menu after clicking navigation link */

if (navLinks) {

    navLinks
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

}


/* Close menu with Escape */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeMenu();

        }

    }
);


/* Close menu when clicking outside */

document.addEventListener(
    "click",
    event => {

        if (!navLinks || !menuToggle) return;

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (
            navLinks.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   THEME TOGGLE
========================================================= */

const THEME_KEY = "portfolio-theme";


/*
    Apply theme
*/

function applyTheme(theme) {

    const isLight =
        theme === "light";

    document.body.classList.toggle(
        "light-theme",
        isLight
    );

    updateThemeIcon();

}


/*
    Update theme button
*/

function updateThemeIcon() {

    if (!themeToggle) return;

    const isLight =
        document.body.classList.contains(
            "light-theme"
        );


    themeToggle.textContent =
        isLight ? "☾" : "☀";


    themeToggle.setAttribute(
        "aria-label",
        isLight
            ? "Switch to dark theme"
            : "Switch to light theme"
    );


    themeToggle.setAttribute(
        "title",
        isLight
            ? "Switch to dark theme"
            : "Switch to light theme"
    );

}


/*
    Check saved theme
*/

const savedTheme =
    localStorage.getItem(THEME_KEY);


/*
    If user has already selected a theme,
    use it.

    Otherwise use the browser/system preference.
*/

if (savedTheme === "light") {

    applyTheme("light");

} else if (savedTheme === "dark") {

    applyTheme("dark");

} else {

    const prefersLight =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches;


    applyTheme(
        prefersLight
            ? "light"
            : "dark"
    );

}


/*
    Theme toggle button
*/

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const isLight =
                document.body.classList.contains(
                    "light-theme"
                );


            const newTheme =
                isLight
                    ? "dark"
                    : "light";


            applyTheme(newTheme);


            localStorage.setItem(
                THEME_KEY,
                newTheme
            );

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


/*
    If IntersectionObserver is available,
    animate sections as they enter the viewport.
*/

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    entry.target.classList.add(
                        "visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

} else {

    /*
        Fallback for older browsers.
    */

    revealElements.forEach(element => {

        element.classList.add(
            "visible"
        );

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


/*
    Only sections that actually have
    a navigation link should activate
    a navbar item.

    This means "mindset" / "Beyond Code"
    won't create an unwanted navbar item.
*/

function updateActiveNavigation(
    sectionId
) {

    navigationLinks.forEach(link => {

        link.classList.remove(
            "active"
        );


        const href =
            link.getAttribute("href");


        if (
            href === `#${sectionId}`
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


/*
    Observe sections while scrolling.
*/

if (
    "IntersectionObserver" in window &&
    sections.length
) {

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    updateActiveNavigation(
                        entry.target.id
                    );

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {

        sectionObserver.observe(
            section
        );

    });

}


/* =========================================================
   TOP OF PAGE
========================================================= */

/*
    When the user is at the top of the page,
    remove all active navigation states.
*/

function handleScroll() {

    if (
        window.scrollY < 100
    ) {

        navigationLinks.forEach(
            link => {

                link.classList.remove(
                    "active"
                );

            }
        );

    }

}


window.addEventListener(
    "scroll",
    handleScroll,
    {
        passive: true
    }
);


/* =========================================================
   CLOSE MOBILE MENU ON RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        /*
            If the viewport becomes desktop-sized,
            reset the mobile menu.
        */

        if (
            window.innerWidth > 900
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   INITIAL STATE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateThemeIcon();

    }
);