// contact-script.js
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const loadingSpinner = submitBtn ? submitBtn.querySelector('.loading-spinner') : null;
    const formSuccess = document.getElementById('formSuccess');
    
    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');
    
    // FAQ functionality (if exists)
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqContactLink = document.getElementById('faqContactLink');
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // Reset errors
        [nameError, emailError, phoneError, messageError].forEach(error => {
            if (error) {
                error.style.display = 'none';
                error.textContent = '';
            }
        });
        
        // Name validation
        const name = document.getElementById('name');
        if (name && nameError) {
            const nameValue = name.value.trim();
            if (!nameValue) {
                nameError.textContent = 'Please enter your full name';
                nameError.style.display = 'block';
                isValid = false;
            } else if (nameValue.length < 2) {
                nameError.textContent = 'Name must be at least 2 characters';
                nameError.style.display = 'block';
                isValid = false;
            }
        }
        
        // Email validation
        const email = document.getElementById('email');
        if (email && emailError) {
            const emailValue = email.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailValue) {
                emailError.textContent = 'Please enter your email address';
                emailError.style.display = 'block';
                isValid = false;
            } else if (!emailRegex.test(emailValue)) {
                emailError.textContent = 'Please enter a valid email address';
                emailError.style.display = 'block';
                isValid = false;
            }
        }
        
        // Phone validation (optional but validate if provided)
        const phone = document.getElementById('phone');
        if (phone && phoneError) {
            const phoneValue = phone.value.trim();
            if (phoneValue) {
                // More flexible phone validation
                const cleanPhone = phoneValue.replace(/\D/g, '');
                if (cleanPhone.length < 10) {
                    phoneError.textContent = 'Please enter a valid phone number (at least 10 digits)';
                    phoneError.style.display = 'block';
                    isValid = false;
                }
            }
        }
        
        // Message validation
        const message = document.getElementById('message');
        if (message && messageError) {
            const messageValue = message.value.trim();
            if (!messageValue) {
                messageError.textContent = 'Please enter your message';
                messageError.style.display = 'block';
                isValid = false;
            } else if (messageValue.length < 10) {
                messageError.textContent = 'Message must be at least 10 characters';
                messageError.style.display = 'block';
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            // Show loading state
            if (btnText) btnText.textContent = 'Sending...';
            if (loadingSpinner) loadingSpinner.style.display = 'block';
            if (submitBtn) submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Hide loading state
                if (btnText) btnText.textContent = 'Send Message';
                if (loadingSpinner) loadingSpinner.style.display = 'none';
                if (submitBtn) submitBtn.disabled = false;
                
                // Show success message
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                    
                    // Scroll to success message
                    formSuccess.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.style.display = 'none';
                    }, 5000);
                }
                
                // Log form data (in real app, this would be sent to server)
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value || 'Not provided',
                    message: document.getElementById('message').value,
                    newsletter: document.getElementById('newsletter') ? document.getElementById('newsletter').checked : false
                };
                console.log('Form submitted:', formData);
            }, 1500);
        });
    }
    
    // FAQ functionality
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.closest('.faq-item');
                if (faqItem) {
                    const isActive = faqItem.classList.contains('active');
                    
                    // Close all FAQ items
                    document.querySelectorAll('.faq-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    // If it wasn't active, open it
                    if (!isActive) {
                        faqItem.classList.add('active');
                    }
                }
            });
        });
    }
    
    // FAQ contact link
    if (faqContactLink) {
        faqContactLink.addEventListener('click', (e) => {
            e.preventDefault();
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Get directions button
    const directionsBtn = document.querySelector('.get-directions');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', () => {
            const address = "123 Earth Street, Sustainable City, Jaipur, Rajasthan 302001";
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            
            // Open in new tab
            window.open(googleMapsUrl, '_blank');
        });
    }
    
    // Location items interaction
    const locationItems = document.querySelectorAll('.location-item');
    locationItems.forEach(item => {
        item.addEventListener('click', () => {
            const locationTitle = item.querySelector('h5');
            const locationDesc = item.querySelector('p');
            
            if (locationTitle && locationDesc) {
                // Visual feedback
                item.style.backgroundColor = 'var(--sand)';
                item.style.borderColor = 'var(--primary-brown)';
                
                setTimeout(() => {
                    item.style.backgroundColor = '';
                    item.style.borderColor = '';
                }, 300);
                
                // In a real app, this would show more details or map
                console.log(`Selected location: ${locationTitle.textContent} - ${locationDesc.textContent}`);
                
                // Show alert for demo
                alert(`Location selected: ${locationTitle.textContent}\n${locationDesc.textContent}\n\nIn a real implementation, this would show more details or update the map.`);
            }
        });
    });
    
    // Social icons animation
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        const i = icon.querySelector('i');
        if (i) {
            icon.addEventListener('mouseenter', () => {
                i.style.transform = 'scale(1.2) rotate(5deg)';
                i.style.transition = 'transform 0.3s ease';
            });
            
            icon.addEventListener('mouseleave', () => {
                i.style.transform = 'scale(1) rotate(0deg)';
            });
        }
    });
    
    // Contact stats animation
    const contactStats = document.querySelectorAll('.contact-stat');
    contactStats.forEach(stat => {
        const icon = stat.querySelector('i');
        if (icon) {
            stat.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            });
            
            stat.addEventListener('mouseleave', () => {
                icon.style.transform = 'scale(1)';
            });
        }
    });
    
    // Real-time form validation
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', () => {
                // Validate individual field
                if (input.id === 'name' && nameError) {
                    const nameValue = input.value.trim();
                    if (nameValue && nameValue.length < 2) {
                        nameError.textContent = 'Name must be at least 2 characters';
                        nameError.style.display = 'block';
                    } else if (!nameValue) {
                        nameError.textContent = 'Please enter your full name';
                        nameError.style.display = 'block';
                    } else {
                        nameError.style.display = 'none';
                    }
                }
                
                if (input.id === 'email' && emailError) {
                    const emailValue = input.value.trim();
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailValue && !emailRegex.test(emailValue)) {
                        emailError.textContent = 'Please enter a valid email address';
                        emailError.style.display = 'block';
                    } else if (!emailValue) {
                        emailError.textContent = 'Please enter your email address';
                        emailError.style.display = 'block';
                    } else {
                        emailError.style.display = 'none';
                    }
                }
                
                if (input.id === 'message' && messageError) {
                    const messageValue = input.value.trim();
                    if (messageValue && messageValue.length < 10) {
                        messageError.textContent = 'Message must be at least 10 characters';
                        messageError.style.display = 'block';
                    } else if (!messageValue) {
                        messageError.textContent = 'Please enter your message';
                        messageError.style.display = 'block';
                    } else {
                        messageError.style.display = 'none';
                    }
                }
            });
            
            input.addEventListener('input', () => {
                // Clear error when user starts typing
                const errorId = input.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            });
        });
    }
    
    // Initialize map placeholder animation
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('mouseenter', () => {
            const mapIcon = mapPlaceholder.querySelector('.fa-map-marker-alt');
            if (mapIcon) {
                mapIcon.style.transform = 'scale(1.1)';
                mapIcon.style.transition = 'transform 0.3s ease';
            }
        });
        
        mapPlaceholder.addEventListener('mouseleave', () => {
            const mapIcon = mapPlaceholder.querySelector('.fa-map-marker-alt');
            if (mapIcon) {
                mapIcon.style.transform = 'scale(1)';
            }
        });
    }
    
    // Accessibility improvements
    const formLabels = document.querySelectorAll('label[for]');
    formLabels.forEach(label => {
        const inputId = label.getAttribute('for');
        const input = document.getElementById(inputId);
        if (input) {
            // Ensure required fields have aria-required
            if (input.hasAttribute('required')) {
                input.setAttribute('aria-required', 'true');
                const requiredText = document.createElement('span');
                requiredText.className = 'sr-only';
                requiredText.textContent = ' (required)';
                label.appendChild(requiredText);
            }
            
            // Add aria-describedby for error messages
            const errorElement = document.getElementById(inputId + 'Error');
            if (errorElement) {
                input.setAttribute('aria-describedby', errorElement.id);
            }
        }
    });
    
    // Add keyboard navigation for FAQ
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.setAttribute('tabindex', '0');
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });
    }
    
    // Add screen reader only class if not present
    if (!document.querySelector('#sr-styles')) {
        const style = document.createElement('style');
        style.id = 'sr-styles';
        style.textContent = `
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
        `;
        document.head.appendChild(style);
    }
});