document.addEventListener('DOMContentLoaded', function() {
    // Quick view functionality
    const quickViewButtons = document.querySelectorAll('.quick-view');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            alert(`Produk: ${productName}\nHarga: ${productPrice}`);
        });
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let cartItems = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartItems++;
            if (cartCount) {
                cartCount.textContent = cartItems;
            }
            
            // Animation feedback
            this.textContent = '✓ Ditambahkan';
            this.style.backgroundColor = '#2ecc71';
            
            setTimeout(() => {
                this.textContent = '+ Keranjang';
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
    
    // Add to wishlist functionality
    const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            
            this.classList.toggle('far');
            this.classList.toggle('fas');
            this.classList.toggle('active');
            
            if (this.classList.contains('active')) {
                alert(`Produk ${productName} ditambahkan ke wishlist`);
            }
        });
    });
});