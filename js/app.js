// RUSH GRAFIKZ storefront
// Product data lives in products.json — that is the only file you edit
// to add, remove, or change a product. See README.md.

let allProducts = [];
let activeCategory = "all";

async function loadProducts() {
  const res = await fetch("products.json");
  allProducts = await res.json();
  render();
}

function render() {
  const grid = document.getElementById("product-grid");
  const items = activeCategory === "all"
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);

  grid.innerHTML = items.map(productCard).join("");
}

function productCard(p) {
  const note = p.category === "digital"
    ? `Delivery: ${p.delivery || "Sent after payment"}`
    : `Shipping: ${p.shipping || "Ask for details"}`;

  return `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <div class="card-body">
        <span class="badge ${p.category}">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="price">${p.currency} ${p.price}</div>
        <div class="desc">${p.description}</div>
        <div class="desc" style="font-size:0.75rem;opacity:0.75">${note}</div>
        <button onclick="orderProduct('${p.id}')">Order this</button>
      </div>
    </div>
  `;
}

function orderProduct(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  // Placeholder action — wire this up to your Tally order form / Messenger link.
  alert(`Ordering: ${p.name}\n\nHook this button up to your Tally order form or Facebook Messenger link.`);
}

document.getElementById("category-tabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".tab-btn");
  if (!btn) return;
  document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  activeCategory = btn.dataset.category;
  render();
});

document.getElementById("year").textContent = new Date().getFullYear();

loadProducts();
