// temples.js

// Dynamic footer: current year and last-modified date
const currentYearElement = document.getElementById('currentyear');
currentYearElement.textContent = new Date().getFullYear();

const lastModifiedElement = document.getElementById('lastModified');
lastModifiedElement.textContent = document.lastModified;

// Hamburger menu: toggle the nav open/closed in mobile view
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('header nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.textContent = isOpen ? '\u2715' : '\u2630'; // ✕ when open, ☰ when closed
  menuToggle.setAttribute('aria-expanded', isOpen);
});