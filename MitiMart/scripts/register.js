// register-script.js
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const registerForm = document.getElementById('registerForm');
    const registerBtn = document.querySelector('.register-btn');
    const btnText = registerBtn ? registerBtn.querySelector('.btn-text') : null;
    const loadingSpinner = registerBtn ? registerBtn.querySelector('.loading-spinner') : null;
    
    // Password toggles
    const passwordToggle1 = document.getElementById('passwordToggle1');
    const passwordToggle2 = document.getElementById('passwordToggle2');
    const passwordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Terms modal
    const termsLinks = document.querySelectorAll('.terms-link');
    const termsModal = document.getElementById('termsModal');
    const modalClose = document.querySelector('.modal-close');
    
    // Social buttons
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');
    
    // Password strength
    const passwordStrength = document.getElementById('passwordStrength');
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    // Animated counters
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Initialize
    initRegisterPage();
    
    function initRegisterPage() {
        setupPasswordToggles();
        setupPasswordStrength();
        setupFormValidation();
        setupRegisterForm();
        setupTermsModal();
        setupSocialButtons();
        setupAnimatedCounters();
        setupStepAnimations();
        setupTestimonialEffects();
        setupRealTimeValidation();
        setupCTAButton();
        addRippleEffect();
        setupKeyboardNavigation();
        setupFormFocusEffects();
    }
    
    // Password toggle functionality
    function setupPasswordToggles() {
        if (passwordToggle1 && passwordInput) {
            setupPasswordToggle(passwordToggle1, passwordInput);
        }
        if (passwordToggle2 && confirmPasswordInput) {
            setupPasswordToggle(passwordToggle2, confirmPasswordInput);
        }
    }
    
    function setupPasswordToggle(toggle, input) {
        toggle.setAttribute('type', 'button');
        toggle.setAttribute('aria-label', 'Toggle password visibility');
        
        toggle.addEventListener('click', function() {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            }
            
            // Update aria-label
            this.setAttribute('aria-label', 
                type === 'password' ? 'Show password' : 'Hide password'
            );
        });
        
        // Allow space/enter key to toggle
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Password strength checker
    function setupPasswordStrength() {
        if (!passwordInput) return;
        
        passwordInput.addEventListener('input', function() {
            const result = checkPasswordStrength(this.value);
            updatePasswordStrengthUI(result);
        });
    }
    
    function checkPasswordStrength(password) {
        let strength = 0;
        let tips = "";
        
        // Check password length
        if (password.length >= 8) {
            strength += 1;
        } else {
            tips += "Make the password at least 8 characters. ";
        }
        
        // Check for mixed case
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
            strength += 1;
        } else {
            tips += "Use both lowercase and uppercase letters. ";
        }
        
        // Check for numbers
        if (password.match(/\d/)) {
            strength += 1;
        } else {
            tips += "Include at least one number. ";
        }
        
        // Check for special characters
        if (password.match(/[^a-zA-Z\d]/)) {
            strength += 1;
        } else {
            tips += "Include at least one special character. ";
        }
        
        return { strength, tips };
    }
    
    function updatePasswordStrengthUI(result) {
        const { strength } = result;
        const strengthPercent = (strength / 4) * 100;
        let strengthLabel = "";
        let color = "";
        
        switch(strength) {
            case 0:
            case 1:
                strengthLabel = "Weak";
                color = "#e74c3c";
                break;
            case 2:
                strengthLabel = "Fair";
                color = "#f39c12";
                break;
            case 3:
                strengthLabel = "Good";
                color = "#3498db";
                break;
            case 4:
                strengthLabel = "Strong";
                color = "#2ecc71";
                break;
        }
        
        if (strengthFill) {
            strengthFill.style.width = `${strengthPercent}%`;
            strengthFill.style.backgroundColor = color;
        }
        
        if (strengthText) {
            strengthText.textContent = `Password strength: ${strengthLabel}`;
            strengthText.style.color = color;
            strengthText.className = `strength-text ${strengthLabel.toLowerCase()}`;
        }
    }
    
    // Form validation
    function validateRegisterForm() {
        let isValid = true;
        
        // Reset errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });
        
        // First name validation
        const firstName = document.getElementById('firstName');
        const firstNameError = document.getElementById('firstNameError');
        if (firstName && firstNameError) {
            const firstNameValue = firstName.value.trim();
            if (!firstNameValue) {
                firstNameError.textContent = 'Please enter your first name';
                firstNameError.style.display = 'block';
                isValid = false;
            } else if (firstNameValue.length < 2) {
                firstNameError.textContent = 'First name must be at least 2 characters';
                firstNameError.style.display = 'block';
                isValid = false;
            }
        }
        
        // Last name validation
        const lastName = document.getElementById('lastName');
        const lastNameError = document.getElementById('lastNameError');
        if (lastName && lastNameError) {
            const lastNameValue = lastName.value.trim();
            if (!lastNameValue) {
                lastNameError.textContent = 'Please enter your last name';
                lastNameError.style.display = 'block';
                isValid = false;
            } else if (lastNameValue.length < 2) {
                lastNameError.textContent = 'Last name must be at least 2 characters';
                lastNameError.style.display = 'block';
                isValid = false;
            }
        }
        
        // Email validation
        const email = document.getElementById('registerEmail');
        const emailError = document.getElementById('emailError');
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
        
        // Phone validation (optional)
        const phone = document.getElementById('registerPhone');
        const phoneError = document.getElementById('phoneError');
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
        
        // Password validation
        const password = document.getElementById('registerPassword');
        const passwordError = document.getElementById('passwordError');
        if (password && passwordError) {
            const passwordValue = password.value.trim();
            if (!passwordValue) {
                passwordError.textContent = 'Please enter a password';
                passwordError.style.display = 'block';
                isValid = false;
            } else if (passwordValue.length < 8) {
                passwordError.textContent = 'Password must be at least 8 characters';
                passwordError.style.display = 'block';
                isValid = false;
            }
        }
        
        // Confirm password validation
        const confirmPassword = document.getElementById('confirmPassword');
        const confirmPasswordError = document.getElementById('confirmPasswordError');
        if (confirmPassword && confirmPasswordError) {
            const confirmPasswordValue = confirmPassword.value.trim();
            const passwordValue = password ? password.value.trim() : '';
            if (!confirmPasswordValue) {
                confirmPasswordError.textContent = 'Please confirm your password';
                confirmPasswordError.style.display = 'block';
                isValid = false;
            } else if (passwordValue !== confirmPasswordValue) {
                confirmPasswordError.textContent = 'Passwords do not match';
                confirmPasswordError.style.display = 'block';
                isValid = false;
            }
        }
        
        // Terms validation
        const termsAccepted = document.getElementById('terms');
        const termsError = document.getElementById('termsError');
        if (termsAccepted && termsError) {
            if (!termsAccepted.checked) {
                termsError.textContent = 'You must accept the terms and conditions';
                termsError.style.display = 'block';
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Register form submission
    function setupRegisterForm() {
        if (!registerForm) return;
        
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateRegisterForm()) {
                // Focus on first error
                const firstError = document.querySelector('.error-message[style*="block"]');
                if (firstError) {
                    const inputId = firstError.id.replace('Error', '');
                    const input = document.getElementById(inputId);
                    if (input) input.focus();
                }
                return;
            }
            
            // Show loading state
            if (btnText) btnText.textContent = 'Creating Account...';
            if (loadingSpinner) loadingSpinner.style.display = 'block';
            if (registerBtn) {
                registerBtn.disabled = true;
                registerBtn.setAttribute('aria-busy', 'true');
            }
            
            // Gather form data
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('registerEmail').value.trim(),
                phone: document.getElementById('registerPhone').value.trim() || null,
                password: document.getElementById('registerPassword').value.trim(),
                referralCode: document.getElementById('referralCode').value.trim() || null,
                newsletter: document.getElementById('newsletter') ? document.getElementById('newsletter').checked : false
            };
            
            // Simulate API call with delay
            setTimeout(() => {
                // Success scenario
                registerSuccess(formData);
            }, 2000);
        });
    }
    
    // Successful registration
    function registerSuccess(formData) {
        // Hide loading state
        if (btnText) btnText.textContent = 'Create Account';
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        if (registerBtn) {
            registerBtn.disabled = false;
            registerBtn.setAttribute('aria-busy', 'false');
        }
        
        // Show success animation
        registerBtn.style.backgroundColor = '#4CAF50';
        
        // Store user data
        localStorage.setItem('mittimart_user_email', formData.email);
        localStorage.setItem('mittimart_user_name', `${formData.firstName} ${formData.lastName}`);
        localStorage.setItem('mittimart_is_logged_in', 'true');
        
        // Generate a welcome discount code
        const discountCode = `WELCOME${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        localStorage.setItem('mittimart_welcome_discount', discountCode);
        
        // Log the registration
        console.log('New user registered:', { ...formData, password: '***' });
        
        // Show success message
        showSuccessMessage(formData.firstName);
        
        // Redirect after success
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 3000);
    }
    
    function showSuccessMessage(firstName) {
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1002;
            animation: fadeIn 0.3s ease;
            max-width: 500px;
            width: 90%;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
        `;
        
        const discountCode = localStorage.getItem('mittimart_welcome_discount');
        
        successDiv.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 3rem; color: #4CAF50; margin-bottom: 20px;"></i>
            <h3 style="color: var(--dark-brown); margin-bottom: 15px;">Welcome to MittiMart, ${firstName}!</h3>
            <p style="color: var(--text-light); margin-bottom: 10px;">Your account has been created successfully.</p>
            <p style="color: var(--dark-brown); margin-bottom: 10px;"><strong>Welcome Gift:</strong> Use code <code style="background: var(--sand); padding: 5px 10px; border-radius: 5px; font-weight: bold;">${discountCode}</code> for 15% off your first order!</p>
            <p style="color: var(--text-light);">You'll be redirected to the homepage shortly.</p>
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove after animation
        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translate(-50%, -50%) scale(0.9)';
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.remove();
                }
            }, 300);
        }, 2700);
    }
    
    // Terms modal
    function setupTermsModal() {
        if (termsLinks.length === 0 || !termsModal) return;
        
        termsLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                openTermsModal();
            });
        });
        
        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', closeTermsModal);
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === termsModal) {
                closeTermsModal();
            }
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && termsModal.style.display === 'flex') {
                closeTermsModal();
            }
        });
    }
    
    function openTermsModal() {
        termsModal.style.display = 'flex';
        termsModal.setAttribute('aria-hidden', 'false');
        
        // Trap focus inside modal
        trapFocus(termsModal);
    }
    
    function closeTermsModal() {
        termsModal.style.display = 'none';
        termsModal.setAttribute('aria-hidden', 'true');
    }
    
    // Trap focus in modal for accessibility
    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        const handleKeydown = function(e) {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        };
        
        modal.addEventListener('keydown', handleKeydown);
        
        // Store reference to remove later
        modal._trapFocusHandler = handleKeydown;
        
        if (firstFocusable) firstFocusable.focus();
    }
    
    // Remove focus trap when modal closes
    function removeTrapFocus(modal) {
        if (modal._trapFocusHandler) {
            modal.removeEventListener('keydown', modal._trapFocusHandler);
            delete modal._trapFocusHandler;
        }
    }
    
    // Social registration buttons
    function setupSocialButtons() {
        if (googleBtn) {
            googleBtn.addEventListener('click', function() {
                handleSocialRegistration('google');
            });
        }
        
        if (facebookBtn) {
            facebookBtn.addEventListener('click', function() {
                handleSocialRegistration('facebook');
            });
        }
    }
    
    function handleSocialRegistration(provider) {
        // Visual feedback
        const btn = provider === 'google' ? googleBtn : facebookBtn;
        const originalBg = btn.style.backgroundColor;
        const originalBorder = btn.style.borderColor;
        const originalColor = btn.style.color;
        
        btn.style.backgroundColor = '#f8f8f8';
        btn.style.borderColor = provider === 'google' ? '#db4437' : '#4267B2';
        btn.style.color = provider === 'google' ? '#db4437' : '#4267B2';
        
        setTimeout(() => {
            btn.style.backgroundColor = originalBg;
            btn.style.borderColor = originalBorder;
            btn.style.color = originalColor;
        }, 300);
        
        console.log(`${provider} registration clicked`);
        
        // In a real app, this would trigger OAuth flow
        // window.location.href = `/auth/${provider}/register`;
    }
    
    // Animate counters
    function setupAnimatedCounters() {
        if (statNumbers.length === 0) return;
        
        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count')) || 0;
            const increment = Math.max(1, Math.ceil(target / 100));
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    counter.textContent = Math.ceil(current).toLocaleString();
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target.toLocaleString();
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
            }, { threshold: 0.5, rootMargin: '50px' });
            
            observer.observe(counter);
        });
    }
    
    // Step animations
    function setupStepAnimations() {
        const steps = document.querySelectorAll('.step');
        if (steps.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.2 });
        
        steps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
            observer.observe(step);
        });
    }
    
    // Testimonial hover effects
    function setupTestimonialEffects() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const avatar = this.querySelector('.author-avatar i');
                if (avatar) {
                    avatar.style.transform = 'scale(1.1)';
                    avatar.style.transition = 'transform 0.3s ease';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const avatar = this.querySelector('.author-avatar i');
                if (avatar) {
                    avatar.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // Real-time form validation
    function setupRealTimeValidation() {
        if (!registerForm) return;
        
        const formInputs = registerForm.querySelectorAll('input');
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Clear error when user starts typing
                const errorId = this.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
                
                // Special handling for password confirmation
                if (this.id === 'registerPassword' || this.id === 'confirmPassword') {
                    const password = document.getElementById('registerPassword');
                    const confirmPassword = document.getElementById('confirmPassword');
                    
                    if (password && confirmPassword && password.value && confirmPassword.value && password.value !== confirmPassword.value) {
                        const confirmError = document.getElementById('confirmPasswordError');
                        if (confirmError) {
                            confirmError.textContent = 'Passwords do not match';
                            confirmError.style.display = 'block';
                        }
                    } else if (password && confirmPassword && password.value && confirmPassword.value) {
                        const confirmError = document.getElementById('confirmPasswordError');
                        if (confirmError) confirmError.style.display = 'none';
                    }
                }
            });
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        
        switch(field.id) {
            case 'firstName':
                if (value && value.length < 2) {
                    const error = document.getElementById('firstNameError');
                    if (error) {
                        error.textContent = 'First name must be at least 2 characters';
                        error.style.display = 'block';
                    }
                }
                break;
            case 'lastName':
                if (value && value.length < 2) {
                    const error = document.getElementById('lastNameError');
                    if (error) {
                        error.textContent = 'Last name must be at least 2 characters';
                        error.style.display = 'block';
                    }
                }
                break;
            case 'registerEmail':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    const error = document.getElementById('emailError');
                    if (error) {
                        error.textContent = 'Please enter a valid email address';
                        error.style.display = 'block';
                    }
                }
                break;
            case 'registerPassword':
                if (value && value.length < 8) {
                    const error = document.getElementById('passwordError');
                    if (error) {
                        error.textContent = 'Password must be at least 8 characters';
                        error.style.display = 'block';
                    }
                }
                break;
        }
    }
    
    // CTA button scroll to form
    function setupCTAButton() {
        const ctaButton = document.querySelector('.register-cta .btn');
        if (!ctaButton) return;
        
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const registerForm = document.getElementById('registerForm');
            if (registerForm) {
                registerForm.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
                
                // Focus on first input
                setTimeout(() => {
                    const firstName = document.getElementById('firstName');
                    if (firstName) firstName.focus();
                }, 500);
            }
        });
    }
    
    // Add ripple effect to buttons
    function addRippleEffect() {
        const buttons = document.querySelectorAll('.btn, .social-btn, .password-toggle');
        buttons.forEach(button => {
            button.addEventListener('click', createRipple);
        });
    }
    
    function createRipple(e) {
        // Create ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(139, 115, 85, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }
    
    // Setup keyboard navigation
    function setupKeyboardNavigation() {
        // Make register form focusable
        if (registerForm) {
            registerForm.setAttribute('tabindex', '0');
        }
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Alt + R to focus on register form
            if (e.altKey && e.key === 'r') {
                e.preventDefault();
                const firstName = document.getElementById('firstName');
                if (firstName) firstName.focus();
            }
            
            // Alt + T to open terms
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                openTermsModal();
            }
        });
    }
    
    // Setup form focus effects
    function setupFormFocusEffects() {
        const formInputs = document.querySelectorAll('.input-with-icon input');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateY(-2px)';
                const icon = this.parentElement.querySelector('i');
                if (icon) icon.style.color = 'var(--primary-brown)';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateY(0)';
                const icon = this.parentElement.querySelector('i');
                if (icon) icon.style.color = 'var(--text-light)';
            });
        });
    }
    
    // Benefit items animation
    const benefitItems = document.querySelectorAll('.benefit-item');
    if (benefitItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.2 });
        
        benefitItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            observer.observe(item);
        });
    }
    
    // Add CSS for animations if not already added
    if (!document.querySelector('#register-animations')) {
        const style = document.createElement('style');
        style.id = 'register-animations';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
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
