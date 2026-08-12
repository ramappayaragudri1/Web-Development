document.addEventListener('DOMContentLoaded', function() {
      // Cart functionality
      let cart = [];
      const cartButton = document.getElementById('cartButton');
      const cartDropdown = document.getElementById('cartDropdown');
      const cartCount = document.getElementById('cartCount');
      const cartItemList = document.getElementById('cartItemList');
      const emptyCartMessage = document.getElementById('emptyCartMessage');
      const cartTotal = document.getElementById('cartTotal');
      const clearCartBtn = document.getElementById('clearCartBtn');
      const checkoutBtn = document.getElementById('checkoutBtn');
      const searchInput = document.getElementById('searchInput');
      const productContainer = document.getElementById('productContainer');
      
      // Store references to all product cards
      const allProductCards = Array.from(document.querySelectorAll('.product-card'));
      
      // Toggle cart dropdown
      cartButton.addEventListener('click', function(e) {
        e.stopPropagation();
        cartDropdown.classList.toggle('show');
      });

      // Close cart dropdown when clicking outside
      document.addEventListener('click', function() {
        cartDropdown.classList.remove('show');
      });

      // Add to cart functionality
      function handleAddToCart(event) {
        const button = event.target;
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        const image = button.getAttribute('data-image');
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({
            id,
            name,
            price,
            image,
            quantity: 1
          });
        }
        
        updateCart();
        updateProductButtons(id);
      }

      // Remove from cart functionality
      function handleRemoveFromCart(event) {
        const id = event.target.getAttribute('data-id');
        cart = cart.filter(item => item.id !== id);
        updateCart();
        updateProductButtons(id);
      }

      // Quantity controls
      function handleQuantityChange(event) {
        const id = event.target.getAttribute('data-id');
        const isIncrease = event.target.classList.contains('increase-quantity');
        const item = cart.find(item => item.id === id);
        
        if (item) {
          if (isIncrease) {
            item.quantity += 1;
          } else {
            item.quantity -= 1;
            if (item.quantity <= 0) {
              cart = cart.filter(item => item.id !== id);
            }
          }
          updateCart();
          updateProductButtons(id);
        }
      }

      // Clear cart
      clearCartBtn.addEventListener('click', function() {
        cart = [];
        updateCart();
        // Reset all product buttons
        allProductCards.forEach(card => {
          const id = card.querySelector('.add-to-cart').getAttribute('data-id');
          updateProductButtons(id);
        });
      });

      // Checkout
      checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
          alert('Your cart is empty!');
        } else {
          alert(`Thank you for your purchase! Total: $${calculateTotal().toFixed(2)}`);
          cart = [];
          updateCart();
          // Reset all product buttons
          allProductCards.forEach(card => {
            const id = card.querySelector('.add-to-cart').getAttribute('data-id');
            updateProductButtons(id);
          });
        }
      });

      // Update cart display
      function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items list
        if (cart.length === 0) {
          emptyCartMessage.style.display = 'block';
          cartItemList.innerHTML = '';
        } else {
          emptyCartMessage.style.display = 'none';
          cartItemList.innerHTML = cart.map(item => `
            <div class="cart-item-row">
              <img src="${item.image}" alt="${item.name}" class="cart-item-img">
              <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
              </div>
              <div class="cart-item-quantity">
                <button class="decrease-quantity" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase-quantity" data-id="${item.id}">+</button>
              </div>
            </div>
          `).join('');
          
          // Add event listeners to quantity buttons in cart
          document.querySelectorAll('.cart-item-quantity .increase-quantity').forEach(button => {
            button.addEventListener('click', handleQuantityChange);
          });
          
          document.querySelectorAll('.cart-item-quantity .decrease-quantity').forEach(button => {
            button.addEventListener('click', handleQuantityChange);
          });
        }
        
        // Update total
        cartTotal.textContent = `Total: $${calculateTotal().toFixed(2)}`;
      }

      // Calculate total
      function calculateTotal() {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      }

      // Update product buttons based on cart status
      function updateProductButtons(id) {
        const productCard = document.querySelector(`.product-card .add-to-cart[data-id="${id}"]`)?.closest('.product-card');
        if (!productCard) return;
        
        const addButton = productCard.querySelector('.add-to-cart');
        const removeButton = productCard.querySelector('.remove-from-cart');
        const quantityControls = productCard.querySelector('.quantity-controls');
        const quantityDisplay = productCard.querySelector('.quantity-display');
        
        const cartItem = cart.find(item => item.id === id);
        
        if (cartItem) {
          addButton.style.display = 'none';
          removeButton.style.display = 'block';
          quantityControls.style.display = 'flex';
          quantityDisplay.textContent = cartItem.quantity;
        } else {
          addButton.style.display = 'block';
          removeButton.style.display = 'none';
          quantityControls.style.display = 'none';
        }
      }

      // Search functionality
      function searchProducts() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let hasMatches = false;
        
        // Clear any previous search messages
        const existingMessage = document.querySelector('.search-results-message');
        if (existingMessage) {
          existingMessage.remove();
        }
        
        // If search is empty, show all products
        if (searchTerm === '') {
          showAllProducts();
          return;
        }
        
        // Filter products
        allProductCards.forEach(product => {
          const productName = product.querySelector('h3').textContent.toLowerCase();
          if (productName.includes(searchTerm)) {
            product.style.display = '';
            hasMatches = true;
          } else {
            product.style.display = 'none';
          }
        });
        
        // Show message if no matches
        if (!hasMatches) {
          const noResults = document.createElement('div');
          noResults.className = 'search-results-message';
          noResults.textContent = 'No products found matching your search.';
          productContainer.appendChild(noResults);
        }
      }
      
      // Show all products (reset search)
      function showAllProducts() {
        allProductCards.forEach(product => {
          product.style.display = '';
        });
        
        // Remove any search message
        const existingMessage = document.querySelector('.search-results-message');
        if (existingMessage) {
          existingMessage.remove();
        }
      }
      
      // Initialize event listeners
      function initializeEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
          button.addEventListener('click', handleAddToCart);
        });
        
        // Remove from cart buttons
        document.querySelectorAll('.remove-from-cart').forEach(button => {
          button.addEventListener('click', handleRemoveFromCart);
        });
        
        // Quantity controls
        document.querySelectorAll('.increase-quantity, .decrease-quantity').forEach(button => {
          button.addEventListener('click', handleQuantityChange);
        });
        
        // Search button
        document.querySelector('.search-box button').addEventListener('click', searchProducts);
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            searchProducts();
          }
        });
      }
      document.querySelectorAll('.order-toggle-btn').forEach(toggleBtn => {
        toggleBtn.addEventListener('click', function() {
          const orderForm = this.nextElementSibling;
          const isVisible = orderForm.style.display === 'block';
          
          // Close all other forms first
          document.querySelectorAll('.order-form').forEach(form => {
            form.style.display = 'none';
            form.previousElementSibling.textContent = 'Order Now';
          });
          
          // Toggle this form
          if (!isVisible) {
            orderForm.style.display = 'block';
            this.textContent = 'Cancel Order';
            
            // Hide any success messages when opening
            const successMsg = orderForm.querySelector('.success-message');
            if (successMsg) successMsg.style.display = 'none';
          }
        });
      });

      // Form submission
      document.querySelectorAll('.order-form').forEach(form => {
        form.addEventListener('submit', function(event) {
          event.preventDefault();
          
          // Get form data
          const product = this.querySelector('input[name="product"]').value;
          const quantity = this.querySelector('input[name="quantity"]').value;
          const name = this.querySelector('input[name="fullname"]').value;
          const address = this.querySelector('textarea[name="address"]').value;
          const email = this.querySelector('input[name="email"]').value;
          
          // Validate form
          if (!name || !address || !email) {
            alert('Please fill in all required fields');
            return;
          }
          
          // Show success message
          const successMsg = this.querySelector('.success-message');
          if (successMsg) {
            successMsg.textContent = `Order confirmed! ${quantity} x ${product} will be shipped to ${name}. Confirmation sent to ${email}.`;
            successMsg.style.display = 'block';
          }
          
          // Reset form after 3 seconds
          setTimeout(() => {
            this.reset();
            this.style.display = 'none';
            this.previousElementSibling.textContent = 'Order Now';
            if (successMsg) successMsg.style.display = 'none';
          }, 3000);
        });
      });
// Order history functionality
let orders = JSON.parse(localStorage.getItem('orders')) || [];
const orderHistoryLink = document.getElementById('orderHistoryLink');
const orderHistoryModal = new bootstrap.Modal(document.getElementById('orderHistoryModal'));
const noOrdersMessage = document.getElementById('noOrdersMessage');
const ordersList = document.getElementById('ordersList');

// Save order to history
function saveOrder(orderData) {
  const order = {
    id: Date.now().toString(),
    date: new Date().toLocaleString(),
    items: [...cart],
    total: calculateTotal(),
    customer: {
      name: orderData.fullname,
      email: orderData.email,
      address: orderData.address,
      phone: orderData.phone
    }
  };
  
  orders.unshift(order); // Add to beginning of array
  localStorage.setItem('orders', JSON.stringify(orders));
}

// Display order history
function displayOrderHistory() {
  if (orders.length === 0) {
    noOrdersMessage.classList.remove('d-none');
    ordersList.classList.add('d-none');
    return;
  }
  
  noOrdersMessage.classList.add('d-none');
  ordersList.classList.remove('d-none');
  ordersList.innerHTML = '';
  
  orders.forEach(order => {
    const orderElement = document.createElement('div');
    orderElement.className = 'order-card mb-3';
    orderElement.innerHTML = `
      <div class="order-header">
        <div>
          <span class="order-id">Order #${order.id}</span>
          <span class="order-date ms-2">${order.date}</span>
        </div>
        <div class="text-end">
          <span class="badge bg-success">Completed</span>
        </div>
      </div>
      <div class="order-body">
        ${order.items.map(item => `
          <div class="order-item">
            <img src="${item.image}" alt="${item.name}" class="order-item-img">
            <div class="order-item-details">
              <div class="order-item-title">${item.name}</div>
              <div class="order-item-price">$${item.price.toFixed(2)}</div>
              <div class="order-item-quantity">Quantity: ${item.quantity}</div>
            </div>
          </div>
        `).join('')}
        <div class="order-total">
          Total: $${order.total.toFixed(2)}
        </div>
        <div class="mt-3">
          <h6>Shipping Information</h6>
          <p class="mb-1">${order.customer.name}</p>
          <p class="mb-1">${order.customer.address}</p>
          <p class="mb-1">${order.customer.email}</p>
          ${order.customer.phone ? `<p class="mb-0">${order.customer.phone}</p>` : ''}
        </div>
      </div>
    `;
    ordersList.appendChild(orderElement);
  });
}

// Show order history when link is clicked
orderHistoryLink.addEventListener('click', function(e) {
  e.preventDefault();
  displayOrderHistory();
  orderHistoryModal.show();
});

// Update form submission to save orders
document.querySelectorAll('.order-form').forEach(form => {
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
      product: this.querySelector('input[name="product"]').value,
      quantity: this.querySelector('input[name="quantity"]').value,
      fullname: this.querySelector('input[name="fullname"]').value,
      address: this.querySelector('textarea[name="address"]').value,
      email: this.querySelector('input[name="email"]').value,
      phone: this.querySelector('input[name="phone"]').value || ''
    };
    
    // Validate form
    if (!formData.fullname || !formData.address || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Save order to history
    saveOrder(formData);
    
    // Show success message
    const successMsg = this.querySelector('.success-message');
    if (successMsg) {
      successMsg.textContent = `Order confirmed! ${formData.quantity} x ${formData.product} will be shipped to ${formData.fullname}. Confirmation sent to ${formData.email}.`;
      successMsg.style.display = 'block';
    }
    
    // Reset form after 3 seconds
    setTimeout(() => {
      this.reset();
      this.style.display = 'none';
      this.previousElementSibling.textContent = 'Order Now';
      if (successMsg) successMsg.style.display = 'none';
    }, 3000);
  });
});
// Checkout
checkoutBtn.addEventListener('click', function() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  // Create a simple order with minimal customer data
  const order = {
    id: Date.now().toString(),
    date: new Date().toLocaleString(),
    items: [...cart],
    total: calculateTotal(),
    customer: {
      name: 'Guest Customer',
      email: 'guest@example.com',
      address: 'Not specified',
      phone: ''
    }
  };
  
  orders.unshift(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  
  alert(`Thank you for your purchase! Total: $${calculateTotal().toFixed(2)}`);
  cart = [];
  updateCart();
  
  // Reset all product buttons
  allProductCards.forEach(card => {
    const id = card.querySelector('.add-to-cart').getAttribute('data-id');
    updateProductButtons(id);
  });
});
      // Initialize the page
      initializeEventListeners();
      updateCart();
    });
