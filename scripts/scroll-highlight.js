document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav a");
    const sections = Array.from(navLinks).map(link => document.querySelector(link.getAttribute("href")));

    const highlightActiveLink = () => {
        let currentSection = sections[0];

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                currentSection = section;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${currentSection.id}`);
        });
    };

    window.addEventListener("scroll", highlightActiveLink);
    highlightActiveLink(); // Run on page load
});
