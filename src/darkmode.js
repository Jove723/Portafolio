const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const lightIcon = document.querySelector('.light-icon');
const darkIcon = document.querySelector('.dark-icon');
const ANIM_MS = 350;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function enableDarkmode() {
    body.classList.add('darkmode');
    bgImage.src = 'src/assets/Images/Background_Dark.png';
    localStorage.setItem('theme', 'dark');
}

function disableDarkmode() {
    body.classList.remove('darkmode');
    bgImage.src = 'src/assets/Images/Background_Light.png';
    localStorage.setItem('theme', 'light');
}

function animateIcon(el, animation) {
    el.style.setProperty('--animate-duration', `${ANIM_MS}ms`);
    el.classList.add('animate__animated', animation);
    setTimeout(() => {
        el.classList.remove('animate__animated', animation);
        el.style.removeProperty('--animate-duration');
    }, ANIM_MS + 50);
}

let isAnimating = false;

themeToggle.addEventListener('click', () => {
    if (isAnimating) return;
    isAnimating = true;

    const isDark = body.classList.contains('darkmode');

    if (reducedMotion) {
        isDark ? disableDarkmode() : enableDarkmode();
        isAnimating = false;
        return;
    }

    if (isDark) {
        animateIcon(darkIcon, 'animate__rotateOut');
        setTimeout(() => {
            disableDarkmode();
            requestAnimationFrame(() => {
                animateIcon(lightIcon, 'animate__rotateIn');
                isAnimating = false;
            });
        }, ANIM_MS);
    } else {
        animateIcon(lightIcon, 'animate__rotateOut');
        setTimeout(() => {
            enableDarkmode();
            requestAnimationFrame(() => {
                animateIcon(darkIcon, 'animate__rotateIn');
                isAnimating = false;
            });
        }, ANIM_MS);
    }
});

if (localStorage.getItem('theme') === 'dark') enableDarkmode();
