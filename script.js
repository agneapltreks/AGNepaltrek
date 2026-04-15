// ===============================
// TIME DISPLAY (SAFE)
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


    // ===============================
    // 1. STICKY NAVBAR + ACTIVE LINK
    // ===============================
    window.addEventListener('scroll', () => {

        // Navbar scroll effect (SAFE)
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }

        // Active section detection
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href') || "";

            link.classList.toggle(
                'active',
                current && href === `#${current}`
            );
        });
    });


    // ===============================
    // 2. MOBILE MENU (SAFE)
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
    // 3. REVEAL ON SCROLL (OK)
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
        }, { threshold: 0.15 });

        revealElements.forEach(el => observer.observe(el));
    }


    // ===============================
    // 4. FORM HANDLING (FIXED LOGIC)
    // ===============================
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {

            e.preventDefault(); // IMPORTANT FIX

            const btn = feedbackForm.querySelector('.submit-btn');
            if (!btn) return;

            const originalText = btn.textContent;

            // Prevent empty submission
            const formData = new FormData(feedbackForm);

            let isEmpty = true;
            for (let value of formData.values()) {
                if (value.trim() !== "") {
                    isEmpty = false;
                    break;
                }
            }

            if (isEmpty) {
                alert("Please fill the form first!");
                return;
            }

            // UI feedback
            btn.textContent = 'SENDING...';
            btn.style.background = '#f39c12';

            setTimeout(() => {
                btn.textContent = 'MESSAGE SENT ✔';
                btn.style.background = '#27ae60';

                feedbackForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                }, 2000);

            }, 1000);
        });
    }

});
