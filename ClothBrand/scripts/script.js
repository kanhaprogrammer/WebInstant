// ============================================================
// ClothBrand - Complete JavaScript
// All functionality in one file
// ============================================================

// ============================================================
// 1. CART SYSTEM
// ============================================================

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
    } catch {
      return [];
    }
  }

  save() {
    try {
      localStorage.setItem(this.key, JSON.stringify(this.cart));
      this.notifyObservers();
      this.updateCartCount();
    } catch (e) {
      console.error("Error saving cart:", e);
    }
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach((observer) => {
      try {
        observer(this.cart);
      } catch (e) {
        console.error(e);
      }
    });
  }

  getItems() {
    return [...this.cart];
  }

  addItem(item) {
    if (!item || typeof item !== "object") return this.cart;

    const price = parseFloat(item.price) || 0;
    const quantity = Math.max(1, parseInt(item.quantity) || 1);
    const cartItem = {
      ...item,
      id: item.id || Date.now(),
      quantity,
      price,
      totalPrice: price * quantity,
    };

    const existingIndex = this.findItemIndex(cartItem);
    if (existingIndex !== -1) {
      this.cart[existingIndex].quantity += quantity;
      this.cart[existingIndex].totalPrice =
        this.cart[existingIndex].price * this.cart[existingIndex].quantity;
    } else {
      this.cart.push({
        ...cartItem,
        addedAt: new Date().toISOString(),
        size: item.size || "M",
        color: item.color || "Classic",
        category: item.category || "Fashion",
        image: item.image || "assets/placeholder.jpg",
      });
    }

    this.cart.forEach(
      (i) => (i.totalPrice = (i.price || 0) * (i.quantity || 1)),
    );
    this.save();
    return [...this.cart];
  }

  findItemIndex(item) {
    return this.cart.findIndex(
      (ci) =>
        ci.id === item.id &&
        ci.size === (item.size || "M") &&
        ci.color === (item.color || "Classic"),
    );
  }

  removeItem(index) {
    if (index >= 0 && index < this.cart.length) {
      const removed = this.cart.splice(index, 1)[0];
      this.save();
      return removed;
    }
    return null;
  }

  updateQuantity(index, quantity) {
    if (index >= 0 && index < this.cart.length) {
      const newQty = Math.max(1, Math.min(99, parseInt(quantity) || 1));
      this.cart[index].quantity = newQty;
      this.cart[index].totalPrice = (this.cart[index].price || 0) * newQty;
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

  getStats() {
    const subtotal = this.getSubtotal();
    const itemCount = this.getItemCount();
    const shipping = itemCount > 0 ? 50 : 0;
    const discount = itemCount > 0 ? 20 : 0;
    return {
      itemCount,
      subtotal,
      shipping,
      discount,
      total: Math.max(0, subtotal + shipping - discount),
    };
  }

  getItemCount() {
    return this.cart.reduce((total, i) => total + (i.quantity || 1), 0);
  }

  getSubtotal() {
    return this.cart.reduce(
      (total, i) => total + (i.price || 0) * (i.quantity || 1),
      0,
    );
  }

  updateCartCount() {
    const count = this.getItemCount();
    document.querySelectorAll(".cart-count").forEach((el) => {
      el.textContent = count;
      el.style.display = count > 0 ? "flex" : "none";
    });
  }
}

// Initialize cart
if (!window.cartManager) {
  window.cartManager = new CartManager();
}

// ============================================================
// 2. NOTIFICATION SYSTEM
// ============================================================

const notificationSystem = {
  show(message, type = "success", duration = 2500) {
    this.removeAll();
    const notification = document.createElement("div");
    notification.className = `cart-notification ${type}`;

    const icons = {
      success: "fa-check-circle",
      error: "fa-exclamation-circle",
      warning: "fa-exclamation-triangle",
      info: "fa-info-circle",
    };
    const icon = icons[type] || icons.success;

    notification.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    notification.style.cssText = `
            position: fixed; top: 100px; right: 20px;
            background: ${type === "success" ? "#00b894" : type === "error" ? "#e74c3c" : type === "warning" ? "#f39c12" : "#3498db"};
            color: white; padding: 15px 25px; border-radius: 12px;
            z-index: 10000; box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            display: flex; align-items: center; gap: 10px;
            animation: slideInRight 0.3s ease-out; max-width: 350px;
        `;
    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = "fadeOut 0.3s ease-out";
        setTimeout(() => notification.remove(), 300);
      }
    }, duration);
  },
  removeAll() {
    document.querySelectorAll(".cart-notification").forEach((n) => n.remove());
  },
};

// ============================================================
// 3. ANIMATION STYLES
// ============================================================

if (!document.querySelector("#clothbrand-animations")) {
  const style = document.createElement("style");
  style.id = "clothbrand-animations";
  style.textContent = `
        @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fadeOut { to { opacity: 0; transform: translateX(100%); } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.2); } }
        @keyframes slideOutLeft { to { transform: translateX(-100%); opacity: 0; } }
        @keyframes ripple { to { transform: scale(4); opacity: 0; } }
        @keyframes shake { 0%,100% { transform: translateX(0); } 10%,30%,50%,70%,90% { transform: translateX(-5px); } 20%,40%,60%,80% { transform: translateX(5px); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .cart-count.count-updated { animation: pulse 0.3s ease; }
        .cart-item-removing { animation: slideOutLeft 0.3s ease forwards; }
        .ripple { position: absolute; border-radius: 50%; background: rgba(255,255,255,0.4); transform: scale(0); animation: ripple 0.6s linear; pointer-events: none; }
        .timeline-item { animation: fadeInUp 0.8s ease forwards; }
        .metric i { transition: all 0.3s ease; }
        .member-bio { transition: all 0.3s ease; }
        .member-bio.expanded { overflow: visible; }
        .hero-circle { transition: transform 0.1s ease; }
    `;
  document.head.appendChild(style);
}

// ============================================================
// 4. DOM READY - MAIN INIT
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  // Update cart count on load
  window.cartManager.updateCartCount();

  // ============================================================
  // 4a. MOBILE MENU
  // ============================================================

  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // ============================================================
  // 4b. QUICK ADD TO CART
  // ============================================================

  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".quick-add");
    if (btn) {
      e.preventDefault();
      e.stopPropagation();

      const productId = btn.dataset.product;
      const productName = btn.dataset.name || "Product";
      const productPrice = parseFloat(btn.dataset.price) || 0;
      const productImage = btn.dataset.image || "";

      if (productId) {
        window.cartManager.addItem({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          size: "M",
          color: "Classic",
        });

        btn.classList.add("added");
        btn.innerHTML = '<i class="fas fa-check"></i> Added!';
        btn.disabled = true;
        notificationSystem.show(`${productName} added to cart!`);

        setTimeout(() => {
          btn.classList.remove("added");
          btn.innerHTML = '<i class="fas fa-cart-plus"></i> Add';
          btn.disabled = false;
        }, 1500);
      }
    }
  });

  // ============================================================
  // 4c. WISHLIST TOGGLE
  // ============================================================

  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".wishlist-btn");
    if (btn) {
      const icon = btn.querySelector("i");
      if (icon.classList.contains("far")) {
        icon.classList.remove("far");
        icon.classList.add("fas");
        icon.style.color = "#e94560";
        notificationSystem.show("Added to wishlist!");
      } else {
        icon.classList.remove("fas");
        icon.classList.add("far");
        icon.style.color = "";
        notificationSystem.show("Removed from wishlist", "info");
      }
    }
  });

  // ============================================================
  // 4d. SCROLL ANIMATIONS
  // ============================================================

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "50px" },
  );

  document
    .querySelectorAll(".product-card, .value-card, .featured-item")
    .forEach((el) => {
      if (el) observer.observe(el);
    });

  // ============================================================
  // 5. HOME PAGE SPECIFIC
  // ============================================================

  if (document.querySelector(".hero")) {
    // Floating cards hover
    document.querySelectorAll(".floating-card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.zIndex = "10";
      });
      card.addEventListener("mouseleave", function () {
        this.style.zIndex = "2";
      });
    });

    // ============================================================
    // 5a. QUICK VIEW MODAL
    // ============================================================

    const quickViewModal = document.getElementById("quickViewModal");
    const quickViewContent = document.querySelector(".quick-view-content");

    const featuredProducts = [
      {
        id: 1,
        name: "Classic White Shirt",
        category: "Shirts",
        price: 1299,
        originalPrice: 1999,
        rating: 4.8,
        reviews: 856,
        image:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
        description:
          "Premium cotton shirt perfect for formal and casual occasions.",
      },
      {
        id: 2,
        name: "Denim Jacket",
        category: "Jackets",
        price: 2499,
        originalPrice: 3499,
        rating: 4.9,
        reviews: 634,
        image:
          "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=400&fit=crop",
        description: "Classic denim jacket that never goes out of style.",
      },
      {
        id: 3,
        name: "Cotton T-Shirt",
        category: "T-Shirts",
        price: 799,
        originalPrice: 1199,
        rating: 4.7,
        reviews: 1234,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        description: "Soft, breathable cotton t-shirt for everyday comfort.",
      },
    ];

    window.closeQuickView = function () {
      if (quickViewModal) {
        quickViewModal.style.display = "none";
        document.body.style.overflow = "";
      }
    };

    document.addEventListener("click", function (e) {
      const btn = e.target.closest(".quick-view");
      if (btn) {
        const productId = parseInt(btn.dataset.product);
        if (productId && quickViewModal && quickViewContent) {
          showQuickView(productId);
        }
      }
    });

    if (document.querySelector(".modal-close")) {
      document
        .querySelector(".modal-close")
        .addEventListener("click", window.closeQuickView);
    }

    window.addEventListener("click", function (e) {
      if (e.target === quickViewModal) window.closeQuickView();
    });

    document.addEventListener("keydown", function (e) {
      if (
        e.key === "Escape" &&
        quickViewModal &&
        quickViewModal.style.display === "flex"
      ) {
        window.closeQuickView();
      }
    });

    function showQuickView(productId) {
      const product = featuredProducts.find((p) => p.id === productId);
      if (!product || !quickViewContent) return;

      const sizes = ["S", "M", "L", "XL", "XXL"];
      const colors = [
        { name: "Classic", hex: "#1a1a2e" },
        { name: "Navy", hex: "#1a237e" },
        { name: "Black", hex: "#000000" },
      ];

      quickViewContent.innerHTML = `
                <div class="quick-view-grid">
                    <div class="quick-view-image">
                        <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/placeholder.jpg'">
                    </div>
                    <div class="quick-view-details">
                        <span class="product-category">${product.category}</span>
                        <h2>${product.name}</h2>
                        <div class="product-rating">
                            ${getStars(product.rating)}
                            <span class="rating-count">${product.rating} | ${product.reviews} reviews</span>
                        </div>
                        <div class="product-price-large">
                            <span class="current-price">₹${product.price.toLocaleString()}</span>
                            ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString()}</span>` : ""}
                        </div>
                        <p class="product-description">${product.description}</p>

                        <div class="product-option-group">
                            <h4>Select Size:</h4>
                            <div class="size-options">
                                ${sizes.map((s) => `<label class="size-option"><input type="radio" name="size" value="${s}" ${s === "M" ? "checked" : ""}><span class="size-label">${s}</span></label>`).join("")}
                            </div>
                        </div>

                        <div class="product-option-group">
                            <h4>Select Color:</h4>
                            <div class="color-options">
                                ${colors.map((c) => `<label class="color-option"><input type="radio" name="color" value="${c.name}" ${c.name === "Classic" ? "checked" : ""}><span class="color-dot" style="background-color:${c.hex}"></span><span class="color-label">${c.name}</span></label>`).join("")}
                            </div>
                        </div>

                        <div class="product-option-group">
                            <h4>Quantity:</h4>
                            <div class="quantity-selector">
                                <button class="quantity-btn minus-btn"><i class="fas fa-minus"></i></button>
                                <input type="number" class="quantity-input" value="1" min="1" max="99" readonly>
                                <button class="quantity-btn plus-btn"><i class="fas fa-plus"></i></button>
                            </div>
                        </div>

                        <div class="product-actions">
                            <button class="btn btn-primary add-to-cart-modal" data-product="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                            <button class="btn btn-secondary buy-now-modal"><i class="fas fa-bolt"></i> Buy Now</button>
                            <button class="btn btn-outline wishlist-modal"><i class="far fa-heart"></i></button>
                        </div>
                    </div>
                </div>
            `;

      quickViewModal.style.display = "flex";
      document.body.style.overflow = "hidden";
      setupQuickViewEvents(product);
    }

    function setupQuickViewEvents(product) {
      const container = document.querySelector(".quick-view-content");
      if (!container) return;

      // Quantity
      const qtyInput = container.querySelector(".quantity-input");
      container.querySelector(".minus-btn").addEventListener("click", () => {
        if (parseInt(qtyInput.value) > 1)
          qtyInput.value = parseInt(qtyInput.value) - 1;
      });
      container.querySelector(".plus-btn").addEventListener("click", () => {
        if (parseInt(qtyInput.value) < 99)
          qtyInput.value = parseInt(qtyInput.value) + 1;
      });

      // Size/Color selection
      container.querySelectorAll(".size-option input").forEach((opt) => {
        opt.addEventListener("change", function () {
          container
            .querySelectorAll(".size-option")
            .forEach((el) => el.classList.remove("active"));
          this.parentElement.classList.add("active");
        });
        if (opt.checked) opt.parentElement.classList.add("active");
      });

      container.querySelectorAll(".color-option input").forEach((opt) => {
        opt.addEventListener("change", function () {
          container
            .querySelectorAll(".color-option")
            .forEach((el) => el.classList.remove("active"));
          this.parentElement.classList.add("active");
        });
        if (opt.checked) opt.parentElement.classList.add("active");
      });

      // Buy Now
      container
        .querySelector(".buy-now-modal")
        .addEventListener("click", function () {
          container.querySelector(".add-to-cart-modal").click();
          setTimeout(() => {
            window.closeQuickView();
            window.location.href = "cart.html";
          }, 500);
        });

      // Add to Cart
      container
        .querySelector(".add-to-cart-modal")
        .addEventListener("click", function () {
          const selectedSize =
            container.querySelector('input[name="size"]:checked')?.value || "M";
          const selectedColor =
            container.querySelector('input[name="color"]:checked')?.value ||
            "Classic";
          const quantity = parseInt(
            container.querySelector(".quantity-input").value,
          );

          window.cartManager.addItem({
            id: this.dataset.product,
            name: this.dataset.name,
            price: parseFloat(this.dataset.price),
            image: this.dataset.image,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
          });

          notificationSystem.show(
            `${this.dataset.name} (${selectedSize}, ${selectedColor}) added to cart!`,
          );
          setTimeout(window.closeQuickView, 1000);
        });

      // Wishlist
      container
        .querySelector(".wishlist-modal")
        .addEventListener("click", function () {
          const icon = this.querySelector("i");
          if (icon.classList.contains("far")) {
            icon.classList.remove("far");
            icon.classList.add("fas");
            icon.style.color = "#e94560";
            notificationSystem.show(`${product.name} added to wishlist!`);
          } else {
            icon.classList.remove("fas");
            icon.classList.add("far");
            icon.style.color = "";
            notificationSystem.show(
              `${product.name} removed from wishlist`,
              "info",
            );
          }
        });
    }

    function getStars(rating) {
      let stars = "";
      for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) stars += '<i class="fas fa-star"></i>';
        else if (i === Math.floor(rating) + 1 && rating % 1 >= 0.5)
          stars += '<i class="fas fa-star-half-alt"></i>';
        else stars += '<i class="far fa-star"></i>';
      }
      return stars;
    }
  }

  // ============================================================
  // 6. ABOUT PAGE
  // ============================================================

  if (document.querySelector(".about-hero")) {
    // Animated counters
    document.querySelectorAll(".stat-number").forEach((counter) => {
      const target = parseInt(counter.dataset.count) || 0;
      const increment = Math.ceil(target / 80);
      let current = 0;
      counter.textContent = "0";

      const update = () => {
        if (current < target) {
          current += increment;
          if (current > target) current = target;
          counter.textContent = current.toLocaleString();
          setTimeout(update, 20);
        }
      };

      new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            update();
            this.disconnect();
          }
        },
        { threshold: 0.5 },
      ).observe(counter);
    });

    // Timeline animation
    document.querySelectorAll(".timeline-item").forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateX(-30px)";
      item.style.transition = `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`;
      new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            item.style.opacity = "1";
            item.style.transform = "translateX(0)";
          }
        },
        { threshold: 0.2 },
      ).observe(item);
    });

    // Value cards hover
    document.querySelectorAll(".value-card-about").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        const icon = card.querySelector(".value-icon-about");
        if (icon) {
          icon.style.transform = "scale(1.1) rotate(5deg)";
          icon.style.transition = "transform 0.3s ease";
        }
      });
      card.addEventListener("mouseleave", () => {
        const icon = card.querySelector(".value-icon-about");
        if (icon) icon.style.transform = "scale(1) rotate(0deg)";
      });
    });

    // Team member click
    document.querySelectorAll(".team-member").forEach((member) => {
      member.addEventListener("click", (e) => {
        if (e.target.closest(".member-social a")) return;
        const bio = member.querySelector(".member-bio");
        if (bio) bio.classList.toggle("expanded");
      });
    });

    // Button ripple
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `width:${size}px;height:${size}px;top:${e.clientY - rect.top - size / 2}px;left:${e.clientX - rect.left - size / 2}px;`;
        this.style.position = "relative";
        this.style.overflow = "hidden";
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Parallax effect on hero circle
    const heroCircle = document.querySelector(".hero-circle");
    if (heroCircle) {
      document.addEventListener("mousemove", (e) => {
        const rect = heroCircle.getBoundingClientRect();
        const cx = rect.left + rect.width / 2,
          cy = rect.top + rect.height / 2;
        heroCircle.style.transform = `translate(${(e.clientX - cx) / 30}px, ${(e.clientY - cy) / 30}px)`;
        heroCircle.style.transition = "transform 0.1s ease";
      });
      heroCircle.addEventListener("mouseleave", () => {
        heroCircle.style.transform = "translate(0,0)";
        heroCircle.style.transition = "transform 0.5s ease";
      });
    }
  }

  // ============================================================
  // 7. BLOGS PAGE
  // ============================================================

  if (document.querySelector("#blogsGrid")) {
    const blogData = [
      {
        id: 1,
        title: "Top 10 Summer Fashion Trends 2025",
        category: "fashion",
        excerpt:
          "Discover the must-have styles that will define this summer season",
        date: "June 15, 2025",
        readTime: "5 min",
        image:
          "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=250&fit=crop",
        featured: true,
        content:
          "<h2>Summer Fashion Trends 2025</h2><p>Summer is here, and it's time to refresh your wardrobe...</p>",
      },
      {
        id: 2,
        title: "How to Style Ethnic Wear for Modern Events",
        category: "ethnic",
        excerpt:
          "Tips to look elegant while staying comfortable in traditional attire",
        date: "June 12, 2025",
        readTime: "4 min",
        image:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=250&fit=crop",
        featured: false,
        content:
          "<h2>Styling Ethnic Wear</h2><p>Ethnic wear has evolved beyond traditional occasions...</p>",
      },
      {
        id: 3,
        title: "The Ultimate Accessories Guide for Men",
        category: "accessories",
        excerpt: "Complete your look with the perfect accessories",
        date: "June 10, 2025",
        readTime: "6 min",
        image:
          "https://www.eternz.com/blog/content/images/2026/03/top-10-accessories-every-man-should-own.jpg",
        featured: false,
        content:
          "<h2>Accessories Guide</h2><p>Accessories can make or break an outfit...</p>",
      },
      {
        id: 4,
        title: "Sustainable Fashion: A Beginner's Guide",
        category: "sustainability",
        excerpt: "How to build an eco-friendly wardrobe that looks great",
        date: "June 8, 2025",
        readTime: "7 min",
        image:
          "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&h=250&fit=crop",
        featured: false,
        content:
          "<h2>Sustainable Fashion</h2><p>Learn how to make conscious fashion choices...</p>",
      },
      {
        id: 5,
        title: "Color Theory for Men: What to Wear",
        category: "style",
        excerpt: "Understand which colors suit you and how to combine them",
        date: "June 5, 2025",
        readTime: "5 min",
        image:
          "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=400&h=250&fit=crop",
        featured: false,
        content:
          "<h2>Color Theory</h2><p>Understanding color theory can transform your wardrobe...</p>",
      },
      {
        id: 6,
        title: "Indian Wear: A Cultural Journey",
        category: "ethnic",
        excerpt: "Explore the rich heritage of Indian ethnic wear",
        date: "June 3, 2025",
        readTime: "8 min",
        image:
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=250&fit=crop",
        featured: false,
        content:
          "<h2>Indian Wear</h2><p>Explore the rich traditions of Indian ethnic wear...</p>",
      },
    ];

    const categoryMap = {
      fashion: "Fashion Trends",
      ethnic: "Ethnic Wear",
      accessories: "Accessories",
      sustainability: "Sustainability",
      style: "Style Guide",
    };

    let filteredBlogs = [...blogData];
    let currentCategory = "all";
    let currentSearch = "";
    let visibleCount = 6;

    const blogsGrid = document.getElementById("blogsGrid");
    const categoryBtns = document.querySelectorAll(".blog-category-btn");
    const searchInput = document.getElementById("blogSearch");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const modal = document.getElementById("blogModal");
    const modalContent = document.querySelector(".modal-blog-details");

    function formatCategory(cat) {
      return categoryMap[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
    }

    function renderBlogs() {
      const toShow = filteredBlogs
        .filter((b) => !b.featured)
        .slice(0, visibleCount);
      blogsGrid.innerHTML =
        toShow.length === 0
          ? `<div class="no-blogs" style="grid-column:1/-1;text-align:center;padding:60px 20px;"><i class="fas fa-search" style="font-size:3rem;color:var(--sand);margin-bottom:20px;"></i><h3 style="color:var(--primary);">No articles found</h3><p style="color:var(--text-light);">Try adjusting your search or category filters</p></div>`
          : toShow
              .map(
                (b) => `
                    <div class="blog-card" data-id="${b.id}">
                        <div class="blog-card-image"><img src="${b.image}" alt="${b.title}" loading="lazy" onerror="this.src='assets/placeholder.jpg'"></div>
                        <div class="blog-card-content">
                            <div class="blog-card-meta"><span class="blog-card-category">${formatCategory(b.category)}</span><span class="blog-card-date">${b.date}</span></div>
                            <h3 class="blog-card-title">${b.title}</h3>
                            <p class="blog-card-excerpt">${b.excerpt}</p>
                            <div class="blog-card-footer">
                                <span class="blog-card-read-time"><i class="far fa-clock"></i> ${b.readTime}</span>
                                <a href="#" class="blog-card-read-btn read-blog-btn" data-id="${b.id}">Read <i class="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                `,
              )
              .join("");

      loadMoreBtn.style.display =
        visibleCount >= filteredBlogs.filter((b) => !b.featured).length
          ? "none"
          : "inline-flex";
    }

    function filterBlogs() {
      filteredBlogs = blogData.filter((b) => {
        if (currentCategory !== "all" && b.category !== currentCategory)
          return false;
        if (currentSearch) {
          const s = currentSearch.toLowerCase();
          return (
            b.title.toLowerCase().includes(s) ||
            b.excerpt.toLowerCase().includes(s)
          );
        }
        return true;
      });
      visibleCount = 6;
      renderBlogs();
    }

    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        categoryBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.dataset.category;
        filterBlogs();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        currentSearch = e.target.value;
        filterBlogs();
      });
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        visibleCount += 3;
        renderBlogs();
      });
    }

    document.addEventListener("click", function (e) {
      const btn =
        e.target.closest(".read-blog-btn") ||
        e.target.closest(".btn-read-more");
      if (btn) {
        e.preventDefault();
        const blog = blogData.find((b) => b.id === parseInt(btn.dataset.id));
        if (blog && modalContent) {
          modalContent.innerHTML = `
                        <div class="modal-blog-header">
                            <div class="modal-blog-image"><img src="${blog.image}" alt="${blog.title}" onerror="this.src='assets/placeholder.jpg'"></div>
                            <div class="blog-meta" style="display:flex;gap:15px;margin-bottom:20px;">
                                <span class="blog-category" style="background:var(--light-bg);color:var(--secondary);padding:5px 15px;border-radius:20px;font-size:0.9rem;font-weight:600;">${formatCategory(blog.category)}</span>
                                <span class="blog-date" style="color:var(--text-light);display:flex;align-items:center;gap:5px;"><i class="far fa-calendar"></i> ${blog.date}</span>
                                <span class="blog-read-time" style="color:var(--text-light);display:flex;align-items:center;gap:5px;"><i class="far fa-clock"></i> ${blog.readTime}</span>
                            </div>
                            <h2 style="font-size:2.2rem;color:var(--primary);margin:0 0 20px 0;">${blog.title}</h2>
                            <p style="font-size:1.2rem;color:var(--text-light);margin-bottom:30px;line-height:1.6;">${blog.excerpt}</p>
                            <hr style="border:none;height:1px;background:var(--sand);margin:30px 0;">
                            <div class="modal-blog-content">${blog.content}</div>
                        </div>
                    `;
          modal.style.display = "flex";
          document.body.style.overflow = "hidden";
        }
      }
    });

    // Close modal
    document.querySelector(".modal-close")?.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal?.style.display === "flex") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });

    renderBlogs();
  }

  // ============================================================
  // 8. CONTACT PAGE
  // ============================================================

  if (document.querySelector("#contactForm")) {
    const form = document.getElementById("contactForm");
    const submitBtn = document.querySelector(".submit-btn");
    const btnText = submitBtn?.querySelector(".btn-text");
    const loadingSpinner = submitBtn?.querySelector(".loading-spinner");
    const formSuccess = document.getElementById("formSuccess");
    const errors = {
      name: document.getElementById("nameError"),
      email: document.getElementById("emailError"),
      phone: document.getElementById("phoneError"),
      message: document.getElementById("messageError"),
    };

    function validateForm() {
      let valid = true;
      Object.values(errors).forEach((e) => {
        if (e) {
          e.style.display = "none";
          e.textContent = "";
        }
      });

      const name = document.getElementById("name");
      if (name && errors.name) {
        const v = name.value.trim();
        if (!v) {
          errors.name.textContent = "Please enter your full name";
          errors.name.style.display = "block";
          valid = false;
        } else if (v.length < 2) {
          errors.name.textContent = "Name must be at least 2 characters";
          errors.name.style.display = "block";
          valid = false;
        }
      }

      const email = document.getElementById("email");
      if (email && errors.email) {
        const v = email.value.trim();
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!v) {
          errors.email.textContent = "Please enter your email address";
          errors.email.style.display = "block";
          valid = false;
        } else if (!re.test(v)) {
          errors.email.textContent = "Please enter a valid email address";
          errors.email.style.display = "block";
          valid = false;
        }
      }

      const phone = document.getElementById("phone");
      if (phone && errors.phone && phone.value.trim()) {
        if (phone.value.trim().replace(/\D/g, "").length < 10) {
          errors.phone.textContent = "Please enter a valid phone number";
          errors.phone.style.display = "block";
          valid = false;
        }
      }

      const message = document.getElementById("message");
      if (message && errors.message) {
        const v = message.value.trim();
        if (!v) {
          errors.message.textContent = "Please enter your message";
          errors.message.style.display = "block";
          valid = false;
        } else if (v.length < 10) {
          errors.message.textContent = "Message must be at least 10 characters";
          errors.message.style.display = "block";
          valid = false;
        }
      }
      return valid;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm()) return;

      if (btnText) btnText.textContent = "Sending...";
      if (loadingSpinner) loadingSpinner.style.display = "block";
      if (submitBtn) submitBtn.disabled = true;

      setTimeout(() => {
        form.reset();
        if (btnText) btnText.textContent = "Send Message";
        if (loadingSpinner) loadingSpinner.style.display = "none";
        if (submitBtn) submitBtn.disabled = false;
        if (formSuccess) {
          formSuccess.style.display = "block";
          setTimeout(() => (formSuccess.style.display = "none"), 5000);
        }
        console.log("Form submitted");
      }, 1500);
    });

    // Real-time validation
    form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("blur", () => {
        const error = document.getElementById(input.id + "Error");
        if (error && input.value.trim()) error.style.display = "none";
      });
      input.addEventListener("input", () => {
        const error = document.getElementById(input.id + "Error");
        if (error) error.style.display = "none";
      });
    });

    // Social icons hover
    document.querySelectorAll(".social-icon").forEach((icon) => {
      const i = icon.querySelector("i");
      if (i) {
        icon.addEventListener("mouseenter", () => {
          i.style.transform = "scale(1.2) rotate(5deg)";
          i.style.transition = "transform 0.3s ease";
        });
        icon.addEventListener("mouseleave", () => {
          i.style.transform = "scale(1) rotate(0deg)";
        });
      }
    });
  }

  // ============================================================
  // 9. LOGIN PAGE
  // ============================================================

  if (document.querySelector("#loginForm")) {
    const loginForm = document.getElementById("loginForm");
    const loginBtn = document.querySelector(".login-btn");
    const btnText = loginBtn?.querySelector(".btn-text");
    const loadingSpinner = loginBtn?.querySelector(".loading-spinner");

    const DEMO_ACCOUNTS = [
      { email: "demo@clothbrand.com", password: "demo123" },
      { email: "test@clothbrand.com", password: "test123" },
    ];

    function getUsers() {
      try {
        return JSON.parse(localStorage.getItem("clothbrand_users")) || [];
      } catch {
        return [];
      }
    }

    // Initialize demo users
    if (getUsers().length === 0) {
      localStorage.setItem(
        "clothbrand_users",
        JSON.stringify(
          DEMO_ACCOUNTS.map((a) => ({
            ...a,
            name: a.email.split("@")[0],
            createdAt: new Date().toISOString(),
          })),
        ),
      );
    }

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();
      const remember = document.getElementById("rememberMe")?.checked || false;

      if (!email || !password) {
        document.getElementById("passwordError").textContent =
          "Please fill in all fields";
        document.getElementById("passwordError").style.display = "block";
        return;
      }

      if (btnText) btnText.textContent = "Signing In...";
      if (loadingSpinner) loadingSpinner.style.display = "block";
      if (loginBtn) loginBtn.disabled = true;

      setTimeout(() => {
        const users = getUsers();
        const user = users.find(
          (u) => u.email === email && u.password === password,
        );
        const isDemo = DEMO_ACCOUNTS.some(
          (a) => a.email === email && a.password === password,
        );

        if (user || isDemo) {
          if (remember) {
            localStorage.setItem("clothbrand_user_email", email);
            localStorage.setItem("clothbrand_remember_me", "true");
          } else {
            sessionStorage.setItem("clothbrand_user_email", email);
          }
          localStorage.setItem("clothbrand_is_logged_in", "true");

          // Success
          loginBtn.style.backgroundColor = "#00b894";
          const successDiv = document.createElement("div");
          successDiv.style.cssText =
            "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1002;background:white;padding:30px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.2);text-align:center;max-width:400px;width:90%;";
          successDiv.innerHTML = `<i class="fas fa-check-circle" style="font-size:3rem;color:#00b894;margin-bottom:20px;"></i><h3 style="color:var(--primary);margin-bottom:15px;">Login Successful!</h3><p style="color:var(--text-light);">Welcome back!</p>`;
          document.body.appendChild(successDiv);
          setTimeout(() => {
            successDiv.style.opacity = "0";
            successDiv.style.transform = "translate(-50%,-50%) scale(0.9)";
            setTimeout(() => {
              if (successDiv.parentNode) successDiv.remove();
              window.location.href = "index.html";
            }, 300);
          }, 1700);
        } else {
          loginBtn.style.backgroundColor = "#e74c3c";
          loginBtn.style.transform = "translateX(-5px)";
          setTimeout(() => {
            loginBtn.style.backgroundColor = "";
            loginBtn.style.transform = "";
          }, 300);
          document.getElementById("passwordError").textContent =
            "Invalid email or password. Use demo@clothbrand.com / demo123";
          document.getElementById("passwordError").style.display = "block";
        }

        if (btnText) btnText.textContent = "Sign In";
        if (loadingSpinner) loadingSpinner.style.display = "none";
        if (loginBtn) loginBtn.disabled = false;
      }, 1000);
    });

    // Password toggle
    const pwToggle = document.getElementById("passwordToggle");
    const pwInput = document.getElementById("loginPassword");
    if (pwToggle && pwInput) {
      pwToggle.addEventListener("click", function () {
        const type = pwInput.type === "password" ? "text" : "password";
        pwInput.type = type;
        this.querySelector("i").classList.toggle("fa-eye");
        this.querySelector("i").classList.toggle("fa-eye-slash");
      });
    }

    // Auto-fill demo credentials
    const emailInput = document.getElementById("loginEmail");
    if (emailInput && pwInput) {
      emailInput.addEventListener("focus", function () {
        if (!this.value && !localStorage.getItem("clothbrand_banner_closed")) {
          this.value = "demo@clothbrand.com";
          pwInput.value = "demo123";
          this.style.borderColor = "#00b894";
          pwInput.style.borderColor = "#00b894";
          setTimeout(() => {
            this.style.borderColor = "";
            pwInput.style.borderColor = "";
          }, 1000);
        }
      });
    }

    // Forgot password modal
    document
      .getElementById("forgotPassword")
      ?.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("forgotPasswordModal").style.display = "flex";
      });
    document
      .querySelector(".modal-close")
      ?.addEventListener("click", function () {
        document.getElementById("forgotPasswordModal").style.display = "none";
      });
    document
      .getElementById("forgotPasswordForm")
      ?.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = document.getElementById("resetEmail").value.trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          document.getElementById("resetEmailError").textContent =
            "Please enter a valid email";
          document.getElementById("resetEmailError").style.display = "block";
          return;
        }
        document.getElementById("resetSuccess").style.display = "block";
        setTimeout(() => {
          document.getElementById("forgotPasswordModal").style.display = "none";
          document.getElementById("resetSuccess").style.display = "none";
          this.reset();
        }, 3000);
      });

    // Demo banner close
    document
      .getElementById("closeBanner")
      ?.addEventListener("click", function () {
        document.getElementById("demoBanner").style.display = "none";
        localStorage.setItem("clothbrand_banner_closed", "true");
      });

    // Social login
    document.querySelectorAll(".social-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const provider = this.classList.contains("google-btn")
          ? "google"
          : "facebook";
        localStorage.setItem("clothbrand_is_logged_in", "true");
        localStorage.setItem(
          "clothbrand_user_email",
          `${provider}user@clothbrand.com`,
        );
        notificationSystem.show(`${provider} login successful!`, "success");
        setTimeout(() => (window.location.href = "index.html"), 1500);
      });
    });

    // Ripple effect
    document.querySelectorAll(".btn, .social-btn").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `width:${size}px;height:${size}px;top:${e.clientY - rect.top - size / 2}px;left:${e.clientX - rect.left - size / 2}px;`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // ============================================================
  // 10. REGISTER PAGE
  // ============================================================

  if (document.querySelector("#registerForm")) {
    const registerForm = document.getElementById("registerForm");
    const registerBtn = document.querySelector(".register-btn");
    const btnText = registerBtn?.querySelector(".btn-text");
    const loadingSpinner = registerBtn?.querySelector(".loading-spinner");

    function getUsers() {
      try {
        return JSON.parse(localStorage.getItem("clothbrand_users")) || [];
      } catch {
        return [];
      }
    }

    function saveUsers(users) {
      localStorage.setItem("clothbrand_users", JSON.stringify(users));
    }

    function emailExists(email) {
      return getUsers().some((u) => u.email === email);
    }

    // Password strength
    const pwInput = document.getElementById("registerPassword");
    const strengthFill = document.getElementById("strengthFill");
    const strengthText = document.getElementById("strengthText");

    if (pwInput) {
      pwInput.addEventListener("input", function () {
        const p = this.value;
        let strength = 0;
        if (p.length >= 8) strength++;
        if (/[a-z]/.test(p) && /[A-Z]/.test(p)) strength++;
        if (/\d/.test(p)) strength++;
        if (/[^a-zA-Z\d]/.test(p)) strength++;

        const levels = ["Weak", "Fair", "Good", "Strong"];
        const colors = ["#e74c3c", "#f39c12", "#3498db", "#00b894"];
        const pct = (strength / 4) * 100;
        strengthFill.style.width = pct + "%";
        strengthFill.style.backgroundColor = colors[strength] || "#e74c3c";
        strengthText.textContent = `Password strength: ${levels[strength] || "None"}`;
        strengthText.style.color = colors[strength] || "#666";
      });
    }

    // Password toggles
    document.querySelectorAll(".password-toggle").forEach((toggle) => {
      toggle.addEventListener("click", function () {
        const input = this.parentElement.querySelector("input");
        const type = input.type === "password" ? "text" : "password";
        input.type = type;
        this.querySelector("i").classList.toggle("fa-eye");
        this.querySelector("i").classList.toggle("fa-eye-slash");
      });
    });

    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let valid = true;

      // Clear errors
      document.querySelectorAll(".error-message").forEach((el) => {
        el.style.display = "none";
        el.textContent = "";
      });

      const firstName = document.getElementById("firstName");
      const lastName = document.getElementById("lastName");
      const email = document.getElementById("registerEmail");
      const password = document.getElementById("registerPassword");
      const confirm = document.getElementById("confirmPassword");
      const terms = document.getElementById("terms");

      if (!firstName.value.trim() || firstName.value.trim().length < 2) {
        document.getElementById("firstNameError").textContent =
          "First name required (min 2 chars)";
        document.getElementById("firstNameError").style.display = "block";
        valid = false;
      }
      if (!lastName.value.trim() || lastName.value.trim().length < 2) {
        document.getElementById("lastNameError").textContent =
          "Last name required (min 2 chars)";
        document.getElementById("lastNameError").style.display = "block";
        valid = false;
      }
      if (
        !email.value.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
      ) {
        document.getElementById("emailError").textContent =
          "Please enter a valid email";
        document.getElementById("emailError").style.display = "block";
        valid = false;
      } else if (emailExists(email.value.trim())) {
        document.getElementById("emailError").textContent =
          "Email already registered. Please login.";
        document.getElementById("emailError").style.display = "block";
        valid = false;
      }
      if (!password.value.trim() || password.value.trim().length < 8) {
        document.getElementById("passwordError").textContent =
          "Password must be at least 8 characters";
        document.getElementById("passwordError").style.display = "block";
        valid = false;
      }
      if (password.value.trim() !== confirm.value.trim()) {
        document.getElementById("confirmPasswordError").textContent =
          "Passwords do not match";
        document.getElementById("confirmPasswordError").style.display = "block";
        valid = false;
      }
      if (!terms.checked) {
        document.getElementById("termsError").textContent =
          "You must accept the terms";
        document.getElementById("termsError").style.display = "block";
        valid = false;
      }

      if (!valid) {
        const firstError = document.querySelector(
          '.error-message[style*="block"]',
        );
        if (firstError) {
          const input = document.getElementById(
            firstError.id.replace("Error", ""),
          );
          if (input) input.focus();
        }
        return;
      }

      if (btnText) btnText.textContent = "Creating Account...";
      if (loadingSpinner) loadingSpinner.style.display = "block";
      if (registerBtn) registerBtn.disabled = true;

      setTimeout(() => {
        const users = getUsers();
        users.push({
          email: email.value.trim(),
          password: password.value.trim(),
          name: `${firstName.value.trim()} ${lastName.value.trim()}`,
          createdAt: new Date().toISOString(),
        });
        saveUsers(users);

        const discountCode = `WELCOME${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        localStorage.setItem("clothbrand_welcome_discount", discountCode);
        localStorage.setItem("clothbrand_user_email", email.value.trim());
        localStorage.setItem("clothbrand_is_logged_in", "true");

        registerBtn.style.backgroundColor = "#00b894";
        const successDiv = document.createElement("div");
        successDiv.style.cssText =
          "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:1002;background:white;padding:30px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.2);text-align:center;max-width:500px;width:90%;";
        successDiv.innerHTML = `
                    <i class="fas fa-check-circle" style="font-size:3rem;color:#00b894;margin-bottom:20px;"></i>
                    <h3 style="color:var(--primary);">Welcome to ClothBrand!</h3>
                    <p style="color:var(--text-light);">Your account has been created.</p>
                    <p style="color:var(--primary);margin:10px 0;"><strong>🎉 Welcome Gift:</strong> Use code <code style="background:var(--light-bg);padding:5px 10px;border-radius:5px;font-weight:bold;color:var(--secondary);">${discountCode}</code> for 15% off!</p>
                `;
        document.body.appendChild(successDiv);

        setTimeout(() => {
          if (btnText) btnText.textContent = "Create Account";
          if (loadingSpinner) loadingSpinner.style.display = "none";
          if (registerBtn) registerBtn.disabled = false;
        }, 500);

        setTimeout(() => {
          successDiv.style.opacity = "0";
          successDiv.style.transform = "translate(-50%,-50%) scale(0.9)";
          setTimeout(() => {
            if (successDiv.parentNode) successDiv.remove();
            window.location.href = "index.html";
          }, 300);
        }, 2700);
      }, 1500);
    });

    // Terms modal
    document.querySelectorAll(".terms-link").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("termsModal").style.display = "flex";
      });
    });
    document
      .querySelector(".modal-close")
      ?.addEventListener("click", function () {
        document.getElementById("termsModal").style.display = "none";
      });
    window.addEventListener("click", function (e) {
      if (e.target === document.getElementById("termsModal")) {
        document.getElementById("termsModal").style.display = "none";
      }
    });

    // Animated counters
    document.querySelectorAll(".stat-number").forEach((counter) => {
      const target = parseInt(counter.dataset.count) || 0;
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 100));
      new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            const interval = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(interval);
              }
              counter.textContent = current.toLocaleString();
            }, 20);
            this.disconnect();
          }
        },
        { threshold: 0.5 },
      ).observe(counter);
    });

    // Ripple effect
    document.querySelectorAll(".btn, .social-btn").forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "ripple";
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `width:${size}px;height:${size}px;top:${e.clientY - rect.top - size / 2}px;left:${e.clientX - rect.left - size / 2}px;`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  // ============================================================
  // 11. CHECKOUT PAGE
  // ============================================================

  if (document.querySelector("#checkoutForm")) {
    const checkoutForm = document.getElementById("checkoutForm");
    const placeOrderBtn = document.getElementById("placeOrderBtn");
    const successModal = document.getElementById("successModal");

    function loadCartData() {
      const cm = window.cartManager;
      if (!cm) return;
      const items = cm.getItems();
      const stats = cm.getStats();

      // Order items in form
      const container = document.getElementById("orderItems");
      if (container) {
        container.innerHTML =
          items.length === 0
            ? '<p style="color:var(--text-light);">Your cart is empty</p>'
            : items
                .map(
                  (i) =>
                    `<div class="order-item"><span class="order-item-name">${i.name} × ${i.quantity}</span><span class="order-item-price">₹${(i.price * i.quantity).toFixed(2)}</span></div>`,
                )
                .join("");
      }

      // Totals
      document.getElementById("orderSubtotal").textContent =
        `₹${stats.subtotal.toFixed(2)}`;
      document.getElementById("orderTotal").textContent =
        `₹${stats.total.toFixed(2)}`;
      document.getElementById("summarySubtotal").textContent =
        `₹${stats.subtotal.toFixed(2)}`;
      document.getElementById("summaryTotal").textContent =
        `₹${stats.total.toFixed(2)}`;

      // Sidebar items
      const summaryItems = document.getElementById("summaryItems");
      if (summaryItems) {
        summaryItems.innerHTML =
          items.length === 0
            ? '<p style="color:var(--text-light);">Your cart is empty</p>'
            : items
                .map(
                  (i) => `
                        <div class="summary-item">
                            <img src="${i.image || "assets/placeholder.jpg"}" alt="${i.name}">
                            <div class="summary-item-info">
                                <div class="summary-item-name">${i.name}</div>
                                <div class="summary-item-meta">${i.size || "M"} | ${i.color || "Classic"}</div>
                            </div>
                            <div class="summary-item-price">₹${(i.price * i.quantity).toFixed(2)}</div>
                        </div>
                    `,
                )
                .join("");
      }
    }

    // Payment method toggle
    document.querySelectorAll('input[name="payment"]').forEach((radio) => {
      radio.addEventListener("change", function () {
        document.getElementById("cardDetails").style.display =
          this.value === "card" ? "block" : "none";
        document.getElementById("upiDetails").style.display =
          this.value === "upi" ? "block" : "none";
      });
    });

    // Card input formatting
    document
      .getElementById("cardNumber")
      ?.addEventListener("input", function () {
        let v = this.value.replace(/\D/g, "");
        if (v.length > 16) v = v.slice(0, 16);
        let f = "";
        for (let i = 0; i < v.length; i++) {
          if (i > 0 && i % 4 === 0) f += " ";
          f += v[i];
        }
        this.value = f;
      });
    document.getElementById("expiry")?.addEventListener("input", function () {
      let v = this.value.replace(/\D/g, "");
      if (v.length > 4) v = v.slice(0, 4);
      let f = "";
      for (let i = 0; i < v.length; i++) {
        if (i === 2) f += "/";
        f += v[i];
      }
      this.value = f;
    });
    document.getElementById("cvv")?.addEventListener("input", function () {
      let v = this.value.replace(/\D/g, "");
      if (v.length > 4) v = v.slice(0, 4);
      this.value = v;
    });

    function validateCheckout() {
      let valid = true;
      document.querySelectorAll(".error-message").forEach((el) => {
        el.style.display = "none";
      });
      document
        .querySelectorAll(".form-group input, .form-group select")
        .forEach((el) => el.classList.remove("error"));

      [
        "firstName",
        "lastName",
        "email",
        "phone",
        "address",
        "city",
        "state",
        "pincode",
      ].forEach((id) => {
        const field = document.getElementById(id);
        const error = document.getElementById(id + "Error");
        if (field && error && !field.value.trim()) {
          field.classList.add("error");
          error.textContent = "This field is required";
          error.style.display = "block";
          valid = false;
        }
      });

      const email = document.getElementById("email");
      const emailError = document.getElementById("emailError");
      if (
        email &&
        emailError &&
        email.value.trim() &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())
      ) {
        email.classList.add("error");
        emailError.textContent = "Please enter a valid email";
        emailError.style.display = "block";
        valid = false;
      }

      const phone = document.getElementById("phone");
      const phoneError = document.getElementById("phoneError");
      if (
        phone &&
        phoneError &&
        phone.value.trim().replace(/\D/g, "").length < 10
      ) {
        phone.classList.add("error");
        phoneError.textContent = "Please enter a valid 10-digit phone number";
        phoneError.style.display = "block";
        valid = false;
      }

      const pincode = document.getElementById("pincode");
      const pincodeError = document.getElementById("pincodeError");
      if (
        pincode &&
        pincodeError &&
        pincode.value.trim().replace(/\D/g, "").length !== 6
      ) {
        pincode.classList.add("error");
        pincodeError.textContent = "Please enter a valid 6-digit PIN code";
        pincodeError.style.display = "block";
        valid = false;
      }

      return valid;
    }

    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateCheckout()) {
        const firstError = document.querySelector(
          ".form-group input.error, .form-group select.error",
        );
        if (firstError) {
          firstError.focus();
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        return;
      }

      if (!window.cartManager || window.cartManager.getItemCount() === 0) {
        notificationSystem.show("Your cart is empty", "error");
        return;
      }

      placeOrderBtn.disabled = true;
      placeOrderBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Processing...';

      const paymentMethod = document.querySelector(
        'input[name="payment"]:checked',
      );
      const paymentLabel =
        paymentMethod?.nextElementSibling?.querySelector("span")?.textContent ||
        "Card";

      setTimeout(() => {
        const orderId = `#CB-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;
        const stats = window.cartManager.getStats();

        // Save order
        const orders = JSON.parse(
          localStorage.getItem("clothbrand_orders") || "[]",
        );
        orders.push({
          id: orderId,
          items: window.cartManager.getItems(),
          total: stats.total,
          paymentMethod: paymentLabel,
          customerName: `${document.getElementById("firstName").value} ${document.getElementById("lastName").value}`,
          email: document.getElementById("email").value,
          orderDate: new Date().toISOString(),
        });
        localStorage.setItem("clothbrand_orders", JSON.stringify(orders));

        // Clear cart
        window.cartManager.clearCart();

        // Show success
        document.getElementById("orderId").textContent = orderId;
        document.getElementById("orderAmount").textContent =
          `₹${stats.total.toFixed(2)}`;
        document.getElementById("orderPayment").textContent = paymentLabel;
        successModal.style.display = "flex";
        document.body.style.overflow = "hidden";

        placeOrderBtn.disabled = false;
        placeOrderBtn.innerHTML = '<i class="fas fa-lock"></i> Place Order';
        checkoutForm.reset();
        document.getElementById("cardDetails").style.display = "block";
        document.getElementById("upiDetails").style.display = "none";

        notificationSystem.show("Order placed successfully!", "success");
      }, 2000);
    });

    // Close modal
    document
      .querySelector(".modal-close")
      ?.addEventListener("click", function () {
        successModal.style.display = "none";
        document.body.style.overflow = "";
      });
    window.addEventListener("click", function (e) {
      if (e.target === successModal) {
        successModal.style.display = "none";
        document.body.style.overflow = "";
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && successModal.style.display === "flex") {
        successModal.style.display = "none";
        document.body.style.overflow = "";
      }
    });

    // Real-time validation
    document
      .querySelectorAll(".form-group input, .form-group select")
      .forEach((field) => {
        field.addEventListener("blur", function () {
          if (this.value.trim()) {
            this.classList.remove("error");
            const err = document.getElementById(this.id + "Error");
            if (err) err.style.display = "none";
          }
        });
      });

    loadCartData();
    if (window.cartManager) {
      window.cartManager.subscribe(loadCartData);
      window.cartManager.updateCartCount();
    }
  }

  // ============================================================
  // 12. PRODUCTS PAGE
  // ============================================================

  if (document.querySelector(".products-grid-large")) {
    const productsData = [
      // Full product data here - keeping it short for brevity
      {
        id: 1,
        name: "Classic White Shirt",
        category: "shirts",
        material: "cotton",
        price: 1299,
        originalPrice: 1999,
        description:
          "Premium cotton shirt perfect for formal and casual occasions.",
        badge: "new",
        featured: true,
        rating: 4.8,
        reviews: 856,
        image:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
          { name: "White", hex: "#FFFFFF" },
          { name: "Black", hex: "#000000" },
          { name: "Blue", hex: "#1a237e" },
        ],
      },
      {
        id: 2,
        name: "Denim Jacket",
        category: "jackets",
        material: "denim",
        price: 2499,
        originalPrice: 3499,
        description: "Classic denim jacket that never goes out of style.",
        badge: "trending",
        featured: true,
        rating: 4.9,
        reviews: 634,
        image:
          "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        colors: [
          { name: "Blue", hex: "#1565C0" },
          { name: "Black", hex: "#212121" },
        ],
      },
      {
        id: 3,
        name: "Cotton T-Shirt",
        category: "tshirts",
        material: "cotton",
        price: 799,
        originalPrice: 1199,
        description: "Soft, breathable cotton t-shirt for everyday comfort.",
        badge: "sale",
        featured: true,
        rating: 4.7,
        reviews: 1234,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        colors: [
          { name: "White", hex: "#FFFFFF" },
          { name: "Black", hex: "#000000" },
          { name: "Navy", hex: "#1a237e" },
        ],
      },
      {
        id: 4,
        name: "Kurta Set",
        category: "ethnic",
        material: "silk",
        price: 3999,
        originalPrice: 5999,
        description:
          "Elegant kurta set for special occasions. Premium silk fabric.",
        badge: "new",
        featured: true,
        rating: 4.9,
        reviews: 432,
        image:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        colors: [
          { name: "Gold", hex: "#FFD700" },
          { name: "Maroon", hex: "#800000" },
          { name: "Navy", hex: "#1a237e" },
        ],
      },
      {
        id: 5,
        name: "Leather Belt",
        category: "accessories",
        material: "leather",
        price: 899,
        originalPrice: 1299,
        description: "Premium leather belt with a classic buckle.",
        badge: "trending",
        featured: true,
        rating: 4.6,
        reviews: 567,
        image:
          "https://images.unsplash.com/photo-1664286074176-5206ee5dc878?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        sizes: ["30", "32", "34", "36", "38"],
        colors: [
          { name: "Brown", hex: "#5D4037" },
          { name: "Black", hex: "#000000" },
        ],
      },
      {
        id: 6,
        name: "Sneakers",
        category: "footwear",
        material: "leather",
        price: 4999,
        originalPrice: 6999,
        description: "Stylish sneakers for everyday wear. Premium leather.",
        badge: "new",
        featured: true,
        rating: 4.8,
        reviews: 789,
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: [
          { name: "White", hex: "#FFFFFF" },
          { name: "Black", hex: "#000000" },
        ],
      },
      {
        id: 7,
        name: "Linen Shirt",
        category: "shirts",
        material: "linen",
        price: 1899,
        originalPrice: 2799,
        description: "Lightweight linen shirt perfect for summer.",
        badge: "sale",
        featured: true,
        rating: 4.7,
        reviews: 345,
        image:
          "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [
          { name: "Beige", hex: "#F5F5DC" },
          { name: "Blue", hex: "#1a237e" },
          { name: "White", hex: "#FFFFFF" },
        ],
      },
      {
        id: 8,
        name: "Bomber Jacket",
        category: "jackets",
        material: "wool",
        price: 3999,
        originalPrice: 5499,
        description: "Stylish bomber jacket for a modern look.",
        badge: "new",
        featured: true,
        rating: 4.8,
        reviews: 234,
        image:
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        colors: [
          { name: "Black", hex: "#000000" },
          { name: "Navy", hex: "#1a237e" },
          { name: "Olive", hex: "#556B2F" },
        ],
      },
      {
        id: 9,
        name: "Sherwani",
        category: "ethnic",
        material: "silk",
        price: 7999,
        originalPrice: 11999,
        description: "Royal sherwani for weddings and celebrations.",
        badge: "premium",
        featured: true,
        rating: 4.9,
        reviews: 156,
        image:
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop",
        sizes: ["M", "L", "XL", "XXL"],
        colors: [
          { name: "Gold", hex: "#FFD700" },
          { name: "Maroon", hex: "#800000" },
          { name: "Ivory", hex: "#FFFFF0" },
        ],
      },
      {
        id: 10,
        name: "Watch",
        category: "accessories",
        material: "metal",
        price: 5999,
        originalPrice: 8999,
        description: "Elegant wristwatch with a premium metal strap.",
        badge: "trending",
        featured: true,
        rating: 4.7,
        reviews: 678,
        image:
          "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
        sizes: ["One Size"],
        colors: [
          { name: "Silver", hex: "#C0C0C0" },
          { name: "Gold", hex: "#FFD700" },
          { name: "Black", hex: "#000000" },
        ],
      },
    ];

    const grid = document.querySelector(".products-grid-large");
    const countEl = document.getElementById("productsCount");
    const categoryFilters = document.querySelectorAll(".category-filter");
    const materialFilters = document.querySelectorAll(".material-filter");
    const priceRange = document.getElementById("priceRange");
    const sortSelect = document.getElementById("sortSelect");
    const filterToggle = document.getElementById("filterToggle");
    const filtersSidebar = document.getElementById("filtersSidebar");
    const mobileSearch = document.getElementById("mobileSearch");
    const mobileSearchBtn = document.getElementById("mobileSearchBtn");

    let filteredProducts = [...productsData];
    let currentSort = "featured";
    let currentPage = 1;
    let searchTerm = "";
    const perPage = 12;

    function formatCategory(cat) {
      const map = {
        shirts: "Shirts",
        jackets: "Jackets",
        tshirts: "T-Shirts",
        ethnic: "Ethnic Wear",
        accessories: "Accessories",
        footwear: "Footwear",
      };
      return map[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
    }

    function renderProducts() {
      const start = (currentPage - 1) * perPage;
      const end = start + perPage;
      const toShow = filteredProducts.slice(start, end);

      grid.innerHTML =
        toShow.length === 0
          ? `<div class="no-results"><i class="fas fa-search"></i><h3>No products found</h3><p>Try adjusting your filters.</p></div>`
          : toShow
              .map((p) => {
                const inCart = (window.cartManager?.getItems() || []).some(
                  (i) => i.id === p.id,
                );
                return `
                        <div class="product-card-large" data-id="${p.id}">
                            <div class="product-image">
                                <img src="${p.image}" alt="${p.name}" loading="lazy">
                                ${p.badge ? `<div class="product-badge ${p.badge}">${p.badge.charAt(0).toUpperCase() + p.badge.slice(1)}</div>` : ""}
                                <div class="product-actions">
                                    <button class="product-action-btn quick-view-btn" title="Quick View"><i class="fas fa-eye"></i></button>
                                    <button class="product-action-btn wishlist-btn" title="Add to Wishlist"><i class="far fa-heart"></i></button>
                                </div>
                            </div>
                            <div class="product-info-large">
                                <span class="product-category">${formatCategory(p.category)}</span>
                                <h4>${p.name}</h4>
                                <p class="product-description">${p.description.length > 100 ? p.description.substring(0, 100) + "..." : p.description}</p>
                                <div class="product-price-large">
                                    <span class="current-price">₹${p.price.toLocaleString()}</span>
                                    ${p.originalPrice ? `<span class="original-price">₹${p.originalPrice.toLocaleString()}</span>` : ""}
                                </div>
                                <button class="add-to-cart-large ${inCart ? "in-cart" : ""}" data-product="${p.id}" ${inCart ? "disabled" : ""}>
                                    ${inCart ? "In Cart ✓" : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    `;
              })
              .join("");

      updatePagination();
      updateCount();
    }

    function filterProducts() {
      const categories = [...categoryFilters]
        .filter((c) => c.checked)
        .map((c) => c.value);
      const materials = [...materialFilters]
        .filter((c) => c.checked)
        .map((c) => c.value);
      const maxPrice = parseInt(priceRange.value);

      filteredProducts = productsData.filter((p) => {
        if (searchTerm) {
          const s = searchTerm.toLowerCase();
          if (
            !p.name.toLowerCase().includes(s) &&
            !p.description.toLowerCase().includes(s) &&
            !p.category.includes(s) &&
            !p.material.includes(s)
          )
            return false;
        }
        if (categories.length && !categories.includes(p.category)) return false;
        if (materials.length) {
          const map = {
            cotton: ["cotton", "linen"],
            linen: ["linen"],
            denim: ["denim"],
            silk: ["silk"],
            wool: ["wool", "leather"],
            leather: ["leather"],
            metal: ["metal"],
          };
          if (!materials.some((m) => (map[m] || [m]).includes(p.material)))
            return false;
        }
        if (p.price > maxPrice) return false;
        return true;
      });

      sortProducts();
      currentPage = 1;
      renderProducts();
    }

    function sortProducts() {
      const sorts = {
        "price-low": (a, b) => a.price - b.price,
        "price-high": (a, b) => b.price - a.price,
        newest: (a, b) => b.id - a.id,
        popular: (a, b) => b.rating - a.rating,
        featured: (a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        },
      };
      filteredProducts.sort(sorts[currentSort] || sorts.featured);
    }

    function updatePagination() {
      const total = Math.ceil(filteredProducts.length / perPage);
      const numbers = document.querySelector(".page-numbers");
      numbers.innerHTML = "";
      for (let i = 1; i <= Math.min(total, 5); i++) {
        const span = document.createElement("span");
        span.className = `page-number ${i === currentPage ? "active" : ""}`;
        span.textContent = i;
        span.addEventListener("click", () => {
          currentPage = i;
          renderProducts();
        });
        numbers.appendChild(span);
      }
      document.querySelector(".prev-btn").disabled = currentPage === 1;
      document.querySelector(".next-btn").disabled =
        currentPage === total || total === 0;
    }

    function updateCount() {
      const start = filteredProducts.length
        ? (currentPage - 1) * perPage + 1
        : 0;
      const end = Math.min(currentPage * perPage, filteredProducts.length);
      countEl.textContent = filteredProducts.length
        ? `Showing ${start}-${end} of ${filteredProducts.length} products${searchTerm ? ` for "${searchTerm}"` : ""}`
        : `No products found${searchTerm ? ` for "${searchTerm}"` : ""}`;
    }

    // Setup
    categoryFilters.forEach((c) => (c.checked = true));
    priceRange.value = 10000;
    document.getElementById("maxPrice").textContent = "₹10,000";

    // Events
    priceRange.addEventListener("input", () => {
      document.getElementById("maxPrice").textContent =
        `₹${parseInt(priceRange.value).toLocaleString()}`;
    });
    priceRange.addEventListener("change", filterProducts);
    sortSelect.addEventListener("change", function () {
      currentSort = this.value;
      sortProducts();
      currentPage = 1;
      renderProducts();
    });
    categoryFilters.forEach((c) =>
      c.addEventListener("change", filterProducts),
    );
    materialFilters.forEach((c) =>
      c.addEventListener("change", filterProducts),
    );

    document
      .querySelector(".btn-apply-filters")
      ?.addEventListener("click", filterProducts);
    document
      .querySelector(".btn-reset-filters")
      ?.addEventListener("click", function () {
        categoryFilters.forEach((c) => (c.checked = true));
        materialFilters.forEach((c) => (c.checked = false));
        priceRange.value = 10000;
        document.getElementById("maxPrice").textContent = "₹10,000";
        sortSelect.value = "featured";
        currentSort = "featured";
        searchTerm = "";
        if (mobileSearch) mobileSearch.value = "";
        filterProducts();
        if (filtersSidebar) {
          filtersSidebar.classList.remove("active");
          document.body.classList.remove("filter-open");
        }
      });

    document.querySelector(".prev-btn")?.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderProducts();
      }
    });
    document.querySelector(".next-btn")?.addEventListener("click", () => {
      const total = Math.ceil(filteredProducts.length / perPage);
      if (currentPage < total) {
        currentPage++;
        renderProducts();
      }
    });

    if (filterToggle && filtersSidebar) {
      filterToggle.addEventListener("click", () => {
        filtersSidebar.classList.toggle("active");
        document.body.classList.toggle("filter-open");
      });
    }
    document
      .getElementById("closeFiltersBtn")
      ?.addEventListener("click", () => {
        filtersSidebar.classList.remove("active");
        document.body.classList.remove("filter-open");
      });

    if (mobileSearch && mobileSearchBtn) {
      mobileSearchBtn.addEventListener("click", () => {
        searchTerm = mobileSearch.value.toLowerCase().trim();
        filterProducts();
      });
      mobileSearch.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          searchTerm = mobileSearch.value.toLowerCase().trim();
          filterProducts();
        }
      });
      mobileSearch.addEventListener("input", (e) => {
        if (!e.target.value) {
          searchTerm = "";
          filterProducts();
        }
      });
    }

    // Delegate events
    document.addEventListener("click", function (e) {
      // Add to cart
      const btn = e.target.closest(".add-to-cart-large");
      if (btn && !btn.disabled) {
        const product = productsData.find(
          (p) => p.id === parseInt(btn.dataset.product),
        );
        if (product) window.addToCart(product.id);
      }

      // Quick view
      if (e.target.closest(".quick-view-btn")) {
        const card = e.target.closest(".product-card-large");
        if (card) {
          const product = productsData.find(
            (p) => p.id === parseInt(card.dataset.id),
          );
          if (product) showQuickViewModal(product);
        }
      }

      // Wishlist
      if (e.target.closest(".wishlist-btn")) {
        const btn = e.target.closest(".wishlist-btn");
        const icon = btn.querySelector("i");
        if (icon.classList.contains("far")) {
          icon.classList.remove("far");
          icon.classList.add("fas");
          icon.style.color = "#e94560";
          notificationSystem.show("Added to wishlist!");
        } else {
          icon.classList.remove("fas");
          icon.classList.add("far");
          icon.style.color = "";
          notificationSystem.show("Removed from wishlist", "info");
        }
      }
    });

    // Quick view function for products page
    function showQuickViewModal(product) {
      const modal = document.createElement("div");
      modal.className = "modal-overlay";
      modal.innerHTML = `
                <div class="quick-view-content">
                    <button class="quick-view-close-btn"><i class="fas fa-times"></i></button>
                    <div class="quick-view-image"><img src="${product.image}" alt="${product.name}" onerror="this.src='assets/placeholder.jpg'"></div>
                    <div class="quick-view-details">
                        <span class="product-category">${formatCategory(product.category)}</span>
                        <h3>${product.name}</h3>
                        <div class="product-price-large"><span class="current-price">₹${product.price.toLocaleString()}</span>${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString()}</span>` : ""}</div>
                        <p>${product.details || product.description}</p>
                        <div class="product-option-group"><h4>Select Size:</h4><div class="size-options">${(product.sizes || ["M"]).map((s) => `<label class="size-option"><input type="radio" name="size" value="${s}" ${s === "M" ? "checked" : ""}><span class="size-label">${s}</span></label>`).join("")}</div></div>
                        <div class="product-option-group"><h4>Select Color:</h4><div class="color-options">${(product.colors || [{ name: "Classic", hex: "#1a1a2e" }]).map((c) => `<label class="color-option"><input type="radio" name="color" value="${c.name}" ${c.name === "Classic" ? "checked" : ""}><span class="color-dot" style="background-color:${c.hex}"></span><span class="color-label">${c.name}</span></label>`).join("")}</div></div>
                        <div class="product-option-group"><h4>Quantity:</h4><div class="quantity-selector"><button class="quantity-btn minus-btn"><i class="fas fa-minus"></i></button><input type="number" class="quantity-input" value="1" min="1" max="99" readonly><button class="quantity-btn plus-btn"><i class="fas fa-plus"></i></button></div></div>
                        <div class="product-actions">
                            <button class="btn btn-primary add-to-cart-modal" data-product="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
                            <button class="btn btn-secondary buy-now-modal"><i class="fas fa-bolt"></i> Buy Now</button>
                            <button class="btn btn-outline wishlist-modal"><i class="far fa-heart"></i></button>
                        </div>
                    </div>
                </div>
            `;

      document.body.appendChild(modal);

      // Close
      modal
        .querySelector(".quick-view-close-btn")
        .addEventListener("click", () => modal.remove());
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.remove();
      });

      // Quantity
      const qtyInput = modal.querySelector(".quantity-input");
      modal.querySelector(".minus-btn").addEventListener("click", () => {
        if (parseInt(qtyInput.value) > 1)
          qtyInput.value = parseInt(qtyInput.value) - 1;
      });
      modal.querySelector(".plus-btn").addEventListener("click", () => {
        if (parseInt(qtyInput.value) < 99)
          qtyInput.value = parseInt(qtyInput.value) + 1;
      });

      // Size/Color selection
      modal.querySelectorAll(".size-option input").forEach((opt) => {
        opt.addEventListener("change", function () {
          modal
            .querySelectorAll(".size-option")
            .forEach((el) => el.classList.remove("active"));
          this.parentElement.classList.add("active");
        });
        if (opt.checked) opt.parentElement.classList.add("active");
      });
      modal.querySelectorAll(".color-option input").forEach((opt) => {
        opt.addEventListener("change", function () {
          modal
            .querySelectorAll(".color-option")
            .forEach((el) => el.classList.remove("active"));
          this.parentElement.classList.add("active");
        });
        if (opt.checked) opt.parentElement.classList.add("active");
      });

      // Add to cart
      modal
        .querySelector(".add-to-cart-modal")
        .addEventListener("click", function () {
          const size =
            modal.querySelector('input[name="size"]:checked')?.value || "M";
          const color =
            modal.querySelector('input[name="color"]:checked')?.value ||
            "Classic";
          const qty = parseInt(modal.querySelector(".quantity-input").value);
          window.addToCart(product.id, qty, size, color);
          setTimeout(() => modal.remove(), 1000);
        });

      // Buy now
      modal
        .querySelector(".buy-now-modal")
        .addEventListener("click", function () {
          modal.querySelector(".add-to-cart-modal").click();
          setTimeout(() => {
            modal.remove();
            window.location.href = "cart.html";
          }, 500);
        });

      // Wishlist
      modal
        .querySelector(".wishlist-modal")
        .addEventListener("click", function () {
          const icon = this.querySelector("i");
          if (icon.classList.contains("far")) {
            icon.classList.remove("far");
            icon.classList.add("fas");
            icon.style.color = "#e94560";
            notificationSystem.show(`${product.name} added to wishlist!`);
          } else {
            icon.classList.remove("fas");
            icon.classList.add("far");
            icon.style.color = "";
            notificationSystem.show(
              `${product.name} removed from wishlist`,
              "info",
            );
          }
        });
    }

    filterProducts();
  }

  // ============================================================
  // 13. CART PAGE
  // ============================================================

  if (
    window.location.pathname.includes("cart.html") &&
    document.getElementById("cartItems")
  ) {
    const cm = window.cartManager;
    if (cm) {
      function updateCartUI() {
        const items = cm.getItems();
        const stats = cm.getStats();
        const container = document.getElementById("cartItems");
        const empty = document.getElementById("emptyCart");
        const content = document.getElementById("cartContent");

        if (items.length === 0) {
          empty.style.display = "block";
          content.style.display = "none";
          return;
        }
        empty.style.display = "none";
        content.style.display = "block";

        document.getElementById("itemCount").textContent = stats.itemCount;
        document.getElementById("summaryItemCount").textContent =
          stats.itemCount;
        document.getElementById("subtotal").textContent =
          `₹${stats.subtotal.toFixed(2)}`;
        document.getElementById("total").textContent =
          `₹${stats.total.toFixed(2)}`;

        container.innerHTML = items
          .map(
            (item, idx) => `
                    <div class="cart-item" data-index="${idx}">
                        <div class="cart-item-image"><img src="${item.image || "assets/placeholder.jpg"}" alt="${item.name}" onerror="this.src='assets/placeholder.jpg'"></div>
                        <div class="cart-item-details">
                            <div class="cart-item-category">${item.category || "Fashion"}</div>
                            <h3 class="cart-item-title">${item.name}</h3>
                            <div class="cart-item-variant">${item.size ? `<span class="variant-chip"><i class="fas fa-ruler"></i> ${item.size}</span>` : ""}${item.color ? `<span class="variant-chip"><i class="fas fa-palette"></i> ${item.color}</span>` : ""}</div>
                            <div class="cart-item-price">₹${(item.price || 0).toFixed(2)}</div>
                        </div>
                        <div class="cart-item-actions">
                            <div class="quantity-control">
                                <button class="quantity-btn minus-btn" onclick="window.updateQuantity(${idx}, ${(item.quantity || 1) - 1})" ${(item.quantity || 1) <= 1 ? "disabled" : ""}><i class="fas fa-minus"></i></button>
                                <input type="number" class="quantity-input" value="${item.quantity || 1}" min="1" max="99" onchange="window.updateQuantity(${idx}, this.value)" readonly>
                                <button class="quantity-btn plus-btn" onclick="window.updateQuantity(${idx}, ${(item.quantity || 1) + 1})" ${(item.quantity || 1) >= 99 ? "disabled" : ""}><i class="fas fa-plus"></i></button>
                            </div>
                            <div class="cart-item-subtotal">₹${(item.totalPrice || (item.price || 0) * (item.quantity || 1)).toFixed(2)}</div>
                            <button class="cart-item-remove" onclick="window.removeItem(${idx})"><i class="fas fa-trash"></i> Remove</button>
                        </div>
                    </div>
                `,
          )
          .join("");
      }

      cm.subscribe(updateCartUI);
      updateCartUI();
      cm.updateCartCount();

      // Checkout redirect
      document
        .getElementById("checkoutBtn")
        ?.addEventListener("click", function () {
          if (cm.getItemCount() === 0) {
            notificationSystem.show("Your cart is empty", "error");
            return;
          }
          window.location.href = "checkout.html";
        });

      document
        .getElementById("clearCartBtn")
        ?.addEventListener("click", function () {
          if (confirm("Clear your cart?")) {
            cm.clearCart();
            notificationSystem.show("Cart cleared", "info");
          }
        });
    }
  }

  // ============================================================
  // 14. GLOBAL UTILITY FUNCTIONS
  // ============================================================

  // Update quantity from cart page
  window.updateQuantity = function (index, quantity) {
    const item = window.cartManager.updateQuantity(index, quantity);
    if (item)
      notificationSystem.show(
        `Updated ${item.name} quantity to ${item.quantity}`,
        "success",
      );
  };

  // Remove item from cart
  window.removeItem = function (index) {
    const item = window.cartManager.removeItem(index);
    if (item) notificationSystem.show(`Removed ${item.name} from cart`, "info");
  };

  // Add to cart function (global)
  window.addToCart = function (
    productId,
    quantity = 1,
    size = "M",
    color = "Classic",
  ) {
    // Find product from productsData
    const allProducts = [
      {
        id: 1,
        name: "Classic White Shirt",
        price: 1299,
        image:
          "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
        category: "shirts",
      },
      {
        id: 2,
        name: "Denim Jacket",
        price: 2499,
        image:
          "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=400&fit=crop",
        category: "jackets",
      },
      {
        id: 3,
        name: "Cotton T-Shirt",
        price: 799,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        category: "tshirts",
      },
      {
        id: 4,
        name: "Kurta Set",
        price: 3999,
        image:
          "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
        category: "ethnic",
      },
      {
        id: 5,
        name: "Leather Belt",
        price: 899,
        image:
          "https://images.unsplash.com/photo-1664286074176-5206ee5dc878?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "accessories",
      },
      {
        id: 6,
        name: "Sneakers",
        price: 4999,
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        category: "footwear",
      },
      {
        id: 7,
        name: "Linen Shirt",
        price: 1899,
        image:
          "https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=400&h=400&fit=crop",
        category: "shirts",
      },
      {
        id: 8,
        name: "Bomber Jacket",
        price: 3999,
        image:
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop",
        category: "jackets",
      },
      {
        id: 9,
        name: "Sherwani",
        price: 7999,
        image:
          "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&h=400&fit=crop",
        category: "ethnic",
      },
      {
        id: 10,
        name: "Watch",
        price: 5999,
        image:
          "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
        category: "accessories",
      },
    ];
    const product = allProducts.find((p) => p.id === productId);
    if (!product) return;

    window.cartManager.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      size: size,
      color: color,
      quantity: quantity,
    });
    notificationSystem.show(`${product.name} added to cart!`);
  };

  // Image error handling
  window.addEventListener(
    "error",
    function (e) {
      if (e.target.tagName === "IMG") {
        e.target.style.opacity = "0.5";
        e.target.style.backgroundColor = "#f5f5f5";
      }
    },
    true,
  );

  console.log("✅ ClothBrand JavaScript loaded successfully!");
});
