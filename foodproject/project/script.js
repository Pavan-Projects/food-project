document.addEventListener("DOMContentLoaded", function() {
    // Function to handle the click event on the mobile navigation button
    function handleMobileNavClick() {
        headerEl.classList.toggle("nav-open");
    }

    // Function to handle smooth scrolling when clicking on internal links
    function handleInternalLinkClick(e) {
        e.preventDefault();
        const href = this.getAttribute("href");

        if (href === "#") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        } else {
            const sectionEl = document.querySelector(href);
            if (sectionEl) {
                sectionEl.scrollIntoView({ behavior: "smooth" });
            }
        }

        if (this.classList.contains("main-nav-link")) {
            headerEl.classList.remove("nav-open");
        }
    }

    // Function to handle sticky behavior of the header
    function handleHeaderSticky(entries) {
        const ent = entries[0];
        if (ent.isIntersecting === false) {
            headerEl.classList.add("sticky");
        } else {
            headerEl.classList.remove("sticky");
        }
    }

    // Select the necessary elements
    const btnNavEl = document.querySelector(".btn-mobile-nav");
    const headerEl = document.querySelector(".header");
    const allLinks = document.querySelectorAll("a[href^='#']");
    const sectionHeroEl = document.querySelector(".section-hero");

    // Add event listener to mobile navigation button
    if (btnNavEl && headerEl) {
        btnNavEl.addEventListener("click", handleMobileNavClick);
    }

    // Add event listener to internal links for smooth scrolling
    if (allLinks) {
        allLinks.forEach(function(link) {
            link.addEventListener("click", handleInternalLinkClick);
        });
    }

    // Setup Intersection Observer to handle header sticky behavior
    if (sectionHeroEl) {
        const obs = new IntersectionObserver(handleHeaderSticky, {
            root: null,
            threshold: 0,
            rootMargin: "-80px"
        });
        obs.observe(sectionHeroEl);
    }
});

