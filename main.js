// Video animation
gsap.from("#myVideo", {
  duration: 4,
  opacity: 0,
  scale: 0.8,
  ease: "power4.out"
});

// Content reveal after video
setTimeout(() => {
  gsap.to("#myVideo", {
      duration: 1.5,
      opacity: 0,
      scale: 1.2,
      ease: "power4.inOut",
      onComplete: () => {
          document.getElementById("myVideo").style.display = "none";
      }
  });

  gsap.to(".main-content", {
      duration: 1.5,
      opacity: 1,
      y: 20,
      ease: "power4.out"
  });

  // Animate in navigation menu
  gsap.to(".nav-menu", {
      duration: 1,
      opacity: 1,
      delay: 0.5,
      ease: "power2.out"
  });
}, 4000);

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

// Skill card hover effects
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
      gsap.to(card, {
          duration: 0.3,
          y: -5,
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          ease: "power2.out"
      });
  });
  
  card.addEventListener('mouseleave', () => {
      gsap.to(card, {
          duration: 0.3,
          y: 0,
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          ease: "power2.out"
      });
  });
});