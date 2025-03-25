// GSAP Animations
gsap.from(".main-header", {
  duration: 1,
  y: -50,
  opacity: 0,
  ease: "power4.out"
});

gsap.from(".project-details", {
  duration: 0.8,
  x: -50,
  opacity: 0,
  delay: 0.3,
  ease: "back.out(1.2)"
});

gsap.from(".project-steps li", {
  duration: 0.5,
  x: -30,
  opacity: 0,
  stagger: 0.1,
  delay: 0.5
});

gsap.from(".source-code", {
  duration: 0.8,
  y: 50,
  opacity: 0,
  delay: 0.7,
  ease: "power4.out"
});


// Copy Button Functionality
document.querySelector('.copy-btn').addEventListener('click', () => {
  const code = document.querySelector('code').innerText;
  navigator.clipboard.writeText(code);

  const originalText = document.querySelector('.copy-btn').innerText;
  document.querySelector('.copy-btn').innerText = 'Copied!';
  setTimeout(() => {
    document.querySelector('.copy-btn').innerText = originalText;
  }, 2000);
});

// Preview Button Functionality
document.querySelector('.preview-btn').addEventListener('click', () => {
  const modal = document.querySelector('.video-modal');
  modal.style.display = 'block';
  document.querySelector('#project-video').play();
});

// Close Modal
document.querySelector('.close-modal').addEventListener('click', () => {
  document.querySelector('.video-modal').style.display = 'none';
  document.querySelector('#project-video').pause();
});

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.querySelector('.video-modal');
  if (event.target === modal) {
    modal.style.display = 'none';
    document.querySelector('#project-video').pause();
  }
};

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
