document.addEventListener('DOMContentLoaded', function() {
    // Checkout Steps Navigation
    const steps = document.querySelectorAll('.checkout-step');
    const stepButtons = document.querySelectorAll('.next-step, .prev-step');
    
    function showStep(stepNumber) {
        steps.forEach(step => {
            step.classList.remove('active');
            if (step.id === `step-${stepNumber}`) {
                step.classList.add('active');
            }
        });
        
        // Update step indicators
        document.querySelectorAll('.checkout-steps .step').forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) <= stepNumber) {
                step.classList.add('active');
            }
        });
    }
    
    stepButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetStep = this.dataset.next || this.dataset.prev;
            showStep(targetStep);
        });
    });
    
    // Initialize first step
    showStep(1);
    
    // Dynamic address fields
    const provinceSelect = document.getElementById('shipping-province');
    const citySelect = document.getElementById('shipping-city');
    const districtSelect = document.getElementById('shipping-district');
    
    // Sample data - in a real app, this would come from an API
    const addressData = {
        jakarta: {
            name: 'DKI Jakarta',
            cities: [
                { id: 'jaksel', name: 'Jakarta Selatan' },
                { id: 'jaktim', name: 'Jakarta Timur' },
                { id: 'jakpus', name: 'Jakarta Pusat' },
                { id: 'jakbar', name: 'Jakarta Barat' },
                { id: 'jakut', name: 'Jakarta Utara' }
            ]
        },
        jabar: {
            name: 'Jawa Barat',
            cities: [
                { id: 'bandung', name: 'Bandung' },
                { id: 'bekasi', name: 'Bekasi' },
                { id: 'bogor', name: 'Bogor' },
                { id: 'depok', name: 'Depok' }
            ]
        }
    };
    
    const districtData = {
        jaksel: ['Kebayoran Baru', 'Kebayoran Lama', 'Pancoran', 'Tebet'],
        jaktim: ['Cakung', 'Cipayung', 'Kramat Jati', 'Makasar'],
        bandung: ['Bandung Kulon', 'Bandung Wetan', 'Cibeunying', 'Coblong']
    };
    
    provinceSelect.addEventListener('change', function() {
        const provinceId = this.value;
        citySelect.innerHTML = '<option value="">Pilih Kota</option>';
        districtSelect.innerHTML = '<option value="">Pilih Kecamatan</option>';
        
        if (provinceId && addressData[provinceId]) {
            addressData[provinceId].cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city.id;
                option.textContent = city.name;
                citySelect.appendChild(option);
            });
        }
    });
    
    citySelect.addEventListener('change', function() {
        const cityId = this.value;
        districtSelect.innerHTML = '<option value="">Pilih Kecamatan</option>';
        
        if (cityId && districtData[cityId]) {
            districtData[cityId].forEach(district => {
                const option = document.createElement('option');
                option.value = district.toLowerCase().replace(' ', '-');
                option.textContent = district;
                districtSelect.appendChild(option);
            });
        }
    });
    
    // Place order button
    const placeOrderBtn = document.getElementById('place-order');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function() {
            const agreeTerms = document.getElementById('agree-terms').checked;
            
            if (!agreeTerms) {
                alert('Anda harus menyetujui syarat dan ketentuan untuk melanjutkan');
                return;
            }
            
            // In a real app, you would submit the order to your backend here
            alert('Pesanan Anda telah berhasil dibuat! Terima kasih telah berbelanja.');
            window.location.href = 'order-success.html'; // You would create this page
        });
    }
    
    // Quantity controls in checkout
    const quantityControls = document.querySelectorAll('.quantity-btn');
    quantityControls.forEach(control => {
        control.addEventListener('click', function(e) {
            e.preventDefault();
            const input = this.parentElement.querySelector('input');
            let value = parseInt(input.value);
            
            if (this.classList.contains('plus')) {
                value++;
            } else {
                value = Math.max(1, value - 1);
            }
            
            input.value = value;
            updateCartTotals();
        });
    });
    
    // Remove item buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus produk ini dari keranjang?')) {
                this.closest('.cart-item').remove();
                updateCartTotals();
            }
        });
    });
    
    // Update cart totals
    function updateCartTotals() {
        // In a real app, you would calculate this based on the items in the cart
        console.log('Updating cart totals...');
    }
});