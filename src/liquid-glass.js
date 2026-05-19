const navbar = document.querySelector('.navbar');
const glassVars = navbar?.style;

let mouseX = 50;
let targetPos = 50;
let targetAngle = 45;
let currentPos = 50;
let currentAngle = 45;
let isAnimating = false;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function updateGlass() {
  if (!navbar) return;

  currentPos = lerp(currentPos, targetPos, 0.1);
  currentAngle = lerp(currentAngle, targetAngle, 0.08);

  navbar.style.setProperty('--glass-highlight-pos', `${currentPos}%`);
  navbar.style.setProperty('--glass-highlight-angle', `${currentAngle}deg`);

  if (Math.abs(currentPos - targetPos) > 0.1 || Math.abs(currentAngle - targetAngle) > 0.1) {
    requestAnimationFrame(updateGlass);
  } else {
    isAnimating = false;
  }
}

function startAnimation() {
  if (!isAnimating) {
    isAnimating = true;
    requestAnimationFrame(updateGlass);
  }
}

function handlePointer(x, y, viewportWidth) {
  mouseX = (x / viewportWidth) * 100;
  targetPos = 20 + (mouseX / 100) * 60;
  targetAngle = 30 + (mouseX / 100) * 30;
  startAnimation();
}

document.addEventListener('mousemove', (e) => {
  handlePointer(e.clientX, e.clientY, window.innerWidth);
});

document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  if (touch) {
    handlePointer(touch.clientX, touch.clientY, window.innerWidth);
  }
}, { passive: true });

let scrollTimeout;
let baseBlur = 15;
let scrollBlur = 0;

window.addEventListener('scroll', () => {
  const scrollSpeed = Math.abs(window.scrollY - (window.lastScrollY || 0));
  window.lastScrollY = window.scrollY;

  scrollBlur = Math.min(scrollSpeed * 0.05, 5);
  const totalBlur = baseBlur + scrollBlur;
  navbar.style.setProperty('--glass-blur', `${totalBlur}px`);

  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    scrollBlur = 0;
    navbar.style.setProperty('--glass-blur', `${baseBlur}px`);
  }, 300);
}, { passive: true });

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  navbar.style.setProperty('--glass-highlight-pos', '50%');
  navbar.style.setProperty('--glass-highlight-angle', '45deg');
}
