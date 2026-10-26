// blogs.js - Complete blog management system

document.addEventListener("DOMContentLoaded", function () {
  // Blog Data
  const blogs = [
    {
      id: 1,
      title: "The Art of Traditional Pottery",
      category: "craftsmanship",
      excerpt:
        "Discover the ancient techniques that bring life to clay and create timeless pieces",
      date: "March 15, 2025",
      readTime: "8 min",
      image: "assets/floating-img-1.webp",
      featured: false,
      content: `
                <h2>The Art of Slow Crafting: Why Handmade Matters</h2>
                <p>In a world dominated by mass production and fast consumption, the art of slow crafting stands as a testament to patience, skill, and sustainability. Handcrafted items carry not just utility but stories - stories of the hands that shaped them, the traditions they represent, and the communities they support.</p>
                
                <h3>The Human Touch</h3>
                <p>Each handcrafted piece is unique, bearing the subtle imperfections that reveal its human origins. Unlike machine-made products that are identical in every batch, handmade items carry the signature of their creator - the pressure of fingers on clay, the rhythm of a weaver's hands, the careful strokes of a brush.</p>
                
                <p>This human touch creates a connection between maker and user that mass-produced items can never replicate. When you hold a hand-thrown pottery mug, you're not just holding a drinking vessel; you're connecting with hours of practice, generations of knowledge, and an individual's creative expression.</p>
                
                <h3>Sustainable by Design</h3>
                <p>Slow crafting is inherently sustainable. Artisans typically use locally sourced, natural materials that have minimal environmental impact. The production process generates little waste, and the items themselves are often biodegradable or easily repairable.</p>
                
                <p>Moreover, the longevity of well-crafted handmade items means they don't end up in landfills after a season of use. A quality handwoven basket can serve multiple generations, becoming more beautiful with age as the fibers develop a patina of use.</p>
                
                <h3>Preserving Cultural Heritage</h3>
                <p>Traditional crafts are more than just products - they're living history. Each technique, pattern, and material choice represents centuries of cultural evolution. By supporting handmade crafts, we help preserve these traditions for future generations.</p>
                
                <p>In India alone, there are over 3,000 distinct craft forms, each with its own regional significance. From the intricate embroidery of Kutch to the terracotta pottery of West Bengal, these crafts tell the story of our diverse cultural landscape.</p>
                
                <h3>Economic Empowerment</h3>
                <p>When you purchase handmade, you're not just buying a product - you're supporting an artisan's livelihood, their family, and often their entire community. Fair trade practices ensure that artisans receive fair compensation for their skill and time.</p>
                
                <p>This economic empowerment has far-reaching effects, helping to preserve rural economies, prevent migration to cities, and maintain cultural traditions in their place of origin.</p>
            `,
    },
    {
      id: 2,
      title: "Sustainable Soil Practices",
      category: "sustainability",
      excerpt:
        "How organic compost transforms gardens and nurtures our planet's future",
      date: "March 12, 2025",
      readTime: "8 min",
      image: "assets/f-product3.jpg",
      featured: false,
      content: `
                <h2>Sustainable Soil Practices: Nurturing Earth for Future Generations</h2>
                <p>Soil is not just dirt; it's a living, breathing ecosystem that sustains all life on Earth. Sustainable soil practices are essential for maintaining healthy ecosystems, producing nutritious food, and combating climate change.</p>
                
                <h3>The Living Soil Ecosystem</h3>
                <p>Healthy soil is teeming with life - from microscopic bacteria and fungi to earthworms and insects. This biodiversity is crucial for soil fertility, water retention, and carbon sequestration.</p>
                
                <p>Traditional agricultural practices often destroy this delicate ecosystem through excessive tilling, chemical fertilizers, and pesticides. Sustainable practices focus on nurturing soil life rather than fighting it.</p>
                
                <h3>Composting: Black Gold for Your Garden</h3>
                <p>Composting transforms kitchen scraps and yard waste into nutrient-rich humus that improves soil structure, increases moisture retention, and provides slow-release nutrients for plants.</p>
                
                <p>A well-maintained compost pile should have a balance of green materials (nitrogen-rich) and brown materials (carbon-rich). Green materials include vegetable scraps, coffee grounds, and fresh grass clippings. Brown materials include dried leaves, straw, and shredded paper.</p>
                
                <h3>Cover Cropping and Crop Rotation</h3>
                <p>Cover crops, also known as green manure, are plants grown specifically to improve soil health. They prevent erosion, suppress weeds, add organic matter, and fix nitrogen in the soil.</p>
                
                <p>Crop rotation involves growing different types of plants in the same area over successive seasons. This practice breaks pest and disease cycles, improves soil structure, and enhances nutrient availability.</p>
                
                <h3>No-Till Farming</h3>
                <p>No-till or minimum-till farming reduces soil disturbance, preserving soil structure and preventing erosion. This practice also helps retain moisture and sequester carbon in the soil.</p>
                
                <p>By minimizing mechanical disturbance, no-till farming protects the complex network of fungal mycelium and soil organisms that create healthy, fertile soil.</p>
            `,
    },
    {
      id: 3,
      title: "Weaving Tradition",
      category: "heritage",
      excerpt:
        "Ancient weaving methods passed down through generations of skilled artisans",
      date: "March 10, 2025",
      readTime: "8 min",
      image: "assets/f-product2.jpg",
      featured: false,
      content: `
                <h2>Weaving Tradition: Threads That Connect Generations</h2>
                <p>Weaving is one of humanity's oldest crafts, with evidence dating back over 27,000 years. Each woven piece carries the history, culture, and identity of the people who created it.</p>
                
                <h3>The Loom: Ancient Technology</h3>
                <p>The loom is a remarkable piece of technology that has evolved over millennia. From the simple backstrap loom to the complex Jacquard loom, each type represents a different cultural approach to creating fabric.</p>
                
                <p>Traditional looms are often made from locally available materials - bamboo, wood, or even parts of plants. The construction of the loom itself reflects the environment and resources of the weaver's community.</p>
                
                <h3>Natural Dyes: Colors from Nature</h3>
                <p>Before synthetic dyes, weavers used plants, minerals, and insects to create vibrant colors. Each region developed its own palette based on available resources.</p>
                
                <ul>
                    <li><strong>Indigo:</strong> From the indigo plant, creates deep blues</li>
                    <li><strong>Madder:</strong> Root produces reds and oranges</li>
                    <li><strong>Turmeric:</strong> Rhizome gives bright yellows</li>
                    <li><strong>Pomegranate:</strong> Skin creates golden yellows</li>
                    <li><strong>Cochineal:</strong> Insects produce crimson reds</li>
                </ul>
                
                <h3>Regional Weaving Traditions</h3>
                <p>India is home to countless distinct weaving traditions:</p>
                
                <h4>Banarasi Silk</h4>
                <p>From Varanasi, known for intricate gold and silver brocade work. Traditionally used for wedding saris, these textiles can take months or even years to complete.</p>
                
                <h4>Kanchipuram Silk</h4>
                <p>From Tamil Nadu, characterized by heavy silk fabric with contrasting borders. The zari (gold thread) work is particularly famous.</p>
                
                <h4>Pashmina</h4>
                <p>From Kashmir, made from the fine undercoat of Himalayan goats. Pashmina shawls are so fine they can pass through a ring.</p>
                
                <h3>Preserving the Craft</h3>
                <p>Today, many traditional weaving communities face challenges from industrialization and changing markets. However, renewed interest in sustainable fashion and cultural heritage is helping to preserve these ancient skills.</p>
                
                <p>By choosing handwoven textiles, we support artisan communities and help keep these traditions alive for future generations.</p>
            `,
    },
        {
      id: 4,
      title: "The Art of Traditional Pottery",
      category: "craftsmanship",
      excerpt:
        "Discover the ancient techniques that bring life to clay and create timeless pieces",
      date: "March 15, 2025",
      readTime: "8 min",
      image: "assets/floating-img-1.webp",
      featured: false,
      content: `
                <h2>The Art of Slow Crafting: Why Handmade Matters</h2>
                <p>In a world dominated by mass production and fast consumption, the art of slow crafting stands as a testament to patience, skill, and sustainability. Handcrafted items carry not just utility but stories - stories of the hands that shaped them, the traditions they represent, and the communities they support.</p>
                
                <h3>The Human Touch</h3>
                <p>Each handcrafted piece is unique, bearing the subtle imperfections that reveal its human origins. Unlike machine-made products that are identical in every batch, handmade items carry the signature of their creator - the pressure of fingers on clay, the rhythm of a weaver's hands, the careful strokes of a brush.</p>
                
                <p>This human touch creates a connection between maker and user that mass-produced items can never replicate. When you hold a hand-thrown pottery mug, you're not just holding a drinking vessel; you're connecting with hours of practice, generations of knowledge, and an individual's creative expression.</p>
                
                <h3>Sustainable by Design</h3>
                <p>Slow crafting is inherently sustainable. Artisans typically use locally sourced, natural materials that have minimal environmental impact. The production process generates little waste, and the items themselves are often biodegradable or easily repairable.</p>
                
                <p>Moreover, the longevity of well-crafted handmade items means they don't end up in landfills after a season of use. A quality handwoven basket can serve multiple generations, becoming more beautiful with age as the fibers develop a patina of use.</p>
                
                <h3>Preserving Cultural Heritage</h3>
                <p>Traditional crafts are more than just products - they're living history. Each technique, pattern, and material choice represents centuries of cultural evolution. By supporting handmade crafts, we help preserve these traditions for future generations.</p>
                
                <p>In India alone, there are over 3,000 distinct craft forms, each with its own regional significance. From the intricate embroidery of Kutch to the terracotta pottery of West Bengal, these crafts tell the story of our diverse cultural landscape.</p>
                
                <h3>Economic Empowerment</h3>
                <p>When you purchase handmade, you're not just buying a product - you're supporting an artisan's livelihood, their family, and often their entire community. Fair trade practices ensure that artisans receive fair compensation for their skill and time.</p>
                
                <p>This economic empowerment has far-reaching effects, helping to preserve rural economies, prevent migration to cities, and maintain cultural traditions in their place of origin.</p>
            `,
    },
    {
      id: 5,
      title: "Sustainable Soil Practices",
      category: "sustainability",
      excerpt:
        "How organic compost transforms gardens and nurtures our planet's future",
      date: "March 12, 2025",
      readTime: "8 min",
      image: "assets/f-product3.jpg",
      featured: false,
      content: `
                <h2>Sustainable Soil Practices: Nurturing Earth for Future Generations</h2>
                <p>Soil is not just dirt; it's a living, breathing ecosystem that sustains all life on Earth. Sustainable soil practices are essential for maintaining healthy ecosystems, producing nutritious food, and combating climate change.</p>
                
                <h3>The Living Soil Ecosystem</h3>
                <p>Healthy soil is teeming with life - from microscopic bacteria and fungi to earthworms and insects. This biodiversity is crucial for soil fertility, water retention, and carbon sequestration.</p>
                
                <p>Traditional agricultural practices often destroy this delicate ecosystem through excessive tilling, chemical fertilizers, and pesticides. Sustainable practices focus on nurturing soil life rather than fighting it.</p>
                
                <h3>Composting: Black Gold for Your Garden</h3>
                <p>Composting transforms kitchen scraps and yard waste into nutrient-rich humus that improves soil structure, increases moisture retention, and provides slow-release nutrients for plants.</p>
                
                <p>A well-maintained compost pile should have a balance of green materials (nitrogen-rich) and brown materials (carbon-rich). Green materials include vegetable scraps, coffee grounds, and fresh grass clippings. Brown materials include dried leaves, straw, and shredded paper.</p>
                
                <h3>Cover Cropping and Crop Rotation</h3>
                <p>Cover crops, also known as green manure, are plants grown specifically to improve soil health. They prevent erosion, suppress weeds, add organic matter, and fix nitrogen in the soil.</p>
                
                <p>Crop rotation involves growing different types of plants in the same area over successive seasons. This practice breaks pest and disease cycles, improves soil structure, and enhances nutrient availability.</p>
                
                <h3>No-Till Farming</h3>
                <p>No-till or minimum-till farming reduces soil disturbance, preserving soil structure and preventing erosion. This practice also helps retain moisture and sequester carbon in the soil.</p>
                
                <p>By minimizing mechanical disturbance, no-till farming protects the complex network of fungal mycelium and soil organisms that create healthy, fertile soil.</p>
            `,
    },
    {
      id: 6,
      title: "Weaving Tradition",
      category: "heritage",
      excerpt:
        "Ancient weaving methods passed down through generations of skilled artisans",
      date: "March 10, 2025",
      readTime: "8 min",
      image: "assets/f-product2.jpg",
      featured: false,
      content: `
                <h2>Weaving Tradition: Threads That Connect Generations</h2>
                <p>Weaving is one of humanity's oldest crafts, with evidence dating back over 27,000 years. Each woven piece carries the history, culture, and identity of the people who created it.</p>
                
                <h3>The Loom: Ancient Technology</h3>
                <p>The loom is a remarkable piece of technology that has evolved over millennia. From the simple backstrap loom to the complex Jacquard loom, each type represents a different cultural approach to creating fabric.</p>
                
                <p>Traditional looms are often made from locally available materials - bamboo, wood, or even parts of plants. The construction of the loom itself reflects the environment and resources of the weaver's community.</p>
                
                <h3>Natural Dyes: Colors from Nature</h3>
                <p>Before synthetic dyes, weavers used plants, minerals, and insects to create vibrant colors. Each region developed its own palette based on available resources.</p>
                
                <ul>
                    <li><strong>Indigo:</strong> From the indigo plant, creates deep blues</li>
                    <li><strong>Madder:</strong> Root produces reds and oranges</li>
                    <li><strong>Turmeric:</strong> Rhizome gives bright yellows</li>
                    <li><strong>Pomegranate:</strong> Skin creates golden yellows</li>
                    <li><strong>Cochineal:</strong> Insects produce crimson reds</li>
                </ul>
                
                <h3>Regional Weaving Traditions</h3>
                <p>India is home to countless distinct weaving traditions:</p>
                
                <h4>Banarasi Silk</h4>
                <p>From Varanasi, known for intricate gold and silver brocade work. Traditionally used for wedding saris, these textiles can take months or even years to complete.</p>
                
                <h4>Kanchipuram Silk</h4>
                <p>From Tamil Nadu, characterized by heavy silk fabric with contrasting borders. The zari (gold thread) work is particularly famous.</p>
                
                <h4>Pashmina</h4>
                <p>From Kashmir, made from the fine undercoat of Himalayan goats. Pashmina shawls are so fine they can pass through a ring.</p>
                
                <h3>Preserving the Craft</h3>
                <p>Today, many traditional weaving communities face challenges from industrialization and changing markets. However, renewed interest in sustainable fashion and cultural heritage is helping to preserve these ancient skills.</p>
                
                <p>By choosing handwoven textiles, we support artisan communities and help keep these traditions alive for future generations.</p>
            `,
    },
        {
      id: 7,
      title: "The Art of Traditional Pottery",
      category: "craftsmanship",
      excerpt:
        "Discover the ancient techniques that bring life to clay and create timeless pieces",
      date: "March 15, 2025",
      readTime: "8 min",
      image: "assets/floating-img-1.webp",
      featured: false,
      content: `
                <h2>The Art of Slow Crafting: Why Handmade Matters</h2>
                <p>In a world dominated by mass production and fast consumption, the art of slow crafting stands as a testament to patience, skill, and sustainability. Handcrafted items carry not just utility but stories - stories of the hands that shaped them, the traditions they represent, and the communities they support.</p>
                
                <h3>The Human Touch</h3>
                <p>Each handcrafted piece is unique, bearing the subtle imperfections that reveal its human origins. Unlike machine-made products that are identical in every batch, handmade items carry the signature of their creator - the pressure of fingers on clay, the rhythm of a weaver's hands, the careful strokes of a brush.</p>
                
                <p>This human touch creates a connection between maker and user that mass-produced items can never replicate. When you hold a hand-thrown pottery mug, you're not just holding a drinking vessel; you're connecting with hours of practice, generations of knowledge, and an individual's creative expression.</p>
                
                <h3>Sustainable by Design</h3>
                <p>Slow crafting is inherently sustainable. Artisans typically use locally sourced, natural materials that have minimal environmental impact. The production process generates little waste, and the items themselves are often biodegradable or easily repairable.</p>
                
                <p>Moreover, the longevity of well-crafted handmade items means they don't end up in landfills after a season of use. A quality handwoven basket can serve multiple generations, becoming more beautiful with age as the fibers develop a patina of use.</p>
                
                <h3>Preserving Cultural Heritage</h3>
                <p>Traditional crafts are more than just products - they're living history. Each technique, pattern, and material choice represents centuries of cultural evolution. By supporting handmade crafts, we help preserve these traditions for future generations.</p>
                
                <p>In India alone, there are over 3,000 distinct craft forms, each with its own regional significance. From the intricate embroidery of Kutch to the terracotta pottery of West Bengal, these crafts tell the story of our diverse cultural landscape.</p>
                
                <h3>Economic Empowerment</h3>
                <p>When you purchase handmade, you're not just buying a product - you're supporting an artisan's livelihood, their family, and often their entire community. Fair trade practices ensure that artisans receive fair compensation for their skill and time.</p>
                
                <p>This economic empowerment has far-reaching effects, helping to preserve rural economies, prevent migration to cities, and maintain cultural traditions in their place of origin.</p>
            `,
    },
    {
      id: 8,
      title: "Sustainable Soil Practices",
      category: "sustainability",
      excerpt:
        "How organic compost transforms gardens and nurtures our planet's future",
      date: "March 12, 2025",
      readTime: "8 min",
      image: "assets/f-product3.jpg",
      featured: false,
      content: `
                <h2>Sustainable Soil Practices: Nurturing Earth for Future Generations</h2>
                <p>Soil is not just dirt; it's a living, breathing ecosystem that sustains all life on Earth. Sustainable soil practices are essential for maintaining healthy ecosystems, producing nutritious food, and combating climate change.</p>
                
                <h3>The Living Soil Ecosystem</h3>
                <p>Healthy soil is teeming with life - from microscopic bacteria and fungi to earthworms and insects. This biodiversity is crucial for soil fertility, water retention, and carbon sequestration.</p>
                
                <p>Traditional agricultural practices often destroy this delicate ecosystem through excessive tilling, chemical fertilizers, and pesticides. Sustainable practices focus on nurturing soil life rather than fighting it.</p>
                
                <h3>Composting: Black Gold for Your Garden</h3>
                <p>Composting transforms kitchen scraps and yard waste into nutrient-rich humus that improves soil structure, increases moisture retention, and provides slow-release nutrients for plants.</p>
                
                <p>A well-maintained compost pile should have a balance of green materials (nitrogen-rich) and brown materials (carbon-rich). Green materials include vegetable scraps, coffee grounds, and fresh grass clippings. Brown materials include dried leaves, straw, and shredded paper.</p>
                
                <h3>Cover Cropping and Crop Rotation</h3>
                <p>Cover crops, also known as green manure, are plants grown specifically to improve soil health. They prevent erosion, suppress weeds, add organic matter, and fix nitrogen in the soil.</p>
                
                <p>Crop rotation involves growing different types of plants in the same area over successive seasons. This practice breaks pest and disease cycles, improves soil structure, and enhances nutrient availability.</p>
                
                <h3>No-Till Farming</h3>
                <p>No-till or minimum-till farming reduces soil disturbance, preserving soil structure and preventing erosion. This practice also helps retain moisture and sequester carbon in the soil.</p>
                
                <p>By minimizing mechanical disturbance, no-till farming protects the complex network of fungal mycelium and soil organisms that create healthy, fertile soil.</p>
            `,
    },
    {
      id: 9,
      title: "Weaving Tradition",
      category: "heritage",
      excerpt:
        "Ancient weaving methods passed down through generations of skilled artisans",
      date: "March 10, 2025",
      readTime: "8 min",
      image: "assets/f-product2.jpg",
      featured: false,
      content: `
                <h2>Weaving Tradition: Threads That Connect Generations</h2>
                <p>Weaving is one of humanity's oldest crafts, with evidence dating back over 27,000 years. Each woven piece carries the history, culture, and identity of the people who created it.</p>
                
                <h3>The Loom: Ancient Technology</h3>
                <p>The loom is a remarkable piece of technology that has evolved over millennia. From the simple backstrap loom to the complex Jacquard loom, each type represents a different cultural approach to creating fabric.</p>
                
                <p>Traditional looms are often made from locally available materials - bamboo, wood, or even parts of plants. The construction of the loom itself reflects the environment and resources of the weaver's community.</p>
                
                <h3>Natural Dyes: Colors from Nature</h3>
                <p>Before synthetic dyes, weavers used plants, minerals, and insects to create vibrant colors. Each region developed its own palette based on available resources.</p>
                
                <ul>
                    <li><strong>Indigo:</strong> From the indigo plant, creates deep blues</li>
                    <li><strong>Madder:</strong> Root produces reds and oranges</li>
                    <li><strong>Turmeric:</strong> Rhizome gives bright yellows</li>
                    <li><strong>Pomegranate:</strong> Skin creates golden yellows</li>
                    <li><strong>Cochineal:</strong> Insects produce crimson reds</li>
                </ul>
                
                <h3>Regional Weaving Traditions</h3>
                <p>India is home to countless distinct weaving traditions:</p>
                
                <h4>Banarasi Silk</h4>
                <p>From Varanasi, known for intricate gold and silver brocade work. Traditionally used for wedding saris, these textiles can take months or even years to complete.</p>
                
                <h4>Kanchipuram Silk</h4>
                <p>From Tamil Nadu, characterized by heavy silk fabric with contrasting borders. The zari (gold thread) work is particularly famous.</p>
                
                <h4>Pashmina</h4>
                <p>From Kashmir, made from the fine undercoat of Himalayan goats. Pashmina shawls are so fine they can pass through a ring.</p>
                
                <h3>Preserving the Craft</h3>
                <p>Today, many traditional weaving communities face challenges from industrialization and changing markets. However, renewed interest in sustainable fashion and cultural heritage is helping to preserve these ancient skills.</p>
                
                <p>By choosing handwoven textiles, we support artisan communities and help keep these traditions alive for future generations.</p>
            `,
    }
  ];

  // DOM Elements
  const featuredBlogContainer = document.getElementById("featuredBlog");
  const blogsGrid = document.getElementById("blogsGrid");
  const categoryButtons = document.querySelectorAll(".blog-category-btn");
  const blogSearch = document.getElementById("blogSearch");
  const searchBtn = document.querySelector(".search-btn");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const modal = document.getElementById("blogModal");
  const modalClose = document.querySelector(".modal-close");
  const modalContent = document.querySelector(".modal-blog-details");

  // State
  let filteredBlogs = [...blogs];
  let currentCategory = "all";
  let currentSearch = "";
  let visibleCount = 6;
  const blogsPerLoad = 3;

  // Initialize
  function init() {
    if (!featuredBlogContainer && !blogsGrid) {
      // Not on blogs page
      return;
    }

    renderFeaturedBlog();
    renderBlogs();
    setupEventListeners();
    updateCartBadge();
  }

  // Update cart badge
  function updateCartBadge() {
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
      let totalItems = 0;

      // Use global cart manager if available
      if (window.cartManager) {
        totalItems = window.cartManager.getItemCount();
      } else {
        // Fallback to localStorage
        try {
          const cartItems =
            JSON.parse(localStorage.getItem("mittimart-cart")) || [];
          totalItems = cartItems.reduce(
            (total, item) => total + (item.quantity || 1),
            0
          );
        } catch (e) {
          console.error("Error reading cart:", e);
        }
      }

      cartCountElement.textContent = totalItems;
      cartCountElement.style.display = totalItems > 0 ? "flex" : "none";
    }
  }

  // Render featured blog
  function renderFeaturedBlog() {
    if (!featuredBlogContainer) return;

    const featuredBlog = blogs.find((blog) => blog.featured) || blogs[0];

    featuredBlogContainer.innerHTML = `
            <div class="featured-blog-image">
                <img src="${featuredBlog.image}" alt="${featuredBlog.title}" onerror="this.src='assets/placeholder.jpg'">
                <div class="featured-badge">Featured</div>
            </div>
            <div class="featured-blog-info">
                <div class="blog-meta">
                    <span class="blog-category">${formatCategory(featuredBlog.category)}</span>
                    <span class="blog-date">${featuredBlog.date}</span>
                    <span class="blog-read-time">
                        <i class="far fa-clock"></i> ${featuredBlog.readTime || "5 min"} read
                    </span>
                </div>
                <h3>${featuredBlog.title}</h3>
                <p class="blog-excerpt">${featuredBlog.excerpt}</p>
                <a href="#" class="btn-read-more" data-id="${featuredBlog.id}">
                    Read Full Story <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
  }

  // Render blogs to grid
  function renderBlogs() {
    if (!blogsGrid) return;

    // Clear grid
    blogsGrid.innerHTML = "";

    // Get blogs to show (exclude featured blog)
    const blogsToShow = filteredBlogs
      .filter((blog) => !blog.featured)
      .slice(0, visibleCount);

    if (blogsToShow.length === 0) {
      blogsGrid.innerHTML = `
                <div class="no-blogs" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--sand); margin-bottom: 20px;"></i>
                    <h3 style="color: var(--dark-brown); margin-bottom: 10px;">No articles found</h3>
                    <p style="color: var(--text-light);">Try adjusting your search or category filters</p>
                </div>
            `;
    } else {
      // Create blog cards
      blogsToShow.forEach((blog) => {
        const blogCard = createBlogCard(blog);
        blogsGrid.appendChild(blogCard);
      });
    }

    // Update load more button
    updateLoadMoreButton();
  }

  // Create individual blog card
  function createBlogCard(blog) {
    const card = document.createElement("div");
    card.className = "blog-card";
    card.dataset.id = blog.id;
    card.dataset.category = blog.category;

    card.innerHTML = `
            <div class="blog-card-image">
                <img src="${blog.image}" alt="${blog.title}" loading="lazy" onerror="this.src='assets/placeholder.jpg'">
            </div>
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span class="blog-card-category">${formatCategory(blog.category)}</span>
                    <span class="blog-card-date">${blog.date}</span>
                </div>
                <h3 class="blog-card-title">${blog.title}</h3>
                <p class="blog-card-excerpt">${blog.excerpt}</p>
                <div class="blog-card-footer">
                    <span class="blog-card-read-time">
                        <i class="far fa-clock"></i> ${blog.readTime || "5 min"} read
                    </span>
                    <a href="#" class="blog-card-read-btn read-blog-btn" data-id="${blog.id}">
                        Read <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;

    return card;
  }

  // Format category for display
  function formatCategory(category) {
    const categoryMap = {
      craftsmanship: "Craftsmanship",
      sustainability: "Sustainability",
      heritage: "Heritage",
    };
    return categoryMap[category] || category;
  }

  // Filter blogs based on category and search
  function filterBlogs() {
    filteredBlogs = blogs.filter((blog) => {
      // Category filter
      if (currentCategory !== "all" && blog.category !== currentCategory) {
        return false;
      }

      // Search filter
      if (currentSearch) {
        const searchLower = currentSearch.toLowerCase();
        return (
          blog.title.toLowerCase().includes(searchLower) ||
          blog.excerpt.toLowerCase().includes(searchLower) ||
          blog.content.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });

    // Reset visible count
    visibleCount = 6;

    // Re-render
    renderBlogs();
  }

  // Update load more button visibility
  function updateLoadMoreButton() {
    if (!loadMoreBtn) return;

    const nonFeaturedBlogs = filteredBlogs.filter((blog) => !blog.featured);
    if (visibleCount >= nonFeaturedBlogs.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-flex";
    }
  }

  // Show blog modal
  function showBlogModal(blogId) {
    const blog = blogs.find((b) => b.id === blogId);
    if (!blog || !modalContent) return;

    modalContent.innerHTML = `
            <div class="modal-blog-header">
                <div class="modal-blog-image">
                    <img src="${blog.image}" alt="${blog.title}" onerror="this.src='assets/placeholder.jpg'">
                </div>
                <div class="blog-meta" style="display: flex; gap: 15px; margin-bottom: 20px;">
                    <span class="blog-category" style="background-color: var(--light-beige); color: var(--primary-brown); padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; font-weight: 600;">
                        ${formatCategory(blog.category)}
                    </span>
                    <span class="blog-date" style="color: var(--text-light); display: flex; align-items: center; gap: 5px;">
                        <i class="far fa-calendar"></i> ${blog.date}
                    </span>
                    <span class="blog-read-time" style="color: var(--text-light); display: flex; align-items: center; gap: 5px;">
                        <i class="far fa-clock"></i> ${blog.readTime || "5 min"} read
                    </span>
                </div>
                <h2 style="font-size: 2.2rem; color: var(--dark-brown); margin: 0 0 20px 0;">${blog.title}</h2>
                <p style="font-size: 1.2rem; color: var(--text-light); margin-bottom: 30px; line-height: 1.6;">${blog.excerpt}</p>
                <hr style="border: none; height: 1px; background-color: var(--light-beige); margin: 30px 0;">
                <div class="modal-blog-content">
                    ${blog.content || "<p>Full article content would be displayed here.</p>"}
                </div>
            </div>
        `;

    if (modal) {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";

      // Scroll to top of modal
      modalContent.scrollTop = 0;
    }
  }

  // Close modal
  function closeModal() {
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

  // Setup event listeners
  function setupEventListeners() {
    // Category buttons
    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Update active button
        categoryButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Update category and filter
        currentCategory = button.dataset.category;
        filterBlogs();
      });
    });

    // Search functionality
    if (blogSearch) {
      blogSearch.addEventListener("input", (e) => {
        currentSearch = e.target.value;
        filterBlogs();
      });

      blogSearch.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          filterBlogs();
        }
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener("click", filterBlogs);
    }

    // Load more button
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        visibleCount += blogsPerLoad;
        renderBlogs();
      });
    }

    // Modal close
    if (modalClose) {
      modalClose.addEventListener("click", closeModal);
    }

    // Close modal when clicking outside
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });
    }

    // Close modal with escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal && modal.style.display === "flex") {
        closeModal();
      }
    });

    // Delegate events for dynamically added elements
    document.addEventListener("click", (e) => {
      // Read blog buttons (from featured blog)
      if (e.target.closest(".btn-read-more")) {
        e.preventDefault();
        const button = e.target.closest(".btn-read-more");
        const blogId = parseInt(button.dataset.id);
        showBlogModal(blogId);
      }

      // Read blog buttons (from grid cards)
      if (e.target.closest(".read-blog-btn")) {
        e.preventDefault();
        const button = e.target.closest(".read-blog-btn");
        const blogId = parseInt(button.dataset.id);
        showBlogModal(blogId);
      }

      // Social share buttons in modal
      if (e.target.closest(".social-share-btn")) {
        const button = e.target.closest(".social-share-btn");
        const platform = button.dataset.platform;
        shareArticle(platform);
      }
    });

    // Newsletter form
    const newsletterForm = document.querySelector(".newsletter-form");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;

        if (email && validateEmail(email)) {
          const submitBtn = newsletterForm.querySelector('button[type="submit"]');
          const originalText = submitBtn.textContent;

          submitBtn.textContent = "Subscribed!";
          submitBtn.disabled = true;

          // Simulate API call
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            emailInput.value = "";

            showNotification("Successfully subscribed to newsletter!");
          }, 2000);
        } else {
          showNotification("Please enter a valid email address", "error");
        }
      });
    }
  }

  // Share article
  function shareArticle(platform) {
    const currentUrl = window.location.href;
    const title = document.title;

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case "pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&description=${encodeURIComponent(title)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(title)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  }

  // Email validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Show notification
  function showNotification(message, type = "success") {
    // Remove existing notification
    const existingNotification = document.querySelector(".blog-notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `blog-notification ${type}`;
    notification.innerHTML = `
            <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
            <span>${message}</span>
        `;

    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === "success" ? "var(--primary-brown)" : "#FF6B6B"};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
            animation-fill-mode: forwards;
            display: flex;
            align-items: center;
            gap: 10px;
        `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }

  // Add notification styles
  if (!document.querySelector("#blog-notification-styles")) {
    const style = document.createElement("style");
    style.id = "blog-notification-styles";
    style.textContent = `
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

  // Initialize the page
  init();
});