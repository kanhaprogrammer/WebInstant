// cart-manager.js - Cart Rendering Module (FIXED VERSION - NO AUTO DEMO ITEMS)
document.addEventListener('DOMContentLoaded', function() {
    // Wait for cart system to be available
    setTimeout(initializeCartManager, 100);
});

function initializeCartManager() {
    // Check if we're on cart page
    const isCartPage = window.location.pathname.includes('cart.html');
    if (!isCartPage) return;
    
    // Try to get cartManager from window
    const cartManager = window.cartManager;
    
    if (!cartManager) {
        console.log('Cart manager not found, using simplified cart system');
        loadFallbackCart();
        return;
    }
    
    // Subscribe to cart updates
    cartManager.subscribe(renderCart);
    
    // Initial render
    renderCart(cartManager.getItems());
}

// Render cart with cart manager data
function renderCart(items) {
    const cartItemsEl = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    const itemCountEl = document.getElementById('itemCount');
    const summaryItemCountEl = document.getElementById('summaryItemCount');
    
    if (!cartItemsEl) return;
    
    // Clear existing content
    cartItemsEl.innerHTML = '';
    
    if (!items || items.length === 0) {
        // Empty state is handled by cart.js
        return;
    }
    
    const cartManager = window.cartManager;
    if (!cartManager) return;
    
    const stats = cartManager.getStats();
    
    // Update summary
    if (subtotalEl) subtotalEl.textContent = `₹${stats.subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `₹${stats.total.toFixed(2)}`;
    if (itemCountEl) itemCountEl.textContent = stats.itemCount;
    if (summaryItemCountEl) summaryItemCountEl.textContent = stats.itemCount;
    
    // Render items
    cartItemsEl.innerHTML = items.map((item, index) => `
        <div class="cart-item" data-index="${index}">
            <div class="cart-item-image">
                <img src="${item.image || 'assets/placeholder.jpg'}" 
                     alt="${item.name}" 
                     onerror="this.src='assets/placeholder.jpg'">
            </div>
            
            <div class="cart-item-details">
                <div class="cart-item-category">${item.category || 'Sustainable Product'}</div>
                <h3 class="cart-item-title">${item.name}</h3>
                
                <div class="cart-item-variant">
                    ${item.size ? `<span class="variant-chip"><i class="fas fa-ruler"></i> ${item.size}</span>` : ''}
                    ${item.color ? `<span class="variant-chip"><i class="fas fa-palette"></i> ${item.color}</span>` : ''}
                </div>
                
                <div class="cart-item-price">₹${(item.price || 0).toFixed(2)}</div>
            </div>
            
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn minus-btn" 
                            onclick="window.updateQuantity && window.updateQuantity(${index}, ${(item.quantity || 1) - 1})"
                            ${(item.quantity || 1) <= 1 ? 'disabled' : ''}>
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" 
                           class="quantity-input" 
                           value="${item.quantity || 1}" 
                           min="1" 
                           max="99"
                           onchange="window.updateQuantity && window.updateQuantity(${index}, this.value)"
                           readonly>
                    <button class="quantity-btn plus-btn" 
                            onclick="window.updateQuantity && window.updateQuantity(${index}, ${(item.quantity || 1) + 1})"
                            ${(item.quantity || 1) >= 99 ? 'disabled' : ''}>
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                
                <div class="cart-item-subtotal">
                    ₹${(item.totalPrice || item.price || 0).toFixed(2)}
                </div>
                
                <button class="cart-item-remove" onclick="window.removeItem && window.removeItem(${index})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `).join('');
}

// Fallback for when cart.js is not available
function loadFallbackCart() {
    const cartItemsEl = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total');
    
    if (!cartItemsEl) return;
    
    // Check if we have cart data in localStorage
    try {
        const savedCart = localStorage.getItem('mittimart-cart');
        if (savedCart) {
            const items = JSON.parse(savedCart);
            
            if (items.length === 0) {
                cartItemsEl.innerHTML = `
                    <div class="empty-cart">
                        <div class="empty-cart-icon">
                            <i class="fas fa-shopping-basket"></i>
                        </div>
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added any sustainable products yet.</p>
                        <a href="products.html" class="btn btn-primary">
                            <i class="fas fa-leaf"></i> Start Shopping
                        </a>
                    </div>
                `;
                return;
            }
            
            // Calculate totals
            const subtotal = items.reduce((sum, item) => 
                sum + ((item.price || 0) * (item.quantity || 1)), 0);
            const total = subtotal + 50 - (items.length > 0 ? 20 : 0);
            
            // Update summary
            if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
            if (totalEl) totalEl.textContent = `₹${total.toFixed(2)}`;
        }
    } catch (error) {
        console.error('Error loading fallback cart:', error);
    }
}