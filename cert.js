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
const imageFiles = [
  'CS50_Cybersecurity.jpg',    // Update with your actual filenames
  'H7CTF_2024.png',
  'H7TexCTF_2024.jpg',
  'HuntressCTF_2024.jpg',
  'PatriotCTF_2024.jpg',
  'World_Wide_CTF_2024.png',
  
  // Add all your image filenames here...
];
// Set your desired image resolution here:
const imageWidth = 1920;    // Change to desired width (e.g., 1920)
const imageHeight = 1300;   // Change to desired height (e.g., 1080)
const numImages = 6;      // Total number of images

// Calculate the minimum radius so that the images do not overlap.
// The chord length between images is 2 * R * sin(π / numImages) which should be at least imageWidth.
const R = imageWidth / (2 * Math.sin(Math.PI / numImages));

let xPos = 0;

// Update container size based on the chosen resolution:
gsap.set('.container', { 
  width: imageWidth, 
  height: imageHeight,
  left: "50%",
  top: "50%",
  xPercent: -50,
  yPercent: -50
});

gsap.timeline()
  .set('.ring', { 
    rotationY: 180, 
    cursor: 'grab'
  })
  .set('.img', {
    width: imageWidth,
    height: imageHeight,
    // Place each image evenly around the circle.
    rotateY: (i) => i * (360 / numImages) * -1,
    // Use the calculated radius R so that the images lie on the circle.
    transformOrigin: `50% 50% ${R}px`,
    z: -R,
    // Using Picsum images for demonstration; update if using local images.
    backgroundImage: i => `url(cert/${imageFiles[i]})`,
    backgroundPosition: (i) => getBgPos(i),
    backgroundSize: 'cover',
    backfaceVisibility: 'hidden'
  })
  .from('.img', {
    duration: 1.5,
    y: 200,
    opacity: 0,
    stagger: 0.1,
    ease: 'expo'
  })
  .add(() => {
    $('.img').on('mouseenter', (e) => {
      let current = e.currentTarget;
      gsap.to('.img', { opacity: (i, t) => (t === current ? 1 : 0.5), ease: 'power3' });
    });
    $('.img').on('mouseleave', () => {
      gsap.to('.img', { opacity: 1, ease: 'power2.inOut' });
    });
  }, '-=0.5');

$(window).on('mousedown touchstart', dragStart);
$(window).on('mouseup touchend', dragEnd);

function dragStart(e) {
  if (e.touches) e.clientX = e.touches[0].clientX;
  xPos = Math.round(e.clientX);
  gsap.set('.ring', { cursor: 'grabbing' });
  $(window).on('mousemove touchmove', drag);
}

function drag(e) {
  if (e.touches) e.clientX = e.touches[0].clientX;
  gsap.to('.ring', {
    rotationY: '-=' + ((Math.round(e.clientX) - xPos) % 360),
    onUpdate: () => { gsap.set('.img', { backgroundPosition: (i) => getBgPos(i) }); }
  });
  xPos = Math.round(e.clientX);
}

function dragEnd() {
  $(window).off('mousemove touchmove', drag);
  gsap.set('.ring', { cursor: 'grab' });
}

function getBgPos(i) {
  // Adjusts the background position for a subtle parallax effect.
  return (100 - gsap.utils.wrap(0, 360, gsap.getProperty('.ring', 'rotationY') - 180 - i * (360 / numImages)) / 360 * 500) + 'px 0px';
}

