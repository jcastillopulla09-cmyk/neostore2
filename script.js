const products = [
  { id: 1, name: "Astro A50", price: 49.99 },
  { id: 2, name: "Apple Watch", price: 79.9 },
  { id: 3, name: "Logitech G502", price: 49.99 },
  { id: 4, name: "RGB Keyboard", price: 65.0 },
];

let cart = [];

const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutContainer = document.getElementById("checkout-container");

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add")) {
    const id = Number(e.target.dataset.id);
    const product = products.find((p) => p.id === id);
    cart.push(product);
    updateCart();
  }

  if (e.target.id === "cart-btn") {
    cartModal.classList.remove("hidden");
  }

  if (e.target.id === "close-cart") {
    cartModal.classList.add("hidden");
    checkoutContainer.innerHTML = "";
  }

  if (e.target.id === "checkout-btn") {
    renderCheckoutForm();
  }
});

function updateCart() {
  cartItems.innerHTML = "";
  let sum = 0;
  cart.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${p.name}</span><span>$${p.price.toFixed(2)}</span>`;
    cartItems.appendChild(li);
    sum += p.price;
  });
  cartTotal.textContent = sum.toFixed(2);
  cartCount.textContent = cart.length;
}

function renderCheckoutForm() {
  if (cart.length === 0) {
    checkoutContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  checkoutContainer.innerHTML = `
    <div class="checkout-area">
      <h3>Checkout</h3>
      <form id="checkout-form">
        <label>Full Name</label>
        <input type="text" required placeholder="John Doe" />
        <label>Address</label>
        <input type="text" required placeholder="123 Main St" />
        <label>Payment Method</label>
        <select required>
          <option value="">Select...</option>
          <option value="card">Credit/Debit Card</option>
          <option value="paypal">PayPal</option>
        </select>
        <button type="submit" class="btn">Place Order</button>
      </form>
    </div>
  `;

  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    checkoutContainer.innerHTML = `
      <div class="checkout-area">
        <h3>✅ Purchase Successful!</h3>
        <p>Thank you for shopping at <strong>Neo Store</strong>.</p>
      </div>
    `;
    cart = [];
    updateCart();
  });
}

const themeButton = document.getElementById("theme-toggle");
themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeButton.textContent = document.body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";
});
