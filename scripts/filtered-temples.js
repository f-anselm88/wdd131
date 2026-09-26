// filtered-temples.js
// WDD 131 — Week 04: Picture Album Enhancement
// Built on top of temples.js (Week 02): the footer date logic and the
// hamburger menu toggle below are unchanged from that file. New for this
// assignment: the temples data array, dynamic card rendering, and the
// Home/Old/New/Large/Small nav filters.

// ---------------------------------------------------------------------------
// Dynamic footer: current year and last-modified date
// (unchanged from temples.js)
// ---------------------------------------------------------------------------
const currentYearElement = document.getElementById('currentyear');
currentYearElement.textContent = new Date().getFullYear();

const lastModifiedElement = document.getElementById('lastModified');
lastModifiedElement.textContent = document.lastModified;

// ---------------------------------------------------------------------------
// Hamburger menu: toggle the nav open/closed in mobile view
// (unchanged from temples.js)
// ---------------------------------------------------------------------------
const menuToggle = document.getElementById('menu-toggle');
const nav = document.querySelector('header nav');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.textContent = isOpen ? '\u2715' : '\u2630'; // ✕ when open, ☰ when closed
  menuToggle.setAttribute('aria-expanded', isOpen);
});

// ---------------------------------------------------------------------------
// Data: the 9 temples already used in temples.html (Week 02), reusing the
// exact same local image paths/filenames so no new images are needed.
// Dedication dates and floor areas are real and verified.
//
// Note: with this exact set of 9 temples, "Old" (< 1900) and "Large"
// (> 90,000 sq ft) will correctly return zero results — none of these
// temples are that old or that large. renderTemples() below shows a
// friendly message rather than an empty grid when that happens.
// ---------------------------------------------------------------------------
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/aba-nigeria-temple.jpg",
  },
  {
    templeName: "Adelaide Australia",
    location: "Marden, South Australia, Australia",
    dedicated: "2000, June, 15",
    area: 10700,
    imageUrl: "images/adelaide-australia-temple.jpg",
  },
  {
    templeName: "Albuquerque New Mexico",
    location: "Albuquerque, New Mexico, United States",
    dedicated: "2000, March, 5",
    area: 34245,
    imageUrl: "images/albuquerque-temple.jpg",
  },
  {
    templeName: "Anchorage Alaska",
    location: "Anchorage, Alaska, United States",
    dedicated: "1999, January, 9",
    area: 6800,
    imageUrl: "images/anchorage-temple.jpg",
  },
  {
    templeName: "Apia Samoa",
    location: "Apia, Samoa",
    dedicated: "1983, August, 5",
    area: 14560,
    imageUrl: "images/apia-samoa-temple.jpg",
  },
  {
    templeName: "Arequipa Peru",
    location: "Arequipa, Peru",
    dedicated: "2019, December, 15",
    area: 26969,
    imageUrl: "images/arequipa-peru-temple.jpg",
  },
  {
    templeName: "Baton Rouge Louisiana",
    location: "Baton Rouge, Louisiana, United States",
    dedicated: "2000, July, 16",
    area: 10700,
    imageUrl: "images/baton-rouge-temple.jpg",
  },
  {
    templeName: "Belém Brazil",
    location: "Belém, Brazil",
    dedicated: "2022, November, 20",
    area: 28675,
    imageUrl: "images/belem-brazil-temple.jpg",
  },
  {
    templeName: "Ghana Accra",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl: "images/accra-ghana-temple.jpg",
  },
];

// ---------------------------------------------------------------------------
// Rendering: builds the same <figure><img><figcaption></figure> markup the
// original temples.html used by hand, just generated per temple object and
// extended with location/dedicated/area lines.
// ---------------------------------------------------------------------------
const cardContainer = document.getElementById('temple-cards');

function formatDedicationDate(dedicated) {
  // "2005, August, 7" -> "7 August 2005"
  const parts = dedicated.split(',').map((part) => part.trim());
  if (parts.length !== 3) return dedicated;
  const [year, month, day] = parts;
  return `${day} ${month} ${year}`;
}

function buildTempleCard(temple) {
  const figure = document.createElement('figure');

  const img = document.createElement('img');
  img.src = temple.imageUrl;
  img.alt = `${temple.templeName} Temple`;
  img.loading = 'lazy';
  img.width = 400;
  img.height = 300;

  const figcaption = document.createElement('figcaption');
  figcaption.innerHTML = `
    <h2>${temple.templeName} Temple</h2>
    <p class="meta">${temple.location}</p>
    <p class="meta">Dedicated: ${formatDedicationDate(temple.dedicated)}</p>
    <p class="meta">${temple.area.toLocaleString('en-US')} sq ft</p>
  `;

  figure.append(img, figcaption);
  return figure;
}

function renderTemples(templeList) {
  cardContainer.innerHTML = '';

  if (templeList.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.classList.add('empty-message');
    emptyMessage.textContent = 'No temples in this album match that filter.';
    cardContainer.appendChild(emptyMessage);
    return;
  }

  const fragment = document.createDocumentFragment();
  templeList.forEach((temple) => fragment.appendChild(buildTempleCard(temple)));
  cardContainer.appendChild(fragment);
}

// ---------------------------------------------------------------------------
// Filtering: Home / Old (< 1900) / New (> 2000) / Large (> 90,000 sq ft) /
// Small (< 10,000 sq ft), wired to the nav's data-filter attributes.
// ---------------------------------------------------------------------------
function extractYear(dedicated) {
  return parseInt(dedicated.split(',')[0].trim(), 10);
}

const filters = {
  home: () => temples,
  old: () => temples.filter((t) => extractYear(t.dedicated) < 1900),
  new: () => temples.filter((t) => extractYear(t.dedicated) > 2000),
  large: () => temples.filter((t) => t.area > 90000),
  small: () => temples.filter((t) => t.area < 10000),
};

const filterLinks = document.querySelectorAll('nav a[data-filter]');

filterLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const filterName = link.dataset.filter;
    renderTemples(filters[filterName]());

    filterLinks.forEach((l) => l.classList.remove('active'));
    link.classList.add('active');

    // Close the mobile nav after a selection, if it's open
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuToggle.textContent = '\u2630';
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// ---------------------------------------------------------------------------
// Initial render: show every temple on page load
// ---------------------------------------------------------------------------
renderTemples(filters.home());