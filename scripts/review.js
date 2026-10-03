const products = [
    { id: "fc-1888", name: "flux capacitor" },
    { id: "fc-2050", name: "power laces" },
    { id: "fs-1987", name: "time circuits" },
    { id: "ac-2000", name: "low voltage reactor" },
    { id: "jj-1969", name: "warp equalizer" }
];

const params = new URLSearchParams(window.location.search);
const summary = document.querySelector("#summary");

function addRow(term, description) {
    const dt = document.createElement("dt");
    dt.textContent = term;
    const dd = document.createElement("dd");
    dd.textContent = description;
    summary.append(dt, dd);
}

const productId = params.get("productName");
const product = products.find((item) => item.id === productId);
const features = params.getAll("features");

addRow("Product", product ? product.name : "Not provided");
addRow("Overall Rating", params.get("rating") ? `${params.get("rating")} of 5` : "Not provided");
addRow("Date of Installation", params.get("installDate") || "Not provided");
addRow("Useful Features", features.length ? features.join(", ") : "None selected");
addRow("Written Review", params.get("writtenReview") || "None provided");
addRow("Name", params.get("userName") || "Anonymous");

// Increment the review counter only when the page loads after a form submission.
let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;
if (params.has("productName")) {
    reviewCount += 1;
    localStorage.setItem("reviewCount", reviewCount);
}
document.querySelector("#reviewCount").textContent = reviewCount;

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;
