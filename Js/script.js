// ================= ENHANCED FUNCTIONALITY =================
document.addEventListener("DOMContentLoaded", () => {
  
  // ================= DARK MODE TOGGLE =================
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const themeIcon = themeToggle?.querySelector('i');
  
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }
  
  // Theme toggle click handler
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      
      // Update icon
      if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
      }
    });
  }
  
  // ================= MOBILE MENU TOGGLE =================
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const hamburgerLines = document.querySelectorAll('.hamburger-line');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      // Animate hamburger to X
      hamburgerLines.forEach((line, index) => {
        line.style.transform = navMenu.classList.contains('active') 
          ? index === 0 ? 'rotate(45deg) translate(6px, 6px)' 
            : index === 1 ? 'opacity(0)' 
            : 'rotate(-45deg) translate(6px, -6px)'
          : 'none';
      });
    });

    // Close menu when clicking on links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburgerLines.forEach(line => {
          line.style.transform = 'none';
        });
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          hamburgerLines.forEach(line => {
            line.style.transform = 'none';
          });
        }
      }
    });
  }

  // ================= SMOOTH SCROLLING FOR NAVIGATION =================
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ================= TESTIMONIAL SLIDER =================
  const testimonials = document.querySelectorAll(".testimonial");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  if (testimonials.length > 0) {
    let index = 0;
    let autoSlideInterval;

    function showTestimonial(i) {
      testimonials.forEach((t, idx) => {
        t.classList.toggle("active", idx === i);
      });
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        index = (index + 1) % testimonials.length;
        showTestimonial(index);
      }, 6000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Next button
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        stopAutoSlide();
        index = (index + 1) % testimonials.length;
        showTestimonial(index);
        startAutoSlide();
      });
    }

    // Prev button
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        stopAutoSlide();
        index = (index - 1 + testimonials.length) % testimonials.length;
        showTestimonial(index);
        startAutoSlide();
      });
    }

    // Initialize
    showTestimonial(index);
    startAutoSlide();

    // Pause on hover
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
      testimonialSlider.addEventListener('mouseenter', stopAutoSlide);
      testimonialSlider.addEventListener('mouseleave', startAutoSlide);
    }
  }

  // ================= ENHANCED CONTACT FORM =================
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const service = formData.get('service');
      const message = formData.get('message');
      
      // Basic validation
      if (!name || !email || !service || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showNotification('Thank you! Your message has been sent. I will get back to you within 24 hours.', 'success');
        this.reset();
      }, 2000);
    });
  }

  // ================= NOTIFICATION SYSTEM =================
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <span>${message}</span>
      <button class="notification-close"><i class="fa-solid fa-times"></i></button>
    `;
    
    // Add styles
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
      color: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
      zIndex: '9999',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      maxWidth: '400px',
      animation: 'slideInRight 0.3s ease-out'
    });
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }

  // ================= SCROLL ANIMATIONS =================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe sections for scroll animations
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // ================= FAQ ACCORDION =================
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        faqItem.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ================= PRIVACY POLICY & TERMS MODALS =================
  const privacyLinks = document.querySelectorAll('a[href="#privacy"]');
  const termsLinks = document.querySelectorAll('a[href="#terms"]');
  const privacyModal = document.getElementById('privacy-modal');
  const termsModal = document.getElementById('terms-modal');
  const modalCloses = document.querySelectorAll('.modal-close');

  // Open privacy modal
  privacyLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (privacyModal) {
        privacyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Open terms modal
  termsLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (termsModal) {
        termsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modals
  modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      closeBtn.closest('.modal').classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // Close modal when clicking outside
  const modals = document.querySelectorAll('.modal');
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        modal.classList.remove('active');
      });
      document.body.style.overflow = 'auto';
    }
  });

  // ================= WHATSAPP FLOAT ANIMATION =================
  const whatsappFloat = document.querySelector('.whatsapp-float');
  if (whatsappFloat) {
    // Pulse animation every 3 seconds
    setInterval(() => {
      whatsappFloat.style.animation = 'pulse 0.5s ease';
      setTimeout(() => {
        whatsappFloat.style.animation = '';
      }, 500);
    }, 3000);
  }

  // Add pulse animation to CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
  `;
  document.head.appendChild(style);

});
