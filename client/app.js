const API_URL = 'http://localhost:3000/api';

let products = [];
let cart = [];

let currentCategory = 'All';

// DOM Elements
const productsListEl = document.getElementById('products-list');
const cartCountEl = document.getElementById('cart-count');
const viewCartBtn = document.getElementById('view-cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const toastContainer = document.getElementById('toast-container');
const cartFooter = document.getElementById('cart-footer');
const checkoutFooter = document.getElementById('checkout-footer');
const checkoutForm = document.getElementById('checkout-form');
const deliveryForm = document.getElementById('delivery-form');
const backToCartBtn = document.getElementById('back-to-cart-btn');
const modalTitle = document.getElementById('modal-title');

// Initialize
async function init() {
  await fetchProducts();
  renderProducts();
  updateCartCount();
}

// Fetch products from API
async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    products = await response.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    productsListEl.innerHTML = '<p>Error loading products. Please try again later.</p>';
  }
}

// Render products
function renderProducts() {
  let filteredProducts = products;
  if (currentCategory !== 'All') {
    filteredProducts = products.filter(p => p.category === currentCategory);
  }

  if (!filteredProducts.length) {
    productsListEl.innerHTML = '<p class="empty-cart">No products found in this category.</p>';
    return;
  }
  
  productsListEl.innerHTML = filteredProducts.map(product => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <button class="add-to-cart-btn" onclick="addToCart('${product.id}')">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Cart Logic
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }
  updateCartCount();
  syncCart();
  showToast(`${product.name} added to cart`);
}

function updateQuantity(productId, delta) {
  const item = cart.find(item => item.productId === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.productId !== productId);
    }
  }
  updateCartCount();
  renderCartItems();
  syncCart();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = count;
}

async function syncCart() {
  try {
    await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart)
    });
  } catch (error) {
    console.error('Failed to sync cart:', error);
  }
}

// Render Cart
function renderCartItems() {
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    cartTotalEl.textContent = '$0.00';
    return;
  }

  let total = 0;
  cartItemsEl.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return '';
    
    total += product.price * item.quantity;
    
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <span class="cart-item-name">${product.name}</span>
          <span class="cart-item-price">$${product.price.toFixed(2)}</span>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateQuantity('${product.id}', -1)">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="updateQuantity('${product.id}', 1)">+</button>
        </div>
      </div>
    `;
  }).join('');
  
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
}

// Checkout Setup
function showCheckoutForm() {
  if (cart.length === 0) return alert('Cart is empty!');
  
  cartItemsEl.style.display = 'none';
  cartFooter.style.display = 'none';
  
  checkoutForm.style.display = 'block';
  checkoutFooter.style.display = 'flex';
  modalTitle.textContent = 'Delivery Details';
}

function hideCheckoutForm() {
  checkoutForm.style.display = 'none';
  checkoutFooter.style.display = 'none';
  
  cartItemsEl.style.display = 'block';
  cartFooter.style.display = 'block';
  modalTitle.textContent = 'Your Cart';
}

// Checkout Execution
async function checkout(e) {
  e.preventDefault();
  
  const name = document.getElementById('cust-name').value;
  const email = document.getElementById('cust-email').value;
  const address = document.getElementById('cust-address').value;
  
  const total = parseFloat(cartTotalEl.textContent.replace('$', ''));
  const orderData = {
    items: cart,
    total,
    customer: { name, email, address }
  };

  try {
    const placeOrderBtn = document.getElementById('place-order-btn');
    placeOrderBtn.textContent = 'Processing...';
    placeOrderBtn.disabled = true;
    
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    
    if (response.ok) {
      const data = await response.json();
      cart = [];
      updateCartCount();
      syncCart();
      showSuccessState(data.orderId);
    }
  } catch (error) {
    showToast('Failed to place order. Please try again.');
  } finally {
    const placeOrderBtn = document.getElementById('place-order-btn');
    placeOrderBtn.textContent = 'Place Order';
    placeOrderBtn.disabled = false;
  }
}

function showSuccessState(orderId) {
  checkoutForm.style.display = 'none';
  checkoutFooter.style.display = 'none';
  
  cartItemsEl.style.display = 'block';
  modalTitle.textContent = 'Order Confirmed';
  
  cartItemsEl.innerHTML = `
    <div class="success-state">
      <div class="success-icon">✓</div>
      <h3 class="success-title">Order Successful!</h3>
      <p class="success-desc">Your premium groceries are being prepared and will be on their way shortly.</p>
      <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 2rem;">Tracking ID: #${orderId.substring(0,8).toUpperCase()}</p>
      <button class="primary-btn continue-shopping-btn" onclick="closeCartModal()">Continue Shopping</button>
    </div>
  `;
}

function closeCartModal() {
  cartModal.classList.remove('active');
  setTimeout(() => {
    hideCheckoutForm();
    renderCartItems();
  }, 300);
}

// Event Listeners
viewCartBtn.addEventListener('click', () => {
  renderCartItems();
  cartFooter.style.display = cart.length ? 'block' : 'none';
  cartModal.classList.add('active');
});

closeCartBtn.addEventListener('click', closeCartModal);

checkoutBtn.addEventListener('click', showCheckoutForm);
backToCartBtn.addEventListener('click', hideCheckoutForm);
deliveryForm.addEventListener('submit', checkout);

cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    closeCartModal();
  }
});


filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    renderProducts();
  });
});

// Toast notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Boot
init();
