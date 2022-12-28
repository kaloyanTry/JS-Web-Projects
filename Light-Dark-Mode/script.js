const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');
const DARK_MODE = 'dark';
const LIGHT_MODE = 'light';

// Images Mode:
function imageMode(color) {
  image1.src = `img/undraw_proud_coder_${color}.svg`;
  image2.src = `img/undraw_feeling_proud_${color}.svg`;
  image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

function toggleLightDarkMode(isDark) {
  nav.style.backgroundColor = isDark
    ? 'rgb(0 0 0 / 50%)'
    : 'rgb(255 255 255 / 50%)';

  textBox.style.backgroundColor = isDark
    ? 'rgb(255 255 255 / 50%)'
    : 'rgb(0 0 0 / 50%)';

  toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';

  isDark
    ? toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon')
    : toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');

  isDark ? imageMode(DARK_MODE) : imageMode(LIGHT_MODE);
}

function switchTheme(event) {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', DARK_MODE);
    localStorage.setItem('theme', DARK_MODE);
    toggleLightDarkMode(true);
  } else {
    document.documentElement.setAttribute('data-theme', LIGHT_MODE);
    localStorage.setItem('theme', LIGHT_MODE);
    toggleLightDarkMode(false);
  }
}

toggleSwitch.addEventListener('change', switchTheme);

// Check a localStorage for theme:
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === DARK_MODE) {
    toggleSwitch.checked = true;
    toggleLightDarkMode(true);
  }
}

///////////////////////////////////////////////////////////////
// Code without DRY (two separate functions):
// // Dark Mode:
// function darkMode() {
//   nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//   textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//   toggleIcon.children[0].textContent = 'Dark Mode';
//   // toggleIcon.children[1].classList.remove('fa-sun');
//   // toggleIcon.children[1].classList.add('fa-moon');
//   // DRY way:
//   toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
//   imageMode('dark');
// }

// // Light Mode:
// function lightMode() {
//   nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
//   textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
//   toggleIcon.children[0].textContent = 'Light Mode';
//   // toggleIcon.children[1].classList.remove('fa-moon');
//   // toggleIcon.children[1].classList.add('fa-sun');
//   // DRY way:
//   toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
//   imageMode('light');
// }
