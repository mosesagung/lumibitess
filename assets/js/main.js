document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Hero Slider
    const heroSlider = document.querySelector('.hero-slider');
    const heroSlides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.hero-slider-dots');
    let currentSlide = 0;
    const slideCount = heroSlides.length;
    
    // Create dots
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.dot');
    
    function updateSlider() {
        heroSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(slideIndex) {
        currentSlide = (slideIndex + slideCount) % slideCount;
        updateSlider();
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const endOfYear = new Date(now.getFullYear() + 1, 0, 1);
        const diff = endOfYear - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Scroll Header Effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartItems++;
            cartCount.textContent = cartItems;
            
            // Animation effect
            this.textContent = '✓ Ditambahkan';
            this.style.backgroundColor = '#2ecc71';
            
            setTimeout(() => {
                this.textContent = '+ Keranjang';
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
    
    // Testimonials Slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    
    testimonialsSlider.addEventListener('mousedown', dragStart);
    testimonialsSlider.addEventListener('touchstart', dragStart);
    
    testimonialsSlider.addEventListener('mousemove', drag);
    testimonialsSlider.addEventListener('touchmove', drag);
    
    testimonialsSlider.addEventListener('mouseup', dragEnd);
    testimonialsSlider.addEventListener('touchend', dragEnd);
    testimonialsSlider.addEventListener('mouseleave', dragEnd);
    
    function dragStart(e) {
        if (e.type === 'touchstart') {
            startPos = e.touches[0].clientX;
        } else {
            startPos = e.clientX;
            e.preventDefault();
        }
        
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        testimonialsSlider.style.cursor = 'grabbing';
        testimonialsSlider.style.scrollBehavior = 'auto';
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        let currentPosition;
        if (e.type === 'touchmove') {
            currentPosition = e.touches[0].clientX;
        } else {
            currentPosition = e.clientX;
        }
        
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
    
    function dragEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        
        const movedBy = currentTranslate - prevTranslate;
        
        if (movedBy < -100) {
            // Swipe left
            testimonialsSlider.scrollLeft += 350;
        } else if (movedBy > 100) {
            // Swipe right
            testimonialsSlider.scrollLeft -= 350;
        }
        
        testimonialsSlider.style.cursor = 'grab';
        testimonialsSlider.style.scrollBehavior = 'smooth';
    }
    
    function animation() {
        testimonialsSlider.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
    }
    
    // Prevent menu from closing when clicking inside
    mainNav.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function() {
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});