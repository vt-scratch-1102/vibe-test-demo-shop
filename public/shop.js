// Demo catalogue and cart. Everything is made up; the cart lives in this browser only.

const PRODUCTS = [
  { id: 1, name: "Desk Lamp", price: 24.0, blurb: "A warm, dimmable lamp for late-night reading." },
  { id: 2, name: "Ceramic Mug", price: 9.5, blurb: "Holds 350 ml of coffee, tea or pencils." },
  { id: 3, name: "Notebook", price: 6.25, blurb: "A5, dotted pages, lies flat when open." },
  { id: 4, name: "Wall Clock", price: 31.0, blurb: "Silent sweep movement, 30 cm across." },
  { id: 5, name: "Plant Pot", price: 14.75, blurb: "Glazed stoneware with a drainage hole." },
  { id: 6, name: "Throw Blanket", price: 42.0, blurb: "Soft cotton knit, 130 × 170 cm." },
];

const money = (n) => `$${n.toFixed(2)}`;
const byId = (id) => PRODUCTS.find((p) => p.id === Number(id));

function readCart() {
  try {
    return JSON.parse(localStorage.getItem("demo-cart") || "[]");
  } catch {
    return [];
  }
}

function writeCart(lines) {
  localStorage.setItem("demo-cart", JSON.stringify(lines));
  renderCartCount();
}

function addToCart(id, qty = 1) {
  const lines = readCart();
  const line = lines.find((l) => l.id === id);
  if (line) line.qty += qty;
  else lines.push({ id, qty });
  writeCart(lines);
}

function cartTotal(lines) {
  return lines.reduce((sum, l) => sum + byId(l.id).price * l.qty, 0);
}

function renderCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = String(readCart().reduce((n, l) => n + l.qty, 0));
}

document.addEventListener("DOMContentLoaded", renderCartCount);
