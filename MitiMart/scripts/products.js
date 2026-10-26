// products.js - Complete product management with cart integration

document.addEventListener("DOMContentLoaded", function () {
  // Complete Product Data (Expanded from featured products)
  const products = [
    {
      id: 1,
      name: "Terracotta Vase",
      category: "pottery",
      material: "clay",
      price: 45,
      originalPrice: 89,
      description:
        "Handcrafted with care by local artisans, this beautiful terracotta vase brings natural elegance to your home.",
      badge: "new",
      featured: true,
      rating: 4.8,
      reviews: 1234,
      image: "assets/f-product1.jpg",
      sizes: ["Small", "Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Terracotta", hex: "#5D4037" },
      ],
      details: "Handcrafted with care by local artisans.",
    },
    {
      id: 2,
      name: "Handwoven Basket",
      category: "basketry",
      material: "wood",
      price: 32,
      originalPrice: 45,
      description: "Beautifully woven basket made from natural materials.",
      badge: "sale",
      featured: true,
      rating: 4.9,
      reviews: 856,
      image: "assets/f-product1.jpg",
      sizes: ["Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Brown", hex: "#5D4037" },
      ],
      details: "Handwoven by skilled artisans.",
    },
    {
      id: 3,
      name: "Organic Compost",
      category: "soil",
      material: "organic",
      price: 18,
      originalPrice: 25,
      description: "100% organic compost for your garden.",
      badge: "new",
      featured: true,
      rating: 4.7,
      reviews: 342,
      image: "assets/f-product3.jpg",
      sizes: ["5kg", "10kg", "20kg"],
      colors: [{ name: "Natural", hex: "#8B7355" }],
      details: "Rich organic compost.",
    },
    {
      id: 4,
      name: "Terracotta Vase",
      category: "pottery",
      material: "clay",
      price: 45,
      originalPrice: 89,
      description:
        "Handcrafted with care by local artisans, this beautiful terracotta vase brings natural elegance to your home.",
      badge: "new",
      featured: true,
      rating: 4.8,
      reviews: 1234,
      image: "assets/f-product1.jpg",
      sizes: ["Small", "Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Terracotta", hex: "#5D4037" },
      ],
      details: "Handcrafted with care by local artisans.",
    },
    {
      id: 5,
      name: "Handwoven Basket",
      category: "basketry",
      material: "wood",
      price: 32,
      originalPrice: 45,
      description: "Beautifully woven basket made from natural materials.",
      badge: "sale",
      featured: true,
      rating: 4.9,
      reviews: 856,
      image: "assets/f-product1.jpg",
      sizes: ["Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Brown", hex: "#5D4037" },
      ],
      details: "Handwoven by skilled artisans.",
    },
    {
      id: 6,
      name: "Organic Compost",
      category: "soil",
      material: "organic",
      price: 18,
      originalPrice: 25,
      description: "100% organic compost for your garden.",
      badge: "new",
      featured: true,
      rating: 4.7,
      reviews: 342,
      image: "assets/f-product3.jpg",
      sizes: ["5kg", "10kg", "20kg"],
      colors: [{ name: "Natural", hex: "#8B7355" }],
      details: "Rich organic compost.",
    },
    {
      id: 7,
      name: "Terracotta Vase",
      category: "pottery",
      material: "clay",
      price: 45,
      originalPrice: 89,
      description:
        "Handcrafted with care by local artisans, this beautiful terracotta vase brings natural elegance to your home.",
      badge: "new",
      featured: true,
      rating: 4.8,
      reviews: 1234,
      image: "assets/f-product1.jpg",
      sizes: ["Small", "Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Terracotta", hex: "#5D4037" },
      ],
      details: "Handcrafted with care by local artisans.",
    },
    {
      id: 8,
      name: "Handwoven Basket",
      category: "basketry",
      material: "wood",
      price: 32,
      originalPrice: 45,
      description: "Beautifully woven basket made from natural materials.",
      badge: "sale",
      featured: true,
      rating: 4.9,
      reviews: 856,
      image: "assets/f-product1.jpg",
      sizes: ["Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Brown", hex: "#5D4037" },
      ],
      details: "Handwoven by skilled artisans.",
    },
    {
      id: 9,
      name: "Organic Compost",
      category: "soil",
      material: "organic",
      price: 18,
      originalPrice: 25,
      description: "100% organic compost for your garden.",
      badge: "new",
      featured: true,
      rating: 4.7,
      reviews: 342,
      image: "assets/f-product3.jpg",
      sizes: ["5kg", "10kg", "20kg"],
      colors: [{ name: "Natural", hex: "#8B7355" }],
      details: "Rich organic compost.",
    },
    {
      id: 10,
      name: "Terracotta Vase",
      category: "pottery",
      material: "clay",
      price: 45,
      originalPrice: 89,
      description:
        "Handcrafted with care by local artisans, this beautiful terracotta vase brings natural elegance to your home.",
      badge: "new",
      featured: true,
      rating: 4.8,
      reviews: 1234,
      image: "assets/f-product1.jpg",
      sizes: ["Small", "Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Terracotta", hex: "#5D4037" },
      ],
      details: "Handcrafted with care by local artisans.",
    },
    {
      id: 11,
      name: "Handwoven Basket",
      category: "basketry",
      material: "wood",
      price: 32,
      originalPrice: 45,
      description: "Beautifully woven basket made from natural materials.",
      badge: "sale",
      featured: true,
      rating: 4.9,
      reviews: 856,
      image: "assets/f-product1.jpg",
      sizes: ["Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Brown", hex: "#5D4037" },
      ],
      details: "Handwoven by skilled artisans.",
    },
    {
      id: 12,
      name: "Organic Compost",
      category: "soil",
      material: "organic",
      price: 18,
      originalPrice: 25,
      description: "100% organic compost for your garden.",
      badge: "new",
      featured: true,
      rating: 4.7,
      reviews: 342,
      image: "assets/f-product3.jpg",
      sizes: ["5kg", "10kg", "20kg"],
      colors: [{ name: "Natural", hex: "#8B7355" }],
      details: "Rich organic compost.",
    },
    {
      id: 13,
      name: "Terracotta Vase",
      category: "pottery",
      material: "clay",
      price: 45,
      originalPrice: 89,
      description:
        "Handcrafted with care by local artisans, this beautiful terracotta vase brings natural elegance to your home.",
      badge: "new",
      featured: true,
      rating: 4.8,
      reviews: 1234,
      image: "assets/f-product1.jpg",
      sizes: ["Small", "Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Terracotta", hex: "#5D4037" },
      ],
      details: "Handcrafted with care by local artisans.",
    },
    {
      id: 14,
      name: "Handwoven Basket",
      category: "basketry",
      material: "wood",
      price: 32,
      originalPrice: 45,
      description: "Beautifully woven basket made from natural materials.",
      badge: "sale",
      featured: true,
      rating: 4.9,
      reviews: 856,
      image: "assets/f-product1.jpg",
      sizes: ["Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Brown", hex: "#5D4037" },
      ],
      details: "Handwoven by skilled artisans.",
    },
    {
      id: 15,
      name: "Organic Compost",
      category: "soil",
      material: "organic",
      price: 18,
      originalPrice: 25,
      description: "100% organic compost for your garden.",
      badge: "new",
      featured: true,
      rating: 4.7,
      reviews: 342,
      image: "assets/f-product3.jpg",
      sizes: ["5kg", "10kg", "20kg"],
      colors: [{ name: "Natural", hex: "#8B7355" }],
      details: "Rich organic compost.",
    },
    {
      id: 16,
      name: "Terracotta Vase",
      category: "pottery",
      material: "clay",
      price: 45,
      originalPrice: 89,
      description:
        "Handcrafted with care by local artisans, this beautiful terracotta vase brings natural elegance to your home.",
      badge: "new",
      featured: true,
      rating: 4.8,
      reviews: 1234,
      image: "assets/f-product1.jpg",
      sizes: ["Small", "Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Terracotta", hex: "#5D4037" },
      ],
      details: "Handcrafted with care by local artisans.",
    },
    {
      id: 17,
      name: "Handwoven Basket",
      category: "basketry",
      material: "wood",
      price: 32,
      originalPrice: 45,
      description: "Beautifully woven basket made from natural materials.",
      badge: "sale",
      featured: true,
      rating: 4.9,
      reviews: 856,
      image: "assets/f-product1.jpg",
      sizes: ["Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Brown", hex: "#5D4037" },
      ],
      details: "Handwoven by skilled artisans.",
    },
    {
      id: 18,
      name: "Organic Compost",
      category: "soil",
      material: "organic",
      price: 18,
      originalPrice: 25,
      description: "100% organic compost for your garden.",
      badge: "new",
      featured: true,
      rating: 4.7,
      reviews: 342,
      image: "assets/f-product3.jpg",
      sizes: ["5kg", "10kg", "20kg"],
      colors: [{ name: "Natural", hex: "#8B7355" }],
      details: "Rich organic compost.",
    },
    {
      id: 19,
      name: "Terracotta Vase",
      category: "pottery",
      material: "clay",
      price: 45,
      originalPrice: 89,
      description:
        "Handcrafted with care by local artisans, this beautiful terracotta vase brings natural elegance to your home.",
      badge: "new",
      featured: true,
      rating: 4.8,
      reviews: 1234,
      image: "assets/f-product1.jpg",
      sizes: ["Small", "Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Terracotta", hex: "#5D4037" },
      ],
      details: "Handcrafted with care by local artisans.",
    },
    {
      id: 20,
      name: "Handwoven Basket",
      category: "basketry",
      material: "wood",
      price: 32,
      originalPrice: 45,
      description: "Beautifully woven basket made from natural materials.",
      badge: "sale",
      featured: true,
      rating: 4.9,
      reviews: 856,
      image: "assets/f-product1.jpg",
      sizes: ["Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Brown", hex: "#5D4037" },
      ],
      details: "Handwoven by skilled artisans.",
    },
    {
      id: 21,
      name: "Organic Compost",
      category: "soil",
      material: "organic",
      price: 18,
      originalPrice: 25,
      description: "100% organic compost for your garden.",
      badge: "new",
      featured: true,
      rating: 4.7,
      reviews: 342,
      image: "assets/f-product3.jpg",
      sizes: ["5kg", "10kg", "20kg"],
      colors: [{ name: "Natural", hex: "#8B7355" }],
      details: "Rich organic compost.",
    },
    {
      id: 22,
      name: "Terracotta Vase",
      category: "pottery",
      material: "clay",
      price: 45,
      originalPrice: 89,
      description:
        "Handcrafted with care by local artisans, this beautiful terracotta vase brings natural elegance to your home.",
      badge: "new",
      featured: true,
      rating: 4.8,
      reviews: 1234,
      image: "assets/f-product1.jpg",
      sizes: ["Small", "Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Terracotta", hex: "#5D4037" },
      ],
      details: "Handcrafted with care by local artisans.",
    },
    {
      id: 23,
      name: "Handwoven Basket",
      category: "basketry",
      material: "wood",
      price: 32,
      originalPrice: 45,
      description: "Beautifully woven basket made from natural materials.",
      badge: "sale",
      featured: true,
      rating: 4.9,
      reviews: 856,
      image: "assets/f-product1.jpg",
      sizes: ["Medium", "Large"],
      colors: [
        { name: "Natural", hex: "#C19A6B" },
        { name: "Brown", hex: "#5D4037" },
      ],
      details: "Handwoven by skilled artisans.",
    },
    {
      id: 24,
      name: "Organic Compost",
      category: "soil",
      material: "organic",
      price: 18,
      originalPrice: 25,
      description: "100% organic compost for your garden.",
      badge: "new",
      featured: true,
      rating: 4.7,
      reviews: 342,
      image: "assets/f-product3.jpg",
      sizes: ["5kg", "10kg", "20kg"],
      colors: [{ name: "Natural", hex: "#8B7355" }],
      details: "Rich organic compost.",
    }
  ];

  // DOM Elements
  const productsGrid = document.querySelector(".products-grid-large");
  const productsCount = document.getElementById("productsCount");
  const filterToggle = document.getElementById("filterToggle");
  const filtersSidebar = document.getElementById("filtersSidebar");
  const sortSelect = document.getElementById("sortSelect");
  const categoryFilters = document.querySelectorAll(".category-filter");
  const materialFilters = document.querySelectorAll(".material-filter");
  const priceRange = document.getElementById("priceRange");
  const minPrice = document.getElementById("minPrice");
  const maxPrice = document.getElementById("maxPrice");
  const applyFiltersBtn = document.getElementById("applyFiltersBtn");
  const resetFiltersBtn = document.getElementById("resetFiltersBtn");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const pageNumbers = document.querySelector(".page-numbers");
  const mobileSearch = document.getElementById("mobileSearch");
  const mobileSearchBtn = document.getElementById("mobileSearchBtn");
  const closeFiltersBtn = document.getElementById("closeFiltersBtn");

  // State
  let filteredProducts = [...products];
  let currentSort = "featured";
  let currentPage = 1;
  let searchTerm = "";
  const productsPerPage = 12;

  // Initialize
  function init() {
    console.log("Initializing products page...");

    // Check if we're on the products page
    if (!productsGrid) {
      console.log("Not on products page, skipping initialization");
      return;
    }

    // Set initial filter states
    setInitialFilterStates();
    filterProducts();
    updateProductsCount();
    setupEventListeners();
    updatePriceDisplay();
    updateCartBadge();
  }

  // Set initial filter states
  function setInitialFilterStates() {
    // All categories should be checked by default
    if (categoryFilters.length > 0) {
      categoryFilters.forEach((checkbox) => {
        checkbox.checked = true;
      });
    }

    // No materials selected by default
    if (materialFilters.length > 0) {
      materialFilters.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }

    // Set price range to max
    if (priceRange) {
      priceRange.value = 200;
    }

    // Clear search inputs
    if (mobileSearch) mobileSearch.value = "";
    searchTerm = "";
  }

  // Check if user is logged in
  function isUserLoggedIn() {
    return (
      localStorage.getItem("mittimart_is_logged_in") === "true" ||
      sessionStorage.getItem("mittimart_is_logged_in") === "true"
    );
  }

  // Show login required warning
  function showLoginRequired(actionType) {
    const message =
      actionType === "cart"
        ? "Please sign in to add items to your cart"
        : "Please sign in to use the wishlist";

    showNotification(message, "warning");

    setTimeout(() => {
      const loginConfirmed = confirm(
        "You need to sign in to continue. Do you want to go to the login page?"
      );
      if (loginConfirmed) {
        window.location.href = "login.html";
      }
    }, 1500);
  }

  // Cart Functions
  function getCart() {
    try {
      if (window.cartManager) {
        return window.cartManager.getItems();
      }
      return JSON.parse(localStorage.getItem("mittimart-cart")) || [];
    } catch (e) {
      console.error("Error reading cart:", e);
      return [];
    }
  }

  function saveCart(cartItems) {
    try {
      if (window.cartManager) {
        cartItems.forEach((item) => {
          window.cartManager.addItem(item);
        });
      } else {
        localStorage.setItem("mittimart-cart", JSON.stringify(cartItems));
      }
      updateCartBadge();
    } catch (e) {
      console.error("Error saving cart:", e);
    }
  }

  function updateCartBadge() {
    const cartCountElements = document.querySelectorAll(".cart-count");
    if (cartCountElements.length > 0) {
      let totalItems = 0;

      if (window.cartManager) {
        totalItems = window.cartManager.getItemCount();
      } else {
        const cartItems = getCart();
        totalItems = cartItems.reduce(
          (total, item) => total + (parseInt(item.quantity) || 1),
          0
        );
      }

      cartCountElements.forEach((element) => {
        element.textContent = totalItems;
        element.style.display = totalItems > 0 ? "flex" : "none";
      });
    }
  }

  // Add to Cart Function
  window.addToCart = function (
    productId,
    quantity = 1,
    size = null,
    color = null
  ) {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      console.error("Product not found:", productId);
      return;
    }

    // For demo purposes, we'll allow cart without login
    // if (!isUserLoggedIn()) {
    //     showLoginRequired('cart');
    //     return;
    // }

    // Use global cart manager if available
    if (window.cartManager) {
      window.cartManager.addItem({
        id: product.id,
        name: product.name,
        category: formatCategory(product.category),
        price: product.price,
        quantity: quantity,
        image: product.image,
        material: product.material,
        size: size,
        color: color,
      });
    } else {
      // Fallback to localStorage
      let cartItems = getCart();
      const existingItemIndex = cartItems.findIndex(
        (item) =>
          item.id === productId && item.size === size && item.color === color
      );

      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += quantity;
        cartItems[existingItemIndex].totalPrice =
          cartItems[existingItemIndex].price *
          cartItems[existingItemIndex].quantity;
      } else {
        cartItems.push({
          id: product.id,
          name: product.name,
          category: formatCategory(product.category),
          price: product.price,
          quantity: quantity,
          totalPrice: product.price * quantity,
          image: product.image,
          material: product.material,
          size: size,
          color: color,
        });
      }

      saveCart(cartItems);
    }

    // Show notification
    let notificationMessage = `${product.name} added to cart!`;
    if (size) notificationMessage += ` (${size})`;
    if (color) notificationMessage += ` (${color})`;
    showNotification(notificationMessage);

    // Update button state
    const button = document.querySelector(
      `.add-to-cart-large[data-product="${productId}"]`
    );
    if (button) {
      button.classList.add("in-cart");
      button.textContent = "In Cart ✓";
      button.disabled = true;

      // Revert after 2 seconds
      setTimeout(() => {
        button.classList.remove("in-cart");
        button.textContent = "Add to Cart";
        button.disabled = false;
      }, 2000);
    }
  };

  // Render products to grid
  function renderProducts() {
    console.log("Rendering products...", filteredProducts.length);

    if (!productsGrid) return;

    // Clear grid
    productsGrid.innerHTML = "";

    // Calculate pagination
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    console.log("Showing products:", productsToShow.length);

    if (productsToShow.length === 0) {
      let message = "No products found";
      let description = "Try adjusting your filters to see more products.";

      if (searchTerm) {
        message = `No products found for "${searchTerm}"`;
        description = "Try a different search term or adjust your filters.";
      }

      productsGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>${message}</h3>
                    <p>${description}</p>
                    <button class="btn reset-filters-btn">Reset All Filters</button>
                </div>
            `;

      // Add event listener to reset button
      const resetBtn = productsGrid.querySelector(".reset-filters-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          resetFilters();
        });
      }
    } else {
      // Create product cards
      productsToShow.forEach((product) => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
      });
    }

    updatePagination();
  }

  // Create individual product card
  function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card-large";
    card.dataset.id = product.id;

    const badge = product.badge
      ? `<div class="product-badge ${product.badge}">${
          product.badge === "new" ? "New" : "Sale"
        }</div>`
      : "";

    const originalPrice = product.originalPrice
      ? `<span class="original-price">$${product.originalPrice.toFixed(
          2
        )}</span>`
      : "";

    // Check if product is in cart
    const cartItems = getCart();
    const isInCart = cartItems.find((item) => item.id === product.id);
    const buttonText = isInCart ? "In Cart ✓" : "Add to Cart";
    const buttonClass = isInCart ? "in-cart" : "";
    const buttonDisabled = isInCart ? "disabled" : "";

    // Truncate description for card view
    const shortDescription =
      product.description.length > 100
        ? product.description.substring(0, 100) + "..."
        : product.description;

    card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${
      product.name
    }" loading="lazy" onerror="this.src='assets/placeholder.jpg'">
                ${badge}
                <div class="product-actions">
                    <button class="product-action-btn quick-view-btn" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="product-action-btn wishlist-btn" title="Add to Wishlist">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info-large">
                <span class="product-category">${formatCategory(
                  product.category
                )}</span>
                <h4>${product.name}</h4>
                <p class="product-description">${shortDescription}</p>
                <div class="product-price-large">
                    <span class="current-price">$${product.price.toFixed(
                      2
                    )}</span>
                    ${originalPrice}
                </div>
                <button class="add-to-cart-large ${buttonClass}" data-product="${
      product.id
    }" ${buttonDisabled}>
                    ${buttonText}
                </button>
            </div>
        `;

    return card;
  }

  // Format category for display
  function formatCategory(category) {
    const categoryMap = {
      pottery: "Pottery & Ceramics",
      basketry: "Basketry",
      soil: "Soil Products",
      textiles: "Textiles & Fabric",
      home: "Home Decor",
      personal: "Personal Care",
    };
    return (
      categoryMap[category] ||
      category.charAt(0).toUpperCase() + category.slice(1)
    );
  }

  // Generate star rating HTML
  function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = "";

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsHTML += '<i class="fas fa-star"></i>';
      } else if (i === fullStars + 1 && hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
      } else {
        starsHTML += '<i class="far fa-star"></i>';
      }
    }

    return `<div class="stars">${starsHTML}</div>`;
  }

  // Update products count display
  function updateProductsCount() {
    if (!productsCount) return;
    const start =
      filteredProducts.length > 0 ? (currentPage - 1) * productsPerPage + 1 : 0;
    const end = Math.min(
      currentPage * productsPerPage,
      filteredProducts.length
    );
    const total = filteredProducts.length;
    const searchText = searchTerm ? ` for "${searchTerm}"` : "";
    productsCount.textContent =
      filteredProducts.length > 0
        ? `Showing ${start}-${end} of ${total} products${searchText}`
        : `No products found${searchText}`;
  }

  // Update pagination
  function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // Update page numbers
    if (pageNumbers) {
      pageNumbers.innerHTML = "";

      if (totalPages === 0) {
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        return;
      }

      // Show max 5 pages
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + 4);

      if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
      }

      for (let i = startPage; i <= endPage; i++) {
        const pageNumber = document.createElement("span");
        pageNumber.className = `page-number ${
          i === currentPage ? "active" : ""
        }`;
        pageNumber.textContent = i;
        pageNumber.addEventListener("click", () => {
          currentPage = i;
          renderProducts();
          updateProductsCount();
          scrollToProductsGrid();
        });
        pageNumbers.appendChild(pageNumber);
      }
    }

    // Update button states
    if (prevBtn) {
      prevBtn.disabled = currentPage === 1;
    }

    if (nextBtn) {
      nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    }
  }

  // Scroll to products grid
  function scrollToProductsGrid() {
    if (productsGrid) {
      window.scrollTo({
        top: productsGrid.offsetTop - 100,
        behavior: "smooth",
      });
    }
  }

  // Search products
  function searchProducts(term) {
    searchTerm = term.toLowerCase().trim();
    console.log("Searching for:", searchTerm);

    filterProducts();
  }

  // Filter products based on selected filters
  function filterProducts() {
    console.log("Filtering products...");

    const selectedCategories = Array.from(categoryFilters)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    const selectedMaterials = Array.from(materialFilters)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    const maxPriceValue = parseInt(priceRange.value);

    console.log("Selected categories:", selectedCategories);
    console.log("Selected materials:", selectedMaterials);
    console.log("Max price:", maxPriceValue);
    console.log("Search term:", searchTerm);

    // Start with all products and filter step by step
    filteredProducts = products.filter((product) => {
      // Search term check
      if (searchTerm) {
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm) ||
          product.material.toLowerCase().includes(searchTerm) ||
          formatCategory(product.category).toLowerCase().includes(searchTerm);

        if (!matchesSearch) return false;
      }

      // 1. CATEGORY FILTER
      if (selectedCategories.length > 0) {
        const categoryMatch = selectedCategories.includes(product.category);
        if (!categoryMatch) {
          return false;
        }
      }

      // 2. MATERIAL FILTER
      if (selectedMaterials.length > 0) {
        let materialMatch = false;

        // Check each selected material
        for (const selectedMat of selectedMaterials) {
          // Handle material mappings
          const materialMappings = {
            clay: ["clay", "terracotta", "ceramic"],
            wood: ["wood", "bamboo", "cane", "rattan", "jute"],
            organic: ["organic", "herbal", "natural"],
            cotton: ["cotton", "silk", "wool", "fabric"],
            stone: ["stone", "brass", "metal"],
          };

          const validMaterials = materialMappings[selectedMat] || [selectedMat];

          // Check if product's material matches any in the valid materials list
          if (validMaterials.includes(product.material)) {
            materialMatch = true;
            break;
          }
        }

        // If no material matches, filter out this product
        if (!materialMatch) {
          return false;
        }
      }

      // 3. PRICE FILTER
      if (product.price > maxPriceValue) {
        return false;
      }

      return true;
    });

    console.log("Filtered products count:", filteredProducts.length);

    // Sort products
    sortProducts();

    // Reset to first page
    currentPage = 1;

    // Re-render
    renderProducts();
    updateProductsCount();
  }

  // Sort products based on selected sort option
  function sortProducts() {
    switch (currentSort) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // Simulating newest by ID (higher ID = newer)
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
      case "popular":
        // Simulating popularity by rating
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        // Featured products first, then by rating
        filteredProducts.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }
  }

  // Update price display
  function updatePriceDisplay() {
    if (minPrice && maxPrice && priceRange) {
      maxPrice.textContent = `$${priceRange.value}`;
    }
  }

  // Reset all filters
  function resetFilters() {
    console.log("Resetting filters...");

    // Reset checkboxes
    categoryFilters.forEach((checkbox) => (checkbox.checked = true));
    materialFilters.forEach((checkbox) => (checkbox.checked = false));

    // Reset price range
    if (priceRange) {
      priceRange.value = 200;
      updatePriceDisplay();
    }

    // Reset sort
    if (sortSelect) {
      sortSelect.value = "featured";
      currentSort = "featured";
    }

    // Reset search
    searchTerm = "";
    if (mobileSearch) mobileSearch.value = "";

    // Close mobile filter sidebar
    if (filtersSidebar) {
      filtersSidebar.classList.remove("active");
      document.body.classList.remove("filter-open");
    }

    // Apply reset
    filterProducts();
  }

  // Setup event listeners
  function setupEventListeners() {
    console.log("Setting up event listeners...");

    // Filter toggle for mobile
    if (filterToggle && filtersSidebar) {
      filterToggle.addEventListener("click", (e) => {
        console.log("Toggle filter sidebar");
        filtersSidebar.classList.add("active");
        document.body.classList.add("filter-open");
        e.stopPropagation();
      });
    }

    // Close filters button
    if (closeFiltersBtn) {
      closeFiltersBtn.addEventListener("click", () => {
        filtersSidebar.classList.remove("active");
        document.body.classList.remove("filter-open");
      });
    }

    // Close filters when clicking outside on mobile
    document.addEventListener("click", (e) => {
      if (
        filtersSidebar &&
        filtersSidebar.classList.contains("active") &&
        window.innerWidth <= 992 &&
        !filtersSidebar.contains(e.target) &&
        e.target !== filterToggle &&
        !filterToggle?.contains(e.target)
      ) {
        console.log("Closing sidebar - clicked outside");
        filtersSidebar.classList.remove("active");
        document.body.classList.remove("filter-open");
      }
    });

    // Sort select
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        console.log("Sort changed:", e.target.value);
        currentSort = e.target.value;
        sortProducts();
        currentPage = 1;
        renderProducts();
        updateProductsCount();
      });
    }

    // Price range
    if (priceRange) {
      priceRange.addEventListener("input", () => {
        updatePriceDisplay();
      });

      // Also filter when slider is released
      priceRange.addEventListener("change", () => {
        filterProducts();
      });
    }

    // Apply filters button
    if (applyFiltersBtn) {
      applyFiltersBtn.addEventListener("click", (e) => {
        console.log("Apply filters clicked");
        filterProducts();

        // Close mobile filter sidebar
        if (window.innerWidth <= 992 && filtersSidebar) {
          filtersSidebar.classList.remove("active");
          document.body.classList.remove("filter-open");
        }
        e.stopPropagation();
      });
    }

    // Reset filters button
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener("click", (e) => {
        resetFilters();
        e.stopPropagation();
      });
    }

    // Previous button
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderProducts();
          updateProductsCount();
          scrollToProductsGrid();
        }
      });
    }

    // Next button
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        if (currentPage < totalPages) {
          currentPage++;
          renderProducts();
          updateProductsCount();
          scrollToProductsGrid();
        }
      });
    }

    // Mobile search
    if (mobileSearch && mobileSearchBtn) {
      const performMobileSearch = () => {
        searchProducts(mobileSearch.value);
      };

      mobileSearchBtn.addEventListener("click", performMobileSearch);
      mobileSearch.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          performMobileSearch();
        }
      });

      // Clear search when input is cleared
      mobileSearch.addEventListener("input", (e) => {
        if (e.target.value === "") {
          searchTerm = "";
          filterProducts();
        }
      });
    }

    // Category and material filters - Add change listeners for auto-filter
    if (categoryFilters.length > 0) {
      categoryFilters.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          console.log("Category filter changed");
          filterProducts();
        });
      });
    }

    if (materialFilters.length > 0) {
      materialFilters.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          console.log("Material filter changed");
          filterProducts();
        });
      });
    }

    // Delegate events for dynamically added elements
    document.addEventListener("click", (e) => {
      // Quick view button
      if (e.target.closest(".quick-view-btn")) {
        const productCard = e.target.closest(".product-card-large");
        if (productCard) {
          const productId = parseInt(productCard.dataset.id);
          showQuickView(productId);
        }
        e.stopPropagation();
      }

      // Add to cart button
      if (e.target.closest(".add-to-cart-large")) {
        const button = e.target.closest(".add-to-cart-large");
        if (!button.disabled) {
          const productId = parseInt(button.dataset.product);
          window.addToCart(productId);
        }
        e.stopPropagation();
      }

      // Wishlist button
      if (e.target.closest(".wishlist-btn")) {
        const button = e.target.closest(".wishlist-btn");
        const productCard = button.closest(".product-card-large");
        const productId = productCard ? parseInt(productCard.dataset.id) : null;
        if (productId) {
          toggleWishlist(productId, button);
        }
        e.stopPropagation();
      }
    });

    // Close filter sidebar with escape key
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        filtersSidebar &&
        filtersSidebar.classList.contains("active")
      ) {
        filtersSidebar.classList.remove("active");
        document.body.classList.remove("filter-open");
      }
    });

    // Handle window resize
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (
          window.innerWidth > 992 &&
          filtersSidebar &&
          filtersSidebar.classList.contains("active")
        ) {
          filtersSidebar.classList.remove("active");
          document.body.classList.remove("filter-open");
        }
      }, 250);
    });
  }

  // Show quick view modal
  function showQuickView(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const stars = getStarRating(product.rating);
    const originalPriceHTML = product.originalPrice
      ? `<span class="original-price">$${product.originalPrice.toFixed(
          2
        )}</span>`
      : "";

    // Generate size options HTML
    const sizeOptionsHTML =
      product.sizes && product.sizes.length > 0
        ? `
            <div class="product-option-group">
                <h4>Select Size:</h4>
                <div class="size-options">
                    ${product.sizes
                      .map(
                        (size, index) => `
                        <label class="size-option">
                            <input type="radio" name="size" value="${size}" ${
                          index === 0 ? "checked" : ""
                        }>
                            <span class="size-label">${size}</span>
                        </label>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `
        : "";

    // Generate color options HTML
    const colorOptionsHTML =
      product.colors && product.colors.length > 0
        ? `
            <div class="product-option-group">
                <h4>Select Color:</h4>
                <div class="color-options">
                    ${product.colors
                      .map(
                        (color, index) => `
                        <label class="color-option">
                            <input type="radio" name="color" value="${
                              color.name
                            }" ${index === 0 ? "checked" : ""}>
                            <span class="color-dot" style="background-color: ${
                              color.hex
                            }"></span>
                            <span class="color-label">${color.name}</span>
                        </label>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `
        : "";

    // Create modal HTML
    const modalHTML = `
            <div class="quick-view-content">
                <button class="quick-view-close-btn" aria-label="Close quick view">
                    <i class="fas fa-times"></i>
                </button>
                <div class="quick-view-image">
                    <img src="${product.image}" alt="${
      product.name
    }" onerror="this.src='assets/placeholder.jpg'">
                </div>
                <div class="quick-view-details">
                    <span class="product-category">${formatCategory(
                      product.category
                    )}</span>
                    <h3>${product.name}</h3>
                    
                    <div class="product-rating">
                        ${stars}
                        <span class="rating-count">${product.rating} | ${
      product.reviews
    } reviews</span>
                    </div>
                    
                    <div class="product-price-large">
                        <span class="current-price">$${product.price.toFixed(
                          2
                        )}</span>
                        ${originalPriceHTML}
                    </div>
                    
                    <p class="product-description">${
                      product.details || product.description
                    }</p>
                    
                    ${sizeOptionsHTML}
                    ${colorOptionsHTML}
                    
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
                    
                    <div class="product-actions">
                        <button class="btn btn-primary add-to-cart-modal" 
                                data-product="${product.id}">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <button class="btn btn-secondary buy-now-btn">
                            <i class="fas fa-bolt"></i> Buy Now
                        </button>
                        <button class="btn btn-outline wishlist-modal-btn">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;

    // Create and show modal
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.innerHTML = modalHTML;

    document.body.appendChild(modal);

    // Setup quick view event listeners
    setupQuickViewEvents(modal, product);

    // Close modal when clicking outside or with escape key
    function closeModal() {
      if (modal.parentNode) {
        document.body.removeChild(modal);
      }
      document.removeEventListener("keydown", handleEscape);
    }

    function handleEscape(e) {
      if (e.key === "Escape") {
        closeModal();
      }
    }

    // Close when clicking on overlay
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", handleEscape);
  }

  // Setup quick view event listeners
  function setupQuickViewEvents(modal, product) {
    // Close button
    const closeBtn = modal.querySelector(".quick-view-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.remove();
      });
    }

    // Quantity selector
    const quantityInput = modal.querySelector(".quantity-input");
    const minusBtn = modal.querySelector(".minus-btn");
    const plusBtn = modal.querySelector(".plus-btn");

    if (minusBtn && plusBtn && quantityInput) {
      minusBtn.addEventListener("click", () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
          quantityInput.value = currentValue - 1;
        }
      });

      plusBtn.addEventListener("click", () => {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 99) {
          quantityInput.value = currentValue + 1;
        }
      });
    }

    // Size selection
    const sizeOptions = modal.querySelectorAll(".size-option input");
    sizeOptions.forEach((option) => {
      option.addEventListener("change", function () {
        // Remove active class from all size options
        modal.querySelectorAll(".size-option").forEach((el) => {
          el.classList.remove("active");
        });
        // Add active class to selected option
        this.parentElement.classList.add("active");
      });
      // Set initial active state
      if (option.checked) option.parentElement.classList.add("active");
    });

    // Color selection
    const colorOptions = modal.querySelectorAll(".color-option input");
    colorOptions.forEach((option) => {
      option.addEventListener("change", function () {
        // Remove active class from all color options
        modal.querySelectorAll(".color-option").forEach((el) => {
          el.classList.remove("active");
        });
        // Add active class to selected option
        this.parentElement.classList.add("active");
      });
      // Set initial active state
      if (option.checked) option.parentElement.classList.add("active");
    });

    // Add to cart button
    const addToCartBtn = modal.querySelector(".add-to-cart-modal");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", function () {
        const productId = product.id;
        const quantity = parseInt(modal.querySelector(".quantity-input").value);
        const selectedSize =
          modal.querySelector('input[name="size"]:checked')?.value || null;
        const selectedColor =
          modal.querySelector('input[name="color"]:checked')?.value || null;

        window.addToCart(productId, quantity, selectedSize, selectedColor);

        // Close modal after a delay
        setTimeout(() => {
          modal.remove();
        }, 1000);
      });
    }

    // Buy now button
    const buyNowBtn = modal.querySelector(".buy-now-btn");
    if (buyNowBtn) {
      buyNowBtn.addEventListener("click", function () {
        const productId = product.id;
        const quantity = parseInt(modal.querySelector(".quantity-input").value);
        const selectedSize =
          modal.querySelector('input[name="size"]:checked')?.value || null;
        const selectedColor =
          modal.querySelector('input[name="color"]:checked')?.value || null;

        // Add to cart first
        window.addToCart(productId, quantity, selectedSize, selectedColor);

        // Close modal and redirect to cart page
        setTimeout(() => {
          modal.remove();
          window.location.href = "cart.html";
        }, 500);
      });
    }

    // Wishlist button
    const wishlistBtn = modal.querySelector(".wishlist-modal-btn");
    if (wishlistBtn) {
      wishlistBtn.addEventListener("click", function () {
        const icon = this.querySelector("i");
        if (icon.classList.contains("far")) {
          icon.classList.remove("far");
          icon.classList.add("fas");
          icon.style.color = "#FF6B6B";
          showNotification(`${product.name} added to wishlist!`);
        } else {
          icon.classList.remove("fas");
          icon.classList.add("far");
          icon.style.color = "";
          showNotification(`${product.name} removed from wishlist`);
        }
      });
    }
  }

  // Toggle wishlist
  function toggleWishlist(productId, button) {
    const icon = button.querySelector("i");
    const product = products.find((p) => p.id === productId);

    if (!product) return;

    if (icon.classList.contains("far")) {
      icon.classList.remove("far");
      icon.classList.add("fas");
      icon.style.color = "#FF6B6B";
      showNotification(`${product.name} added to wishlist!`);
    } else {
      icon.classList.remove("fas");
      icon.classList.add("far");
      icon.style.color = "";
      showNotification(`${product.name} removed from wishlist`);
    }
  }

  // Show notification
  function showNotification(message, type = "success") {
    // Remove existing notification
    const existingNotification = document.querySelector(
      ".product-notification"
    );
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = "product-notification";

    // Set icon based on type
    let icon = "fa-check-circle";
    if (type === "warning") {
      icon = "fa-exclamation-triangle";
    } else if (type === "error") {
      icon = "fa-exclamation-circle";
    } else if (type === "info") {
      icon = "fa-info-circle";
    }

    notification.innerHTML = `<i class="fas ${icon}"></i> ${message}`;

    // Add type class for styling
    if (type !== "success") {
      notification.classList.add(type);
    }

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }

  // Initialize the page
  init();
});
