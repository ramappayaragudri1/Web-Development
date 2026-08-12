document.addEventListener('DOMContentLoaded', function() {
      // Form elements
      const contactForm = document.getElementById('contactFormElement');
      const thankYouMessage = document.getElementById('thankYouMessage');
      const visitAgain = document.getElementById('visitAgain');
      const historySection = document.getElementById('historySection');
      const historyItems = document.getElementById('historyItems');
      const viewHistoryBtn = document.getElementById('viewHistoryBtn');
      const hideHistoryBtn = document.getElementById('hideHistoryBtn');
      
      // Rating elements
      const ratingInputs = document.querySelectorAll('.rating input');
      const ratingText = document.getElementById('ratingText');
      
      // Feedback modal elements
      const feedbackBtn = document.getElementById('feedbackBtn');
      const feedbackModal = new bootstrap.Modal(document.getElementById('feedbackModal'));
      const submitQuickFeedback = document.getElementById('submitQuickFeedback');
      
      // Rating descriptions
      const ratingDescriptions = {
        1: "Terrible - We're sorry to hear that. We'll work to improve!",
        2: "Poor - We appreciate your feedback and will do better.",
        3: "Average - Thanks for your feedback. We'll aim to improve!",
        4: "Good - We're glad you had a good experience!",
        5: "Excellent - We're thrilled you loved your experience!"
      };
      
      // Load contact history from localStorage
      let contactHistory = JSON.parse(localStorage.getItem('contactHistory')) || [];
      
      // Display existing history
      renderContactHistory();
      
      // Handle contact form submission
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const selectedRating = document.querySelector('input[name="rating"]:checked');
        
        // Validate rating is selected
        if (!selectedRating) {
          alert('Please rate your shopping experience before submitting');
          return;
        }
        
        // Create contact record
        const contactRecord = {
          id: Date.now(),
          name: name,
          email: email,
          message: message,
          rating: selectedRating.value,
          date: new Date().toLocaleString()
        };
        
        // Add to history
        contactHistory.unshift(contactRecord); // Add to beginning of array
        localStorage.setItem('contactHistory', JSON.stringify(contactHistory));
        
        // Show rating feedback
        ratingText.textContent = ratingDescriptions[selectedRating.value];
        ratingText.style.display = 'block';
        
        // Simulate form submission
        setTimeout(function() {
          contactForm.style.display = 'none';
          thankYouMessage.style.display = 'block';
          
          // Show visit again section after a delay
          setTimeout(function() {
            visitAgain.style.display = 'block';
            renderContactHistory();
          }, 1500);
        }, 1000);
      });
      
      // Toggle history section
      viewHistoryBtn.addEventListener('click', function() {
        historySection.style.display = 'block';
        viewHistoryBtn.style.display = 'none';
      });
      
      hideHistoryBtn.addEventListener('click', function() {
        historySection.style.display = 'none';
        viewHistoryBtn.style.display = 'block';
      });
      
      // Render contact history
      function renderContactHistory() {
        if (contactHistory.length === 0) {
          historyItems.innerHTML = '<div class="no-history">No contact history found</div>';
          return;
        }
        
        historyItems.innerHTML = '';
        
        contactHistory.forEach(record => {
          const historyItem = document.createElement('div');
          historyItem.className = 'history-item';
          
          // Create stars based on rating
          let stars = '';
          for (let i = 0; i < 5; i++) {
            stars += i < record.rating ? '★' : '☆';
          }
          
          historyItem.innerHTML = `
            <div class="history-item-header">
              <strong>${record.name}</strong>
              <span class="history-item-date">${record.date}</span>
            </div>
            <div class="history-item-rating">
              <span class="stars">${stars}</span>
              <span>${getRatingDescription(record.rating)}</span>
            </div>
            <div class="history-item-message">
              <p>${record.message}</p>
            </div>
          `;
          
          historyItems.appendChild(historyItem);
        });
      }
      
      // Get rating description
      function getRatingDescription(rating) {
        return ratingDescriptions[rating] || '';
      }
      
      // Rating hover effect
      ratingInputs.forEach(input => {
        input.addEventListener('mouseover', function() {
          const ratingValue = this.value;
          ratingText.textContent = ratingDescriptions[ratingValue];
          ratingText.style.display = 'block';
        });
        
        input.addEventListener('mouseout', function() {
          const selectedRating = document.querySelector('input[name="rating"]:checked');
          if (selectedRating) {
            ratingText.textContent = ratingDescriptions[selectedRating.value];
          } else {
            ratingText.style.display = 'none';
          }
        });
      });
      
      // Feedback button click handler
      feedbackBtn.addEventListener('click', function() {
        feedbackModal.show();
      });
      
      // Submit quick feedback handler
      submitQuickFeedback.addEventListener('click', function() {
        const selectedRating = document.querySelector('input[name="modalRating"]:checked');
        
        if (!selectedRating) {
          alert('Please select a rating');
          return;
        }
        
        const feedback = document.getElementById('quickFeedback').value;
        
        // Create feedback record
        const feedbackRecord = {
          id: Date.now(),
          rating: selectedRating.value,
          comments: feedback,
          date: new Date().toLocaleString()
        };
        
        // Add to history (you might want to store this separately)
        console.log('Quick feedback submitted:', feedbackRecord);
        
        // Show confirmation and close modal
        alert('Thank you for your feedback!');
        feedbackModal.hide();
      });
    });
