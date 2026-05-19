const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

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

themeToggle.addEventListener('click', () => {
    const isDark = body.classList.contains('darkmode');
    isDark ? disableDarkmode() : enableDarkmode();
});

if (localStorage.getItem('theme') === 'dark') enableDarkmode();