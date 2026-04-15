// ===============================
// TIME DISPLAY
// ===============================
function showTime() {
    const timeDisplay = document.getElementById('currentTime');
    if (!timeDisplay) return;

    timeDisplay.textContent = new Date().toUTCString();
}

showTime();
setInterval(showTime, 1000);


// ===============================
// MAIN SCRIPT
// ===============================
document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.section');
    const feedbackForm = document.getElementById('feedback-form');

    let ticking = false;


    // ===============================
    // SCROLL HANDLER (OPTIMIZED)
    // ===============================
    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar effect
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 50);
        }

        // Active section detection
        let currentSection = "";

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollY >= top - 200 && scrollY < top + height - 200) {
                currentSection = section.id;
            }
        });

        // Active link update
        navLinks.forEach(link => {
            const href = link.getAttribute('href');

            if (href === `#${currentSection}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    });


    // ===============================
    // MOBILE MENU TOGGLE
    // ===============================
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });


    // ===============================
    // REVEAL ON SCROLL
    // ===============================
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        revealElements.forEach(el => observer.observe(el));
    }


    // ===============================
    // FORM HANDLING (SAFE + REALISTIC)
    // ===============================
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = feedbackForm.querySelector('.submit-btn');
            if (!btn) return;

            const originalText = btn.textContent;

            const formData = new FormData(feedbackForm);

            // Check empty form
            let hasValue = false;
            for (let value of formData.values()) {
                if (value.trim() !== "") {
                    hasValue = true;
                    break;
                }
            }

            if (!hasValue) {
                alert("Please fill the form first!");
                return;
            }

            // UI feedback
            btn.textContent = "SENDING...";
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = "MESSAGE SENT ✔";
                btn.style.background = "#27ae60";

                feedbackForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.background = "";
                }, 2000);

            }, 1000);
        });
    }

});
