document.addEventListener('DOMContentLoaded', () => {
    const ctf = document.querySelectorAll('.ctf-item');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const closeButtons = document.querySelectorAll('.cyber-button');

    // Hover effects
    ctf.forEach(cert => {
        cert.addEventListener('mouseenter', () => {
            gsap.to(cert.querySelector('.ctf-title'), {
                y: 0,
                duration: 0.3
            });
            gsap.to(cert.querySelector('.ctf-image'), {
                filter: 'grayscale(0%)',
                duration: 0.3
            });
        });

        cert.addEventListener('mouseleave', () => {
            gsap.to(cert.querySelector('.ctf-title'), {
                y: '100%',
                duration: 0.3
            });
            gsap.to(cert.querySelector('.ctf-image'), {
                filter: 'grayscale(80%)',
                duration: 0.3
            });
        });
    });

    // Open modal
    ctf.forEach(cert => {
        cert.addEventListener('click', () => {
            const imgSrc = cert.querySelector('img').getAttribute('src');
            const title = cert.querySelector('h3').textContent;
            const description = cert.dataset.description;

            modalImage.src = imgSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            modalOverlay.style.display = 'flex';
            
            gsap.fromTo(modalOverlay, 
                { autoAlpha: 0 },
                { duration: 0.3, autoAlpha: 1 }
            );
            
            gsap.fromTo('.cyber-modal', 
                { y: 50, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" }
            );
        });
    });

    // Close modal
    function closeModal() {
        gsap.to(modalOverlay, {
            duration: 0.3,
            autoAlpha: 0,
            onComplete: () => {
                modalOverlay.style.display = 'none';
            }
        });
    }

    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Initial animations
    gsap.from('.ctf-item', {
        duration: 1,
        autoAlpha: 0,
        y: 50,
        stagger: 0.1,
        ease: "power2.out"
    });

    gsap.from('.header', {
        duration: 1,
        autoAlpha: 0,
        y: -50,
        ease: "power2.out"
    });
});
gsap.to(".nav-menu", {
    duration: 1,
    opacity: 1,
    delay: 0.5,
    ease: "power2.out"
});
// Navigation toggle function
let menuOpen = false;

function toggleMenu() {
const navItems = document.getElementById('navItems');
const links = document.querySelectorAll('.nav-items a');

menuOpen = !menuOpen;

if (menuOpen) {
    navItems.classList.add('active');
    gsap.to(links, {
        duration: 0.4,
        scale: 1,
        opacity: 1,
        ease: "back.out(1.7)",
        stagger: 0.1
    });
} else {
    gsap.to(links, {
        duration: 0.3,
        scale: 0,
        opacity: 0,
        onComplete: () => {
            navItems.classList.remove('active');
        },
        stagger: 0.05
    });
}
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
const navMenu = document.querySelector('.nav-menu');
if (!navMenu.contains(e.target) && menuOpen) {
    toggleMenu();
}
});
