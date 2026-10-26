// login-script.js
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.querySelector('.login-btn');
    const btnText = loginBtn ? loginBtn.querySelector('.btn-text') : null;
    const loadingSpinner = loginBtn ? loginBtn.querySelector('.loading-spinner') : null;
    
    // Modal elements
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const modalClose = document.querySelector('.modal-close');
    const resetForm = document.getElementById('forgotPasswordForm');
    const resetBtn = document.querySelector('.reset-btn');
    const resetSuccess = document.getElementById('resetSuccess');
    
    // Demo banner
    const demoBanner = document.getElementById('demoBanner');
    const closeBannerBtn = document.getElementById('closeBanner');
    
    // Password toggle
    const passwordToggle = document.getElementById('passwordToggle');
    // const passwordInput = document.getElementById('loginPassword');
    
    // Social login buttons
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');
    
    // Demo credentials
    const DEMO_EMAIL = 'demo@mittimart.com';
    const DEMO_PASSWORD = 'demo123';
    
    // Initialize
    initLoginPage();
    
    function initLoginPage() {
        setupPasswordToggle();
        setupFormValidation();
        setupLoginForm();
        setupForgotPassword();
        setupDemoBanner();
        setupSocialLogin();
        setupDemoCredentials();
        setupFocusEffects();
        setupRememberMe();
        addRippleEffect();
        setupKeyboardNavigation();
    }
    
    // Password toggle functionality
    function setupPasswordToggle() {
        if (!passwordToggle || !passwordInput) return;
        
        passwordToggle.setAttribute('type', 'button');
        passwordToggle.setAttribute('aria-label', 'Toggle password visibility');
        
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
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
        passwordToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Form validation
    function validateLoginForm() {
        let isValid = true;
        
        // Reset errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
            error.textContent = '';
        });
        
        // Email validation
        const email = document.getElementById('loginEmail');
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
        
        // Password validation
        const password = document.getElementById('loginPassword');
        const passwordError = document.getElementById('passwordError');
        if (password && passwordError) {
            const passwordValue = password.value.trim();
            
            if (!passwordValue) {
                passwordError.textContent = 'Please enter your password';
                passwordError.style.display = 'block';
                isValid = false;
            } else if (passwordValue.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters';
                passwordError.style.display = 'block';
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Login form submission
    function setupLoginForm() {
        if (!loginForm) return;
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateLoginForm()) {
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
            if (btnText) btnText.textContent = 'Signing In...';
            if (loadingSpinner) loadingSpinner.style.display = 'block';
            if (loginBtn) {
                loginBtn.disabled = true;
                loginBtn.setAttribute('aria-busy', 'true');
            }
            
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();
            const rememberMe = document.getElementById('rememberMe') ? document.getElementById('rememberMe').checked : false;
            
            // Simulate API call with delay
            setTimeout(() => {
                // Check if using demo credentials
                const isDemoLogin = email === DEMO_EMAIL && password === DEMO_PASSWORD;
                
                if (isDemoLogin || (email && password.length >= 6)) {
                    // Successful login
                    loginSuccess(email, rememberMe);
                } else {
                    // Failed login
                    loginFailed();
                }
            }, 1500);
        });
    }
    
    // Successful login
    function loginSuccess(email, rememberMe) {
        // Hide loading state
        if (btnText) btnText.textContent = 'Sign In';
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        if (loginBtn) {
            loginBtn.disabled = false;
            loginBtn.setAttribute('aria-busy', 'false');
        }
        
        // Show success animation
        loginBtn.style.backgroundColor = '#4CAF50';
        
        // Store login state
        if (rememberMe) {
            localStorage.setItem('mittimart_user_email', email);
            localStorage.setItem('mittimart_remember_me', 'true');
        } else {
            sessionStorage.setItem('mittimart_user_email', email);
            localStorage.removeItem('mittimart_user_email');
            localStorage.removeItem('mittimart_remember_me');
        }
        
        // Store user authentication state
        localStorage.setItem('mittimart_is_logged_in', 'true');
        
        // Log the login
        console.log(`User logged in: ${email}, Remember me: ${rememberMe}`);
        
        // Show success message
        showSuccessMessage();
        
        // Redirect after success
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
    
    // Show success message
    function showSuccessMessage() {
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
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 400px;
            width: 90%;
        `;
        
        successDiv.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 3rem; color: #4CAF50; margin-bottom: 20px;"></i>
            <h3 style="color: var(--dark-brown); margin-bottom: 15px;">Login Successful!</h3>
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
        }, 1700);
    }
    
    // Failed login
    function loginFailed() {
        // Hide loading state
        if (btnText) btnText.textContent = 'Sign In';
        if (loadingSpinner) loadingSpinner.style.display = 'none';
        if (loginBtn) {
            loginBtn.disabled = false;
            loginBtn.setAttribute('aria-busy', 'false');
        }
        
        // Show error with animation
        loginBtn.style.backgroundColor = '#FF6B6B';
        loginBtn.style.transform = 'translateX(-5px)';
        
        setTimeout(() => {
            loginBtn.style.backgroundColor = '';
            loginBtn.style.transform = '';
        }, 300);
        
        // Shake animation
        loginForm.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            loginForm.style.animation = '';
        }, 500);
        
        // Show error message
        const passwordError = document.getElementById('passwordError');
        if (passwordError) {
            passwordError.textContent = 'Invalid email or password. Use demo credentials if needed.';
            passwordError.style.display = 'block';
        }
        
        // Focus on password field
        const passwordField = document.getElementById('loginPassword');
        if (passwordField) passwordField.focus();
        
        console.log('Login failed');
    }
    
    // Forgot password modal
    function setupForgotPassword() {
        if (!forgotPasswordLink || !forgotPasswordModal) return;
        
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            openForgotPasswordModal();
        });
        
        // Close modal
        if (modalClose) {
            modalClose.addEventListener('click', closeForgotPasswordModal);
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === forgotPasswordModal) {
                closeForgotPasswordModal();
            }
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && forgotPasswordModal.style.display === 'flex') {
                closeForgotPasswordModal();
            }
        });
    }
    
    function openForgotPasswordModal() {
        forgotPasswordModal.style.display = 'flex';
        const resetEmail = document.getElementById('resetEmail');
        if (resetEmail) resetEmail.focus();
        
        // Trap focus inside modal
        trapFocus(forgotPasswordModal);
    }
    
    function closeForgotPasswordModal() {
        forgotPasswordModal.style.display = 'none';
        if (resetSuccess) resetSuccess.style.display = 'none';
        if (resetForm) resetForm.reset();
    }
    
    // Trap focus in modal for accessibility
    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        modal.addEventListener('keydown', function(e) {
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
        });
        
        if (firstFocusable) firstFocusable.focus();
    }
    
    // Reset password form
    if (resetForm) {
        resetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const resetEmail = document.getElementById('resetEmail');
            const resetEmailError = document.getElementById('resetEmailError');
            
            if (!resetEmail || !resetEmailError) return;
            
            const resetEmailValue = resetEmail.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            // Validate email
            if (!resetEmailValue || !emailRegex.test(resetEmailValue)) {
                resetEmailError.textContent = 'Please enter a valid email address';
                resetEmailError.style.display = 'block';
                resetEmail.focus();
                return;
            }
            
            // Show loading
            const resetBtnText = resetBtn.querySelector('.btn-text');
            const resetSpinner = resetBtn.querySelector('.loading-spinner');
            resetBtnText.textContent = 'Sending...';
            resetSpinner.style.display = 'block';
            resetBtn.disabled = true;
            resetBtn.setAttribute('aria-busy', 'true');
            
            // Simulate API call
            setTimeout(() => {
                // Reset button state
                resetBtnText.textContent = 'Send Reset Instructions';
                resetSpinner.style.display = 'none';
                resetBtn.disabled = false;
                resetBtn.setAttribute('aria-busy', 'false');
                
                // Show success message
                if (resetSuccess) {
                    resetSuccess.style.display = 'block';
                }
                resetForm.reset();
                
                // Log the reset request
                console.log(`Password reset requested for: ${resetEmailValue}`);
                
                // Hide success after 3 seconds and close modal
                setTimeout(() => {
                    if (resetSuccess) resetSuccess.style.display = 'none';
                    forgotPasswordModal.style.display = 'none';
                }, 3000);
            }, 1500);
        });
    }
    
    // Demo banner
    function setupDemoBanner() {
        if (!demoBanner || !closeBannerBtn) return;
        
        // Check if user has closed the banner before
        const bannerClosed = localStorage.getItem('mittimart_banner_closed');
        
        if (!bannerClosed) {
            demoBanner.style.display = 'block';
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                if (demoBanner.style.display !== 'none') {
                    demoBanner.style.opacity = '1';
                    let opacity = 1;
                    const fadeOut = setInterval(() => {
                        if (opacity <= 0) {
                            clearInterval(fadeOut);
                            demoBanner.style.display = 'none';
                        } else {
                            opacity -= 0.1;
                            demoBanner.style.opacity = opacity;
                        }
                    }, 100);
                }
            }, 10000);
        }
        
        closeBannerBtn.addEventListener('click', function() {
            demoBanner.style.transform = 'translateY(100%)';
            demoBanner.style.opacity = '0';
            setTimeout(() => {
                demoBanner.style.display = 'none';
            }, 500);
            localStorage.setItem('mittimart_banner_closed', 'true');
        });
        
        // Allow closing with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && demoBanner.style.display === 'block') {
                closeBannerBtn.click();
            }
        });
    }
    
    // Social login buttons
    function setupSocialLogin() {
        if (googleBtn) {
            googleBtn.addEventListener('click', function() {
                handleSocialLogin('google');
            });
        }
        
        if (facebookBtn) {
            facebookBtn.addEventListener('click', function() {
                handleSocialLogin('facebook');
            });
        }
    }
    
    function handleSocialLogin(provider) {
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
        
        console.log(`${provider} login clicked`);
        
        // In a real app, this would trigger OAuth flow
        // window.location.href = `/auth/${provider}`;
    }
    
    // Pre-fill demo credentials
    function setupDemoCredentials() {
        const emailInput = document.getElementById('loginEmail');
        const passwordInputField = document.getElementById('loginPassword');
        
        if (!emailInput || !passwordInputField) return;
        
        // Add click event to pre-fill demo credentials
        emailInput.addEventListener('focus', function() {
            if (this.value === '' && !localStorage.getItem('mittimart_banner_closed')) {
                this.value = DEMO_EMAIL;
                passwordInputField.value = DEMO_PASSWORD;
                
                // Visual feedback
                this.style.borderColor = '#4CAF50';
                passwordInputField.style.borderColor = '#4CAF50';
                
                setTimeout(() => {
                    this.style.borderColor = '';
                    passwordInputField.style.borderColor = '';
                }, 1000);
                
                // Announce to screen readers
                announceToScreenReader('Demo credentials have been filled');
            }
        });
    }
    
    // Setup remember me functionality
    function setupRememberMe() {
        // Check if there's a remembered email
        const rememberedEmail = localStorage.getItem('mittimart_user_email');
        const rememberMeChecked = localStorage.getItem('mittimart_remember_me');
        
        if (rememberedEmail && rememberMeChecked === 'true') {
            const emailInput = document.getElementById('loginEmail');
            const rememberCheckbox = document.getElementById('rememberMe');
            
            if (emailInput) emailInput.value = rememberedEmail;
            if (rememberCheckbox) rememberCheckbox.checked = true;
        }
    }
    
    // Add input focus effects
    function setupFocusEffects() {
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
    
    // Add CSS for ripple animation if not already added
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
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
    
    // Setup keyboard navigation
    function setupKeyboardNavigation() {
        // Make login form focusable
        if (loginForm) {
            loginForm.setAttribute('tabindex', '0');
        }
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Alt + L to focus on login form
            if (e.altKey && e.key === 'l') {
                e.preventDefault();
                const loginEmail = document.getElementById('loginEmail');
                if (loginEmail) loginEmail.focus();
            }
            
            // Alt + R to reset form
            if (e.altKey && e.key === 'r') {
                e.preventDefault();
                if (loginForm) loginForm.reset();
            }
        });
    }
    
    // Screen reader announcements
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            if (announcement.parentNode) {
                announcement.remove();
            }
        }, 1000);
    }
    
    // Real-time form validation
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    
    if (emailInput) {
        emailInput.addEventListener('input', debounce(() => {
            const email = emailInput.value.trim();
            // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailError = document.getElementById('emailError');
            if (emailError) {
                if (email && !emailRegex.test(email)) {
                    emailError.textContent = 'Please enter a valid email address';
                    emailError.style.display = 'block';
                } else {
                    emailError.style.display = 'none';
                }
            }
        }, 500));
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', debounce(() => {
            const password = passwordInput.value.trim();
            const passwordError = document.getElementById('passwordError');
            if (passwordError) {
                if (password && password.length < 6) {
                    passwordError.textContent = 'Password must be at least 6 characters';
                    passwordError.style.display = 'block';
                } else {
                    passwordError.style.display = 'none';
                }
            }
        }, 500));
    }
    
    // Debounce helper function
    function debounce(func, delay) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }
});
