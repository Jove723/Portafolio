const sections = document.querySelectorAll('section[id], footer[id]');
const navItems = document.querySelectorAll('.navbar-item');
const navbarWrapper = document.querySelector('.navbar-wrapper');
const bgImage = document.querySelector('.bg-image');
const langBar = document.getElementById('lang-bar');
const CLEAR_BLUR = new Set(['about', 'contact']);

const indicator = document.createElement('div');
indicator.className = 'navbar-indicator';
navbarWrapper.appendChild(indicator);

let isClicking = false;

function moveIndicator(item) {
    navItems.forEach(i => i.classList.remove('navbar-item-selected'));
    item.classList.add('navbar-item-selected');
    indicator.style.left = item.offsetLeft + 'px';
    indicator.style.width = item.offsetWidth + 'px';
}

function updateBlur(id) {
    const isDesktop = window.innerWidth > 1200;
    const isTablet = window.innerWidth > 780 && window.innerWidth <= 1200;
    const isMobile = window.innerWidth <= 780;
    const isClearBlur = CLEAR_BLUR.has(id);

    if (isDesktop) {
        if (isClearBlur) {
            bgImage.className = 'bg-image';
            bgImage.style.objectPosition = '80% 50%';
        } else {
            bgImage.className = 'bg-image bg-blurred';
            bgImage.style.objectPosition = '80% 50%';
        }
    } else if (isTablet) {
        if (isClearBlur) {
            bgImage.className = 'bg-image';
            bgImage.style.objectPosition = '80% 50%';
        } else {
            bgImage.className = 'bg-image';
            bgImage.style.objectPosition = '0% 50%';
        }
    } else {
        bgImage.className = 'bg-image';
        bgImage.style.objectPosition = '30% 50%';
    }
}

const options = window.innerWidth <= 780 
    ? { rootMargin: '-90% 0px -10% 0px' } 
    : { rootMargin: '-90% 0px -10% 0px' };

const observer = new IntersectionObserver((entries) => {
    if (isClicking) return;
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;

        if (id === 'lang-bar') {
            langBar.classList.add('animate');
            return;
        }

        const activeItem = document.querySelector(`.navbar-item[href="#${id}"]`);
        if (activeItem) {
            moveIndicator(activeItem);
            updateBlur(id);
        }
    });
}, options);

sections.forEach(section => observer.observe(section));
if (langBar) observer.observe(langBar);

navItems.forEach(item => {
    item.addEventListener('click', () => {
        isClicking = true;
        moveIndicator(item);
        updateBlur(item.getAttribute('href').slice(1));
        setTimeout(() => isClicking = false, 800);
    });
});