document.addEventListener('DOMContentLoaded', function() {
      // Product data with 20 items
      const products = [
        {
          id: 1,
          name: "Premium Leather Jacket",
          price: 199.99,
          image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "High-quality genuine leather jacket with perfect fit"
        },
        {
          id: 2,
          name: "Classic Formal Shirt",
          price: 49.99,
          image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Premium cotton formal shirt for business occasions"
        },
        {
          id: 3,
          name: "Slim Fit Short",
          price: 69.95,
          image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Comfortable slim fit short with modern design"
        },
        {
          id: 4,
          name: "Hand Watch",
          price: 299.00,
          image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Classic analog wristwatch for timeless elegance"
        },
        {
          id: 5,
          name: "Premium Sneakers",
          price: 89.99,
          image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Stylish and comfortable sneakers for everyday wear"
        },
        {
          id: 6,
          name: "Premium Cotton T-Shirt",
          price: 29.99,
          image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Soft cotton t-shirt with premium finish"
        },
        {
          id: 7,
          name: "Wool Blend Overcoat",
          price: 229.99,
          image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Premium wool blend overcoat with thermal lining for winter"
        },
        {
          id: 8,
          name: "Premium Zip Hoodie",
          price: 65.99,
          image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "High-quality cotton hoodie with reinforced stitching"
        },
        {
          id: 9,
          name: "Designer Sunglasses",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "UV protected designer sunglasses"
        },
        {
          id: 10,
          name: "Leather Wallet",
          price: 39.99,
          image: "https://images.unsplash.com/photo-1548032885-b5e38734688a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Genuine leather wallet with multiple compartments"
        },
        {
          id: 11,
          name: "Denim Jacket",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Classic denim jacket with modern fit"
        },
        {
          id: 12,
          name: "Luxury Cashmere Sweater",
          price: 189.99,
          image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "100% pure cashmere sweater with ribbed trim"
        },
        {
          id: 13,
          name: "Athletic Joggers",
          price: 59.99,
          image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Comfortable athletic joggers with stretch fabric"
        },
        {
          id: 14,
          name: "Dress Shoes",
          price: 129.99,
          image: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Premium leather dress shoes for formal occasions"
        },
        {
          id: 15,
          name: "Baseball Cap",
          price: 24.99,
          image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Adjustable baseball cap with embroidered logo"
        },
        {
          id: 16,
          name: "Quick-Dry Swim Shorts",
          price: 45.99,
          image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Performance swim shorts with UPF 50+ protection"
        },
        {
          id: 17,
          name: "Touchscreen Winter Gloves",
          price: 39.99,
          image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Thermal insulated gloves with smartphone compatibility"
        },
        {
          id: 18,
          name: "Italian Linen Shirt",
          price: 79.99,
          image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Breathable 100% Italian linen with mother-of-pearl buttons"
        },
        {
          id: 19,
          name: "Leather Weekender Bag",
          price: 149.99,
          image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Full-grain leather duffle bag with detachable strap"
        },
        {
          id: 20,
          name: "Handcrafted Silk Tie",
          price: 59.99,
          image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
          description: "Hand-rolled 7-fold silk tie with hidden stitching"
        }
      ];

      // DOM Elements
      const productContainer = document.getElementById('productContainer');
      const cartButton = document.getElementById('cartButton');
      const cartModal = document.getElementById('cartModal');
      const closeCart = document.getElementById('closeCart');
      const cartItems = document.getElementById('cartItems');
      const cartTotal = document.getElementById('cartTotal');
      const cartCount = document.getElementById('cartCount');
      const checkoutBtn = document.getElementById('checkoutBtn');
      const searchInput = document.getElementById('searchInput');
      const searchButton = document.getElementById('searchButton');

      // Cart state
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Display products
      function displayProducts(productsToDisplay) {
        productContainer.innerHTML = productsToDisplay.map(product => `
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
              <h3 class="product-title">${product.name}</h3>
              <p>${product.description}</p>
              <p class="product-price">$${product.price.toFixed(2)}</p>
              <button class="btn-add-to-cart" data-id="${product.id}">
                Add to Cart
              </button>
            </div>
          </div>
        `).join('');
        
        // Add event listeners to all add-to-cart buttons
        document.querySelectorAll('.btn-add-to-cart').forEach(button => {
          button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
          });
        });
      }

      // Add to cart function
      function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
          });
        }
        
        updateCart();
        showCartNotification(product.name);
      }

      // Show cart notification
      function showCartNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'position-fixed bottom-0 end-0 p-3';
        notification.style.zIndex = '1100';
        notification.innerHTML = `
          <div class="toast show" role="alert">
            <div class="toast-header">
              <strong class="me-auto">Added to Cart</strong>
              <button type="button" class="btn-close" data-bs-dismiss="toast" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
            <div class="toast-body">
              ${productName} has been added to your cart.
            </div>
          </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.remove();
        }, 3000);
      }

      // Update cart display
      function updateCart() {
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Update cart items
        if (cart.length === 0) {
          cartItems.innerHTML = '<p class="text-center py-3">Your cart is empty</p>';
        } else {
          cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
              <div class="d-flex align-items-center">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover;">
                <div class="ms-3">
                  <h6>${item.name}</h6>
                  <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
              </div>
              <div>
                <button class="btn btn-sm btn-outline-danger remove-from-cart" data-id="${item.id}">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          `).join('');
          
          // Add event listeners to remove buttons
          document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', function() {
              const productId = parseInt(this.getAttribute('data-id'));
              removeFromCart(productId);
            });
          });
        }
        
        // Update total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
      }

      // Remove from cart function
      function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
      }

      // Search products
      function searchProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => 
          product.name.toLowerCase().includes(searchTerm) || 
          product.description.toLowerCase().includes(searchTerm)
        );
        
        displayProducts(filteredProducts);
        
        if (filteredProducts.length === 0) {
          productContainer.innerHTML = `
            <div class="col-12 text-center py-5">
              <h4>No products found</h4>
              <p>Try a different search term</p>
            </div>
          `;
        }
      }

      // Event listeners
      cartButton.addEventListener('click', () => {
        cartModal.classList.add('active');
      });

      closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
      });

      checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
          alert('Your cart is empty!');
        } else {
          alert(`Thank you for your purchase! Total: $${cartTotal.textContent}`);
          cart = [];
          updateCart();
          cartModal.classList.remove('active');
        }
      });

      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          searchProducts();
        }
      });

      searchButton.addEventListener('click', searchProducts);

      // Initialize
      displayProducts(products);
      updateCart();
    });
