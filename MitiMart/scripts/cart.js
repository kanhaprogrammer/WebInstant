// cart.js - Enhanced Cart Management System


class CartManager {
  constructor() {
    this.key = "mittimart-cart";
    this.cart = this.loadCart();
    this.observers = [];
  }

  // Load cart from localStorage
  loadCart() {
    try {
      const saved = localStorage.getItem(this.key);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  }

  // Save cart to localStorage
  save() {
    try {
      localStorage.setItem(this.key, JSON.stringify(this.cart));
      this.notifyObservers();
      this.updateCartCount();
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }

  // Subscribe to cart changes
  subscribe(observer) {
    this.observers.push(observer);
  }

  // Notify all observers
  notifyObservers() {
    this.observers.forEach((observer) => {
      try {
        observer(this.cart);
      } catch (error) {
        console.error("Error in cart observer:", error);
      }
    });
  }

  // Get all cart items
  getItems() {
    return [...this.cart]; // Return copy to prevent direct mutation
  }

  // Add item to cart
  addItem(item) {
    if (!item || typeof item !== "object") {
      console.error("Invalid item:", item);
      return this.cart;
    }

    // Ensure required properties
    const cartItem = {
      ...item,
      id: item.id || Date.now(),
      quantity: Math.max(1, parseInt(item.quantity) || 1),
      price: parseFloat(item.price) || 0,
      totalPrice: 0, // Will be calculated below
    };

    // Check if item already exists with same options
    const existingIndex = this.findItemIndex(cartItem);

    if (existingIndex !== -1) {
      // Update quantity if item exists
      this.cart[existingIndex].quantity += cartItem.quantity;
    } else {
      // Add new item with additional properties
      this.cart.push({
        ...cartItem,
        addedAt: new Date().toISOString(),
        size: item.size || "One Size",
        color: item.color || "Natural",
        category: item.category || "Sustainable Product",
        image: item.image || "assets/placeholder.jpg",
      });
    }

    // Recalculate total price
    this.cart.forEach((item) => {
      item.totalPrice = (item.price || 0) * (item.quantity || 1);
    });

    this.save();
    return [...this.cart];
  }

  // Find item index
  findItemIndex(item) {
    return this.cart.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.size === (item.size || "One Size") &&
        cartItem.color === (item.color || "Natural")
    );
  }

  // Remove item from cart
  removeItem(index) {
    if (index >= 0 && index < this.cart.length) {
      const removedItem = this.cart.splice(index, 1)[0];
      this.save();
      return removedItem;
    }
    return null;
  }

  // Update item quantity
  updateQuantity(index, quantity) {
    if (index >= 0 && index < this.cart.length) {
      const newQuantity = Math.max(1, Math.min(99, parseInt(quantity) || 1));
      this.cart[index].quantity = newQuantity;
      this.cart[index].totalPrice = (this.cart[index].price || 0) * newQuantity;
      this.save();
      return this.cart[index];
    }
    return null;
  }

  // Clear entire cart
  clearCart() {
    this.cart = [];
    this.save();
    return true;
  }

  // Get cart statistics
  getStats() {
    const subtotal = this.getSubtotal();
    const itemCount = this.getItemCount();
    const shipping = itemCount > 0 ? 50 : 0;
    const ecoDiscount = itemCount > 0 ? 20 : 0;
    const total = Math.max(0, subtotal + shipping - ecoDiscount);

    return {
      itemCount,
      subtotal,
      shipping,
      ecoDiscount,
      total,
    };
  }

  // Get item count
  getItemCount() {
    return this.cart.reduce((total, item) => total + (item.quantity || 1), 0);
  }

  // Get subtotal
  getSubtotal() {
    return this.cart.reduce((total, item) => total + (item.totalPrice || 0), 0);
  }

  // Get total
  getTotal() {
    const stats = this.getStats();
    return stats.total;
  }

  // Update cart count in header
  updateCartCount() {
    const cartCountElements = document.querySelectorAll(".cart-count");
    const itemCount = this.getItemCount();

    cartCountElements.forEach((element) => {
      element.textContent = itemCount;
      element.style.display = itemCount > 0 ? "flex" : "none";

      // Add animation for count change
      if (parseInt(element.textContent) !== itemCount) {
        element.classList.add("count-updated");
        setTimeout(() => element.classList.remove("count-updated"), 300);
      }
    });
  }

  // Generate unique cart item ID
  generateItemId(item) {
    return `${item.id}-${item.size}-${item.color}`
      .replace(/\s+/g, "-")
      .toLowerCase();
  }
}

// Create global cart manager instance
if (!window.cartManager) {
  window.cartManager = new CartManager();
}

// Notification System
class CartNotification {
  static show(message, type = "success", duration = 3000) {
    let container = document.getElementById("notificationContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "notificationContainer";
      container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
      document.body.appendChild(container);
    }

    const notification = document.createElement("div");
    notification.className = `cart-notification ${type}`;
    notification.style.cssText = `
            background: ${
              type === "success"
                ? "#4CAF50"
                : type === "error"
                ? "#F44336"
                : "#FF9800"
            };
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease ${duration}ms forwards;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            max-width: 350px;
        `;

    const icon =
      type === "success"
        ? "fa-check-circle"
        : type === "error"
        ? "fa-exclamation-circle"
        : "fa-info-circle";

    notification.innerHTML = `
            <i class="fas ${icon}" style="font-size: 1.2rem;"></i>
            <span style="flex: 1;">${message}</span>
        `;

    container.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, duration + 300);
  }
}

// Add animation styles
if (!document.querySelector("#cart-animations")) {
  const style = document.createElement("style");
  style.id = "cart-animations";
  style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            to { opacity: 0; transform: translateX(100%); }
        }
        
        .cart-count.count-updated {
            animation: pulse 0.3s ease;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        .cart-item-removing {
            animation: slideOutLeft 0.3s ease forwards;
        }
        
        @keyframes slideOutLeft {
            to { transform: translateX(-100%); opacity: 0; }
        }
    `;
  document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const cartManager = window.cartManager;

  // Subscribe to cart changes for cart page
  if (window.location.pathname.includes("cart.html")) {
    cartManager.subscribe((cart) => {
      updateCartUI(cart);
    });

    // Initial UI update
    updateCartUI(cartManager.getItems());

    // Initialize cart count
    cartManager.updateCartCount();
  }
});

// Update cart UI
function updateCartUI(cart) {
  const cartItemsContainer = document.getElementById("cartItems");
  const emptyCartElement = document.getElementById("emptyCart");
  const cartContentElement = document.getElementById("cartContent");
  const itemCountElement = document.getElementById("itemCount");
  const summaryItemCountElement = document.getElementById("summaryItemCount");
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");

  const stats = window.cartManager.getStats();

  // Show/hide empty state
  if (cart.length === 0) {
    if (emptyCartElement) emptyCartElement.style.display = "block";
    if (cartContentElement) cartContentElement.style.display = "none";
  } else {
    if (emptyCartElement) emptyCartElement.style.display = "none";
    if (cartContentElement) cartContentElement.style.display = "block";

    // Update counts
    if (itemCountElement) itemCountElement.textContent = stats.itemCount;
    if (summaryItemCountElement)
      summaryItemCountElement.textContent = stats.itemCount;

    // Update prices
    if (subtotalElement)
      subtotalElement.textContent = `$${stats.subtotal.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${stats.total.toFixed(2)}`;

    // Render cart items
    renderCartItems(cart);
  }
}

// Render cart items
function renderCartItems(cart) {
  const cartItemsContainer = document.getElementById("cartItems");

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = cart
    .map(
      (item, index) => `
        <div class="cart-item" data-index="${index}">
            <div class="cart-item-image">
                <img src="${item.image || "assets/placeholder.jpg"}" 
                     alt="${item.name}" 
                     onerror="this.src='assets/placeholder.jpg'">
            </div>
            
            <div class="cart-item-details">
                <div class="cart-item-category">${
                  item.category || "Sustainable Product"
                }</div>
                <h3 class="cart-item-title">${item.name}</h3>
                
                <div class="cart-item-variant">
                    ${
                      item.size
                        ? `<span class="variant-chip"><i class="fas fa-ruler"></i> ${item.size}</span>`
                        : ""
                    }
                    ${
                      item.color
                        ? `<span class="variant-chip"><i class="fas fa-palette"></i> ${item.color}</span>`
                        : ""
                    }
                </div>
                
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>

            </div>
            
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn minus-btn" 
                            onclick="window.updateQuantity(${index}, ${
        (item.quantity || 1) - 1
      })"
                            ${(item.quantity || 1) <= 1 ? "disabled" : ""}>
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" 
                           class="quantity-input" 
                           value="${item.quantity || 1}" 
                           min="1" 
                           max="99"
                           onchange="window.updateQuantity(${index}, this.value)"
                           readonly>
                    <button class="quantity-btn plus-btn" 
                            onclick="window.updateQuantity(${index}, ${
        (item.quantity || 1) + 1
      })"
                            ${(item.quantity || 1) >= 99 ? "disabled" : ""}>
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                
                <div class="cart-item-subtotal">
                    $${(item.totalPrice || item.price || 0).toFixed(2)}
                </div>
                
                <button class="cart-item-remove" onclick="window.removeItem(${index})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `
    )
    .join("");
}

// Update item quantity
function updateQuantity(index, quantity) {
  const item = window.cartManager.updateQuantity(index, quantity);
  if (item) {
    CartNotification.show(
      `Updated ${item.name} quantity to ${item.quantity}`,
      "success"
    );
  }
}

// Remove item from cart
function removeItem(index) {
  const item = window.cartManager.removeItem(index);
  if (item) {
    // Add removal animation
    const cartItem = document.querySelector(
      `.cart-item[data-index="${index}"]`
    );
    if (cartItem) {
      cartItem.classList.add("cart-item-removing");
      setTimeout(() => {
        CartNotification.show(`Removed ${item.name} from cart`, "info");
      }, 300);
    }
  }
}

// Clear entire cart
function clearCart() {
  if (
    confirm(
      "Are you sure you want to clear your cart? This action cannot be undone."
    )
  ) {
    window.cartManager.clearCart();
    CartNotification.show("Cart cleared successfully", "success");
  }
}

// Add to cart function for other pages
function addToCart(product) {
  window.cartManager.addItem(product);
  CartNotification.show(`Added ${product.name} to cart`, "success");
}

// Event listeners for cart page
document.addEventListener("DOMContentLoaded", function () {
  // Clear cart button
  const clearCartBtn = document.getElementById("clearCartBtn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart);
  }

  // Checkout button
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      if (window.cartManager.getItemCount() === 0) {
        CartNotification.show("Your cart is empty", "error");
        return;
      }

      // Show loading state
      const originalHTML = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      this.disabled = true;

      // Simulate checkout process
      setTimeout(() => {
        CartNotification.show("Proceeding to checkout...", "success");
        this.innerHTML = originalHTML;
        this.disabled = false;
        // In a real app, you would redirect to checkout page
        // window.location.href = '/checkout.html';
      }, 1000);
    });
  }
});

// Make functions available globally
window.updateQuantity = updateQuantity;
window.removeItem = removeItem;
window.clearCart = clearCart;
window.addToCart = addToCart;
