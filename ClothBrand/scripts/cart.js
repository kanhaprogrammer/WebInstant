// cart.js - ClothBrand Cart Management System (FULLY FIXED)

class CartManager {
  constructor() {
    this.key = "clothbrand-cart";
    this.cart = this.loadCart();
    this.observers = [];
  }

  loadCart() {
    try {
      const saved = localStorage.getItem(this.key);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  }

  save() {
    try {
      localStorage.setItem(this.key, JSON.stringify(this.cart));
      this.notifyObservers();
      this.updateCartCount();
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => {
      try {
        observer(this.cart);
      } catch (error) {
        console.error("Error in cart observer:", error);
      }
    });
  }

  getItems() {
    return [...this.cart];
  }

  // FIXED: Add item with proper price handling
  addItem(item) {
    if (!item || typeof item !== "object") {
      console.error("Invalid item:", item);
      return this.cart;
    }

    // Ensure price is a valid number
    const price = parseFloat(item.price) || 0;
    const quantity = Math.max(1, parseInt(item.quantity) || 1);

    const cartItem = {
      ...item,
      id: item.id || Date.now(),
      quantity: quantity,
      price: price,
      totalPrice: price * quantity,
    };

    const existingIndex = this.findItemIndex(cartItem);

    if (existingIndex !== -1) {
      // Update quantity if item exists
      this.cart[existingIndex].quantity += cartItem.quantity;
      this.cart[existingIndex].totalPrice =
        this.cart[existingIndex].price * this.cart[existingIndex].quantity;
    } else {
      // Add new item with additional properties
      this.cart.push({
        ...cartItem,
        addedAt: new Date().toISOString(),
        size: item.size || "M",
        color: item.color || "Classic",
        category: item.category || "Fashion",
        image: item.image || "assets/placeholder.jpg",
      });
    }

    // Recalculate total prices
    this.cart.forEach((item) => {
      item.totalPrice = (item.price || 0) * (item.quantity || 1);
    });

    this.save();
    return [...this.cart];
  }

  findItemIndex(item) {
    return this.cart.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        cartItem.size === (item.size || "M") &&
        cartItem.color === (item.color || "Classic"),
    );
  }

  removeItem(index) {
    if (index >= 0 && index < this.cart.length) {
      const removedItem = this.cart.splice(index, 1)[0];
      this.save();
      return removedItem;
    }
    return null;
  }

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

  clearCart() {
    this.cart = [];
    this.save();
    return true;
  }

  // FIXED: GetStats with proper calculation
  getStats() {
    const subtotal = this.getSubtotal();
    const itemCount = this.getItemCount();
    const shipping = itemCount > 0 ? 50 : 0;
    const discount = itemCount > 0 ? 20 : 0;
    const total = Math.max(0, subtotal + shipping - discount);

    console.log("getStats calculated:", {
      subtotal,
      itemCount,
      shipping,
      discount,
      total,
    });

    return {
      itemCount,
      subtotal,
      shipping,
      discount,
      total,
    };
  }

  // FIXED: Get item count
  getItemCount() {
    const count = this.cart.reduce(
      (total, item) => total + (item.quantity || 1),
      0,
    );
    console.log("Item count:", count);
    return count;
  }

  // FIXED: Get subtotal
  getSubtotal() {
    const subtotal = this.cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      const itemTotal = price * quantity;
      console.log(
        `Item: ${item.name}, Price: ${price}, Qty: ${quantity}, Total: ${itemTotal}`,
      );
      return total + itemTotal;
    }, 0);
    console.log("Subtotal:", subtotal);
    return subtotal;
  }

  getTotal() {
    const stats = this.getStats();
    return stats.total;
  }

  updateCartCount() {
    const cartCountElements = document.querySelectorAll(".cart-count");
    const itemCount = this.getItemCount();

    cartCountElements.forEach((element) => {
      element.textContent = itemCount;
      element.style.display = itemCount > 0 ? "flex" : "none";
      if (parseInt(element.textContent) !== itemCount) {
        element.classList.add("count-updated");
        setTimeout(() => element.classList.remove("count-updated"), 300);
      }
    });
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
                ? "#00b894"
                : type === "error"
                  ? "#e74c3c"
                  : "#f39c12"
            };
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease ${duration}ms forwards;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
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
  if (window.location.pathname.includes("cart.html")) {
    cartManager.subscribe((cart) => {
      updateCartUI(cart);
    });
    updateCartUI(cartManager.getItems());
    cartManager.updateCartCount();
  }
});

// FIXED: Update cart UI
function updateCartUI(cart) {
  const cartItemsContainer = document.getElementById("cartItems");
  const emptyCartElement = document.getElementById("emptyCart");
  const cartContentElement = document.getElementById("cartContent");
  const itemCountElement = document.getElementById("itemCount");
  const summaryItemCountElement = document.getElementById("summaryItemCount");
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");

  console.log("updateCartUI called with cart:", cart);

  // Get fresh stats
  const stats = window.cartManager.getStats();
  console.log("stats from updateCartUI:", stats);

  if (!cart || cart.length === 0) {
    if (emptyCartElement) emptyCartElement.style.display = "block";
    if (cartContentElement) cartContentElement.style.display = "none";
    return;
  }

  if (emptyCartElement) emptyCartElement.style.display = "none";
  if (cartContentElement) cartContentElement.style.display = "block";

  // Update counts
  if (itemCountElement) itemCountElement.textContent = stats.itemCount;
  if (summaryItemCountElement)
    summaryItemCountElement.textContent = stats.itemCount;

  // FIXED: Update prices using stats
  if (subtotalElement) {
    subtotalElement.textContent = `₹${stats.subtotal.toFixed(2)}`;
    console.log("Updated subtotal to:", stats.subtotal);
  }
  if (totalElement) {
    totalElement.textContent = `₹${stats.total.toFixed(2)}`;
    console.log("Updated total to:", stats.total);
  }

  // Render cart items
  renderCartItems(cart);
}

// Render cart items
function renderCartItems(cart) {
  const cartItemsContainer = document.getElementById("cartItems");
  if (!cartItemsContainer) return;

  if (!cart || cart.length === 0) {
    cartItemsContainer.innerHTML = "";
    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item, index) => `
                <div class="cart-item" data-index="${index}">
                    <div class="cart-item-image">
                        <img src="${item.image || "assets/placeholder.jpg"}" 
                             alt="${item.name || "Product"}" 
                             onerror="this.src='assets/placeholder.jpg'">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-category">${item.category || "Fashion"}</div>
                        <h3 class="cart-item-title">${item.name || "Product"}</h3>
                        <div class="cart-item-variant">
                            ${item.size ? `<span class="variant-chip"><i class="fas fa-ruler"></i> ${item.size}</span>` : ""}
                            ${item.color ? `<span class="variant-chip"><i class="fas fa-palette"></i> ${item.color}</span>` : ""}
                        </div>
                        <div class="cart-item-price">₹${(item.price || 0).toFixed(2)}</div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn minus-btn" 
                                    onclick="window.updateQuantity(${index}, ${(item.quantity || 1) - 1})"
                                    ${(item.quantity || 1) <= 1 ? "disabled" : ""}>
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" 
                                   class="quantity-input" 
                                   value="${item.quantity || 1}" 
                                   min="1" max="99"
                                   onchange="window.updateQuantity(${index}, this.value)"
                                   readonly>
                            <button class="quantity-btn plus-btn" 
                                    onclick="window.updateQuantity(${index}, ${(item.quantity || 1) + 1})"
                                    ${(item.quantity || 1) >= 99 ? "disabled" : ""}>
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="cart-item-subtotal">
                            ₹${(item.totalPrice || (item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        </div>
                        <button class="cart-item-remove" onclick="window.removeItem(${index})">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `,
    )
    .join("");
}

// Update item quantity
function updateQuantity(index, quantity) {
  const item = window.cartManager.updateQuantity(index, quantity);
  if (item) {
    CartNotification.show(
      `Updated ${item.name} quantity to ${item.quantity}`,
      "success",
    );
  }
}

// Remove item from cart
function removeItem(index) {
  const item = window.cartManager.removeItem(index);
  if (item) {
    const cartItem = document.querySelector(
      `.cart-item[data-index="${index}"]`,
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
  if (confirm("Are you sure you want to clear your cart?")) {
    window.cartManager.clearCart();
    CartNotification.show("Cart cleared successfully", "success");
  }
}

// Add to cart function
function addToCart(product) {
  if (!product) {
    console.error("Invalid product:", product);
    return;
  }

  const productToAdd = {
    ...product,
    price: parseFloat(product.price) || 0,
    quantity: parseInt(product.quantity) || 1,
  };

  window.cartManager.addItem(productToAdd);
  CartNotification.show(
    `Added ${productToAdd.name || "Product"} to cart`,
    "success",
  );
}

// Event listeners for cart page
document.addEventListener("DOMContentLoaded", function () {
  const clearCartBtn = document.getElementById("clearCartBtn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart);
  }

  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      if (window.cartManager.getItemCount() === 0) {
        CartNotification.show("Your cart is empty", "error");
        return;
      }
      const originalHTML = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
      this.disabled = true;
      setTimeout(() => {
        CartNotification.show("Proceeding to checkout...", "success");
        this.innerHTML = originalHTML;
        this.disabled = false;
      }, 1000);
    });
  }
});

// Make functions available globally
window.updateQuantity = updateQuantity;
window.removeItem = removeItem;
window.clearCart = clearCart;
window.addToCart = addToCart;

// In cart.js, update the checkout button:
const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", function () {
    if (window.cartManager.getItemCount() === 0) {
      CartNotification.show("Your cart is empty", "error");
      return;
    }
    // Redirect to checkout page
    window.location.href = "checkout.html";
  });
}
