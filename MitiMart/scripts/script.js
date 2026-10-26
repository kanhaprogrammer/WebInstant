// script.js - COMPLETELY IMPROVED & BUG FREE
document.addEventListener('DOMContentLoaded', function() {
    // ==================== SHARED CART SYSTEM ====================
    
    // Initialize cart manager if not already initialized
    if (!window.cartManager) {
        window.cartManager = {
            getItems: function() {
                try {
                    return JSON.parse(localStorage.getItem('mittimart-cart')) || [];
                } catch (e) {
                    console.error('Error reading cart:', e);
                    return [];
                }
            },
            
            getItemCount: function() {
                const cartItems = this.getItems();
                return cartItems.reduce((total, item) => 
                    total + (parseInt(item.quantity) || 1), 0);
            },
            
            addItem: function(item) {
                let cartItems = this.getItems();
                const existingItemIndex = cartItems.findIndex(cartItem => 
                    cartItem.id == item.id && 
                    cartItem.size === item.size && 
                    cartItem.color === item.color
                );
                
                if (existingItemIndex !== -1) {
                    cartItems[existingItemIndex].quantity += (item.quantity || 1);
                } else {
                    cartItems.push({
                        ...item,
                        quantity: item.quantity || 1
                    });
                }
                
                try {
                    localStorage.setItem('mittimart-cart', JSON.stringify(cartItems));
                    this.updateCartCount();
                } catch (e) {
                    console.error('Error saving cart:', e);
                }
                
                return cartItems;
            },
            
            updateCartCount: function() {
                const cartCountElements = document.querySelectorAll('.cart-count');
                const itemCount = this.getItemCount();
                
                cartCountElements.forEach(element => {
                    element.textContent = itemCount;
                    element.style.display = itemCount > 0 ? 'flex' : 'none';
                });
            }
        };
    }

    // 🎉 Notification System
    const notificationSystem = {
        show: function(message, type = 'success', duration = 2500) {
            // Remove existing notifications
            this.removeAll();
            
            const notification = document.createElement('div');
            notification.className = 'cart-notification';
            
            if (type === 'info') {
                notification.classList.add('info');
            } else if (type === 'error') {
                notification.classList.add('error');
            } else if (type === 'warning') {
                notification.classList.add('warning');
            }
            
            const icon = type === 'success' ? 'fa-check-circle' : 
                        type === 'error' ? 'fa-exclamation-circle' : 
                        type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle';
            notification.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
            
            // Add animation styles if not present
            if (!document.querySelector('#notification-styles')) {
                const style = document.createElement('style');
                style.id = 'notification-styles';
                style.textContent = `
                    .cart-notification {
                        position: fixed;
                        top: 100px;
                        right: 20px;
                        background: var(--primary-brown);
                        color: white;
                        padding: 15px 25px;
                        border-radius: 8px;
                        z-index: 10000;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        animation: slideInRight 0.3s ease-out;
                    }
                    .cart-notification.info {
                        background: #2196F3;
                    }
                    .cart-notification.error {
                        background: #F44336;
                    }
                    .cart-notification.warning {
                        background: #FF9800;
                    }
                    @keyframes slideInRight {
                        from { transform: translateX(100%); opacity: 0; }
                        to { transform: translateX(0); opacity: 1; }
                    }
                    @keyframes fadeOut {
                        from { opacity: 1; }
                        to { opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            document.body.appendChild(notification);
            
            // Auto remove
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'fadeOut 0.3s ease-out';
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 300);
                }
            }, duration);
        },
        
        removeAll: function() {
            document.querySelectorAll('.cart-notification').forEach(n => n.remove());
        }
    };

    // 🔄 Initialize cart count
    window.cartManager.updateCartCount();

    // ==================== COMMON FUNCTIONALITY ====================
    
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Quick Add to Cart Buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.quick-add')) {
            const button = e.target.closest('.quick-add');
            e.preventDefault();
            e.stopPropagation();
            
            const productId = button.getAttribute('data-product');
            const productName = button.getAttribute('data-name') || 'Product';
            const productPrice = parseFloat(button.getAttribute('data-price')) || 0;
            const productImage = button.getAttribute('data-image') || '';
            
            if (productId) {
                window.cartManager.addItem({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    size: 'One Size',
                    color: 'Natural'
                });
                
                // Visual feedback
                button.classList.add('added');
                button.innerHTML = '<i class="fas fa-check"></i> Added!';
                button.disabled = true;
                
                notificationSystem.show(`${productName} added to cart!`);
                
                setTimeout(() => {
                    button.classList.remove('added');
                    button.innerHTML = '<i class="fas fa-cart-plus"></i> Add';
                    button.disabled = false;
                }, 1500);
            }
        }
    });

    // Wishlist Toggle
    document.addEventListener('click', function(e) {
        if (e.target.closest('.wishlist-btn')) {
            const button = e.target.closest('.wishlist-btn');
            
            const icon = button.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#FF6B6B';
                notificationSystem.show('Added to wishlist!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
                notificationSystem.show('Removed from wishlist', 'info');
            }
        }
    });

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    // Observe elements for animations
    document.querySelectorAll('.product-card, .value-card, .featured-item').forEach(el => {
        if (el) observer.observe(el);
    });

    // ==================== HOME PAGE SPECIFIC ====================
    if (document.querySelector('.hero')) {
        // Product Data for Quick View
        const featuredProducts = [
            {
                id: 1,
                name: "Terracotta Vase",
                category: "Pottery",
                price: 45,
                originalPrice: 89,
                description: "Handcrafted with care by local artisans, this beautiful terracotta vase brings natural elegance to your home. Made from sustainable materials with traditional techniques passed down through generations.",
                rating: 4.8,
                reviews: 1234,
                image: "assets/f-product1.jpg"
            },
            {
                id: 2,
                name: "Handwoven Basket",
                category: "Weaving",
                price: 32,
                originalPrice: 89,
                description: "Handcrafted with care by local artisans, this beautiful handwoven basket brings natural elegance to your home. Made from sustainable materials with traditional techniques passed down through generations. Each piece is unique and tells its own story of craftsmanship and dedication to the art.",
                rating: 4.9,
                reviews: 1234,
                image: "assets/f-product2.jpg"
            },
            {
                id: 3,
                name: "Organic Compost",
                category: "Soil",
                price: 18,
                originalPrice: 89,
                description: "Handcrafted with care by local artisans, this beautiful organic compost brings natural elegance to your home. Made from sustainable materials with traditional techniques passed down through generations. Each piece is unique and tells its own story of craftsmanship and dedication to the art.",
                rating: 4.7,
                reviews: 1234,
                image: "assets/f-product3.jpg"
            }
        ];

        // Quick View Modal
        const quickViewModal = document.getElementById('quickViewModal');
        const modalClose = document.querySelector('.modal-close');
        const quickViewContent = document.querySelector('.quick-view-content');

        // Show Quick View
        document.addEventListener('click', function(e) {
            if (e.target.closest('.quick-view')) {
                const button = e.target.closest('.quick-view');
                const productId = parseInt(button.getAttribute('data-product'));
                
                if (productId && quickViewModal && quickViewContent) {
                    showQuickView(productId);
                }
            }
        });

        // Close Modal Functions
        window.closeQuickView = function() {
            if (quickViewModal) {
                quickViewModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        };

        if (modalClose) {
            modalClose.addEventListener('click', window.closeQuickView);
        }

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === quickViewModal) {
                window.closeQuickView();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && quickViewModal && quickViewModal.style.display === 'flex') {
                window.closeQuickView();
            }
        });

        // Function to show quick view
        function showQuickView(productId) {
            const product = featuredProducts.find(p => p.id === productId);
            if (!product || !quickViewContent) return;

            // Define available sizes, colors, and other product variations
            const productVariations = {
                sizes: ['Small', 'Medium', 'Large', 'Extra Large'],
                colors: [
                    { name: 'Natural Terracotta', value: '#C19A6B', hex: '#C19A6B' },
                    { name: 'Dark Brown', value: '#5D4037', hex: '#5D4037' },
                    { name: 'Light Brown', value: '#8B7355', hex: '#8B7355' }
                ]
            };

            const stars = getStarRating(product.rating);
            const originalPriceHTML = product.originalPrice ? 
                `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : '';

            quickViewContent.innerHTML = `
                <div class="quick-view-grid">
                    <div class="quick-view-image">
                        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='assets/placeholder.jpg'">
                    </div>
                    <div class="quick-view-details">
                        <span class="product-category">${product.category}</span>
                        <h2>${product.name}</h2>
                        
                        <div class="product-rating">
                            ${stars}
                            <span class="rating-count">${product.rating || 4.8} | ${product.reviews || '1,234'} reviews</span>
                        </div>
                        
                        <div class="product-price-large">
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                            ${originalPriceHTML}
                        </div>
                        
                        <p class="product-description">${product.description}</p>
                        
                        <!-- Size Selection -->
                        <div class="product-option-group">
                            <h4>Select Size:</h4>
                            <div class="size-options">
                                ${productVariations.sizes.map(size => `
                                    <label class="size-option">
                                        <input type="radio" name="size" value="${size}" ${size === 'Medium' ? 'checked' : ''}>
                                        <span class="size-label">${size}</span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Color Selection -->
                        <div class="product-option-group">
                            <h4>Select Color:</h4>
                            <div class="color-options">
                                ${productVariations.colors.map(color => `
                                    <label class="color-option">
                                        <input type="radio" name="color" value="${color.name}" ${color.name === 'Natural Terracotta' ? 'checked' : ''}>
                                        <span class="color-dot" style="background-color: ${color.hex}"></span>
                                        <span class="color-label">${color.name}</span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- Quantity Selector -->
                        <div class="product-option-group">
                            <h4>Quantity:</h4>
                            <div class="quantity-selector">
                                <button type="button" class="quantity-btn minus-btn" aria-label="Decrease quantity">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <input type="number" class="quantity-input" value="1" min="1" max="99" readonly>
                                <button type="button" class="quantity-btn plus-btn" aria-label="Increase quantity">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="product-actions">
                            <button class="btn btn-primary add-to-cart-modal" 
                                    data-product="${product.id}"
                                    data-name="${product.name}"
                                    data-price="${product.price}"
                                    data-image="${product.image}">
                                <i class="fas fa-cart-plus"></i> Add to Cart
                            </button>
                            <button class="btn btn-secondary buy-now-modal">
                                <i class="fas fa-bolt"></i> Buy Now
                            </button>
                            <button class="btn btn-outline wishlist-modal">
                                <i class="far fa-heart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;

            // Show the modal
            quickViewModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Add event listeners for the new elements
            setupQuickViewEvents(product);
        }

        // Setup event listeners for quick view modal
        function setupQuickViewEvents(product) {
            // Quantity selector
            const quantityInput = quickViewContent.querySelector('.quantity-input');
            const minusBtn = quickViewContent.querySelector('.minus-btn');
            const plusBtn = quickViewContent.querySelector('.plus-btn');
            
            if (minusBtn && plusBtn && quantityInput) {
                minusBtn.addEventListener('click', () => {
                    const currentValue = parseInt(quantityInput.value);
                    if (currentValue > 1) {
                        quantityInput.value = currentValue - 1;
                    }
                });
                
                plusBtn.addEventListener('click', () => {
                    const currentValue = parseInt(quantityInput.value);
                    if (currentValue < 99) {
                        quantityInput.value = currentValue + 1;
                    }
                });
            }
            
            // Size selection
            const sizeOptions = quickViewContent.querySelectorAll('.size-option input');
            sizeOptions.forEach(option => {
                option.addEventListener('change', function() {
                    // Remove active class from all size options
                    document.querySelectorAll('.size-option').forEach(el => {
                        el.classList.remove('active');
                    });
                    // Add active class to selected option
                    this.parentElement.classList.add('active');
                });
                // Set initial active state
                if (option.checked) option.parentElement.classList.add('active');
            });
            
            // Color selection
            const colorOptions = quickViewContent.querySelectorAll('.color-option input');
            colorOptions.forEach(option => {
                option.addEventListener('change', function() {
                    // Remove active class from all color options
                    document.querySelectorAll('.color-option').forEach(el => {
                        el.classList.remove('active');
                    });
                    // Add active class to selected option
                    this.parentElement.classList.add('active');
                });
                // Set initial active state
                if (option.checked) option.parentElement.classList.add('active');
            });
            
            // Buy Now button
            const buyNowBtn = quickViewContent.querySelector('.buy-now-modal');
            if (buyNowBtn) {
                buyNowBtn.addEventListener('click', function() {
                    const addToCartBtn = quickViewContent.querySelector('.add-to-cart-modal');
                    if (addToCartBtn) {
                        // Simulate click on add to cart first
                        addToCartBtn.click();
                        
                        // Close modal and redirect to cart page
                        setTimeout(() => {
                            window.closeQuickView();
                            window.location.href = 'cart.html';
                        }, 500);
                    }
                });
            }
            
            // Add to Cart button
            const addToCartBtn = quickViewContent.querySelector('.add-to-cart-modal');
            if (addToCartBtn) {
                addToCartBtn.addEventListener('click', function() {
                    const productId = this.dataset.product;
                    const productName = this.dataset.name;
                    const productPrice = parseFloat(this.dataset.price);
                    const productImage = this.dataset.image;
                    
                    // Get selected options
                    const selectedSize = quickViewContent.querySelector('input[name="size"]:checked')?.value || 'Medium';
                    const selectedColor = quickViewContent.querySelector('input[name="color"]:checked')?.value || 'Natural Terracotta';
                    const quantity = parseInt(quickViewContent.querySelector('.quantity-input').value);
                    
                    // Add to cart with selected options
                    window.cartManager.addItem({
                        id: productId,
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        size: selectedSize,
                        color: selectedColor,
                        quantity: quantity
                    });
                    
                    // Show success notification
                    notificationSystem.show(`${productName} (${selectedSize}, ${selectedColor}) added to cart!`);
                    
                    // Close modal after delay
                    setTimeout(() => {
                        window.closeQuickView();
                    }, 1000);
                });
            }
            
            // Wishlist button
            const wishlistBtn = quickViewContent.querySelector('.wishlist-modal');
            if (wishlistBtn) {
                wishlistBtn.addEventListener('click', function() {
                    const icon = this.querySelector('i');
                    if (icon.classList.contains('far')) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        icon.style.color = '#FF6B6B';
                        notificationSystem.show(`${product.name} added to wishlist!`);
                    } else {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                        icon.style.color = '';
                        notificationSystem.show(`${product.name} removed from wishlist`, 'info');
                    }
                });
            }
        }

        // Star rating helper
        function getStarRating(rating) {
            if (!rating || rating < 0 || rating > 5) return '';
            
            let stars = '';
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;

            for (let i = 1; i <= 5; i++) {
                if (i <= fullStars) {
                    stars += '<i class="fas fa-star"></i>';
                } else if (i === fullStars + 1 && hasHalfStar) {
                    stars += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    stars += '<i class="far fa-star"></i>';
                }
            }
            return stars;
        }

        // Floating cards hover effects
        document.querySelectorAll('.floating-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.zIndex = '2';
            });
        });
    }

    // ==================== PERFORMANCE OPTIMIZATIONS ====================
    
    // Debounce function for resize events
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            window.cartManager.updateCartCount();
        }, 250);
    });

    // Lazy load images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px',
            threshold: 0.1
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ==================== EXPORT FUNCTIONS ====================
    
    // Make notification system available globally
    window.notificationSystem = notificationSystem;
    window.closeQuickView = window.closeQuickView || function() {};
});

// Fallback for old code compatibility
if (typeof window.showNotification === 'undefined') {
    window.showNotification = function(message, type = 'success') {
        if (window.notificationSystem) {
            window.notificationSystem.show(message, type);
        }
    };
}

// Handle blog read more clicks from homepage
document.addEventListener('click', function(e) {
    // Check if clicked on blog read more link
    if (e.target.closest('.blog-read-more') || 
        e.target.closest('.blog-title a') ||
        e.target.closest('.blog-card a')) {
        
        const link = e.target.closest('a');
        if (!link) return;
        
        // If link goes to blogs.html, allow navigation
        if (link.href.includes('blogs.html')) {
            return; // Allow default navigation
        }
        
        // If it's a hash link (like #)
        if (link.getAttribute('href') === '#' || 
            (link.getAttribute('href') && link.getAttribute('href').startsWith('#'))) {
            e.preventDefault();
            
            // Check if we're on blogs page
            if (window.location.pathname.includes('blogs.html')) {
                // On blogs page, handle scrolling
                const blogId = link.getAttribute('href');
                if (blogId) {
                    const blogElement = document.querySelector(blogId);
                    if (blogElement) {
                        blogElement.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            } else {
                // On homepage, navigate to blogs page
                window.location.href = 'blogs.html';
            }
        }
    }
});

// Add error handling for image loading
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        e.target.style.opacity = '0.5';
        e.target.style.backgroundColor = '#f5f5f5';
    }
}, true);
