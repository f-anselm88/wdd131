/* =========================================
   ERAKA LYETU
   Shared JavaScript functionality
========================================= */

/* 1. Mobile navigation */

const navToggle = document.querySelector(".nav-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = primaryNav.classList.toggle("is-open");

        navToggle.setAttribute("aria-expanded", String(isOpen));

        navToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        navToggle.textContent = isOpen ? "✕ Close" : "☰ Menu";
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            primaryNav.classList.remove("is-open");

            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            navToggle.textContent = "☰ Menu";
        });
    });
}

/* 2. Footer year */

const yearElement = document.querySelector("#year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* 3. Last-modified date */

const lastModifiedElement = document.querySelector("#lastModified");

if (lastModifiedElement) {
    const modifiedDate = new Date(document.lastModified);

    lastModifiedElement.textContent = Number.isNaN(
        modifiedDate.getTime()
    )
        ? "Unavailable"
        : modifiedDate.toLocaleString();
}

/* 4. Vocabulary search */

const vocabularySearch = document.querySelector("#vocabularySearch");
const vocabularyRows = document.querySelectorAll(
    "#vocabularyTable tbody tr"
);
const vocabularyCount = document.querySelector("#vocabularyCount");
const vocabularyEmpty = document.querySelector("#vocabularyEmpty");

function filterVocabulary() {
    if (!vocabularySearch || vocabularyRows.length === 0) {
        return;
    }

    const searchTerm = vocabularySearch.value
        .trim()
        .toLocaleLowerCase();

    let visibleCount = 0;

    vocabularyRows.forEach((row) => {
        const rowText = row.textContent.toLocaleLowerCase();

        const matches = rowText.includes(searchTerm);

        row.hidden = !matches;

        if (matches) {
            visibleCount++;
        }
    });

    if (vocabularyCount) {
        vocabularyCount.textContent =
            `${visibleCount} word${visibleCount === 1 ? "" : "s"} found`;
    }

    if (vocabularyEmpty) {
        vocabularyEmpty.hidden = visibleCount !== 0;
    }
}

if (vocabularySearch) {
    vocabularySearch.addEventListener("input", filterVocabulary);
}

/* 5. Contact form demonstration */

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        formStatus.hidden = false;

        formStatus.textContent =
            "Thank you for your contribution. This demonstration form " +
            "has validated your information, but it has not sent or " +
            "stored your submission. A backend service is needed to " +
            "receive contributions.";

        contactForm.reset();

        formStatus.focus();
    });
}