document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery Functionality
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const newSrc = this.src.replace('-thumb', '-large');
            mainImage.src = newSrc;
            mainImage.alt = this.alt;
        });
    });
    
    // Flavor Selection
    const flavorOptions = document.querySelectorAll('.flavor-option');
    flavorOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            flavorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Quantity Selector
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-selector input');
    
    minusBtn.addEventListener('click', function(e) {
        e.preventDefault();
        let value = parseInt(quantityInput.value);
        quantityInput.value = Math.max(1, value - 1);
    });
    
    plusBtn.addEventListener('click', function(e) {
        e.preventDefault();
        let value = parseInt(quantityInput.value);
        quantityInput.value = Math.min(parseInt(quantityInput.max), value + 1);
    });
    
    // Tab Navigation
    const tabNavItems = document.querySelectorAll('.tab-nav li');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab nav
            tabNavItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Rating Input
    const ratingStars = document.querySelectorAll('.rating-input i');
    const ratingValue = document.getElementById('rating-value');
    
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            ratingValue.value = rating;
            
            // Update star display
            ratingStars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
    
    // Add to Cart Button
    const addToCartBtn = document.querySelector('.add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productName = document.querySelector('.product-title').textContent;
            const selectedFlavor = document.querySelector('.flavor-option.active').textContent;
            const quantity = quantityInput.value;
            const price = document.querySelector('.current-price').textContent;
            
            // In a real app, you would add to cart here
            alert(`Ditambahkan ke keranjang:\n${productName} (${selectedFlavor})\nJumlah: ${quantity}\nTotal: ${price}`);
            
            // Update cart count in header
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
                let count = parseInt(cartCount.textContent) || 0;
                cartCount.textContent = count + parseInt(quantity);
            }
        });
    }
    
    // Add to Wishlist Button
    const wishlistBtn = document.querySelector('.add-to-wishlist');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            this.classList.toggle('far');
            this.classList.toggle('fas');
            
            const productName = document.querySelector('.product-title').textContent;
            if (this.classList.contains('fas')) {
                alert(`${productName} ditambahkan ke wishlist`);
            } else {
                alert(`${productName} dihapus dari wishlist`);
            }
        });
    }
    
    // Load product data based on URL parameter
    function loadProductData() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        // In a real app, you would fetch product data from an API
        console.log(`Loading product data for ID: ${productId}`);
        
        // Example of how to handle different products
        switch(productId) {
            case '1':
                // Donut Tiramisu
                document.title = "Donut Tiramisu - Nama Toko";
                break;
            case '2':
                // Donat Coklat
                document.title = "Donat Coklat - Nama Toko";
                break;
            case '3':
                // Donat Keju
                document.title = "Donat Keju - Nama Toko";
                break;
            default:
                console.log("Product not found");
        }
    }
    
    loadProductData();
});