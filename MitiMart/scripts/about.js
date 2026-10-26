// about.js - Complete about page functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart badge
    updateCartBadge();
    
    // Animated number counters
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 100; // Lower = faster
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count')) || 0;
            const increment = Math.ceil(target / speed);
            let current = 0;
            
            // Reset counter
            counter.textContent = '0';
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    counter.textContent = current.toLocaleString();
                    setTimeout(updateCounter, 20);
                }
            };
            
            // Start animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { 
                threshold: 0.5,
                rootMargin: '0px 0px -100px 0px'
            });
            
            observer.observe(counter);
        });
    }
    
    // Timeline animation
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
            observer.observe(item);
        });
    }
    
    // Value cards hover effect enhancement
    function enhanceValueCards() {
        const valueCards = document.querySelectorAll('.value-card-about');
        
        valueCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.value-icon-about');
                if (icon) {
                    icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.value-icon-about');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
    }
    
    // Team member interaction
    function setupTeamInteractions() {
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach(member => {
            // Add click handler to toggle bio expansion
            member.addEventListener('click', (e) => {
                // Don't trigger if clicking on social links
                if (e.target.closest('.member-social a')) {
                    return;
                }
                
                // Toggle bio expansion
                const bio = member.querySelector('.member-bio');
                if (bio) {
                    bio.classList.toggle('expanded');
                    
                    // Update button text
                    const expandBtn = member.querySelector('.expand-bio-btn');
                    if (expandBtn) {
                        expandBtn.textContent = bio.classList.contains('expanded') 
                            ? 'Read Less' 
                            : 'Read More';
                    }
                }
            });
            
            // Add social link handlers
            const socialLinks = member.querySelectorAll('.member-social a');
            socialLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent team member click
                    // In a real app, this would open the social profile
                    console.log('Opening social profile');
                });
            });
        });
    }
    
    // Sustainability metrics animation
    function animateMetrics() {
        const metrics = document.querySelectorAll('.metric');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const icon = entry.target.querySelector('i');
                    if (icon) {
                        // Staggered animation
                        setTimeout(() => {
                            icon.style.transform = 'scale(1.2)';
                            icon.style.color = 'white';
                            
                            setTimeout(() => {
                                icon.style.transform = 'scale(1)';
                            }, 300);
                        }, index * 100);
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });
        
        metrics.forEach(metric => {
            observer.observe(metric);
        });
    }
    
    // Update cart badge
    function updateCartBadge() {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            let totalItems = 0;
            
            // Use global cart manager if available
            if (window.cartManager) {
                totalItems = window.cartManager.getItemCount();
            } else {
                // Fallback to localStorage
                try {
                    const cartItems = JSON.parse(localStorage.getItem('mittimart-cart')) || [];
                    totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
                } catch (e) {
                    console.error('Error reading cart:', e);
                }
            }
            
            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    // Ripple effect for buttons
    function addRippleEffect() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                // Create ripple element
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                // Set ripple styles
                ripple.className = 'ripple';
                ripple.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                `;
                
                // Add and remove ripple
                this.appendChild(ripple);
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 600);
            });
        });
    }
    
    // Initialize floating cards animation
    function initFloatingCards() {
        const cards = document.querySelectorAll('.floating-card');
        
        // Add hover effects
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });
    }
    
    // Smooth scroll for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                if (this.getAttribute('href') === '#') return;
                
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Initialize everything
    function init() {
        animateCounters();
        animateTimeline();
        enhanceValueCards();
        setupTeamInteractions();
        animateMetrics();
        addRippleEffect();
        initFloatingCards();
        initSmoothScroll();
        
        // Add CSS for animations if not already present
        if (!document.querySelector('#about-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'about-animation-styles';
            style.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .timeline-item {
                    animation: fadeInUp 0.8s ease forwards;
                }
                
                .metric i {
                    transition: all 0.3s ease;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Initialize when DOM is loaded
    if (document.querySelector('.about-hero')) {
        init();
    }
});
