const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");
const currentYear = document.getElementById("current-year");

// Display the current year in the footer.
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Open and close the mobile navigation.
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Toggle navigation"
        );
    });

    // Close the mobile menu after a navigation link is clicked.
    navItems.forEach(function (item) {
        item.addEventListener("click", function () {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Toggle navigation");
        });
    });
}

// Highlight the navigation link for the section in view.
const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window && pageSections.length > 0) {
    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    navItems.forEach(function (item) {
                        const isCurrent =
                            item.getAttribute("href") ===
                            "#" + entry.target.id;

                        item.classList.toggle("active", isCurrent);
                    });
                }
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    pageSections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}
